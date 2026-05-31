-- 粤讲粤掂 种子数据

-- ===================== 课程数据 =====================
-- L1 课程 (6课)
INSERT INTO courses (id, title, level, order_index, description, content_json, difficulty_label) VALUES
(1, '办公室问候', 1, 1, '学习香港办公室的日常问候用语', '{"scenario":"第一日返香港 office，同同事打招呼","vocabulary":[{"word":"早晨","jyutping":"zou2 san4","meaning":"早上好（上午打招呼用）"},{"word":"你好","jyutping":"nei5 hou2","meaning":"你好"},{"word":"我係","jyutping":"ngo5 hai6","meaning":"我是"},{"word":"同事","jyutping":"tung4 si6","meaning":"同事"},{"word":"請多多指教","jyutping":"cing2 do1 do1 zi2 gaau3","meaning":"请多多指教"},{"word":"老細","jyutping":"lou5 sai3","meaning":"老板/上司"}],"grammar":[{"pattern":"早晨 vs 你好","explanation":"对同事说"早晨"，对上级说"早晨+称呼"，"你好"更正式通用","example":"早晨陳生！/ 你好，我係新同事"}],"culture":"香港office早晨见面习惯 — 对同事说"早晨"，对上级说"早晨+称呼"。香港人上班见面很少握手，点头+早晨即可。","dialogue":"A: 早晨！你係新嚟嘅同事？\nB: 早晨！係啊，我叫做阿明，請多多指教。\nA: 我叫阿強，歡迎你！"}', '🟢 轻松'),

(2, '自我介绍', 1, 2, '学习在职场中自我介绍（姓名/职位/部门）', '{"scenario":"team meeting上初次自我介绍","vocabulary":[{"word":"我叫做","jyutping":"ngo5 giu3 zou6","meaning":"我叫"},{"word":"職位","jyutping":"zik1 wai2","meaning":"职位"},{"word":"部門","jyutping":"bou6 mun4","meaning":"部门"},{"word":"負責","jyutping":"fu6 zaak3","meaning":"负责"},{"word":"請多多指教","jyutping":"cing2 do1 do1 zi2 gaau3","meaning":"请多关照"},{"word":"顧問","jyutping":"gu3 man6","meaning":"顾问"},{"word":"經理","jyutping":"ging1 lei5","meaning":"经理"}],"grammar":[{"pattern":"我係XX部門嘅YY，負責ZZ","explanation":"标准职场自我介绍句式，'嘅'相当于'的'","example":"我係IT部門嘅Senior Consultant，負責ERP系統"}],"culture":"香港公司常用英文职衔+粤语混用，如 '我係IT部嘅Senior Consultant'，这种中英夹杂是香港职场常态。","dialogue":"A: 不如大家介紹下自己先？\nB: 我係財務部嘅顧問，負責核數項目，請多多指教。\nA: 我係IT部嘅系統分析師，負責ERP migration。"}', '🟢 轻松'),

(3, '数字与日期', 1, 3, '学习开会时间、日期表达', '{"scenario":"约会议时间，讨论deadline","vocabulary":[{"word":"幾點","jyutping":"gei2 dim2","meaning":"几点"},{"word":"聽日","jyutping":"ting1 jat6","meaning":"明天"},{"word":"後日","jyutping":"hau6 jat6","meaning":"后天"},{"word":"今日","jyutping":"gam1 jat6","meaning":"今天"},{"word":"上個禮拜","jyutping":"soeng6 go3 lai5 baai3","meaning":"上周"},{"word":"下個禮拜","jyutping":"haa6 go3 lai5 baai3","meaning":"下周"},{"word":"截止日期","jyutping":"zit6 zi2 jat6 kei4","meaning":"deadline"}],"grammar":[{"pattern":"星期X + 上/下晝 + 時間","explanation":"粤语时间表达：上晝=上午，下晝=下午","example":"星期四下晝三點開會"}],"culture":"香港办公室通常用24小时制或上下午制混用，'deadline'直接借英文，极少说'截止日期'。","dialogue":"A: 聽日三點開會，你準時啊！\nB: 好，聽日見。Deadline係下個禮拜五？\nA: 係啊，記住啦。"}', '🟢 轻松'),

(4, '电话基本用语', 1, 4, '学习职场电话沟通', '{"scenario":"接听和拨打电话的基本用语","vocabulary":[{"word":"喂","jyutping":"wai2","meaning":"喂（接电话）"},{"word":"請問","jyutping":"cing2 man6","meaning":"请问"},{"word":"邊位","jyutping":"bin1 wai2","meaning":"哪位"},{"word":"唔好意思","jyutping":"m4 hou2 ji3 si3","meaning":"不好意思"},{"word":"留口訊","jyutping":"lau4 hau2 seon3","meaning":"留言"},{"word":"覆你","jyutping":"fuk1 nei5","meaning":"回复你"}],"grammar":[{"pattern":"喂，請問係咪XX？/ 喂，我係XX公司嘅YY","explanation":"电话接听和拨打的礼貌用语","example":"喂，請問係咪陳生？我係越秀集團嘅阿明。"}],"culture":"香港职场接电话常用'喂'开头，但打给客户会用'你好，請問係咪XX？'更礼貌。","dialogue":"A: 喂，請問係咪張小姐？\nB: 係，邊位？\nA: 我係IT部嘅阿強，想同你跟進下個project。"}', '🟢 轻松'),

