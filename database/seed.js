// Seed data for 粤讲粤掂
// Run via: node database/seed.js

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'cantonese.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ===================== Courses =====================
const courses = [
  // L1 courses
  { id: 1, title: '办公室问候', level: 1, order_index: 1, description: '第一日返香港office，从前台到经理，全面掌握办公室问候', difficulty_label: '🟢 轻松',
    content_json: JSON.stringify({
      "course_id": "MO-01-00",
      "title": "办公室问候",
      "level": 1,
      "order_index": 1,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "第一日返香港 office，你提早15分钟到公司门口，听到里面有人说话，推门而入，遇到三位同事——前台Amy、同部门阿Ken、部门主管张经理。",
          "scenes": [
            {
              "name": "第一幕：前台初遇",
              "location": "写字楼门口 → 前台",
              "lines": [
                { "speaker": "Amy（前台）", "text": "早晨！你係新嚟嗰位同事呀？", "jyutping": "zou2 san4! nei5 hai6 san1 lai4 go2 wai2 tung4 si6 aa3?", "mandarin": "早上好！你是新来的那位同事吗？" },
                { "speaker": "你", "text": "係呀，我今日第一日返工，多多指教。", "jyutping": "hai6 aa3, ngo5 gam1 jat6 dai6 jat1 jat6 faan1 gung1, do1 do1 zi2 gaau3.", "mandarin": "是的，我今天第一天上班，请多关照。" },
                { "speaker": "Amy", "text": "歡迎歡迎！我係前台Amy，有咩可以幫你？", "jyutping": "fun1 jing4 fun1 jing4! ngo5 hai6 cin4 toi4 Amy, jau5 me1 ho2 ji5 bong1 nei5?", "mandarin": "欢迎欢迎！我是前台Amy，有什么可以帮你？" },
                { "speaker": "你", "text": "你好Amy，我想問下財務部喺邊個位？", "jyutping": "nei5 hou2 Amy, ngo5 soeng2 man6 haa5 coi4 mou6 bou6 hai2 bin1 go3 wai2?", "mandarin": "你好Amy，我想问一下财务部在哪个位置？" },
                { "speaker": "Amy", "text": "直行轉右，第三個房就係。阿Ken應該到咗啦。", "jyutping": "zik6 hang4 zyun2 jau6, dai6 saam1 go3 fong2 zau6 hai6. Aa3 Ken jing1 goi1 dou3 zo2 laa1.", "mandarin": "直走右转，第三个房间就是。阿Ken应该已经到了。" }
              ]
            },
            {
              "name": "第二幕：同部门同事",
              "location": "财务部办公区",
              "lines": [
                { "speaker": "Ken", "text": "（見到你）咦，新同事？早晨呀！", "jyutping": "(gin3 dou2 nei5) ji2, san1 tung4 si6? zou2 san4 aa3!", "mandarin": "（见到你）咦，新同事？早上好呀！" },
                { "speaker": "你", "text": "早晨！我係XXX，今日嚟財務部報到。", "jyutping": "zou2 san4! ngo5 hai6 XXX, gam1 jat6 lai4 coi4 mou6 bou6 bou3 dou3.", "mandarin": "早上好！我是XXX，今天来财务部报到。" },
                { "speaker": "Ken", "text": "你好你好！我叫阿Ken，係做ERP嘅。你坐我隔籬位。", "jyutping": "nei5 hou2 nei5 hou2! ngo5 giu3 Aa3 Ken, hai6 zou6 ERP ge3. nei5 co5 ngo5 gaak3 lei4 wai2.", "mandarin": "你好你好！我叫阿Ken，是做ERP的。你坐我隔壁工位。" },
                { "speaker": "你", "text": "好呀，以後多多關照。", "jyutping": "hou2 aa3, ji5 hau6 do1 do1 gwaan1 ziu3.", "mandarin": "好呀，以后多多关照。" },
                { "speaker": "Ken", "text": "客氣喇！等陣我帶你行一圈，認識下啲同事。", "jyutping": "haak3 hei3 laa3! dang2 zan6 ngo5 daai3 nei5 haang4 jat1 hyun1, jing6 sik1 haa5 di1 tung4 si6.", "mandarin": "客气了！等会儿我带你走一圈，认识一下同事们。" },
                { "speaker": "你", "text": "唔該晒阿Ken！", "jyutping": "m4 goi1 saai3 Aa3 Ken!", "mandarin": "非常感谢阿Ken！" }
              ]
            },
            {
              "name": "第三幕：見經理",
              "location": "经理办公室",
              "lines": [
                { "speaker": "Ken", "text": "（敲門）張經理，新同事到咗。", "jyutping": "(haau1 mun4) zoeng1 ging1 lei5, san1 tung4 si6 dou3 zo2.", "mandarin": "（敲门）张经理，新同事到了。" },
                { "speaker": "張經理", "text": "請入嚟。你好，我係部門經理張國強。", "jyutping": "cing2 jap6 lai4. nei5 hou2, ngo5 hai6 bou6 mun4 ging1 lei5 zoeng1 gwok3 koeng4.", "mandarin": "请进来。你好，我是部门经理张国强。" },
                { "speaker": "你", "text": "張經理早晨！我係XXX，請多多指教。", "jyutping": "zoeng1 ging1 lei5 zou2 san4! ngo5 hai6 XXX, cing2 do1 do1 zi2 gaau3.", "mandarin": "张经理早上好！我是XXX，请多多指教。" },
                { "speaker": "張經理", "text": "歡迎加入我哋團隊。聽講你之前做FICO㗎？", "jyutping": "fun1 jing4 gaa1 jap6 ngo5 dei6 tyun4 deoi2. teng1 gong2 nei5 zi1 cin4 zou6 FICO gaa3?", "mandarin": "欢迎加入我们团队。听说你之前做FICO的？" },
                { "speaker": "你", "text": "係呀，之前做咗三年SAP FICO顧問。", "jyutping": "hai6 aa3, zi1 cin4 zou6 zo2 saam1 nin4 SAP FICO gu3 man6.", "mandarin": "是的，之前做了三年SAP FICO顾问。" },
                { "speaker": "張經理", "text": "咁就好喇，我哋而家正需要你呢方面嘅經驗。", "jyutping": "gam2 zau6 hou2 laa3, ngo5 dei6 ji4 gaa1 zing3 seoi1 jiu3 nei5 ni1 fong1 min4 ge3 ging1 jim6.", "mandarin": "那就太好了，我们现在正需要你这方面的经验。" },
                { "speaker": "你", "text": "我會努力學習，盡快上手。", "jyutping": "ngo5 wui5 nou5 lik6 hok6 zaap6, zeon6 faai3 soeng5 sau2.", "mandarin": "我会努力学习，尽快上手。" },
                { "speaker": "張經理", "text": "好！阿Ken，你幫佢搞掂入職啲嘢。", "jyutping": "hou2! Aa3 Ken, nei5 bong1 keoi5 gaau2 dim6 jap6 zik1 di1 je5.", "mandarin": "好！阿Ken，你帮他搞定入职那些事。" },
                { "speaker": "Ken", "text": "冇問題，交畀我啦！", "jyutping": "mou5 man6 tai4, gaau1 bei2 ngo5 laa1!", "mandarin": "没问题，交给我吧！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "早晨", "jyutping": "zou2 san4", "mandarin": "早上好", "mnemonic": "走身", "scene": "上午/当天首次见面打招呼", "enteringTone": false },
            { "word": "新嚟", "jyutping": "san1 lai4", "mandarin": "新来的", "mnemonic": "身离", "scene": "介绍新人时用", "enteringTone": false },
            { "word": "多多指教", "jyutping": "do1 do1 zi2 gaau3", "mandarin": "请多关照", "mnemonic": "多多指告", "scene": "初次见面的礼貌用语", "enteringTone": false },
            { "word": "唔該晒", "jyutping": "m4 goi1 saai3", "mandarin": "非常感谢", "mnemonic": "嗯该晒", "scene": "麻烦别人后的感谢", "enteringTone": true },
            { "word": "隔籬位", "jyutping": "gaak3 lei4 wai2", "mandarin": "隔壁工位", "mnemonic": "格离位", "scene": "描述座位位置", "enteringTone": true },
            { "word": "行一圈", "jyutping": "haang4 jat1 hyun1", "mandarin": "走一圈/转一圈", "mnemonic": "行一圈", "scene": "带人熟悉环境", "enteringTone": false },
            { "word": "交畀我", "jyutping": "gaau1 bei2 ngo5", "mandarin": "交给我", "mnemonic": "交比我", "scene": "主动承接任务", "enteringTone": false },
            { "word": "請入嚟", "jyutping": "cing2 jap6 lai4", "mandarin": "请进来", "mnemonic": "请入离", "scene": "招呼人进办公室", "enteringTone": true }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：係…㗎（是…的/表示肯定确认）",
              "usage": "粤语用「係…㗎」结构表示确认、强调事实，相当于普通话的「是…的」",
              "examples": [
                { "canto": "我係新嚟㗎。", "jyutping": "ngo5 hai6 san1 lai4 gaa3.", "mandarin": "我是新来的。" },
                { "canto": "佢係做ERP㗎。", "jyutping": "keoi5 hai6 zou6 ERP gaa3.", "mandarin": "他是做ERP的。" },
                { "canto": "我哋正需要你呢方面嘅經驗㗎。", "jyutping": "ngo5 dei6 zing3 seoi1 jiu3 nei5 ni1 fong1 min4 ge3 ging1 jim6 gaa3.", "mandarin": "我们正需要你这方面的经验。" }
              ]
            },
            {
              "name": "句型2：A幫B搞掂C（A帮B搞定C）",
              "usage": "「搞掂」= 搞定/办妥，香港职场极高频词",
              "examples": [
                { "canto": "你幫佢搞掂入職啲嘢。", "jyutping": "nei5 bong1 keoi5 gaau2 dim6 jap6 zik1 di1 je5.", "mandarin": "你帮他搞定入职那些事。" },
                { "canto": "幫我搞掂呢份文件。", "jyutping": "bong1 ngo5 gaau2 dim6 ni1 fan6 man4 gin2.", "mandarin": "帮我搞定这份文件。" },
                { "canto": "搞掂未呀？", "jyutping": "gaau2 dim6 mei6 aa3?", "mandarin": "搞定了没？" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "「早晨」不限时",
              "icon": "☀️",
              "content": "香港职场「早晨」不限于早上。当天第一次见到同事，哪怕下午都可以说「早晨」。但如果已经打过招呼，第二次见到应该说「Hello」或点头微笑。"
            },
            {
              "title": "「唔該」的万能用法",
              "icon": "🙏",
              "content": "香港职场中「唔該」比「謝謝」更常用。叫人帮忙→「唔該」；收快递→「唔該」；让人让路→「唔該借借」。但如果对方请你吃饭/送礼，要说「多謝」。"
            },
            {
              "title": "英文名即係職場ID",
              "icon": "🆔",
              "content": "香港公司超过90%的人有英文名。自我介绍时说「我叫阿Ken」比「我叫陳健華」更自然。名片上通常是「Ken Chan」格式，中文名反而不是必需。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——你今日第一日返工",
              "description": "以下是一个不完整的对话，用户需在与同事的3个场景中选择正确的粤语回应",
              "scenes": [
                {
                  "scene": "场景A：前台同你講「早晨！你係新嚟㗎？」",
                  "options": [
                    { "text": "「早晨！係呀，我今日第一日返工。」", "correct": true },
                    { "text": "「早上好，对的。」", "correct": false, "reason": "不应使用普通话" },
                    { "text": "「我唔係新嚟㗎。」", "correct": false, "reason": "不符合情景" }
                  ]
                },
                {
                  "scene": "场景B：同事話「我帶你行一圈」",
                  "options": [
                    { "text": "「唔該晒！」", "correct": true },
                    { "text": "「你帶路吧。」", "correct": false, "reason": "不应使用普通话" },
                    { "text": "「我自己得㗎啦。」", "correct": false, "reason": "不礼貌" }
                  ]
                },
                {
                  "scene": "场景C：經理話「歡迎加入我哋團隊」",
                  "options": [
                    { "text": "「我會努力學習。」", "correct": true },
                    { "text": "「好。」", "correct": false, "reason": "太简短，不礼貌" },
                    { "text": "「不用客氣。」", "correct": false, "reason": "普通话，且语境不当" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "早上好 → 粵語：___", "answer": "早晨" },
                { "question": "非常感谢 → 粵語：___", "answer": "唔該晒" },
                { "question": "隔壁工位 → 粵語：___", "answer": "隔籬位" },
                { "question": "请进来 → 粵語：___", "answer": "請入嚟" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "交畀我啦！", "mandarin": "交给我吧！" },
                { "canto": "我帶你行一圈。", "mandarin": "我带你转一圈。" },
                { "canto": "請多多指教。", "mandarin": "请多多关照。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 2, title: '自我介绍', level: 1, order_index: 2, description: '在职场中用粤语做自我介绍（姓名/职位/部门/职责）', difficulty_label: '🟢 轻松',
    content_json: JSON.stringify({
      "course_id": "MO-01-02",
      "title": "自我介绍",
      "level": 1,
      "order_index": 2,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你第一天到香港办公室报到，HR 带你到工位后，周围同事过来打招呼。你要依次跟 HR、邻座同事、部门经理做自我介绍。",
          "scenes": [
            {
              "name": "第一幕：HR带路",
              "location": "办公室 → 你的工位",
              "lines": [
                { "speaker": "HR（阿清）", "text": "呢度就係你嘅位啦，有冇问题？", "jyutping": "ni1 dou6 zau6 hai6 nei5 ge3 wai2 laa1, jau5 mou5 man6 tai4?", "mandarin": "这里就是你的工位了，有问题吗？" },
                { "speaker": "你", "text": "唔該晒！環境唔錯。", "jyutping": "m4 goi1 saai3! waan4 ging2 m4 co3.", "mandarin": "非常感谢！环境不错。" },
                { "speaker": "HR（阿清）", "text": "有咩需要就揾我，我喺HR房。", "jyutping": "jau5 me1 seoi1 jiu3 zau6 wan2 ngo5, ngo5 hai2 HR fong2.", "mandarin": "有什么需要就找我，我在HR房间。" },
                { "speaker": "你", "text": "好，麻煩晒你。", "jyutping": "hou2, maa4 faan4 saai3 nei5.", "mandarin": "好，麻烦你了。" }
              ]
            },
            {
              "name": "第二幕：同同事打招呼",
              "location": "财务部办公区",
              "lines": [
                { "speaker": "Sarah", "text": "（行過嚟）你好！你係新嚟㗎？", "jyutping": "(haang4 gwo3 lai4) nei5 hou2! nei5 hai6 san1 lai4 gaa3?", "mandarin": "（走过来）你好！你是新来的？" },
                { "speaker": "你", "text": "係呀，我叫XXX，今日第一日返工。", "jyutping": "hai6 aa3, ngo5 giu3 XXX, gam1 jat6 dai6 jat1 jat6 faan1 gung1.", "mandarin": "是的，我叫XXX，今天第一天上班。" },
                { "speaker": "Sarah", "text": "你好！我叫Sarah，我係財務部嘅manager。", "jyutping": "nei5 hou2! ngo5 giu3 Sarah, ngo5 hai6 coi4 mou6 bou6 ge3 manager.", "mandarin": "你好！我叫Sarah，我是财务部的经理。" },
                { "speaker": "你", "text": "你好Sarah，我都係財務部，負責FICO module。", "jyutping": "nei5 hou2 Sarah, ngo5 dou1 hai6 coi4 mou6 bou6, fu6 zaak3 FICO module.", "mandarin": "你好Sarah，我也是财务部，负责FICO模块。" },
                { "speaker": "Sarah", "text": "哦，好嘢！我哋正需要人跟ERP個project。你做咗幾耐？", "jyutping": "o4, hou2 je5! ngo5 dei6 zing3 seoi1 jiu3 jan4 gan1 ERP go3 project. nei5 zou6 zo2 gei2 noi6?", "mandarin": "哦，太好了！我们正需要人跟ERP这个项目。你做了多久？" },
                { "speaker": "你", "text": "做咗大概三年，之前喺廣州office。", "jyutping": "zou6 zo2 daai6 koi3 saam1 nin4, zi1 cin4 hai2 gwong2 zau1 office.", "mandarin": "做了大概三年，之前在广州办公室。" },
                { "speaker": "Sarah", "text": "咁你慢慢適應啦，有咩唔明白揾我或者揾阿輝。", "jyutping": "gam2 nei5 maan6 maan6 sik1 jing3 laa1, jau5 me1 m4 ming4 baak6 wan2 ngo5 waak6 ze2 wan2 aa3 fai1.", "mandarin": "那你慢慢适应吧，有什么不明白找我或者找阿辉。" },
                { "speaker": "你", "text": "唔該晒Sarah！", "jyutping": "m4 goi1 saai3 Sarah!", "mandarin": "非常感谢Sarah！" }
              ]
            },
            {
              "name": "第三幕：見經理",
              "location": "IT部办公区",
              "lines": [
                { "speaker": "Ken", "text": "（經過）新同事？你好！", "jyutping": "(ging1 gwo3) san1 tung4 si6? nei5 hou2!", "mandarin": "（经过）新同事？你好！" },
                { "speaker": "你", "text": "你好！我叫XXX，請多多指教。", "jyutping": "nei5 hou2! ngo5 giu3 XXX, cing2 do1 do1 zi2 gaau3.", "mandarin": "你好！我叫XXX，请多多指教。" },
                { "speaker": "Ken", "text": "我叫阿Ken，係IT部嘅，負責system support。", "jyutping": "ngo5 giu3 aa3 Ken, hai6 IT bou6 ge3, fu6 zaak3 system support.", "mandarin": "我叫阿Ken，是IT部的，负责系统支持。" },
                { "speaker": "你", "text": "哦，以後system有問題就麻煩你啦。", "jyutping": "o4, ji5 hau6 system jau5 man6 tai4 zau6 maa4 faan4 nei5 laa1.", "mandarin": "哦，以后系统有问题就麻烦你了。" },
                { "speaker": "Ken", "text": "冇問題，交畀我！", "jyutping": "mou5 man6 tai4, gaau1 bei2 ngo5!", "mandarin": "没问题，交给我！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "大家好", "jyutping": "daai6 gaa1 hou2", "mandarin": "大家好", "mnemonic": "代嘎好", "scene": "对一群人打招呼", "enteringTone": false },
            { "word": "我叫", "jyutping": "ngo5 giu3", "mandarin": "我叫", "mnemonic": "我叫", "scene": "自我介绍开场", "enteringTone": false },
            { "word": "我係/我喺", "jyutping": "ngo5 hai6 / ngo5 hai2", "mandarin": "我是/我在", "mnemonic": "我害/我海", "scene": "「係」表身份，「喺」表位置", "enteringTone": false },
            { "word": "負責", "jyutping": "fu6 zaak3", "mandarin": "负责", "mnemonic": "副咋", "scene": "中英夹杂「負責FICO」", "enteringTone": true },
            { "word": "我哋", "jyutping": "ngo5 dei6", "mandarin": "我们", "mnemonic": "我低", "scene": "「哋」是复数标记", "enteringTone": false },
            { "word": "做咗幾耐", "jyutping": "zou6 zo2 gei2 noi6", "mandarin": "做了多久", "mnemonic": "做左给内", "scene": "「幾耐」=多久", "enteringTone": false },
            { "word": "適應", "jyutping": "sik1 jing3", "mandarin": "适应", "mnemonic": "色英", "scene": "关心新人用语", "enteringTone": true },
            { "word": "麻煩晒", "jyutping": "maa4 faan4 saai3", "mandarin": "麻烦你了", "mnemonic": "麻反晒", "scene": "拜托别人后的感谢", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：我叫___，喺___部做 / 負責___",
              "usage": "自我介绍标准公式「姓名 + 部门 + 职责」，用「喺」表示在某个部门，用「負責」说明工作内容",
              "examples": [
                { "canto": "我叫小李，喺財務部做。", "jyutping": "ngo5 giu3 siu2 lei5, hai2 coi4 mou6 bou6 zou6.", "mandarin": "我叫小李，在财务部工作。" },
                { "canto": "我叫阿傑，負責審計。", "jyutping": "ngo5 giu3 aa3 git6, fu6 zaak6 sam2 gai3.", "mandarin": "我叫阿杰，负责审计。" },
                { "canto": "我叫David，IT部嘅。", "jyutping": "ngo5 giu3 David, IT bou6 ge3.", "mandarin": "我叫David，IT部的。" }
              ]
            },
            {
              "name": "句型2：做咗___耐（做了___多久）",
              "usage": "表达工作年限或做事时长，「咗」表示完成态，「幾耐」询问时长",
              "examples": [
                { "canto": "做咗三年。", "jyutping": "zou6 zo2 saam1 nin4.", "mandarin": "做了三年。" },
                { "canto": "做咗好耐。", "jyutping": "zou6 zo2 hou2 noi6.", "mandarin": "做了很久。" },
                { "canto": "做咗冇幾耐。", "jyutping": "zou6 zo2 mou5 gei2 noi6.", "mandarin": "做了没多久。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "英文名即係職場ID",
              "icon": "🆔",
              "content": "香港公司超過90%的人有英文名。自我介紹時說「我叫阿Ken」比「我叫陳健華」更自然。名片上通常是「Ken Chan」格式，中文名反而不是必需。"
            },
            {
              "title": "「唔該晒」vs「多謝晒」",
              "icon": "🙏",
              "content": "「唔該晒」用於別人幫你做事（如帶路、安排工位），「多謝晒」用於別人送禮物或請吃飯。搞混了會顯得失禮。"
            },
            {
              "title": "唔好叫「X總」",
              "icon": "🤝",
              "content": "香港職場不習慣叫「張總」「王總」，直接叫英文名最安全。正式場合可以叫「陳生」「張小姐」，但偏傳統。叫英文名是通用禮儀。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——部門晨會自我介紹",
              "description": "周一晨会上，你第一次面对全组同事做自我介绍，请选择正确的做法",
              "scenes": [
                {
                  "scene": "場景A：面向全組同事做自我介紹",
                  "options": [
                    { "text": "「大家好，我叫XXX，新加入財務部，請多多指教！」", "correct": true },
                    { "text": "「喂，我係新嚟㗎。」", "correct": false, "reason": "太随意，不适合正式场合" },
                    { "text": "「你好，我叫XXX。」", "correct": false, "reason": "「大家好」更適合對全組" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填充——部門與職責",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "我在财务部工作 → 粵語：我___財務部做。", "answer": "喺" },
                { "question": "我叫阿杰，负责审计 → 粵語：我叫阿杰，___審計。", "answer": "負責" },
                { "question": "我做了三年 → 粵語：我___三年。", "answer": "做咗" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "請多多指教。", "mandarin": "请多多关照。" },
                { "canto": "做咗好耐。", "mandarin": "做了很久。" },
                { "canto": "有咩唔明白搵我。", "mandarin": "有什么不明白找我。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 3, title: '数字与日期', level: 1, order_index: 3, description: '学习粤语数字、日期和时间的表达方式', difficulty_label: '🟢 轻松',
    content_json: JSON.stringify({
      "course_id": "MO-01-03",
      "title": "数字与日期",
      "level": 1,
      "order_index": 3,
      "duration_minutes": 18,
      "number_reference": {
        "digits": [
          { "num": 1, "canto": "一", "jyutping": "jat1", "mnemonic": "一" },
          { "num": 2, "canto": "二/義", "jyutping": "ji6", "mnemonic": "二/義" },
          { "num": 3, "canto": "三", "jyutping": "saam1", "mnemonic": "衫" },
          { "num": 4, "canto": "四", "jyutping": "sei3", "mnemonic": "塞" },
          { "num": 5, "canto": "五", "jyutping": "ng5", "mnemonic": "唔" },
          { "num": 6, "canto": "六", "jyutping": "luk6", "mnemonic": "碌" },
          { "num": 7, "canto": "七", "jyutping": "cat1", "mnemonic": "七" },
          { "num": 8, "canto": "八", "jyutping": "baat3", "mnemonic": "八" },
          { "num": 9, "canto": "九", "jyutping": "gau2", "mnemonic": "狗" },
          { "num": 10, "canto": "十", "jyutping": "sap6", "mnemonic": "實" }
        ],
        "special": [
          { "num": 11, "canto": "十一", "jyutping": "sap6 jat1" },
          { "num": 12, "canto": "十二", "jyutping": "sap6 ji6" },
          { "num": 20, "canto": "二十", "jyutping": "ji6 sap6", "note": "義實" },
          { "num": 100, "canto": "一百", "jyutping": "jat1 baak3" },
          { "num": 1000, "canto": "一千", "jyutping": "jat1 cin1" }
        ]
      },
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "同事 Sarah 找你约会议时间，你需要用粤语确认日期、时间，并在日历上做标记。之后你打电话给vendor确认下周一 Delivery 时间。",
          "scenes": [
            {
              "name": "第一幕：约会议时间",
              "location": "工位前",
              "lines": [
                { "speaker": "Sarah", "text": "喂，我想約個時間同你傾個project，你幾時得閒？", "jyutping": "wai2, ngo5 soeng2 joek3 go3 si4 gaan3 tung4 nei5 king1 go3 project, nei5 gei2 si4 dak1 haan4?", "mandarin": "喂，我想约个时间跟你聊个project，你什么时候有空？" },
                { "speaker": "你", "text": "我睇下schedule⋯⋯ 星期二同星期四下午都得。", "jyutping": "ngo5 tai2 haa5 schedule... sing1 kei4 ji6 tung4 sing1 kei4 sei3 haa6 ng5 dou1 dak1.", "mandarin": "我看下日程... 星期二和星期四下午都可以。" },
                { "speaker": "Sarah", "text": "咁星期四下午三點得唔得？", "jyutping": "gam2 sing1 kei4 sei3 haa6 ng5 saam1 dim2 dak1 m4 dak1?", "mandarin": "那星期四下午三点行不行？" },
                { "speaker": "你", "text": "三點？OK，我冇問題。", "jyutping": "saam1 dim2? OK, ngo5 mou5 man6 tai4.", "mandarin": "三点？OK，我没问题。" },
                { "speaker": "Sarah", "text": "好，我send invitation畀你。", "jyutping": "hou2, ngo5 send invitation bei2 nei5.", "mandarin": "好，我发会议邀请给你。" },
                { "speaker": "你", "text": "收到，到時見。", "jyutping": "sau1 dou2, dou3 si4 gin3.", "mandarin": "收到，到时候见。" }
              ]
            },
            {
              "name": "第二幕：确认送货日期",
              "location": "打电话给vendor",
              "lines": [
                { "speaker": "你", "text": "（打電話）喂，請問Delivery係咪下個禮拜一？", "jyutping": "(daa2 din6 waa2) wai2, cing2 man6 Delivery hai6 mai6 haa6 go3 lai5 baai3 jat1?", "mandarin": "（打电话）喂，请问Delivery是不是下周一？" },
                { "speaker": "Vendor", "text": "係呀，一月十五號，上午十點送到。", "jyutping": "hai6 aa3, jat1 jyut6 sap6 ng5 hou6, soeng6 ng5 sap6 dim2 sung3 dou3.", "mandarin": "是的，一月十五号，上午十点送到。" },
                { "speaker": "你", "text": "上午十點，收到。價錢方面係咪之前報嘅$12,500？", "jyutping": "soeng6 ng5 sap6 dim2, sau1 dou2. gaa3 cin4 fong1 min6 hai6 mai6 zi1 cin4 bou3 ge3 $12,500?", "mandarin": "上午十点，收到。价钱方面是不是之前报的$12,500？" },
                { "speaker": "Vendor", "text": "冇錯，總數一萬二千五百蚊。", "jyutping": "mou5 co3, zung2 sou3 jat1 maan6 ji6 cin1 ng5 baak3 man1.", "mandarin": "没错，总数一万二千五百块。" },
                { "speaker": "你", "text": "好，到時見，唔該。", "jyutping": "hou2, dou3 si4 gin3, m4 goi1.", "mandarin": "好，到时候见，谢谢。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "幾時", "jyutping": "gei2 si4", "mandarin": "什么时候", "mnemonic": "给时", "scene": "询问时间", "enteringTone": false },
            { "word": "得閒", "jyutping": "dak1 haan4", "mandarin": "有空", "mnemonic": "达罕", "scene": "「得閒」=有空，「唔得閒」=没空", "enteringTone": true },
            { "word": "三點", "jyutping": "saam1 dim2", "mandarin": "三点", "mnemonic": "衫点", "scene": "数字+點=几点", "enteringTone": false },
            { "word": "下個禮拜", "jyutping": "haa6 go3 lai5 baai3", "mandarin": "下周", "mnemonic": "哈哥离拜", "scene": "「今個禮拜」=本周，「上個禮拜」=上周", "enteringTone": true },
            { "word": "一月十五號", "jyutping": "jat1 jyut6 sap6 ng5 hou6", "mandarin": "1月15日", "mnemonic": "一玉实唔号", "scene": "日期格式：月+號", "enteringTone": true },
            { "word": "總數", "jyutping": "zung2 sou3", "mandarin": "总计/总金额", "mnemonic": "总素", "scene": "谈钱用「總數」或「埋單」", "enteringTone": false },
            { "word": "十二點半", "jyutping": "sap6 ji6 dim2 bun3", "mandarin": "十二点半", "mnemonic": "实义点半", "scene": "半=30分钟", "enteringTone": true },
            { "word": "到時見", "jyutping": "dou3 si4 gin3", "mandarin": "到时候见", "mnemonic": "到时见", "scene": "约好时间后的结束语", "enteringTone": false }
          ],
          "numberTable": true
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：___得唔得？（___行不行？/___可以吗？）",
              "usage": "确认时间或方案的极高频句式，用「得唔得」构成正反问句",
              "examples": [
                { "canto": "星期四下午三點得唔得？", "jyutping": "sing1 kei4 sei3 haa6 ng5 saam1 dim2 dak1 m4 dak1", "mandarin": "周四下午三点行不行？" },
                { "canto": "聽日十點得唔得？", "jyutping": "ting1 jat6 sap6 dim2 dak1 m4 dak1", "mandarin": "明天十点行不行？" },
                { "canto": "下個禮拜一得唔得？", "jyutping": "haa6 go3 lai5 baai3 jat1 dak1 m4 dak1", "mandarin": "下周一行不行？" }
              ]
            },
            {
              "name": "句型2：___之前/之後（___之前/之后）",
              "usage": "表达时间节点，用「之前」或「之後」标记时间边界",
              "examples": [
                { "canto": "三點之前覆你。", "jyutping": "saam1 dim2 zi1 cin4 fuk1 nei5", "mandarin": "三点之前回复你。" },
                { "canto": "食飯之後傾。", "jyutping": "sik6 faan6 zi1 hau6 king1", "mandarin": "吃完饭之后聊。" },
                { "canto": "星期五之前要交。", "jyutping": "sing1 kei4 ng5 zi1 cin4 jiu3 gaau1", "mandarin": "周五之前要交。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "香港日期寫法不同",
              "icon": "📅",
              "content": "香港日期寫「15/1/2026」（日/月/年），跟內地「2026/1/15」不同，搞錯會很麻煩。會議邀請上如果是「3/4」可能是3月4日也可能是4月3日，要看上下文。"
            },
            {
              "title": "時間說法「三點三個字」",
              "icon": "🕒",
              "content": "香港人說時間經常用「字」代替「十五分鐘」。「三點三個字」=3:15，「三點半」=3:30，「三點九個字」=3:45。這叫「鐘面讀法」，看時鐘刻度來讀。"
            },
            {
              "title": "「點半」不是拖延",
              "icon": "⏰",
              "content": "香港人說「等我半個鐘」意思是等我30分鐘，不是半小時後放棄。約時間說「十二點半見」，請準時到——香港人時間觀念很強，遲到5分鐘就要說「唔好意思」。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——聽日期",
              "description": "同事說「下個禮拜三下午兩點開會」，是星期幾幾點？请选择正确理解",
              "scenes": [
                {
                  "scene": "場景A：同事約你開會時間",
                  "options": [
                    { "text": "週三下午2點", "correct": true },
                    { "text": "週二下午2點", "correct": false, "reason": "「下個禮拜三」是周三不是周二" },
                    { "text": "週三下午3點", "correct": false, "reason": "「兩點」=2点不是3点" },
                    { "text": "週四下午2點", "correct": false, "reason": "三是「三」不是「四」" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语关键词",
              "items": [
                { "question": "你什么时候有空 → 粵語：你___得閒？", "answer": "幾時" },
                { "question": "周五之前要交 → 粵語：星期五之前___交。", "answer": "要" },
                { "question": "周四下午三点行不行 → 粵語：星期四下晝三點___？", "answer": "得唔得" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "十二點半見。", "mandarin": "十二点半见。" },
                { "canto": "下個禮拜一先得。", "mandarin": "下周一才行。" },
                { "canto": "收到，到時見。", "mandarin": "收到，到时候见。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 4, title: '电话基本用语', level: 1, order_index: 4, description: '学习粤语职场电话接听与拨打', difficulty_label: '🟢 轻松',
    content_json: JSON.stringify({
      "course_id": "MO-01-04",
      "title": "电话基本用语",
      "level": 1,
      "order_index": 4,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你接到一个找同事阿辉的电话，但阿辉在开会。你需要帮对方留言。之后你自己也要打一个电话找采购部Wilson确认合同。",
          "scenes": [
            {
              "name": "第一幕：帮同事接电话",
              "location": "办公位",
              "lines": [
                { "speaker": "你", "text": "喂，財務部。", "jyutping": "wai3, coi4 mou6 bou6.", "mandarin": "喂，财务部。" },
                { "speaker": "來電者（Wilson）", "text": "喂，請問阿輝喺唔喺度呀？", "jyutping": "wai2, cing2 man6 aa3 fai1 hai2 m4 hai2 dou6 aa3?", "mandarin": "喂，请问阿辉在不在？" },
                { "speaker": "你", "text": "請問邊位搵佢呀？", "jyutping": "cing2 man6 bin1 wai2 wan2 keoi5 aa3?", "mandarin": "请问哪位找他？" },
                { "speaker": "來電者（Wilson）", "text": "我係採購部嘅Wilson，搵佢傾個contract。", "jyutping": "ngo5 hai6 coi2 gau3 bou6 ge3 Wilson, wan2 keoi5 king1 go3 contract.", "mandarin": "我是采购部的Wilson，找他聊个合同。" },
                { "speaker": "你", "text": "佢而家開緊會，你可唔可以遲啲再打嚟？", "jyutping": "keoi5 ji4 gaa1 hoi1 gan2 wui2, nei5 ho2 m4 ho2 ji5 ci4 di1 zoi3 daa2 lai4?", "mandarin": "他现在正在开会，你可不可以晚点再打来？" },
                { "speaker": "來電者（Wilson）", "text": "咁我留個口信得唔得？", "jyutping": "gam2 ngo5 lau4 go3 hau2 seon3 dak1 m4 dak1?", "mandarin": "那我留个言行不行？" },
                { "speaker": "你", "text": "得，你講啦。", "jyutping": "dak1, nei5 gong2 laa1.", "mandarin": "可以，你说吧。" },
                { "speaker": "來電者（Wilson）", "text": "麻煩你同佢講，個contract我今日會email畀佢，請佢盡快confirm。", "jyutping": "maa4 faan4 nei5 tung4 keoi5 gong2, go3 contract ngo5 gam1 jat6 wui5 email bei2 keoi5, cing2 keoi5 zeon6 faai3 confirm.", "mandarin": "麻烦你跟他说，合同我今天会发邮件给他，请他尽快确认。" },
                { "speaker": "你", "text": "好，我同佢講。Wilson，採購部，contract要confirm，冇錯呀嘛？", "jyutping": "hou2, ngo5 tung4 keoi5 gong2. Wilson, coi2 gau3 bou6, contract jiu3 confirm, mou5 co3 aa6 maa3?", "mandarin": "好，我跟他说。Wilson，采购部，合同要确认，没错吧？" },
                { "speaker": "來電者（Wilson）", "text": "冇錯，唔該晒！", "jyutping": "mou5 co3, m4 goi1 saai3!", "mandarin": "没错，非常感谢！" },
                { "speaker": "你", "text": "唔客氣，再見。", "jyutping": "m4 haak3 hei3, zoi3 gin3.", "mandarin": "不客气，再见。" }
              ]
            },
            {
              "name": "第二幕：自己打电话找人",
              "location": "打电话给采购部",
              "lines": [
                { "speaker": "你", "text": "（打電話）喂，請問Wilson喺唔喺度？", "jyutping": "(daa2 din6 waa2) wai2, cing2 man6 Wilson hai2 m4 hai2 dou6?", "mandarin": "（打电话）喂，请问Wilson在不在？" },
                { "speaker": "秘書", "text": "Wilson而家開緊會，可唔可以留低你個電話，我叫佢覆你？", "jyutping": "Wilson ji4 gaa1 hoi1 gan2 wui2, ho2 m4 ho2 ji5 lau4 dai1 nei5 go3 din6 waa2, ngo5 giu3 keoi5 fuk1 nei5?", "mandarin": "Wilson现在正在开会，可不可以留下你的电话，我叫他回复你？" },
                { "speaker": "你", "text": "好，我係財務部嘅XXX，叫我覆我電話就得，我分機號係8234。", "jyutping": "hou2, ngo5 hai6 coi4 mou6 bou6 ge3 XXX, giu3 ngo5 fuk1 ngo5 din6 waa2 zau6 dak1, ngo5 fan1 gei1 hou6 hai6 baat3 ji6 saam1 sei3.", "mandarin": "好，我是财务部的XXX，让他回复我电话就行，我分机号是8234。" },
                { "speaker": "秘書", "text": "8234，收到。我叫佢覆你。", "jyutping": "baat3 ji6 saam1 sei3, sau1 dou2. ngo5 giu3 keoi5 fuk1 nei5.", "mandarin": "8234，收到。我叫他回复你。" },
                { "speaker": "你", "text": "唔該晒，再見。", "jyutping": "m4 goi1 saai3, zoi3 gin3.", "mandarin": "非常感谢，再见。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "喂", "jyutping": "wai3", "mandarin": "喂", "mnemonic": "喂", "scene": "接电话第一声，语气要稳", "enteringTone": false },
            { "word": "喺唔喺度", "jyutping": "hai2 m4 hai2 dou6", "mandarin": "在不在", "mnemonic": "海唔海度", "scene": "问某人在不在", "enteringTone": false },
            { "word": "邊位", "jyutping": "bin1 wai2", "mandarin": "哪位", "mnemonic": "宾位", "scene": "比「邊個」更禮貌", "enteringTone": false },
            { "word": "搵", "jyutping": "wan2", "mandarin": "找", "mnemonic": "稳", "scene": "「搵佢」=找他", "enteringTone": false },
            { "word": "開緊會", "jyutping": "hoi1 gan2 wui2", "mandarin": "正在开会", "mnemonic": "开根会", "scene": "「緊」表進行時", "enteringTone": false },
            { "word": "留口信", "jyutping": "lau4 hau2 seon3", "mandarin": "留言", "mnemonic": "楼口迅", "scene": "電話留言", "enteringTone": true },
            { "word": "覆你", "jyutping": "fuk1 nei5", "mandarin": "回复你", "mnemonic": "福内", "scene": "港式極高頻詞", "enteringTone": true },
            { "word": "分機號", "jyutping": "fan1 gei1 hou6", "mandarin": "分机号", "mnemonic": "翻給号", "scene": "說數字用粵語", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：請問___喺唔喺度？（請問___在不在？）",
              "usage": "打電話找人的標準開場白，用「喺唔喺度」構成正反問句",
              "examples": [
                { "canto": "請問阿輝喺唔喺度呀？", "jyutping": "cing2 man6 aa3 fai1 hai2 m4 hai2 dou6 aa1", "mandarin": "請問阿輝在不在？" },
                { "canto": "請問Manager喺唔喺度？", "jyutping": "cing2 man6 Manager hai2 m4 hai2 dou6", "mandarin": "請問Manager在不在？" },
                { "canto": "請問陳太喺唔喺度？", "jyutping": "cing2 man6 can4 taai2 hai2 m4 hai2 dou6", "mandarin": "請問陳太太在不在？" }
              ]
            },
            {
              "name": "句型2：可唔可以___？（可不可以___？）",
              "usage": "徵求許可的萬能句式，用「可唔可以」提出請求或給選項",
              "examples": [
                { "canto": "可唔可以遲啲再打嚟？", "jyutping": "ho2 m4 ho2 ji5 ci4 di1 zoi3 daa2 lai4", "mandarin": "可不可以迟点再打来？" },
                { "canto": "可唔可以留個口信？", "jyutping": "ho2 m4 ho2 ji5 lau4 go3 hau2 seon3", "mandarin": "可不可以留个言？" },
                { "canto": "可唔可以叫佢覆我？", "jyutping": "ho2 m4 ho2 ji5 giu3 keoi5 fuk1 ngo5", "mandarin": "可不可以叫他回复我？" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "接電話標準流程（四步法）",
              "icon": "📞",
              "content": "第1步：喂，[部門名] → 報身份。第2步：請問邊位搵佢？→ 問對方。第3步：佢而家___（開會/出去了）→ 說明情況。第4步：可唔可以___？→ 給選項。永遠不要只說「喂」然後沉默，這是極不專業的表現。"
            },
            {
              "title": "「覆」字是職場電話的靈魂",
              "icon": "📲",
              "content": "「覆我」「覆返你」「遲啲覆你」「覆email」，一個「覆」字走天下。覆（fuk1/福）=回覆，讀一聲，不要讀成「復」。這是港式職場用得最多的字之一。"
            },
            {
              "title": "分機號用粵語讀",
              "icon": "🔢",
              "content": "說分機號時數字用粵語讀——1 jat1（一）, 2 ji6（義）, 3 saam1（三）, 4 sei3（塞）, 5 ng5（唔）, 6 luk6（碌）, 7 cat1（七）, 8 baat3（八）, 9 gau2（狗）, 0 ling4（零）。不要用普通話說分機號，對方可能聽不懂。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——同事不在工位",
              "description": "電話響了，你接起來，對方找你同事David，但David不在工位。你該怎麼回應？",
              "scenes": [
                {
                  "scene": "場景A：接到找同事的电话",
                  "options": [
                    { "text": "「請問邊位搵佢呀？David而家出咗去，可唔可以遲啲再打嚟？或者留個口信我同佢講。」", "correct": true },
                    { "text": "「David不在，你晚點打。」", "correct": false, "reason": "太隨意，無粵語表達" },
                    { "text": "「佢唔喺度，你留低電話啦。」", "correct": false, "reason": "沒問對方身份，不夠禮貌" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——電話常用語",
              "description": "补全以下電話場景中的關鍵粤语词汇",
              "items": [
                { "question": "請問阿輝___喺度呀？（在不在）", "answer": "喺唔" },
                { "question": "我可唔可以___個口信？（留）", "answer": "留" },
                { "question": "麻煩你叫佢___我。（回复）", "answer": "覆" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "佢而家開緊會。", "mandarin": "他正在开会。" },
                { "canto": "麻煩你同佢講。", "mandarin": "麻烦你跟他说。" },
                { "canto": "冇錯，唔該晒。", "mandarin": "没错，非常感谢。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 5, title: '公司组织架构', level: 1, order_index: 5, description: '学习公司部门和职位的粤语称谓', difficulty_label: '🟢 轻松',
    content_json: JSON.stringify({
      "course_id": "MO-01-05",
      "title": "公司组织架构称谓",
      "level": 1,
      "order_index": 5,
      "duration_minutes": 18,
      "departments": [
        { "name": "財務部", "jyutping": "coi4 mou6 bou6" },
        { "name": "IT部", "jyutping": "IT bou6" },
        { "name": "人力資源部/HR", "jyutping": "jan4 lik6 zi1 jyun4 bou6 / HR" },
        { "name": "市場部/Marketing", "jyutping": "si5 coeng4 bou6 / Marketing" },
        { "name": "銷售部/Sales", "jyutping": "siu1 sau6 bou6 / Sales" },
        { "name": "營運部/Operations", "jyutping": "jing4 wan6 bou6 / Operations" }
      ],
      "positions": [
        { "title": "行政總裁/CEO", "jyutping": "hang4 zing3 zung2 coi4 / CEO" },
        { "title": "財務總監/CFO", "jyutping": "coi4 mou6 zung2 gaam1 / CFO" },
        { "title": "營運總監/COO", "jyutping": "jing4 wan6 zung2 gaam1 / COO" },
        { "title": "總監/Director", "jyutping": "zung2 gaam1 / Director" },
        { "title": "高級經理/Senior Manager", "jyutping": "gou1 kap1 ging1 lei5 / Senior Manager" },
        { "title": "經理/Manager", "jyutping": "ging1 lei5 / Manager" },
        { "title": "主管/Supervisor", "jyutping": "zyu2 gun2 / Supervisor" },
        { "title": "同事/Staff", "jyutping": "tung4 si6 / Staff" }
      ],
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你入职一周了，需要了解公司各部门谁负责什么。同事 Sarah 给你画了个组织架构图，然后你需要在内部通讯录上确认各部门负责人。",
          "scenes": [
            {
              "name": "第一幕：了解组织架构",
              "location": "茶水间",
              "lines": [
                { "speaker": "你", "text": "Sarah，我想問下我哋公司嘅架構係點㗎？", "jyutping": "Sarah, ngo5 soeng2 man6 haa5 ngo5 dei6 gung1 si1 ge3 gaa3 kau3 hai6 dim2 gaa3?", "mandarin": "Sarah，我想问一下我们公司的架构是怎样的？" },
                { "speaker": "Sarah", "text": "好簡單，上面係CEO陳生，跟住係CFO同COO。", "jyutping": "hou2 gaan2 daan1, soeng6 min6 hai6 CEO can4 saang1, gan1 zyu6 hai6 CFO tung4 COO.", "mandarin": "很简单，上面是CEO陈先生，接着是CFO和COO。" },
                { "speaker": "你", "text": "咁我哋財務部嘅head係邊個？", "jyutping": "gam2 ngo5 dei6 coi4 mou6 bou6 ge3 head hai6 bin1 go3?", "mandarin": "那我们财务部的负责人是谁？" },
                { "speaker": "Sarah", "text": "財務部嘅director係張國強，你見過啦。佢下面有兩個team——會計組同FP&A組。", "jyutping": "coi4 mou6 bou6 ge3 director hai6 zoeng1 gwok3 koeng4, nei5 gin3 gwo3 laa1. keoi5 haa6 min6 jau5 loeng5 go3 team——wui6 gai3 zou2 tung4 FP&A zou2.", "mandarin": "财务部的总监是张国强，你见过了。他下面有两个团队——会计组和FP&A组。" },
                { "speaker": "你", "text": "明白。IT部又係邊個負責？", "jyutping": "ming4 baak6. IT bou6 jau6 hai6 bin1 go3 fu6 zaak3?", "mandarin": "明白。IT部又是谁负责？" },
                { "speaker": "Sarah", "text": "IT部嘅head係Thomas，阿Ken就係佢team嘅同事。", "jyutping": "IT bou6 ge3 head hai6 Thomas, aa3 Ken zau6 hai6 keoi5 team ge3 tung4 si6.", "mandarin": "IT部的负责人是Thomas，阿Ken就是他团队的同事。" },
                { "speaker": "你", "text": "哦，即係Thomas係Ken嘅上司。", "jyutping": "o4, zik1 hai6 Thomas hai6 Ken ge3 soeng6 si1.", "mandarin": "哦，也就是说Thomas是Ken的上司。" },
                { "speaker": "Sarah", "text": "啱啦！你有冇睇過公司個organisation chart？", "jyutping": "ngaam1 laa1! nei5 jau5 mou5 tai2 gwo3 gung1 si1 go3 organisation chart?", "mandarin": "对了！你有没有看过公司的组织架构图？" },
                { "speaker": "你", "text": "未啊，可唔可以send畀我？", "jyutping": "mei6 aa3, ho2 m4 ho2 ji5 send bei2 ngo5?", "mandarin": "没有，可以发给我吗？" },
                { "speaker": "Sarah", "text": "好，我陣間email畀你。", "jyutping": "hou2, ngo5 zan6 gaan1 email bei2 nei5.", "mandarin": "好，我等会儿发邮件给你。" }
              ]
            },
            {
              "name": "第二幕：确认部门分工",
              "location": "工位前看通讯录",
              "lines": [
                { "speaker": "你", "text": "（睇緊org chart）咦，原來我哋公司有六個部門：財務、IT、HR、Marketing、Sales同Operations。", "jyutping": "(tai2 gan2 org chart) ji2, jyun4 loi4 ngo5 dei6 gung1 si1 jau5 luk6 go3 bou6 mun4: coi4 mou6, IT, HR, Marketing, Sales tung4 Operations.", "mandarin": "（看着组织架构图）咦，原来我们公司有六个部门：财务、IT、HR、Marketing、Sales和Operations。" },
                { "speaker": "同事", "text": "係呀，每個部門都有一個director或者manager。", "jyutping": "hai6 aa3, mui5 go3 bou6 mun4 dou1 jau5 jat1 go3 director waak6 ze2 manager.", "mandarin": "是啊，每个部门都有一个总监或经理。" },
                { "speaker": "你", "text": "咁HR邊個話事？", "jyutping": "gam2 HR bin1 go3 waa6 si6?", "mandarin": "那HR谁说了算？" },
                { "speaker": "同事", "text": "HR嘅head係Maggie，請假、出糧都係搵佢。", "jyutping": "HR ge3 head hai6 Maggie, cing2 gaa3, ceot1 loeng4 dou1 hai6 wan2 keoi5.", "mandarin": "HR的负责人是Maggie，请假、发工资都是找她。" },
                { "speaker": "你", "text": "好，我記低先。", "jyutping": "hou2, ngo5 gei3 dai1 sin1.", "mandarin": "好，我先记下来。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "架構", "jyutping": "gaa3 kau3", "mandarin": "架构/结构", "mnemonic": "嘎扣", "scene": "公司組織架構", "enteringTone": false },
            { "word": "Head/老細", "jyutping": "head / lou5 sai3", "mandarin": "负责人/老板", "mnemonic": "老晒", "scene": "部門負責人的口語叫法", "enteringTone": false },
            { "word": "上司", "jyutping": "soeng6 si1", "mandarin": "上司/上级", "mnemonic": "上丝", "scene": "直接匯報對象", "enteringTone": false },
            { "word": "下屬", "jyutping": "haa6 suk6", "mandarin": "下属", "mnemonic": "哈宿", "scene": "自己帶的人", "enteringTone": true },
            { "word": "部門", "jyutping": "bou6 mun4", "mandarin": "部门", "mnemonic": "步门", "scene": "「呢個部門」=这个部门", "enteringTone": false },
            { "word": "同事", "jyutping": "tung4 si6", "mandarin": "同事", "mnemonic": "同西", "scene": "同公司的人", "enteringTone": false },
            { "word": "話事", "jyutping": "waa6 si6", "mandarin": "做主/说了算", "mnemonic": "话西", "scene": "「邊個話事」=谁说了算", "enteringTone": false },
            { "word": "Director/Manager", "jyutping": "—", "mandarin": "总监/经理", "mnemonic": "—", "scene": "直接說英文職位", "enteringTone": false }
          ],
          "showDeptRef": true,
          "showPositionRef": true
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：___嘅head係邊個？（___的負責人是誰？）",
              "usage": "问组织架构的固定句式，用「head」或「話事」表示负责人",
              "examples": [
                { "canto": "財務部嘅head係邊個？", "jyutping": "coi4 mou6 bou6 ge3 head hai6 bin1 go3", "mandarin": "财务部的负责人是谁？" },
                { "canto": "呢個project嘅head係邊個？", "jyutping": "ni1 go3 project ge3 head hai6 bin1 go3", "mandarin": "这个项目的负责人是谁？" },
                { "canto": "IT部邊個話事？", "jyutping": "IT bou6 bin1 go3 waa6 si6", "mandarin": "IT部谁说了算？" }
              ]
            },
            {
              "name": "句型2：___上面/下面有___（___上面/下面有___）",
              "usage": "描述层级关系，「上面」=上级/上层，「下面」=下属/下层",
              "examples": [
                { "canto": "CEO上面係board of directors。", "jyutping": "CEO soeng6 min6 hai6 board of directors", "mandarin": "CEO上面是董事会。" },
                { "canto": "張經理下面有兩個team。", "jyutping": "zoeng1 ging1 lei5 haa6 min6 jau5 loeng5 go3 team", "mandarin": "张经理下面有两个团队。" },
                { "canto": "佢係我嘅直接上司。", "jyutping": "keoi5 hai6 ngo5 ge3 zik6 zip3 soeng6 si1", "mandarin": "他是我的直接上级。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "香港職場稱呼的「3條規則」",
              "icon": "🏢",
              "content": "第一層（同事間）：直接叫英文名，最常見也最安全。第二層（對上級）：叫英文名或「[英文名]+哥/姐」（如「Ken哥」「Sarah姐」），不要叫「X總」。第三層（正式場合/對客戶）：叫「[姓氏]生/[姓氏]小姐」（如「陳生」「張小姐」）。"
            },
            {
              "title": "「老細」的用法",
              "icon": "👔",
              "content": "「老細」= 老闆/上司，口語極高頻。可以直呼「老細」或「我老細」= 我的上司。但注意：不要當面叫CEO「老細」，顯得太隨便。當面叫英文名即可。"
            },
            {
              "title": "職位英文名才是正式title",
              "icon": "💼",
              "content": "香港公司無論中資外資，職位通常用英文：Director、Manager、Senior Consultant、Analyst。面試時問「你而家個title係咩？」回答「我係Senior Analyst」比「高級分析員」更自然。名片上也是英文title為主。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——架構理解",
              "description": "同事話「Thomas係IT部嘅head，阿Ken係佢嘅下屬」，以下哪個是對的？",
              "scenes": [
                {
                  "scene": "场景A：理解组织层级关系",
                  "options": [
                    { "text": "Thomas是Ken的上司", "correct": true },
                    { "text": "Ken是Thomas的上司", "correct": false, "reason": "「下屬」=下属，所以Ken是Thomas的下属" },
                    { "text": "Thomas和Ken是平級", "correct": false, "reason": "「head」和「下屬」不是平级" },
                    { "text": "他們在不同部門", "correct": false, "reason": "Ken在Thomas的team里，同属IT部" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——部門與職位",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "财务部的粤语是___部。", "answer": "財務" },
                { "question": "人力资源部常直接叫___。", "answer": "HR" },
                { "question": "部门负责人的口语叫法是___。", "answer": "老細" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "邊個話事？", "mandarin": "谁说了算？" },
                { "canto": "我哋公司有六個部門。", "mandarin": "我们公司有六个部门。" },
                { "canto": "佢係我嘅直接上司。", "mandarin": "他是我的直接上级。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 6, title: '电邮基本用语', level: 1, order_index: 6, description: '学习粤语邮件和Teams消息', difficulty_label: '🟢 轻松',
    content_json: JSON.stringify({
      "course_id": "MO-01-06",
      "title": "电邮基本用语",
      "level": 1,
      "order_index": 6,
      "duration_minutes": 18,
      "email_terms": [
        { "action": "發送", "canto": "send", "mandarin": "发送" },
        { "action": "回覆", "canto": "reply / 覆", "mandarin": "回复" },
        { "action": "全部回覆", "canto": "reply all", "mandarin": "全部回复" },
        { "action": "轉發", "canto": "forward / 轉發", "mandarin": "转发" },
        { "action": "抄送", "canto": "CC", "mandarin": "抄送" },
        { "action": "密送", "canto": "BCC", "mandarin": "密送" },
        { "action": "附件", "canto": "attachment / 附件", "mandarin": "附件" },
        { "action": "主題", "canto": "subject / 主題", "mandarin": "主题" }
      ],
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "Sarah 教你香港办公室的email习惯，然后你需要给vendor发一封确认邮件，并回复Manager的邮件抄送问题。",
          "scenes": [
            {
              "name": "第一幕：学写email",
              "location": "工位前",
              "lines": [
                { "speaker": "Sarah", "text": "你識唔識寫香港式email㗎？", "jyutping": "nei5 sik1 m4 sik1 se2 hoeng1 gong2 sik1 email gaa3?", "mandarin": "你会不会写香港式的邮件？" },
                { "speaker": "你", "text": "即係有咩要注意？", "jyutping": "zik1 hai6 jau5 me1 jiu3 zyu3 ji3?", "mandarin": "就是有什么要注意？" },
                { "speaker": "Sarah", "text": "開頭要寫「Hello XXX」或者「Dear XXX」，唔好寫「尊敬的」。", "jyutping": "hoi1 tau4 jiu3 se2 「Hello XXX」waak6 ze2 「Dear XXX」, m4 hou2 se2 「zyun1 ging3 dik1」.", "mandarin": "开头要写「Hello XXX」或者「Dear XXX」，不要写「尊敬的」。" },
                { "speaker": "你", "text": "明白，咁結尾呢？", "jyutping": "ming4 baak6, gam2 git3 mei5 ne1?", "mandarin": "明白，那结尾呢？" },
                { "speaker": "Sarah", "text": "結尾用「Regards」、「Thanks」或者「Best Regards」，唔使太長。", "jyutping": "git3 mei5 jung6 「Regards」, 「Thanks」waak6 ze2 「Best Regards」, m4 sai2 taai3 coeng4.", "mandarin": "结尾用「Regards」、「Thanks」或者「Best Regards」，不需要太长。" },
                { "speaker": "你", "text": "好簡單咋喎。CC人又有冇規矩？", "jyutping": "hou2 gaan2 daan1 zaa3 wo3. CC jan4 jau6 jau5 mou5 kwai1 geoi2?", "mandarin": "很简单啊。CC人又有什么规矩？" },
                { "speaker": "Sarah", "text": "CC相關嘅同事就得，唔好CC全世界。Reply All嘅時候要諗過先。", "jyutping": "CC soeng1 gwaan1 ge3 tung4 si6 zau6 dak1, m4 hou2 CC cyun4 sai3 gaai3. Reply All ge3 si4 hau6 jiu3 nam2 gwo3 sin1.", "mandarin": "CC相关同事就行，不要CC全世界。Reply All的时候要想清楚再点。" },
                { "speaker": "你", "text": "收到，我記低先。", "jyutping": "sau1 dou2, ngo5 gei3 dai1 sin1.", "mandarin": "收到，我先记下来。" }
              ]
            },
            {
              "name": "第二幕：实际写email",
              "location": "工位前写邮件",
              "lines": [
                { "speaker": "你", "text": "（寫緊email）Hello Wilson，Regarding個contract，我哋確認冇問題，可以簽署。Please find attached the signed copy. Let me know if you have any questions. Thanks，XXX", "jyutping": "(se2 gan2 email) Hello Wilson, Regarding go3 contract, ngo5 dei6 kok3 jing6 mou5 man6 tai4, ho2 ji5 cim1 cyu5.", "mandarin": "（正在写邮件）Hello Wilson，关于合同，我们确认没问题，可以签署。" },
                { "speaker": "Sarah", "text": "（望一望）好工整喎！不過可以加句「請查收附件」喺中間。", "jyutping": "(mong6 jat1 mong6) hou2 gung1 zing2 wo3! bat1 gwo3 ho2 ji5 gaa1 geoi3 「ceng2 caa4 sau1 fu6 gin2」hai2 zung1 gaan1.", "mandarin": "（看了一眼）很工整哦！不过可以加一句「请查收附件」在中间。" },
                { "speaker": "你", "text": "係喎，粵式英文加句粤语都得？", "jyutping": "hai6 wo3, jyut6 sik1 jing1 man2 gaa1 geoi3 jyut6 jyu5 dou1 dak1?", "mandarin": "是哦，粤式英文加句粤语也可以？" },
                { "speaker": "Sarah", "text": "當然得啦！香港email中英夾雜好正常。", "jyutping": "dong1 jin4 dak1 laa1! hoeng1 gong2 email zung1 jing1 gaap3 zaap6 hou2 zing3 soeng4.", "mandarin": "当然可以啦！香港邮件中英夹杂很正常。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "附件", "jyutping": "fu6 gin2", "mandarin": "附件", "mnemonic": "附简", "scene": "email附件", "enteringTone": true },
            { "word": "請查收", "jyutping": "ceng2 caa4 sau1", "mandarin": "请查收", "mnemonic": "请茶收", "scene": "寄附件時的標準用語", "enteringTone": false },
            { "word": "抄送/CC", "jyutping": "—", "mandarin": "抄送", "mnemonic": "—", "scene": "直接說CC", "enteringTone": false },
            { "word": "回覆", "jyutping": "wui4 fuk1", "mandarin": "回复", "mnemonic": "回福", "scene": "「覆」比「回」更地道", "enteringTone": true },
            { "word": "轉發", "jyutping": "zyun2 faat3", "mandarin": "转发/Forward", "mnemonic": "专发", "scene": "轉發郵件", "enteringTone": true },
            { "word": "確認", "jyutping": "kok3 jing6", "mandarin": "确认", "mnemonic": "壳英", "scene": "確認/confirm", "enteringTone": true },
            { "word": "提你", "jyutping": "tai4 nei5", "mandarin": "提醒你", "mnemonic": "体内", "scene": "「提你聽日開會」", "enteringTone": false },
            { "word": "跟進", "jyutping": "gan1 zeon3", "mandarin": "跟进/Follow up", "mnemonic": "根尽", "scene": "跟進事項", "enteringTone": false }
          ],
          "showEmailTerms": true
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：請___（請___）",
              "usage": "email中请求对方的礼貌句式，用「請」开头简洁有力",
              "examples": [
                { "canto": "請查收附件。", "jyutping": "ceng2 caa4 sau1 fu6 gin2", "mandarin": "请查收附件。" },
                { "canto": "請盡快回覆。", "jyutping": "ceng2 zeon6 faai3 wui4 fuk1", "mandarin": "请尽快回复。" },
                { "canto": "請確認收到。", "jyutping": "ceng2 kok3 jing6 sau1 dou3", "mandarin": "请确认收到。" }
              ]
            },
            {
              "name": "句型2：有關___ / Regarding ___（关于___）",
              "usage": "email主题或开头提及事项，中英夹杂都常用",
              "examples": [
                { "canto": "有關個contract嘅問題。", "jyutping": "jau5 gwaan1 go3 contract ge3 man6 tai4", "mandarin": "关于合同的问题。" },
                { "canto": "Regarding the meeting schedule, please see attached。", "jyutping": "", "mandarin": "关于会议日程，请见附件。" },
                { "canto": "跟進上星期傾過嘅嘢。", "jyutping": "gan1 zeon3 soeng6 sing1 kei4 king1 gwo3 ge3 je5", "mandarin": "跟进上周聊过的事情。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "香港email的「三句真言」",
              "icon": "📧",
              "content": "開頭不用「尊敬的」，用「Hello/Dear + 英文名」即可。正文越短越好，香港人沒耐心看長email。結尾不用「此致敬禮」，用「Regards/Thanks/Cheers」。一句話：香港email講究「快、短、直接」。"
            },
            {
              "title": "CC文化——不要CC全世界",
              "icon": "📋",
              "content": "香港職場最忌諱隨意CC老闆。CC的人默認是「與此事相關」或「需要知情」。如果你不確定要不要CC某人，先問同事「呢個需要CC Manager嗎？」。Reply All前更要三思，很多人只應該被CC一次，不需要收到後續回覆的轟炸。"
            },
            {
              "title": "中英夾雜是email常態",
              "icon": "✍️",
              "content": "香港工作email很少全中文或全英文，通常是「中英夾雜體」——Subject行直接用英文：「[Reminder] Meeting Tomorrow 3pm」；正文：「Please find attached 更新版嘅schedule，請大家check下有冇問題。」署名直接寫英文名+職位+公司。不用刻意寫全中文或全英文，自然地中英夾雜反而最地道。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "選擇——Email開頭",
              "description": "你要寫email給同事Wilson，以下哪個開頭最適合香港職場？",
              "scenes": [
                {
                  "scene": "场景A：写邮件给同事",
                  "options": [
                    { "text": "「Hello Wilson,」", "correct": true },
                    { "text": "「尊敬的Wilson先生：」", "correct": false, "reason": "太正式，香港不用" },
                    { "text": "「喂Wilson,」", "correct": false, "reason": "太隨意，email不合適" },
                    { "text": "「致Wilson：」", "correct": false, "reason": "偏書面語，不自然" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——Email常用詞",
              "description": "补全以下email场景中的关键词",
              "items": [
                { "question": "请查收附件 → 粵語：請___附件。", "answer": "查收" },
                { "question": "请尽快回复 → 粵語：請儘快___。", "answer": "回覆" },
                { "question": "请确认收到 → 粵語：請___收到。", "answer": "確認" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "請查收附件。", "mandarin": "请查收附件。" },
                { "canto": "請儘快回覆。", "mandarin": "请尽快回复。" },
                { "canto": "有關個contract嘅問題。", "mandarin": "关于合同的问题。" }
              ]
            }
          ]
        }
      ]
    })
  },
  // L2 courses
  { id: 7, title: '茶水间闲聊', level: 2, order_index: 1, description: '学习午休时间与同事的日常聊天', difficulty_label: '🟡 适中',
    content_json: JSON.stringify({
      "course_id": "MO-02-01",
      "title": "茶水间闲聊",
      "level": 2,
      "order_index": 1,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "Lunch time，你在茶水间热饭，遇到隔壁部门的同事阿辉，大家闲聊起来。",
          "scenes": [
            {
              "name": "第一幕：聊午饭",
              "location": "茶水间",
              "lines": [
                { "speaker": "阿辉", "text": "咦，你今日带咗饭呀？", "jyutping": "ji2, nei5 gam1 jat6 daai3 zo2 faan6 aa3?", "mandarin": "咦，你今天带饭了？" },
                { "speaker": "你", "text": "係呀，尋日煮多咗，今日帶飯。", "jyutping": "hai6 aa3, cam4 jat6 zyu2 do1 zo2, gam1 jat6 daai3 faan6.", "mandarin": "是的，昨天煮多了，今天带饭。" },
                { "speaker": "阿辉", "text": "好勤力喎！我就落街買，附近開咗間新茶餐廳。", "jyutping": "hou2 kan4 lik6 wo3! ngo5 zau6 lok6 gaai1 maai5, fu6 gan6 hoi1 zo2 gaan1 san1 caa4 caan1 teng1.", "mandarin": "很勤快哦！我就下楼买，附近开了间新茶餐厅。" },
                { "speaker": "你", "text": "係咪？好唔好食㗎？", "jyutping": "hai6 mai6? hou2 m4 hou2 sik6 gaa3?", "mandarin": "是吗？好不好吃啊？" },
                { "speaker": "阿辉", "text": "聽講個沙爹牛肉麵好正，我今日去試下。", "jyutping": "teng1 gong2 go3 saa1 de1 ngau4 juk6 min6 hou2 zeng3, ngo5 gam1 jat6 heoi3 si3 haa5.", "mandarin": "听说那个沙爹牛肉面很棒，我今天去试试。" },
                { "speaker": "你", "text": "好，試完話我知得唔得！", "jyutping": "hou2, si3 jyun4 waa6 ngo5 zi1 dak1 m4 dak1!", "mandarin": "好，试完告诉我行不行！" }
              ]
            },
            {
              "name": "第二幕：聊天气",
              "location": "茶水间",
              "lines": [
                { "speaker": "你", "text": "呢排成日落雨，好煩。", "jyutping": "ni1 paai4 seng4 jat6 lok6 jyu5, hou2 faan4.", "mandarin": "最近老下雨，很烦。" },
                { "speaker": "阿辉", "text": "係囉，尋日放工突然落狗屎，我冇帶遮，成身濕晒。", "jyutping": "hai6 lo1, cam4 jat6 fong3 gung1 dat6 jin4 lok6 gau2 si2, ngo5 mou5 daai3 ze1, seng4 san1 sap1 saai3.", "mandarin": "就是啊，昨天下班突然下暴雨，我没带伞，全身湿透了。" },
                { "speaker": "你", "text": "我都係！好彩聽日開始轉晴。", "jyutping": "ngo5 dou1 hai6! hou2 coi2 ting1 jat6 hoi1 ci2 zyun2 ceng4.", "mandarin": "我也是！幸好明天开始转晴。" },
                { "speaker": "阿辉", "text": "希望啦，唔好再落。", "jyutping": "hei1 mong6 laa1, m4 hou2 zoi3 lok6.", "mandarin": "希望吧，别再下了。" }
              ]
            },
            {
              "name": "第三幕：聊交通",
              "location": "茶水间",
              "lines": [
                { "speaker": "阿辉", "text": "你住邊區㗎？返工耐唔耐？", "jyutping": "nei5 zyu6 bin1 keoi1 gaa3? faan1 gung1 noi6 m4 noi6?", "mandarin": "你住哪个区啊？上班久不久？" },
                { "speaker": "你", "text": "我住荃灣，返工大概一個鐘。", "jyutping": "ngo5 zyu6 cyun4 waan1, faan1 gung1 daai6 koi3 jat1 go3 zung1.", "mandarin": "我住荃湾，上班大概一个小时。" },
                { "speaker": "阿辉", "text": "嘩，都幾遠喎！逼唔逼車？", "jyutping": "waa1, dou1 gei2 jyun5 wo3! bik1 m4 bik1 ce1?", "mandarin": "哇，挺远的！挤不挤车？" },
                { "speaker": "你", "text": "朝早好塞車，所以我usually搭地鐵。", "jyutping": "ziu1 zou2 hou2 sak1 ce1, so2 ji5 ngo5 usually daap3 dei6 tit3.", "mandarin": "早上很堵车，所以我通常坐地铁。" },
                { "speaker": "阿辉", "text": "地鐵穩陣啲，塞車好難預時間。", "jyutping": "dei6 tit3 wan2 zan6 di1, sak1 ce1 hou2 naan4 jyu6 si4 gaan3.", "mandarin": "地铁稳当些，堵车很难预估时间。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "帶飯", "jyutping": "daai3 faan6", "mandarin": "带饭", "mnemonic": "代饭", "scene": "自带午餐上班", "enteringTone": false },
            { "word": "好食", "jyutping": "hou2 sik6", "mandarin": "好吃", "mnemonic": "好色", "scene": "「好唔好食」=好不好吃", "enteringTone": true },
            { "word": "落雨", "jyutping": "lok6 jyu5", "mandarin": "下雨", "mnemonic": "洛雨", "scene": "「落」=下，「落雨」=下雨", "enteringTone": true },
            { "word": "好塞車", "jyutping": "hou2 sak1 ce1", "mandarin": "很堵车", "mnemonic": "好室车", "scene": "塞車=堵车", "enteringTone": true },
            { "word": "逼車", "jyutping": "bik1 ce1", "mandarin": "挤车", "mnemonic": "碧车", "scene": "形容公共交通拥挤", "enteringTone": true },
            { "word": "是但啦", "jyutping": "si6 daan6 laa1", "mandarin": "随便啦", "mnemonic": "是但啦", "scene": "香港人極高頻口頭禪", "enteringTone": false },
            { "word": "放工", "jyutping": "fong3 gung1", "mandarin": "下班", "mnemonic": "放公", "scene": "收工/放工都常用", "enteringTone": false },
            { "word": "附近", "jyutping": "fu6 gan6", "mandarin": "附近", "mnemonic": "付近", "scene": "「附近有冇好嘢食」", "enteringTone": true }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：今日好___（今天好___）",
              "usage": "用「好」+形容詞表達感受，茶水間聊天極高頻",
              "examples": [
                { "canto": "今日好忙！", "jyutping": "gam1 jat6 hou2 mong4", "mandarin": "今天好忙！" },
                { "canto": "今日好攰！", "jyutping": "gam1 jat6 hou2 gui6", "mandarin": "今天好累！" },
                { "canto": "今日好熱！", "jyutping": "gam1 jat6 hou2 jit6", "mandarin": "今天好热！" }
              ]
            },
            {
              "name": "句型2：___得唔得㗎？（___行不行啊？/___好不好啊？）",
              "usage": "向對方求證/確認某事物質",
              "examples": [
                { "canto": "好唔好食㗎？", "jyutping": "hou2 m4 hou2 sik6 gaa3", "mandarin": "好不好吃啊？" },
                { "canto": "間餐廳得唔得㗎？", "jyutping": "gaan1 caan1 teng1 dak1 m4 dak1 gaa3", "mandarin": "那家餐廳行不行啊？" },
                { "canto": "地鐵快唔快㗎？", "jyutping": "dei6 tit3 faai3 m4 faai3 gaa3", "mandarin": "地铁快不快啊？" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "茶水間不談公事",
              "icon": "🍵",
              "content": "香港職場的茶水間/ pantry是「社交安全區」。聊天氣、交通、美食、周末活動都可以，但不要主動聊工作或八卦同事——這是職場大忌。如果同事跟你聊「今日好熱」，他只是在友善社交，不是在等你匯報工作。"
            },
            {
              "title": "「是但啦」的哲學",
              "icon": "🤷",
              "content": "「是但啦」是香港人最高頻口頭禪之一，意思是「隨便啦」「都可以」。同事問你「食乜嘢」你回「是但啦」，他問「去邊度食」你又回「是但啦」。注意：說「是但啦」太多會讓人覺得你沒主見，適當的時候要給具體答案。"
            },
            {
              "title": "「落狗屎」不是罵人",
              "icon": "🌧️",
              "content": "香港人說「落狗屎」=下暴雨（字面意思：下狗屎），是非常口語化的表達。與之對應的「好天」=晴天，「翻風」=轉冷/颳風。學會這些天氣梗，茶水間聊天無往不利。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——茶水间回应",
              "description": "同事問你「今日帶唔帶飯呀？」，哪個回應最合適？",
              "scenes": [
                {
                  "scene": "场景A：回应午饭话题",
                  "options": [
                    { "text": "「係呀，帶咗飯。」", "correct": true },
                    { "text": "「对，我带了。」", "correct": false, "reason": "应用粤语" },
                    { "text": "「冇呀，等陣落街買。」", "correct": true }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——闲聊高频句",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "今天好累 → 今日好___。", "answer": "攰" },
                { "question": "好不好吃 → 好唔好___㗎？", "answer": "食" },
                { "question": "我住荃湾 → 我___荃灣。", "answer": "住" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "今日好攰。", "mandarin": "今天好累。" },
                { "canto": "尋日落狗屎。", "mandarin": "昨天下暴雨。" },
                { "canto": "是但啦！", "mandarin": "随便啦！" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 8, title: '约会议时间', level: 2, order_index: 2, description: '学习与同事协调会议时间', difficulty_label: '🟡 适中',
    content_json: JSON.stringify({
      "course_id": "MO-02-02",
      "title": "约会议时间",
      "level": 2,
      "order_index": 2,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你需要約IT部的Thomas和採購部的Wilson一起開會討論ERP系統升級，但大家的時間都不一樣。",
          "scenes": [
            {
              "name": "第一幕：约同部门同事",
              "location": "工位前",
              "lines": [
                { "speaker": "你", "text": "Sarah，我想約個時間同Thomas傾ERP upgrade，你幾時得閒？", "jyutping": "Sarah, ngo5 soeng2 joek3 go3 si4 gaan3 tung4 Thomas king1 ERP upgrade, nei5 gei2 si4 dak1 haan4?", "mandarin": "Sarah，我想约个时间跟Thomas聊ERP升级，你什么时候有空？" },
                { "speaker": "Sarah", "text": "我星期三下晝OK，你呢？", "jyutping": "ngo5 sing1 kei4 saam1 haa6 zau3 OK, nei5 ne1?", "mandarin": "我星期三下午OK，你呢？" },
                { "speaker": "你", "text": "星期三下晝我都要得，三點得唔得？", "jyutping": "sing1 kei4 saam1 haa6 zau3 ngo5 dou1 jiu3 dak1, saam1 dim2 dak1 m4 dak1?", "mandarin": "星期三下午我也可以，三点行不行？" },
                { "speaker": "Sarah", "text": "三點我要開會，三點半先得。", "jyutping": "saam1 dim2 ngo5 jiu3 hoi1 wui2, saam1 dim2 bun3 sin1 dak1.", "mandarin": "三点我要开会，三点半才行。" },
                { "speaker": "你", "text": "好，就三點半，半個鐘夠唔夠？", "jyutping": "hou2, zau6 saam1 dim2 bun3, bun3 go3 zung1 gau3 m4 gau3?", "mandarin": "好，就三点半，半小时够不够？" },
                { "speaker": "Sarah", "text": "夠啦，我只係brief你啲背景。", "jyutping": "gau3 laa1, ngo5 zi2 hai6 brief nei5 di1 bui3 ging2.", "mandarin": "够了，我只是brief你一点背景。" },
                { "speaker": "你", "text": "OK，我send calendar invitation畀你。", "jyutping": "OK, ngo5 send calendar invitation bei2 nei5.", "mandarin": "OK，我发日历邀请给你。" }
              ]
            },
            {
              "name": "第二幕：约跨部门同事",
              "location": "打电话给Wilson",
              "lines": [
                { "speaker": "你", "text": "（打電話）喂Wilson，我係財務部嘅XXX。想約你傾個contract嘅follow-up。", "jyutping": "(daa2 din6 waa2) wai2 Wilson, ngo5 hai6 coi4 mou6 bou6 ge3 XXX. soeng2 joek3 nei5 king1 go3 contract ge3 follow-up.", "mandarin": "（打电话）喂Wilson，我是财务部的XXX。想约你聊合同的跟进。" },
                { "speaker": "Wilson", "text": "好呀，我睇下schedule… 你呢排幾時得？", "jyutping": "hou2 aa3, ngo5 tai2 haa5 schedule... nei5 ni1 paai4 gei2 si4 dak1?", "mandarin": "好啊，我看下日程… 你最近什么时候有空？" },
                { "speaker": "你", "text": "我星期四全日都得。", "jyutping": "ngo5 sing1 kei4 sei3 cyun4 jat6 dou1 dak1.", "mandarin": "我星期四全天都可以。" },
                { "speaker": "Wilson", "text": "星期四我有啲忙，可唔可以改星期五下晝？", "jyutping": "sing1 kei4 sei3 ngo5 jau5 di1 mong4, ho2 m4 ho2 ji5 goi2 sing1 kei4 ng5 haa6 zau3?", "mandarin": "星期四我有点忙，可不可以改星期五下午？" },
                { "speaker": "你", "text": "星期五下晝… 我兩點有個會，四點之後先得。", "jyutping": "sing1 kei4 ng5 haa6 zau3... ngo5 loeng5 dim2 jau5 go3 wui2, sei3 dim2 zi1 hau6 sin1 dak1.", "mandarin": "星期五下午… 我两点有个会，四点之后才行。" },
                { "speaker": "Wilson", "text": "咁星期五四點半，得唔得？", "jyutping": "gam2 sing1 kei4 ng5 sei3 dim2 bun3, dak1 m4 dak1?", "mandarin": "那周五四点半，行不行？" },
                { "speaker": "你", "text": "好，就星期五四點半，我send invite畀你。", "jyutping": "hou2, zau6 sing1 kei4 ng5 sei3 dim2 bun3, ngo5 send invite bei2 nei5.", "mandarin": "好，就周五四点半，我发邀请给你。" },
                { "speaker": "Wilson", "text": "OK，到時見。", "jyutping": "OK, dou3 si4 gin3.", "mandarin": "OK，到时候见。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "約時間", "jyutping": "joek3 si4 gaan3", "mandarin": "约时间", "mnemonic": "约时间", "scene": "約會議/約飯", "enteringTone": true },
            { "word": "得閒", "jyutping": "dak1 haan4", "mandarin": "有空", "mnemonic": "达罕", "scene": "廣東話生存級詞", "enteringTone": true },
            { "word": "唔方便", "jyutping": "m4 fong1 bin6", "mandarin": "不方便", "mnemonic": "唔方便", "scene": "婉拒的說法", "enteringTone": false },
            { "word": "改期", "jyutping": "goi2 kei4", "mandarin": "改期", "mnemonic": "改骑", "scene": "改時間", "enteringTone": false },
            { "word": "開會", "jyutping": "hoi1 wui2", "mandarin": "开会", "mnemonic": "开会", "scene": "「開緊會」=正在開會", "enteringTone": false },
            { "word": "見面", "jyutping": "gin3 min6", "mandarin": "见面", "mnemonic": "见面", "scene": "「約咗幾點見」", "enteringTone": false },
            { "word": "confirm", "jyutping": "—", "mandarin": "确认", "mnemonic": "—", "scene": "直接說英文", "enteringTone": false },
            { "word": "schedule", "jyutping": "—", "mandarin": "日程", "mnemonic": "—", "scene": "直接說英文", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：___得唔得？（___行不行？）",
              "usage": "確認時間、方案的超高頻句式",
              "examples": [
                { "canto": "星期五四點半得唔得？", "jyutping": "sing1 kei4 ng5 sei3 dim2 bun3 dak1 m4 dak1", "mandarin": "周五四点半行不行？" },
                { "canto": "半個鐘夠唔夠？", "jyutping": "bun3 go3 zung1 gau3 m4 gau3", "mandarin": "半小时够不够？" },
                { "canto": "聽日下晝得唔得？", "jyutping": "ting1 jat6 haa6 zau3 dak1 m4 dak1", "mandarin": "明天下午行不行？" }
              ]
            },
            {
              "name": "句型2：改___（改时间/地点）",
              "usage": "變更會議的常用表達",
              "examples": [
                { "canto": "可唔可以改星期五？", "jyutping": "ho2 m4 ho2 ji5 goi2 sing1 kei4 ng5", "mandarin": "可不可以改到周五？" },
                { "canto": "改做三點半得唔得？", "jyutping": "goi2 zou6 saam1 dim2 bun3 dak1 m4 dak1", "mandarin": "改到三点半行不行？" },
                { "canto": "個meeting改咗時間。", "jyutping": "go3 meeting goi2 zo2 si4 gaan3", "mandarin": "会议改了时间。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "約會議的「三次確認」法則",
              "icon": "📅",
              "content": "香港職場約會議通常需要確認三次：第一次口頭約定→第二次發calendar invite→第三次會議前15分鐘在WhatsApp/Teams再確認一次。漏掉任何一次都可能被認為不靠譜。"
            },
            {
              "title": "開會時間的精準文化",
              "icon": "⏰",
              "content": "香港人說「三點開會」就是3:00開始，不是3:05。遲到要提前WhatsApp通知。如果會議約了半小時，請在3:30前結束——超時是不專業的表現。"
            },
            {
              "title": "「Send invite」是動詞",
              "icon": "📧",
              "content": "香港職場說「我send個invite俾你」「我send calendar invitation俾你」「你收到invite未？」都是極高頻表達。Invitation可簡稱為invite，沒有人會說「發送會議邀請」，太書面了。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——约时间",
              "description": "你想約同事星期五開會，他說星期五好忙，你該怎麼說？",
              "scenes": [
                {
                  "scene": "场景A：协商会议时间",
                  "options": [
                    { "text": "「可唔可以改星期四？」", "correct": true },
                    { "text": "「那你什么时候有空？」", "correct": false, "reason": "應用粤語" },
                    { "text": "「星期五不行就算了吧。」", "correct": false, "reason": "不禮貌" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——會議常用句",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "你什么时候有空 → 你幾時___？", "answer": "得閒" },
                { "question": "半小时够不够 → 半個鐘___？", "answer": "夠唔夠" },
                { "question": "我发邀请给你 → 我send___畀你。", "answer": "invite" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "你幾時得閒？", "mandarin": "你什么时候有空？" },
                { "canto": "可唔可以改星期五？", "mandarin": "可不可以改到周五？" },
                { "canto": "好，就三點半。", "mandarin": "好，就三点半。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 9, title: '请假', level: 2, order_index: 3, description: '学习请假相关的粤语表达', difficulty_label: '🟡 适中',
    content_json: JSON.stringify({
      "course_id": "MO-02-03",
      "title": "请假",
      "level": 2,
      "order_index": 3,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你感冒了想請病假，以及下個月要申請年假去旅行，分別要跟Manager溝通。",
          "scenes": [
            {
              "name": "第一幕：请病假",
              "location": "打电话给Manager",
              "lines": [
                { "speaker": "你", "text": "（打電話）張Manager早晨，我今日想請日病假。", "jyutping": "(daa2 din6 waa2) zoeng1 Manager zou2 san4, ngo5 gam1 jat6 soeng2 ceng2 jat6 beng6 gaa3.", "mandarin": "（打电话）张经理早上好，我今天想请一天病假。" },
                { "speaker": "張Manager", "text": "咩事呀？嚴唔嚴重？", "jyutping": "me1 si6 aa3? jim4 m4 jim4 zung6?", "mandarin": "什么事？严不严重？" },
                { "speaker": "你", "text": "感冒發燒，尋晚睇咗醫生，醫生話要休息一日。", "jyutping": "gam2 mou6 faat3 siu1, cam4 maan5 tai2 zo2 ji1 sang1, ji1 sang1 waa6 jiu3 jau1 sik1 jat1 jat6.", "mandarin": "感冒发烧，昨晚看了医生，医生说要休息一天。" },
                { "speaker": "張Manager", "text": "咁你休息啦，記得交醫生紙。", "jyutping": "gam2 nei5 jau1 sik1 laa1, gei3 dak1 gaau1 ji1 sang1 zi2.", "mandarin": "那你休息吧，记得交医生证明。" },
                { "speaker": "你", "text": "好，我聽日返工補返張醫生紙畀你。", "jyutping": "hou2, ngo5 ting1 jat6 faan1 gung1 bou2 faan1 zoeng1 ji1 sang1 zi2 bei2 nei5.", "mandarin": "好，我明天上班补回医生证明给你。" },
                { "speaker": "張Manager", "text": "得，你休息多啲，飲多啲水。", "jyutping": "dak1, nei5 jau1 sik1 do1 di1, jam2 do1 di1 seoi2.", "mandarin": "好，你多休息，多喝水。" },
                { "speaker": "你", "text": "唔該晒張Manager。", "jyutping": "m4 goi1 saai3 zoeng1 Manager.", "mandarin": "非常感谢张经理。" }
              ]
            },
            {
              "name": "第二幕：申请年假",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "你", "text": "張Manager，我想申請年假，唔知可唔可以？", "jyutping": "zoeng1 Manager, ngo5 soeng2 san1 cing2 nin4 gaa3, m4 zi1 ho2 m4 ho2 ji5?", "mandarin": "张经理，我想申请年假，不知道可不可以？" },
                { "speaker": "張Manager", "text": "幾時？去邊度玩呀？", "jyutping": "gei2 si4? heoi3 bin1 dou6 waan2 aa3?", "mandarin": "什么时候？去哪里玩呀？" },
                { "speaker": "你", "text": "我想book七月十號到十四號，去日本旅行。", "jyutping": "ngo5 soeng2 book cat1 jyut6 sap6 hou6 dou3 sap6 sei3 hou6, heoi3 jat6 bun2 leoi5 hang4.", "mandarin": "我想订七月十号到十四号，去日本旅行。" },
                { "speaker": "張Manager", "text": "一個月前講，時間OK。不過你check下你仲有幾多日annual leave。", "jyutping": "jat1 go3 jyut6 cin4 gong2, si4 gaan3 OK. bat1 gwo3 nei5 check haa5 nei5 zung6 jau5 gei2 do1 jat6 annual leave.", "mandarin": "一个月前说，时间OK。不过你查一下你还有多少天年假。" },
                { "speaker": "你", "text": "我睇過啦，仲有十二日，用五日OK。", "jyutping": "ngo5 tai2 gwo3 laa1, zung6 jau5 sap6 ji6 jat6, jung6 ng5 jat6 OK.", "mandarin": "我看过了，还有十二天，用五天OK。" },
                { "speaker": "張Manager", "text": "好，你填張 leave form，我簽名就得。", "jyutping": "hou2, nei5 tin4 zoeng1 leave form, ngo5 cim1 meng2 zau6 dak1.", "mandarin": "好，你填张请假表，我签名就行。" },
                { "speaker": "你", "text": "好，唔該晒！", "jyutping": "hou2, m4 goi1 saai3!", "mandarin": "好，非常感谢！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "請假", "jyutping": "ceng2 gaa3", "mandarin": "请假", "mnemonic": "请嘎", "scene": "病假/年假都用這個", "enteringTone": false },
            { "word": "病假", "jyutping": "beng6 gaa3", "mandarin": "病假", "mnemonic": "病嘎", "scene": "需要醫生紙", "enteringTone": false },
            { "word": "年假", "jyutping": "nin4 gaa3", "mandarin": "年假/Annual leave", "mnemonic": "年嘎", "scene": "需要提早申請", "enteringTone": false },
            { "word": "醫生紙", "jyutping": "ji1 sang1 zi2", "mandarin": "病假条/医生证明", "mnemonic": "医生紫", "scene": "請病假必須提供", "enteringTone": false },
            { "word": "休息", "jyutping": "jau1 sik1", "mandarin": "休息", "mnemonic": "优色", "scene": "老闆叫你「休息多啲」", "enteringTone": true },
            { "word": "申請", "jyutping": "san1 cing2", "mandarin": "申请", "mnemonic": "身请", "scene": "正式用語", "enteringTone": false },
            { "word": "填form", "jyutping": "tin4 form", "mandarin": "填表", "mnemonic": "填form", "scene": "直接說英文", "enteringTone": false },
            { "word": "簽名", "jyutping": "cim1 meng2", "mandarin": "签名", "mnemonic": "千名", "scene": "簽文件/請假單", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：我想請___假（我想請___假）",
              "usage": "請假的核心句式",
              "examples": [
                { "canto": "我想請日病假。", "jyutping": "ngo5 soeng2 ceng2 jat6 beng6 gaa3", "mandarin": "我想請一天病假。" },
                { "canto": "我想申請年假。", "jyutping": "ngo5 soeng2 san1 cing2 nin4 gaa3", "mandarin": "我想申請年假。" },
                { "canto": "我想請半日假。", "jyutping": "ngo5 soeng2 ceng2 bun3 jat6 gaa3", "mandarin": "我想請半天假。" }
              ]
            },
            {
              "name": "句型2：___到___（從___到___）",
              "usage": "表達時間範圍",
              "examples": [
                { "canto": "七月十號到十四號。", "jyutping": "cat1 jyut6 sap6 hou6 dou3 sap6 sei3 hou6", "mandarin": "七月十号到十四号。" },
                { "canto": "星期一請到星期三。", "jyutping": "sing1 kei4 jat1 ceng2 dou3 sing1 kei4 saam1", "mandarin": "周一請到周三。" },
                { "canto": "下晝兩點到五點。", "jyutping": "haa6 zau3 loeng5 dim2 dou3 ng5 dim2", "mandarin": "下午两点到五点。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "醫生紙的規矩",
              "icon": "🏥",
              "content": "香港公司請病假超過一天通常需要「醫生紙」（醫生證明）。即使只請一天，有些公司也要求提供。看醫生時直接說「我要張醫生紙請病假」就可以了。診所會收費（約$200-400），公司通常不報銷這筆費用。"
            },
            {
              "title": "年假要提早講",
              "icon": "✈️",
              "content": "香港職場申請年假的潛規則是：短假期（1-2天）提早一週講，長假期（一週以上）提早一個月。臨時說「我聽日開始放假」是極不專業的。Manager常問「你check咗仲有幾多日annual leave未？」，意思是叫你先確認餘額再申請。"
            },
            {
              "title": "「休息多啲，飲多啲水」= 標準關懷",
              "icon": "💧",
              "content": "香港老闆聽你說生病，標準回應是「休息多啲，飲多啲水」。這不是敷衍，是典型的港式關懷——簡短、直接、不煽情。不要期待老闆說「哎呀辛苦了你好好休息吧」，香港職場的關心就是這麼乾脆。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——请假场景",
              "description": "你感冒發燒要請病假，應該怎麼跟Manager說？",
              "scenes": [
                {
                  "scene": "场景A：打电话请病假",
                  "options": [
                    { "text": "「張Manager，我今日想請日病假，睇咗醫生話要休息。」", "correct": true },
                    { "text": "「老闆我不舒服，今天不上班了。」", "correct": false, "reason": "應用粤語" },
                    { "text": "「我今天请假。」", "correct": false, "reason": "太簡短，無粤語" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——请假常用词",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "我想请一天病假 → 我想請___病假。", "answer": "日" },
                { "question": "医生证明 → 粤語叫___。", "answer": "醫生紙" },
                { "question": "七月十号到十四号 → 七月十號___十四號。", "answer": "到" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "我今日想請日病假。", "mandarin": "我今天想请一天病假。" },
                { "canto": "記得交醫生紙。", "mandarin": "记得交医生证明。" },
                { "canto": "你休息多啲，飲多啲水。", "mandarin": "你多休息，多喝水。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 10, title: '收发室与快递', level: 2, order_index: 4, description: '学习收发文件和快递的粤语', difficulty_label: '🟡 适中',
    content_json: JSON.stringify({
      "course_id": "MO-02-04",
      "title": "收发室与快递",
      "level": 2,
      "order_index": 4,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你需要去收发室取一個急件，然後要寄一份合同給客戶。同事教你收发室的流程。",
          "scenes": [
            {
              "name": "第一幕：取快递",
              "location": "收发室",
              "lines": [
                { "speaker": "你", "text": "（去收发室）唔該，我想攞個快遞。", "jyutping": "(heoi3 sau1 faat3 sat1) m4 goi1, ngo5 soeng2 lo2 go3 faai3 dai6.", "mandarin": "（去收发室）劳驾，我想取个快递。" },
                { "speaker": "阿叔", "text": "乜嘢公司？邊個收㗎？", "jyutping": "mat1 je5 gung1 si1? bin1 go3 sau1 gaa3?", "mandarin": "什么公司？谁收的？" },
                { "speaker": "你", "text": "財務部，XXX收。", "jyutping": "coi4 mou6 bou6, XXX sau1.", "mandarin": "财务部，XXX收。" },
                { "speaker": "阿叔", "text": "（搵緊）係咪今日送到㗎？", "jyutping": "(wan2 gan2) hai6 mai6 gam1 jat6 sung3 dou3 gaa3?", "mandarin": "（正在找）是不是今天送到的？" },
                { "speaker": "你", "text": "係呀，順豐嘅，應該係一個文件袋。", "jyutping": "hai6 aa3, seon6 fung1 ge3, jing1 goi1 hai6 jat1 go3 man4 gin6 doi2.", "mandarin": "是的，顺丰的，应该是一个文件袋。" },
                { "speaker": "阿叔", "text": "哦，呢個，簽個名。", "jyutping": "o4, ni1 go3, cim1 go3 meng2.", "mandarin": "哦，这个，签个名。" },
                { "speaker": "你", "text": "（簽名）唔該晒阿叔。", "jyutping": "(cim1 meng2) m4 goi1 saai3 aa3 suk1.", "mandarin": "（签名）非常感谢阿叔。" },
                { "speaker": "阿叔", "text": "下次有快遞會放喺你部門個架，你自己留意。", "jyutping": "haa6 ci3 jau5 faai3 dai6 wui5 fong3 hai2 nei5 bou6 mun4 go3 gaa2, nei5 zi6 gei2 lau4 ji3.", "mandarin": "下次有快递会放在你部门的架子上，你自己留意。" },
                { "speaker": "你", "text": "好，知道。", "jyutping": "hou2, zi1 dou3.", "mandarin": "好，知道了。" }
              ]
            },
            {
              "name": "第二幕：寄快递",
              "location": "工位前",
              "lines": [
                { "speaker": "你", "text": "（返到座位）Sarah，我想寄份合同俾客，係咪有速遞公司電話？", "jyutping": "(faan1 dou3 zo6 wai2) Sarah, ngo5 soeng2 gei3 fan6 hap6 tung4 bei2 haak3, hai6 mai6 jau5 cuk1 dai6 gung1 si1 din6 waa2?", "mandarin": "（回到座位）Sarah，我想寄份合同给客户，是不是有快递公司电话？" },
                { "speaker": "Sarah", "text": "係呀，公司用開順豐，你call佢哋上門收就得。", "jyutping": "hai6 aa3, gung1 si1 jung6 hoi1 seon6 fung1, nei5 call keoi5 dei6 soeng5 mun4 sau1 zau6 dak1.", "mandarin": "是的，公司一直用顺丰，你叫他们上门取件就行。" },
                { "speaker": "你", "text": "有冇account number？", "jyutping": "jau5 mou5 account number?", "mandarin": "有没有账号？" },
                { "speaker": "Sarah", "text": "有，我用WhatsApp send畀你。你填好張運單，等人上門收。", "jyutping": "jau5, ngo5 jung6 WhatsApp send bei2 nei5. nei5 tin4 hou2 zoeng1 wan6 daan1, dang2 jan4 soeng5 mun4 sau1.", "mandarin": "有，我用WhatsApp发给你。你填好快递单，等人上门取。" },
                { "speaker": "你", "text": "好，呢個係急件，聽日要送到。", "jyutping": "hou2, ni1 go3 hai6 gap1 gin2, ting1 jat6 jiu3 sung3 dou3.", "mandarin": "好，这个是急件，明天要送到。" },
                { "speaker": "Sarah", "text": "咁你叫佢哋用「特快」，聽日一定到。", "jyutping": "gam2 nei5 giu3 keoi5 dei6 jung6 「dak6 faai3」, ting1 jat6 jat1 ding6 dou3.", "mandarin": "那你叫他们用「特快」，明天一定到。" },
                { "speaker": "你", "text": "明白，唔該Sarah！", "jyutping": "ming4 baak6, m4 goi1 Sarah!", "mandarin": "明白，谢谢Sarah！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "快遞", "jyutping": "faai3 dai6", "mandarin": "快递/快件", "mnemonic": "快代", "scene": "快遞/速遞都有人說", "enteringTone": false },
            { "word": "攞", "jyutping": "lo2", "mandarin": "拿/取", "mnemonic": "罗", "scene": "「攞快遞」「攞文件」", "enteringTone": false },
            { "word": "速遞", "jyutping": "cuk1 dai6", "mandarin": "速递/快递", "mnemonic": "速代", "scene": "速遞公司=快遞公司", "enteringTone": true },
            { "word": "運單", "jyutping": "wan6 daan1", "mandarin": "运单/快递单", "mnemonic": "运单", "scene": "填運單=填快遞單", "enteringTone": false },
            { "word": "簽收", "jyutping": "cim1 sau1", "mandarin": "签收", "mnemonic": "千收", "scene": "簽名+收件", "enteringTone": false },
            { "word": "寄", "jyutping": "gei3", "mandarin": "寄", "mnemonic": "记", "scene": "「寄信」「寄文件」", "enteringTone": false },
            { "word": "急件", "jyutping": "gap1 gin2", "mandarin": "急件/紧急文件", "mnemonic": "急简", "scene": "急件要用特快", "enteringTone": true },
            { "word": "上門收", "jyutping": "soeng5 mun4 sau1", "mandarin": "上门取件", "mnemonic": "上門收", "scene": "叫快遞上門收件", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：唔該，我想___（劳驾，我想___）",
              "usage": "去收发室或叫人幫忙的開場白",
              "examples": [
                { "canto": "唔該，我想攞個快遞。", "jyutping": "m4 goi1, ngo5 soeng2 lo2 go3 faai3 dai6", "mandarin": "劳驾，我想取个快递。" },
                { "canto": "唔該，我想寄份文件。", "jyutping": "m4 goi1, ngo5 soeng2 gei3 fan6 man4 gin2", "mandarin": "劳驾，我想寄份文件。" },
                { "canto": "唔該，我想問下速遞電話。", "jyutping": "m4 goi1, ngo5 soeng2 man6 haa5 cuk1 dai6 din6 waa2", "mandarin": "劳驾，我想问下快递电话。" }
              ]
            },
            {
              "name": "句型2：係___嚟㗎（是___來的）",
              "usage": "解釋物品或情況的句式",
              "examples": [
                { "canto": "係一個文件袋嚟㗎。", "jyutping": "hai6 jat1 go3 man4 gin6 doi2 lai4 gaa3", "mandarin": "是一個文件袋來的。" },
                { "canto": "係急件嚟㗎，聽日要送到。", "jyutping": "hai6 gap1 gin2 lai4 gaa3, ting1 jat6 jiu3 sung3 dou3", "mandarin": "是急件來的，明天要送到。" },
                { "canto": "係公司用開嘅速遞嚟㗎。", "jyutping": "hai6 gung1 si1 jung6 hoi1 ge3 cuk1 dai6 lai4 gaa3", "mandarin": "是公司一直用的快遞來的。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "公司快遞的「阿叔文化」",
              "icon": "👴",
              "content": "香港寫字樓的收发室通常有一位「阿叔」（伯伯）管理，他認識全公司的人，知道哪個部門哪個位。跟他打好關係——逢年過節請他飲杯奶茶——你的快遞永遠不會不見。收发室阿叔是辦公室的「地下CEO」。"
            },
            {
              "title": "順豐＝快遞的代名詞",
              "icon": "📦",
              "content": "香港公司寄文件90%用順豐。說「call順豐」大家都懂，不需要說全名。寄重要合同建議用「特快」或「即日」，普通文件用「標準」就夠。運費通常到付或記公司帳號，不用自己掏錢。"
            },
            {
              "title": "「簽個名」的場合",
              "icon": "✍️",
              "content": "香港收快遞只需要簽名，不需要寫電話或身份證號碼。收发室阿叔叫你「簽個名」，你就隨便簽個草簽就行——不像內地需要寫全名+手機號。這是效率至上的體現。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——取快递",
              "description": "你去收发室取快递，第一句應該說什麼？",
              "scenes": [
                {
                  "scene": "场景A：收发室取件",
                  "options": [
                    { "text": "「唔該，我想攞個快遞。」", "correct": true },
                    { "text": "「我来拿快递。」", "correct": false, "reason": "應用粤語" },
                    { "text": "「有我的快递吗？」", "correct": false, "reason": "應用粤語" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——收发室常用词",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "取快递 → ___快遞", "answer": "攞" },
                { "question": "签收 → 簽___", "answer": "收" },
                { "question": "寄文件 → ___文件", "answer": "寄" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "唔該，我想攞個快遞。", "mandarin": "劳驾，我想取个快递。" },
                { "canto": "呢個係急件嚟㗎。", "mandarin": "这个是急件来的。" },
                { "canto": "你call佢哋上門收就得。", "mandarin": "你叫他们上门取件就行。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 11, title: '同事聚餐', level: 2, order_index: 5, description: '学习与同事聚餐的粤语对话', difficulty_label: '🟡 适中',
    content_json: JSON.stringify({
      "course_id": "MO-02-05",
      "title": "同事聚餐",
      "level": 2,
      "order_index": 5,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "同事們約星期五晚飯，你第一次參加team dinner，從約飯到點餐到埋單的全流程。",
          "scenes": [
            {
              "name": "第一幕：约饭",
              "location": "工位前",
              "lines": [
                { "speaker": "Sarah", "text": "喂，今個星期五收工有冇興趣一齊食飯？", "jyutping": "wai3, gam1 go3 sing1 kei4 ng5 sau1 gung1 jau5 mou5 hing3 ceoi3 jat1 cai4 sik6 faan6?", "mandarin": "喂，这个星期五下班有没有兴趣一起吃饭？" },
                { "speaker": "你", "text": "好呀，去邊度食？", "jyutping": "hou2 aa3, heoi3 bin1 dou6 sik6?", "mandarin": "好呀，去哪里吃？" },
                { "speaker": "Sarah", "text": "有人提議食日本嘢，有人想食火鍋，你點睇？", "jyutping": "jau5 jan4 tai4 ji5 sik6 jat6 bun2 je5, jau5 jan4 soeng2 sik6 fo2 wo1, nei5 dim2 tai2?", "mandarin": "有人提议吃日本菜，有人想吃火锅，你怎么看？" },
                { "speaker": "你", "text": "是但啦，大家話事。", "jyutping": "si6 daan6 laa1, daai6 gaa1 waa6 si6.", "mandarin": "随便啦，大家做主。" },
                { "speaker": "Sarah", "text": "唔好是但啦，你揀一個。", "jyutping": "m4 hou2 si6 daan6 laa1, nei5 gaan2 jat1 go3.", "mandarin": "不要随便啦，你选一个。" },
                { "speaker": "你", "text": "咁… 我想食火鍋，天氣凍凍地。", "jyutping": "gam2... ngo5 soeng2 sik6 fo2 wo1, tin1 hei3 dung3 dung3 dei2.", "mandarin": "那… 我想吃火锅，天气有点冷。" },
                { "speaker": "Sarah", "text": "好，就火鍋！我book位，七點半，XX火鍋店。", "jyutping": "hou2, zau6 fo2 wo1! ngo5 book wai2, cat1 dim2 bun3, XX fo2 wo1 dim3.", "mandarin": "好，就火锅！我订位，七点半，XX火锅店。" },
                { "speaker": "你", "text": "OK，到時見！", "jyutping": "OK, dou3 si4 gin3!", "mandarin": "OK，到时候见！" }
              ]
            },
            {
              "name": "第二幕：点餐",
              "location": "火锅店",
              "lines": [
                { "speaker": "侍應", "text": "你好，幾位？", "jyutping": "nei5 hou2, gei2 wai2?", "mandarin": "你好，几位？" },
                { "speaker": "Sarah", "text": "六位，訂咗枱，姓陳。", "jyutping": "luk6 wai2, deng6 zo2 toi2, sing3 can4.", "mandarin": "六位，订了桌，姓陈。" },
                { "speaker": "侍應", "text": "唔該睇下食啲咩。", "jyutping": "m4 goi1 tai2 haa5 sik6 di1 me1.", "mandarin": "请看一下吃点什么。" },
                { "speaker": "你", "text": "（睇Menu）嘩，好多嘢揀。", "jyutping": "(tai2 Menu) waa1, hou2 do1 je5 gaan2.", "mandarin": "（看菜单）哇，好多东西选。" },
                { "speaker": "Sarah", "text": "我哋叫個鴛鴦鍋底，跟住每人叫啲配料。", "jyutping": "ngo5 dei6 giu3 go3 jyun1 joeng1 wo1 dai2, gan1 zyu6 mui5 jan4 giu3 di1 pui3 liu2.", "mandarin": "我们叫个鸳鸯锅底，然后每人叫一些配料。" },
                { "speaker": "你", "text": "我好鍾意食牛肉，可以叫多碟牛嗎？", "jyutping": "ngo5 hou2 zung1 ji3 sik6 ngau4 juk6, ho2 ji5 giu3 do1 dip6 ngau4 maa3?", "mandarin": "我很喜欢吃牛肉，可以多叫一盘牛肉吗？" },
                { "speaker": "Sarah", "text": "好，招牌牛肉、蝦滑、魚蛋、仲有菜。", "jyutping": "hou2, ziu1 paai4 ngau4 juk6, haa1 waat6, jyu4 daan2, zung6 jau5 coi3.", "mandarin": "好，招牌牛肉、虾滑、鱼蛋、还有菜。" },
                { "speaker": "你", "text": "夠唔夠食？會唔會叫多啲？", "jyutping": "gau3 m4 gau3 sik6? wui5 m4 wui5 giu3 do1 di1?", "mandarin": "够不够吃？会不会再多叫一些？" },
                { "speaker": "Sarah", "text": "食完唔夠再叫。飲唔飲嘢？", "jyutping": "sik6 jyun4 m4 gau3 zoi3 giu3. jam2 m4 jam2 je5?", "mandarin": "吃完不够再叫。喝不喝东西？" },
                { "speaker": "你", "text": "我要可樂。唔該！", "jyutping": "ngo5 jiu3 ho2 lok6. m4 goi1!", "mandarin": "我要可乐。谢谢！" }
              ]
            },
            {
              "name": "第三幕：埋单",
              "location": "火锅店",
              "lines": [
                { "speaker": "你", "text": "（食完）好飽！今日呢餐好正。", "jyutping": "(sik6 jyun4) hou2 baau2! gam1 jat6 ni1 caan1 hou2 zeng3.", "mandarin": "（吃完）好饱！今天这顿很棒。" },
                { "speaker": "Sarah", "text": "係呀，好好食。不如我哋分單？", "jyutping": "hai6 aa3, hou2 hou2 sik6. bat1 jyu4 ngo5 dei6 fan1 daan1?", "mandarin": "是啊，好好吃。不如我们AA？" },
                { "speaker": "你", "text": "好，每人大概幾多錢？", "jyutping": "hou2, mui5 jan4 daai6 koi3 gei2 do1 cin2?", "mandarin": "好，每人大概多少钱？" },
                { "speaker": "Sarah", "text": "每人大約三百蚊到，你帶現金定八達通？", "jyutping": "mui5 jan4 daai6 joek3 saam1 baak3 man1 dou3, nei5 daai3 jin6 gam1 ding6 baat3 daat6 tung1?", "mandarin": "每人大约三百块左右，你带现金还是八达通？" },
                { "speaker": "你", "text": "我可以用PayMe或者轉數快。", "jyutping": "ngo5 ho2 ji5 jung6 PayMe waak6 ze2 zyun2 sou3 faai3.", "mandarin": "我可以用PayMe或者转数快。" },
                { "speaker": "Sarah", "text": "好，我埋單然後大家轉數快俾我。", "jyutping": "hou2, ngo5 maai4 daan1 jin4 hau6 daai6 gaa1 zyun2 sou3 faai3 bei2 ngo5.", "mandarin": "好，我结账然后大家转数快给我。" },
                { "speaker": "你", "text": "OK，唔該晒Sarah！", "jyutping": "OK, m4 goi1 saai3 Sarah!", "mandarin": "OK，非常感谢Sarah！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "食飯", "jyutping": "sik6 faan6", "mandarin": "吃饭", "mnemonic": "色饭", "scene": "最基本的詞", "enteringTone": true },
            { "word": "火鍋", "jyutping": "fo2 wo1", "mandarin": "火锅", "mnemonic": "火窝", "scene": "港人冬天最愛", "enteringTone": false },
            { "word": "鴛鴦鍋底", "jyutping": "jyun1 joeng1 wo1 dai2", "mandarin": "鸳鸯锅底", "mnemonic": "冤央窝底", "scene": "一半辣一半不辣", "enteringTone": false },
            { "word": "埋單", "jyutping": "maai4 daan1", "mandarin": "结账", "mnemonic": "买单", "scene": "「唔該埋單」", "enteringTone": false },
            { "word": "分單", "jyutping": "fan1 daan1", "mandarin": "AA制/分开付", "mnemonic": "分单", "scene": "香港叫「分單」", "enteringTone": false },
            { "word": "轉數快", "jyutping": "zyun2 sou3 faai3", "mandarin": "转数快", "mnemonic": "转数快", "scene": "香港即時轉賬系統", "enteringTone": false },
            { "word": "好飽", "jyutping": "hou2 baau2", "mandarin": "好饱", "mnemonic": "好包", "scene": "食完飯標準感受", "enteringTone": false },
            { "word": "好好食", "jyutping": "hou2 hou2 sik6", "mandarin": "好好吃", "mnemonic": "好好色", "scene": "讚美食物的最高級", "enteringTone": true }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：不如我哋___（不如我们___）",
              "usage": "提出建議的客氣說法，比直接說「我哋___」更委婉",
              "examples": [
                { "canto": "不如我哋分單？", "jyutping": "bat1 jyu4 ngo5 dei6 fan1 daan1", "mandarin": "不如我們AA？" },
                { "canto": "不如叫多碟牛？", "jyutping": "bat1 jyu4 giu3 do1 dip6 ngau4", "mandarin": "不如多叫一盤牛肉？" },
                { "canto": "不如食完再去飲嘢？", "jyutping": "bat1 jyu4 sik6 jyun4 zoi3 heoi3 jam2 je5", "mandarin": "不如吃完再去喝東西？" }
              ]
            },
            {
              "name": "句型2：___到（大約___）",
              "usage": "表達大約金額或數量",
              "examples": [
                { "canto": "每人大約三百蚊到。", "jyutping": "mui5 jan4 daai6 joek3 saam1 baak3 man1 dou3", "mandarin": "每人大概三百塊左右。" },
                { "canto": "五點到嚟得唔得？", "jyutping": "ng5 dim2 dou3 lai4 dak1 m4 dak1", "mandarin": "五點左右來行不行？" },
                { "canto": "十個人到。", "jyutping": "sap6 go3 jan4 dou3", "mandarin": "十個人左右。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "「是但啦」的陷阱",
              "icon": "⚠️",
              "content": "上面茶水間那課教你「是但啦」=隨便啦。但如果同事認真問你意見，一直說「是但啦」會顯得很沒有主見。聚餐點菜時最好給具體建議，比如「我想食火鍋」「我冇所謂，但唔好食辣」。適當表達偏好才是成熟的職場表現。"
            },
            {
              "title": "埋單文化——分單 vs 爭埋單",
              "icon": "💰",
              "content": "香港同事聚餐通常是AA（分單），沒有內地「搶著埋單」的文化。大家各付各的，用轉數快/PayMe轉給先埋單的人。如果有人說「今日我請」，那就是他真的想請，不需要推讓三次。簡單說句「多謝」就行。"
            },
            {
              "title": "轉數快(FPS)是香港必備",
              "icon": "📱",
              "content": "轉數快（FPS）是香港的即時轉賬系統，幾乎全香港人都在用。說「我轉數快俾你」對方就懂了。附帶一提：香港人很少用微信支付或支付寶，最普遍的是八達通、信用卡和轉數快。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——点餐",
              "description": "你想多吃一盤牛肉，該怎麼說？",
              "scenes": [
                {
                  "scene": "场景A：火锅店点餐",
                  "options": [
                    { "text": "「可以叫多碟牛嗎？」", "correct": true },
                    { "text": "「再來一盤牛肉。」", "correct": false, "reason": "應用粤語" },
                    { "text": "「我要牛肉。」", "correct": false, "reason": "不夠禮貌" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——聚餐常用词",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "结账 → 粵語：___", "answer": "埋單" },
                { "question": "好好吃 → 粵語：好好___", "answer": "食" },
                { "question": "每个人大概三百块 → 每人大概三百___到", "answer": "蚊" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "不如我哋分單？", "mandarin": "不如我们AA？" },
                { "canto": "我轉數快俾你。", "mandarin": "我转数快给你。" },
                { "canto": "好飽！今日呢餐好正。", "mandarin": "好饱！今天这顿很棒。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 12, title: '办公设备报修', level: 2, order_index: 6, description: '学习报修办公设备的粤语', difficulty_label: '🟡 适中',
    content_json: JSON.stringify({
      "course_id": "MO-02-06",
      "title": "办公设备报修",
      "level": 2,
      "order_index": 6,
      "duration_minutes": 18,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "打印機卡紙、電腦死機、冷氣不凍——辦公室設備問題接踵而來，你要找IT或行政同事求助。",
          "scenes": [
            {
              "name": "第一幕：打印机卡纸",
              "location": "IT办公室",
              "lines": [
                { "speaker": "你", "text": "（行去IT房）唔該，我部printer卡咗紙。", "jyutping": "(haang4 heoi3 IT fong2) m4 goi1, ngo5 bou6 printer kaa1 zo2 zi2.", "mandarin": "（走去IT房）劳驾，我的打印机卡纸了。" },
                { "speaker": "阿Ken", "text": "邊個位？", "jyutping": "bin1 go3 wai2?", "mandarin": "哪个位置？" },
                { "speaker": "你", "text": "財務部，走廊尾嗰部。", "jyutping": "coi4 mou6 bou6, zau2 long2 mei5 go2 bou6.", "mandarin": "财务部，走廊尽头那台。" },
                { "speaker": "阿Ken", "text": "係咪Mon顯示error？", "jyutping": "hai6 mai6 Mon hin2 si6 error?", "mandarin": "是不是屏幕显示错误？" },
                { "speaker": "你", "text": "係，話paper jam，但我搵唔到張紙喺邊。", "jyutping": "hai6, waa6 paper jam, daan6 ngo5 wan2 m4 dou2 zoeng1 zi2 hai2 bin1.", "mandarin": "是的，说卡纸，但我找不到纸在哪里。" },
                { "speaker": "阿Ken", "text": "好，我等陣去睇下。", "jyutping": "hou2, ngo5 dang2 zan6 heoi3 tai2 haa5.", "mandarin": "好，我等会儿去看一下。" },
                { "speaker": "你", "text": "唔該晒，唔急嘅，你得閒先。", "jyutping": "m4 goi1 saai3, m4 gap1 ge3, nei5 dak1 haan4 sin1.", "mandarin": "非常感谢，不急的，你有空再说。" },
                { "speaker": "阿Ken", "text": "唔緊要，而家去，好快搞掂。", "jyutping": "m4 gan2 jiu3, ji4 gaa1 heoi3, hou2 faai3 gaau2 dim6.", "mandarin": "不要紧，现在去，很快搞定。" },
                { "speaker": "你", "text": "thank you阿Ken！", "jyutping": "thank you aa3 Ken!", "mandarin": "谢谢阿Ken！" }
              ]
            },
            {
              "name": "第二幕：电脑死机",
              "location": "打电话给IT",
              "lines": [
                { "speaker": "你", "text": "（打電話）喂，阿Ken，我部電腦藍mon呀！", "jyutping": "(daa2 din6 waa2) wai2, aa3 Ken, ngo5 bou6 din6 nou5 laam4 mon aa3!", "mandarin": "（打电话）喂，阿Ken，我的电脑蓝屏了！" },
                { "speaker": "阿Ken", "text": "又嚟？你開咗咩program？", "jyutping": "jau6 lai4? nei5 hoi1 zo2 me1 program?", "mandarin": "又来？你开了什么程序？" },
                { "speaker": "你", "text": "開緊Excel同Outlook，突然間成個screen freeze咗。", "jyutping": "hoi1 gan2 Excel tung4 Outlook, dat6 jin4 gaan1 seng4 go3 screen freeze zo2.", "mandarin": "开着Excel和Outlook，突然整个屏幕冻住了。" },
                { "speaker": "阿Ken", "text": "你試下force restart，撳實power掣十秒。", "jyutping": "nei5 si3 haa5 force restart, gam6 sat6 power zai3 sap6 miu5.", "mandarin": "你试一下强制重启，按住电源键十秒。" },
                { "speaker": "你", "text": "（試）得咗！重新開到機啦！", "jyutping": "(si3) dak1 zo2! cung4 san1 hoi1 dou2 gei1 laa1!", "mandarin": "（试）行了！重新开得了机了！" },
                { "speaker": "阿Ken", "text": "入到Windows之後check下有冇update pending。", "jyutping": "jap6 dou2 Windows zi1 hau6 check haa5 jau5 mou5 update pending.", "mandarin": "进到Windows之后查一下有没有待处理更新。" },
                { "speaker": "你", "text": "有，有個Windows update要装。", "jyutping": "jau5, jau5 go3 Windows update jiu3 zong1.", "mandarin": "有，有个Windows更新要装。" },
                { "speaker": "阿Ken", "text": "裝咗佢，可能就係呢個問題。", "jyutping": "zong1 zo2 keoi5, ho2 nang4 zau6 hai6 ni1 go3 man6 tai4.", "mandarin": "装了它，可能就是这个原因。" },
                { "speaker": "你", "text": "好，唔該晒！", "jyutping": "hou2, m4 goi1 saai3!", "mandarin": "好，非常感谢！" }
              ]
            },
            {
              "name": "第三幕：冷气不冻",
              "location": "打电话给行政部",
              "lines": [
                { "speaker": "你", "text": "（打行政部電話）喂，我想報告吓，我哋部門冷氣唔係好凍。", "jyutping": "(daa2 hang4 zing3 bou6 din6 waa2) wai2, ngo5 soeng2 bou3 gou3 haa5, ngo5 dei6 bou6 mun4 laang5 hei3 m4 hai6 hou2 dung3.", "mandarin": "（打行政部电话）喂，我想报告一下，我们部门空调不太冷。" },
                { "speaker": "行政", "text": "邊個位？", "jyutping": "bin1 go3 wai2?", "mandarin": "哪个位置？" },
                { "speaker": "你", "text": "財務部近窗位，呢兩日好似冇乜風。", "jyutping": "coi4 mou6 bou6 gan6 coeng1 wai2, ni1 loeng5 jat6 hou2 ci5 mou5 mat1 fung1.", "mandarin": "财务部靠窗位置，这两天好像没什么风。" },
                { "speaker": "行政", "text": "我叫師傅聽日上嚟睇下。", "jyutping": "ngo5 giu3 si1 fu2 ting1 jat6 soeng5 lai4 tai2 haa5.", "mandarin": "我叫师傅明天上来看看。" },
                { "speaker": "你", "text": "好，大概幾點？", "jyutping": "hou2, daai6 koi3 gei2 dim2?", "mandarin": "好，大概几点？" },
                { "speaker": "行政", "text": "上午十點左右，到時如果有人整嘢你唔好介意。", "jyutping": "soeng6 ng5 sap6 dim2 zo2 jau2, dou3 si4 jyu4 gwo2 jau5 jan4 zing2 je5 nei5 m4 hou2 gaai3 ji3.", "mandarin": "上午十点左右，到时如果有人修理东西你请别介意。" },
                { "speaker": "你", "text": "好，冇問題。唔該晒！", "jyutping": "hou2, mou5 man6 tai4. m4 goi1 saai3!", "mandarin": "好，没问题。非常感谢！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "卡紙", "jyutping": "kaa1 zi2", "mandarin": "卡纸", "mnemonic": "卡紫", "scene": "打印機最常見問題", "enteringTone": false },
            { "word": "壞咗", "jyutping": "waai6 zo2", "mandarin": "坏了/出故障", "mnemonic": "坏左", "scene": "萬用報修詞", "enteringTone": false },
            { "word": "藍mon", "jyutping": "laam4 mon", "mandarin": "蓝屏/死機", "mnemonic": "蓝mon", "scene": "电脑蓝屏", "enteringTone": false },
            { "word": "freeze/死機", "jyutping": "— / sei2 gei1", "mandarin": "死机", "mnemonic": "死給", "scene": "软件無回應", "enteringTone": false },
            { "word": "restart/重開", "jyutping": "— / cung4 hoi1", "mandarin": "重启", "mnemonic": "虫开", "scene": "解決90%問題的方法", "enteringTone": false },
            { "word": "冷氣", "jyutping": "laang5 hei3", "mandarin": "空调", "mnemonic": "冷嘿", "scene": "香港說「冷氣」不說「空調」", "enteringTone": false },
            { "word": "師傅", "jyutping": "si1 fu2", "mandarin": "师傅", "mnemonic": "丝付", "scene": "修理師傅的尊稱", "enteringTone": false },
            { "word": "搞掂", "jyutping": "gaau2 dim6", "mandarin": "搞定", "mnemonic": "搞店", "scene": "修好了！", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：___唔係好___（___不太___）",
              "usage": "委婉表達問題，比直接說「唔得」更客氣",
              "examples": [
                { "canto": "冷氣唔係好凍。", "jyutping": "laang5 hei3 m4 hai6 hou2 dung3", "mandarin": "空調不太冷。" },
                { "canto": "我部電腦唔係好順。", "jyutping": "ngo5 bou6 din6 nou5 m4 hai6 hou2 seon6", "mandarin": "我電腦不太流暢。" },
                { "canto": "個network唔係好穩定。", "jyutping": "go3 network m4 hai6 hou2 wan2 ding6", "mandarin": "網絡不太穩定。" }
              ]
            },
            {
              "name": "句型2：等陣去___（等會兒去___）",
              "usage": "推遲行動的常用說法，比「遲啲」更具體",
              "examples": [
                { "canto": "我等陣去睇下。", "jyutping": "ngo5 dang2 zan6 heoi3 tai2 haa5", "mandarin": "我等會兒去看一下。" },
                { "canto": "我聽日上嚟整。", "jyutping": "ngo5 ting1 jat6 soeng5 lai4 zing2", "mandarin": "我明天上來修。" },
                { "canto": "我叫師傅聽日嚟。", "jyutping": "ngo5 giu3 si1 fu2 ting1 jat6 lai4", "mandarin": "我叫師傅明天來。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "IT同事是你的好朋友",
              "icon": "🔧",
              "content": "香港辦公室的IT同事（通常叫「阿Ken呢類人」）掌握了全公司的生產力命脈。跟IT同事關係好，電腦壞了馬上有人來修；關係不好，可能要等三天。所以香港職場有個潛規則：久不久請IT同事飲杯奶茶。"
            },
            {
              "title": "「試下restart先」是萬能答案",
              "icon": "🔄",
              "content": "香港IT同事接到報修電話，90%的第一反應是「你試下restart先」。這不是敷衍——統計顯示超過一半的辦公室設備問題重啟就能解決。如果重啟不行，他再過來。所以報修前先自己重啟一次，省得被IT同事心裡吐槽。"
            },
            {
              "title": "冷氣永不夠凍",
              "icon": "❄️",
              "content": "香港辦公室一個永恆的抱怨是冷氣不夠冷（或者太冷）。夏天跟行政部說「冷氣唔係好凍」，行政部的標準回應是「我叫師傅睇下」。但實際上可能永遠不會修好——因為大廈中央冷氣系統不是公司自己能控制的。香港人已經習慣了辦公室「夏天穿外套」的現象。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——报修打印机",
              "description": "打印機卡紙了，你該怎麼跟IT同事說？",
              "scenes": [
                {
                  "scene": "场景A：找IT报修打印机",
                  "options": [
                    { "text": "「唔該，我部printer卡咗紙。」", "correct": true },
                    { "text": "「打印機坏了。」", "correct": false, "reason": "應用粤語" },
                    { "text": "「喂，打印機不能用了。」", "correct": false, "reason": "應用粤語+太直接" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空——报修常用词",
              "description": "补全以下粤语句子中的关键词",
              "items": [
                { "question": "打印机卡纸 → 部printer___紙", "answer": "卡咗" },
                { "question": "空调不冷 → 冷氣唔係好___", "answer": "凍" },
                { "question": "搞定了 → 搞___", "answer": "掂" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语，对照学习对应的普通话翻译",
              "items": [
                { "canto": "唔該，我部printer卡咗紙。", "mandarin": "劳驾，我的打印机卡纸了。" },
                { "canto": "你試下restart先。", "mandarin": "你先试试重启。" },
                { "canto": "好快搞掂。", "mandarin": "很快搞定。" }
              ]
            }
          ]
        }
      ]
    })
  },
  // L3 courses
  { id: 13, title: '部门会议发言', level: 3, order_index: 1, description: '學習在部門會議上發言匯報進度，回應同事提問', difficulty_label: '⭐⭐⭐',
    content_json: JSON.stringify({
      "course_id": "MO-03-01",
      "title": "部门会议发言",
      "level": 3,
      "order_index": 1,
      "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "部門周會，Manager 主持會議，逐一問各人進度。你要在會上發言匯報，還要回應同事的提問。",
          "scenes": [
            {
              "name": "第一幕：会议开场",
              "location": "会议室",
              "lines": [
                { "speaker": "Manager", "text": "好，我哋開始啦。首先，上個星期講嘅ERP rollout，而家進度點？", "jyutping": "hou2, ngo5 dei6 hoi1 ci2 laa1. sau2 sin1, soeng6 go3 sing1 kei4 gong2 ge3 ERP rollout, ji4 gaa1 zeon3 dou6 dim2?", "mandarin": "好，我们开始了。首先，上周说的ERP rollout，现在进度怎么样？" },
                { "speaker": "阿輝", "text": "大致上順利，但係有個interface嘅bug，IT仲跟緊。", "jyutping": "daai6 zi3 soeng6 seon6 lei6, daan6 hai6 jau5 go3 interface ge3 bug, IT zung6 gan1 gan2.", "mandarin": "大体上顺利，但是有个接口的bug，IT还在跟。" },
                { "speaker": "Manager", "text": "幾時搞得掂？", "jyutping": "gei2 si4 gaau2 dak1 dim6?", "mandarin": "什么时候搞定？" },
                { "speaker": "阿輝", "text": "應該下個禮拜可以fix到。", "jyutping": "jing1 goi1 haa6 go3 lai5 baai3 ho2 ji5 fix dou2.", "mandarin": "应该下周可以修好。" },
                { "speaker": "Manager", "text": "好，你follow up住，有任何delay提早講。", "jyutping": "hou2, nei5 follow up zyu6, jau5 jam6 ho4 delay tai4 zou2 gong2.", "mandarin": "好，你持续跟进，有任何延期提前说。" }
              ]
            },
            {
              "name": "第二幕：轮到你了",
              "location": "会议室",
              "lines": [
                { "speaker": "Manager", "text": "XXX（你），你呢？closing進度點呀？", "jyutping": "XXX (nei5), nei5 ne1? closing zeon3 dou6 dim2 aa3?", "mandarin": "XXX（你），你呢？closing进度怎么样了？" },
                { "speaker": "你", "text": "closing而家做緊，大致上順利，預計今個禮拜五之前可以完成。", "jyutping": "closing ji4 gaa1 zou6 gan2, daai6 zi3 soeng6 seon6 lei6, jyu6 gei3 gam1 go3 lai5 baai3 ng5 zi1 cin4 ho2 ji5 jyun4 sing4.", "mandarin": "closing现在正在做，大体上顺利，预计这周五之前可以完成。" },
                { "speaker": "Manager", "text": "有冇遇到咩問題？", "jyutping": "jau5 mou5 jyu6 dou2 me1 man6 tai4?", "mandarin": "有遇到什么问题吗？" },
                { "speaker": "你", "text": "有一個reconciliation item仲對緊數，不過問題唔大，聽日應該搞得掂。", "jyutping": "jau5 jat1 go3 reconciliation item zung6 deoi3 gan2 sou3, bat1 gwo3 man6 tai4 m4 daai6, ting1 jat6 jing1 goi1 gaau2 dak1 dim6.", "mandarin": "有一个对账项目还在对数，不过问题不大，明天应该搞的定。" },
                { "speaker": "Manager", "text": "好，如果搞唔掂就早啲講，唔好等到last minute。", "jyutping": "hou2, jyu4 gwo2 gaau2 m4 dim6 zau6 zou2 di1 gong2, m4 hou2 dang2 dou3 last minute.", "mandarin": "好，如果搞不定就早点说，不要等到最后一刻。" },
                { "speaker": "你", "text": "明白，我會keep住update。", "jyutping": "ming4 baak6, ngo5 wui5 keep zyu6 update.", "mandarin": "明白，我会持续更新。" }
              ]
            },
            {
              "name": "第三幕：回应同事提问",
              "location": "会议室",
              "lines": [
                { "speaker": "Sarah", "text": "我想補充一點，關於個新vendor onboarding，我哋可能要多啲時間。", "jyutping": "ngo5 soeng2 bou2 cung1 jat1 dim2, gwaan1 jyu1 go3 san1 vendor onboarding, ngo5 dei6 ho2 nang4 jiu3 do1 di1 si4 gaan3.", "mandarin": "我想补充一点，关于那个新供应商引入，我们可能需要多点时间。" },
                { "speaker": "Manager", "text": "點解？之前唔係話冇問題咩？", "jyutping": "dim2 gaai2? zi1 cin4 m4 hai6 waa6 mou5 man6 tai4 me1?", "mandarin": "为什么？之前不是说没问题吗？" },
                { "speaker": "Sarah", "text": "因為user training仲未開始，如果schedule唔改嘅話，go-live會有risk。", "jyutping": "jan1 wai6 user training zung6 mei6 hoi1 ci2, jyu4 gwo2 schedule m4 goi2 ge3 waa6, go-live wui5 jau5 risk.", "mandarin": "因为用户培训还没开始，如果日程不改的话，上线会有风险。" },
                { "speaker": "你", "text": "我同意Sarah嘅concern。我睇過個training plan，確實有啲tight。", "jyutping": "ngo5 tung4 ji3 Sarah ge3 concern. ngo5 tai2 gwo3 go3 training plan, kok3 sat6 jau5 di1 tight.", "mandarin": "我同意Sarah的顾虑。我看过培训计划，确实有点紧。" },
                { "speaker": "Manager", "text": "咁你覺得要delay幾耐？", "jyutping": "gam2 nei5 gok3 dak1 jiu3 delay gei2 noi6?", "mandarin": "那你觉得要推迟多久？" },
                { "speaker": "你", "text": "我建議push back兩星期，咁樣大家都唔使咁趕。", "jyutping": "ngo5 gin3 ji5 push back loeng5 sing1 kei4, gam2 joeng2 daai6 gaa1 dou1 m4 sai2 gam2 gon2.", "mandarin": "我建议推迟两周，这样大家都不用那么赶。" },
                { "speaker": "Manager", "text": "OK，你同Sarah出個proposal，下個禮拜再傾。", "jyutping": "OK, nei5 tung4 Sarah ceot1 go3 proposal, haa6 go3 lai5 baai3 zoi3 king1.", "mandarin": "OK，你和Sarah出个方案，下周再聊。" },
                { "speaker": "你", "text": "好，冇問題。", "jyutping": "hou2, mou5 man6 tai4.", "mandarin": "好，没问题。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "匯報", "jyutping": "wui6 bou3", "mandarin": "汇报", "mnemonic": "汇报", "scene": "會議標準用語", "enteringTone": false },
            { "word": "進度", "jyutping": "zeon3 dou6", "mandarin": "进度", "mnemonic": "尽度", "scene": "「進度點呀？」", "enteringTone": false },
            { "word": "搞掂", "jyutping": "gaau2 dim6", "mandarin": "搞定", "mnemonic": "搞店", "scene": "L1學過，但L3要用得更自然", "enteringTone": false },
            { "word": "跟進", "jyutping": "gan1 zeon3", "mandarin": "跟进", "mnemonic": "根尽", "scene": "「跟進住」=先跟著", "enteringTone": false },
            { "word": "confirm", "jyutping": "", "mandarin": "确认", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "risk", "jyutping": "", "mandarin": "风险", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "delay", "jyutping": "", "mandarin": "延迟", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "proposal", "jyutping": "", "mandarin": "提案/方案", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "補充", "jyutping": "bou2 cung1", "mandarin": "补充", "mnemonic": "补充", "scene": "「我想補充一點」", "enteringTone": false },
            { "word": "deadline", "jyutping": "", "mandarin": "截止日期", "mnemonic": "", "scene": "直接說英文", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：我建議___（我建议___）",
              "usage": "會議中提出建議的正式說法，比「不如」更有說服力",
              "examples": [
                { "canto": "我建議push back兩星期。", "jyutping": "ngo5 gin3 ji5 push back loeng5 sing1 kei4", "mandarin": "我建議推遲兩週。" },
                { "canto": "我建議等user training完咗先go-live。", "jyutping": "ngo5 gin3 ji5 dang2 user training jyun4 zo2 sin1 go-live", "mandarin": "我建議等用戶培訓完成了再上線。" },
                { "canto": "我建議加多個checkpoint喺中間。", "jyutping": "ngo5 gin3 ji5 gaa1 do1 go3 checkpoint hai2 zung1 gaan1", "mandarin": "我建議中間多加一個檢查點。" }
              ]
            },
            {
              "name": "句型2：我同意___嘅concern（我同意___的顧慮）",
              "usage": "附議同事觀點的專業表達，比直接說「我同意」更有層次",
              "examples": [
                { "canto": "我同意Sarah嘅concern。", "jyutping": "ngo5 tung4 ji3 Sarah ge3 concern", "mandarin": "我同意Sarah的顧慮。" },
                { "canto": "我都覺得呢個位有risk。", "jyutping": "ngo5 dou1 gok3 dak1 ni1 go3 wai2 jau5 risk", "mandarin": "我也覺得這個地方有風險。" },
                { "canto": "你講嘅point好重要。", "jyutping": "nei5 gong2 ge3 point hou2 zung6 jiu3", "mandarin": "你說的點很重要。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "會議發言「三明治法則」",
              "icon": "🥪",
              "content": "香港職場會議發言有個黃金結構——先說結論（好消息）→再說問題（但係…）→最後給方案（我建議…）。例如：「closing大致順利（好消息），但有一個reconciliation仲對緊（問題），不過聽日搞得掂（方案）」。老闆最怕聽到只有問題沒有方案的回報。"
            },
            {
              "title": "「我補充一點」是萬能切入詞",
              "icon": "✋",
              "content": "會議中想插話，用「我想補充一點」比直接打斷同事更專業。這句話等於舉手說「我有話要說」，既不打斷節奏，又能表達你的觀點。即使你說的跟「補充」沒關係，也可以用這個開頭。"
            },
            {
              "title": "「收到請回覆」的文化",
              "icon": "📋",
              "content": "香港Manager開會時說「明白」「收到」「keep住update」都不是隨便說說——他是真的在確認你聽懂了，而且你需要後續跟進。如果你說「明白」但沒有後續行動，Manager下次開會會追問。說出口就要做到。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——会议发言",
              "description": "Manager問你closing進度，以下哪個回應最好？",
              "scenes": [
                {
                  "scene": "Manager問你closing進度",
                  "options": [
                    { "text": "「而家做緊，大致順利，預計週五前完成。」", "correct": true },
                    { "text": "「做緊，未有問題。」", "correct": false, "reason": "太簡短，沒給時間線" },
                    { "text": "「很順利。」", "correct": false, "reason": "應用粤語" }
                  ]
                },
                {
                  "scene": "同事提出concern，你同意他",
                  "options": [
                    { "text": "「我同意Sarah嘅concern。」", "correct": true },
                    { "text": "「他說得對。」", "correct": false, "reason": "應用粤語+專業用語" },
                    { "text": "「我也是這麼想的。」", "correct": false, "reason": "應用粤語" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下粤语短语补全",
              "items": [
                { "question": "我建议推迟两周 → 我建議push back兩___", "answer": "星期" },
                { "question": "我同意Sarah的顾虑 → 我同意Sarah___concern", "answer": "嘅" },
                { "question": "我会持续更新進度 → 我會keep住___", "answer": "update" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "closing而家做緊，大致上順利，預計今個禮拜五之前可以完成。", "mandarin": "closing正在做，大体顺利，预计这周五前可以完成。" },
                { "canto": "我建議push back兩星期，咁樣大家都唔使咁趕。", "mandarin": "我建议推迟两周，这样大家都不用那么赶。" },
                { "canto": "我同意Sarah嘅concern，我睇過個training plan，確實有啲tight。", "mandarin": "我同意Sarah的顾虑，我看过培训计划，确实有点紧。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 14, title: '进度汇报', level: 3, order_index: 2, description: '學習向Manager做one-on-one進度匯報，遇到問題及時提出解決方案', difficulty_label: '⭐⭐⭐',
    content_json: JSON.stringify({
      "course_id": "MO-03-02",
      "title": "进度汇报",
      "level": 3,
      "order_index": 2,
      "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "每週一早上你要向Manager做一次one-on-one進度匯報。另外，一個重要項目出了問題，你要向Manager匯報問題並提出解決方案。",
          "scenes": [
            {
              "name": "第一幕：周常汇报",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "你", "text": "（敲門）張Manager，得唔得閒傾幾分鐘？", "jyutping": "(haau1 mun4) zoeng1 Manager, dak1 m4 dak1 haan4 king1 gei2 fan1 zung1?", "mandarin": "（敲门）张Manager，有空聊几分钟吗？" },
                { "speaker": "Manager", "text": "得，入嚟坐。咩事？", "jyutping": "dak1, jap6 lai4 co5. me1 si6?", "mandarin": "行，进来坐。什么事？" },
                { "speaker": "你", "text": "想同你update下個ERP project嘅進度。", "jyutping": "soeng2 tung4 nei5 update haa5 go3 ERP project ge3 zeon3 dou6.", "mandarin": "想跟你更新一下ERP项目的进度。" },
                { "speaker": "Manager", "text": "好，講啦。", "jyutping": "hou2, gong2 laa1.", "mandarin": "好，说吧。" },
                { "speaker": "你", "text": "上個星期主要做咗user training嘅planning，training material已經準備好。", "jyutping": "soeng6 go3 sing1 kei4 zyu2 jiu3 zou6 zo2 user training ge3 planning, training material ji5 ging1 zeon2 bei6 hou2.", "mandarin": "上周主要做了用户培训的规划，培训材料已经准备好了。" },
                { "speaker": "Manager", "text": "進度OK，有冇遇到咩阻滯？", "jyutping": "zeon3 dou6 OK, jau5 mou5 jyu6 dou2 me1 zo2 zai6?", "mandarin": "进度OK，有遇到什么阻碍吗？" },
                { "speaker": "你", "text": "有一點——training room要同IT部共用，時間上有啲撞。", "jyutping": "jau5 jat1 dim2 —— training room jiu3 tung4 IT bou6 gung6 jung6, si4 gaan3 soeng6 jau5 di1 zong6.", "mandarin": "有一点——培训室要和IT部共用，时间上有点冲突。" },
                { "speaker": "Manager", "text": "咁你同IT部傾咗未？", "jyutping": "gam2 nei5 tung4 IT bou6 king1 zo2 mei6?", "mandarin": "那你和IT部谈了吗？" },
                { "speaker": "你", "text": "傾咗，改咗schedule，而家冇問題啦。", "jyutping": "king1 zo2, goi2 zo2 schedule, ji4 gaa1 mou5 man6 tai4 laa1.", "mandarin": "谈了，改了日程，现在没问题了。" },
                { "speaker": "Manager", "text": "好，做得幾好。今個星期嘅target係咩？", "jyutping": "hou2, zou6 dak1 gei2 hou2. gam1 go3 sing1 kei4 ge3 target hai6 me1?", "mandarin": "好，做得不错。这周的目标是什么？" },
                { "speaker": "你", "text": "今個星期開始做unit testing，預計星期五之前完成。", "jyutping": "gam1 go3 sing1 kei4 hoi1 ci2 zou6 unit testing, jyu6 gei3 sing1 kei4 ng5 zi1 cin4 jyun4 sing4.", "mandarin": "这周开始做单元测试，预计周五之前完成。" },
                { "speaker": "Manager", "text": "OK，有咩問題隨時搵我。", "jyutping": "OK, jau5 me1 man6 tai4 ceoi4 si4 wan2 ngo5.", "mandarin": "OK，有什么问题随时找我。" },
                { "speaker": "你", "text": "好，唔該張Manager。", "jyutping": "hou2, m4 goi1 zoeng1 Manager.", "mandarin": "好，谢谢张Manager。" }
              ]
            },
            {
              "name": "第二幕：出问题要汇报",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "你", "text": "（急急敲門）張Manager，有啲嘢要同你講。", "jyutping": "(gap1 gap1 haau1 mun4) zoeng1 Manager, jau5 di1 je5 jiu3 tung4 nei5 gong2.", "mandarin": "（急急敲门）张Manager，有些事要跟你说。" },
                { "speaker": "Manager", "text": "咩事？睇你好緊張。", "jyutping": "me1 si6? tai2 nei5 hou2 gan2 zoeng1.", "mandarin": "什么事？看你很紧张。" },
                { "speaker": "你", "text": "係關於個vendor delivery。原本話今日到，但啱啱收到email話要delay一星期。", "jyutping": "hai6 gwaan1 jyu1 go3 vendor delivery. jyun4 bun2 waa6 gam1 jat6 dou3, daan6 ngaam1 ngaam1 sau1 dou2 email waa6 jiu3 delay jat1 sing1 kei4.", "mandarin": "是关于供应商交付的。原本说今天到，但刚刚收到邮件说要推迟一周。" },
                { "speaker": "Manager", "text": "嘩，delay一個星期咁耐？點解？", "jyutping": "waa1, delay jat1 go3 sing1 kei4 gam3 noi6? dim2 gaai2?", "mandarin": "哇，推迟一周那么久？为什么？" },
                { "speaker": "你", "text": "佢哋話production line有問題。我已經同佢哋傾過，叫佢哋最遲星期四俾到個confirmed schedule我。", "jyutping": "keoi5 dei6 waa6 production line jau5 man6 tai4. ngo5 ji5 ging1 tung4 keoi5 dei6 king1 gwo3, giu3 keoi5 dei6 zeoi3 ci4 sing1 kei4 sei3 bei2 dou2 go3 confirmed schedule ngo5.", "mandarin": "他们说生产线有问题。我已经跟他们谈过，叫他们最迟周四给我确认的时间表。" },
                { "speaker": "Manager", "text": "好，你追緊啲。如果星期四都confirm唔到，你就escalate俾我。", "jyutping": "hou2, nei5 zeoi1 gan2 di1. jyu4 gwo2 sing1 kei4 sei3 dou1 confirm m4 dou2, nei5 zau6 escalate bei2 ngo5.", "mandarin": "好，你跟紧点。如果周四都确认不了，你就升级给我。" },
                { "speaker": "你", "text": "明白。另外我想建議，為咗唔影響整體進度，可以暫時用backup vendor頂住先。", "jyutping": "ming4 baak6. ling6 ngoi6 ngo5 soeng2 gin3 ji5, wai6 zo2 m4 jing2 hoeng2 zing2 tai2 zeon3 dou6, ho2 ji5 zaam6 si4 jung6 backup vendor ding2 zyu6 sin1.", "mandarin": "明白。另外我想建议，为了不影响整体进度，可以暂时用备份供应商先顶着。" },
                { "speaker": "Manager", "text": "好建議！你同backup vendor報個價先。", "jyutping": "hou2 gin3 ji5! nei5 tung4 backup vendor bou3 go3 gaa3 sin1.", "mandarin": "好建议！你先跟备份供应商报个价。" },
                { "speaker": "你", "text": "好，我今日就處理。", "jyutping": "hou2, ngo5 gam1 jat6 zau6 cyu2 lei5.", "mandarin": "好，我今天就处理。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "update", "jyutping": "", "mandarin": "更新進度", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "阻滯", "jyutping": "zo2 zai6", "mandarin": "阻礙/卡住的問題", "mnemonic": "左在", "scene": "匯報問題用詞", "enteringTone": false },
            { "word": "target", "jyutping": "", "mandarin": "目標", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "追緊", "jyutping": "zeoi1 gan2", "mandarin": "正在跟進/催促", "mnemonic": "追根", "scene": "「追緊供應商」", "enteringTone": false },
            { "word": "escalate", "jyutping": "", "mandarin": "升級/上報", "mnemonic": "", "scene": "高級職場用詞", "enteringTone": false },
            { "word": "影響", "jyutping": "jing2 hoeng2", "mandarin": "影响", "mnemonic": "影响", "scene": "匯報中用來說明後果", "enteringTone": false },
            { "word": "處理", "jyutping": "cyu2 lei5", "mandarin": "处理", "mnemonic": "处里", "scene": "「我今日處理」", "enteringTone": false },
            { "word": "隨時", "jyutping": "ceoi4 si4", "mandarin": "随时", "mnemonic": "吹时", "scene": "「隨時搵我」", "enteringTone": false },
            { "word": "報價", "jyutping": "bou3 gaa3", "mandarin": "报价", "mnemonic": "报价", "scene": "叫vendor報價", "enteringTone": false },
            { "word": "schedule", "jyutping": "", "mandarin": "日程/時間表", "mnemonic": "", "scene": "直接說英文", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：主要做咗___（主要做了___）",
              "usage": "匯報時總結已完成工作的標準開頭",
              "examples": [
                { "canto": "上個星期主要做咗training planning。", "jyutping": "soeng6 go3 sing1 kei4 zyu2 jiu3 zou6 zo2 training planning", "mandarin": "上週主要做了培訓規劃。" },
                { "canto": "呢兩日主要做咗data cleaning。", "jyutping": "ni1 loeng5 jat6 zyu2 jiu3 zou6 zo2 data cleaning", "mandarin": "這兩天主要做了數據清洗。" },
                { "canto": "今個星期主要做咗user acceptance test。", "jyutping": "gam1 go3 sing1 kei4 zyu2 jiu3 zou6 zo2 user acceptance test", "mandarin": "這週主要做了用戶驗收測試。" }
              ]
            },
            {
              "name": "句型2：為咗唔影響___，可以___（為了不影響___，可以___）",
              "usage": "提出解決方案時說明緣由，顯示你有全局觀",
              "examples": [
                { "canto": "為咗唔影響整體進度，可以用backup vendor頂住先。", "jyutping": "wai6 zo2 m4 jing2 hoeng2 zing2 tai2 zeon3 dou6, ho2 ji5 jung6 backup vendor ding2 zyu6 sin1", "mandarin": "為了不影響整體進度，可以用備用供應商先頂著。" },
                { "canto": "為咗唔影響go-live，我建議加班趕返個schedule。", "jyutping": "wai6 zo2 m4 jing2 hoeng2 go-live, ngo5 gin3 ji5 gaa1 baan1 gon2 faan1 go3 schedule", "mandarin": "為了不影響上線，我建議加班趕回進度。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "「好消息先講，壞消息後講」",
              "icon": "📊",
              "content": "香港Manager最怕下屬隱瞞問題。匯報的黃金法則是——先講好消息（建立了信任），再講壞消息（顯示你誠實），最後講解決方案（顯示你能解決問題）。如果你只說壞消息不說方案，Manager會覺得你是來抱怨的。"
            },
            {
              "title": "「Escalate」是專業表現",
              "icon": "⬆️",
              "content": "香港職場中，「escalate」不是打小報告，而是正規的升級流程。當你發現問題超出你的權限或能力範圍，說「我需要escalate俾Manager」是負責任的表現，不是示弱。每個人都應該知道什麼時候該escalate。"
            },
            {
              "title": "「做得幾好」不是滿分",
              "icon": "📝",
              "content": "Manager說「做得幾好」≈ 70分水平，意思是「OK，但冇驚喜」。如果Manager說「做得好好」≈85分。說「excellent」才是真正的讚賞。所以聽到「做得幾好」不要太高興——繼續努力。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——周常汇报",
              "description": "匯報進度時，以下哪個說法最專業？",
              "scenes": [
                {
                  "scene": "汇报上周工作进度",
                  "options": [
                    { "text": "「上個星期主要做咗training planning，進度OK。」", "correct": true },
                    { "text": "「上星期做了培訓計劃。」", "correct": false, "reason": "應用粤語" },
                    { "text": "「training计划做好了。」", "correct": false, "reason": "應用粤語" }
                  ]
                },
                {
                  "scene": "供應商要delay一星期，你匯報時應該包含什麼？",
                  "options": [
                    { "text": "問題原因 + 已做行動 + 建議方案", "correct": true },
                    { "text": "只說「vendor delay了」", "correct": false, "reason": "沒方案" },
                    { "text": "等解決了再匯報", "correct": false, "reason": "不該隱瞞" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下粤语短语补全",
              "items": [
                { "question": "这周开始做unit testing → 今個星期開始做___", "answer": "unit testing" },
                { "question": "遇到什麼阻礙 → 有冇遇到咩___？", "answer": "阻滯" },
                { "question": "我会追紧供应商 → 我會___供應商。", "answer": "追緊" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "上個星期主要做咗user training嘅planning，training material已經準備好。", "mandarin": "上周主要做了用户培训的规划，培训材料已准备好。" },
                { "canto": "為咗唔影響整體進度，可以暫時用backup vendor頂住先。", "mandarin": "为了不影响整体进度，可以暂时用备份供应商先顶着。" },
                { "canto": "如果星期四都confirm唔到，你就escalate俾我。", "mandarin": "如果周四都确认不了，你就升级给我。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 15, title: '请示上级', level: 3, order_index: 3, description: '學習向上級請示審批和決策，掌握授權邊界', difficulty_label: '⭐⭐⭐',
    content_json: JSON.stringify({
      "course_id": "MO-03-03",
      "title": "请示上级",
      "level": 3,
      "order_index": 3,
      "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你有一個採購方案需要Manager審批，然後遇到了一個需要先請示才能決定的問題。",
          "scenes": [
            {
              "name": "第一幕：申请审批",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "你", "text": "（敲門）張Manager，打擾一下，有份文件想你簽個名。", "jyutping": "(haau1 mun4) zoeng1 Manager, daa2 jau2 jat1 haa5, jau5 fan6 man4 gin2 soeng2 nei5 cim1 go3 meng2.", "mandarin": "（敲门）张Manager，打扰一下，有份文件想让你签个名。" },
                { "speaker": "Manager", "text": "咩文件？", "jyutping": "me1 man4 gin2?", "mandarin": "什么文件？" },
                { "speaker": "你", "text": "係新vendor嘅採購申請，總數三萬蚊。", "jyutping": "hai6 san1 vendor ge3 coi2 kau3 san1 cing2, zung2 sou3 saam1 maan6 man1.", "mandarin": "是新供应商的采购申请，总数三万块。" },
                { "speaker": "Manager", "text": "（睇）點解揀呢間vendor？", "jyutping": "(tai2) dim2 gaai2 gaan2 ni1 gaan1 vendor?", "mandarin": "（看）为什么选这家供应商？" },
                { "speaker": "你", "text": "因為佢哋報價最低，而且reference check過，其他客嘅feedback都好正面。", "jyutping": "jan1 wai6 keoi5 dei6 bou3 gaa3 zeoi3 dai1, ji4 ce2 reference check gwo3, kei4 taa1 haak3 ge3 feedback dou1 hou2 zing3 min2.", "mandarin": "因为他们报价最低，而且做过背景调查，其他客户的反馈都很正面。" },
                { "speaker": "Manager", "text": "保養期幾耐？", "jyutping": "bou2 joeng5 kei4 gei2 noi6?", "mandarin": "保修期多久？" },
                { "speaker": "你", "text": "兩年，包括on-site support。", "jyutping": "loeng5 nin4, baau1 kut3 on-site support.", "mandarin": "两年，包括现场支持。" },
                { "speaker": "Manager", "text": "OK，冇問題。（簽名）", "jyutping": "OK, mou5 man6 tai4. (cim1 meng2)", "mandarin": "OK，没问题。（签名）" },
                { "speaker": "你", "text": "唔該張Manager。另外想問下，呢個budget係咪用返project個條數？", "jyutping": "m4 goi1 zoeng1 Manager. ling6 ngoi6 soeng2 man6 haa5, ni1 go3 budget hai6 mai6 jung6 faan1 project go3 tiu4 sou3?", "mandarin": "谢谢张Manager。另外想问一下，这个预算是不是用回project那条数？" },
                { "speaker": "Manager", "text": "係，入返ERP project個cost center。", "jyutping": "hai6, jap6 faan1 ERP project go3 cost center.", "mandarin": "对，入回ERP项目的成本中心。" },
                { "speaker": "你", "text": "好，明白。", "jyutping": "hou2, ming4 baak6.", "mandarin": "好，明白。" }
              ]
            },
            {
              "name": "第二幕：遇到决策难题",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "你", "text": "張Manager，有啲嘢想請示你。", "jyutping": "zoeng1 Manager, jau5 di1 je5 soeng2 cing2 si6 nei5.", "mandarin": "张Manager，有些事想请示你。" },
                { "speaker": "Manager", "text": "講。", "jyutping": "gong2.", "mandarin": "说。" },
                { "speaker": "你", "text": "係關於個user training嘅安排。原本計劃係全部on-site training，但而家收到幾個同事話想remote。", "jyutping": "hai6 gwaan1 jyu1 go3 user training ge3 on1 paai4. jyun4 bun2 gai3 waak6 hai6 cyun4 bou6 on-site training, daan6 ji4 gaa1 sau1 dou2 gei2 go3 tung4 si6 waa6 soeng2 remote.", "mandarin": "是关于用户培训的安排。原本计划是全部现场培训，但现在收到几个同事说想远程。" },
                { "speaker": "Manager", "text": "你覺得點做好？", "jyutping": "nei5 gok3 dak1 dim2 zou6 hou2?", "mandarin": "你觉得怎么做比较好？" },
                { "speaker": "你", "text": "我自己覺得hybrid mode係最好——主要內容on-site，同步開zoom俾remote同事。", "jyutping": "ngo5 zi6 gei2 gok3 dak1 hybrid mode hai6 zeoi3 hou2 —— zyu2 jiu3 noi6 jung4 on-site, tung4 bou6 hoi1 zoom bei2 remote tung4 si6.", "mandarin": "我自己觉得混合模式最好——主要内容现场，同步开zoom给远程同事。" },
                { "speaker": "Manager", "text": "好建議，就咁做。", "jyutping": "hou2 gin3 ji5, zau6 gam2 zou6.", "mandarin": "好建议，就这么做。" },
                { "speaker": "你", "text": "但係hybrid mode要買多兩支cam同mic，大約二千蚊，唔知批唔批得？", "jyutping": "daan6 hai6 hybrid mode jiu3 maai5 do1 loeng5 zi1 cam tung4 mic, daai6 joek3 ji6 cin1 man1, m4 zi1 pai1 m4 pai1 dak1?", "mandarin": "但是混合模式要多买两支摄像头和麦克风，大约两千块，不知道能不能批？" },
                { "speaker": "Manager", "text": "二千蚊唔洗問我啦，你自己決定就得。二千以上先搵我簽。", "jyutping": "ji6 cin1 man1 m4 sai2 man6 ngo5 laa1, nei5 zi6 gei2 kyut3 ding6 zau6 dak1. ji6 cin1 ji5 soeng6 sin1 wan2 ngo5 cim1.", "mandarin": "两千块不用问我了，你自己决定就行。两千以上才找我签。" },
                { "speaker": "你", "text": "好，知道！下次我會注意。", "jyutping": "hou2, zi1 dou3! haa6 ci3 ngo5 wui5 zyu3 ji3.", "mandarin": "好，知道！下次我会注意。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "請示", "jyutping": "cing2 si6", "mandarin": "请示", "mnemonic": "请是", "scene": "正式請示上級", "enteringTone": false },
            { "word": "審批", "jyutping": "sam2 pei1", "mandarin": "审批", "mnemonic": "审批", "scene": "文件/預算審批", "enteringTone": false },
            { "word": "簽名", "jyutping": "cim1 meng2", "mandarin": "签名", "mnemonic": "签名", "scene": "簽文件即批准", "enteringTone": false },
            { "word": "預算", "jyutping": "jyu6 syun3", "mandarin": "预算", "mnemonic": "预算", "scene": "直接說英文budget也可", "enteringTone": false },
            { "word": "成本中心", "jyutping": "sing4 bun2 zung1 sam1", "mandarin": "成本中心", "mnemonic": "成本中心", "scene": "記賬用 / cost center", "enteringTone": false },
            { "word": "自己決定", "jyutping": "zi6 gei2 kyut3 ding6", "mandarin": "自己决定", "mnemonic": "自給決丁", "scene": "Manager給你的授權", "enteringTone": true },
            { "word": "授權", "jyutping": "sau6 kyun4", "mandarin": "授权", "mnemonic": "受權", "scene": "Manager授權你做事", "enteringTone": false },
            { "word": "escalate", "jyutping": "", "mandarin": "升级/上报", "mnemonic": "", "scene": "超出權限要上報", "enteringTone": false },
            { "word": "超預算", "jyutping": "ciu1 jyu6 syun3", "mandarin": "超预算", "mnemonic": "超预算", "scene": "講錢要用嘅詞", "enteringTone": false },
            { "word": "參考", "jyutping": "caam1 haau2", "mandarin": "参考", "mnemonic": "参考", "scene": "「給你參考」=供你決定", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：想請示你___（想請示你___）",
              "usage": "請示上級的標準開場白，比「我想問」更正式",
              "examples": [
                { "canto": "有啲嘢想請示你。", "jyutping": "jau5 di1 je5 soeng2 cing2 si6 nei5", "mandarin": "有些事想請示你。" },
                { "canto": "想請示你點處理呢個case。", "jyutping": "soeng2 cing2 si6 nei5 dim2 cyu2 lei5 ni1 go3 case", "mandarin": "想請示你怎麼處理這個案子。" },
                { "canto": "想請示下個approval可唔可以快啲。", "jyutping": "soeng2 cing2 si6 haa5 go3 approval ho2 m4 ho2 ji5 faai3 di1", "mandarin": "想請示一下審批能不能快一點。" }
              ]
            },
            {
              "name": "句型2：___唔洗問我啦，你___就得（___不用問我，你___就行）",
              "usage": "Manager授權下屬的經典句式，L3學完要能聽懂老闆的授權邊界",
              "examples": [
                { "canto": "二千蚊唔洗問我啦，你自己決定就得。", "jyutping": "ji6 cin1 man1 m4 sai2 man6 ngo5 laa1, nei5 zi6 gei2 kyut3 ding6 zau6 dak1", "mandarin": "兩千塊不用問我，你自己決定就行。" },
                { "canto": "呢啲routine嘢你簽咗先，後補俾我睇。", "jyutping": "ni1 di1 routine je5 nei5 cim1 zo2 sin1, hau6 bou2 bei2 ngo5 tai2", "mandarin": "這些常規事情你先簽了，後補給我看。" },
                { "canto": "一個禮拜以內嘅leave你批就得，唔洗問我。", "jyutping": "jat1 go3 lai5 baai3 ji5 noi6 ge3 leave nei5 pai1 zau6 dak1, m4 sai2 man6 ngo5", "mandarin": "一週以內的假你批就行，不用問我。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "「敲門」是請示的第一步",
              "icon": "🚪",
              "content": "香港職場請示上級，永遠要先敲門（或先在IM上問「得唔得閒傾幾分鐘？」）。千萬不要直接衝進Manager辦公室就開始講——你覺得十萬火急的事，Manager可能正在處理更重要的事。先問「打擾一下」是基本禮儀。"
            },
            {
              "title": "「先想方案，再請示」",
              "icon": "💡",
              "content": "香港Manager最怕下屬兩手空空來請示。正確的做法是：你想好兩個方案（A和B），分析各自的優缺點，然後讓Manager做選擇。例如：「我建議方案A因為成本低，但方案B更快。你點睇？」——這叫「帶著方案請示」，Manager會覺得你靠譜。"
            },
            {
              "title": "授權邊界（Delegate Authority）",
              "icon": "⚖️",
              "content": "香港公司通常有明確的授權邊界——多少錢以下你自己簽，多少錢以上要找Manager簽，多少錢以上要找Director簽。搞清楚授權邊界，以後就不用每件事都問了。第一次請示時順便問「呢個金額係咪我批就得定係要你簽？」"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——请示开场",
              "description": "你要找Manager請示問題，第一句怎麼說最合適？",
              "scenes": [
                {
                  "scene": "开场怎么说",
                  "options": [
                    { "text": "「張Manager，有啲嘢想請示你。」", "correct": true },
                    { "text": "「老闆，有個事。」", "correct": false, "reason": "太隨意" },
                    { "text": "「張Manager，你過來一下。」", "correct": false, "reason": "叫老闆過來？不禮貌" }
                  ]
                },
                {
                  "scene": "Manager問你「你覺得點做好？」，你該怎麼回？",
                  "options": [
                    { "text": "「我自己覺得hybrid mode最好，因為…」", "correct": true },
                    { "text": "「我不知道，你決定吧。」", "correct": false, "reason": "回到Manager身上" },
                    { "text": "「怎麼都行。」", "correct": false, "reason": "等於沒想過" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下粤语短语补全",
              "items": [
                { "question": "想请示你一件事 → 有啲嘢想___你", "answer": "請示" },
                { "question": "两千块不用问我 → 二千蚊唔洗問___", "answer": "我" },
                { "question": "你先簽字 → 你___就得", "answer": "簽名" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "張Manager，有啲嘢想請示你。", "mandarin": "张Manager，有些事想请示你。" },
                { "canto": "二千蚊唔洗問我啦，你自己決定就得。", "mandarin": "两千块不用问我了，你自己决定就行。" },
                { "canto": "係新vendor嘅採購申請，總數三萬蚊。", "mandarin": "是新供应商的采购申请，总数三万块。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 16, title: '跨部门协作', level: 3, order_index: 4, description: '學習同IT部、採購部等不同部門協調project安排', difficulty_label: '⭐⭐⭐',
    content_json: JSON.stringify({
      "course_id": "MO-03-04",
      "title": "跨部门协作",
      "level": 3,
      "order_index": 4,
      "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你負責的ERP項目需要IT部和採購部配合，你要跟不同部門的同事協調data migration和系統測試的安排。",
          "scenes": [
            {
              "name": "第一幕：找IT部配合",
              "location": "IT部办公区",
              "lines": [
                { "speaker": "你", "text": "（去IT部）阿Ken，想同你傾下個data migration嘅安排。", "jyutping": "(heoi3 IT bou6) Aa3 Ken, soeng2 tung4 nei5 king1 haa5 go3 data migration ge3 on1 paai4.", "mandarin": "（去IT部）阿Ken，想跟你聊一下数据迁移的安排。" },
                { "speaker": "Ken", "text": "好，你講。", "jyutping": "hou2, nei5 gong2.", "mandarin": "好，你说。" },
                { "speaker": "你", "text": "我哋計劃下個星期一開始做migration，想IT部到時support住。", "jyutping": "ngo5 dei6 gai3 waak6 haa6 go3 sing1 kei4 jat1 hoi1 ci2 zou6 migration, soeng2 IT bou6 dou3 si4 support zyu6.", "mandarin": "我们计划下周一做迁移，想IT部到时支持着。" },
                { "speaker": "Ken", "text": "星期一我全日都有training，可唔可以改星期二？", "jyutping": "sing1 kei4 jat1 ngo5 cyun4 jat6 dou1 jau5 training, ho2 m4 ho2 ji5 goi2 sing1 kei4 ji6?", "mandarin": "星期一我全天有培训，可不可以改星期二？" },
                { "speaker": "你", "text": "星期二… 我得，但係要同vendor confirm下佢哋得唔得。", "jyutping": "sing1 kei4 ji6... ngo5 dak1, daan6 hai6 jiu3 tung4 vendor confirm haa5 keoi5 dei6 dak1 m4 dak1.", "mandarin": "星期二…我可以，但是要跟供应商确认下他们行不行。" },
                { "speaker": "Ken", "text": "好，你confirm咗話我知。", "jyutping": "hou2, nei5 confirm zo2 waa6 ngo5 zi1.", "mandarin": "好，你确认了告诉我。" },
                { "speaker": "你", "text": "明白。另外，migration嗰日你可唔可以幫手mon住個system performance？", "jyutping": "ming4 baak6. ling6 ngoi6, migration go2 jat6 nei5 ho2 m4 ho2 ji5 bong1 sau2 mon zyu6 go3 system performance?", "mandarin": "明白。另外，迁移那天你可不可以帮忙监控着系统性能？" },
                { "speaker": "Ken", "text": "可以，我set個monitoring tool，有問題即刻alert。", "jyutping": "ho2 ji5, ngo5 set go3 monitoring tool, jau5 man6 tai4 zik1 hak1 alert.", "mandarin": "可以，我设个监控工具，有问题立马警报。" },
                { "speaker": "你", "text": "唔該晒阿Ken，靠晒你啦！", "jyutping": "m4 goi1 saai3 Aa3 Ken, kaau3 saai3 nei5 laa1!", "mandarin": "非常感谢阿Ken，全靠你了！" }
              ]
            },
            {
              "name": "第二幕：协调时间冲突",
              "location": "打电话",
              "lines": [
                { "speaker": "你", "text": "（打電話）喂，Wilson，我係財務部嘅XXX。想傾下個delivery schedule。", "jyutping": "(daa2 din6 waa2) wai2, Wilson, ngo5 hai6 coi4 mou6 bou6 ge3 XXX. soeng2 king1 haa5 go3 delivery schedule.", "mandarin": "（打电话）喂，Wilson，我是财务部的XXX。想聊一下送货安排。" },
                { "speaker": "Wilson", "text": "哦，你好！咩事？", "jyutping": "o4, nei5 hou2! me1 si6?", "mandarin": "哦，你好！什么事？" },
                { "speaker": "你", "text": "係咁嘅，IT部建議星期二做migration，但係你之前話星期二先送貨，時間上有啲撞。", "jyutping": "hai6 gam2 ge3, IT bou6 gin3 ji5 sing1 kei4 ji6 zou6 migration, daan6 hai6 nei5 zi1 cin4 waa6 sing1 kei4 ji6 sin1 sung3 fo3, si4 gaan3 soeng6 jau5 di1 zong6.", "mandarin": "是这样的，IT部建议周二做迁移，但是你之前说周二才送货，时间上有点冲突。" },
                { "speaker": "Wilson", "text": "係，星期二下晝送貨，你migration幾點做？", "jyutping": "hai6, sing1 kei4 ji6 haa6 zau3 sung3 fo3, nei5 migration gei2 dim2 zou6?", "mandarin": "对，周二下午送货，你迁移几点做？" },
                { "speaker": "你", "text": "IT話上晝做，下晝用嚟testing，應該唔會撞。", "jyutping": "IT waa6 soeng6 zau3 zou6, haa6 zau3 jung6 lai4 testing, jing1 goi1 m4 wui5 zong6.", "mandarin": "IT说上午做，下午用来测试，应该不会冲突。" },
                { "speaker": "Wilson", "text": "咁就OK，上晝你哋migration，下晝我送貨，冇問題。", "jyutping": "gam2 zau6 OK, soeng6 zau3 nei5 dei6 migration, haa6 zau3 ngo5 sung3 fo3, mou5 man6 tai4.", "mandarin": "那就OK，上午你们迁移，下午我送货，没问题。" },
                { "speaker": "你", "text": "好！另外想問下，你啲data可唔可以提早一日俾我？我想pre-check下。", "jyutping": "hou2! ling6 ngoi6 soeng2 man6 haa5, nei5 di1 data ho2 m4 ho2 ji5 tai4 zou2 jat1 jat6 bei2 ngo5? ngo5 soeng2 pre-check haa5.", "mandarin": "好！另外想问下，你的数据可不可以提早一天给我？我想预先检查下。" },
                { "speaker": "Wilson", "text": "可以，我聽日email俾你。", "jyutping": "ho2 ji5, ngo5 ting1 jat6 email bei2 nei5.", "mandarin": "可以，我明天发邮件给你。" },
                { "speaker": "你", "text": "唔該晒Wilson，合作愉快！", "jyutping": "m4 goi1 saai3 Wilson, hap6 zok3 jyu4 faai3!", "mandarin": "非常感谢Wilson，合作愉快！" }
              ]
            },
            {
              "name": "第三幕：kick-off meeting",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "好，今日搵大家嚟係為咗align個migration plan。我簡單講下個timeline：", "jyutping": "hou2, gam1 jat6 wan2 daai6 gaa1 lai4 hai6 wai6 zo2 align go3 migration plan. ngo5 gaan2 daan1 gong2 haa5 go3 timeline:", "mandarin": "好，今天找大家来是为了对齐迁移计划。我简单说说时间线：" },
                { "speaker": "你", "text": "聽日：Wilson提供data；星期一上晝：IT做migration，我同Ken monitor；星期一下晝：testing；星期二：Wilson送貨。", "jyutping": "ting1 jat6: Wilson tai4 gung1 data; sing1 kei4 jat1 soeng6 zau3: IT zou6 migration, ngo5 tung4 Ken monitor; sing1 kei4 jat1 haa6 zau3: testing; sing1 kei4 ji6: Wilson sung3 fo3.", "mandarin": "明天：Wilson提供数据；周一上午：IT做迁移，我和Ken监控；周一下午：测试；周二：Wilson送货。" },
                { "speaker": "Ken", "text": "timeline清楚，我冇問題。", "jyutping": "timeline cing1 co2, ngo5 mou5 man6 tai4.", "mandarin": "时间线清楚，我没问题。" },
                { "speaker": "Wilson", "text": "我都OK。", "jyutping": "ngo5 dou1 OK.", "mandarin": "我也OK。" },
                { "speaker": "你", "text": "好，大家有共識。如果有任何改動，我會即時通知大家。唔該晒各位！", "jyutping": "hou2, daai6 gaa1 jau5 gung6 sik1. jyu4 gwo2 jau5 jam6 ho4 goi2 dung6, ngo5 wui5 zik1 si4 tung1 zi1 daai6 gaa1. m4 goi1 saai3 gok3 wai2!", "mandarin": "好，大家有共识。如果有任何改动，我会即时通知大家。非常感谢各位！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "配合", "jyutping": "pui3 hap6", "mandarin": "配合", "mnemonic": "佩哈", "scene": "跨部門的核心詞", "enteringTone": true },
            { "word": "協調", "jyutping": "hip3 tiu4", "mandarin": "协调", "mnemonic": "协条", "scene": "跨部門的日常", "enteringTone": true },
            { "word": "align", "jyutping": "", "mandarin": "对齐/協調", "mnemonic": "", "scene": "會議高頻，如「align個plan」", "enteringTone": false },
            { "word": "timeline", "jyutping": "", "mandarin": "時間線", "mnemonic": "", "scene": "項目管理核心詞", "enteringTone": false },
            { "word": "撞期", "jyutping": "zong6 kei4", "mandarin": "撞期/時間衝突", "mnemonic": "撞骑", "scene": "時間上有衝突", "enteringTone": false },
            { "word": "support", "jyutping": "", "mandarin": "支持", "mnemonic": "", "scene": "IT support等", "enteringTone": false },
            { "word": "monitor", "jyutping": "", "mandarin": "監控", "mnemonic": "", "scene": "監控進度/系統", "enteringTone": false },
            { "word": "共識", "jyutping": "gung6 sik1", "mandarin": "共识", "mnemonic": "共色", "scene": "「大家有共識」=達成一致", "enteringTone": true },
            { "word": "通知", "jyutping": "tung1 zi1", "mandarin": "通知", "mnemonic": "通知", "scene": "「有改動即時通知」", "enteringTone": false },
            { "word": "靠晒你", "jyutping": "kaau3 saai3 nei5", "mandarin": "全靠你了", "mnemonic": "靠晒内", "scene": "既表示依賴也表示客氣", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：想同你傾下___（想跟你聊一下___）",
              "usage": "跨部門開啟對話的客氣說法，比直接說「我要___」更尊重對方",
              "examples": [
                { "canto": "想同你傾下個migration安排。", "jyutping": "soeng2 tung4 nei5 king1 haa5 go3 migration on1 paai4", "mandarin": "想跟你聊一下遷移的安排。" },
                { "canto": "想同你傾下個schedule點樣夾。", "jyutping": "soeng2 tung4 nei5 king1 haa5 go3 schedule dim2 joeng2 gaap3", "mandarin": "想跟你聊一下時間怎麼湊。" },
                { "canto": "想同你align下個timeline。", "jyutping": "soeng2 tung4 nei5 align haa5 go3 timeline", "mandarin": "想跟你對一下時間線。" }
              ]
            },
            {
              "name": "句型2：時間上有啲撞（時間上有點衝突）",
              "usage": "表達時間衝突的委婉說法，比直接說「撞期了」更商務",
              "examples": [
                { "canto": "時間上有啲撞，可唔可以改？", "jyutping": "si4 gaan3 soeng6 jau5 di1 zong6, ho2 m4 ho2 ji5 goi2?", "mandarin": "時間上有點衝突，可不可以改？" },
                { "canto": "你呢個meeting同我個training撞咗時間。", "jyutping": "nei5 ni1 go3 meeting tung4 ngo5 go3 training zong6 zo2 si4 gaan3", "mandarin": "你這個會議跟我的培訓撞時間了。" },
                { "canto": "大家夾一夾個時間，睇下邊日大家都得。", "jyutping": "daai6 gaa1 gaap3 jat1 gaap3 go3 si4 gaan3, tai2 haa5 bin1 jat6 daai6 gaa1 dou1 dak1", "mandarin": "大家湊一下時間，看哪天大家都行。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "跨部門溝通的「先打招呼後說事」法則",
              "icon": "👋",
              "content": "香港職場跨部門溝通，千萬不要直接發郵件或打電話就開始講事情。正確做法是：先在WhatsApp/Teams打聲招呼（「Hello，想請教少少嘢，得閒嗎？」），等對方回應了再講。直接衝過去說事的會被認為「冇禮貌」。"
            },
            {
              "title": "「夾時間」是一門藝術",
              "icon": "🕐",
              "content": "跨部門協作最難的是「夾時間」——每個人都有自己的schedule，你要找一個大家都行的時間。香港職場的做法是先提出你的preference（「我想星期二做migration」），再讓對方說他的限制（「星期二我有training」），最後互相調整（「改星期三OK嗎？」）。不要問「你幾時得閒」——對方可能回你一個月後。"
            },
            {
              "title": "「Kick-off meeting」的潛規則",
              "icon": "🏁",
              "content": "跨部門項目啟動通常會開一個kick-off meeting，目的是讓所有相關部門「align」共識。Kick-off meeting上最重要的不是討論細節，而是確認每個人知道自己的角色和deadline。會議結束前一定要問一句「大家有冇問題？」，沒有人回答就代表大家agree了——之後出了問題就沒有藉口。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——跨部门沟通",
              "description": "你要找IT部同事協調時間，第一句怎麼說最合適？",
              "scenes": [
                {
                  "scene": "开场怎么说",
                  "options": [
                    { "text": "「阿Ken，想同你傾下個migration安排。」", "correct": true },
                    { "text": "「喂，migration的事你知道了嗎？」", "correct": false, "reason": "太直接" },
                    { "text": "「Ken，週一有空嗎？」", "correct": false, "reason": "沒說清楚什麼事" }
                  ]
                },
                {
                  "scene": "兩個部門的時間衝突了，以下哪個說法最委婉專業？",
                  "options": [
                    { "text": "「時間上有啲撞，可唔可以改？」", "correct": true },
                    { "text": "「不行，那天我有事。」", "correct": false, "reason": "太生硬" },
                    { "text": "「你改一下時間吧。」", "correct": false, "reason": "命令口氣" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下粤语短语补全",
              "items": [
                { "question": "我想跟你聊一下安排 → 想同你___下個安排", "answer": "傾" },
                { "question": "撞时间了 → 時間上有啲___", "answer": "撞" },
                { "question": "大家有共识 → 大家有___", "answer": "共識" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "想同你傾下個data migration嘅安排。", "mandarin": "想跟你聊一下数据迁移的安排。" },
                { "canto": "時間上有啲撞，可唔可以改？", "mandarin": "时间上有点冲突，可不可以改？" },
                { "canto": "大家有共識。如果有任何改動，我會即時通知大家。", "mandarin": "大家有共识。如果有任何改动，我会即时通知大家。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 17, title: '内部培训', level: 3, order_index: 5, description: '學習主持內部培訓，從準備到正式授課到回答問題', difficulty_label: '⭐⭐⭐',
    content_json: JSON.stringify({
      "course_id": "MO-03-05",
      "title": "内部培训",
      "level": 3,
      "order_index": 5,
      "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你負責給新同事做一次FICO系統操作培訓，從準備到正式授課到回答問題。",
          "scenes": [
            {
              "name": "第一幕：培训准备",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "你", "text": "（同Manager）張Manager，下個禮拜嘅training我準備得七七八八。", "jyutping": "(tung4 Manager) zoeng1 Manager, haa6 go3 lai5 baai3 ge3 training ngo5 zeon2 bei6 dak1 cat1 cat1 baat3 baat3.", "mandarin": "（跟Manager）张Manager，下周的训练我准备得七七八八了。" },
                { "speaker": "Manager", "text": "內容包括啲咩？", "jyutping": "noi6 jung4 baau1 kut3 di1 me1?", "mandarin": "内容包括些什么？" },
                { "speaker": "你", "text": "主要cover三個part：PO processing、invoice verification同埋reporting。", "jyutping": "zyu2 jiu3 cover saam1 go3 part: PO processing, invoice verification tung4 maai4 reporting.", "mandarin": "主要覆盖三部分：采购订单处理、发票验证和报表。" },
                { "speaker": "Manager", "text": "預計幾耐？", "jyutping": "jyu6 gei3 gei2 noi6?", "mandarin": "预计多久？" },
                { "speaker": "你", "text": "兩個鐘，中間break十五分鐘。", "jyutping": "loeng5 go3 zung1, zung1 gaan1 break sap6 ng5 fan1 zung1.", "mandarin": "两个小时，中间休息十五分钟。" },
                { "speaker": "Manager", "text": "夠唔夠用？會唔會太rush？", "jyutping": "gau3 m4 gau3 jung6? wui5 m4 wui5 taai3 rush?", "mandarin": "够不够用？会不会太赶？" },
                { "speaker": "你", "text": "我覺得ok，每個part有實機demo，跟住俾佢哋自己試。", "jyutping": "ngo5 gok3 dak1 ok, mui5 go3 part jau5 sat6 gei1 demo, gan1 zyu6 bei2 keoi5 dei6 zi6 gei2 si3.", "mandarin": "我觉得ok，每部分有实机演示，然后让他们自己试。" },
                { "speaker": "Manager", "text": "好，有冇整handout俾佢哋？", "jyutping": "hou2, jau5 mou5 zing2 handout bei2 keoi5 dei6?", "mandarin": "好，有没有做讲义给他们？" },
                { "speaker": "你", "text": "有，我整咗一份step-by-step guide，到時派俾佢哋。", "jyutping": "jau5, ngo5 zing2 zo2 jat1 fan6 step-by-step guide, dou3 si4 paai3 bei2 keoi5 dei6.", "mandarin": "有，我做了一份步骤指南，到时发给他们。" },
                { "speaker": "Manager", "text": "正，準備充分！", "jyutping": "zeng3, zeon2 bei6 cung1 fan6!", "mandarin": "棒，准备充分！" }
              ]
            },
            {
              "name": "第二幕：培训开始",
              "location": "培训室",
              "lines": [
                { "speaker": "你", "text": "好，大家早晨！歡迎嚟到FICO系統操作training。", "jyutping": "hou2, daai6 gaa1 zou2 san4! fun1 jing4 lai4 dou3 FICO hai6 tung2 cou1 zok3 training.", "mandarin": "好，大家早安！欢迎来到FICO系统操作培训。" },
                { "speaker": "你", "text": "今日嘅agenda分三個part，預計兩點鐘左右完成。首先，我簡單介紹下個PO流程。", "jyutping": "gam1 jat6 ge3 agenda fan1 saam1 go3 part, jyu6 gei3 loeng5 dim2 zung1 zo2 jau2 jyun4 sing4. sau2 sin1, ngo5 gaan2 daan1 gaai3 siu6 haa5 go3 PO lau4 cing4.", "mandarin": "今天的议程分三部分，预计两点左右完成。首先我简单介绍下采购订单流程。" },
                { "speaker": "你", "text": "大家睇住個screen，首先入MM01 create material master，跟住ME21N create purchase order，最後MIGO做goods receipt。好簡單。", "jyutping": "daai6 gaa1 tai2 zyu6 go3 screen, sau2 sin1 jap6 MM01 create material master, gan1 zyu6 ME21N create purchase order, zeoi3 hau6 MIGO zou6 goods receipt. hou2 gaan2 daan1.", "mandarin": "大家看着屏幕，先输入MM01建物料主档，接着ME21N建采购订单，最后MIGO做收货。很简单。" },
                { "speaker": "同事A", "text": "請問，如果個PO已經approved咗，想改quantity，係咪要cancel成張PO？", "jyutping": "cing2 man6, jyu4 gwo2 go3 PO ji5 ging1 approved zo2, soeng2 goi2 quantity, hai6 mai6 jiu3 cancel seng4 zoeng1 PO?", "mandarin": "请问，如果PO已经批准了，想改数量，是不是要取消整张PO？" },
                { "speaker": "你", "text": "好問題！唔洗cancel成張。你可以用ME22N做change，改quantity之後再approve一次就得。", "jyutping": "hou2 man6 tai4! m4 sai2 cancel seng4 zoeng1. nei5 ho2 ji5 jung6 ME22N zou6 change, goi2 quantity zi1 hau6 zoi3 approve jat1 ci3 zau6 dak1.", "mandarin": "好问题！不用取消整张。你可以用ME22N做修改，改数量之后再批准一次就行。" },
                { "speaker": "同事A", "text": "明白，唔該！", "jyutping": "ming4 baak6, m4 goi1!", "mandarin": "明白，谢谢！" },
                { "speaker": "你", "text": "仲有冇其他問題？冇嘅話我哋入下一個part。", "jyutping": "zung6 jau5 mou5 kei4 taa1 man6 tai4? mou5 ge3 waa6 ngo5 dei6 jap6 haa6 jat1 go3 part.", "mandarin": "还有没有其他问题？没有的话我们进下一部分。" }
              ]
            },
            {
              "name": "第三幕：收尾与跟进",
              "location": "培训室",
              "lines": [
                { "speaker": "你", "text": "（培訓結束）好，今日嘅training到呢度。handout入面有我嘅contact，有任何問題隨時email或者WhatsApp我。", "jyutping": "(pui4 fan3 git3 cuk1) hou2, gam1 jat6 ge3 training dou3 ni1 dou6. handout jap6 min6 jau5 ngo5 ge3 contact, jau5 jam6 ho4 man6 tai4 ceoi4 si4 email waak6 ze2 WhatsApp ngo5.", "mandarin": "（培训结束）好，今天的培训到这里。讲义里面有我的联系方式，有任何问题随时邮件或WhatsApp我。" },
                { "speaker": "你", "text": "另外，我會send一個feedback form俾大家，希望大家fill一fill，等我improve下個training。", "jyutping": "ling6 ngoi6, ngo5 wui5 send jat1 go3 feedback form bei2 daai6 gaa1, hei1 mong6 daai6 gaa1 fill jat1 fill, dang2 ngo5 improve haa5 go3 training.", "mandarin": "另外，我会发一个反馈表给大家，希望大家填一下，让我改进这次培训。" },
                { "speaker": "同事們", "text": "好，唔該晒！", "jyutping": "hou2, m4 goi1 saai3!", "mandarin": "好，非常感谢！" },
                { "speaker": "你", "text": "唔客氣！聽日開始我會喺office，如果做嘢遇到問題可以直接嚟搵我。唔該晒大家！", "jyutping": "m4 haak3 hei3! ting1 jat6 hoi1 ci2 ngo5 wui5 hai2 office, jyu4 gwo2 zou6 je5 jyu6 dou2 man6 tai4 ho2 ji5 zik6 zip3 lai4 wan2 ngo5. m4 goi1 saai3 daai6 gaa1!", "mandarin": "不客气！明天开始我会在办公室，如果做事遇到问题可以直接来找我。非常感谢大家！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "培訓", "jyutping": "pui4 fan3", "mandarin": "培训", "mnemonic": "培训", "scene": "内部培訓", "enteringTone": false },
            { "word": "training", "jyutping": "", "mandarin": "培训/訓練", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "agenda", "jyutping": "", "mandarin": "議程", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "demo", "jyutping": "", "mandarin": "演示", "mnemonic": "", "scene": "操作示範", "enteringTone": false },
            { "word": "handout", "jyutping": "", "mandarin": "講義/教材", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "step-by-step guide", "jyutping": "", "mandarin": "步驟指南", "mnemonic": "", "scene": "培訓常用", "enteringTone": false },
            { "word": "實機操作", "jyutping": "sat6 gei1 cou1 zok3", "mandarin": "實際操作", "mnemonic": "實給措作", "scene": "培訓中最有價值的部分", "enteringTone": true },
            { "word": "問題", "jyutping": "man6 tai4", "mandarin": "问题", "mnemonic": "闷台", "scene": "歡迎提問", "enteringTone": false },
            { "word": "feedback form", "jyutping": "", "mandarin": "反饋表", "mnemonic": "", "scene": "培訓後收集意見", "enteringTone": false },
            { "word": "improve", "jyutping": "", "mandarin": "改進", "mnemonic": "", "scene": "持續改進培訓", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：首先…，跟住…，最後…（首先…，接著…，最後…）",
              "usage": "培訓中講流程/步驟的標準結構化表達",
              "examples": [
                { "canto": "首先create material master，跟住create PO，最後做goods receipt。", "jyutping": "sau2 sin1 create material master, gan1 zyu6 create PO, zeoi3 hau6 zou6 goods receipt", "mandarin": "首先建立物料主檔，接著建立採購單，最後做收貨。" },
                { "canto": "首先睇下個overview，跟住逐個function demo，最後Q&A。", "jyutping": "sau2 sin1 tai2 haa5 go3 overview, gan1 zyu6 zuk6 go3 function demo, zeoi3 hau6 Q&A", "mandarin": "先看概述，接著逐個功能演示，最後問答。" },
                { "canto": "首先入系統，跟住揀module，最後export個report。", "jyutping": "sau2 sin1 jap6 hai6 tung2, gan1 zyu6 gaan2 module, zeoi3 hau6 export go3 report", "mandarin": "先登入系統，接著選模組，最後匯出報告。" }
              ]
            },
            {
              "name": "句型2：有任何問題隨時___（有任何問題隨時___）",
              "usage": "培訓結束時保持開放溝通渠道",
              "examples": [
                { "canto": "有任何問題隨時email或者WhatsApp我。", "jyutping": "jau5 jam6 ho4 man6 tai4 ceoi4 si4 email waak6 ze2 WhatsApp ngo5", "mandarin": "有任何問題隨時發郵件或WhatsApp給我。" },
                { "canto": "有任何問題隨時搵我。", "jyutping": "jau5 jam6 ho4 man6 tai4 ceoi4 si4 wan2 ngo5", "mandarin": "有任何問題隨時找我。" },
                { "canto": "做嘅時候有咩問題可以直接嚟搵我。", "jyutping": "zou6 ge3 si4 hau6 jau5 me1 man6 tai4 ho2 ji5 zik6 zip3 lai4 wan2 ngo5", "mandarin": "做的時候有什麼問題可以直接來找我。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "內部培訓的「30分鐘法則」",
              "icon": "⏱️",
              "content": "香港辦公室培訓最忌諱「乾講」。30分鐘純講解已經是聽眾注意力的極限。最好的培訓結構是：15分鐘講解 + 15分鐘實操 + 15分鐘Q&A。如果培訓超過1小時，中間一定要break。另外，給同事「實機操作」的時間是最有價值的部分——他們真正需要的是自己動手試。"
            },
            {
              "title": "「好問題」是萬能回應",
              "icon": "👍",
              "content": "培訓時被問到不會回答的問題，先說「好問題！」給自己爭取幾秒鐘思考時間。真的不會就誠實說「呢個我而家冇確實答案，我confirm返再答你」——比亂講一個錯誤答案好一萬倍。同事不會覺得你不行，反而覺得你嚴謹。"
            },
            {
              "title": "Handout的重要性",
              "icon": "📄",
              "content": "香港同事參加培訓，最怕的是講完就忘。一份好的handout（step-by-step guide + screenshots + 常見問題）比培訓本身更有價值。培訓結束時說「handout入面有我嘅contact」，是讓同事覺得「有問題可以找得到人」，大大降低他們的焦慮感。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——培训开场",
              "description": "培訓開始時，以下哪個開場最專業？",
              "scenes": [
                {
                  "scene": "培训开场怎么说",
                  "options": [
                    { "text": "「大家早晨！今日分三個part，預計兩點鐘完成。」", "correct": true },
                    { "text": "「我們開始上課。」", "correct": false, "reason": "應用粤語+太書面" },
                    { "text": "「今天講FICO。」", "correct": false, "reason": "應用粤語+太簡短" }
                  ]
                },
                {
                  "scene": "同事問了一個你不會的問題，最佳回應是？",
                  "options": [
                    { "text": "「好問題！我呢個冇確實答案，confirm返再答你。」", "correct": true },
                    { "text": "「我不會。」", "correct": false, "reason": "太直接，打擊信心" },
                    { "text": "「這個很簡單，你回去查一下。」", "correct": false, "reason": "推卸責任" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下粤语短语补全",
              "items": [
                { "question": "首先...然后...最后 → 首先…___…最後", "answer": "跟住" },
                { "question": "有沒有問題 → 仲有冇___？", "answer": "問題" },
                { "question": "我會發反饋表 → 我會send一個___form", "answer": "feedback" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "今日嘅agenda分三個part，預計兩點鐘左右完成。", "mandarin": "今天的议程分三部分，预计两点左右完成。" },
                { "canto": "首先入MM01 create material master，跟住ME21N create purchase order。", "mandarin": "先输入MM01建物料主档，接着ME21N建采购订单。" },
                { "canto": "有任何問題隨時email或者WhatsApp我。", "mandarin": "有任何问题随时发邮件或WhatsApp给我。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 18, title: '绩效面谈', level: 3, order_index: 6, description: '學習績效面談中的自我評價、談改善和展望未來的粤语', difficulty_label: '⭐⭐⭐',
    content_json: JSON.stringify({
      "course_id": "MO-03-06",
      "title": "绩效面谈",
      "level": 3,
      "order_index": 6,
      "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "半年一次的績效面談（Performance Review），Manager跟你回顧過去半年的表現，並討論未來發展方向。",
          "scenes": [
            {
              "name": "第一幕：开场与回顾",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "Manager", "text": "好，今日同你做個performance review。首先你自己點睇過去半年？", "jyutping": "hou2, gam1 jat6 tung4 nei5 zou6 go3 performance review. sau2 sin1 nei5 zi6 gei2 dim2 tai2 gwo3 heoi3 bun3 nin4?", "mandarin": "好，今天跟你做个绩效评估。首先你自己怎么看过去半年？" },
                { "speaker": "你", "text": "整體我覺得OK。入職之後主要參與咗兩個project：ERP rollout同closing automation。", "jyutping": "zing2 tai2 ngo5 gok3 dak1 OK. jap6 zik1 zi1 hau6 zyu2 jiu3 caam1 jyu5 zo2 loeng5 go3 project: ERP rollout tung4 closing automation.", "mandarin": "整体我觉得OK。入职之后主要参与了两个项目：ERP rollout和closing automation。" },
                { "speaker": "Manager", "text": "你覺得做得最好嘅係邊方面？", "jyutping": "nei5 gok3 dak1 zou6 dak1 zeoi3 hou2 ge3 hai6 bin1 fong1 min6?", "mandarin": "你觉得做得最好的是哪些方面？" },
                { "speaker": "你", "text": "我覺得係ERP個training。由準備material到present，feedback都幾正面。", "jyutping": "ngo5 gok3 dak1 hai6 ERP go3 training. jau4 zeon2 bei6 material dou3 present, feedback dou1 gei2 zing3 min2.", "mandarin": "我觉得是ERP的培训。从准备材料到演示，反馈都挺正面的。" },
                { "speaker": "Manager", "text": "係，training呢part你做得幾好，班同事話你講得好清楚。", "jyutping": "hai6, training ni1 part nei5 zou6 dak1 gei2 hou2, baan1 tung4 si6 waa6 nei5 gong2 dak1 hou2 cing1 co2.", "mandarin": "对，培训这部分你做得不错，同事们说你讲得很清楚。" },
                { "speaker": "你", "text": "多謝張Manager。不過都有啲位我覺得可以做得更好。", "jyutping": "do1 ze6 zoeng1 Manager. bat1 gwo3 dou1 jau5 di1 wai2 ngo5 gok3 dak1 ho2 ji5 zou6 dak1 gang3 hou2.", "mandarin": "谢谢张Manager。不过也有些地方我觉得可以做得更好。" }
              ]
            },
            {
              "name": "第二幕：不足与改进",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "Manager", "text": "你自己覺得有咩可以改善？", "jyutping": "nei5 zi6 gei2 gok3 dak1 jau5 me1 ho2 ji5 goi2 sin6?", "mandarin": "你自己觉得有什么可以改进？" },
                { "speaker": "你", "text": "我覺得跨部門溝通可以再做好啲。有時同IT部傾嘢，我反應唔夠快。", "jyutping": "ngo5 gok3 dak1 kwaa1 bou6 mun4 kau1 tung1 ho2 ji5 zoi3 zou6 hou2 di1. jau5 si4 tung4 IT bou6 king1 je5, ngo5 faan2 jing3 m4 gau3 faai3.", "mandarin": "我觉得跨部门沟通可以再做好点。有时和IT部聊事情，我反应不够快。" },
                { "speaker": "Manager", "text": "明白，呢個係正常嘅——你嚟咗半年，仲係適應期。不過你講得啱，呢個係要改善。你有冇諗過點樣改善？", "jyutping": "ming4 baak6, ni1 go3 hai6 zing3 soeng4 ge3 —— nei5 lai4 zo2 bun3 nin4, zung6 hai6 sik1 jing3 kei4. bat1 gwo3 nei5 gong2 dak1 ngaam1, ni1 go3 hai6 jiu3 goi2 sin6. nei5 jau5 mou5 nam2 gwo3 dim2 joeng2 goi2 sin6?", "mandarin": "明白，这个是正常的——你来了半年，还在适应期。不过你说得对，这个是需要改善。你有想过怎么改善吗？" },
                { "speaker": "你", "text": "我打算下次開會之前，先了解清楚對方部門嘅background，咁樣傾起上嚟會順暢啲。", "jyutping": "ngo5 daa2 syun3 haa6 ci3 hoi1 wui2 zi1 cin4, sin1 liu5 gaai2 cing1 co2 deoi3 fong1 bou6 mun4 ge3 background, gam2 joeng2 king1 hei2 soeng5 lai4 wui5 seon6 coeng3 di1.", "mandarin": "我打算下次开会之前，先了解清楚对方部门的背景，这样聊起来会顺畅些。" },
                { "speaker": "Manager", "text": "好approach！另外，我覺得你technical嘢好快上手，但係presentation skill可以再練多啲。", "jyutping": "hou2 approach! ling6 ngoi6, ngo5 gok3 dak1 nei5 technical je5 hou2 faai3 soeng5 sau2, daan6 hai6 presentation skill ho2 ji5 zoi3 lin6 do1 di1.", "mandarin": "好方法！另外，我觉得你技术方面很快上手，但是演讲技巧可以再多练练。" },
                { "speaker": "你", "text": "我都想提升呢方面。公司有冇presentation training可以參加？", "jyutping": "ngo5 dou1 soeng2 tai4 sing1 ni1 fong1 min6. gung1 si1 jau5 mou5 presentation training ho2 ji5 caam1 gaa1?", "mandarin": "我也想提升这方面。公司有没有演讲培训可以参加？" },
                { "speaker": "Manager", "text": "有，HR有開班，我幫你報名。", "jyutping": "jau5, HR jau5 hoi1 baan1, ngo5 bong1 nei5 bou3 meng2.", "mandarin": "有，HR有开班，我帮你报名。" },
                { "speaker": "你", "text": "好呀，唔該晒！", "jyutping": "hou2 aa3, m4 goi1 saai3!", "mandarin": "好呀，非常感谢！" }
              ]
            },
            {
              "name": "第三幕：展望未来",
              "location": "Manager办公室",
              "lines": [
                { "speaker": "Manager", "text": "講到下一年，你有冇咩目標或者想發展嘅方向？", "jyutping": "gong2 dou3 haa6 jat1 nin4, nei5 jau5 mou5 me1 muk6 biu1 waak6 ze2 soeng2 faat3 zin2 ge3 fong1 hoeng3?", "mandarin": "说到下一年，你有什么目标或者想发展的方向？" },
                { "speaker": "你", "text": "我想下年可以參與多啲project management嘅工作，唔止做execution。", "jyutping": "ngo5 soeng2 haa6 nin2 ho2 ji5 caam1 jyu5 do1 di1 project management ge3 gung1 zok3, m4 zi2 zou6 execution.", "mandarin": "我想明年可以参与更多项目管理工作，不止做执行。" },
                { "speaker": "Manager", "text": "好，我有個suggestion——下季有個新project，不如你試下做assistant project lead？", "jyutping": "hou2, ngo5 jau5 go3 suggestion —— haa6 gwai3 jau5 go3 san1 project, bat1 jyu4 nei5 si3 haa5 zou6 assistant project lead?", "mandarin": "好，我有个建议——下季度有个新项目，不如你试试做助理项目负责人？" },
                { "speaker": "你", "text": "好呀！我好樂意試。", "jyutping": "hou2 aa3! ngo5 hou2 lok6 ji3 si3.", "mandarin": "好呀！我很乐意试。" },
                { "speaker": "Manager", "text": "我會安排你同個project manager一齊做，等你可以學下點manage。", "jyutping": "ngo5 wui5 on1 paai4 nei5 tung4 go3 project manager jat1 cai4 zou6, dang2 nei5 ho2 ji5 hok6 haa5 dim2 manage.", "mandarin": "我会安排你跟项目负责人一起做，让你可以学学怎么管理。" },
                { "speaker": "你", "text": "非常好，呢個機會好難得。我一定會努力。", "jyutping": "fei1 soeng4 hou2, ni1 go3 gei1 wui6 hou2 naan4 dak1. ngo5 jat1 ding6 wui5 nou5 lik6.", "mandarin": "非常好，这个机会很难得。我一定会努力。" },
                { "speaker": "Manager", "text": "好，咁我哋就咁定。半年後再review。", "jyutping": "hou2, gam2 ngo5 dei6 zau6 gam2 ding6. bun3 nin4 hau6 zoi3 review.", "mandarin": "好，那我们就这么定了。半年后再评估。" },
                { "speaker": "你", "text": "好，唔該張Manager！", "jyutping": "hou2, m4 goi1 zoeng1 Manager!", "mandarin": "好，谢谢张Manager！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "績效面談", "jyutping": "zik1 haau6 min6 taam4", "mandarin": "绩效面谈", "mnemonic": "積孝面譚", "scene": "半年/一年一次的review", "enteringTone": true },
            { "word": "performance review", "jyutping": "", "mandarin": "绩效评估", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "改善", "jyutping": "goi2 sin6", "mandarin": "改善/改进", "mnemonic": "改善", "scene": "Manager提改進意見", "enteringTone": false },
            { "word": "目標", "jyutping": "muk6 biu1", "mandarin": "目标", "mnemonic": "木標", "scene": "下年目標", "enteringTone": true },
            { "word": "發展", "jyutping": "faat3 zin2", "mandarin": "发展", "mnemonic": "發剪", "scene": "你想發展嘅方向", "enteringTone": true },
            { "word": "提升", "jyutping": "tai4 sing1", "mandarin": "提升", "mnemonic": "提升", "scene": "提升技能/表現", "enteringTone": false },
            { "word": "機會", "jyutping": "gei1 wui6", "mandarin": "机会", "mnemonic": "給會", "scene": "「呢個機會好難得」", "enteringTone": false },
            { "word": "feedback", "jyutping": "", "mandarin": "回饋/意見", "mnemonic": "", "scene": "直接說英文", "enteringTone": false },
            { "word": "improvement", "jyutping": "", "mandarin": "改進", "mnemonic": "", "scene": "改善空間", "enteringTone": false },
            { "word": "爭取", "jyutping": "zang1 ceoi2", "mandarin": "争取", "mnemonic": "爭取", "scene": "「爭取更多機會」", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：我覺得___，不過___（我覺得___，不過___）",
              "usage": "先肯定再提不足，績效面談的黃金句式——先講自己做得好的，再主動承認可改進的地方",
              "examples": [
                { "canto": "我覺得training做得幾好，不過跨部門溝通可以再做好啲。", "jyutping": "ngo5 gok3 dak1 training zou6 dak1 gei2 hou2, bat1 gwo3 kwaa1 bou6 mun4 kau1 tung1 ho2 ji5 zoi3 zou6 hou2 di1", "mandarin": "我覺得培訓做得不錯，不過跨部門溝通可以再做好一點。" },
                { "canto": "我technical方面OK，不過presentation skill可以再練多啲。", "jyutping": "ngo5 technical fong1 min6 OK, bat1 gwo3 presentation skill ho2 ji5 zoi3 lin6 do1 di1", "mandarin": "我技術方面OK，不過簡報技巧可以再多練。" },
                { "canto": "我準時交到貨，不過planning可以再做細緻啲。", "jyutping": "ngo5 zeon2 si4 gaau1 dou2 fo3, bat1 gwo3 planning ho2 ji5 zoi3 zou6 sai3 zi3 di1", "mandarin": "我準時交付，不過規劃可以再做細緻一點。" }
              ]
            },
            {
              "name": "句型2：我有個suggestion —— ___（我有個建議 —— ___）",
              "usage": "Manager給下屬建議的句式，也是下屬給Manager提建議的句式",
              "examples": [
                { "canto": "我有個suggestion——不如你試下做assistant project lead？", "jyutping": "ngo5 jau5 go3 suggestion —— bat1 jyu4 nei5 si3 haa5 zou6 assistant project lead?", "mandarin": "我有個建議——不如你試試做助理項目負責人？" },
                { "canto": "我有一個suggestion想同你分享。", "jyutping": "ngo5 jau5 jat1 go3 suggestion soeng2 tung4 nei5 fan1 hoeng2", "mandarin": "我有一個建議想跟你分享。" },
                { "canto": "多謝你嘅suggestion，我會認真考慮。", "jyutping": "do1 ze6 nei5 ge3 suggestion, ngo5 wui5 jing2 zan1 haau2 leoi6", "mandarin": "謝謝你的建議，我會認真考慮。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "績效面談的「三明治」結構",
              "icon": "🥪",
              "content": "香港Manager做performance review通常用三明治結構——先讚（「你做得好嘅係…」）→ 再彈（「可以改善嘅係…」）→ 最後鼓勵（「下年嘅機會係…」）。聰明的下屬應該先自己說出不足，這樣Manager就沒必要說太重——你已經自己說了。主動承認不足不是示弱，是顯示你有自我認知（self-awareness）。"
            },
            {
              "title": "「講到人工」的敏感時機",
              "icon": "💰",
              "content": "績效面談可以談人工（加薪/升職），但不要在第一個環節就開口。先聽完Manager對你的評價，再在「展望未來」環節自然帶入。香港職場比較直接，說「我想了解下晉升嘅path」是完全OK的——但前提是你的performance要撐得起這個問題。"
            },
            {
              "title": "「幫你報名」不等於「安排好了」",
              "icon": "📝",
              "content": "Manager說「我幫你報名參加training」，可能是真的會幫你報名，也可能只是當場的客套話。一週後如果沒消息，你可以主動追問「上次講到個presentation training，唔知報咗名未？」——這不是催，是提醒。Manager通常會欣賞你主動跟進。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "选择——绩效面谈自我评价",
              "description": "Manager問你「你自己點睇過去半年？」，最好的回應是？",
              "scenes": [
                {
                  "scene": "自我评价怎么说",
                  "options": [
                    { "text": "「整體OK。ERP training做得好，不過跨部門溝通可以改善。」", "correct": true },
                    { "text": "「都挺好的。」", "correct": false, "reason": "太籠統，無具體例子" },
                    { "text": "「我覺得我做得非常好。」", "correct": false, "reason": "只說好不說不足，顯得沒self-awareness" }
                  ]
                },
                {
                  "scene": "你想提升presentation skill，該怎麼跟Manager說？",
                  "options": [
                    { "text": "「我想提升presentation skill，公司有冇training可以參加？」", "correct": true },
                    { "text": "「我不會做presentation。」", "correct": false, "reason": "太負面" },
                    { "text": "「幫我報個培訓班。」", "correct": false, "reason": "命令口氣" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下粤语短语补全",
              "items": [
                { "question": "我觉得培训做得不错 → 我覺得training做得幾___", "answer": "好" },
                { "question": "有什么可以改善 → 有咩可以___？", "answer": "改善" },
                { "question": "这个机会很难得 → 呢個機會好___", "answer": "難得" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "整體我覺得OK，不過都有啲位我覺得可以做得更好。", "mandarin": "整体我觉得OK，不过也有些地方我觉得可以做得更好。" },
                { "canto": "我有個suggestion——不如你試下做assistant project lead？", "mandarin": "我有个建议——不如你试试做助理项目负责人？" },
                { "canto": "呢個機會好難得，我一定會努力。", "mandarin": "这个机会很难得，我一定会努力。" }
              ]
            }
          ]
        }
      ]
    })
  },
  // L4 courses
  { id: 19, title: '客户拜访寒暄', level: 4, order_index: 1, description: '学习初次拜访客户时的寒暄用语，从公司前台登记到会议室的完整对话', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-04-01",
      "title": "客户拜访寒暄",
      "level": 4, "order_index": 1, "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你跟Manager第一次去拜訪重要客戶——輝煌集團的財務總監陳生，從前台登記到會議室寒暄到正式開場。",
          "scenes": [
            {
              "name": "第一幕：前台登记",
              "location": "輝煌集團 前台",
              "lines": [
                { "speaker": "你", "text": "你好，我哋係越秀集團嘅，約咗陳生三點見面。", "jyutping": "nei5 hou2, ngo5 dei6 hai6 jyut6 sau3 zaap6 tyun4 ge3, joek3 zo2 can4 saang1 saam1 dim2 gin3 min6.", "mandarin": "你好，我们是越秀集团的，和陈先生约了三点见面。" },
                { "speaker": "前台", "text": "請問貴姓？", "jyutping": "cing2 man6 gwai3 sing3?", "mandarin": "请问贵姓？" },
                { "speaker": "你", "text": "我姓林，係財務部嘅。呢位係我哋嘅張經理。", "jyutping": "ngo5 sing3 lam4, hai6 coi4 mou6 bou6 ge3. ni1 wai2 hai6 ngo5 dei6 ge3 zoeng1 ging1 lei5.", "mandarin": "我姓林，是财务部的。这位是我们的张经理。" },
                { "speaker": "前台", "text": "林生、張生，請等一陣，我通知陳生。", "jyutping": "lam4 saang1, zoeng1 saang1, cing2 dang2 jat1 zan6, ngo5 tung1 zi1 can4 saang1.", "mandarin": "林先生、张先生，请稍等，我通知陈先生。" },
                { "speaker": "你", "text": "好嘅，唔該。", "jyutping": "hou2 ge3, m4 goi1.", "mandarin": "好的，谢谢。" }
              ]
            },
            {
              "name": "第二幕：见面寒暄",
              "location": "会议室",
              "lines": [
                { "speaker": "陳生", "text": "（行出嚟）張經理！好耐冇見！", "jyutping": "(haang4 ceot1 lai4) zoeng1 ging1 lei5! hou2 noi6 mou5 gin3!", "mandarin": "（走出来）张经理！好久不见！" },
                { "speaker": "Manager", "text": "陳生，你好！多謝你抽時間出嚟。", "jyutping": "can4 saang1, nei5 hou2! do1 ze6 nei5 cau1 si4 gaan3 ceot1 lai4.", "mandarin": "陈先生，你好！谢谢你抽时间出来。" },
                { "speaker": "陳生", "text": "客氣！呢位係…？", "jyutping": "haak3 hei3! ni1 wai2 hai6...?", "mandarin": "客气！这位是…？" },
                { "speaker": "Manager", "text": "呢位係我哋團隊嘅阿林，負責FICO嘅。", "jyutping": "ni1 wai2 hai6 ngo5 dei6 tyun4 deoi2 ge3 aa3 lam4, fu6 zaak3 FICO ge3.", "mandarin": "这位是我们团队的阿林，负责FICO的。" },
                { "speaker": "你", "text": "陳生你好！我叫阿林，請多多指教。", "jyutping": "can4 saang1 nei5 hou2! ngo5 giu3 aa3 lam4, cing2 do1 do1 zi2 gaau3.", "mandarin": "陈先生你好！我叫阿林，请多多指教。" },
                { "speaker": "陳生", "text": "你好你好！後生有為。入嚟坐，飲唔飲咖啡？", "jyutping": "nei5 hou2 nei5 hou2! hau6 saang1 jau5 wai4. jap6 lai4 co5, jam2 m4 jam2 gaa3 fe1?", "mandarin": "你好你好！年轻有为。进来坐，喝不喝咖啡？" },
                { "speaker": "你", "text": "好呀，唔該晒。", "jyutping": "hou2 aa3, m4 goi1 saai3.", "mandarin": "好的，非常感谢。" },
                { "speaker": "Manager", "text": "（坐低）你哋公司呢排生意幾好喎，睇新聞話攞咗個大project。", "jyutping": "(co5 dai1) nei5 dei6 gung1 si1 ni1 paai4 saang1 ji3 gei2 hou2 wo3, tai2 san1 man2 waa6 lo2 zo2 go3 daai6 project.", "mandarin": "（坐下）你们公司最近生意不错啊，看新闻说拿到了个大项目。" },
                { "speaker": "陳生", "text": "係呀，所以先需要你哋幫手upgrade個system。", "jyutping": "hai6 aa3, so2 ji5 sin1 seoi1 jiu3 nei5 dei6 bong1 sau2 upgrade go3 system.", "mandarin": "是的，所以才需要你们帮忙升级系统。" },
                { "speaker": "Manager", "text": "我哋一定會全力support。", "jyutping": "ngo5 dei6 jat1 ding6 wui5 cyun4 lik6 support.", "mandarin": "我们一定会全力支持。" }
              ]
            },
            {
              "name": "第三幕：切入正题",
              "location": "会议室",
              "lines": [
                { "speaker": "Manager", "text": "好，不如我哋開始傾正題？", "jyutping": "hou2, bat1 jyu4 ngo5 dei6 hoi1 ci2 king1 zing3 tai4?", "mandarin": "好，不如我们开始聊正题？" },
                { "speaker": "陳生", "text": "好，你講。", "jyutping": "hou2, nei5 gong2.", "mandarin": "好，你讲。" },
                { "speaker": "Manager", "text": "首先，我哋了解咗你哋而家嘅system架構，發現有幾個位可以優化…", "jyutping": "sau2 sin1, ngo5 dei6 liu5 gaai2 zo2 nei5 dei6 ji4 gaa1 ge3 system gaa3 kau3, faat3 jin6 jau5 gei2 go3 wai2 ho2 ji5 jau1 faa3...", "mandarin": "首先，我们了解了你们现在的系统架构，发现有几个地方可以优化…" },
                { "speaker": "你", "text": "（補充）係，特別係reporting方面，我睇過你哋嘅current report，有啲data係要人手執，其實可以自動化。", "jyutping": "(bou2 cung1) hai6, dak6 bit6 hai6 reporting fong1 min6, ngo5 tai2 gwo3 nei5 dei6 ge3 current report, jau5 di1 data hai6 jiu3 jan4 sau2 zap1, kei4 sat6 ho2 ji5 zi6 dung6 faa3.", "mandarin": "（补充）是的，特别是报表方面，我看过你们现在的报表，有些数据需要手动处理，其实可以自动化。" },
                { "speaker": "陳生", "text": "哦？有得搞？", "jyutping": "o4? jau5 dak1 gaau2?", "mandarin": "哦？有办法？" },
                { "speaker": "你", "text": "有，我可以demo俾你睇。", "jyutping": "jau5, ngo5 ho2 ji5 demo bei2 nei5 tai2.", "mandarin": "有，我可以演示给你看。" },
                { "speaker": "陳生", "text": "好！不如你而家show俾我睇下？", "jyutping": "hou2! bat1 jyu4 nei5 ji4 gaa1 show bei2 ngo5 tai2 haa5?", "mandarin": "好！不如你现在展示给我看一下？" },
                { "speaker": "你", "text": "冇問題。（準備demo）", "jyutping": "mou5 man6 tai4. (zeon2 bei6 demo)", "mandarin": "没问题。（准备演示）" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "拜訪", "jyutping": "baai3 fong2", "mandarin": "拜访", "mnemonic": "拜访", "scene": "正式客戶會面", "enteringTone": false },
            { "word": "約咗", "jyutping": "joek3 zo2", "mandarin": "约好了", "mnemonic": "约左", "scene": "有預約", "enteringTone": true },
            { "word": "貴姓", "jyutping": "gwai3 sing3", "mandarin": "贵姓", "mnemonic": "贵姓", "scene": "問對方姓氏", "enteringTone": false },
            { "word": "抽時間", "jyutping": "cau1 si4 gaan3", "mandarin": "抽时间", "mnemonic": "抽时间", "scene": "感謝對方撥冗", "enteringTone": false },
            { "word": "後生有為", "jyutping": "hau6 saang1 jau5 wai4", "mandarin": "年轻有为", "mnemonic": "后生有为", "scene": "讚賞對方", "enteringTone": false },
            { "word": "全力support", "jyutping": "cyun4 lik6 support", "mandarin": "全力支持", "mnemonic": "全力支持", "scene": "承諾客戶", "enteringTone": true },
            { "word": "優化", "jyutping": "jau1 faa3", "mandarin": "优化", "mnemonic": "优化", "scene": "改善系统", "enteringTone": false },
            { "word": "自動化", "jyutping": "zi6 dung6 faa3", "mandarin": "自动化", "mnemonic": "自动化", "scene": "提升效率的手段", "enteringTone": false },
            { "word": "demo", "jyutping": "—", "mandarin": "示范/演示", "mnemonic": "演示", "scene": "展示解決方案", "enteringTone": false },
            { "word": "生意", "jyutping": "saang1 ji3", "mandarin": "生意/业务", "mnemonic": "生意", "scene": "客戶的業務狀況", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：多謝你抽時間出嚟（谢谢你抽空出来）",
              "usage": "拜訪客戶時感謝對方撥冗的標準說法",
              "examples": [
                { "canto": "多謝你抽時間出嚟見我哋。", "jyutping": "do1 ze6 nei5 cau1 si4 gaan3 ceot1 lai4 gin3 ngo5 dei6.", "mandarin": "谢谢你抽空出来见我们。" },
                { "canto": "多謝你喺百忙之中抽時間。", "jyutping": "do1 ze6 nei5 hai2 baak3 mong4 zi1 zung1 cau1 si4 gaan3.", "mandarin": "谢谢你在百忙之中抽时间。" },
                { "canto": "麻煩晒你安排今次會面。", "jyutping": "maa4 faan4 saai3 nei5 on1 paai4 gam1 ci3 wui6 min6.", "mandarin": "麻烦你安排这次会面。" }
              ]
            },
            {
              "name": "句型2：我哋了解過___，發現___（我们了解过___，发现___）",
              "usage": "拜訪時展示你做過功課，不是空手上門",
              "examples": [
                { "canto": "我哋了解過你哋嘅system，發現有幾個位可以優化。", "jyutping": "ngo5 dei6 liu5 gaai2 gwo3 nei5 dei6 ge3 system, faat3 jin6 jau5 gei2 go3 wai2 ho2 ji5 jau1 faa3.", "mandarin": "我们了解过你们的系统，发现有几个地方可以优化。" },
                { "canto": "我哋睇過你哋嘅report，發現有啲data要人手執。", "jyutping": "ngo5 dei6 tai2 gwo3 nei5 dei6 ge3 report, faat3 jin6 jau5 di1 data jiu3 jan4 sau2 zap1.", "mandarin": "我们看过你们的报告，发现有些数据要手动处理。" },
                { "canto": "我哋分析過你哋嘅需求，發現可以幫你慳20%成本。", "jyutping": "ngo5 dei6 fan1 sik1 gwo3 nei5 dei6 ge3 seoi1 kau4, faat3 jin6 ho2 ji5 bong1 nei5 haan1 20% sing4 bun2.", "mandarin": "我们分析过你们的需求，发现可以帮你们省20%成本。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "先寒暄再談正事",
              "icon": "💬",
              "content": "香港商業文化中，見客戶的標準流程是：先寒暄5-10分鐘（聊對方公司近況、交通、天氣），等對方說「不如我哋開始傾正題」再切入業務。不要一坐下來就打開電腦開始講——對方會覺得你只關心生意，不關心他本人。寒暄的素材可以在來之前先做功課——看看對方公司的新聞。"
            },
            {
              "title": "「後生有為」的含義",
              "icon": "👔",
              "content": "客戶說你「後生有為」表面是讚賞，實際上也可能在質疑你的經驗。所以回應要既謙虛又自信：「多謝陳生，我會努力學習，希望幫到手。」不要只說「多謝」——要讓客戶放心你雖然年輕但靠譜。"
            },
            {
              "title": "見客的「三人原則」",
              "icon": "👥",
              "content": "香港公司見客戶通常不超過3個人——太多人會讓客戶覺得有壓力。通常的組合是：Manager（主談）+ 你（技術支持）+ 另一同事（記錄）。如果你是技術角色，在Manager主談時不要搶話，但當話題輪到你的專業領域時要自信接話。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——第一次見客戶",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：第一次見客戶，自我介紹時應該怎麼說？",
                  "options": [
                    { "text": "「陳生你好！我叫阿林，請多多指教。」", "correct": true },
                    { "text": "「嗨，我是小林。」", "correct": false, "reason": "太隨意" },
                    { "text": "「你好，我是越秀的。」", "correct": false, "reason": "不夠正式" }
                  ]
                },
                {
                  "scene": "場景B：見客戶坐低之後，以下哪個寒喧話題最合適？",
                  "options": [
                    { "text": "「你哋公司呢排生意幾好喎。」", "correct": true },
                    { "text": "「今天天氣好熱啊。」", "correct": false, "reason": "太淺層" },
                    { "text": "「你們公司有多少人？」", "correct": false, "reason": "太隱私" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "谢谢您抽空出来 → 多謝你___出嚟", "answer": "抽時間" },
                { "question": "我们全力支持 → 我哋會___support", "answer": "全力" },
                { "question": "年轻有为 → 後生___", "answer": "有為" },
                { "question": "优化 → ___", "answer": "優化" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "多謝你抽時間出嚟。", "mandarin": "谢谢你抽空出来。" },
                { "canto": "你好你好！後生有為。", "mandarin": "你好你好！年轻有为。" },
                { "canto": "不如我哋開始傾正題？", "mandarin": "不如我们开始聊正题？" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 20, title: '商务会议主持', level: 4, order_index: 2, description: '学习用粤语主持跨公司项目会议，控制节奏、引导讨论、确保准时结束', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-04-02",
      "title": "商务会议主持",
      "level": 4, "order_index": 2, "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你負責主持一個跨公司項目會議，參與者包括自己公司的Manager、IT同事，以及客戶方的代表。你要控制會議節奏、引導討論、確保會議準時結束。",
          "scenes": [
            {
              "name": "第一幕：开场",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "好，時間差唔多，我哋開始啦。", "jyutping": "hou2, si4 gaan3 caa1 m4 do1, ngo5 dei6 hoi1 ci2 laa1.", "mandarin": "好，时间差不多了，我们开始吧。" },
                { "speaker": "你", "text": "首先好多謝大家今日嚟參加呢個project kick-off meeting。", "jyutping": "sau2 sin1 hou2 do1 ze6 daai6 gaa1 gam1 jat6 lai4 caam1 gaa1 ni1 go3 project kick-off meeting.", "mandarin": "首先非常感谢大家今天来参加这个项目启动会议。" },
                { "speaker": "你", "text": "今日嘅agenda主要有三個part：第一，簡介個project嘅scope；第二，討論milestone同timeline；第三，assign action items。預計需時一個鐘。", "jyutping": "gam1 jat6 ge3 agenda zyu2 jiu3 jau5 saam1 go3 part: dai6 jat1, gaan2 gaai3 go3 project ge3 scope; dai6 ji6, tou2 leon6 milestone tung4 timeline; dai6 saam1, assign action items. jyu6 gai3 seoi1 si4 jat1 go3 zung1.", "mandarin": "今天的议程主要有三部分：第一，简介项目范围；第二，讨论里程碑和时间线；第三，分配待办事项。预计需要一小时。" },
                { "speaker": "Manager", "text": "清楚。", "jyutping": "cing1 co2.", "mandarin": "清楚。" },
                { "speaker": "你", "text": "如果大家冇異議，我哋就入第一part。", "jyutping": "jyu4 gwo2 daai6 gaa1 mou5 ji6 ji5, ngo5 dei6 zau6 jap6 dai6 jat1 part.", "mandarin": "如果大家没有异议，我们就进入第一部分。" }
              ]
            },
            {
              "name": "第二幕：引导讨论",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "好，講到個timeline，我想聽下大家嘅意見。", "jyutping": "hou2, gong2 dou3 go3 timeline, ngo5 soeng2 teng1 haa5 daai6 gaa1 ge3 ji3 gin3.", "mandarin": "好，说到时间线，我想听听大家的意见。" },
                { "speaker": "你", "text": "初步計劃係八個星期完成，你哋覺得得唔得？", "jyutping": "co1 bou6 gai3 waak6 hai6 baat3 go3 sing1 kei4 jyun4 sing4, nei5 dei6 gok3 dak1 dak1 m4 dak1?", "mandarin": "初步计划是八个星期完成，你们觉得行不行？" },
                { "speaker": "客戶", "text": "八個星期有啲tight，我哋內部仲有其他project做緊。", "jyutping": "baat3 go3 sing1 kei4 jau5 di1 tight, ngo5 dei6 noi6 bou6 zung6 jau5 kei4 taa1 project zou6 gan2.", "mandarin": "八个星期有点紧，我们内部还有其他项目在做。" },
                { "speaker": "你", "text": "明白。咁你覺得幾多星期比較合理？", "jyutping": "ming4 baak6. gam2 nei5 gok3 dak1 gei2 do1 sing1 kei4 bei2 gaau3 hap6 lei5?", "mandarin": "明白。那你觉得多少星期比较合理？" },
                { "speaker": "客戶", "text": "十個星期會穩陣啲。", "jyutping": "sap6 go3 sing1 kei4 wui5 wan2 zan6 di1.", "mandarin": "十个星期会稳妥一些。" },
                { "speaker": "你", "text": "十個星期…（睇Manager）張Manager，你點睇？", "jyutping": "sap6 go3 sing1 kei4... (tai2 Manager) zoeng1 Manager, nei5 dim2 tai2?", "mandarin": "十个星期…（看Manager）张经理，你怎么看？" },
                { "speaker": "Manager", "text": "可以接受，但係要確保quality。", "jyutping": "ho2 ji5 zip3 sau6, daan6 hai6 jiu3 kok3 bou2 quality.", "mandarin": "可以接受，但是要确保质量。" },
                { "speaker": "你", "text": "好，咁我哋定十個星期。仲有冇其他人有comment？", "jyutping": "hou2, gam2 ngo5 dei6 ding6 sap6 go3 sing1 kei4. zung6 jau5 mou5 kei4 taa1 jan4 jau5 comment?", "mandarin": "好，那我们定十个星期。还有没有其他人有意见？" },
                { "speaker": "你", "text": "（等幾秒）冇嘅話我哋入下一個item。", "jyutping": "(dang2 gei2 miu5) mou5 ge3 waa6 ngo5 dei6 jap6 haa6 jat1 go3 item.", "mandarin": "（等几秒）没有的话我们进入下一个议题。" }
              ]
            },
            {
              "name": "第三幕：总结与收尾",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "好，今日傾咗好多嘢。我簡單總結下action items：", "jyutping": "hou2, gam1 jat6 king1 zo2 hou2 do1 je5. ngo5 gaan2 daan1 zung2 git3 haa6 action items:", "mandarin": "好，今天聊了很多。我简单总结下待办事项：" },
                { "speaker": "你", "text": "第一，阿Ken負責做technical assessment，下星期五前交；", "jyutping": "dai6 jat1, aa3 Ken fu6 zaak3 zou6 technical assessment, haa6 sing1 kei4 ng5 cin4 gaau1;", "mandarin": "第一，阿Ken负责做技术评估，下周五前交；" },
                { "speaker": "你", "text": "第二，客戶方面提供data sample，同樣下星期五前；", "jyutping": "dai6 ji6, haak3 wu6 fong1 min6 tai4 gung1 data sample, tung4 joeng6 haa6 sing1 kei4 ng5 cin4;", "mandarin": "第二，客户方面提供数据样本，同样下周五前；" },
                { "speaker": "你", "text": "第三，我會出返個meeting minutes，聽日send俾大家。", "jyutping": "dai6 saam1, ngo5 wui5 ceot1 faan1 go3 meeting minutes, ting1 jat6 send bei2 daai6 gaa1.", "mandarin": "第三，我会出一份会议记录，明天发给大家。" },
                { "speaker": "你", "text": "如有任何問題，隨時email我。", "jyutping": "jyu4 jau5 jam6 ho4 man6 tai4, ceoi4 si4 email ngo5.", "mandarin": "如果有任何问题，随时发邮件给我。" },
                { "speaker": "你", "text": "今日唔該晒大家，散會！", "jyutping": "gam1 jat6 m4 goi1 saai3 daai6 gaa1, saan3 wui2!", "mandarin": "今天非常感谢大家，散会！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "主持", "jyutping": "zyu2 ci4", "mandarin": "主持", "mnemonic": "主词", "scene": "主持会议", "enteringTone": false },
            { "word": "agenda", "jyutping": "—", "mandarin": "议程", "mnemonic": "议程", "scene": "会议日程", "enteringTone": false },
            { "word": "scope", "jyutping": "—", "mandarin": "范围", "mnemonic": "范围", "scene": "项目范围", "enteringTone": false },
            { "word": "milestone", "jyutping": "—", "mandarin": "里程碑", "mnemonic": "里程碑", "scene": "项目节点", "enteringTone": false },
            { "word": "action item", "jyutping": "—", "mandarin": "待办事项", "mnemonic": "待办", "scene": "会议待办", "enteringTone": false },
            { "word": "meeting minutes", "jyutping": "—", "mandarin": "会议记录", "mnemonic": "会议记录", "scene": "会议纪要", "enteringTone": false },
            { "word": "異議", "jyutping": "ji6 ji5", "mandarin": "异议", "mnemonic": "义异", "scene": "反对意见", "enteringTone": true },
            { "word": "總結", "jyutping": "zung2 git3", "mandarin": "总结", "mnemonic": "总洁", "scene": "归纳要点", "enteringTone": true },
            { "word": "散會", "jyutping": "saan3 wui2", "mandarin": "散会", "mnemonic": "散会", "scene": "会议结束", "enteringTone": false },
            { "word": "準時", "jyutping": "zeon2 si4", "mandarin": "准时", "mnemonic": "准时", "scene": "按时", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：今日傾咗好多嘢，我簡單總結下（今天聊了很多，我简单总结一下）",
              "usage": "會議結束前總結的標準過渡句",
              "examples": [
                { "canto": "今日傾咗好多嘢，我簡單總結下action items。", "jyutping": "gam1 jat6 king1 zo2 hou2 do1 je5, ngo5 gaan2 daan1 zung2 git3 haa6 action items.", "mandarin": "今天聊了很多，我简单总结一下待办事项。" },
                { "canto": "等我recap下今日嘅主要決定。", "jyutping": "dang2 ngo5 recap haa5 gam1 jat6 ge3 zyu2 jiu3 kyut3 ding6.", "mandarin": "让我回顾一下今天的主要决定。" },
                { "canto": "我哋快速總結三個key takeaways。", "jyutping": "ngo5 dei6 faai3 cuk1 zung2 git3 saam1 go3 key takeaways.", "mandarin": "我们快速总结三个关键收获。" }
              ]
            },
            {
              "name": "句型2：如果大家冇異議，我哋就___（如果大家没有异议，我们就___）",
              "usage": "主持人推動議程的標準說法，給與會者最後發言機會",
              "examples": [
                { "canto": "如果大家冇異議，我哋就入下一個item。", "jyutping": "jyu4 gwo2 daai6 gaa1 mou5 ji6 ji5, ngo5 dei6 zau6 jap6 haa6 jat1 go3 item.", "mandarin": "如果大家没有异议，我们就进入下一项。" },
                { "canto": "如果冇其他comment，就咁決定。", "jyutping": "jyu4 gwo2 mou5 kei4 taa1 comment, zau6 gam2 kyut3 ding6.", "mandarin": "如果没有其他意见，就这么决定。" },
                { "canto": "大家agree嘅話，我哋就proceed。", "jyutping": "daai6 gaa1 agree ge3 waa6, ngo5 dei6 zau6 proceed.", "mandarin": "大家同意的话，我们就继续。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "主持會議的「3-3-3法則」",
              "icon": "⏱️",
              "content": "一個專業的會議主持應該做到——3分鐘內完成開場（agenda+時間），每30分鐘提醒一次時間，結束前3分鐘做總結。超時是主持人的責任，不是與會者的問題。如果會議要超時，必須問「我哋overrun少少，大家得唔得閒？」——大家說「得」才能繼續。"
            },
            {
              "title": "「等幾秒」的藝術",
              "icon": "⏸️",
              "content": "對話中主持人問「仲有冇其他人有comment？」之後，要停頓至少3-5秒。香港人通常不會搶著發言，沉默的3秒是給大家思考的時間。如果你不等就跳過，有人之後會說「我剛想講你就跳過了」。等這幾秒顯得很專業。"
            },
            {
              "title": "Meeting minutes的潛規則",
              "icon": "📝",
              "content": "出meeting minutes的人掌握話語權——因為會議上說了什麼，最終以minutes為準。所以minutes要寫清楚decisions、action items、owner、deadline。發送時說「請大家check下有冇遺漏」，意思是「有錯現在說，以後就按這個來」。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——会议主持",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：會議時間到了，應該怎麼開場？",
                  "options": [
                    { "text": "「時間差唔多，我哋開始啦。」", "correct": true },
                    { "text": "「喂，开会了。」", "correct": false, "reason": "太随意" },
                    { "text": "「我们开始吧。」", "correct": false, "reason": "不应使用普通话" }
                  ]
                },
                {
                  "scene": "場景B：客戶說八個星期太緊，你該怎麼回應？",
                  "options": [
                    { "text": "「明白。咁你覺得幾多星期比較合理？」", "correct": true },
                    { "text": "「不行，就八个星期。」", "correct": false, "reason": "太强硬" },
                    { "text": "「那就算了吧。」", "correct": false, "reason": "消极放弃" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "总结 → 粵語：___", "answer": "總結" },
                { "question": "异议 → 粵語：___", "answer": "異議" },
                { "question": "散会 → 粵語：___", "answer": "散會" },
                { "question": "准时 → 粵語：___", "answer": "準時" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "如果大家冇異議，我哋就入第一part。", "mandarin": "如果大家没有异议，我们就进入第一部分。" },
                { "canto": "今日唔該晒大家，散會！", "mandarin": "今天非常感谢大家，散会！" },
                { "canto": "我會出返個meeting minutes，聽日send俾大家。", "mandarin": "我会出一份会议记录，明天发给大家。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 21, title: '合同条款讨论', level: 4, order_index: 3, description: '学习逐条讨论合同条款的粤语：价格谈判、付款条件、违约责任', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-04-03",
      "title": "合同条款讨论",
      "level": 4, "order_index": 3, "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你跟Manager和客戶方開會，逐條討論合同條款。價格、付款條件、違約責任——每一項都要小心斟酌。",
          "scenes": [
            {
              "name": "第一幕：讨论价格",
              "location": "会议室",
              "lines": [
                { "speaker": "客戶", "text": "你哋個報價我哋睇過，整體OK，但係價格方面有啲硬。", "jyutping": "nei5 dei6 go3 bou3 gaa3 ngo5 dei6 tai2 gwo3, zing2 tai2 OK, daan6 hai6 gaa3 gaak3 fong1 min6 jau5 di1 ngaang6.", "mandarin": "你们的报价我们看过了，整体OK，但是价格方面有点硬。" },
                { "speaker": "Manager", "text": "你覺得邊個位有問題？", "jyutping": "nei5 gok3 dak1 bin1 go3 wai2 jau5 man6 tai4?", "mandarin": "你觉得哪个位置有问题？" },
                { "speaker": "客戶", "text": "個implementation fee，可唔可以傾？", "jyutping": "go3 implementation fee, ho2 m4 ho2 ji5 king1?", "mandarin": "实施费用，可不可以谈？" },
                { "speaker": "Manager", "text": "呢個價錢係跟返market rate，而且我哋包埋一年support。", "jyutping": "ni1 go3 gaa3 cin4 hai6 gan1 faan2 market rate, ji4 ce2 ngo5 dei6 baau1 maai4 jat1 nin4 support.", "mandarin": "这个价格是参照市场价的，而且我们包了一年的支持。" },
                { "speaker": "客戶", "text": "如果我自己搞support，可唔可以扣返個support cost？", "jyutping": "jyu4 gwo2 ngo5 zi6 gei2 gaau2 support, ho2 m4 ho2 ji5 kau3 faan1 go3 support cost?", "mandarin": "如果我自己负责支持，可不可以扣掉支持费用？" },
                { "speaker": "Manager", "text": "都可以考慮。你心目中想減幾多？", "jyutping": "dou1 ho2 ji5 haau2 leoi6. nei5 sam1 muk6 zung1 soeng2 gaam2 gei2 do1?", "mandarin": "也可以考虑。你心目中想减多少？" },
                { "speaker": "客戶", "text": "減15%。", "jyutping": "gaam2 sap6 ng5 %.", "mandarin": "减15%。" },
                { "speaker": "Manager", "text": "15%有啲多。不如咁，減10%，但係我哋唔包on-site support，只包remote。", "jyutping": "15% jau5 di1 do1. bat1 jyu4 gam2, gaam2 10%, daan6 hai6 ngo5 dei6 m4 baau1 on-site support, zi2 baau1 remote.", "mandarin": "15%有点多。不如这样，减10%，但是我们不包含现场支持，只包含远程。" },
                { "speaker": "客戶", "text": "10%… 好，就咁定。", "jyutping": "10%... hou2, zau6 gam2 ding6.", "mandarin": "10%… 好，就这么定。" },
                { "speaker": "你", "text": "（記低）明白，implementation fee減10%，support改做remote only。", "jyutping": "(gei3 dai1) ming4 baak6, implementation fee gaam2 10%, support goi2 zou6 remote only.", "mandarin": "（记下来）明白，实施费用减10%，支持改为仅远程。" }
              ]
            },
            {
              "name": "第二幕：付款条款",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "跟住傾payment terms。我哋建議分三期：30% upfront，40%喺milestone完成之後，30%喺go-live。", "jyutping": "gan1 zyu6 king1 payment terms. ngo5 dei6 gin3 ji5 fan1 saam1 kei4: 30% upfront, 40% hai2 milestone jyun4 sing4 zi1 hau6, 30% hai2 go-live.", "mandarin": "接着谈付款条款。我们建议分三期：30%预付，40%在里程碑完成之后，30%在上线时。" },
                { "speaker": "客戶", "text": "upfront 30%有啲高。可唔可以做20%？", "jyutping": "upfront 30% jau5 di1 gou1. ho2 m4 ho2 ji5 zou6 20%?", "mandarin": "预付30%有点高。可不可以做20%？" },
                { "speaker": "Manager", "text": "20%都OK，但係第二期要加到50%。", "jyutping": "20% dou1 OK, daan6 hai6 dai6 ji6 kei4 jiu3 gaa1 dou3 50%.", "mandarin": "20%也行，但是第二期要加到50%。" },
                { "speaker": "客戶", "text": "即係20% upfront，50%中期，30%尾數？", "jyutping": "zik1 hai6 20% upfront, 50% zung1 kei4, 30% mei5 sou3?", "mandarin": "就是20%预付，50%中期，30%尾款？" },
                { "speaker": "Manager", "text": "啱。", "jyutping": "ngaam1.", "mandarin": "对。" },
                { "speaker": "客戶", "text": "好，呢個可以接受。", "jyutping": "hou2, ni1 go3 ho2 ji5 zip3 sau6.", "mandarin": "好，这个可以接受。" }
              ]
            },
            {
              "name": "第三幕：违约责任",
              "location": "会议室",
              "lines": [
                { "speaker": "客戶", "text": "仲有一個concern——如果delay咗，你哋有冇penalty？", "jyutping": "zung6 jau5 jat1 go3 concern——jyu4 gwo2 delay zo2, nei5 dei6 jau5 mou5 penalty?", "mandarin": "还有一个顾虑——如果延期了，你们有没有罚款？" },
                { "speaker": "Manager", "text": "一般我哋唔包penalty clause，但我哋會包一個liquidated damages條款。如果delay超過兩星期，每日賠0.1%個contract value。", "jyutping": "jat1 bun1 ngo5 dei6 m4 baau1 penalty clause, daan6 ngo5 dei6 wui5 baau1 jat1 go3 liquidated damages tiu4 fun2. jyu4 gwo2 delay ciu1 gwo3 loeng5 sing1 kei4, mui5 jat6 pui4 0.1% go3 contract value.", "mandarin": "一般我们不包含罚款条款，但我们会包一个预定赔偿金条款。如果延期超过两周，每天赔0.1%合同金额。" },
                { "speaker": "客戶", "text": "0.1%太少，0.3%啦。", "jyutping": "0.1% taai3 siu2, 0.3% laa1.", "mandarin": "0.1%太少，0.3%吧。" },
                { "speaker": "Manager", "text": "0.3%… 你等陣，我問下legal先。（打電話）OK，legal話0.2%可以接受。", "jyutping": "0.3%... nei5 dang2 zan6, ngo5 man6 haa5 legal sin1. (daa2 din6 waa2) OK, legal waa6 0.2% ho2 ji5 zip3 sau6.", "mandarin": "0.3%… 你等下，我先问下法务。（打电话）OK，法务说0.2%可以接受。" },
                { "speaker": "客戶", "text": "好，0.2%就0.2%。攞個agreement出嚟簽啦。", "jyutping": "hou2, 0.2% zau6 0.2%. lo2 go3 agreement ceot1 lai4 cim1 laa1.", "mandarin": "好，0.2%就0.2%。把协议拿出来签吧。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "條款", "jyutping": "tiu4 fun2", "mandarin": "条款", "mnemonic": "条款", "scene": "合同条款", "enteringTone": false },
            { "word": "報價", "jyutping": "bou3 gaa3", "mandarin": "报价", "mnemonic": "报价", "scene": "价格方案", "enteringTone": false },
            { "word": "傾", "jyutping": "king1", "mandarin": "讨论/谈", "mnemonic": "倾", "scene": "谈判讨论", "enteringTone": false },
            { "word": "upfront", "jyutping": "—", "mandarin": "预付款", "mnemonic": "预付款", "scene": "首期付款", "enteringTone": false },
            { "word": "milestone", "jyutping": "—", "mandarin": "里程碑付款", "mnemonic": "里程碑", "scene": "分期付款节点", "enteringTone": false },
            { "word": "penalty", "jyutping": "—", "mandarin": "罚款/违约金", "mnemonic": "罚款", "scene": "违约处罚", "enteringTone": false },
            { "word": "support", "jyutping": "—", "mandarin": "支援", "mnemonic": "支持", "scene": "售后服务", "enteringTone": false },
            { "word": "簽約", "jyutping": "cim1 joek3", "mandarin": "签约", "mnemonic": "签约", "scene": "签署合同", "enteringTone": true },
            { "word": "賠", "jyutping": "pui4", "mandarin": "赔偿", "mnemonic": "赔", "scene": "赔付", "enteringTone": false },
            { "word": "legal", "jyutping": "—", "mandarin": "法务", "mnemonic": "法务", "scene": "法律部门", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：可唔可以___？（可不可以___？）— 談判中的讓步探討",
              "usage": "談判中試探對方可否讓步的句式，比直接說「我要減價」更專業",
              "examples": [
                { "canto": "可唔可以減15%？", "jyutping": "ho2 m4 ho2 ji5 gaam2 sap6 ng5 %?", "mandarin": "可不可以减15%？" },
                { "canto": "可唔可以做20% upfront？", "jyutping": "ho2 m4 ho2 ji5 zou6 20% upfront?", "mandarin": "可不可以20%预付？" },
                { "canto": "可唔可以改做remote only？", "jyutping": "ho2 m4 ho2 ji5 goi2 zou6 remote only?", "mandarin": "可不可以改成仅限远程？" }
              ]
            },
            {
              "name": "句型2：不如咁，___，但係___（不如这样，___，但是___）",
              "usage": "提出折中方案的經典談判句式——先讓步再提條件",
              "examples": [
                { "canto": "不如咁，減10%，但係唔包on-site support。", "jyutping": "bat1 jyu4 gam2, gaam2 10%, daan6 hai6 m4 baau1 on-site support.", "mandarin": "不如这样，减10%，但不含现场支持。" },
                { "canto": "不如咁，20% upfront，但係中期加到50%。", "jyutping": "bat1 jyu4 gam2, 20% upfront, daan6 hai6 zung1 kei4 gaa1 dou3 50%.", "mandarin": "不如这样，20%预付，但中期加到50%。" },
                { "canto": "不如咁，我哋包training，但係travel cost你哋俾。", "jyutping": "bat1 jyu4 gam2, ngo5 dei6 baau1 training, daan6 hai6 travel cost nei5 dei6 bei2.", "mandarin": "不如这样，我们包培训，但差旅费你们出。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "「傾」字是談判的核心",
              "icon": "💬",
              "content": "香港商業談判說「傾」而不是「談」或「negotiate」。「傾下個價」「傾下條款」「傾唔傾得掂」——一個「傾」字包含了來回討論、互相讓步、最終達成共識的整個過程。說「我哋傾下先」＝我們先聊聊看，不一定要馬上定下來，給雙方留了餘地。"
            },
            {
              "title": "「等我問下legal先」的戰術",
              "icon": "⏳",
              "content": "談判中Manager說「等我問下legal先」不一定是真的要去問法務——這是一種經典的拖延戰術，給自己爭取思考時間，同時讓對方覺得「你在認真對待他的要求」。如果你自己主持談判，也可以說「呢個條件我要返去研究下」——永遠不要在會議上當場答應重要條款。"
            },
            {
              "title": "書面合約 vs 口頭承諾",
              "icon": "📄",
              "content": "香港商業文化中，口頭承諾有一定分量（尤其是在老一輩商人之間），但最終還是以書面合約為準。會議上說了「好，就咁定」，回去還是要出一個written confirmation（書面確認）給對方簽。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——合同谈判",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：客戶說價格有點硬，你該怎麼回應？",
                  "options": [
                    { "text": "「可唔可以減15%？」", "correct": true },
                    { "text": "「我们就不减。」", "correct": false, "reason": "不应使用普通话" },
                    { "text": "「你说多少钱？」", "correct": false, "reason": "太直接" }
                  ]
                },
                {
                  "scene": "場景B：需要提出一個折中方案，該怎麼說？",
                  "options": [
                    { "text": "「不如咁，減10%，但係唔包on-site。」", "correct": true },
                    { "text": "「那减10%吧。」", "correct": false, "reason": "没用折中句式" },
                    { "text": "「不行，就这样。」", "correct": false, "reason": "太强硬" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "条款 → 粵語：___", "answer": "條款" },
                { "question": "讨论/谈 → 粵語：___", "answer": "傾" },
                { "question": "法务 → 粵語：___", "answer": "legal" },
                { "question": "签约 → 粵語：___", "answer": "簽約" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "可唔可以減15%？", "mandarin": "可不可以减15%？" },
                { "canto": "不如咁，減10%，但係唔包on-site support。", "mandarin": "不如这样，减10%，但不包含现场支持。" },
                { "canto": "好，就咁定。", "mandarin": "好，就这么定。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 22, title: '项目交付沟通', level: 4, order_index: 4, description: '学习ERP项目交付阶段的粤语：UAT briefing、处理客户问题、sign-off', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-04-04",
      "title": "项目交付沟通",
      "level": 4, "order_index": 4, "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "ERP項目到了交付階段，你要跟客戶做UAT（User Acceptance Testing）的briefing，然後處理客戶在測試中發現的問題。",
          "scenes": [
            {
              "name": "第一幕：UAT briefing",
              "location": "客户会议室",
              "lines": [
                { "speaker": "你", "text": "陳生，今日開始做UAT，我先簡單講下個流程。", "jyutping": "can4 saang1, gam1 jat6 hoi1 ci2 zou6 UAT, ngo5 sin1 gaan2 daan1 gong2 haa5 go3 lau4 cing4.", "mandarin": "陈先生，今天开始做UAT，我先简单讲一下流程。" },
                { "speaker": "陳生", "text": "好，你講。", "jyutping": "hou2, nei5 gong2.", "mandarin": "好，你讲。" },
                { "speaker": "你", "text": "我哋準備咗十個test scenarios，cover晒主要嘅business processes。你哋嘅同事會跟住test script逐個做，有問題就record喺呢個log。", "jyutping": "ngo5 dei6 zeon2 bei6 zo2 sap6 go3 test scenarios, cover saai3 zyu2 jiu3 ge3 business processes. nei5 dei6 ge3 tung4 si6 wui5 gan1 zyu6 test script zuk6 go3 zou6, jau5 man6 tai4 zau6 record hai2 ni1 go3 log.", "mandarin": "我们准备了十个测试场景，覆盖了所有主要的业务流程。你们的同事会按照测试脚本逐个做，有问题就记录在这个日志里。" },
                { "speaker": "陳生", "text": "如果遇到urgent嘅issue呢？", "jyutping": "jyu4 gwo2 jyu6 dou2 urgent ge3 issue ne1?", "mandarin": "如果遇到紧急的问题呢？" },
                { "speaker": "你", "text": "urgent嘅可以直接搵我，或者喺group chat出聲。我哋會喺24小時內respond。", "jyutping": "urgent ge3 ho2 ji5 zik6 zip3 wan2 ngo5, waak6 ze2 hai2 group chat ceot1 seng1. ngo5 dei6 wui5 hai2 24 siu2 si4 noi6 respond.", "mandarin": "紧急的可以直接找我，或者在群聊里说。我们会在24小时内回应。" },
                { "speaker": "陳生", "text": "好，清楚。", "jyutping": "hou2, cing1 co2.", "mandarin": "好，清楚。" }
              ]
            },
            {
              "name": "第二幕：处理客户问题",
              "location": "电话沟通",
              "lines": [
                { "speaker": "你", "text": "（電話響）喂陳生。", "jyutping": "(din6 waa2 hoeng2) wai2 can4 saang1.", "mandarin": "（电话响）喂陈先生。" },
                { "speaker": "陳生", "text": "阿林，我哋run咗幾個scenario，發現個PO approval flow唔啱。", "jyutping": "aa3 lam4, ngo5 dei6 run zo2 gei2 go3 scenario, faat3 jin6 go3 PO approval flow m4 ngaam1.", "mandarin": "阿林，我们跑了几个场景，发现采购订单审批流程不对。" },
                { "speaker": "你", "text": "唔啱？可唔可以specific啲講下係咩問題？", "jyutping": "m4 ngaam1? ho2 m4 ho2 ji5 specific di1 gong2 haa5 hai6 me1 man6 tai4?", "mandarin": "不对？可不可以具体说一下是什么问题？" },
                { "speaker": "陳生", "text": "正常應該係$10,000以上要GM approve，但system set咗$5,000。", "jyutping": "zing3 soeng4 jing1 goi1 hai6 $10,000 ji5 soeng6 jiu3 GM approve, daan6 system set zo2 $5,000.", "mandarin": "正常应该是$10,000以上要总经理批准，但系统设成了$5,000。" },
                { "speaker": "你", "text": "哦，明白。呢個係configuration嘅問題，我即刻改。", "jyutping": "o4, ming4 baak6. ni1 go3 hai6 configuration ge3 man6 tai4, ngo5 zik1 haak1 goi2.", "mandarin": "哦，明白。这个是配置的问题，我马上改。" },
                { "speaker": "陳生", "text": "要改幾耐？", "jyutping": "jiu3 goi2 gei2 noi6?", "mandarin": "要改多久？" },
                { "speaker": "你", "text": "半個鐘搞掂，改完再call你試多次。", "jyutping": "bun3 go3 zung1 gaau2 dim6, goi2 jyun4 zoi3 call nei5 si3 do1 ci3.", "mandarin": "半小时搞定，改完再打给你试一次。" },
                { "speaker": "陳生", "text": "好，我等你。", "jyutping": "hou2, ngo5 dang2 nei5.", "mandarin": "好，我等你。" },
                { "speaker": "你", "text": "（半小時後）陳生，改好咗，你試多次得唔得？", "jyutping": "(bun3 siu2 si4 hau6) can4 saang1, goi2 hou2 zo2, nei5 si3 do1 ci3 dak1 m4 dak1?", "mandarin": "（半小时后）陈先生，改好了，你再试一次行不行？" },
                { "speaker": "陳生", "text": "（試）得咗！今次啱啦。唔該晒！", "jyutping": "(si3) dak1 zo2! gam1 ci3 ngaam1 laa1. m4 goi1 saai3!", "mandarin": "（试）行了！这次对了。非常感谢！" },
                { "speaker": "你", "text": "唔客氣！仲有冇其他問題？", "jyutping": "m4 haak3 hei3! zung6 jau5 mou5 kei4 taa1 man6 tai4?", "mandarin": "不客气！还有没有其他问题？" }
              ]
            },
            {
              "name": "第三幕：sign-off",
              "location": "客户办公室",
              "lines": [
                { "speaker": "你", "text": "陳生，UAT完成咗，十個scenarios九個pass，一個minor issue fix咗。你可唔可以幫手簽個UAT sign-off？", "jyutping": "can4 saang1, UAT jyun4 sing4 zo2, sap6 go3 scenarios gau2 go3 pass, jat1 go3 minor issue fix zo2. nei5 ho2 m4 ho2 ji5 bong1 sau2 cim1 go3 UAT sign-off?", "mandarin": "陈先生，UAT完成了，十个场景九个通过，一个小问题已修复。你可不可以帮忙签个UAT验收确认？" },
                { "speaker": "陳生", "text": "（睇report）冇問題，全部都test過晒。簽邊度？", "jyutping": "(tai2 report) mou5 man6 tai4, cyun4 bou6 dou1 test gwo3 saai3. cim1 bin1 dou6?", "mandarin": "（看报告）没问题，全部都测试过了。签哪里？" },
                { "speaker": "你", "text": "呢度，簽名就得。", "jyutping": "ni1 dou6, cim1 meng2 zau6 dak1.", "mandarin": "这里，签名就行。" },
                { "speaker": "陳生", "text": "（簽名）好，搞掂。", "jyutping": "(cim1 meng2) hou2, gaau2 dim6.", "mandarin": "（签名）好，搞定。" },
                { "speaker": "你", "text": "多謝陳生！我哋聽日開始做go-live preparation。多謝你呢段時間嘅配合。", "jyutping": "do1 ze6 can4 saang1! ngo5 dei6 ting1 jat6 hoi1 ci2 zou6 go-live preparation. do1 ze6 nei5 ni1 dyun6 si4 gaan3 ge3 pui3 hap6.", "mandarin": "谢谢陈先生！我们明天开始做上线准备。谢谢你这段时间的配合。" },
                { "speaker": "陳生", "text": "客氣！你哋做得好好，好專業。", "jyutping": "haak3 hei3! nei5 dei6 zou6 dak1 hou2 hou2, hou2 zyun1 jip6.", "mandarin": "客气！你们做得很好，很专业。" },
                { "speaker": "你", "text": "多謝讚賞！", "jyutping": "do1 ze6 zaan3 soeng2!", "mandarin": "谢谢赞赏！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "交付", "jyutping": "gaau1 fu3", "mandarin": "交付", "mnemonic": "交付", "scene": "项目交付", "enteringTone": false },
            { "word": "UAT", "jyutping": "—", "mandarin": "用户验收测试", "mnemonic": "验收测试", "scene": "验收阶段", "enteringTone": false },
            { "word": "test scenario", "jyutping": "—", "mandarin": "测试场景", "mnemonic": "测试场景", "scene": "测试用例", "enteringTone": false },
            { "word": "issue", "jyutping": "—", "mandarin": "问题", "mnemonic": "问题", "scene": "测试发现的问题", "enteringTone": false },
            { "word": "urgent", "jyutping": "—", "mandarin": "紧急", "mnemonic": "紧急", "scene": "紧急问题", "enteringTone": false },
            { "word": "respond", "jyutping": "—", "mandarin": "回应", "mnemonic": "回应", "scene": "24小时内回应", "enteringTone": false },
            { "word": "configuration", "jyutping": "—", "mandarin": "配置", "mnemonic": "配置", "scene": "系统配置", "enteringTone": false },
            { "word": "sign-off", "jyutping": "—", "mandarin": "签收确认", "mnemonic": "签收", "scene": "验收签字", "enteringTone": false },
            { "word": "go-live", "jyutping": "—", "mandarin": "上线", "mnemonic": "上线", "scene": "系统上线", "enteringTone": false },
            { "word": "專業", "jyutping": "zyun1 jip6", "mandarin": "专业", "mnemonic": "专业", "scene": "最高赞赏", "enteringTone": true }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：可唔可以specific啲講下？（可不可以具体说一下？）",
              "usage": "客戶反饋問題模糊時，引導對方給出具體信息",
              "examples": [
                { "canto": "可唔可以specific啲講下係咩問題？", "jyutping": "ho2 m4 ho2 ji5 specific di1 gong2 haa5 hai6 me1 man6 tai4?", "mandarin": "可不可以具体说一下是什么问题？" },
                { "canto": "可唔可以snapshot俾我睇下？", "jyutping": "ho2 m4 ho2 ji5 snapshot bei2 ngo5 tai2 haa5?", "mandarin": "可不可以截图给我看一下？" },
                { "canto": "你喺邊個screen見到個error？", "jyutping": "nei5 hai2 bin1 go3 screen gin3 dou2 go3 error?", "mandarin": "你在哪个画面看到错误？" }
              ]
            },
            {
              "name": "句型2：多謝你呢段時間嘅配合（谢谢你这段时间的配合）",
              "usage": "項目交付結束時感謝客戶的標準用語",
              "examples": [
                { "canto": "多謝你呢段時間嘅配合，項目先順利完成。", "jyutping": "do1 ze6 nei5 ni1 dyun6 si4 gaan3 ge3 pui3 hap6, hong6 muk6 sin1 seon6 lei6 jyun4 sing4.", "mandarin": "谢谢你这段时间的配合，项目才顺利完成。" },
                { "canto": "多謝你嘅support，UAT先搞得咁快。", "jyutping": "do1 ze6 nei5 ge3 support, UAT sin1 gaau2 dak1 gam3 faai3.", "mandarin": "谢谢你的支持，UAT才搞得这么快。" },
                { "canto": "多謝你嘅feedback，幫我哋improve咗個system。", "jyutping": "do1 ze6 nei5 ge3 feedback, bong1 ngo5 dei6 improve zo2 go3 system.", "mandarin": "谢谢你的反馈，帮助了我们改善系统。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "UAT的「24小時回應」承諾",
              "icon": "⏰",
              "content": "香港IT項目交付中，說「24小時內respond」意思是24小時內會回應你——不是24小時內解決。客戶明白respond和fix是兩回事。但如果超過24小時不回應，客戶就會escalate。所以項目交付期間要每天check郵件和訊息，週末也不例外。"
            },
            {
              "title": "Sign-off的儀式感",
              "icon": "✍️",
              "content": "UAT sign-off是項目交付的關鍵節點——簽了sign-off代表客戶正式確認系統沒問題。所以簽之前一定要確保所有critical issue都fix了。minor issue可以留到post-go-live再fix，但必須在sign-off文件上列明「known issues」。"
            },
            {
              "title": "「好專業」是最高的讚賞",
              "icon": "🌟",
              "content": "香港客戶說你「做得好專業」不是客套——這是他能給出的最高讚賞之一。香港商業文化中，「專業」（professional）意味著：準時、準備充分、溝通清晰、有問題主動解決。聽到這句話，說明你在客戶心目中建立了可信賴的形象。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——项目交付",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：客戶反饋問題但不夠具體，該怎麼回應？",
                  "options": [
                    { "text": "「可唔可以specific啲講下係咩問題？」", "correct": true },
                    { "text": "「你说什么？」", "correct": false, "reason": "不礼貌" },
                    { "text": "「我不明白。」", "correct": false, "reason": "太被动" }
                  ]
                },
                {
                  "scene": "場景B：項目交付結束時，該對客戶說什麼？",
                  "options": [
                    { "text": "「多謝你呢段時間嘅配合。」", "correct": true },
                    { "text": "「再见。」", "correct": false, "reason": "太随意" },
                    { "text": "「谢谢你。」", "correct": false, "reason": "不够正式，应用粤语" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "用户验收测试 → ___", "answer": "UAT" },
                { "question": "签收确认 → ___", "answer": "sign-off" },
                { "question": "回应 → ___", "answer": "respond" },
                { "question": "上线 → ___", "answer": "go-live" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "可唔可以specific啲講下係咩問題？", "mandarin": "可不可以具体说一下是什么问题？" },
                { "canto": "多謝你呢段時間嘅配合。", "mandarin": "谢谢你这段时间的配合。" },
                { "canto": "半個鐘搞掂，改完再call你試多次。", "mandarin": "半小时搞定，改完再打给你试一次。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 23, title: '投诉处理', level: 4, order_index: 5, description: '学习处理客户投诉的粤语：先安抚情绪再解决问题，跟进闭环', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-04-05",
      "title": "投诉处理",
      "level": 4, "order_index": 5, "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "客戶對系統延遲上線和支援質量不滿，打電話來投訴。你要先安撫客戶情緒，再解決問題，最後跟進閉環。",
          "scenes": [
            {
              "name": "第一幕：接投诉",
              "location": "电话",
              "lines": [
                { "speaker": "客戶", "text": "喂，我係輝煌集團嘅陳生。我想投訴！", "jyutping": "wai2, ngo5 hai6 fai1 wong4 zaap6 tyun4 ge3 can4 saang1. ngo5 soeng2 tau4 sou3!", "mandarin": "喂，我是辉煌集团的陈先生。我要投诉！" },
                { "speaker": "你", "text": "陳生你好，有咩事慢慢講。", "jyutping": "can4 saang1 nei5 hou2, jau5 me1 si6 maan6 maan6 gong2.", "mandarin": "陈先生你好，有什么事慢慢说。" },
                { "speaker": "客戶", "text": "你哋個system尋日又down咗！我成個team做唔到嘢！", "jyutping": "nei5 dei6 go3 system cam4 jat6 jau6 down zo2! ngo5 seng4 go3 team zou6 m4 dou2 je5!", "mandarin": "你们系统昨天又宕机了！我整个团队没法工作！" },
                { "speaker": "你", "text": "唔好意思陳生，搞到咁唔方便。你講多次個情況？", "jyutping": "m4 hou2 ji3 si1 can4 saang1, gaau2 dou3 gam3 m4 fong1 bin6. nei5 gong2 do1 ci3 go3 cing4 fong3?", "mandarin": "不好意思陈先生，造成这么不方便。你再说一下情况？" },
                { "speaker": "客戶", "text": "尋日下晝三點開始，成個system login唔到，到而家都未fix好！", "jyutping": "cam4 jat6 haa6 zau3 saam1 dim2 hoi1 ci2, seng4 go3 system login m4 dou2, dou3 ji4 gaa1 dou1 mei6 fix hou2!", "mandarin": "昨天下午三点开始，整个系统登录不了，到现在都还没修好！" },
                { "speaker": "你", "text": "明白。我即刻check下個incident log，好快覆你。", "jyutping": "ming4 baak6. ngo5 zik1 haak1 check haa5 go3 incident log, hou2 faai3 fuk1 nei5.", "mandarin": "明白。我马上查一下事故日志，很快回复你。" }
              ]
            },
            {
              "name": "第二幕：安抚与解决",
              "location": "电话",
              "lines": [
                { "speaker": "你", "text": "（check完）陳生，我check咗。係尋日有個scheduled maintenance出咗問題，搞到system hang咗。我哋已經fix好咗，而家system恢復正常。", "jyutping": "(check jyun4) can4 saang1, ngo5 check zo2. hai6 cam4 jat6 jau5 go3 scheduled maintenance ceot1 zo2 man6 tai4, gaau2 dou3 system hang zo2. ngo5 dei6 ji5 ging1 fix hou2 zo2, ji4 gaa1 system fui1 fuk6 zing3 soeng4.", "mandarin": "（查完）陈先生，我查了。是昨天有个计划维护出了问题，导致系统卡住了。我们已经修好了，现在系统恢复正常。" },
                { "speaker": "客戶", "text": "點解scheduled maintenance我哋唔知嘅？", "jyutping": "dim2 gaai2 scheduled maintenance ngo5 dei6 m4 zi1 ge3?", "mandarin": "为什么计划维护我们不知道？" },
                { "speaker": "你", "text": "呢個係我哋嘅疏忽，應該提早通知你。真係好對唔住。", "jyutping": "ni1 go3 hai6 ngo5 dei6 ge3 syu1 fat1, jing1 goi1 tai4 zou2 tung1 zi1 nei5. zan1 hai6 hou2 deoi3 m4 zyu6.", "mandarin": "这个是我们疏忽了，应该提早通知你。真的很对不起。" },
                { "speaker": "客戶", "text": "下次唔可以再發生！我啲同事俾你哋累到OT。", "jyutping": "haa6 ci3 m4 ho2 ji5 zoi3 faat3 sang1! ngo5 di1 tung4 si6 bei2 nei5 dei6 leoi6 dou3 OT.", "mandarin": "下次不能再发生！我的同事被你们害得加班。" },
                { "speaker": "你", "text": "明白，我保證以後所有maintenance會最少提前三日通知你。另外，為咗補償今次嘅不便，我哋會俾多一個月free support。", "jyutping": "ming4 baak6, ngo5 bou2 zing3 ji5 hau6 so2 jau5 maintenance wui5 zeoi3 siu2 tai4 cin4 saam1 jat6 tung1 zi1 nei5. ling6 ngoi6, wai6 zo2 bou2 soeng4 gam1 ci3 ge3 bat1 bin6, ngo5 dei6 wui5 bei2 do1 jat1 go3 jyut6 free support.", "mandarin": "明白，我保证以后所有维护会最少提前三天通知你。另外，为了补偿这次的不便，我们会多给一个月免费支持。" },
                { "speaker": "客戶", "text": "（語氣緩和）咁都OK。但係真係唔好有下次。", "jyutping": "(jyu5 hei3 wun6 wo4) gam2 dou1 OK. daan6 hai6 zan1 hai6 m4 hou2 jau5 haa6 ci3.", "mandarin": "（语气缓和）那也行。但是真的不要有下次。" },
                { "speaker": "你", "text": "一定。我會出返個email詳細講返今次嘅incident同補償安排。", "jyutping": "jat1 ding6. ngo5 wui5 ceot1 faan1 go3 email coeng4 sai3 gong2 faan1 gam1 ci3 ge3 incident tung4 bou2 soeng4 on1 paai4.", "mandarin": "一定。我会出一封邮件详细说明这次的事故和补偿安排。" }
              ]
            },
            {
              "name": "第三幕：跟进闭环",
              "location": "办公室",
              "lines": [
                { "speaker": "你", "text": "（send email後打俾Manager匯報）張Manager，輝煌嘅投訴我處理咗。", "jyutping": "(send email hau6 daa2 bei2 Manager wui6 bou3) zoeng1 Manager, fai1 wong4 ge3 tau4 sou3 ngo5 cyu2 lei5 zo2.", "mandarin": "（发完邮件后打电话给经理汇报）张经理，辉煌的投诉我处理了。" },
                { "speaker": "Manager", "text": "點樣？", "jyutping": "dim2 joeng2?", "mandarin": "怎么样？" },
                { "speaker": "你", "text": "首先道歉，解釋咗原因，然後承諾以後maintenance提前三日通知，最後俾多一個月free support作為補償。", "jyutping": "sau2 sin1 dou6 hip3, gaai2 sik1 zo2 jyun4 jan1, jin4 hau6 sing4 nok6 ji5 hau6 maintenance tai4 cin4 saam1 jat6 tung1 zi1, zeoi3 hau6 bei2 do1 jat1 go3 jyut6 free support zok3 wai4 bou2 soeng4.", "mandarin": "首先道歉，解释了原因，然后承诺以后维护提前三天通知，最后多给一个月免费支持作为补偿。" },
                { "speaker": "Manager", "text": "做得好。客戶而家點？", "jyutping": "zou6 dak1 hou2. haak3 wu6 ji4 gaa1 dim2?", "mandarin": "做得好。客户现在怎么样？" },
                { "speaker": "你", "text": "語氣好返好多，話OK。", "jyutping": "jyu5 hei3 hou2 faan1 hou2 do1, waa6 OK.", "mandarin": "语气好多了，说OK。" },
                { "speaker": "Manager", "text": "好，你出返個incident report，CC俾我。", "jyutping": "hou2, nei5 ceot1 faan1 go3 incident report, CC bei2 ngo5.", "mandarin": "好，你出一份事故报告，抄送给我。" },
                { "speaker": "你", "text": "已經準備緊，聽日send出。", "jyutping": "ji5 ging1 zeon2 bei6 gan2, ting1 jat6 send ceot1.", "mandarin": "已经在准备了，明天发出去。" },
                { "speaker": "Manager", "text": "做得好，keep住。", "jyutping": "zou6 dak1 hou2, keep zyu6.", "mandarin": "做得好，保持。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "投訴", "jyutping": "tau4 sou3", "mandarin": "投诉", "mnemonic": "投诉", "scene": "客户投诉", "enteringTone": false },
            { "word": "唔好意思", "jyutping": "m4 hou2 ji3 si1", "mandarin": "不好意思", "mnemonic": "不好意思", "scene": "道歉开场", "enteringTone": false },
            { "word": "對唔住", "jyutping": "deoi3 m4 zyu6", "mandarin": "对不起", "mnemonic": "对不起", "scene": "正式道歉", "enteringTone": false },
            { "word": "incident", "jyutping": "—", "mandarin": "事故", "mnemonic": "事故", "scene": "事件记录", "enteringTone": false },
            { "word": "scheduled maintenance", "jyutping": "—", "mandarin": "计划维护", "mnemonic": "计划维护", "scene": "计划中的维护", "enteringTone": false },
            { "word": "恢復", "jyutping": "fui1 fuk6", "mandarin": "恢复", "mnemonic": "恢复", "scene": "恢复正常", "enteringTone": true },
            { "word": "補償", "jyutping": "bou2 soeng4", "mandarin": "补偿", "mnemonic": "补偿", "scene": "补偿方案", "enteringTone": false },
            { "word": "保證", "jyutping": "bou2 zing3", "mandarin": "保证", "mnemonic": "保证", "scene": "承诺", "enteringTone": false },
            { "word": "incident report", "jyutping": "—", "mandarin": "事故报告", "mnemonic": "事故报告", "scene": "事故书面记录", "enteringTone": false },
            { "word": "跟進", "jyutping": "gan1 zeon3", "mandarin": "跟进", "mnemonic": "跟进", "scene": "持续跟进", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：唔好意思，搞到咁唔方便（不好意思，造成这么不方便）",
              "usage": "投訴處理第一步——先道歉再問細節，不要急著解釋原因",
              "examples": [
                { "canto": "唔好意思，搞到咁唔方便。你講多次個情況？", "jyutping": "m4 hou2 ji3 si1, gaau2 dou3 gam3 m4 fong1 bin6. nei5 gong2 do1 ci3 go3 cing4 fong3?", "mandarin": "不好意思，造成这么不方便。你再说一下情况？" },
                { "canto": "真係唔好意思，呢個係我哋嘅疏忽。", "jyutping": "zan1 hai6 m4 hou2 ji3 si1, ni1 go3 hai6 ngo5 dei6 ge3 syu1 fat1.", "mandarin": "真的很抱歉，这是我们的疏忽。" },
                { "canto": "唔好意思令到你哋OT。", "jyutping": "m4 hou2 ji3 si1 ling6 dou3 nei5 dei6 OT.", "mandarin": "抱歉让你们加班了。" }
              ]
            },
            {
              "name": "句型2：為咗補償今次嘅不便，我哋會___（为了补偿这次的不便，我们会___）",
              "usage": "提出補償方案時，先說明原因再給方案，讓客戶感受到誠意",
              "examples": [
                { "canto": "為咗補償今次嘅不便，我哋會俾多一個月free support。", "jyutping": "wai6 zo2 bou2 soeng4 gam1 ci3 ge3 bat1 bin6, ngo5 dei6 wui5 bei2 do1 jat1 go3 jyut6 free support.", "mandarin": "为了补偿这次的不便，我们会多给一个月免费支持。" },
                { "canto": "為咗補償，我哋會waive今個月嘅service fee。", "jyutping": "wai6 zo2 bou2 soeng4, ngo5 dei6 wui5 waive gam1 go3 jyut6 ge3 service fee.", "mandarin": "为了补偿，我们会免除这个月的服务费。" },
                { "canto": "為咗表示歉意，我哋會安排一次免費training。", "jyutping": "wai6 zo2 biu2 si6 hin3 ji3, ngo5 dei6 wui5 on1 paai4 jat1 ci3 min5 fai3 training.", "mandarin": "为了表示歉意，我们会安排一次免费培训。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "投訴處理的「先心情後事情」法則",
              "icon": "💙",
              "content": "客戶打電話來投訴時，他正在氣頭上——這個時候跟他講道理是沒用的。先處理情緒（「唔好意思」「搞到咁唔方便」），等他語氣緩和了再處理事情（「我check下個log」）。對話中客戶從「我要投訴！」到「咁都OK」的轉變，就是因為你先道歉再解決。"
            },
            {
              "title": "補償的「三倍法則」",
              "icon": "💰",
              "content": "香港商業中，補償通常要是對方損失的3倍才有誠意。如果客戶因為系統down機損失了半天工作，你給半天free support是不夠的——至少要給一個月。補償太小氣不如不給，反而讓客戶覺得你不重視。"
            },
            {
              "title": "「CC俾我」的含義",
              "icon": "📧",
              "content": "Manager叫你出incident report「CC俾我」，意思是Manager需要知道這件事的書面記錄，以便將來如果客戶再投訴到更高層，Manager有據可查。出incident report時要客觀記錄：發生時間、影響範圍、根因、解決方案、補償措施、改進計劃。不要寫主觀判斷——只寫事實。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——处理投诉",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：客戶氣沖沖打電話投訴，第一句該說什麼？",
                  "options": [
                    { "text": "「唔好意思，搞到咁唔方便。你講多次個情況？」", "correct": true },
                    { "text": "「你说什么？」", "correct": false, "reason": "不礼貌" },
                    { "text": "「这不是我们的问题。」", "correct": false, "reason": "推卸责任" }
                  ]
                },
                {
                  "scene": "場景B：需要提出補償方案，該怎麼說？",
                  "options": [
                    { "text": "「為咗補償今次嘅不便，我哋會俾多一個月free support。」", "correct": true },
                    { "text": "「我们给你一个道歉。」", "correct": false, "reason": "不够诚意" },
                    { "text": "「就这样吧，下次注意。」", "correct": false, "reason": "态度敷衍" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "投诉 → 粵語：___", "answer": "投訴" },
                { "question": "对不起 → 粵語：___", "answer": "對唔住" },
                { "question": "事故报告 → ___", "answer": "incident report" },
                { "question": "恢复正常 → ___", "answer": "恢復" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "唔好意思，搞到咁唔方便。", "mandarin": "不好意思，造成这么不方便。" },
                { "canto": "為咗補償今次嘅不便，我哋會俾多一個月free support。", "mandarin": "为了补偿这次的不便，我们会多给一个月免费支持。" },
                { "canto": "我保證以後唔會再發生。", "mandarin": "我保证以后不会再发生。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 24, title: '商务宴请', level: 4, order_index: 6, description: '学习项目成功后的商务宴请全流程粤语：订位、点菜、敬酒到埋单', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-04-06",
      "title": "商务宴请",
      "level": 4, "order_index": 6, "duration_minutes": 22,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "項目成功go-live，你同Manager請客戶陳生食飯慶祝——從訂位、點菜、敬酒到埋單的全流程。",
          "scenes": [
            {
              "name": "第一幕：订位与迎客",
              "location": "办公室 → 餐厅",
              "lines": [
                { "speaker": "Manager", "text": "阿林，今晚同陳生食飯，你幫手book定枱。", "jyutping": "aa3 lam4, gam1 maan5 tung4 can4 saang1 sik6 faan6, nei5 bong1 sau2 book ding6 toi2.", "mandarin": "阿林，今晚和陈先生吃饭，你帮忙订好桌子。" },
                { "speaker": "你", "text": "好，幾多位？食咩菜？", "jyutping": "hou2, gei2 do1 wai2? sik6 me1 coi3?", "mandarin": "好，几位？吃什么菜？" },
                { "speaker": "Manager", "text": "四位，陳生中意食日本嘢，book間好少少嘅。", "jyutping": "sei3 wai2, can4 saang1 zung1 ji3 sik6 jat6 bun2 je5, book gaan1 hou2 siu2 siu2 ge3.", "mandarin": "四位，陈先生喜欢吃日料，订间好一点的。" },
                { "speaker": "你", "text": "（打電話）喂，你好，我想book位，四位，今晚七點。係商務宴請，要間房，唔該。", "jyutping": "(daa2 din6 waa2) wai2, nei5 hou2, ngo5 soeng2 book wai2, sei3 wai2, gam1 maan5 cat1 dim2. hai6 soeng1 mou6 jin3 cing2, jiu3 gaan1 fong2, m4 goi1.", "mandarin": "（打电话）喂，你好，我想订位，四位，今晚七点。是商务宴请，要个包间，谢谢。" },
                { "speaker": "餐廳", "text": "好的，請問貴姓？", "jyutping": "hou2 dik1, cing2 man6 gwai3 sing3?", "mandarin": "好的，请问贵姓？" },
                { "speaker": "你", "text": "我姓林，越秀集團嘅。麻煩留間安靜啲嘅房。", "jyutping": "ngo5 sing3 lam4, jyut6 sau3 zaap6 tyun4 ge3. maa4 faan4 lau4 gaan1 on1 zing6 di1 ge3 fong2.", "mandarin": "我姓林，越秀集团的。麻烦留间安静点的房间。" },
                { "speaker": "你", "text": "（晚上）陳生，歡迎歡迎！請入坐。", "jyutping": "(maan5 soeng6) can4 saang1, fun1 jing4 fun1 jing4! cing2 jap6 co5.", "mandarin": "（晚上）陈先生，欢迎欢迎！请入座。" },
                { "speaker": "陳生", "text": "嘩，呢間餐廳好靚喎。", "jyutping": "waa1, ni1 gaan1 caan1 teng1 hou2 leng3 wo3.", "mandarin": "哇，这家餐厅好漂亮啊。" },
                { "speaker": "Manager", "text": "你鍾意食日本嘢嘛，特登揀嘅。", "jyutping": "nei5 zung1 ji3 sik6 jat6 bun2 je5 maa3, dak6 dang1 gaan2 ge3.", "mandarin": "你喜欢吃日料嘛，特意选的。" },
                { "speaker": "陳生", "text": "有心有心！", "jyutping": "jau5 sam1 jau5 sam1!", "mandarin": "有心了有心了！" }
              ]
            },
            {
              "name": "第二幕：点菜与敬酒",
              "location": "餐厅包间",
              "lines": [
                { "speaker": "你", "text": "陳生，你睇下想食啲咩？佢哋嘅sashimi好出名。", "jyutping": "can4 saang1, nei5 tai2 haa5 soeng2 sik6 di1 me1? keoi5 dei6 ge3 sashimi hou2 ceot1 meng2.", "mandarin": "陈先生，你看看想吃些什么？他们的生鱼片很有名。" },
                { "speaker": "陳生", "text": "你哋話事啦，我乜都食。", "jyutping": "nei5 dei6 waa6 si6 laa1, ngo5 mat1 dou1 sik6.", "mandarin": "你们做主吧，我什么都吃。" },
                { "speaker": "Manager", "text": "不如叫個omakase，等師傅發辦？", "jyutping": "bat1 jyu4 giu3 go3 omakase, dang2 si1 fu2 faat3 baan2?", "mandarin": "不如叫个主厨推荐，让师傅拿主意？" },
                { "speaker": "陳生", "text": "好呀，最鍾意omakase，有驚喜。", "jyutping": "hou2 aa3, zeoi3 zung1 ji3 omakase, jau5 geng1 hei2.", "mandarin": "好呀，最喜欢主厨推荐，有惊喜。" },
                { "speaker": "你", "text": "（對侍應）唔該，四個omakase。飲唔飲清酒？", "jyutping": "(deoi3 si6 jing3) m4 goi1, sei3 go3 omakase. jam2 m4 jam2 cing1 zau2?", "mandarin": "（对服务员）麻烦，四个主厨推荐。喝不喝清酒？" },
                { "speaker": "陳生", "text": "好喎，難得高興。", "jyutping": "hou2 wo3, naan4 dak1 gou1 hing3.", "mandarin": "好啊，难得高兴。" },
                { "speaker": "你", "text": "（倒酒）嚟，我敬陳生一杯。多謝你呢段時間嘅信任同支持。第日有任何問題，隨時搵我。", "jyutping": "(dou2 zau2) lai4, ngo5 ging3 can4 saang1 jat1 bui1. do1 ze6 nei5 ni1 dyun6 si4 gaan3 ge3 seon3 jam6 tung4 zi1 ci4. dai6 jat6 jau5 jam6 ho4 man6 tai4, ceoi4 si4 wan2 ngo5.", "mandarin": "（倒酒）来，我敬陈先生一杯。谢谢你这段时间的信任和支持。以后有任何问题，随时找我。" },
                { "speaker": "陳生", "text": "客氣！你哋團隊做得好好，我好滿意。", "jyutping": "haak3 hei3! nei5 dei6 tyun4 deoi2 zou6 dak1 hou2 hou2, ngo5 hou2 mun5 ji3.", "mandarin": "客气！你们团队做得很好，我很满意。" },
                { "speaker": "Manager", "text": "大家合作愉快！飲杯！", "jyutping": "daai6 gaa1 hap6 zok3 jyu4 faai3! jam2 bui1!", "mandarin": "大家合作愉快！干杯！" },
                { "speaker": "你", "text": "飲杯！", "jyutping": "jam2 bui1!", "mandarin": "干杯！" }
              ]
            },
            {
              "name": "第三幕：埋单",
              "location": "餐厅",
              "lines": [
                { "speaker": "你", "text": "（示意侍應）唔該埋單。", "jyutping": "(si6 ji3 si6 jing3) m4 goi1 maai4 daan1.", "mandarin": "（示意服务员）麻烦结账。" },
                { "speaker": "陳生", "text": "等我嚟啦！", "jyutping": "dang2 ngo5 lai4 laa1!", "mandarin": "让我来吧！" },
                { "speaker": "Manager", "text": "唔得唔得，今日我哋請。你俾咗咁多生意我哋做，應該嘅。", "jyutping": "m4 dak1 m4 dak1, gam1 jat6 ngo5 dei6 ceng2. nei5 bei2 zo2 gam3 do1 saang1 ji3 ngo5 dei6 zou6, jing1 goi1 ge3.", "mandarin": "不行不行，今天我们请。你给了这么多生意我们做，应该的。" },
                { "speaker": "陳生", "text": "太客氣了。", "jyutping": "taai3 haak3 hei3 liu5.", "mandarin": "太客气了。" },
                { "speaker": "Manager", "text": "（俾卡）唔該。", "jyutping": "(bei2 kaat1) m4 goi1.", "mandarin": "（给卡）谢谢。" },
                { "speaker": "你", "text": "（對陳生）陳生，我已經叫咗車送你返去。", "jyutping": "(deoi3 can4 saang1) can4 saang1, ngo5 ji5 ging1 giu3 zo2 ce1 sung3 nei5 faan1 heoi3.", "mandarin": "（对陈先生）陈先生，我已经叫了车送你回去。" },
                { "speaker": "陳生", "text": "嘩，咁周到！唔該晒。", "jyutping": "waa1, gam3 zau1 dou3! m4 goi1 saai3.", "mandarin": "哇，这么周到！非常感谢。" },
                { "speaker": "你", "text": "應該嘅。開心今晚大家都盡興！", "jyutping": "jing1 goi1 ge3. hoi1 sam1 gam1 maan5 daai6 gaa1 dou1 zeon6 hing3!", "mandarin": "应该的。开心今晚大家都尽兴！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "宴請", "jyutping": "jin3 cing2", "mandarin": "宴请", "mnemonic": "宴请", "scene": "商务宴请", "enteringTone": false },
            { "word": "book位", "jyutping": "book wai2", "mandarin": "订位", "mnemonic": "book位", "scene": "预订座位", "enteringTone": false },
            { "word": "商務", "jyutping": "soeng1 mou6", "mandarin": "商务", "mnemonic": "商务", "scene": "商务场合", "enteringTone": false },
            { "word": "omakase", "jyutping": "—", "mandarin": "厨师发办", "mnemonic": "主厨推荐", "scene": "日料点餐方式", "enteringTone": false },
            { "word": "敬酒", "jyutping": "ging3 zau2", "mandarin": "敬酒", "mnemonic": "敬酒", "scene": "向对方敬酒", "enteringTone": false },
            { "word": "飲杯", "jyutping": "jam2 bui1", "mandarin": "干杯", "mnemonic": "饮杯", "scene": "举杯庆祝", "enteringTone": false },
            { "word": "埋單", "jyutping": "maai4 daan1", "mandarin": "结账", "mnemonic": "埋单", "scene": "付钱", "enteringTone": false },
            { "word": "客氣", "jyutping": "haak3 hei3", "mandarin": "客气", "mnemonic": "客气", "scene": "客套话", "enteringTone": true },
            { "word": "周到", "jyutping": "zau1 dou3", "mandarin": "周到", "mnemonic": "周到", "scene": "考虑周全", "enteringTone": false },
            { "word": "盡興", "jyutping": "zeon6 hing3", "mandarin": "尽兴", "mnemonic": "尽兴", "scene": "尽兴而归", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：嚟，我敬___一杯。多謝___（来，我敬___一杯。谢谢___）",
              "usage": "商務宴請敬酒的標準句式——先舉杯再說感謝的具體內容",
              "examples": [
                { "canto": "嚟，我敬陳生一杯。多謝你呢段時間嘅信任。", "jyutping": "lai4, ngo5 ging3 can4 saang1 jat1 bui1. do1 ze6 nei5 ni1 dyun6 si4 gaan3 ge3 seon3 jam6.", "mandarin": "来，我敬陈先生一杯。谢谢你这段时间的信任。" },
                { "canto": "嚟，大家飲杯！多謝大家嘅努力。", "jyutping": "lai4, daai6 gaa1 jam2 bui1! do1 ze6 daai6 gaa1 ge3 nou5 lik6.", "mandarin": "来，大家干杯！谢谢大家的努力。" },
                { "canto": "呢杯敬你，多謝你嘅support。", "jyutping": "ni1 bui1 ging3 nei5, do1 ze6 nei5 ge3 support.", "mandarin": "这杯敬你，谢谢你的支持。" }
              ]
            },
            {
              "name": "句型2：應該嘅（应该的）",
              "usage": "別人感謝你時的回應——既謙虛又得體，比「唔客氣」更有分量",
              "examples": [
                { "canto": "（陳生說「咁周到」）應該嘅。", "jyutping": "jing1 goi1 ge3.", "mandarin": "应该的。" },
                { "canto": "應該嘅，開心大家都盡興。", "jyutping": "jing1 goi1 ge3, hoi1 sam1 daai6 gaa1 dou1 zeon6 hing3.", "mandarin": "应该的，开心今晚大家都尽兴。" },
                { "canto": "應該嘅，呢個係我份內事。", "jyutping": "jing1 goi1 ge3, ni1 go3 hai6 ngo5 fan6 noi6 si6.", "mandarin": "应该的，这是我份内的事。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "商務宴請的「誰埋單」潛規則",
              "icon": "💳",
              "content": "香港商務飯局，誰發起誰埋單——這是鐵則。你請客戶吃飯，當然是你付錢。如果客戶說「等我嚟啦」，你要說「唔得唔得，今日我哋請」——但不用推讓超過三次，香港沒有內地那種「搶著埋單」的文化。一句「應該嘅」然後直接俾卡就行。"
            },
            {
              "title": "敬酒的「順序」",
              "icon": "🍶",
              "content": "商務飯局敬酒有約定俗成的順序——先敬客戶方最重要的人（陳生），再敬自己方的Manager，最後敬其他人。敬酒時要雙手捧杯，杯沿略低於對方。如果自己唔飲酒，可以以茶代酒，說「我以茶代酒敬你」——香港人接受度很高。"
            },
            {
              "title": "叫車送客是最後一環",
              "icon": "🚗",
              "content": "商務宴請結束時，幫客戶叫車送他回家是標準做法——不是必需要做，但做了會大大加分，顯得你「周到」。對話中你說「我已經叫咗車送你返去」是最後一個加分項。不用跟著上車，送到車門邊說「路上小心」就完成了整個商務宴請的閉環。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——商务宴请",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：敬酒時最得體的說法是？",
                  "options": [
                    { "text": "「嚟，我敬陳生一杯。多謝你呢段時間嘅信任同支持。」", "correct": true },
                    { "text": "「来，干杯！」", "correct": false, "reason": "太随意" },
                    { "text": "「喝酒喝酒。」", "correct": false, "reason": "缺乏感谢内容" }
                  ]
                },
                {
                  "scene": "場景B：客戶說要埋單，你該怎麼回應？",
                  "options": [
                    { "text": "「唔得唔得，今日我哋請。應該嘅。」", "correct": true },
                    { "text": "「好吧，那你来。」", "correct": false, "reason": "不该让客户出钱" },
                    { "text": "「不用不用。」", "correct": false, "reason": "不应说普通话" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "订位 → ___", "answer": "book位" },
                { "question": "敬酒 → 粵語：___", "answer": "敬酒" },
                { "question": "结账 → 粵語：___", "answer": "埋單" },
                { "question": "干杯 → 粵語：___", "answer": "飲杯" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "嚟，我敬陳生一杯。多謝你呢段時間嘅信任同支持。", "mandarin": "来，我敬陈先生一杯。谢谢你这段时间的信任和支持。" },
                { "canto": "唔得唔得，今日我哋請。應該嘅。", "mandarin": "不行不行，今天我们请。应该的。" },
                { "canto": "開心今晚大家都盡興！", "mandarin": "开心今晚大家都尽兴！" }
              ]
            }
          ]
        }
      ]
    })
  },
  // L5 courses
  { id: 25, title: '粤语财务术语', level: 5, order_index: 1, description: '学习用粤语向CFO汇报季度财务数据：营收、利润、现金流、审计准备', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-05-01",
      "title": "粤语财务术语",
      "level": 5, "order_index": 1, "duration_minutes": 28,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你要跟香港CFO用粵語匯報季度財務數據，這是你第一次做正式的財務匯報。",
          "scenes": [
            {
              "name": "第一幕：数据汇报",
              "location": "CFO办公室",
              "lines": [
                { "speaker": "你", "text": "CFO早晨！今日主要同你匯報Q2嘅performance。", "jyutping": "CFO zou2 san4! gam1 jat6 zyu2 jiu3 tung4 nei5 wui6 bou3 Q2 ge3 performance.", "mandarin": "CFO早上好！今天主要跟你汇报Q2的业绩。" },
                { "speaker": "CFO", "text": "好，講重點。", "jyutping": "hou2, gong2 zung6 dim2.", "mandarin": "好，讲重点。" },
                { "speaker": "你", "text": "整體嚟講，Q2 revenue係$850萬，對比Q1增長咗12%。", "jyutping": "zing2 tai2 lai4 gong2, Q2 revenue hai6 $850 maan6, deoi3 bei2 Q1 zang1 zoeng2 zo2 12%.", "mandarin": "总体来说，Q2营收是850万，对比Q1增长了12%。" },
                { "speaker": "CFO", "text": "增長主要來自邊度？", "jyutping": "zang1 zoeng2 zyu2 jiu3 loi4 zi6 bin1 dou6?", "mandarin": "增长主要来自哪里？" },
                { "speaker": "你", "text": "主要係ERP project嘅收入，同埋新簽咗三個大客。", "jyutping": "zyu2 jiu3 hai6 ERP project ge3 sau1 jap6, tung4 maai4 san1 cim1 zo2 saam1 go3 daai6 haak3.", "mandarin": "主要是ERP项目的收入，以及新签了三个大客户。" },
                { "speaker": "CFO", "text": "gross margin呢？", "jyutping": "gross margin ne1?", "mandarin": "毛利率呢？" },
                { "speaker": "你", "text": "Gross margin 48%，比Q1高咗兩個百分點。因為cost控制做得唔錯。", "jyutping": "Gross margin 48%, bei2 Q1 gou1 zo2 loeng5 go3 baak3 fan6 dim2. jan1 wai6 cost hung3 zai3 zou6 dak1 m4 co3.", "mandarin": "毛利率48%，比Q1高了两个百分点。因为成本控制做得不错。" },
                { "speaker": "CFO", "text": "好。咁profit方面？", "jyutping": "hou2. gam2 profit fong1 min6?", "mandarin": "好。那利润方面呢？" },
                { "speaker": "你", "text": "Net profit $120萬，profit margin 14%，達標。", "jyutping": "Net profit $120 maan6, profit margin 14%, daat6 biu1.", "mandarin": "净利润120万，利润率14%，达标。" }
              ]
            },
            {
              "name": "第二幕：现金流与预算",
              "location": "CFO办公室",
              "lines": [
                { "speaker": "CFO", "text": "Cash flow情況點？", "jyutping": "Cash flow cing4 fong3 dim2?", "mandarin": "现金流情况怎么样？" },
                { "speaker": "你", "text": "Operating cash flow正數，大概$200萬。不過有筆AR overdue咗。", "jyutping": "Operating cash flow zing3 sou3, daai6 koi3 $200 maan6. bat1 gwo3 jau5 bat1 AR overdue zo2.", "mandarin": "经营现金流为正，大概200万。不过有一笔应收账款逾期了。" },
                { "speaker": "CFO", "text": "邊個客？", "jyutping": "bin1 go3 haak3?", "mandarin": "哪个客户？" },
                { "speaker": "你", "text": "輝煌集團，仲有$50萬未找。我哋已經出咗reminder。", "jyutping": "fai1 wong4 zaap6 tyun4, zung6 jau5 $50 maan6 mei6 zaau2. ngo5 dei6 ji5 ging1 ceot1 zo2 reminder.", "mandarin": "辉煌集团，还有50万未结。我们已经发了催款单。" },
                { "speaker": "CFO", "text": "追緊啲。如果月底都收唔到，escalate俾我。", "jyutping": "zeoi1 gan2 di1. jyu4 gwo2 jyut6 dai2 dou1 sau1 m4 dou2, escalate bei2 ngo5.", "mandarin": "抓紧点。如果月底还收不到，升级给我。" },
                { "speaker": "你", "text": "明白。另外，Q3嘅budget我準備咗draft，想同你review下。", "jyutping": "ming4 baak6. ling6 ngoi6, Q3 ge3 budget ngo5 zeon2 bei6 zo2 draft, soeng2 tung4 nei5 review haa5.", "mandarin": "明白。另外，Q3的预算我准备了初稿，想跟你过一下。" },
                { "speaker": "CFO", "text": "你講。", "jyutping": "nei5 gong2.", "mandarin": "你讲。" },
                { "speaker": "你", "text": "我建議Q3增加$30萬嘅marketing budget，因為要推新service line。同時IT infrastructure要$20萬upgrade。", "jyutping": "ngo5 gin3 ji5 Q3 zang1 gaa1 $30 maan6 ge3 marketing budget, jan1 wai6 jiu3 teoi1 san1 service line. tung4 si4 IT infrastructure jiu3 $20 maan6 upgrade.", "mandarin": "我建议Q3增加30万营销预算，因为要推新服务线。同时IT基础设施要20万升级。" },
                { "speaker": "CFO", "text": "總數加咗幾多？", "jyutping": "zung2 sou3 gaa1 zo2 gei2 do1?", "mandarin": "总数加了多少？" },
                { "speaker": "你", "text": "總budget大概$450萬，比Q2多10%。", "jyutping": "zung2 budget daai6 koi3 $450 maan6, bei2 Q2 do1 10%.", "mandarin": "总预算大概450万，比Q2多10%。" },
                { "speaker": "CFO", "text": "10%… acceptable。你出個detailed breakdown俾我簽。", "jyutping": "10%... acceptable. nei5 ceot1 go3 detailed breakdown bei2 ngo5 cim1.", "mandarin": "10%… 可以接受。你出一份详细分项给我签。" },
                { "speaker": "你", "text": "好，聽日俾到你。", "jyutping": "hou2, ting1 jat6 bei2 dou2 nei5.", "mandarin": "好，明天给你。" }
              ]
            },
            {
              "name": "第三幕：审计准备",
              "location": "CFO办公室",
              "lines": [
                { "speaker": "CFO", "text": "另外，下個月audit firm嚟做interim audit，你準備成點？", "jyutping": "ling6 ngoi6, haa6 go3 jyut6 audit firm lai4 zou6 interim audit, nei5 zeon2 bei6 seng4 dim2?", "mandarin": "另外，下个月审计公司来做期中审计，你准备得怎么样了？" },
                { "speaker": "你", "text": "準備得七七八八。PBC list已經fill咗，supporting docs都整理好。", "jyutping": "zeon2 bei6 dak1 cat1 cat1 baat3 baat3. PBC list ji5 ging1 fill zo2, supporting docs dou1 zing2 lei5 hou2.", "mandarin": "准备得差不多了。审计清单已填好，支持文件都整理好了。" },
                { "speaker": "CFO", "text": "有冇咩potential issue？", "jyutping": "jau5 mou5 me1 potential issue?", "mandarin": "有没有什么潜在问题？" },
                { "speaker": "你", "text": "有一個——上年嗰筆$20萬嘅accrual，auditor可能問。", "jyutping": "jau5 jat1 go3——soeng6 nin2 go2 bat1 $20 maan6 ge3 accrual, auditor ho2 nang4 man6.", "mandarin": "有一个——去年那笔20万的应计项目，审计师可能会问。" },
                { "speaker": "CFO", "text": "點解？", "jyutping": "dim2 gaai2?", "mandarin": "为什么？" },
                { "speaker": "你", "text": "因為個accrual嘅supporting唔係好足，我準備緊補充文件。", "jyutping": "jan1 wai6 go3 accrual ge3 supporting m4 hai6 hou2 zuk1, ngo5 zeon2 bei6 gan2 bou2 cung1 man4 gin2.", "mandarin": "因为那笔应计的支持文件不够充分，我正在准备补充文件。" },
                { "speaker": "CFO", "text": "好，搞掂佢，唔好俾auditor捉到嘢。", "jyutping": "hou2, gaau2 dim6 keoi5, m4 hou2 bei2 auditor zuk1 dou2 je5.", "mandarin": "好，搞定它，别让审计师抓到问题。" },
                { "speaker": "你", "text": "明白，我會搞掂。", "jyutping": "ming4 baak6, ngo5 wui5 gaau2 dim6.", "mandarin": "明白，我会搞定。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "收入 / revenue", "jyutping": "sau1 jap6 / revenue", "mandarin": "收入/營收", "mnemonic": "收入", "scene": "营收汇报", "enteringTone": true },
            { "word": "利潤 / profit", "jyutping": "lei6 jeon6 / profit", "mandarin": "利润", "mnemonic": "利润", "scene": "净利润分析", "enteringTone": false },
            { "word": "gross margin", "jyutping": "—", "mandarin": "毛利率", "mnemonic": "毛利率", "scene": "毛利分析", "enteringTone": false },
            { "word": "現金流 / cash flow", "jyutping": "jin6 gam1 lau4 / cash flow", "mandarin": "现金流", "mnemonic": "现金流", "scene": "资金状况", "enteringTone": false },
            { "word": "核數 / audit", "jyutping": "hat6 sou3 / audit", "mandarin": "审计", "mnemonic": "核数", "scene": "审计检查", "enteringTone": true },
            { "word": "預算 / budget", "jyutping": "jyu6 syun3 / budget", "mandarin": "预算", "mnemonic": "预算", "scene": "预算汇报", "enteringTone": false },
            { "word": "資產負債表", "jyutping": "zi1 caan2 fu3 zaai6 biu2", "mandarin": "资产负债表", "mnemonic": "资产负债表", "scene": "财务报表", "enteringTone": false },
            { "word": "回報率 / ROI", "jyutping": "wui4 bou3 leot2 / ROI", "mandarin": "回报率", "mnemonic": "回报率", "scene": "投资分析", "enteringTone": true },
            { "word": "AR / 應收賬款", "jyutping": "— / jing3 sau1 zoeng3 fun2", "mandarin": "应收账款", "mnemonic": "应收", "scene": "催收管理", "enteringTone": false },
            { "word": "accrual", "jyutping": "—", "mandarin": "应计项目", "mnemonic": "应计", "scene": "会计处理", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：整體嚟講，Q2 revenue係___，對比Q1增長咗___%（总体来说，Q2营收是___，对比Q1增长了___%）",
              "usage": "财务汇报的标准开头——先总体后具体",
              "examples": [
                { "canto": "整體嚟講，Q2 revenue係$850萬，對比Q1增長咗12%。", "jyutping": "zing2 tai2 lai4 gong2, Q2 revenue hai6 $850 maan6, deoi3 bei2 Q1 zang1 zoeng2 zo2 12%.", "mandarin": "总的来说，Q2营收是850万，对比Q1增长了12%。" },
                { "canto": "整體嚟講，profit margin維持喺14%，達標。", "jyutping": "zing2 tai2 lai4 gong2, profit margin wai4 ci4 hai2 14%, daat6 biu1.", "mandarin": "总的来说，利润率维持在14%，达标。" },
                { "canto": "整體嚟講，cost控制做得唔錯，比budget低咗5%。", "jyutping": "zing2 tai2 lai4 gong2, cost hung3 zai3 zou6 dak1 m4 co3, bei2 budget dai1 zo2 5%.", "mandarin": "总的来说，成本控制做得不错，比预算低了5%。" }
              ]
            },
            {
              "name": "句型2：如果___都___，escalate俾我（如果___还___，升级给我）",
              "usage": "CFO给你授权边界，让你知道什么时候该上报",
              "examples": [
                { "canto": "如果月底都收唔到，escalate俾我。", "jyutping": "jyu4 gwo2 jyut6 dai2 dou1 sau1 m4 dou2, escalate bei2 ngo5.", "mandarin": "如果月底还收不到，升级给我。" },
                { "canto": "如果auditor問到呢個point，話我知。", "jyutping": "jyu4 gwo2 auditor man6 dou2 ni1 go3 point, waa6 ngo5 zi1.", "mandarin": "如果审计师问到这一点，告诉我。" },
                { "canto": "如果個客唔肯簽，我親自同佢傾。", "jyutping": "jyu4 gwo2 go3 haak3 m4 hang2 cim1, ngo5 can1 zi6 tung4 keoi5 king1.", "mandarin": "如果客户不肯签，我亲自跟他谈。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "中英夾雜是專業",
              "icon": "💼",
              "content": "香港財務匯報中，專業術語直接用英文比用中文翻譯更顯專業。說「revenue」不說「收入」，說「gross margin」不說「毛利率」，說「audit」不說「核數」（雖然核數也是正確的）。對話中CFO說的全是英文——你跟CFO匯報時也應該用英文術語，他會覺得你專業。"
            },
            {
              "title": "「有冇potential issue」的真實含義",
              "icon": "🔍",
              "content": "CFO問「有冇potential issue」不是隨便問問——他是要你在auditor發現之前先自查。如果auditor發現了問題而你沒提前匯報，那是你的責任。如果你提前匯報了（「上年嗰筆accrual可能被問」），CFO會幫你想對策。永遠不要隱瞞潛在問題，提前說出來反而顯得你可控。"
            },
            {
              "title": "「搞掂佢，唔好俾auditor捉到嘢」的潛台詞",
              "icon": "📄",
              "content": "CFO說這句話不是叫你造假。他的意思是——把supporting document準備好，讓auditor無話可說。香港的審計文化是「documentation driven」——只要你有文件支持，就沒有問題。沒有文件支持，即使你做得對，auditor也可以寫一個「findings」。所以keep good documentation是最重要的工作之一。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——财务汇报",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：CFO要你匯報Q2業績，最專業的開場是？",
                  "options": [
                    { "text": "「整體嚟講，Q2 revenue係$850萬，對比Q1增長咗12%。」", "correct": true },
                    { "text": "「我们赚了850万。」", "correct": false, "reason": "不够专业，没用财务术语" },
                    { "text": "「Q2表现还不错吧。」", "correct": false, "reason": "太模糊，不够精准" }
                  ]
                },
                {
                  "scene": "場景B：CFO問你有冇審計風險，該怎麼回應？",
                  "options": [
                    { "text": "「有一個——上年嗰筆accrual可能被問，我準備緊文件。」", "correct": true },
                    { "text": "「沒有問題。」", "correct": false, "reason": "如果被發現了你有責任" },
                    { "text": "「我不知道，看auditor怎么问。」", "correct": false, "reason": "被动态度不专业" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "营收 → ___", "answer": "revenue" },
                { "question": "毛利率 → ___", "answer": "gross margin" },
                { "question": "审计 → ___", "answer": "audit" },
                { "question": "预算 → 粵語/英文：___", "answer": "budget" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "整體嚟講，Q2 revenue係$850萬，對比Q1增長咗12%。", "mandarin": "总体来说，Q2营收是850万，对比Q1增长了12%。" },
                { "canto": "如果月底都收唔到，escalate俾我。", "mandarin": "如果月底还收不到，升级给我。" },
                { "canto": "搞掂佢，唔好俾auditor捉到嘢。", "mandarin": "搞定它，别让审计师抓到问题。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 26, title: '谈判与说服', level: 5, order_index: 2, description: '学习$200万IT外包合约谈判：价格、付款条件、服务范围三方面达成双赢', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-05-02",
      "title": "谈判与说服",
      "level": 5, "order_index": 2, "duration_minutes": 28,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你跟vendor就一個$200萬的IT外包合約進行談判。vendor開價偏高，你要在價格、付款條件、服務範圍三方面跟他談判，最終達成雙贏。",
          "scenes": [
            {
              "name": "第一幕：谈价格",
              "location": "会议室",
              "lines": [
                { "speaker": "供應商", "text": "林生，今日帶咗個proposal嚟，總數$220萬。", "jyutping": "lam4 saang1, gam1 jat6 daai3 zo2 go3 proposal lai4, zung2 sou3 $220 maan6.", "mandarin": "林先生，今天带了个提案来，总数220万。" },
                { "speaker": "你", "text": "$220萬比我想像中高咗啲。可唔可以拆開睇下？", "jyutping": "$220 maan6 bei2 ngo5 soeng2 zoeng6 zung1 gou1 zo2 di1. ho2 m4 ho2 ji5 caak3 hoi1 tai2 haa5?", "mandarin": "220万比我想象中高了一些。可不可以拆开看看？" },
                { "speaker": "供應商", "text": "可以。個breakdown係：implementation $150萬，annual support $70萬。", "jyutping": "ho2 ji5. go3 breakdown hai6: implementation $150 maan6, annual support $70 maan6.", "mandarin": "可以。分项是：实施150万，年度支持70万。" },
                { "speaker": "你", "text": "implementation呢part，我同market比過，你個rate偏高咗。", "jyutping": "implementation ni1 part, ngo5 tung4 market bei2 gwo3, nei5 go3 rate pin1 gou1 zo2.", "mandarin": "实施这部分，我跟市场比过，你的价格偏高了。" },
                { "speaker": "供應商", "text": "但我哋嘅team係senior嘅，quality好。", "jyutping": "daan6 ngo5 dei6 ge3 team hai6 senior ge3, quality hou2.", "mandarin": "但我们的团队是资深的，质量好。" },
                { "speaker": "你", "text": "quality我承認，但係$150萬確實over咗我嘅budget。我budget得$130萬俾implementation。", "jyutping": "quality ngo5 sing4 jing6, daan6 hai6 $150 maan6 kok3 sat6 over zo2 ngo5 ge3 budget. ngo5 budget dak1 $130 maan6 bei2 implementation.", "mandarin": "质量我承认，但150万确实超出了我的预算。我预算只有130万给实施。" },
                { "speaker": "供應商", "text": "$130萬… 太低了，做唔到。", "jyutping": "$130 maan6... taai3 dai1 liu5, zou6 m4 dou2.", "mandarin": "130万… 太低了，做不到。" },
                { "speaker": "你", "text": "$140萬，即日簽約。你諗下？", "jyutping": "$140 maan6, zik1 jat6 cim1 joek3. nei5 nam2 haa5?", "mandarin": "140万，当天签约。你想想？" },
                { "speaker": "供應商", "text": "（沉思）$140萬… 好，就$140萬，但係support要加到三年。", "jyutping": "(cam4 si1) $140 maan6... hou2, zau6 $140 maan6, daan6 hai6 support jiu3 gaa1 dou3 saam1 nin4.", "mandarin": "（沉思）140万… 好，就140万，但是支持要加到三年。" },
                { "speaker": "你", "text": "support三年？annual support $70萬×3=$210萬，總數$350萬？", "jyutping": "support saam1 nin4? annual support $70 maan6 × 3 = $210 maan6, zung2 sou3 $350 maan6?", "mandarin": "支持三年？年度支持70万×3=210万，总数350万？" },
                { "speaker": "供應商", "text": "我可以俾discount，三年total $180萬。", "jyutping": "ngo5 ho2 ji5 bei2 discount, saam1 nin4 total $180 maan6.", "mandarin": "我可以给折扣，三年总共180万。" },
                { "speaker": "你", "text": "$180萬三年support… 平均$60萬一年，平過而家個offer。好，deal！$140萬 implementation + $180萬三年support = $320萬 total。", "jyutping": "$180 maan6 saam1 nin4 support... ping4 gwan1 $60 maan6 jat1 nin4, peng4 gwo3 ji4 gaa1 go3 offer. hou2, deal! $140 maan6 implementation + $180 maan6 saam1 nin4 support = $320 maan6 total.", "mandarin": "180万三年支持… 平均60万一年，比现在的报价便宜。好，成交！140万实施+180万三年支持=320万总额。" }
              ]
            },
            {
              "name": "第二幕：确认细节",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "仲有幾個細節要傾清楚。第一，implementation嘅milestone同payment schedule。", "jyutping": "zung6 jau5 gei2 go3 sai3 zit3 jiu3 king1 cing1 co2. dai6 jat1, implementation ge3 milestone tung4 payment schedule.", "mandarin": "还有几个细节要谈清楚。第一，实施的里程碑和付款计划。" },
                { "speaker": "供應商", "text": "你建議點？", "jyutping": "nei5 gin3 ji5 dim2?", "mandarin": "你建议怎么办？" },
                { "speaker": "你", "text": "分四期：25%簽約，25% UAT完成，25% go-live，25% 三個月後驗收。", "jyutping": "fan1 sei3 kei4: 25% cim1 joek3, 25% UAT jyun4 sing4, 25% go-live, 25% saam1 go3 jyut6 hau6 jim6 sau1.", "mandarin": "分四期：25%签约，25% UAT完成，25%上线，25%三个月后验收。" },
                { "speaker": "供應商", "text": "尾數25%等三個月？太耐了。20%簽約，30% UAT，30% go-live，20%驗收。", "jyutping": "mei5 sou3 25% dang2 saam1 go3 jyut6? taai3 noi6 liu5. 20% cim1 joek3, 30% UAT, 30% go-live, 20% jim6 sau1.", "mandarin": "尾款25%等三个月？太久了。20%签约，30% UAT，30%上线，20%验收。" },
                { "speaker": "你", "text": "可以，但係驗收期可唔可以寫清楚乜嘢叫做「驗收pass」？", "jyutping": "ho2 ji5, daan6 hai6 jim6 sau1 kei4 ho2 m4 ho2 ji5 se2 cing1 co2 mat1 je5 giu3 zou6 「jim6 sau1 pass」?", "mandarin": "可以，但是验收期可不可以写清楚什么叫「验收通过」？" },
                { "speaker": "供應商", "text": "根據UAT sign-off為準。", "jyutping": "gan1 geoi3 UAT sign-off wai4 zeon2.", "mandarin": "根据UAT签收为准。" },
                { "speaker": "你", "text": "好。第二個，service level agreement——我要求99.5% uptime。", "jyutping": "hou2. dai6 ji6 go3, service level agreement——ngo5 jiu1 kau4 99.5% uptime.", "mandarin": "好。第二个，服务水平协议——我要求99.5%正常运行时间。" },
                { "speaker": "供應商", "text": "99.5%… 可以，但係scheduled maintenance除外。", "jyutping": "99.5%... ho2 ji5, daan6 hai6 scheduled maintenance ceoi4 ngoi6.", "mandarin": "99.5%… 可以，但计划维护除外。" },
                { "speaker": "你", "text": "即係maintenance要提早通知？", "jyutping": "zik1 hai6 maintenance jiu3 tai4 zou2 tung1 zi1?", "mandarin": "就是说维护要提前通知？" },
                { "speaker": "供應商", "text": "最少72小時。", "jyutping": "zeoi3 siu2 72 siu2 si4.", "mandarin": "最少72小时。" },
                { "speaker": "你", "text": "好。第三，如果service唔達標，有冇credit？", "jyutping": "hou2. dai6 saam1, jyu4 gwo2 service m4 daat6 biu1, jau5 mou5 credit?", "mandarin": "好。第三，如果服务不达标，有没有赔偿？" },
                { "speaker": "供應商", "text": "如果連續三個月低過99.5%，下個月free。", "jyutping": "jyu4 gwo2 lin4 zuk6 saam1 go3 jyut6 dai1 gwo3 99.5%, haa6 go3 jyut6 free.", "mandarin": "如果连续三个月低于99.5%，下个月免费。" },
                { "speaker": "你", "text": "OK，寫落合約。", "jyutping": "OK, se2 lok6 hap6 joek3.", "mandarin": "OK，写进合同。" }
              ]
            },
            {
              "name": "第三幕：收尾",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "好，我總結下共識：Implementation $140萬，Support三年$180萬，Payment 20%→30%→30%→20%，SLA 99.5% uptime，Credit連續三個月不達標下月free。", "jyutping": "hou2, ngo5 zung2 git3 haa6 gung6 sik1: Implementation $140 maan6, Support saam1 nin4 $180 maan6, Payment 20%→30%→30%→20%, SLA 99.5% uptime, Credit lin4 zuk6 saam1 go3 jyut6 bat1 daat6 biu1 haa6 jyut6 free.", "mandarin": "好，我总结一下共识：实施140万，支持三年180万，付款20%→30%→30%→20%，SLA 99.5%正常运行时间，赔偿连续三个月不达标下月免费。" },
                { "speaker": "供應商", "text": "冇錯。", "jyutping": "mou5 co3.", "mandarin": "没错。" },
                { "speaker": "你", "text": "我會出返個term sheet俾你confirm，然後準備正式合約。", "jyutping": "ngo5 wui5 ceot1 faan1 go3 term sheet bei2 nei5 confirm, jin4 hau6 zeon2 bei6 zing3 sik1 hap6 joek3.", "mandarin": "我会出一份条款清单给你确认，然后准备正式合同。" },
                { "speaker": "供應商", "text": "好，等你好消息。", "jyutping": "hou2, dang2 nei5 hou2 siu1 sik1.", "mandarin": "好，等你好消息。" },
                { "speaker": "你", "text": "多謝你今日嘅時間，合作愉快！", "jyutping": "do1 ze6 nei5 gam1 jat6 ge3 si4 gaan3, hap6 zok3 jyu4 faai3!", "mandarin": "谢谢你今天的时间，合作愉快！" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "proposal", "jyutping": "—", "mandarin": "提案", "mnemonic": "提案", "scene": "方案提交", "enteringTone": false },
            { "word": "談判", "jyutping": "taam4 pun3", "mandarin": "谈判", "mnemonic": "谈判", "scene": "商务谈判", "enteringTone": false },
            { "word": "budget", "jyutping": "—", "mandarin": "预算", "mnemonic": "预算", "scene": "预算限制", "enteringTone": false },
            { "word": "discount", "jyutping": "—", "mandarin": "折扣", "mnemonic": "折扣", "scene": "价格折扣", "enteringTone": false },
            { "word": "milestone", "jyutping": "—", "mandarin": "里程碑", "mnemonic": "里程碑", "scene": "付款节点", "enteringTone": false },
            { "word": "SLA", "jyutping": "—", "mandarin": "服务水平协议", "mnemonic": "服务协议", "scene": "服务质量", "enteringTone": false },
            { "word": "uptime", "jyutping": "—", "mandarin": "正常运行时间", "mnemonic": "运行时间", "scene": "系统可用性", "enteringTone": false },
            { "word": "credit", "jyutping": "—", "mandarin": "赔偿额度", "mnemonic": "赔偿", "scene": "违约赔偿", "enteringTone": false },
            { "word": "term sheet", "jyutping": "—", "mandarin": "条款清单", "mnemonic": "条款清单", "scene": "谈判摘要", "enteringTone": false },
            { "word": "deal", "jyutping": "—", "mandarin": "成交", "mnemonic": "成交", "scene": "达成交易", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：你個rate偏高咗（你的价格偏高了）",
              "usage": "谈判中指出对方价格问题的委婉说法，比直接说「太贵了」更商务",
              "examples": [
                { "canto": "你個rate偏高咗，我同market比過。", "jyutping": "nei5 go3 rate pin1 gou1 zo2, ngo5 tung4 market bei2 gwo3.", "mandarin": "你的价格偏高了，我跟市场比过。" },
                { "canto": "呢個價錢有啲硬，可唔可以傾？", "jyutping": "ni1 go3 gaa3 cin4 jau5 di1 ngaang6, ho2 m4 ho2 ji5 king1?", "mandarin": "这个价格有点硬，可不可以谈？" },
                { "canto": "我budget唔到呢個數。", "jyutping": "ngo5 budget m4 dou2 ni1 go3 sou3.", "mandarin": "我的预算达不到这个数。" }
              ]
            },
            {
              "name": "句型2：deal！___就___（成交！___就___）",
              "usage": "谈判达成共识时拍板的说法，干脆利落",
              "examples": [
                { "canto": "deal！$140萬 implementation，就咁定。", "jyutping": "deal! $140 maan6 implementation, zau6 gam2 ding6.", "mandarin": "成交！140万实施，就这么定。" },
                { "canto": "deal！就咁話。", "jyutping": "deal! zau6 gam2 waa6.", "mandarin": "成交！就这么说定了。" },
                { "canto": "好，deal！聽日出term sheet。", "jyutping": "hou2, deal! ting1 jat6 ceot1 term sheet.", "mandarin": "好，成交！明天出条款清单。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "先說「太高了」，再給「具體數字」",
              "icon": "💰",
              "content": "談判時第一句說「你個rate偏高」——這是打開談判空間的信號。但光說「貴」沒有用，必須給出具體的反建議（「我budget $130萬」）。如果你只說貴不說價格，對方會覺得你在抱怨而不是在談判。專業的談判者永遠帶著「alternative」上桌。"
            },
            {
              "title": "「即日簽約」是談判籌碼",
              "icon": "✍️",
              "content": "對話中你說「$140萬，即日簽約」——「即日簽約」本身就是一個重要籌碼。它可以促使對方在價格上讓步，因為他不用擔心夜長夢多。反過來，如果對方跟你說「即日簽約有discount嗎？」，你也可以考慮給一個early bird discount。"
            },
            {
              "title": "SLA的「寫清楚」比「講得好」重要",
              "icon": "📝",
              "content": "香港商業合約中，最常見的糾紛是因為SLA寫得不清楚。對話中你反覆確認「乜嘢叫做驗收pass」「maintenance提早通知」「連續三個月唔達標點計」——這些都是在保護自己。香港商業文化中，合約沒有寫清楚的東西，等於不存在。口頭承諾要寫進合約才有法律效力。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——价格谈判",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：供應商開價220萬，你想表達偏高，該怎麼說？",
                  "options": [
                    { "text": "「你個rate偏高咗，我同market比過。」", "correct": true },
                    { "text": "「太贵了！」", "correct": false, "reason": "太直接，不商务" },
                    { "text": "「这个价格我接受不了。」", "correct": false, "reason": "不够具体" }
                  ]
                },
                {
                  "scene": "場景B：談判達成共識，拍板時該用哪句？",
                  "options": [
                    { "text": "「deal！$140萬 implementation + $180萬三年support。」", "correct": true },
                    { "text": "「好吧，就这样。」", "correct": false, "reason": "不够干脆有力" },
                    { "text": "「那我们试试吧。」", "correct": false, "reason": "不确定，缺乏信心" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "预算 → ___", "answer": "budget" },
                { "question": "折扣 → ___", "answer": "discount" },
                { "question": "服务水平协议 → ___（缩写）", "answer": "SLA" },
                { "question": "成交 → ___", "answer": "deal" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "你個rate偏高咗，我同market比過。", "mandarin": "你的价格偏高了，我跟市场比过。" },
                { "canto": "deal！$140萬 implementation，就咁定。", "mandarin": "成交！140万实施，就这么定。" },
                { "canto": "驗收期可唔可以寫清楚乜嘢叫做驗收pass？", "mandarin": "验收期可不可以写清楚什么叫验收通过？" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 27, title: 'Presentation技巧', level: 5, order_index: 3, description: '学习用粤语向高层做20分钟ERP升级提案：痛點分析、ROI论证、Q&A应对', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-05-03",
      "title": "Presentation技巧",
      "level": 5, "order_index": 3, "duration_minutes": 28,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你要向公司高層（CFO、COO、IT Director）做一個20分鐘的presentation，建議公司全面升級ERP系統。你要說服他們投資$500萬。",
          "scenes": [
            {
              "name": "第一幕：开场与问题陈述",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "各位早晨！多謝大家今日嚟參加呢個presentation。今日我用20分鐘，同大家分享點解我哋需要upgrade ERP系統。", "jyutping": "gok3 wai2 zou2 san4! do1 ze6 daai6 gaa1 gam1 jat6 lai4 caam1 gaa1 ni1 go3 presentation. gam1 jat6 ngo5 jung6 20 fan1 zung1, tung4 daai6 gaa1 fan1 hoeng2 dim2 gaai2 ngo5 dei6 seoi1 jiu3 upgrade ERP hai6 tung2.", "mandarin": "各位早上好！谢谢大家今天来参加这个演示。今天我用20分钟，跟大家分享为什么我们需要升级ERP系统。" },
                { "speaker": "你", "text": "首先，我哋睇下而家個system嘅痛點。第一，system stability——呢半年發生咗三次downtime，影響咗成個財務部嘅operation。第二，manual work——好多report仲係人手做，晒時間之餘仲容易出錯。第三，scalability——公司業務增長咗30%，但system capacity冇跟到。", "jyutping": "sau2 sin1, ngo5 dei6 tai2 haa5 ji4 gaa1 go3 system ge3 tung3 dim2. dai6 jat1, system stability——ni1 bun3 nin4 faat3 sang1 zo2 saam1 ci3 downtime, jing2 hoeng2 zo2 seng4 go3 coi4 mou6 bou6 ge3 operation. dai6 ji6, manual work——hou2 do1 report zung6 hai6 jan4 sau2 zou6, saai3 si4 gaan3 zi1 jyu4 zung6 jung4 ji6 ceot1 co3. dai6 saam1, scalability——gung1 si1 jip6 mou6 zang1 zoeng2 zo2 30%, daan6 system capacity mou5 gan1 dou2.", "mandarin": "首先，我们看看现在系统的痛点。第一，系统稳定性——这半年发生了三次宕机，影响了整个财务部的运作。第二，手工操作——很多报表还是人工做，浪费时间还容易出错。第三，扩容性——公司业务增长了30%，但系统容量跟不上。" },
                { "speaker": "CFO", "text": "你呢個data source係邊度？", "jyutping": "nei5 ni1 go3 data source hai6 bin1 dou6?", "mandarin": "你这个数据来源是哪里？" },
                { "speaker": "你", "text": "係嚟自IT嘅incident log同我哋部門嘅time tracking。有需要我可以share出嚟。", "jyutping": "hai6 lai4 zi6 IT ge3 incident log tung4 ngo5 dei6 bou6 mun4 ge3 time tracking. jau5 seoi1 jiu3 ngo5 ho2 ji5 share ceot1 lai4.", "mandarin": "是来自IT的事件日志和我们部门的时间记录。有需要我可以分享出来。" },
                { "speaker": "CFO", "text": "OK，繼續。", "jyutping": "OK, gai3 zuk6.", "mandarin": "OK，继续。" }
              ]
            },
            {
              "name": "第二幕：解决方案与数据分析",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "基於呢三個痛點，我建議全面upgrade去ERP X版本。呢個係ROI分析。一次性investment $500萬，但係每年可以慳返大概$200萬嘅operational cost。", "jyutping": "gei1 jyu1 ni1 saam1 go3 tung3 dim2, ngo5 gin3 ji5 cyun4 min6 upgrade heoi3 ERP X baan2 bun2. ni1 go3 hai6 ROI fan1 sik1. jat1 ci3 sing3 investment $500 maan6, daan6 hai6 mui5 nin4 ho2 ji5 haan1 faan1 daai6 koi3 $200 maan6 ge3 operational cost.", "mandarin": "基于这三个痛点，我建议全面升级到ERP X版本。这是ROI分析。一次性投资500万，但每年可以节省大概200万的运营成本。" },
                { "speaker": "COO", "text": "即係兩年半回本？", "jyutping": "zik1 hai6 loeng5 nin4 bun3 wui4 bun2?", "mandarin": "就是两年半回本？" },
                { "speaker": "你", "text": "啱。而且第三年開始就係pure saving。", "jyutping": "ngaam1. ji4 ce2 dai6 saam1 nin4 hoi1 ci2 zau6 hai6 pure saving.", "mandarin": "对。而且第三年开始就是纯节省。" },
                { "speaker": "IT Director", "text": "你個$200萬saving係點計出嚟？", "jyutping": "nei5 go3 $200 maan6 saving hai6 dim2 gai3 ceot1 lai4?", "mandarin": "你这200万节省是怎么算出来的？" },
                { "speaker": "你", "text": "好問題。第一，manual work減少可以慳返3個headcount——$150萬。第二，system downtime減少可以慳返$30萬嘅productivity loss。第三，automation減少error，慳返$20萬嘅correction cost。", "jyutping": "hou2 man6 tai4. dai6 jat1, manual work gaam2 siu2 ho2 ji5 haan1 faan1 3 go3 headcount——$150 maan6. dai6 ji6, system downtime gaam2 siu2 ho2 ji5 haan1 faan1 $30 maan6 ge3 productivity loss. dai6 saam1, automation gaam2 siu2 error, haan1 faan1 $20 maan6 ge3 correction cost.", "mandarin": "好问题。第一，手工操作减少可以省3个人手——150万。第二，系统宕机减少可以省30万的生产力损失。第三，自动化减少错误，省20万的纠正成本。" },
                { "speaker": "IT Director", "text": "個數合理。", "jyutping": "go3 sou3 hap6 lei5.", "mandarin": "这个数合理。" },
                { "speaker": "你", "text": "另外，新系統support mobile access同real-time reporting——對管理層嚟講係一個big plus。", "jyutping": "ling6 ngoi6, san1 hai6 tung2 support mobile access tung4 real-time reporting——deoi3 gun2 lei5 cang4 lai4 gong2 hai6 jat1 go3 big plus.", "mandarin": "另外，新系统支持移动访问和实时报表——对管理层来说是一个很大的加分项。" }
              ]
            },
            {
              "name": "第三幕：行动呼吁与Q&A",
              "location": "会议室",
              "lines": [
                { "speaker": "你", "text": "總結嚟講，我建議三個steps：Step 1今個Q完成vendor selection，Step 2下個Q開始implementation，Step 3一年內完成go-live。成個project嘅NPV positive，IRR大概35%。", "jyutping": "zung2 git3 lai4 gong2, ngo5 gin3 ji5 saam1 go3 steps: Step 1 gam1 go3 Q jyun4 sing4 vendor selection, Step 2 haa6 go3 Q hoi1 ci2 implementation, Step 3 jat1 nin4 noi6 jyun4 sing4 go-live. seng4 go3 project ge3 NPV positive, IRR daai6 koi3 35%.", "mandarin": "总结来说，我建议三个步骤：第一步这个季度完成供应商选择，第二步下季度开始实施，第三步一年内完成上线。整个项目的净现值为正，内部回报率大概35%。" },
                { "speaker": "你", "text": "我強烈建議董事會approve呢個investment。", "jyutping": "ngo5 koeng4 lit6 gin3 ji5 dung2 si6 wui2 approve ni1 go3 investment.", "mandarin": "我强烈建议董事会批准这项投资。" },
                { "speaker": "CFO", "text": "個IRR 35%係咪最差情況？", "jyutping": "go3 IRR 35% hai6 mai6 zeoi3 caa1 cing4 fong3?", "mandarin": "这个IRR 35%是最差情况吗？" },
                { "speaker": "你", "text": "唔係。最差情況我計咗sensitivity，IRR最低都有22%，仍然係positive。", "jyutping": "m4 hai6. zeoi3 caa1 cing4 fong3 ngo5 gai3 zo2 sensitivity, IRR zeoi3 dai1 dou1 jau5 22%, jing4 jin4 hai6 positive.", "mandarin": "不是。最差情况我算了敏感性分析，IRR最低也有22%，仍然是正向的。" },
                { "speaker": "CFO", "text": "好，我support。", "jyutping": "hou2, ngo5 support.", "mandarin": "好，我支持。" },
                { "speaker": "COO", "text": "我都OK。你出個detailed proposal俾board。", "jyutping": "ngo5 dou1 OK. nei5 ceot1 go3 detailed proposal bei2 board.", "mandarin": "我也OK。你出一份详细提案给董事会。" },
                { "speaker": "你", "text": "好，多謝大家嘅支持！我會今個星期內出final proposal。", "jyutping": "hou2, do1 ze6 daai6 gaa1 ge3 zi1 ci4! ngo5 wui5 gam1 go3 sing1 kei4 noi6 ceot1 final proposal.", "mandarin": "好，谢谢大家的支持！我会这个星期内出最终提案。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "presentation", "jyutping": "—", "mandarin": "演示/简报", "mnemonic": "简报", "scene": "汇报演示", "enteringTone": false },
            { "word": "痛點", "jyutping": "tung3 dim2", "mandarin": "痛点/问题点", "mnemonic": "痛点", "scene": "问题分析", "enteringTone": false },
            { "word": "system stability", "jyutping": "—", "mandarin": "系统稳定性", "mnemonic": "稳定性", "scene": "系统评估", "enteringTone": false },
            { "word": "manual work", "jyutping": "—", "mandarin": "手動工作", "mnemonic": "手工操作", "scene": "效率问题", "enteringTone": false },
            { "word": "scalability", "jyutping": "—", "mandarin": "可扩展性", "mnemonic": "扩展性", "scene": "系统规划", "enteringTone": false },
            { "word": "ROI", "jyutping": "—", "mandarin": "投资回报率", "mnemonic": "回报率", "scene": "财务分析", "enteringTone": false },
            { "word": "saving", "jyutping": "—", "mandarin": "节省/节约", "mnemonic": "节省", "scene": "成本收益", "enteringTone": false },
            { "word": "headcount", "jyutping": "—", "mandarin": "人手/员工数", "mnemonic": "人头", "scene": "人力成本", "enteringTone": false },
            { "word": "NPV / IRR", "jyutping": "—", "mandarin": "净现值/内部回报率", "mnemonic": "估值指标", "scene": "投资论证", "enteringTone": false },
            { "word": "sensitivity analysis", "jyutping": "—", "mandarin": "敏感性分析", "mnemonic": "敏感分析", "scene": "风险评估", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：首先…第一…第二…第三…（首先…第一…第二…第三…）",
              "usage": "presentation中结构化论证的标准方式",
              "examples": [
                { "canto": "首先，我哋睇下而家嘅痛點。第一，system stability…第二，manual work…第三，scalability…", "jyutping": "sau2 sin1, ngo5 dei6 tai2 haa5 ji4 gaa1 ge3 tung3 dim2. dai6 jat1, system stability... dai6 ji6, manual work... dai6 saam1, scalability...", "mandarin": "首先，我们看看现在的痛点。第一，系统稳定性…第二，手工操作…第三，可扩展性…" },
                { "canto": "我嘅建議有三個steps：Step 1 vendor selection，Step 2 implementation，Step 3 go-live。", "jyutping": "ngo5 ge3 gin3 ji5 jau5 saam1 go3 steps: Step 1 vendor selection, Step 2 implementation, Step 3 go-live.", "mandarin": "我的建议有三个步骤：第一步供应商选择，第二步实施，第三步上线。" },
                { "canto": "今日嘅agenda分三個part：背景分析、解決方案、行動計劃。", "jyutping": "gam1 jat6 ge3 agenda fan1 saam1 go3 part: bui6 ging2 fan1 sik1, gaai2 kyut3 fong1 on3, hang4 dung6 gai3 waak6.", "mandarin": "今天的议程分三个部分：背景分析、解决方案、行动计划。" }
              ]
            },
            {
              "name": "句型2：好問題。第一___，第二___，第三___（好问题。第一___，第二___，第三___）",
              "usage": "被问到尖锐问题时，先肯定问题再结构化回答——给自己争取思考时间",
              "examples": [
                { "canto": "好問題。第一，manual work減少…第二，downtime減少…第三，error減少…", "jyutping": "hou2 man6 tai4. dai6 jat1, manual work gaam2 siu2... dai6 ji6, downtime gaam2 siu2... dai6 saam1, error gaam2 siu2...", "mandarin": "好问题。第一，手工减少…第二，宕机减少…第三，错误减少…" },
                { "canto": "好問題。呢個數字係嚟自IT嘅incident log同我哋嘅time tracking。", "jyutping": "hou2 man6 tai4. ni1 go3 sou3 zi6 hai6 lai4 zi6 IT ge3 incident log tung4 ngo5 dei6 ge3 time tracking.", "mandarin": "好问题。这个数字是来自IT的事件日志和我们的时间记录。" },
                { "canto": "好問題。最差情況我計過sensitivity，IRR最低都有22%。", "jyutping": "hou2 man6 tai4. zeoi3 caa1 cing4 fong3 ngo5 gai3 gwo3 sensitivity, IRR zeoi3 dai1 dou1 jau5 22%.", "mandarin": "好问题。最差情况我算过敏感性，IRR最低也有22%。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "Presentation的「20分鐘法則」",
              "icon": "⏱️",
              "content": "香港高層的注意力極限是20分鐘。超過20分鐘，他們開始看手機、想下一個meeting。所以一個好的presentation應該控制在15-20分鐘，留5-10分鐘Q&A。對話中你開頭說「我用20分鐘」，等於給大家一個心理時鐘——他們知道你會在20分鐘內結束，會更專注。"
            },
            {
              "title": "「你個data source係邊度？」是高層的標準測試題",
              "icon": "🔍",
              "content": "CFO問你data source不是在挑戰你——他是在測試你的presentation是否「有根有據」。香港高管看presentation最怕的是「吹水」（沒有數據支撐的觀點）。如果你對每一個數字都能說出source（「係嚟自IT嘅incident log」），他就會信任你。如果說不出source，你的整個proposal都會被打問號。"
            },
            {
              "title": "被挑戰時的反應決定成敗",
              "icon": "🎯",
              "content": "Presentation中一定會被問到尖銳問題。你的反應比答案更重要——先說「好問題」微笑（給自己3秒思考），然後結構化回答（「第一…第二…第三…」），如果不確定就說「呢個我要check返再答你」。永遠不要defensive（防禦性反駁）——高層不是要打敗你，是要測試你有沒有想清楚。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——高层汇报",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：CFO問你數據來源，最佳回應是？",
                  "options": [
                    { "text": "「係嚟自IT嘅incident log同我哋部門嘅time tracking。」", "correct": true },
                    { "text": "「我从网上找的。」", "correct": false, "reason": "缺乏可信度" },
                    { "text": "「我大概估算的。」", "correct": false, "reason": "\"估算\"在高管面前不专业" }
                  ]
                },
                {
                  "scene": "場景B：被問到一個尖銳的數字問題，你應該怎麼開始回答？",
                  "options": [
                    { "text": "「好問題。第一…第二…第三…」", "correct": true },
                    { "text": "「你质疑我啊？」", "correct": false, "reason": "防御性反应，不专业" },
                    { "text": "「这个…我再想想…」", "correct": false, "reason": "缺乏准备的表现" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语",
              "items": [
                { "question": "痛点 → 粵語：___", "answer": "痛點" },
                { "question": "投资回报率 → ___（缩写）", "answer": "ROI" },
                { "question": "可扩展性 → ___", "answer": "scalability" },
                { "question": "敏感性分析 → ___", "answer": "sensitivity analysis" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "好問題。第一，manual work減少…第二，downtime減少…第三，error減少…", "mandarin": "好问题。第一，手工减少…第二，宕机减少…第三，错误减少…" },
                { "canto": "我強烈建議董事會approve呢個investment。", "mandarin": "我强烈建议董事会批准这项投资。" },
                { "canto": "最差情況我計咗sensitivity，IRR最低都有22%。", "mandarin": "最差情况我算了敏感性分析，IRR最低也有22%。" }
              ]
            }
          ]
        }
      ]
    })
  },
  { id: 28, title: '职场俚语与潜规则', level: 5, order_index: 4, description: '学习12个高频香港职场俚语，看懂同事潜台词：chur、hea、奄尖、放飛機、放雪櫃', difficulty_label: '🔴 有挑战',
    content_json: JSON.stringify({
      "course_id": "MO-05-04",
      "title": "职场俚语与潜规则",
      "level": 5, "order_index": 4, "duration_minutes": 28,
      "modules": [
        {
          "type": "dialogue",
          "title": "情景引入",
          "scenario": "你入職咗一年，已經聽得明大部分同事講嘅嘢，但係有一啲俚語同潛規則你仲未搞清。今日Sarah同阿Ken一邊食lunch一邊教你。",
          "scenes": [
            {
              "name": "第一幕：俚语教学",
              "location": "餐厅",
              "lines": [
                { "speaker": "Sarah", "text": "你嚟咗一年，聽唔聽得明我哋平時啲slang㗎？", "jyutping": "nei5 lai4 zo2 jat1 nin4, teng1 m4 teng1 dak1 ming4 ngo5 dei6 ping4 si4 di1 slang gaa3?", "mandarin": "你来了快一年，听不听得懂我们平时那些俚语啊？" },
                { "speaker": "你", "text": "一半一半啦。有時你哋講得太快我就跟唔到。", "jyutping": "jat1 bun3 jat1 bun3 laa1. jau5 si4 nei5 dei6 gong2 dak1 taai3 faai3 ngo5 zau6 gan1 m4 dou2.", "mandarin": "一半一半吧。有时你们说得太快我就跟不上。" },
                { "speaker": "Ken", "text": "例如呢？", "jyutping": "lai6 jyu4 ne1?", "mandarin": "比如呢？" },
                { "speaker": "你", "text": "尋日阿輝話「呢個project好chur」，chur係咩意思？", "jyutping": "cam4 jat6 aa3 fai1 waa6 「ni1 go3 project hou2 chur」, chur hai6 me1 ji3 si1?", "mandarin": "昨天阿辉说「这个项目好chur」，chur是什么意思？" },
                { "speaker": "Sarah", "text": "（笑）chur = 好辛苦/好趕/好多嘢做。即係好stressful。", "jyutping": "(siu3) chur = hou2 san1 fu2 / hou2 gon2 / hou2 do1 je5 zou6. zik1 hai6 hou2 stressful.", "mandarin": "（笑）chur = 很累/很赶/很多事做。就是压力很大。" },
                { "speaker": "你", "text": "原來係咁！仲有咩常用嘅slang？", "jyutping": "jyun4 loi4 hai6 gam2! zung6 jau5 me1 soeng4 jung6 ge3 slang?", "mandarin": "原来是这样！还有什么常用的俚语？" },
                { "speaker": "Ken", "text": "「呢個客好奄尖」= 呢個客好挑剔，好難服侍。", "jyutping": "「ni1 go3 haak3 hou2 am1 zim1」= ni1 go3 haak3 hou2 tiu1 tik1, hou2 naan4 fuk6 si6.", "mandarin": "「这个客户很挑剔」= 这个客户很挑剔，很难伺候。" },
                { "speaker": "Sarah", "text": "「放飛機」= 失約，約咗唔嚟。", "jyutping": "「fong3 fei1 gei1」= sat1 joek3, joek3 zo2 m4 lai4.", "mandarin": "「放飞机」= 爽约，约好了不来。" },
                { "speaker": "Ken", "text": "「Hea做」= 是但做/敷衍了事，冇heart去做。", "jyutping": "「Hea zou6」= si6 daan6 zou6 / fu1 hin2 liu5 si6, mou5 heart heoi3 zou6.", "mandarin": "「Hea做」= 随便做/敷衍了事，没有用心去做。" },
                { "speaker": "你", "text": "Hea做… 我成日聽到人話「今日好Hea」。即係好得閒？", "jyutping": "Hea zou6... ngo5 seng4 jat6 teng1 dou2 jan4 waa6 「gam1 jat6 hou2 Hea」. zik1 hai6 hou2 dak1 haan4?", "mandarin": "Hea做… 我整天听到人说「今天好Hea」。就是很闲？" },
                { "speaker": "Sarah", "text": "都可以，但係「好Hea」亦可以話一個人做嘢唔認真。", "jyutping": "dou1 ho2 ji5, daan6 hai6 「hou2 Hea」 jik6 ho2 ji5 waa6 jat1 go3 jan4 zou6 je5 m4 jing6 zan1.", "mandarin": "都可以，但是「好Hea」也可以说一个人做事不认真。" },
                { "speaker": "你", "text": "OIC，即係要睇context。", "jyutping": "OIC, zik1 hai6 jiu3 tai2 context.", "mandarin": "哦明白了，就是要看上下文。" }
              ]
            },
            {
              "name": "第二幕：潜规则拆解",
              "location": "餐厅",
              "lines": [
                { "speaker": "你", "text": "仲有一個問題——成日聽到同事話「我陣間俾你」，但係好多時都冇俾。", "jyutping": "zung6 jau5 jat1 go3 man6 tai4——seng4 jat6 teng1 dou2 tung4 si6 waa6 「ngo5 zan6 gaan1 bei2 nei5」, daan6 hai6 hou2 do1 si4 dou1 mou5 bei2.", "mandarin": "还有一个问题——常听到同事说「我待会给你」，但很多时候都没给。" },
                { "speaker": "Sarah", "text": "（笑）「我陣間俾你」= 我等陣俾你——但係可能永遠唔會俾。", "jyutping": "(siu3) 「ngo5 zan6 gaan1 bei2 nei5」= ngo5 dang2 zan6 bei2 nei5——daan6 hai6 ho2 nang4 wing5 jyun5 m4 wui5 bei2.", "mandarin": "（笑）「我待会给你」= 我等下给你——但可能永远不给。" },
                { "speaker": "Ken", "text": "即係客氣說話？", "jyutping": "zik1 hai6 haak3 hei3 syut3 waa6?", "mandarin": "就是客气话？" },
                { "speaker": "Sarah", "text": "係！仲有「我搵日約你食飯」——呢句99%唔會發生。", "jyutping": "hai6! zung6 jau5 「ngo5 wan2 jat6 joek3 nei5 sik6 faan6」——ni1 geoi3 99% m4 wui5 faat3 sang1.", "mandarin": "对！还有「我改天约你吃饭」——这句99%不会发生。" },
                { "speaker": "你", "text": "哈哈哈，原來係咁！", "jyutping": "haa1 haa1 haa1, jyun4 loi4 hai6 gam2!", "mandarin": "哈哈哈，原来是这样！" },
                { "speaker": "Ken", "text": "仲有句好重要：「我同你follow up」。如果你係Manager，講「你跟進下」，係真係要你跟。但如果係同事講「我同你follow up」，可能只係口頭禪。", "jyutping": "zung6 jau5 geoi3 hou2 zung6 jiu3: 「ngo5 tung4 nei5 follow up」. jyu4 gwo2 nei5 hai6 Manager, gong2 「nei5 gan1 zeon3 haa5」, hai6 zan1 hai6 jiu3 nei5 gan1. daan6 jyu4 gwo2 hai6 tung4 si6 gong2 「ngo5 tung4 nei5 follow up」, ho2 nang4 zi2 hai6 hau2 tau4 sim4.", "mandarin": "还有句很重要的：「我跟你跟进」。如果你是经理，说「你跟进下」，是真的要你跟。但如果是同事说「我跟你跟进」，可能只是口头禅。" },
                { "speaker": "你", "text": "咁點分真定假？", "jyutping": "gam2 dim2 fan1 zan1 ding6 gaa2?", "mandarin": "那怎么分真假？" },
                { "speaker": "Sarah", "text": "有deadline就係真，冇deadline就係客氣。", "jyutping": "jau5 deadline zau6 hai6 zan1, mou5 deadline zau6 hai6 haak3 hei3.", "mandarin": "有截止日期就是真，没截止日期就是客气。" },
                { "speaker": "你", "text": "即係「我聽日俾你」=真，「我陣間俾你」=可能唔俾？", "jyutping": "zik1 hai6 「ngo5 ting1 jat6 bei2 nei5」= zan1, 「ngo5 zan6 gaan1 bei2 nei5」= ho2 nang4 m4 bei2?", "mandarin": "就是说「我明天给你」=真，「我待会给你」=可能不给？" },
                { "speaker": "Sarah", "text": "聰明！", "jyutping": "cung1 ming4!", "mandarin": "聪明！" }
              ]
            },
            {
              "name": "第三幕：进阶俚语",
              "location": "餐厅",
              "lines": [
                { "speaker": "你", "text": "仲有冇啲高級啲嘅slang？", "jyutping": "zung6 jau5 mou5 di1 gou1 kap1 di1 ge3 slang?", "mandarin": "还有没有一些高级点的俚语？" },
                { "speaker": "Ken", "text": "「呢件事好化學」= 呢件事好脆弱/好易出事。", "jyutping": "「ni1 gin6 si6 hou2 faa3 hok6」= ni1 gin6 si6 hou2 ceoi3 joek6 / hou2 ji6 ceot1 si6.", "mandarin": "「这件事很化学」= 这件事很脆弱/很容易出事。" },
                { "speaker": "Sarah", "text": "「佢好世界」= 佢好有錢，唔憂做。", "jyutping": "「keoi5 hou2 sai3 gaai3」= keoi5 hou2 jau5 cin2, m4 jau1 zou6.", "mandarin": "「他好世界」= 他很有钱，不愁工作。" },
                { "speaker": "你", "text": "世界=錢？！", "jyutping": "sai3 gaai3 = cin2?!", "mandarin": "世界=钱？！" },
                { "speaker": "Sarah", "text": "係㗎，「搵世界」=搵錢。", "jyutping": "hai6 gaa3, 「wan2 sai3 gaai3」= wan2 cin2.", "mandarin": "是的，「找世界」=挣钱。" },
                { "speaker": "Ken", "text": "「放佢入雪櫃」= 冷處理佢，唔理佢，唔俾嘢佢做。", "jyutping": "「fong3 keoi5 jap6 syut3 gwai6」= laang5 cyu2 lei5 keoi5, m4 lei5 keoi5, m4 bei2 je5 keoi5 zou6.", "mandarin": "「放他进冰箱」= 冷处理他，不理他，不给他活干。" },
                { "speaker": "你", "text": "放入雪櫃？！好搞鬼。", "jyutping": "fong3 jap6 syut3 gwai6?! hou2 gaau2 gwai2.", "mandarin": "放冰箱？！好搞笑。" },
                { "speaker": "Sarah", "text": "仲有「呢條數好犀利」——即係呢筆數好大/好勁。", "jyutping": "zung6 jau5 「ni1 tiu4 sou3 hou2 sai1 lei6」——zik1 hai6 ni1 bat1 sou3 hou2 daai6 / hou2 ging6.", "mandarin": "还有「这笔数好犀利」——就是这笔数额很大/很厉害。" },
                { "speaker": "你", "text": "好犀利我都識——即係好勁。", "jyutping": "hou2 sai1 lei6 ngo5 dou1 sik1——zik1 hai6 hou2 ging6.", "mandarin": "好犀利我也会——就是很厉害。" },
                { "speaker": "Ken", "text": "你而家已經聽得明八九成啦，正式係香港人了！", "jyutping": "nei5 ji4 gaa1 ji5 ging1 teng1 dak1 ming4 baat3 gau2 sing4 laa1, zing3 sik1 hai6 hoeng1 gong2 jan4 liu5!", "mandarin": "你现在已经能听懂八九成了，正式是香港人了！" },
                { "speaker": "你", "text": "哈哈，多謝兩位師父！", "jyutping": "haa1 haa1, do1 ze6 loeng5 wai2 si1 fu2!", "mandarin": "哈哈，谢谢两位师父！" },
                { "speaker": "Sarah", "text": "唔客氣！聽日再教你多啲。", "jyutping": "m4 haak3 hei3! ting1 jat6 zoi3 gaau3 nei5 do1 di1.", "mandarin": "不客气！明天再教你多一些。" }
              ]
            }
          ]
        },
        {
          "type": "vocabulary",
          "title": "核心词汇",
          "words": [
            { "word": "chur", "jyutping": "co4", "mandarin": "辛苦/赶/压力大", "mnemonic": "chur", "scene": "「呢個project好chur」", "enteringTone": false },
            { "word": "奄尖", "jyutping": "am1 zim1", "mandarin": "挑剔/难伺候", "mnemonic": "奄尖", "scene": "「個客好奄尖」", "enteringTone": false },
            { "word": "放飛機", "jyutping": "fong3 fei1 gei1", "mandarin": "失约/爽约", "mnemonic": "放飞机", "scene": "「佢又放飛機」", "enteringTone": false },
            { "word": "hea", "jyutping": "hea3", "mandarin": "敷衍/随便/懒散", "mnemonic": "hea", "scene": "「做嘢好hea」", "enteringTone": false },
            { "word": "化學", "jyutping": "faa3 hok6", "mandarin": "脆弱/易出事", "mnemonic": "化学", "scene": "「呢個system好化學」", "enteringTone": true },
            { "word": "好世界", "jyutping": "hou2 sai3 gaai3", "mandarin": "有钱/条件好", "mnemonic": "好世界", "scene": "「佢好世界」", "enteringTone": false },
            { "word": "搵世界", "jyutping": "wan2 sai3 gaai3", "mandarin": "赚钱", "mnemonic": "搵世界", "scene": "「出去搵世界」", "enteringTone": false },
            { "word": "放雪櫃", "jyutping": "fong3 syut3 gwai6", "mandarin": "冷处理/冷藏", "mnemonic": "放雪柜", "scene": "「被放咗入雪櫃」", "enteringTone": true },
            { "word": "犀利", "jyutping": "sai1 lei6", "mandarin": "厉害/牛", "mnemonic": "犀利", "scene": "「呢條數好犀利」", "enteringTone": false },
            { "word": "OIC", "jyutping": "—", "mandarin": "Oh I See 明白了", "mnemonic": "OIC", "scene": "聊天回应", "enteringTone": false },
            { "word": "搞鬼", "jyutping": "gaau2 gwai2", "mandarin": "搞笑/有趣", "mnemonic": "搞鬼", "scene": "「好搞鬼㗎」", "enteringTone": false },
            { "word": "跟進 / follow up", "jyutping": "gan1 zeon3 / follow up", "mandarin": "跟进", "mnemonic": "跟进", "scene": "口頭禪，真假看deadline", "enteringTone": false }
          ]
        },
        {
          "type": "grammar",
          "title": "语法/表达",
          "patterns": [
            {
              "name": "句型1：___=___，即係___（___=___，就是___）",
              "usage": "解释俚语的教学句式，也是你听不懂时请对方解释的句式",
              "examples": [
                { "canto": "chur = 辛苦，即係好stressful。", "jyutping": "chur = san1 fu2, zik1 hai6 hou2 stressful.", "mandarin": "chur = 累，就是压力很大。" },
                { "canto": "奄尖 = 挑剔，即係好難服侍。", "jyutping": "am1 zim1 = tiu1 tik1, zik1 hai6 hou2 naan4 fuk6 si6.", "mandarin": "奄尖 = 挑剔，就是很难伺候。" },
                { "canto": "放雪櫃 = 冷處理，即係暫時唔理佢。", "jyutping": "fong3 syut3 gwai6 = laang5 cyu2 lei5, zik1 hai6 zaam6 si4 m4 lei5 keoi5.", "mandarin": "放雪柜 = 冷处理，就是暂时不理他。" }
              ]
            },
            {
              "name": "句型2：有deadline就係真，冇deadline就係客氣",
              "usage": "判别香港职场「口头禅」的真伪——最实用的生存法则",
              "examples": [
                { "canto": "佢話「我陣間俾你」——冇deadline？即係客氣。", "jyutping": "keoi5 waa6 「ngo5 zan6 gaan1 bei2 nei5」——mou5 deadline? zik1 hai6 haak3 hei3.", "mandarin": "他说「我待会给你」——没deadline？那就是客气话。" },
                { "canto": "佢話「我聽日俾你」——有deadline？即係真。", "jyutping": "keoi5 waa6 「ngo5 ting1 jat6 bei2 nei5」——jau5 deadline? zik1 hai6 zan1.", "mandarin": "他说「我明天给你」——有deadline？那就是真的。" },
                { "canto": "佢話「我搵日約你食飯」——冇日期？即係唔會發生。", "jyutping": "keoi5 waa6 「ngo5 wan2 jat6 joek3 nei5 sik6 faan6」——mou5 jat6 kei4? zik1 hai6 m4 wui5 faat3 sang1.", "mandarin": "他说「我改天约你吃饭」——没日期？那就是不会发生。" }
              ]
            }
          ]
        },
        {
          "type": "culture",
          "title": "文化小知识",
          "items": [
            {
              "title": "「我陣間俾你」— 香港辦公室最大謊言",
              "icon": "🗣️",
              "content": "這是香港職場最經典的「白色謊言排行榜」第一名。其他常見的還有：「我搵日約你食飯」「我遲啲send俾你」「我幫你跟進下」。這不是欺騙，而是一種禮貌的社交潤滑劑——當面拒絕太直接，說「我陣間俾你」給雙方留了面子。學會聽懂這些「客氣話」是融入香港職場的第一步。"
            },
            {
              "title": "Hea文化的精髓",
              "icon": "🛋️",
              "content": "「Hea」是香港職場最有代表性的俚語之一。它可以形容狀態（「今日好hea」=今天好闲）、態度（「做嘢好hea」=做事不认真）、建議（「今晚hea下」=今晚放鬆一下）。在香港職場，你可以說「今日好hea」但不能說「我份工好hea」——後者等於說自己的工作沒價值，對老闆來說是紅旗。"
            },
            {
              "title": "「放人入雪櫃」是真實存在的職場手段",
              "icon": "❄️",
              "content": "香港公司確實有「放雪櫃」的做法——不炒你，但不给你重要工作、不讓你參加會議、慢慢邊緣化你，直到你自己走。這是一種避免支付遣散費的常見手段。如果你發現自己被「放雪櫃」了，要麼直接跟上司開誠布公地談，要麼開始找新工。俚語不只是語言，也是職場的預警系統。"
            }
          ]
        },
        {
          "type": "practice",
          "title": "即时练习",
          "exercises": [
            {
              "type": "dialogue_simulation",
              "title": "角色扮演——俚语理解",
              "description": "根據場景選擇正確的粵語回應",
              "scenes": [
                {
                  "scene": "場景A：同事話「呢個project好chur」，係咩意思？",
                  "options": [
                    { "text": "項目很辛苦/壓力大", "correct": true },
                    { "text": "项目很顺利", "correct": false, "reason": "相反含义" },
                    { "text": "项目预算很多", "correct": false, "reason": "误解" }
                  ]
                },
                {
                  "scene": "場景B：同事話「我搵日約你食飯」但冇講幾時，意思係？",
                  "options": [
                    { "text": "客氣說話，唔會真係約", "correct": true },
                    { "text": "一定会约你", "correct": false, "reason": "太天真" },
                    { "text": "他在试探你", "correct": false, "reason": "过度解读" }
                  ]
                }
              ]
            },
            {
              "type": "fill_in",
              "title": "填空翻譯",
              "description": "把以下普通话翻译成粤语俚语",
              "items": [
                { "question": "好累/好赶 → 好___", "answer": "chur" },
                { "question": "很挑剔 → 好___", "answer": "奄尖" },
                { "question": "被冷處理 → 被放___", "answer": "雪櫃" },
                { "question": "爽约 → ___", "answer": "放飛機" }
              ]
            },
            {
              "type": "listening_matching",
              "title": "聽力配對",
              "description": "播放以下3句粤语录音，选择对应的普通话翻译",
              "items": [
                { "canto": "呢個project好chur，即係好stressful。", "mandarin": "这个项目很赶，就是压力很大。" },
                { "canto": "有deadline就係真，冇deadline就係客氣。", "mandarin": "有截止日期就是真的，没截止日期就是客气。" },
                { "canto": "佢好世界，唔憂做。", "mandarin": "他很有钱，不愁工作。" }
              ]
            }
          ]
        }
      ]
    })
  }
];

const insertCourse = db.prepare(
  'INSERT OR REPLACE INTO courses (id, title, level, order_index, description, content_json, difficulty_label) VALUES (?, ?, ?, ?, ?, ?, ?)'
);

for (const c of courses) {
  insertCourse.run(c.id, c.title, c.level, c.order_index, c.description, c.content_json, c.difficulty_label);
}

// ===================== Questions =====================
const questions = [
  // L1-1 办公室问候 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 1, type: 'choice', question_json: JSON.stringify({ question: '前台Amy同你講「早晨！你係新嚟嗰位同事呀？」，你應該答？', options: ['係呀，我今日第一日返工，多多指教。', '我唔係新嚟㗎。', '你好，请问财务部在哪？', '我唔識你。'], correct: 0, explanation: '第一天上班遇到同事问候，要礼貌回应并自我介绍。「係呀」=是的，「多多指教」=请多关照' }), difficulty: 1 },
  { course_id: 1, type: 'choice', question_json: JSON.stringify({ question: '同事Ken話「等陣我帶你行一圈」，佢嘅意思係？', options: ['等会儿带你转一圈熟悉环境', '带你去吃饭', '带你出去玩', '带你回家'], correct: 0, explanation: '「行一圈」=走一圈/转一圈，是带新人熟悉公司的常用说法' }), difficulty: 1 },
  { course_id: 1, type: 'fill', question_json: JSON.stringify({ question: '麻烦别人后表示感谢，粤语说「____」', answer: '唔該晒', hint: 'm4 goi1 saai3，比「唔該」更强烈的感谢' }), difficulty: 1 },
  { course_id: 1, type: 'fill', question_json: JSON.stringify({ question: '「交____我啦！」表示主动承接任务（填粤语词）', answer: '畀', hint: 'bei2，表示"给"的意思' }), difficulty: 1 },
  { course_id: 1, type: 'matching', question_json: JSON.stringify({ question: '将「隔籬位」配对正确的普通话释义', pairs: [{ canto: '隔籬位', mandarin: '隔壁工位' }], options: ['隔壁工位', '请进来', '新来的', '请多关照'], correct: 0, explanation: '「隔籬位」=隔壁工位（gaak3=隔，lei4=籬，wai2=位）' }), difficulty: 1 },
  { course_id: 1, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '我係新嚟㗎，請多多指教。', options: ['我是新来的，请多多关照。', '我来很久了，不用客气。', '我是老板，请多关照。', '我今天请假了。'], correct: 0, explanation: '「我係新嚟㗎」=我是新来的（「係…㗎」强调确认），「請多多指教」=请多关照' }), difficulty: 1 },
  // L1-2 自我介绍 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 2, type: 'choice', question_json: JSON.stringify({ question: '香港職場自我介紹，以下邊種講法最自然？', options: ['大家好，我叫阿Ken，喺財務部做。', '各位先生女士，我是陳健華先生。', 'Hello everyone, my name is Ken。', '喂，我係新嚟㗎。'], correct: 0, explanation: '香港职场自我介绍用英文名+粤语最自然。「喺財務部做」=在财务部工作' }), difficulty: 1 },
  { course_id: 2, type: 'choice', question_json: JSON.stringify({ question: '同事問你「你做咗幾耐？」，最適合嘅回答係？', options: ['做咗三年。', '我今年30歲。', '我好鍾意做嘢。', '聽日開始做。'], correct: 0, explanation: '「做咗幾耐」=做了多久，回答工作年限即可。「做咗三年」=做了三年' }), difficulty: 1 },
  { course_id: 2, type: 'fill', question_json: JSON.stringify({ question: '「我___財務部做。」填入正確的粵語詞（表示「在」）', answer: '喺', hint: 'hai2，表示位置，「喺」不是「係」' }), difficulty: 1 },
  { course_id: 2, type: 'fill', question_json: JSON.stringify({ question: '拜託別人幫忙後要說「____晒」表示感謝', answer: '唔該', hint: 'm4 goi1，注意與「多謝」的區別' }), difficulty: 1 },
  { course_id: 2, type: 'matching', question_json: JSON.stringify({ question: '將「我哋」配對正確的普通話翻譯', pairs: [{ canto: '我哋', mandarin: '我们' }], options: ['我们', '你们', '他们', '自己'], correct: 0, explanation: '「哋」(dei6)是粤语复数标记，「我哋」=我们，「你哋」=你们，「佢哋」=他们' }), difficulty: 1 },
  { course_id: 2, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '我負責FICO module，做咗大概三年。', options: ['我负责FICO模块，做了大概三年。', '我负责HR模块，刚开始做。', '我不负责任何模块，做了五年。', '我是做IT的，做了两年。'], correct: 0, explanation: '「負責」=负责，「做咗大概三年」=做了大概三年，这是介绍自己职责和经验的常用说法' }), difficulty: 1 },
  // L1-3 数字与日期 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 3, type: 'choice', question_json: JSON.stringify({ question: '同事說「下個禮拜三下午兩點開會」，是星期幾幾點？', options: ['週三下午2點', '週二下午2點', '週三下午3點', '週四下午2點'], correct: 0, explanation: '「下個禮拜三」=下周星期三，「兩點」=2点，所以是周三下午2点' }), difficulty: 1 },
  { course_id: 3, type: 'choice', question_json: JSON.stringify({ question: 'vendor報價「一萬二千五百蚊」，是多少錢？', options: ['$12,500', '$1,250', '$125,000', '$12,050'], correct: 0, explanation: '「一萬」=10,000，「二千」=2,000，「五百」=500，加起來=12,500' }), difficulty: 1 },
  { course_id: 3, type: 'fill', question_json: JSON.stringify({ question: '你什么时候有空 → 粵語：你___得閒？', answer: '幾時', hint: 'gei2 si4，询问时间的疑问词' }), difficulty: 1 },
  { course_id: 3, type: 'fill', question_json: JSON.stringify({ question: '周五之前要交 → 粵語：星期五之前___交。', answer: '要', hint: 'jiu3，表示「需要/必须」' }), difficulty: 1 },
  { course_id: 3, type: 'matching', question_json: JSON.stringify({ question: '將「下個禮拜」配對正確的普通話翻譯', pairs: [{ canto: '下個禮拜', mandarin: '下周' }], options: ['下周', '上周', '本周', '下个月'], correct: 0, explanation: '「禮拜」=星期，「下」=下一個，「下個禮拜」=下周。粤语用「禮拜」比「星期」更口语化' }), difficulty: 1 },
  { course_id: 3, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '十二點半見，到時見。', options: ['十二点半见，到时候见。', '十二点见，明天见。', '两点半见，到时候见。', '十二点半，早点来。'], correct: 0, explanation: '「十二點半」=十二点半，「到時見」=到时候见，这是约好时间后的常用结束语' }), difficulty: 1 },
  // L1-4 电话基本用语 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 4, type: 'choice', question_json: JSON.stringify({ question: '接電話時，對方說「請問阿輝喺唔喺度？」，你應該理解成？', options: ['请问阿辉在不在？', '请问阿辉是谁？', '阿辉在哪里？', '阿辉什么时候回来？'], correct: 0, explanation: '「喺唔喺度」=在不在，是打電話找人的標準開場白' }), difficulty: 1 },
  { course_id: 4, type: 'choice', question_json: JSON.stringify({ question: '同事說「佢而家開緊會」，是甚麼意思？', options: ['他正在开会', '他开会结束了', '他明天开会', '他不用开会'], correct: 0, explanation: '「開緊會」=正在开会，「緊」表示進行時態' }), difficulty: 1 },
  { course_id: 4, type: 'fill', question_json: JSON.stringify({ question: '麻煩你同佢講，個contract我今日會___畀佢。（email/发邮件）', answer: 'email', hint: '香港職場直接用英文「email」嵌在粵語句子中' }), difficulty: 1 },
  { course_id: 4, type: 'fill', question_json: JSON.stringify({ question: '我可唔可以___低你個電話？（留/留下）', answer: '留', hint: 'lau4，留下聯絡方式' }), difficulty: 1 },
  { course_id: 4, type: 'matching', question_json: JSON.stringify({ question: '將「覆你」配對正確的普通話翻譯', pairs: [{ canto: '覆你', mandarin: '回复你' }], options: ['回复你', '打电话给你', '找你', '等你'], correct: 0, explanation: '「覆」(fuk1)=回复，港式职场极高频词，「覆你」=回复你' }), difficulty: 1 },
  { course_id: 4, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '佢而家開緊會，你可唔可以遲啲再打嚟？', options: ['他正在开会，你可不可以晚点再打来？', '他现在有空，你快点打来。', '他今天请假了，你明天打来。', '他在吃午饭，你下午打来。'], correct: 0, explanation: '「開緊會」=正在开会，「遲啲」=晚点，「打嚟」=打来' }), difficulty: 1 },
  // L1-5 公司组织架构称谓 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 5, type: 'choice', question_json: JSON.stringify({ question: '同事話「Thomas係IT部嘅head，阿Ken係佢嘅下屬」，以下哪個是對的？', options: ['Thomas是Ken的上司', 'Ken是Thomas的上司', 'Thomas和Ken是平級', '他們在不同部門'], correct: 0, explanation: '「head」=负责人，「下屬」=下属，所以Thomas是Ken的上司' }), difficulty: 1 },
  { course_id: 5, type: 'choice', question_json: JSON.stringify({ question: '你要跟財務部負責人打招呼，以下哪個是香港職場最合適的稱呼？', options: ['早晨，張生！', '早晨，張國強！', '早晨，張總！', '餵！'], correct: 0, explanation: '香港不叫「X總」，正式場合用「[姓氏]生/[姓氏]小姐」最得體。直接叫全名不禮貌' }), difficulty: 1 },
  { course_id: 5, type: 'fill', question_json: JSON.stringify({ question: '财务部的粤语是___部。', answer: '財務', hint: 'coi4 mou6，香港公司最常见的部门之一' }), difficulty: 1 },
  { course_id: 5, type: 'fill', question_json: JSON.stringify({ question: '人力资源部常直接叫___。', answer: 'HR', hint: '用英文缩写，这是香港职场习惯' }), difficulty: 1 },
  { course_id: 5, type: 'matching', question_json: JSON.stringify({ question: '將「話事」配對正確的普通話翻譯', pairs: [{ canto: '話事', mandarin: '说了算/做主' }], options: ['说了算/做主', '说话', '做事', '开会'], correct: 0, explanation: '「話事」(waa6 si6)=做主、说了算，「邊個話事」=谁说了算' }), difficulty: 1 },
  { course_id: 5, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '佢係我嘅直接上司。', options: ['他是我的直接上级。', '他是我的同事。', '他是我的下属。', '他是我的老板。'], correct: 0, explanation: '「直接上司」=直接上级，即direct manager/reporting manager' }), difficulty: 1 },
  // L1-6 电邮基本用语 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 6, type: 'choice', question_json: JSON.stringify({ question: '你要寫email給同事Wilson，以下哪個開頭最適合香港職場？', options: ['Hello Wilson,', '尊敬的Wilson先生：', '喂Wilson,', '致Wilson：'], correct: 0, explanation: '香港email不用「尊敬的」或「致」，用「Hello/Dear + 英文名」最自然' }), difficulty: 1 },
  { course_id: 6, type: 'choice', question_json: JSON.stringify({ question: '你發email給供應商確認交貨時間，以下哪個做法最合適？', options: ['CC你的Manager讓他知情', 'CC全公司所有人', '不CC任何人，自己搞定', 'CC你的競爭對手'], correct: 0, explanation: 'CC相關同事即可，CC經理讓其知情是正常的。不要CC全世界' }), difficulty: 1 },
  { course_id: 6, type: 'fill', question_json: JSON.stringify({ question: '请查收附件 → 粵語：請___附件。', answer: '查收', hint: 'caa4 sau1，寄附件時的標準用語' }), difficulty: 1 },
  { course_id: 6, type: 'fill', question_json: JSON.stringify({ question: '请尽快回复 → 粵語：請儘快___。', answer: '回覆', hint: 'wui4 fuk1，注意「覆」比「回」更地道' }), difficulty: 1 },
  { course_id: 6, type: 'matching', question_json: JSON.stringify({ question: '將「請查收」配對正確的普通話翻譯', pairs: [{ canto: '請查收', mandarin: '请查收' }], options: ['请查收', '请回复', '请转发', '请发送'], correct: 0, explanation: '「請查收」(ceng2 caa4 sau1)=请查收，是发附件时的标准用语' }), difficulty: 1 },
  { course_id: 6, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '請查收附件，有問題隨時覆我。', options: ['请查收附件，有问题随时回复我。', '请删除附件，有问题找别人。', '请打印附件，明天给我。', '请忽略附件，不用回复。'], correct: 0, explanation: '「請查收」=请查收，「覆我」=回复我，这是发邮件时的常用句' }), difficulty: 1 },
  // L2-1 茶水间闲聊 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 7, type: 'choice', question_json: JSON.stringify({ question: '同事問你「今日帶唔帶飯呀？」，最合適的回應係？', options: ['係呀，帶咗飯。', '我带饭了。', '冇呀，等陣落街買。', '你管我？'], correct: 0, explanation: '「帶咗飯」=带了饭，用粤语回应最自然' }), difficulty: 2 },
  { course_id: 7, type: 'choice', question_json: JSON.stringify({ question: '同事說「尋日落狗屎」，意思是什麼？', options: ['昨天下暴雨', '昨天有狗屎在路上', '昨天很熱', '昨天很冷'], correct: 0, explanation: '「落狗屎」=下暴雨，是非常口語化的香港天氣表達' }), difficulty: 2 },
  { course_id: 7, type: 'fill', question_json: JSON.stringify({ question: '今天好累 → 今日好___。', answer: '攰', hint: 'gui6，做咗成日嘢嘅感覺' }), difficulty: 2 },
  { course_id: 7, type: 'fill', question_json: JSON.stringify({ question: '好不好吃 → 好唔好___㗎？', answer: '食', hint: 'sik6，问食物好不好吃' }), difficulty: 2 },
  { course_id: 7, type: 'matching', question_json: JSON.stringify({ question: '將「是但啦」配對正確的普通話翻譯', pairs: [{ canto: '是但啦', mandarin: '随便啦' }], options: ['随便啦', '一定啦', '不行', '绝对不行'], correct: 0, explanation: '「是但啦」=随便啦，是香港人高频口头禅' }), difficulty: 2 },
  { course_id: 7, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '今日好塞車，所以我搭地鐵。', options: ['今天很堵车，所以我坐地铁。', '今天很热，所以我开车。', '今天下雨，所以我不出门。', '今天很顺，所以我坐巴士。'], correct: 0, explanation: '「塞車」=堵车，「搭地鐵」=坐地铁' }), difficulty: 2 },
  // L2-2 约会议时间 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 8, type: 'choice', question_json: JSON.stringify({ question: '同事問「聽日三點得唔得？」，你OK，該怎麼回？', options: ['得，冇問題。', '好的可以。', '等等我看看。', '你等通知啦。'], correct: 0, explanation: '「得，冇問題」是粤语中确认时间的标准回应' }), difficulty: 2 },
  { course_id: 8, type: 'choice', question_json: JSON.stringify({ question: '你想約同事星期五開會，他說星期五好忙，你該怎麼說？', options: ['可唔可以改星期四？', '那你什么时候有空？', '星期五不行就算了吧。', '我不管，就星期五。'], correct: 0, explanation: '「可唔可以改星期四？」用粤语礼貌地提出改期建议' }), difficulty: 2 },
  { course_id: 8, type: 'fill', question_json: JSON.stringify({ question: '你什么时候有空 → 你幾時___？', answer: '得閒', hint: 'dak1 haan4，廣東話生存級詞' }), difficulty: 2 },
  { course_id: 8, type: 'fill', question_json: JSON.stringify({ question: '半小时够不够 → 半個鐘___？', answer: '夠唔夠', hint: 'gau3 m4 gau3，确认时间是否足够' }), difficulty: 2 },
  { course_id: 8, type: 'matching', question_json: JSON.stringify({ question: '將「改期」配對正確的普通話翻譯', pairs: [{ canto: '改期', mandarin: '改日期/重新安排' }], options: ['改日期/重新安排', '取消', '确认', '开始'], correct: 0, explanation: '「改期」(goi2 kei4)=改变日期/重新安排' }), difficulty: 2 },
  { course_id: 8, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '星期五四點半得唔得？', options: ['周五四点半行不行？', '周四三点半行不行？', '周五五点半行不行？', '周三四点半行不行？'], correct: 0, explanation: '「星期五」=周五，「四點半」=四点半，「得唔得」=行不行' }), difficulty: 2 },
  // L2-3 请假 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 9, type: 'choice', question_json: JSON.stringify({ question: '你感冒發燒要請病假，應該怎麼跟Manager說？', options: ['張Manager，我今日想請日病假，睇咗醫生話要休息。', '老闆我不舒服，今天不上班了。', '我今天请假。', '我不干了。'], correct: 0, explanation: '要用粤语礼貌地请假，说明原因（看了医生）' }), difficulty: 2 },
  { course_id: 9, type: 'choice', question_json: JSON.stringify({ question: '申請年假時，Manager最可能問什麼？', options: ['你check咗仲有幾多日annual leave未？', '你去哪裡玩？', '為什麼請假？', '你幾多歲？'], correct: 0, explanation: '香港Manager通常先確認你的年假餘額是否足夠' }), difficulty: 2 },
  { course_id: 9, type: 'fill', question_json: JSON.stringify({ question: '我想请一天病假 → 我想請___病假。', answer: '日', hint: 'jat6，粤语说「一日」=一天' }), difficulty: 2 },
  { course_id: 9, type: 'fill', question_json: JSON.stringify({ question: '医生证明 → 粤語叫___。', answer: '醫生紙', hint: 'ji1 sang1 zi2，請病假必須提供' }), difficulty: 2 },
  { course_id: 9, type: 'matching', question_json: JSON.stringify({ question: '將「年假」配對正確的普通話翻譯', pairs: [{ canto: '年假', mandarin: '年假/Annual leave' }], options: ['年假/Annual leave', '病假', '事假', '补假'], correct: 0, explanation: '「年假」(nin4 gaa3)=年假，即Annual leave' }), difficulty: 2 },
  { course_id: 9, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '你休息多啲，飲多啲水。', options: ['你多休息，多喝水。', '你多工作，少喝水。', '你快回来上班。', '你去看医生。'], correct: 0, explanation: '「休息多啲」=多休息，「飲多啲水」=多喝水，这是港式标准关怀' }), difficulty: 2 },
  // L2-4 收发室与快递 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 10, type: 'choice', question_json: JSON.stringify({ question: '你去收发室取快递，第一句應該說什麼？', options: ['唔該，我想攞個快遞。', '我来拿快递。', '有我的快递吗？', '喂！'], correct: 0, explanation: '「唔該，我想攞個快遞」=劳驾，我想取个快递，是标准开场白' }), difficulty: 2 },
  { course_id: 10, type: 'choice', question_json: JSON.stringify({ question: '你要寄一份明天必須送到的合同，應該叫快遞用什麼服務？', options: ['特快，聽日要送到。', '標準就得。', '慢慢送冇所謂。', '不寄了。'], correct: 0, explanation: '寄急件要說明是「特快」並強調「聽日要送到」' }), difficulty: 2 },
  { course_id: 10, type: 'fill', question_json: JSON.stringify({ question: '取快递 → ___快遞', answer: '攞', hint: 'lo2，拿/取的意思' }), difficulty: 2 },
  { course_id: 10, type: 'fill', question_json: JSON.stringify({ question: '签收 → 簽___', answer: '收', hint: 'sau1，签收快递的标准动作' }), difficulty: 2 },
  { course_id: 10, type: 'matching', question_json: JSON.stringify({ question: '將「急件」配對正確的普通話翻譯', pairs: [{ canto: '急件', mandarin: '急件/紧急文件' }], options: ['急件/紧急文件', '普通文件', '包裹', '信件'], correct: 0, explanation: '「急件」(gap1 gin2)=急件/紧急文件，需要用特快服务' }), difficulty: 2 },
  { course_id: 10, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '公司用開順豐，你call佢哋上門收就得。', options: ['公司一直用顺丰，你叫他们上门取件就行。', '公司不用顺丰，你自己送去。', '公司用顺丰，但要自己下单。', '公司用EMS，不用顺丰。'], correct: 0, explanation: '「用開」=一直用，「call佢哋」=叫他们，「上門收」=上门取件' }), difficulty: 2 },
  // L2-5 同事聚餐 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 11, type: 'choice', question_json: JSON.stringify({ question: '你想多吃一盤牛肉，該怎麼說？', options: ['可以叫多碟牛嗎？', '再來一盤牛肉。', '我要牛肉。', '随便。'], correct: 0, explanation: '「可以叫多碟牛嗎？」用「碟」表示一盘，且礼貌询问' }), difficulty: 2 },
  { course_id: 11, type: 'choice', question_json: JSON.stringify({ question: '同事問你怎麼付款，以下哪個香港最常見？', options: ['我轉數快俾你。', '我微信俾你。', '支付寶。', '我欠着。'], correct: 0, explanation: '香港最普及的是轉數快(FPS)，微信支付和支付寶不常用' }), difficulty: 2 },
  { course_id: 11, type: 'fill', question_json: JSON.stringify({ question: '结账 → 粵語：___', answer: '埋單', hint: 'maai4 daan1，吃完饭叫服务员结账' }), difficulty: 2 },
  { course_id: 11, type: 'fill', question_json: JSON.stringify({ question: '好好吃 → 粵語：好好___', answer: '食', hint: 'sik6，赞美食物的最高级' }), difficulty: 2 },
  { course_id: 11, type: 'matching', question_json: JSON.stringify({ question: '將「分單」配對正確的普通話翻譯', pairs: [{ canto: '分單', mandarin: 'AA制/分开付' }], options: ['AA制/分开付', '一个人付', '请客', '打折'], correct: 0, explanation: '「分單」(fan1 daan1)=分开付/AA制，香港聚餐默认方式' }), difficulty: 2 },
  { course_id: 11, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '我埋單然後大家轉數快俾我。', options: ['我结账然后大家转数快给我。', '大家结账然后我转数快给你们。', '我不结账你们自己来。', '我来请客不用给钱。'], correct: 0, explanation: '「我埋單」=我结账，「大家轉數快俾我」=大家转数快给我' }), difficulty: 2 },
  // L2-6 办公设备报修 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 12, type: 'choice', question_json: JSON.stringify({ question: '打印機卡紙了，你該怎麼跟IT同事說？', options: ['唔該，我部printer卡咗紙。', '打印機坏了。', '喂，打印機不能用了。', '你过来看看。'], correct: 0, explanation: '「唔該」开头礼貌，「卡咗紙」准确描述问题，中英夹杂很自然' }), difficulty: 2 },
  { course_id: 12, type: 'choice', question_json: JSON.stringify({ question: 'IT同事叫你試試重啟電腦，他說的是什麼？', options: ['你試下restart先。', '你關機再開機。', '你重新啟動系統。', '你自己想辦法。'], correct: 0, explanation: '「你試下restart先」是港式IT万能答案，中英夹杂最自然' }), difficulty: 2 },
  { course_id: 12, type: 'fill', question_json: JSON.stringify({ question: '打印机卡纸 → 部printer___紙', answer: '卡咗', hint: 'kaa1 zo2，卡住了' }), difficulty: 2 },
  { course_id: 12, type: 'fill', question_json: JSON.stringify({ question: '空调不冷 → 冷氣唔係好___', answer: '凍', hint: 'dung3，冷/冻的意思' }), difficulty: 2 },
  { course_id: 12, type: 'matching', question_json: JSON.stringify({ question: '將「搞掂」配對正確的普通話翻譯', pairs: [{ canto: '搞掂', mandarin: '搞定/修好了' }], options: ['搞定/修好了', '坏了', '卡住了', '开始'], correct: 0, explanation: '「搞掂」(gaau2 dim6)=搞定/修好了，香港职场极高频词' }), difficulty: 2 },
  { course_id: 12, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '冷氣唔係好凍，我叫師傅聽日上嚟睇下。', options: ['空调不太冷，我叫师傅明天上来看看。', '空调太冷了，我叫师傅明天关掉。', '空调坏了，今天修不好。', '空调很好，不用修。'], correct: 0, explanation: '「唔係好凍」=不太冷，「師傅」=师傅，「聽日上嚟睇下」=明天上来看看' }), difficulty: 2 },
  // L3-1 部门会议发言 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 13, type: 'choice', question_json: JSON.stringify({ question: 'Manager問你closing進度，以下邊個回應最好？', options: ['而家做緊，大致順利，預計週五前完成。', '做緊，未有問題。', '很順利。', '好的。'], correct: 0, explanation: '會議發言要用「三明治法則」：先說結論（好消息）→再給時間線，方便Manager做決策' }), difficulty: 3 },
  { course_id: 13, type: 'choice', question_json: JSON.stringify({ question: '同事提出concern，你同意佢，最專業嘅回應係？', options: ['我同意Sarah嘅concern。', '他說得對。', '我也是這麼想的。', '好吧。'], correct: 0, explanation: '「我同意___嘅concern」是附議同事的專業表達，用粤語+英文單詞最自然' }), difficulty: 3 },
  { course_id: 13, type: 'fill', question_json: JSON.stringify({ question: '我建議推遲兩星期 → 我建議push back兩___', answer: '星期', hint: 'sing1 kei4，表示週' }), difficulty: 3 },
  { course_id: 13, type: 'fill', question_json: JSON.stringify({ question: '我會持續更新進度 → 我會keep住___', answer: 'update', hint: '直接說英文，香港會議極高頻' }), difficulty: 3 },
  { course_id: 13, type: 'matching', question_json: JSON.stringify({ question: '將「匯報」配對正確的普通話翻譯', pairs: [{ canto: '匯報', mandarin: '汇报' }], options: ['汇报', '开会', '总结', '计划'], correct: 0, explanation: '「匯報」(wui6 bou3)=汇报，會議標準用語' }), difficulty: 3 },
  { course_id: 13, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '我建議push back兩星期，咁樣大家都唔使咁趕。', options: ['我建议推迟两周，这样大家都不用那么赶。', '我建议取消会议，这样大家都不用来了。', '我建议提前两周，这样大家都有时间。', '我建议这周开会，大家都来。'], correct: 0, explanation: '「push back」=推迟，「唔使咁趕」=不用那么赶，會議中提出建議的常用表達' }), difficulty: 3 },
  // L3-2 进度汇报 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 14, type: 'choice', question_json: JSON.stringify({ question: '匯報進度時，以下邊個開場最專業？', options: ['上個星期主要做咗training planning，進度OK。', '上星期做了培訓計劃。', 'training计划做好了。', '一切順利。'], correct: 0, explanation: '「主要做咗___」是總結已完成工作的標準開頭，用粤语最自然' }), difficulty: 3 },
  { course_id: 14, type: 'choice', question_json: JSON.stringify({ question: '供應商要delay一星期，你匯報時應該包含什麼？', options: ['問題原因 + 已做行動 + 建議方案', '只說「vendor delay了」', '等解決了再匯報', '直接叫Manager處理'], correct: 0, explanation: '香港Manager最怕只說問題不說方案。匯報黃金法則：好消息先講→壞消息→解決方案' }), difficulty: 3 },
  { course_id: 14, type: 'fill', question_json: JSON.stringify({ question: '遇到咩阻礙 → 有冇遇到咩___？', answer: '阻滯', hint: 'zo2 zai6，表示卡住/受阻的問題' }), difficulty: 3 },
  { course_id: 14, type: 'fill', question_json: JSON.stringify({ question: '我會追緊供應商 → 我會___供應商。', answer: '追緊', hint: 'zeoi1 gan2，正在跟進的意思' }), difficulty: 3 },
  { course_id: 14, type: 'matching', question_json: JSON.stringify({ question: '將「escalate」配對正確的普通話翻譯', pairs: [{ canto: 'escalate', mandarin: '升级/上报（给Manager）' }], options: ['升级/上报（给Manager）', '取消', '确认', '忽略'], correct: 0, explanation: '「escalate」=升級/上報，超出自己權限時要escalate給Manager，這是負責任的表現' }), difficulty: 3 },
  { course_id: 14, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '為咗唔影響整體進度，可以暫時用backup vendor頂住先。', options: ['为了不影响整体进度，可以暂时用备份供应商先顶着。', '因为影响了整体进度，临时取消供应商。', '为了加快进度，换一个新的供应商。', '进度没问题，供应商也正常。'], correct: 0, explanation: '「為咗唔影響」=为了不影响，「頂住先」=先顶着/先撑住，這是提出解決方案的經典說法' }), difficulty: 3 },
  // L3-3 请示上级 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 15, type: 'choice', question_json: JSON.stringify({ question: '你要找Manager請示問題，第一句點講最合適？', options: ['張Manager，有啲嘢想請示你。', '老闆，有個事。', '張Manager，你過來一下。', '喂！'], correct: 0, explanation: '「有啲嘢想請示你」是正式請示的標準開場白，比「我想問」更正式' }), difficulty: 3 },
  { course_id: 15, type: 'choice', question_json: JSON.stringify({ question: 'Manager問你「你覺得點做好？」，你應該點回？', options: ['我自己覺得hybrid mode最好，因為…', '我不知道，你決定吧。', '怎麼都行。', '你覺得呢？'], correct: 0, explanation: '帶方案請示：想好建議方案並說出理由，讓Manager做選擇，這是香港職場最受歡迎的請示方式' }), difficulty: 3 },
  { course_id: 15, type: 'fill', question_json: JSON.stringify({ question: '想請示你一件事 → 有啲嘢想___你', answer: '請示', hint: 'cing2 si6，正式向上級請示' }), difficulty: 3 },
  { course_id: 15, type: 'fill', question_json: JSON.stringify({ question: '二千蚊唔洗問我 → 二千蚊唔洗問___', answer: '我', hint: 'ngo5，Manager叫你自行決定時的回應' }), difficulty: 3 },
  { course_id: 15, type: 'matching', question_json: JSON.stringify({ question: '將「簽名」配對正確的普通話翻譯', pairs: [{ canto: '簽名', mandarin: '签名（即批准）' }], options: ['签名（即批准）', '打字', '打印', '寄出'], correct: 0, explanation: '「簽名」(cim1 meng2)=签名，香港職場中Manager簽名即代表批准文件' }), difficulty: 3 },
  { course_id: 15, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '二千蚊唔洗問我啦，你自己決定就得。二千以上先搵我簽。', options: ['两千块不用问我了，你自己决定就行。两千以上才找我签。', '两千块要问我，不能自己决定。', '两千块才找我签，以上不用问。', '所有金额都要问我。'], correct: 0, explanation: '這是Manager明確授權邊界的經典句式——多少錢以下自行決定，以上要審批' }), difficulty: 3 },
  // L3-4 跨部门协作 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 16, type: 'choice', question_json: JSON.stringify({ question: '你要找IT部同事協調時間，第一句點講最合適？', options: ['阿Ken，想同你傾下個migration安排。', '喂，migration的事你知道了嗎？', 'Ken，週一有空嗎？', '你過來一下。'], correct: 0, explanation: '「想同你傾下___」是跨部門開啟對話的客氣說法，先打招呼再說事' }), difficulty: 3 },
  { course_id: 16, type: 'choice', question_json: JSON.stringify({ question: '兩個部門嘅時間衝突咗，以下邊個說法最委婉專業？', options: ['時間上有啲撞，可唔可以改？', '不行，那天我有事。', '你改一下時間吧。', '我不來了。'], correct: 0, explanation: '「時間上有啲撞」委婉地表達時間衝突，然後用「可唔可以」禮貌地提出調整請求' }), difficulty: 3 },
  { course_id: 16, type: 'fill', question_json: JSON.stringify({ question: '我想同你傾下個安排 → 想同你___下個安排', answer: '傾', hint: 'king1，聊/談的意思' }), difficulty: 3 },
  { course_id: 16, type: 'fill', question_json: JSON.stringify({ question: '時間上有衝突 → 時間上有啲___', answer: '撞', hint: 'zong6，衝突/撞期的意思' }), difficulty: 3 },
  { course_id: 16, type: 'matching', question_json: JSON.stringify({ question: '將「共識」配對正確的普通話翻譯', pairs: [{ canto: '共識', mandarin: '共识/达成一致' }], options: ['共识/达成一致', '合同', '承诺', '协议'], correct: 0, explanation: '「共識」(gung6 sik1)=共识，「大家有共識」=达成一致，是kick-off meeting的目標' }), difficulty: 3 },
  { course_id: 16, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '大家有共識。如果有任何改動，我會即時通知大家。', options: ['大家达成一致。如果有任何改动，我会即时通知大家。', '大家有合同。如果有变动，不用通知。', '大家要记住。如果改动了，明天通知。', '大家来开会。如果有问题，下次再说。'], correct: 0, explanation: '「有共識」=达成一致，「即時通知」=即时通知，這是kick-off meeting結束時的標準收尾' }), difficulty: 3 },
  // L3-5 内部培训 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 17, type: 'choice', question_json: JSON.stringify({ question: '培訓開始時，以下邊個開場最專業？', options: ['大家早晨！今日分三個part，預計兩點鐘完成。', '我們開始上課。', '今天講FICO。', '開始吧。'], correct: 0, explanation: '培訓開場要包含：agenda（幾個part）+ 預計時間，讓同事知道今天要學什麼、多久' }), difficulty: 3 },
  { course_id: 17, type: 'choice', question_json: JSON.stringify({ question: '同事問咗一個你唔識嘅問題，最佳回應係？', options: ['好問題！我呢個冇確實答案，confirm返再答你。', '我不會。', '這個很簡單，你回去查一下。', '下次再講。'], correct: 0, explanation: '「好問題」先爭取思考時間，誠實說不會但承諾後續回覆，比你亂答一個錯誤答案好一萬倍' }), difficulty: 3 },
  { course_id: 17, type: 'fill', question_json: JSON.stringify({ question: '首先…接著…最後 → 首先…___…最後', answer: '跟住', hint: 'gan1 zyu6，表示接著' }), difficulty: 3 },
  { course_id: 17, type: 'fill', question_json: JSON.stringify({ question: '仲有冇其他問題 → 仲有冇其他___？', answer: '問題', hint: 'man6 tai4，Q&A環節的經典問句' }), difficulty: 3 },
  { course_id: 17, type: 'matching', question_json: JSON.stringify({ question: '將「實機操作」配對正確的普通話翻譯', pairs: [{ canto: '實機操作', mandarin: '实际操作/上机练习' }], options: ['实际操作/上机练习', '理论讲解', '小组讨论', '书面考试'], correct: 0, explanation: '「實機操作」(sat6 gei1 cou1 zok3)=實際在電腦上操作，是培訓中最有價值的部分' }), difficulty: 3 },
  { course_id: 17, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '今日嘅agenda分三個part，預計兩點鐘左右完成。首先，我簡單介紹下個PO流程。', options: ['今天的议程分三部分，预计两点左右完成。首先，我简单介绍下采购订单流程。', '今天开会分三组，两点钟开始。首先我介绍下公司。', '今天的加班分三次，两点后完成。首先我介绍下项目。', '今天的培训取消，两点下班。首先我出门。'], correct: 0, explanation: '「分三個part」=分三部分，「兩點鐘左右」=大概两点，「PO流程」=采购订单流程' }), difficulty: 3 },
  // L3-6 绩效面谈 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 18, type: 'choice', question_json: JSON.stringify({ question: 'Manager問你「你自己點睇過去半年？」，最佳回應係？', options: ['整體OK。ERP training做得好，不過跨部門溝通可以改善。', '都挺好的。', '我覺得我做得非常好。', '還行吧。'], correct: 0, explanation: '績效面談應用「三明治法則」——先說做得好的，再主動提可改進的，顯示self-awareness' }), difficulty: 3 },
  { course_id: 18, type: 'choice', question_json: JSON.stringify({ question: '你想提升presentation skill，點同Manager講最合適？', options: ['我想提升presentation skill，公司有冇training可以參加？', '我不會做presentation。', '幫我報個培訓班。', '沒什麼想提升的。'], correct: 0, explanation: '主動說想提升什麼並詢問公司資源，顯示積極進取，而不是抱怨或命令' }), difficulty: 3 },
  { course_id: 18, type: 'fill', question_json: JSON.stringify({ question: '我覺得培訓做得不錯 → 我覺得training做得幾___', answer: '好', hint: 'hou2，表示不錯的意思' }), difficulty: 3 },
  { course_id: 18, type: 'fill', question_json: JSON.stringify({ question: '有咩可以改進 → 有咩可以___？', answer: '改善', hint: 'goi2 sin6，Manager提改進意見的用詞' }), difficulty: 3 },
  { course_id: 18, type: 'matching', question_json: JSON.stringify({ question: '將「機會」配對正確的普通話翻譯', pairs: [{ canto: '機會', mandarin: '机会' }], options: ['机会', '机遇', '危险', '计划'], correct: 0, explanation: '「機會」(gei1 wui6)=机会，「呢個機會好難得」=这个机会很难得，面談中表達感恩的常用語' }), difficulty: 3 },
  { course_id: 18, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '我有個suggestion——下季有個新project，不如你試下做assistant project lead？', options: ['我有个建议——下季度有个新项目，不如你试试做助理项目负责人？', '我有个问题——下季度有新项目，你为什么要当负责人？', '我有个命令——下季度有新项目，你必须当负责人。', '我有个通知——下季度有项目，负责人是你。'], correct: 0, explanation: '「suggestion」=建议，「下季」=下季度，「assistant project lead」=助理项目负责人，Manager鼓勵員工發展的經典說法' }), difficulty: 3 },
  // L4-1 客户拜访寒暄 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 19, type: 'choice', question_json: JSON.stringify({ question: '第一次見客戶陳生，自我介紹時應該怎麼說？', options: ['陳生你好！我叫阿林，請多多指教。', '嗨，我是小林。', '你好，我是越秀的。', '你叫咩名？'], correct: 0, explanation: '初次見客戶要正式介紹自己的名字並表達敬意，「請多多指教」是香港職場標準用語' }), difficulty: 4 },
  { course_id: 19, type: 'choice', question_json: JSON.stringify({ question: '見客戶坐低之後，以下哪個寒喧話題最合適？', options: ['你哋公司呢排生意幾好喎。', '今天天氣好熱啊。', '你們公司有多少人？', '你幾多歲？'], correct: 0, explanation: '讚賞對方的業務狀況是最得體的寒暄話題，顯得你做過功課' }), difficulty: 4 },
  { course_id: 19, type: 'fill', question_json: JSON.stringify({ question: '谢谢您抽空出来 → 多謝你___出嚟', answer: '抽時間', hint: 'cau1 si4 gaan3，感謝對方撥冗' }), difficulty: 4 },
  { course_id: 19, type: 'fill', question_json: JSON.stringify({ question: '年轻有为 → 後生___', answer: '有為', hint: 'jau5 wai4，讚賞對方年少有成就' }), difficulty: 4 },
  { course_id: 19, type: 'matching', question_json: JSON.stringify({ question: '將「約咗」配對正確的普通話翻譯', pairs: [{ canto: '約咗', mandarin: '约好了' }], options: ['约好了', '取消了', '迟到了', '忘记了'], correct: 0, explanation: '「約咗」(joek3 zo2)=约好了，表示已有預約' }), difficulty: 4 },
  { course_id: 19, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '多謝你抽時間出嚟見我哋。不如我哋開始傾正題？', options: ['谢谢你抽空出来见我们。不如我们开始聊正题？', '谢谢你今天来拜访。我们下次再聊。', '对不起让你等这么久。我们走吧。', '谢谢你请我吃饭。我们聊点别的。'], correct: 0, explanation: '「多謝你抽時間出嚟」=谢谢你抽空出来，「傾正題」=聊正题' }), difficulty: 4 },
  // L4-2 商务会议主持 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 20, type: 'choice', question_json: JSON.stringify({ question: '會議時間到了，主持人應該怎麼開場？', options: ['時間差唔多，我哋開始啦。', '喂，開會啦。', '大家安靜，開始了。', '我們開會吧。'], correct: 0, explanation: '「時間差唔多，我哋開始啦」是香港會議最自然有力的開場，簡潔專業不拖泥帶水' }), difficulty: 4 },
  { course_id: 20, type: 'choice', question_json: JSON.stringify({ question: '客戶對timeline有異議時，最佳回應是？', options: ['明白。咁你覺得幾多星期比較合理？', '不行，就這樣定了。', '那你們自己安排吧。', '我覺得沒問題啊。'], correct: 0, explanation: '先說「明白」表示理解，再問對方意見——先軟化後探討，這是主持會議的關鍵技巧' }), difficulty: 4 },
  { course_id: 20, type: 'fill', question_json: JSON.stringify({ question: '总结action items → 簡單___下action items', answer: '總結', hint: 'zung2 git3，會議收尾必說' }), difficulty: 4 },
  { course_id: 20, type: 'fill', question_json: JSON.stringify({ question: '如果没有异议 → 如果大家冇___', answer: '異議', hint: 'ji6 ji5，询问是否有反对意见' }), difficulty: 4 },
  { course_id: 20, type: 'matching', question_json: JSON.stringify({ question: '將「散會」配對正確的普通話翻譯', pairs: [{ canto: '散會', mandarin: '散会/会议结束' }], options: ['散会/会议结束', '开始会议', '延长会议', '取消会议'], correct: 0, explanation: '「散會」(saan3 wui2)=散会，會議結束的宣告' }), difficulty: 4 },
  { course_id: 20, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '今日唔該晒大家，散會！如有任何問題，隨時email我。', options: ['今天非常感谢大家，散会！如果有任何问题，随时发邮件给我。', '今天大家辛苦了，继续开会。如果有问题现在提出来。', '今天大家早点走，明天再开。问题后面再说。', '今天谢谢你，不开了。问题你自己解决。'], correct: 0, explanation: '「唔該晒大家」=非常感谢大家，「散會」=散会，「隨時email我」=随时发邮件给我' }), difficulty: 4 },
  // L4-3 合同条款讨论 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 21, type: 'choice', question_json: JSON.stringify({ question: '客戶說價格有啲硬，你想試探讓步，應該怎麼說？', options: ['可唔可以減15%？', '你们减价。', '太贵了。', '我们不要了。'], correct: 0, explanation: '「可唔可以___？」用試探式問法比直接要求降價更專業，給對方留有餘地' }), difficulty: 4 },
  { course_id: 21, type: 'choice', question_json: JSON.stringify({ question: '談判中提出折中方案，以下哪個句式最好？', options: ['不如咁，減10%，但係唔包on-site。', '減10%吧。', '那就10%了。', '我說了算，就10%。'], correct: 0, explanation: '「不如咁，___，但係___」是經典折中句式——先讓步再提條件，雙方都有面子' }), difficulty: 4 },
  { course_id: 21, type: 'fill', question_json: JSON.stringify({ question: '讨论一下价格 → ___下個價', answer: '傾', hint: 'king1，談判的核心動詞' }), difficulty: 4 },
  { course_id: 21, type: 'fill', question_json: JSON.stringify({ question: '我問下法務先 → 我問下___先', answer: 'legal', hint: '香港職場的英文借詞' }), difficulty: 4 },
  { course_id: 21, type: 'matching', question_json: JSON.stringify({ question: '將「簽約」配對正確的普通話翻譯', pairs: [{ canto: '簽約', mandarin: '签约/签合同' }], options: ['签约/签合同', '解约', '谈判', '报价'], correct: 0, explanation: '「簽約」(cim1 joek3)=签约，達成協議的最後一步' }), difficulty: 4 },
  { course_id: 21, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '不如咁，減10%，但係我哋唔包on-site support，只包remote。', options: ['不如这样，减10%，但是我们不包含现场支持，只包含远程。', '不如这样，加10%，包含全部支持。', '不讨论了，就这样吧。', '我们减15%，包含所有支持。'], correct: 0, explanation: '經典的讓步+提條件的談判句式——「不如咁」=不如这样，「只包remote」=只包含远程支持' }), difficulty: 4 },
  // L4-4 项目交付沟通 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 22, type: 'choice', question_json: JSON.stringify({ question: '客戶反饋問題但不夠具體，最佳回應是？', options: ['可唔可以specific啲講下係咩問題？', '我不明白。', '你再想想？', '随便吧。'], correct: 0, explanation: '「可唔可以specific啲講下」引導客戶給出更具體的信息，是解決問題的第一步' }), difficulty: 4 },
  { course_id: 22, type: 'choice', question_json: JSON.stringify({ question: 'UAT完成後，最適合對客戶說什麼？', options: ['多謝你呢段時間嘅配合。', '终于搞完了。', '再见。', '下次再约。'], correct: 0, explanation: '「多謝你呢段時間嘅配合」是項目交付結束時感謝客戶的標準用語，既正式又誠懇' }), difficulty: 4 },
  { course_id: 22, type: 'fill', question_json: JSON.stringify({ question: '用户验收测试 → ___', answer: 'UAT', hint: 'User Acceptance Testing缩写' }), difficulty: 4 },
  { course_id: 22, type: 'fill', question_json: JSON.stringify({ question: '验收签字 → ___', answer: 'sign-off', hint: '項目交付的關鍵確認環節' }), difficulty: 4 },
  { course_id: 22, type: 'matching', question_json: JSON.stringify({ question: '將「搞掂」配對正確的普通話翻譯', pairs: [{ canto: '搞掂', mandarin: '搞定/完成了' }], options: ['搞定/完成了', '搞砸了', '开始做', '放弃了'], correct: 0, explanation: '「搞掂」(gaau2 dim6)=搞定/完成，香港職場極高頻詞，修復問題後的經典說法' }), difficulty: 4 },
  { course_id: 22, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '半個鐘搞掂，改完再call你試多次。', options: ['半小时搞定，改完再打给你试一次。', '半小时搞不定，改完再打给你。', '半天才搞定，不用试了。', '半小时搞定，不用再试了。'], correct: 0, explanation: '「半個鐘」=半小时，「搞掂」=搞定，「再call你試多次」=再打给你试一次' }), difficulty: 4 },
  // L4-5 投诉处理 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 23, type: 'choice', question_json: JSON.stringify({ question: '客戶氣沖沖打電話投訴，第一句應該說什麼？', options: ['唔好意思，搞到咁唔方便。你講多次個情況？', '你說什麼？我聽不懂。', '這不是我們的問題。', '你等一下，我看看。'], correct: 0, explanation: '投訴處理的第一步是道歉和安撫情緒——先說「唔好意思」再問詳情，切忌先推卸責任' }), difficulty: 4 },
  { course_id: 23, type: 'choice', question_json: JSON.stringify({ question: '客戶投訴後，提出補償方案最專業的說法是？', options: ['為咗補償今次嘅不便，我哋會俾多一個月free support。', '我們給你道個歉。', '下次注意點。', '送你一個小禮物。'], correct: 0, explanation: '「為咗補償今次嘅不便，我哋會___」是正式的補償聲明句式，先說明原因再給方案' }), difficulty: 4 },
  { course_id: 23, type: 'fill', question_json: JSON.stringify({ question: '对不起 → 粵語：___', answer: '對唔住', hint: 'deoi3 m4 zyu6，正式道歉' }), difficulty: 4 },
  { course_id: 23, type: 'fill', question_json: JSON.stringify({ question: '事故报告 → ___', answer: 'incident report', hint: '記錄事故的書面文件' }), difficulty: 4 },
  { course_id: 23, type: 'matching', question_json: JSON.stringify({ question: '將「跟進」配對正確的普通話翻譯', pairs: [{ canto: '跟進', mandarin: '跟进/follow up' }], options: ['跟进/follow up', '放弃', '开始', '结束'], correct: 0, explanation: '「跟進」(gan1 zeon3)=跟進/follow up，投訴處理閉環的關鍵詞' }), difficulty: 4 },
  { course_id: 23, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '我保證以後所有maintenance會最少提前三日通知你。', options: ['我保证以后所有维护最少提前三天通知你。', '我不保证以后会通知你。', '以后维护不提前通知了。', '我保证以后每天都会维护。'], correct: 0, explanation: '「我保證」=我保证，「最少提前三日」=最少提前三天，給客戶的正式承諾' }), difficulty: 4 },
  // L4-6 商务宴请 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 24, type: 'choice', question_json: JSON.stringify({ question: '敬酒時最得體的說法是？', options: ['嚟，我敬陳生一杯。多謝你呢段時間嘅信任同支持。', '来，干杯！', '喝酒喝酒，别客气。', 'Cheers！'], correct: 0, explanation: '「嚟，我敬___一杯。多謝___」是商務宴請敬酒的標準句式——先舉杯再說感謝內容' }), difficulty: 4 },
  { course_id: 24, type: 'choice', question_json: JSON.stringify({ question: '客戶說要埋單，正確回應是？', options: ['唔得唔得，今日我哋請。應該嘅。', '好吧，那你來。', '你太客氣了。', '下次你再請。'], correct: 0, explanation: '誰發起誰埋單是香港商務宴請的鐵則。「唔得唔得」禮貌拒絕客戶，然後說「應該嘅」' }), difficulty: 4 },
  { course_id: 24, type: 'fill', question_json: JSON.stringify({ question: '订位 → ___', answer: 'book位', hint: '預訂餐廳座位' }), difficulty: 4 },
  { course_id: 24, type: 'fill', question_json: JSON.stringify({ question: '结账 → 粵語：___', answer: '埋單', hint: 'maai4 daan1，食完飯叫侍應結賬' }), difficulty: 4 },
  { course_id: 24, type: 'matching', question_json: JSON.stringify({ question: '將「飲杯」配對正確的普通話翻譯', pairs: [{ canto: '飲杯', mandarin: '干杯' }], options: ['干杯', '喝茶', '喝酒', '倒酒'], correct: 0, explanation: '「飲杯」(jam2 bui1)=干杯，舉杯慶祝時的標準說法' }), difficulty: 4 },
  { course_id: 24, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '開心今晚大家都盡興！我已經叫咗車送你返去。', options: ['开心今晚大家都尽兴！我已经叫了车送你回去。', '不开心，大家早点走吧。你自己打车回去。', '开心就好，大家都走吧。我送你到楼下。', '今晚一般般，各回各家吧。'], correct: 0, explanation: '「盡興」=尽兴，「叫咗車」=叫了车，「送你返去」=送你回去——商務宴請的完美收尾' }), difficulty: 4 },
  // L5-1 粤语财务术语 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 25, type: 'choice', question_json: JSON.stringify({ question: 'CFO問「gross margin呢？」，佢想問咩？', options: ['毛利率是多少', '净利润是多少', '营收是多少', '现金流是多少'], correct: 0, explanation: '「gross margin」=毛利率，香港财务汇报中英文术语直接使用' }), difficulty: 5 },
  { course_id: 25, type: 'choice', question_json: JSON.stringify({ question: 'CFO問「有冇咩potential issue？」，佢真正想要嘅係？', options: ['你要在auditor發現問題前先自查匯報', '他想知道有沒有好消息', '他想知道客户投诉', '他在隨便問問'], correct: 0, explanation: 'CFO要你提前自查——如果auditor發現而你沒匯報，那是你的責任。提前說出來反而顯得可控' }), difficulty: 5 },
  { course_id: 25, type: 'fill', question_json: JSON.stringify({ question: '营收 → ___', answer: 'revenue', hint: '香港财务汇报直接用的英文术语' }), difficulty: 5 },
  { course_id: 25, type: 'fill', question_json: JSON.stringify({ question: '毛利率 → ___', answer: 'gross margin', hint: '财务专业英文术语' }), difficulty: 5 },
  { course_id: 25, type: 'matching', question_json: JSON.stringify({ question: '將「核數」配對正確的普通話翻譯', pairs: [{ canto: '核數', mandarin: '审计' }], options: ['审计', '会计', '出纳', '理财'], correct: 0, explanation: '「核數」(hat6 sou3)=审计，香港财务术语' }), difficulty: 5 },
  { course_id: 25, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '整體嚟講，Q2 revenue係$850萬，對比Q1增長咗12%。', options: ['总体来说，Q2营收是850万，对比Q1增长了12%。', '总体来说，Q2亏损850万，对比Q1下降了12%。', 'Q2成本是850万，增长了12%。', 'Q2利润是850万，下降了12%。'], correct: 0, explanation: '「revenue」=营收，「增長咗」=增长了——财务汇报标准开头句式' }), difficulty: 5 },
  // L5-2 谈判与说服 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 26, type: 'choice', question_json: JSON.stringify({ question: '供應商報價偏高，最專業的回應是？', options: ['你個rate偏高咗，我同market比過。', '太贵了！不行！', '这个价格怎么样？', '我就这么多钱。'], correct: 0, explanation: '「你個rate偏高咗」是委婉的谈判用语，比「太贵了」更商务。加上「同market比過」說明你做過功課' }), difficulty: 5 },
  { course_id: 26, type: 'choice', question_json: JSON.stringify({ question: '談判中和供應商確認SLA時，最重要的是？', options: ['驗收期可唔可以寫清楚乜嘢叫做驗收pass？', '我相信你口头承诺。', '随便写写就好。', '以后再说吧。'], correct: 0, explanation: '香港合約中沒有寫清楚的東西等於不存在，口頭承諾沒有法律效力' }), difficulty: 5 },
  { course_id: 26, type: 'fill', question_json: JSON.stringify({ question: '服务水平协议 → ___（缩写）', answer: 'SLA', hint: 'Service Level Agreement' }), difficulty: 5 },
  { course_id: 26, type: 'fill', question_json: JSON.stringify({ question: '成交 → ___', answer: 'deal', hint: '谈判拍板时的干脆说法' }), difficulty: 5 },
  { course_id: 26, type: 'matching', question_json: JSON.stringify({ question: '將「discount」配對正確的普通話翻譯', pairs: [{ canto: 'discount', mandarin: '折扣' }], options: ['折扣', '加价', '服务', '合同'], correct: 0, explanation: '「discount」=折扣，谈判中的常用英文借词' }), difficulty: 5 },
  { course_id: 26, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: 'deal！$140萬 implementation，就咁定。', options: ['成交！140万实施费，就这么定。', '不行，140万太多了。', '我认为140万不够。', '我们再谈谈吧。'], correct: 0, explanation: '「deal」=成交，「就咁定」=就这么说定了——谈判拍板的干脆说法' }), difficulty: 5 },
  // L5-3 Presentation技巧 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 27, type: 'choice', question_json: JSON.stringify({ question: 'CFO喺presentation中問數據來源，最佳回應是？', options: ['係嚟自IT嘅incident log同我哋部門嘅time tracking。', '我从网上随便找的。', '我不确定。', '这个问题不重要。'], correct: 0, explanation: '香港高管最怕「吹水」，每個數字都要能說出source，這是高層的標準測試題' }), difficulty: 5 },
  { course_id: 27, type: 'choice', question_json: JSON.stringify({ question: '被問到尖銳問題時，最專業的開頭是？', options: ['好問題。第一…第二…第三…', '我不知道。', '你什么意思？', '这个很复杂讲不清。'], correct: 0, explanation: '先說「好問題」給自己3秒思考，然後結構化回答——這是presentation Q&A的黃金法則' }), difficulty: 5 },
  { course_id: 27, type: 'fill', question_json: JSON.stringify({ question: '痛点 → 粵語：___', answer: '痛點', hint: 'tung3 dim2，分析問題的起點' }), difficulty: 5 },
  { course_id: 27, type: 'fill', question_json: JSON.stringify({ question: '投资回报率 → ___（缩写）', answer: 'ROI', hint: 'Return on Investment' }), difficulty: 5 },
  { course_id: 27, type: 'matching', question_json: JSON.stringify({ question: '將「scalability」配對正確的普通話翻譯', pairs: [{ canto: 'scalability', mandarin: '可擴展性' }], options: ['可扩展性', '稳定性', '安全性', '可用性'], correct: 0, explanation: '「scalability」=可扩展性，评估系统能否支撑业务增长' }), difficulty: 5 },
  { course_id: 27, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '好問題。第一，manual work減少…第二，downtime減少…第三，error減少…', options: ['好问题。第一，手工减少…第二，宕机减少…第三，错误减少…', '好问题。但我不知道怎么回答。', '这个问题我等下再回答。', '我不同意你的看法。'], correct: 0, explanation: '「好問題」=好问题（先肯定），「第一…第二…第三…」=结构化回答——Presentation被挑战时的标准应对' }), difficulty: 5 },
  // L5-4 职场俚语与潜规则 (6道题: 2 choice + 2 fill + 1 matching + 1 listening)
  { course_id: 28, type: 'choice', question_json: JSON.stringify({ question: '同事話「呢個project好chur」，係咩意思？', options: ['項目很辛苦/壓力大', '項目很順利', '項目預算很多', '項目結束了'], correct: 0, explanation: '「chur」=辛苦/趕/壓力大，香港職場高頻俚語' }), difficulty: 5 },
  { course_id: 28, type: 'choice', question_json: JSON.stringify({ question: '同事話「我搵日約你食飯」但冇講幾時，意思係？', options: ['客氣說話，唔會真係約', '一定會約你', '今晚就食飯', '他在試探你'], correct: 0, explanation: '「我搵日約你食飯」是香港職場經典客氣話，99%不會發生' }), difficulty: 5 },
  { course_id: 28, type: 'fill', question_json: JSON.stringify({ question: '好累/好趕 → 好___', answer: 'chur', hint: '香港職場最常用的俚語之一' }), difficulty: 5 },
  { course_id: 28, type: 'fill', question_json: JSON.stringify({ question: '被冷處理 → 被放___', answer: '雪櫃', hint: 'syut3 gwai6，不給重要工作、邊緣化' }), difficulty: 5 },
  { course_id: 28, type: 'matching', question_json: JSON.stringify({ question: '將「放飛機」配對正確的普通話翻譯', pairs: [{ canto: '放飛機', mandarin: '爽约/失约' }], options: ['爽约/失约', '坐飞机', '迟到', '提前走'], correct: 0, explanation: '「放飛機」(fong3 fei1 gei1)=爽约/失约，约好了不来的意思' }), difficulty: 5 },
  { course_id: 28, type: 'listening', question_json: JSON.stringify({ question: '聽以下粵語句子，選擇正確的普通話翻譯：', audio_text: '有deadline就係真，冇deadline就係客氣。', options: ['有截止日期就是真的，没截止日期就是客气话。', '截止日期是用来客气的。', '所有承诺都是真的。', '有截止日期也是客气话。'], correct: 0, explanation: '「有deadline就係真，冇deadline就係客氣」——香港職場判別真偽的黃金法則' }), difficulty: 5 },
];

// Clear existing questions before re-seeding (to avoid duplicates)
db.prepare('DELETE FROM questions').run();

const insertQuestion = db.prepare(
  'INSERT INTO questions (course_id, type, question_json, difficulty) VALUES (?, ?, ?, ?)'
);

for (const q of questions) {
  insertQuestion.run(q.course_id, q.type, q.question_json, q.difficulty);
}

// ===================== Assessment Questions =====================
const assessmentQs = [
  { type: 'listening', dimension: 'listening', question_json: JSON.stringify({ question: '聽到同事講「聽日三點開會，你準時啊」，最準確嘅理解係？', options: ['明天三點開會，叫你準時到', '後天三點開會', '今天三點開會', '取消會議'], correct: 0, explanation: '「聽日」=明天，「準時」=准时' }) },
  { type: 'listening', dimension: 'listening', question_json: JSON.stringify({ question: '聽到「喂，請問係咪陳生？我係IT部嘅阿強」，呢個係？', options: ['打電話自我介紹', '面對面打招呼', '發郵件', '開會發言'], correct: 0, explanation: '「喂」是电话开头语，这是在打电话' }) },
  { type: 'listening', dimension: 'listening', question_json: JSON.stringify({ question: '同事講「今日好塞車，遲咗少少」，意思係？', options: ['今日堵車，所以遲到了', '今日開車好快', '今日無開車', '今日好早到'], correct: 0, explanation: '「塞車」=堵车，「遲咗」=迟了' }) },
  { type: 'speaking', dimension: 'speaking', question_json: JSON.stringify({ question: '同事同你講「早晨」，你應該答？', options: ['早晨！', '再見！', '晚安！', '你好嗎？'], correct: 0, explanation: '「早晨」的回应也是「早晨」' }) },
  { type: 'speaking', dimension: 'speaking', question_json: JSON.stringify({ question: '第一次見新同事，最適合講咩？', options: ['你好，我係XX，請多多指教', '你叫咩名？', '我好忙唔得閒', '你幾多歲？'], correct: 0, explanation: '初次见面应礼貌自我介绍' }) },
  { type: 'speaking', dimension: 'speaking', question_json: JSON.stringify({ question: '想約同事開會，最適合講？', options: ['你幾時得閒？不如約個時間傾下？', '即刻過嚟開會！', '我唔想開會', '你自己搞掂'], correct: 0, explanation: '约会议应礼貌询问对方时间' }) },
  { type: 'reading', dimension: 'reading', question_json: JSON.stringify({ question: '讀到「聽日嘅Meeting改咗做兩點」，正確理解係？', options: ['明天的會議改到兩點', '會議取消了', '會議在明天三點', '今天兩點有會'], correct: 0, explanation: '「聽日」=明天，「改咗做兩點」=改到两点' }) },
  { type: 'reading', dimension: 'reading', question_json: JSON.stringify({ question: '讀到「份report send咗俾你，check下啦」，正確理解係？', options: ['報告已發給你，請查看', '報告未完成', '報告有錯誤', '需要重新寫報告'], correct: 0, explanation: '「send咗」=已发送，「check下」=查看一下' }) },
  { type: 'vocabulary', dimension: 'vocabulary', question_json: JSON.stringify({ question: '配對：「跟進」嘅意思係？', options: ['follow up', 'cancel', 'start', 'finish'], correct: 0, explanation: '「跟進」(gan1 zeon3)=follow up' }) },
  { type: 'vocabulary', dimension: 'vocabulary', question_json: JSON.stringify({ question: '配對：「開會」嘅意思係？', options: ['meeting/have a meeting', 'lunch', 'holiday', 'training'], correct: 0, explanation: '「開會」=开会/have a meeting' }) },
];

const insertAssessment = db.prepare(
  'INSERT INTO assessment_questions (type, question_json, dimension) VALUES (?, ?, ?)'
);

for (const aq of assessmentQs) {
  insertAssessment.run(aq.type, aq.question_json, aq.dimension);
}

console.log('Seed data inserted successfully!');
console.log(`Courses: ${courses.length}`);
console.log(`Questions: ${questions.length}`);
console.log(`Assessment questions: ${assessmentQs.length}`);

db.close();
