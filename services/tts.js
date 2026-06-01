/**
 * TTS Service - 阿里云百炼 DashScope Qwen3-TTS 粤语语音合成
 * 使用原生粤语音色 Kiki（粤语-阿清），发音地道纯正
 * 可选备选：Rocky（粤语-阿强，男声）
 */
const https = require('https');
const http = require('http');

// Load config from env
const TTS_MODEL = process.env.TTS_MODEL || 'qwen3-tts-flash';
const TTS_VOICE = process.env.TTS_VOICE || 'Kiki';
const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY || '';

/**
 * Call DashScope TTS API to synthesize Cantonese speech
 * @param {string} text - Text to synthesize
 * @param {string} voice - Voice name (Kiki/Rocky/etc), defaults to TTS_VOICE
 * @returns {Promise<Buffer>} - Audio data buffer
 */
function synthesizeSpeech(text, voice = null) {
  const useVoice = voice || TTS_VOICE;
  return new Promise((resolve, reject) => {
    if (!DASHSCOPE_API_KEY) {
      return reject(new Error('DASHSCOPE_API_KEY not configured. Please set it in .env file.'));
    }

    // qwen3-tts-flash 原生粤语音色
    const payload = JSON.stringify({
      model: TTS_MODEL,
      input: {
        text: text,
        voice: useVoice
      }
    });

    const options = {
      hostname: 'dashscope.aliyuncs.com',
      path: '/api/v1/services/aigc/multimodal-generation/generation',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        'X-DashScope-OssResourceResolve': 'enable',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        try {
          const body = Buffer.concat(chunks).toString();
          const result = JSON.parse(body);

          if (result.code) {
            return reject(new Error(`DashScope API error: ${result.message || result.code}`));
          }

          // Extract audio URL from response
          const audioUrl = result?.output?.audio?.url ||
                          result?.output?.results?.audio?.url;

          if (!audioUrl) {
            return reject(new Error('No audio URL in DashScope response'));
          }

          // Download the audio file
          downloadAudio(audioUrl).then(resolve).catch(reject);
        } catch (err) {
          reject(new Error(`Failed to parse TTS response: ${err.message}`));
        }
      });
    });

    req.on('error', (err) => reject(new Error(`TTS request failed: ${err.message}`)));
    req.on('timeout', () => { req.destroy(); reject(new Error('TTS request timed out')); });
    req.write(payload);
    req.end();
  });
}

/**
 * Download audio from URL
 * @param {string} url - Audio URL
 * @returns {Promise<Buffer>}
 */
function downloadAudio(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { timeout: 30000 }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadAudio(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Audio download failed with status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * TTS API rate limiting - simple in-memory cache
 */
const audioCache = new Map();
const CACHE_MAX_SIZE = 200;

function getCacheKey(text, voice) {
  return `${voice || TTS_VOICE}:${text}`;
}

/**
 * Get cached audio or generate new
 */
async function getSpeech(text, voice = null, contentType = 'default') {
  const cacheKey = getCacheKey(text, voice);

  // Check cache
  if (audioCache.has(cacheKey)) {
    // Move to end (LRU)
    const entry = audioCache.get(cacheKey);
    audioCache.delete(cacheKey);
    audioCache.set(cacheKey, entry);
    return entry;
  }

  // Generate new
  const audioBuffer = await synthesizeSpeech(text, voice);

  // Cache it
  audioCache.set(cacheKey, audioBuffer);
  if (audioCache.size > CACHE_MAX_SIZE) {
    // Delete oldest entry
    const firstKey = audioCache.keys().next().value;
    audioCache.delete(firstKey);
  }

  return audioBuffer;
}

/**
 * Check if TTS is configured
 */
function isConfigured() {
  return !!DASHSCOPE_API_KEY;
}

module.exports = {
  synthesizeSpeech,
  getSpeech,
  isConfigured,
  TTS_MODEL,
  TTS_VOICE
};