(5, '公司组织架构', 1, 5, '学习公司部门和职位的粤语说法', '{"scenario":"了解公司组织架构和同事称呼","vocabulary":[{"word":"公司","jyutping":"gung1 si1","meaning":"公司"},{"word":"老細","jyutping":"lou5 sai3","meaning":"老板"},{"word":"上司","jyutping":"soeng6 si1","meaning":"上司"},{"word":"下屬","jyutping":"haa6 suk6","meaning":"下属"},{"word":"同事","jyutping":"tung4 si6","meaning":"同事"},{"word":"實習生","jyutping":"sat6 zaap6 saang1","meaning":"实习生"},{"word":"人事部","jyutping":"jan4 si6 bou6","meaning":"HR部门"}],"grammar":[{"pattern":"XX部門嘅YY","explanation":"表达某部门的人","example":"財務部門嘅陳經理"}],"culture":"香港公司通常用英文缩写称呼部门：HR、IT、CS、Sales等，粤语+英文缩写混用。","dialogue":"A: 你係邊個部門㗎？\nB: 我係IT部嘅，你呢？\nA: 我係Finance Team㗎。"}', '🟢 轻松'),

(6, '电邮基本用语', 1, 6, '学习粤语邮件和Teams消息', '{"scenario":"用粤语写邮件和Teams消息","vocabulary":[{"word":"電郵","jyutping":"din6 jau4","meaning":"邮件/email"},{"word":"覆","jyutping":"fuk1","meaning":"回复"},{"word":"附件","jyutping":"fu6 gin2","meaning":"附件"},{"word":"抄送","jyutping":"caau1 sung3","meaning":"抄送/cc"},{"word":"盡快","jyutping":"zeon6 faai3","meaning":"尽快"},{"word":"唔該","jyutping":"m4 goi1","meaning":"谢谢/麻烦"}],"grammar":[{"pattern":"唔該幫我XX / 請儘快覆我","explanation":"邮件中常见的请求和催促表达","example":"唔該幫我check下個file，盡快覆我。"}],"culture":"香港职场内部Teams/Slack消息常用粤语口语，但对外邮件以英文为主。内部消息很口语化。","dialogue":"A: (Teams) 阿明，份report send咗俾你，check下啦\nB: 收到，唔該！聽日開會前覆你。"}', '🟢 轻松');

-- L2 课程 (6课)
INSERT INTO courses (id, title, level, order_index, description, content_json, difficulty_label) VALUES
(7, '茶水间闲聊', 2, 1, '学习午休时间与同事的日常聊天', '{"scenario":"Lunch time在pantry遇到同事","vocabulary":[{"word":"食咗飯未","jyutping":"sik6 zo2 faan6 mei6","meaning":"吃饭了吗"},{"word":"去邊度食","jyutping":"heoi3 bin1 dou6 sik6","meaning":"去哪里吃"},{"word":"好塞車","jyutping":"hou2 sak1 ce1","meaning":"好堵车"},{"word":"落雨","jyutping":"lok6 jyu5","meaning":"下雨"},{"word":"是但啦","jyutping":"si6 daan6 laa1","meaning":"随便啦"},{"word":"好攰","jyutping":"hou2 gui6","meaning":"好累"}],"grammar":[{"pattern":"今日好X","explanation":"描述今天状态的句型","example":"今日好忙/今日好攰/今日好熱"}],"culture":"香港人茶水间不讲公事，聊天气/交通/美食最安全。'是但啦'是超高频口头禅。","dialogue":"A: 食咗飯未啊？\nB: 未啊，去邊度食？\nA: 是但啦，茶餐廳好唔好？\nB: 好，今日好熱，快啲去。"}', '🟡 适中'),

(8, '约会议时间', 2, 2, '学习与同事协调会议时间', '{"scenario":"同其他部门的同事约会议","vocabulary":[{"word":"開會","jyutping":"hoi1 wui6","meaning":"开会"},{"word":"幾時","jyutping":"gei2 si4","meaning":"什么时候"},{"word":"得閒","jyutping":"dak1 haan4","meaning":"有空"},{"word":"唔方便","jyutping":"m4 fong1 bin6","meaning":"不方便"},{"word":"改期","jyutping":"goi2 kei4","meaning":"改期"},{"word":"確認","jyutping":"kok3 jing6","meaning":"确认"}],"grammar":[{"pattern":"你幾時得閒？不如約星期X上/下晝X點？","explanation":"约时间的标准句式","example":"你幾時得閒？不如約星期四下晝三點？"}],"culture":"香港职场约会议习惯用Outlook/Teams+粤语口头确认。通常先看calendar再口头确认。","dialogue":"A: 想同你傾下個project進度，你幾時得閒？\nB: 聽日下晝兩點得唔得？\nA: 好，我send個invite俾你。"}', '🟡 适中'),

(9, '请假', 2, 3, '学习请假相关的粤语表达', '{"scenario":"向上司请假或告知病假","vocabulary":[{"word":"請假","jyutping":"cing2 gaa3","meaning":"请假"},{"word":"年假","jyutping":"nin4 gaa3","meaning":"年假"},{"word":"病假","jyutping":"beng6 gaa3","meaning":"病假"},{"word":"唔舒服","jyutping":"m4 syu1 fuk6","meaning":"不舒服"},{"word":"放工","jyutping":"fong3 gung1","meaning":"下班"},{"word":"補假","jyutping":"bou2 gaa3","meaning":"补假"}],"grammar":[{"pattern":"我想請X日假，因為XX","explanation":"请假的礼貌表达","example":"我想請一日假，因為有啲唔舒服。"}],"culture":"香港公司请假流程：先看公司calendar→在HR系统提交→再口头/Teams通知上司。病假通常需医生纸。","dialogue":"A: 陳生，我今日有啲唔舒服，想請一日病假。\nB: 好，你休息下啦。記得交醫生紙。\nA: 知道，唔該陳生。"}', '🟡 适中'),

(10, '收发室与快递', 2, 4, '学习收发文件和快递的粤语', '{"scenario":"在收发室处理文件和快递","vocabulary":[{"word":"速遞","jyutping":"cuk1 dai6","meaning":"快递"},{"word":"簽收","jyutping":"cim1 sau1","meaning":"签收"},{"word":"包裹","jyutping":"baau1 gwo2","meaning":"包裹"},{"word":"寄出","jyutping":"gei3 ceot1","meaning":"寄出"},{"word":"收件人","jyutping":"sau1 gin2 jan4","meaning":"收件人"},{"word":"發票","jyutping":"faat3 piu3","meaning":"发票"}],"grammar":[{"pattern":"唔該幫我XX呢個YY俾ZZ","explanation":"请求别人帮忙收发物品","example":"唔該幫我寄呢份文件俾客戶。"}],"culture":"香港office收发快递常用公司内部mailroom服务，大公司有专人收发。速递=快递，是粤语常用词。","dialogue":"A: 呢份文件要速遞俾客戶，唔該。\nB: 好，填咗呢張form先。\nA: 順豐得唔得？\nB: 可以。"}', '🟡 适中'),

(11, '同事聚餐', 2, 5, '学习与同事聚餐的粤语对话', '{"scenario":"同同事一齊去食lunch或放工happy hour","vocabulary":[{"word":"飲茶","jyutping":"jam2 caa4","meaning":"饮茶（吃点心）"},{"word":"AA制","jyutping":"AA zai3","meaning":"各自付款/AA"},{"word":"埋單","jyutping":"maai4 daan1","meaning":"买单"},{"word":"好味","jyutping":"hou2 mei6","meaning":"好吃"},{"word":"唔該","jyutping":"m4 goi1","meaning":"谢谢/麻烦"},{"word":"試下","jyutping":"si3 haa5","meaning":"试一下"}],"grammar":[{"pattern":"不如一齊去XX？/ 今餐我請","explanation":"邀请同事聚餐和请客的表达","example":"不如一齊去飲茶？今餐我請！"}],"culture":"香港职场AA制很普遍，除非有人明确说'我請'。饮茶是香港人最喜欢的社交方式。","dialogue":"A: 放工一齊去happy hour好唔好？\nB: 好啊！去邊？\nA: 蘭桂坊？\nB: 好，叫埋阿強一齊。"}', '🟡 适中'),

(12, '办公设备报修', 2, 6, '学习报修办公设备的粤语', '{"scenario":"电脑/打印机坏了，向IT部门报修","vocabulary":[{"word":"壞咗","jyutping":"waai6 zo2","meaning":"坏了"},{"word":"打印機","jyutping":"daa2 jan3 gei1","meaning":"打印机"},{"word":"電腦","jyutping":"din6 nou5","meaning":"电脑"},{"word":"死機","jyutping":"sei2 gei1","meaning":"死机"},{"word":"網絡","jyutping":"mong5 lok6","meaning":"网络"},{"word":"整返好","jyutping":"zing2 faan1 hou2","meaning":"修好"}],"grammar":[{"pattern":"XX壞咗/XX唔work，可唔可以幫手睇下？","explanation":"报修设备的常用表达","example":"打印機壞咗，可唔可以幫手睇下？"}],"culture":"香港办公室IT报修通常通过ticket system，但小问题会直接Teams找IT同事。'唔work'是粤英混用高频词。","dialogue":"A: 我部電腦死咗機，開唔到。\nB: 試下restart先。\nA: Restart咗幾次都唔得。\nB: 我過嚟睇下。"}', '🟡 适中');

-- L3 课程 (6课)
INSERT INTO courses (id, title, level, order_index, description, content_json, difficulty_label) VALUES
(13, '部门会议发言', 3, 1, '学习在部门会议上发言', '{"scenario":"weekly meeting上汇报进度","vocabulary":[{"word":"進度","jyutping":"zeon3 dou6","meaning":"进度"},{"word":"完成","jyutping":"jyun4 sing4","meaning":"已完成"},{"word":"進行中","jyutping":"zeon3 hang4 zung1","meaning":"进行中"},{"word":"阻滯","jyutping":"zo2 zai6","meaning":"卡住了/有阻碍"},{"word":"跟進","jyutping":"gan1 zeon3","meaning":"跟进"},{"word":"Deadline","jyutping":"","meaning":"截止日期"}],"grammar":[{"pattern":"我負責嘅XX項目，目前進度係XX，遇到嘅問題係XX","explanation":"标准会议汇报句式","example":"我負責嘅ERP項目，目前進度係70%，遇到嘅問題係data migration有阻滯。"}],"culture":"香港会议中极高频的粤英混用词汇：confirm、schedule、follow up、deadline、meeting。","dialogue":"A: 阿明，你個project進度點啊？\nB: 進行中，預計下個禮拜完成，但data migration有少少阻滯。\nA: 需要幫手嘅話出聲。"}', '🔴 有挑战'),

(14, '进度汇报', 3, 2, '学习向上级汇报工作进度', '{"scenario":"向上司汇报项目进度","vocabulary":[{"word":"匯報","jyutping":"wui6 bou3","meaning":"汇报"},{"word":"進展","jyutping":"zeon3 zin2","meaning":"进展"},{"word":"延遲","jyutping":"jin4 ci4","meaning":"延迟"},{"word":"資源","jyutping":"zi1 jyun4","meaning":"资源"},{"word":"人手","jyutping":"jan4 sau2","meaning":"人手"},{"word":"預算","jyutping":"jyu6 syun3","meaning":"预算"}],"grammar":[{"pattern":"想同你匯報下XX嘅進展，目前XX，預計XX完成","explanation":"向上司汇报的标准句式","example":"想同你匯報下個project嘅進展，目前按schedule進行，預計下個月完成。"}],"culture":"香港职场上司看重的是timeline和potential risk，汇报时先讲进度再讲问题，最后提解决方案。","dialogue":"A: 陳生，想同你匯報下個project進度。\nB: 講嚟聽下。\nA: 目前完成咗60%，但有個問題要同你傾……"}', '🔴 有挑战'),

(15, '请示上级', 3, 3, '学习向上司请示工作', '{"scenario":"需要请示上司做决定","vocabulary":[{"word":"請示","jyutping":"cing2 si6","meaning":"请示"},{"word":"決定","jyutping":"kyut3 ding6","meaning":"决定"},{"word":"批准","jyutping":"pai1 zeon2","meaning":"批准"},{"word":"方案","jyutping":"fong1 on3","meaning":"方案"},{"word":"建議","jyutping":"gin3 ji5","meaning":"建议"},{"word":"考慮","jyutping":"haau2 leoi6","meaning":"考虑"}],"grammar":[{"pattern":"想請示下XX嘅事，我有兩個方案：A係XX，B係XX","explanation":"请示时提供选项的标准表达","example":"想請示下個budget嘅事，我有兩個方案想同你傾。"}],"culture":"香港职场上司期望下属带着方案来请示，不要只提问题不给解决方案。","dialogue":"A: 陳生，想請示下vendor選擇嘅事。\nB: 你有咩建議？\nA: 我比較咗兩間，A公司平但交貨慢，B公司貴但口碑好。"}', '🔴 有挑战'),

(16, '跨部门协作', 3, 4, '学习跨部门沟通的粤语', '{"scenario":"与其他部门同事协调工作","vocabulary":[{"word":"協作","jyutping":"hip3 zok3","meaning":"协作"},{"word":"溝通","jyutping":"kau1 tung1","meaning":"沟通"},{"word":"配合","jyutping":"pui3 hap6","meaning":"配合"},{"word":"交接","jyutping":"gaau1 zip3","meaning":"交接"},{"word":"共識","jyutping":"gung6 sik1","meaning":"共识"},{"word":"責任","jyutping":"zaak3 jam6","meaning":"责任"}],"grammar":[{"pattern":"想同你哋XX部門傾下YY嘅事，需要你哋配合ZZ","explanation":"跨部门沟通的礼貌表达","example":"想同你哋Finance部門傾下budget approval嘅事。"}],"culture":"香港跨部门协作通常先约kick-off meeting，明确各自scope和deadline，避免责任不清。","dialogue":"A: 想同你哋IT部門傾下新system嘅requirement。\nB: 好，我哋約個時間坐低傾。\nA: 聽日下晝得唔得？"}', '🔴 有挑战'),

(17, '内部培训', 3, 5, '学习主持内部培训的粤语', '{"scenario":"给同事做内部培训","vocabulary":[{"word":"培訓","jyutping":"pui4 fan3","meaning":"培训"},{"word":"分享","jyutping":"fan1 hoeng2","meaning":"分享"},{"word":"經驗","jyutping":"ging1 jim6","meaning":"经验"},{"word":"示範","jyutping":"si6 faan6","meaning":"示范"},{"word":"問題","jyutping":"man6 tai4","meaning":"问题"},{"word":"解答","jyutping":"gaai2 daap3","meaning":"解答"}],"grammar":[{"pattern":"今日同大家分享下XX，如果有問題隨時可以問","explanation":"培训开场的标准句式","example":"今日同大家分享下新system嘅使用方法。"}],"culture":"香港内部培训风格较轻松，主讲人会留很多Q&A时间。用粤语培训时也常夹杂英文术语。","dialogue":"A: 今日同大家分享下點樣用新嘅ERP system。\nB: 可唔可以講慢少少？\nA: 當然可以，有問題隨時舉手。"}', '🔴 有挑战'),

(18, '绩效面谈', 3, 6, '学习绩效面谈的粤语表达', '{"scenario":"和上司进行绩效面谈","vocabulary":[{"word":"表現","jyutping":"biu2 jin6","meaning":"表现"},{"word":"評估","jyutping":"ping4 gu2","meaning":"评估"},{"word":"目標","jyutping":"muk6 biu1","meaning":"目标"},{"word":"改進","jyutping":"goi2 zeon3","meaning":"改进"},{"word":"升職","jyutping":"sing1 zik1","meaning":"升职"},{"word":"加薪","jyutping":"gaa1 san1","meaning":"加薪"}],"grammar":[{"pattern":"我覺得今年喺XX方面做得唔錯，但YY方面仲有改進空間","explanation":"绩效面谈中自我评价的表达","example":"我覺得今年喺project delivery方面做得唔錯，但communication方面仲有改進空間。"}],"culture":"香港绩效面谈注重双向沟通，员工也可以提出自己的职业发展期望。态度要谦虚但也要展示成果。","dialogue":"A: 你覺得今年表現點樣？\nB: 我覺得整體ok，特別係Q3個project完成得唔錯。\nA: 同意，但有啲方面可以再做好啲……"}', '🔴 有挑战');

-- L4 课程 (6课)
INSERT INTO courses (id, title, level, order_index, description, content_json, difficulty_label) VALUES
(19, '客户拜访寒暄', 4, 1, '学习拜访客户时的寒暄用语', '{"scenario":"去客户公司做项目交付沟通","vocabulary":[{"word":"拜訪","jyutping":"baai3 fong2","meaning":"拜访"},{"word":"合作","jyutping":"hap6 zok3","meaning":"合作"},{"word":"項目","jyutping":"hong6 muk6","meaning":"项目"},{"word":"方案","jyutping":"fong1 on3","meaning":"方案"},{"word":"滿意","jyutping":"mun5 ji3","meaning":"满意"},{"word":"跟進","jyutping":"gan1 zeon3","meaning":"跟进"}],"grammar":[{"pattern":"多謝你畀機會我哋介紹方案，想聽下你嘅意見","explanation":"拜访客户时的礼貌开场","example":"多謝陳生畀機會我哋嚟介紹新方案。"}],"culture":"香港商业文化 — 先寒暄再谈正事，开头聊两句天气/交通是礼貌。不要一坐下就谈生意。","dialogue":"A: 陳生你好，多謝你抽時間見我哋。\nB: 唔使客氣，請坐。今日好熱喎。\nA: 係啊，三十幾度……好啦，講返正題。"}', '🔴 有挑战'),

(20, '商务会议主持', 4, 2, '学习主持商务会议的粤语', '{"scenario":"主持一个正式的商务会议","vocabulary":[{"word":"主持","jyutping":"zyu2 ci4","meaning":"主持"},{"word":"議程","jyutping":"ji5 cing4","meaning":"议程"},{"word":"討論","jyutping":"tou2 leon6","meaning":"讨论"},{"word":"總結","jyutping":"zung2 git3","meaning":"总结"},{"word":"共識","jyutping":"gung6 sik1","meaning":"共识"},{"word":"下一步","jyutping":"haa6 jat1 bou6","meaning":"下一步"}],"grammar":[{"pattern":"今日嘅議程有三項：第一係XX，第二係YY，第三係ZZ","explanation":"会议开场的标准表达","example":"今日嘅議程有三項：第一係進度匯報，第二係budget review，第三係下季度planning。"}],"culture":"香港商务会议讲究效率，主持人要控制节奏。'Any other business'（其他事項）是会议结尾标配。","dialogue":"A: 多謝大家出席今日嘅會議。議程有三項……\nB: Sorry，可唔可以講返上一頁？\nA: 當然可以。"}', '🔴 有挑战'),

(21, '合同条款讨论', 4, 3, '学习讨论合同条款的粤语', '{"scenario":"与客户或供应商讨论合同条款","vocabulary":[{"word":"合約","jyutping":"hap6 joek3","meaning":"合同"},{"word":"條款","jyutping":"tiu4 fun2","meaning":"条款"},{"word":"價錢","jyutping":"gaa3 cin4","meaning":"价格"},{"word":"期限","jyutping":"kei4 haan6","meaning":"期限"},{"word":"責任","jyutping":"zaak3 jam6","meaning":"责任"},{"word":"修改","jyutping":"sau1 goi2","meaning":"修改"}],"grammar":[{"pattern":"關於XX條款，我哋想提出一個修改建議","explanation":"讨论合同条款的礼貌表达","example":"關於payment terms，我哋想建議改做net 30。"}],"culture":"香港合同以英文为主，讨论时用粤语解释条款。'subject to contract'、'without prejudice'等法律用语保留英文。","dialogue":"A: 關於第三條嘅payment terms，我哋想傾下。\nB: 你哋有咩concern？\nA: Net 60太長，可唔可以改做net 30？"}', '🔴 有挑战'),

(22, '项目交付沟通', 4, 4, '学习项目交付时的沟通用语', '{"scenario":"项目交付阶段的沟通","vocabulary":[{"word":"交付","jyutping":"gaau1 fu6","meaning":"交付"},{"word":"驗收","jyutping":"jim6 sau1","meaning":"验收"},{"word":"測試","jyutping":"cak1 si3","meaning":"测试"},{"word":"上線","jyutping":"soeng5 sin3","meaning":"上线/go live"},{"word":"培訓","jyutping":"pui4 fan3","meaning":"培训"},{"word":"支援","jyutping":"zi1 wun4","meaning":"支持/support"}],"grammar":[{"pattern":"XX階段已完成，下一步係YY，預計ZZ日期上線","explanation":"项目交付进度的汇报句式","example":"UAT測試已完成，下一步係user training，預計下個禮拜上線。"}],"culture":"香港IT项目交付有严格流程：SIT→UAT→Training→Go Live→Hypercare。这些英文缩写沟通时直接用。","dialogue":"A: UAT嘅結果出咗，全部pass。\nB: 咁下一步係user training，你準備好未？\nA: 準備好，training material已經send咗俾user。"}', '🔴 有挑战'),

(23, '投诉处理', 4, 5, '学习处理客户投诉的粤语', '{"scenario":"处理客户的投诉和不满","vocabulary":[{"word":"投訴","jyutping":"tau4 sou3","meaning":"投诉"},{"word":"抱歉","jyutping":"pou5 hip3","meaning":"抱歉"},{"word":"解決","jyutping":"gaai2 kyut3","meaning":"解决"},{"word":"補償","jyutping":"bou2 soeng4","meaning":"补偿"},{"word":"改善","jyutping":"goi2 sin6","meaning":"改善"},{"word":"跟進","jyutping":"gan1 zeon3","meaning":"跟进"}],"grammar":[{"pattern":"非常抱歉帶嚟不便，我即刻幫你跟進","explanation":"处理投诉时的道歉和回应","example":"非常抱歉帶嚟不便，我即刻幫你check下發生咩事。"}],"culture":"香港客户投诉处理三步：先道歉、再了解详情、最后给解决方案和时间线。态度要诚恳，不要推卸责任。","dialogue":"A: 你哋個system成日down，好影響我哋做嘢！\nB: 非常抱歉！我即刻幫你跟進，半個鐘之內覆你。\nA: 最好快啲，我哋聽日要出report。"}', '🔴 有挑战'),

(24, '商务宴请', 4, 6, '学习商务宴请的粤语用语', '{"scenario":"与客户或合作伙伴共进晚餐","vocabulary":[{"word":"宴請","jyutping":"jin3 cing2","meaning":"宴请"},{"word":"招呼","jyutping":"ziu1 fu1","meaning":"招待"},{"word":"俾面","jyutping":"bei2 min2","meaning":"赏脸/给面子"},{"word":"敬酒","jyutping":"ging3 zau2","meaning":"敬酒"},{"word":"多謝","jyutping":"do1 ze6","meaning":"多谢"},{"word":"招呼唔到","jyutping":"ziu1 fu1 m4 dou3","meaning":"招待不周"}],"grammar":[{"pattern":"多謝各位俾面出席，今晚隨便食，唔好客氣","explanation":"宴请时的客气话","example":"多謝陳生賞面，今晚隨便食，唔好客氣。"}],"culture":"香港商务宴请通常在中餐馆，主人会帮客人夹菜、倒茶。'俾面'是香港社交核心概念。","dialogue":"A: 多謝各位賞面，今晚隨便食！\nB: 多謝你咁客氣。\nA: 招呼唔到，唔好見怪。"}', '🔴 有挑战');

-- L5 课程 (4课)
INSERT INTO courses (id, title, level, order_index, description, content_json, difficulty_label) VALUES
(25, '粤语财务术语', 5, 1, '学习粤语财务专业术语', '{"scenario":"同香港CFO汇报财务数据","vocabulary":[{"word":"核數","jyutping":"hat6 sou3","meaning":"审计"},{"word":"收入","jyutping":"sau1 jap6","meaning":"收入/revenue"},{"word":"回報率","jyutping":"wui4 bou3 leot2","meaning":"ROI"},{"word":"利潤","jyutping":"lei6 jeon6","meaning":"利润"},{"word":"現金流","jyutping":"jin6 gam1 lau4","meaning":"现金流"},{"word":"資產負債表","jyutping":"zi1 caan2 fu3 zaai6 biu2","meaning":"资产负债表"}],"grammar":[{"pattern":"呢個Q嘅收入對比上個Q增長咗X%","explanation":"汇报财务数据的标准句式","example":"呢個Q嘅revenue對比上個Q增長咗15%，主要係因為新產品線。"}],"culture":"香港财务职场用词大量来自英文直译 — audit、profit、cost、revenue、budget直接嵌在粤语句子里。","dialogue":"A: 呢個季度嘅revenue同profit margin點樣？\nB: Revenue增長咗12%，但cost都升咗，profit margin微跌。\nA: 咩原因導致cost上升？"}', '🔴 有挑战'),

(26, '谈判与说服', 5, 2, '学习商务谈判中的粤语技巧', '{"scenario":"与供应商进行价格谈判","vocabulary":[{"word":"談判","jyutping":"taam4 pun3","meaning":"谈判"},{"word":"讓步","jyutping":"joeng6 bou6","meaning":"让步"},{"word":"底線","jyutping":"dai2 sin3","meaning":"底线"},{"word":"雙贏","jyutping":"soeng1 jeng4","meaning":"双赢"},{"word":"誠意","jyutping":"sing4 ji3","meaning":"诚意"},{"word":"折衷","jyutping":"zit3 cung1","meaning":"折中"}],"grammar":[{"pattern":"我明白你嘅立場，但係……不如我哋搵個折衷方案？","explanation":"谈判中让步和提议的句式","example":"我明白你嘅concern，但係我哋budget有限，不如我哋搵個折衷方案？"}],"culture":"香港商业谈判讲究'有商有量'，不会太aggressive。'大家開心'（大家开心）是理想结果。","dialogue":"A: 呢個價錢我哋真係做唔到。\nB: 咁你俾個best price我，我同老細傾下。\nA: 呢個已經係最低，但我可以送多三個月maintenance。"}', '🔴 有挑战'),

(27, 'Presentation技巧', 5, 3, '学习用粤语做专业演示', '{"scenario":"向客户或管理层做presentation","vocabulary":[{"word":"簡報","jyutping":"gaan2 bou3","meaning":"演示/presentation"},{"word":"重點","jyutping":"zung6 dim2","meaning":"重点"},{"word":"數據","jyutping":"sou3 geoi3","meaning":"数据"},{"word":"分析","jyutping":"fan1 sik1","meaning":"分析"},{"word":"建議","jyutping":"gin3 ji5","meaning":"建议"},{"word":"預期","jyutping":"jyu6 kei4","meaning":"预期"}],"grammar":[{"pattern":"今日想同大家分享三個重點：第一……第二……第三……","explanation":"Presentation的结构化开场","example":"今日想同大家分享三個重點：市場分析、我哋嘅方案、同埋預期回報。"}],"culture":"香港presentation通常中英夹杂，slides用英文但口头用粤语讲解。'Next slide please'是经典过渡句。","dialogue":"A: 跟住呢頁睇下市場數據……\nB: 可唔可以解釋下呢個數字？\nA: 當然，呢個數字代表……"}', '🔴 有挑战'),

(28, '职场俚语与潜规则', 5, 4, '学习香港职场俚语和潜规则', '{"scenario":"理解香港职场文化中的俚语和潜台词","vocabulary":[{"word":"食死貓","jyutping":"sik6 sei2 maau1","meaning":"背黑锅"},{"word":"hea做","jyutping":"hea zou6","meaning":"敷衍了事"},{"word":"chur","jyutping":"","meaning":"很赶/很拼"},{"word":"搏盡","jyutping":"bok3 zeon6","meaning":"拼尽全力"},{"word":"射波","jyutping":"se6 bo1","meaning":"推卸责任"},{"word":"補鑊","jyutping":"bou2 wok6","meaning":"补救/救火"}],"grammar":[{"pattern":"XX好chur / 唔好hea做 / 咪射波啦","explanation":"职场俚语的使用场景","example":"呢個project好chur，大家搏盡佢！"}],"culture":"香港职场俚语生动有趣，理解这些词才能真正融入香港职场文化。'食死貓'=背黑锅，'hea'=敷衍。","dialogue":"A: 呢個project deadline好chur！\nB: 係啊，大家要搏盡，唔好hea做。\nA: 最緊要唔好食死貓……"}', '🔴 有挑战');

-- ===================== 练习题数据 =====================
-- L1-1 办公室问候 练习题
INSERT INTO questions (course_id, type, question_json, difficulty) VALUES
(1, 'choice', '{"question":"同事同你講「早晨」，你應該答？","options":["早晨！","你好！","再見！","晚安！"],"correct":0,"explanation":"「早晨」是粤语早上打招呼用语，回应也是「早晨」"}', 1),
(1, 'choice', '{"question":"第一次見新同事，應該講咩？","options":["再見","請多多指教","唔該","是但啦"],"correct":1,"explanation":"初次见面应该说「請多多指教」，表示请多关照"}', 1),
(1, 'choice', '{"question":"「老細」係咩意思？","options":["同事","老闆/上司","下屬","客戶"],"correct":1,"explanation":"「老細」是粤语中老板/上司的俗称"}', 1),
(1, 'fill', '{"question":"第一日返工，見到同事要講「____」","answer":"早晨","hint":"zoeng1 san4，早上打招呼用語"}', 1),
(1, 'choice', '{"question":"對上司應該點樣打招呼？","options":["早晨+稱呼","就咁講早晨","講Hi","唔使打招呼"],"correct":0,"explanation":"对上司应该说「早晨+称呼」，如「早晨陳生」，更有礼貌"}', 1);

-- L1-2 自我介绍 练习题
INSERT INTO questions (course_id, type, question_json, difficulty) VALUES
(2, 'choice', '{"question":"「我叫做阿明」係咩意思？","options":["我叫阿明","我是阿明","我喜歡阿明","我認識阿明"],"correct":0,"explanation":"「我叫做」=我叫，是自我介绍的常用说法"}', 1),
(2, 'fill', '{"question":"自我介紹時要講：我係IT____嘅顧問","answer":"部門","hint":"bou6 mun4，即係department"}', 1),
(2, 'choice', '{"question":"「負責」嘅意思係？","options":["負責/负责","推卸","拒絕","接受"],"correct":0,"explanation":"「負責」(fu6 zaak3) = 负责"}', 1),
(2, 'choice', '{"question":"以下邊個係正確嘅自我介紹？","options":["我係IT部嘅，負責ERP系統","我係食飯嘅，負責茶水間","我係司機嘅，負責飛機","我係學生嘅，負責考試"],"correct":0,"explanation":"「我係XX部門嘅，負責YY」是标准职场自我介绍"}', 1),
(2, 'choice', '{"question":"「請多多指教」幾時用？","options":["第一次見面時","食飯時","放工時","開會時"],"correct":0,"explanation":"「請多多指教」在初次见面时使用，表示请多关照"}', 1);

-- L1-3 数字与日期
INSERT INTO questions (course_id, type, question_json, difficulty) VALUES
(3, 'choice', '{"question":"「聽日」係咩意思？","options":["明天","昨天","今天","後天"],"correct":0,"explanation":"「聽日」(ting1 jat6) = 明天"}', 1),
(3, 'choice', '{"question":"「下個禮拜」即係？","options":["下周","上周","本周","下個月"],"correct":0,"explanation":"「禮拜」=星期，「下個禮拜」=下周"}', 1),
(3, 'fill', '{"question":"「聽日三點開會」，「三點」即係____點","answer":"下午三","hint":"下晝=下午"}', 1),
(3, 'choice', '{"question":"「幾點開會？」係咩意思？","options":["幾點開會？","邊個開會？","邊度開會？","點解開會？"],"correct":0,"explanation":"「幾點」=几点/什么时间"}', 1),
(3, 'choice', '{"question":"deadline嘅粵語係？","options":["截止日期","開始日期","休息日期","放假日期"],"correct":0,"explanation":"deadline = 截止日期，但香港职场通常直接用deadline"}', 1);

-- L2-1 茶水间闲聊
INSERT INTO questions (course_id, type, question_json, difficulty) VALUES
(7, 'choice', '{"question":"同事問你「食咗飯未？」，你應該答？","options":["食咗啦，你呢？","我唔識你","走開啦","唔關你事"],"correct":0,"explanation":"这是茶水间友好问候，相当于'吃了吗'，友好回应即可"}', 2),
(7, 'choice', '{"question":"「是但啦」係咩意思？","options":["隨便啦","一定啦","唔得","絕對唔得"],"correct":0,"explanation":"「是但啦」=随便啦，是香港人高频口头禅"}', 2),
(7, 'choice', '{"question":"「今日好塞車」，「塞車」即係？","options":["堵車","開車","快車","跑車"],"correct":0,"explanation":"「塞車」(sak1 ce1)=堵车"}', 2),
(7, 'choice', '{"question":"茶水間傾偈，最安全嘅話題係？","options":["天氣/交通/美食","政治/宗教","人工/花紅","同事是非"],"correct":0,"explanation":"香港人茶水间最安全话题是天气/交通/美食，不要聊敏感话题"}', 2),
(7, 'fill', '{"question":"「好攰」即係好____","answer":"累","hint":"gui6，做咗成日嘢嘅感覺"}', 2);

-- L2-2 约会议时间
INSERT INTO questions (course_id, type, question_json, difficulty) VALUES
(8, 'choice', '{"question":"「你幾時得閒？」係咩意思？","options":["你什麼時候有空？","你叫什麼名字？","你在哪裡？","你多少歲？"],"correct":0,"explanation":"「幾時得閒」=什么时候有空"}', 2),
(8, 'choice', '{"question":"約人開會，應該點講？","options":["不如約星期四下晝三點？","你即刻過嚟！","我唔得閒","唔關我事"],"correct":0,"explanation":"约会议应该礼貌地提议时间和日期"}', 2),
(8, 'choice', '{"question":"「改期」嘅意思係？","options":["改變日期/改期","取消","確認","開始"],"correct":0,"explanation":"「改期」=改变日期/重新安排"}', 2),
(8, 'fill', '{"question":"「____」即係confirm，約好時間之後要確認","answer":"確認","hint":"kok3 jing6，confirm咗先算數"}', 2),
(8, 'choice', '{"question":"如果約咗開會但去唔到，應該講？","options":["唔好意思，可唔可以改期？","我唔去啦","你等啦","唔關我事"],"correct":0,"explanation":"应该礼貌地提出改期请求"}', 2);

-- L3-1 部门会议发言
INSERT INTO questions (course_id, type, question_json, difficulty) VALUES
(13, 'choice', '{"question":"匯報進度時，應該點樣開頭？","options":["我負責嘅XX項目，目前進度係……","我唔知講咩好","你哋自己睇report啦","我今日好攰"],"correct":0,"explanation":"标准汇报开头：说明负责什么项目，当前进度如何"}', 3),
(13, 'choice', '{"question":"「阻滯」係咩意思？","options":["有阻礙/卡住了","好順利","已完成","未開始"],"correct":0,"explanation":"「阻滯」(zo2 zai6)=遇到阻碍/卡住了"}', 3),
(13, 'fill', '{"question":"遇到問題要同同事講，需要「____」","answer":"跟進","hint":"gan1 zeon3，follow up嘅意思"}', 3),
(13, 'choice', '{"question":"以下邊個詞唔係粵英混用？","options":["confirm","schedule","deadline","開會"],"correct":3,"explanation":"「開會」是纯粤语，其他三个都是香港会议中常用的英文词"}', 3),
(13, 'choice', '{"question":"開會時同事話「呢個project好chur」，意思係？","options":["呢個項目好趕/好忙","呢個項目好簡單","呢個項目取消咗","呢個項目好有趣"],"correct":0,"explanation":"「chur」=很赶/很忙/很拼，香港职场俚语"}', 3);

-- ===================== 评估题目 =====================
-- 听力维度 (3题)
INSERT INTO assessment_questions (type, question_json, dimension) VALUES
('listening', '{"question":"聽到同事講「聽日三點開會，你準時啊」，最準確嘅理解係？","options":["明天三點開會，叫你準時到","後天三點開會","今天三點開會","取消會議"],"correct":0,"explanation":"「聽日」=明天，「準時」=准时"}', 'listening'),
('listening', '{"question":"聽到「喂，請問係咪陳生？我係IT部嘅阿強」，呢個係？","options":["打電話自我介紹","面對面打招呼","發郵件","開會發言"],"correct":0,"explanation":"「喂」是电话开头语，这是在打电话"}', 'listening'),
('listening', '{"question":"同事講「今日好塞車，遲咗少少」，意思係？","options":["今日堵車，所以遲到了","今日開車好快","今日無開車","今日好早到"],"correct":0,"explanation":"「塞車」=堵车，「遲咗」=迟了"}', 'listening');

-- 情景维度 (3题)
INSERT INTO assessment_questions (type, question_json, dimension) VALUES
('speaking', '{"question":"同事同你講「早晨」，你應該答？","options":["早晨！","再見！","晚安！","你好嗎？"],"correct":0,"explanation":"「早晨」的回应也是「早晨」"}', 'speaking'),
('speaking', '{"question":"第一次見新同事，最適合講咩？","options":["你好，我係XX，請多多指教","你叫咩名？","我好忙唔得閒","你幾多歲？"],"correct":0,"explanation":"初次见面应礼貌自我介绍"}', 'speaking'),
('speaking', '{"question":"想約同事開會，最適合講？","options":["你幾時得閒？不如約個時間傾下？","即刻過嚟開會！","我唔想開會","你自己搞掂"],"correct":0,"explanation":"约会议应礼貌询问对方时间"}', 'speaking');

-- 阅读维度 (2题)
INSERT INTO assessment_questions (type, question_json, dimension) VALUES
('reading', '{"question":"讀到「聽日嘅Meeting改咗做兩點」，正確理解係？","options":["明天的會議改到兩點","會議取消了","會議在明天三點","今天兩點有會"],"correct":0,"explanation":"「聽日」=明天，「改咗做兩點」=改到两点"}', 'reading'),
('reading', '{"question":"讀到「份report send咗俾你，check下啦」，正確理解係？","options":["報告已發給你，請查看","報告未完成","報告有錯誤","需要重新寫報告"],"correct":0,"explanation":"「send咗」=已发送，「check下」=查看一下"}', 'reading');

-- 词汇维度 (2题)
INSERT INTO assessment_questions (type, question_json, dimension) VALUES
('vocabulary', '{"question":"配對：「跟進」嘅意思係？","options":["follow up","cancel","start","finish"],"correct":0,"explanation":"「跟進」(gan1 zeon3)=follow up"}', 'vocabulary'),
('vocabulary', '{"question":"配對：「開會」嘅意思係？","options":["meeting/have a meeting","lunch","holiday","training"],"correct":0,"explanation":"「開會」=开会/have a meeting"}', 'vocabulary');

-- ===================== 示例用户 =====================
INSERT INTO users (id, username, password, nickname, level, score, base_cantonese, learning_goal, position, company, avatar_color) VALUES
(1, 'demo', '$2a$10$dummyhashplaceholder0000000000000000000000000000', '阿明', 2, 150, 'basic', '下个月外派香港', 'FICO顾问', '越秀集团', '#FF6B35'),
(2, 'ahua', '$2a$10$dummyhashplaceholder0000000000000000000000000000', '阿花', 2, 120, 'basic', '对接香港客户', '项目经理', '腾讯', '#4ECDC4'),
(3, 'aqiang', '$2a$10$dummyhashplaceholder0000000000000000000000000000', '阿强', 3, 280, 'intermediate', '在香港office工作', 'IT顾问', '中银香港', '#45B7D1'),
(4, 'aling', '$2a$10$dummyhashplaceholder0000000000000000000000000000', '阿玲', 1, 80, 'none', '想学粤语方便工作', '财务分析师', '平安集团', '#96CEB4'),
(5, 'awing', '$2a$10$dummyhashplaceholder0000000000000000000000000000', '阿荣', 4, 450, 'fluent', '提升商务粤语', '高级顾问', '德勤', '#FFEAA7');

-- 注意: demo用户的密码需要通过 bcrypt 在服务端设置，这里只是占位。
-- 实际密码: demo用户密码为 "demo123", ahua为"demo123" 等
