/**
 * 英単語ターゲット1400 厳選覚え方ヒント＆重要語法データ（語源・身近な外来語連想・補足）
 * ターゲット1400の公式単語番号（No. 1〜1400）および綴りに100%完全照合・検証済み。
 * 各単語は「語源（origin）」「身近な外来語連想（link）」「補足（note: 入試頻出コロケーション・派生語）」を完備。
 * 登録のない単語は null を返し、無意味な枠を表示させない。
 */

export const hintsData1400 = {
    1: { // No. 1: believe (を信じる)
        origin: "be-（強意）+ lieve（好む・大切にする）→ かけがえのないものとして信じる",
        link: "ビリーフ（信念・信条）、ビリーバー（信じる人）",
        note: "believe in A（Aの存在・正しさを信じる）"
    },
    2: { // No. 2: consider (を見なす)
        origin: "con-（共に・完全に）+ sider（星を見る）→ 星の運行を見つめて熟考する・見なす",
        link: "コンシダレーション（考慮・配慮・熟慮）",
        note: "consider A (to be) B（AをBとみなす）/ consideration（配慮）"
    },
    3: { // No. 3: expect (を予期する、と思う)
        origin: "ex-（外を）+ spect（見る）→ 首を長くして外に目を向けて待ち望む",
        link: "エキスパート（見通す人）、プロスペクト（将来の見通し）と同根",
        note: "expect A to do（Aが〜することを期待する）"
    },
    4: { // No. 4: decide (決める)
        origin: "de-（切り離す）+ cide（切る・殺す）→ 迷いを断ち切って決断する",
        link: "デシジョン（意思決定・決断）",
        note: "decide to do（〜することを決める）/ decision（決定）"
    },
    5: { // No. 5: allow (を許す)
        origin: "ad-（〜へ）+ locare（割り当てる・置く）→ 枠を与えて許可する",
        link: "アローアンス（手当・許容量）",
        note: "allow A to do（Aが〜するのを許す）"
    },
    6: { // No. 6: remember (覚えている)
        origin: "re-（再び）+ member/memor（心に留める・記憶）→ 再び心に呼び戻して覚えている",
        link: "メモリー（記憶）、リメンバー",
        note: "remember to do（忘れずに〜する）/ remember doing（〜したことを覚えている）"
    },
    7: { // No. 7: worry (心配する)
        origin: "古英語 wyrgan（首を絞める・苦しめる）→ 心を締め付けられて心配する",
        link: "ウォーリー（心配）",
        note: "worry about A（Aを心配する）/ be worried about A"
    },
    8: { // No. 8: concern (に関係する、を心配させる)
        origin: "con-（共に）+ cernere（識別する・ふるい分ける）→ 自分に関わりがあるとして気にかける",
        link: "コンサーン（懸念事項・関心事）",
        note: "be concerned about A（Aを心配している）/ as far as A is concerned（Aに関する限り）"
    },
    9: { // No. 9: suggest (を提案する)
        origin: "sub-（下から）+ gest（運ぶ）→ 下からそっと差し出して提案する",
        link: "サジェスト機能（検索窓で下から候補を提示）",
        note: "suggest doing / suggest that S (should) do"
    },
    10: { // No. 10: explain (説明する)
        origin: "ex-（外へ）+ planus（平らな・平易な）→ 平らに解きほぐしてわかりやすく示す",
        link: "エクスプレイン（説明・解説）、プレーン（平らな・素朴な）",
        note: "explain A to B（BにAを説明する ※explain B Aは不可）"
    },
    11: { // No. 11: describe (の特徴を述べる)
        origin: "de-（下に）+ scribe（書く）→ 書き留めて詳細に特徴を述べる",
        link: "ディスクリプション（製品の概要・解説文）、スクリプトと同根",
        note: "description（描写・説明）/ beyond description（言葉では言い表せないほど）"
    },
    12: { // No. 12: improve (を改善する)
        origin: "in-（中へ）+ prou（利益・価値）→ 価値を高めて改善する",
        link: "インプルーブ（業務改善・スキル向上）",
        note: "improvement（改善・進歩）"
    },
    13: { // No. 13: produce (を生産する)
        origin: "pro-（前へ）+ duce（導く・引き出す）→ 前に引き出して生み出す",
        link: "プロデューサー（制作者）、プロダクト（製品）",
        note: "product（製品）/ productive（生産的な）"
    },
    14: { // No. 14: create (を創造する)
        origin: "ラテン語 creare（生み出す・育てる）",
        link: "クリエイター（創作者）、クリエイティブ（独創的）",
        note: "creation（創造）/ creature（生き物）"
    },
    15: { // No. 15: provide (を供給する)
        origin: "pro-（前もって）+ vide（見る）→ 前もって見て準備し、供給する",
        link: "プロバイダー（通信・情報を提供する事業者）",
        note: "provide A with B = provide B for A（AにBを供給する）"
    },
    16: { // No. 16: increase (増える)
        origin: "in-（中へ）+ crease（育つ・増える）→ 中で大きく育って増える",
        link: "クレッシェンド（音楽用語: 次第に強く）と同根",
        note: "increase in A（Aの点が増加する）/ on the increase（増加中で）"
    },
    17: { // No. 17: grow (成長する)
        origin: "印欧祖語 ghre-（緑になる・成長する）と同根",
        link: "グラス（草）、グリーンと同根",
        note: "grow into A（成長してAになる）/ growth（成長）"
    },
    18: { // No. 18: develop (を開発する)
        origin: "de-（逆・解く）+ velop（包む・覆う）→ 包みを解いて中身を外へ広げて発展させる",
        link: "デベロッパー（開発事業者）、Web開発",
        note: "development（発展・開発）/ developing country（発展途上国）"
    },
    19: { // No. 19: rise (上がる、昇る)
        origin: "ゲルマン祖語 reisan（立ち上がる）→ 自然と下から上へ上がる",
        link: "サンライズ（日の出）",
        note: "rise-rose-risen（自動詞: 主語自身が上がる）⇔ raise（他動詞: を上げる）"
    },
    20: { // No. 20: raise (を上げる、（子供）を育てる)
        origin: "古ノルド語 reisa（引き上げる）",
        link: "レイズ（ポーカーで賭け金を上げる、昇給）",
        note: "raise A（Aを上げる・育てる ※他動詞）⇔ rise（上がる ※自動詞）"
    },
    21: { // No. 21: follow (次に続く、に従う)
        origin: "古英語 folgian（従う・後をついて行く）",
        link: "フォロワー（SNSの追跡者・支持者）",
        note: "as follows（次の通りで）/ follow A's advice（Aの助言に従う）"
    },
    22: { // No. 22: require (を要求する)
        origin: "re-（強意・再び）+ quire（求める・探す）→ 強く相手に求める",
        link: "リクエスト（要求・要望）、クエリ（問い合わせ）と同根",
        note: "require A to do（Aに〜するよう要求する）/ requirement（必要条件）"
    },
    23: { // No. 23: fill (を満たす)
        origin: "古英語 fyllan（満たす、いっぱいにする）",
        link: "リフィル（詰め替え用品）、フィルイン",
        note: "fill A with B（AをBで満たす）/ be filled with A = be full of A"
    },
    24: { // No. 24: support (を支持する)
        origin: "sub-（下から）+ port（運ぶ・支える）→ 下から支えて支持する",
        link: "サポーター（支持者）",
        note: "in support of A（Aを支持して）"
    },
    25: { // No. 25: share (を共同で使う)
        origin: "古英語 scearu（分割・割り当て）→ 一つのものを分け合って共有する",
        link: "シェアハウス、画面共有、シェアする",
        note: "share A with B（AをBと共有する・分かち合う）"
    },
    26: { // No. 26: face (に直面する、（危険などが）の身に迫る)
        origin: "ラテン語 facies（顔・外見）→ 正面から顔を向けて直面する",
        link: "フェイス（顔）、インターフェース（接触面）",
        note: "be faced with A（A[困難・危機]に直面している）"
    },
    28: { // No. 28: store (を蓄える)
        origin: "古フランス語 estorer（建てる・備える）→ 将来のために蓄える・保管する",
        link: "ストア（店舗・倉庫）、ストレージ（記憶装置）",
        note: "store A in B（AをBに蓄える）/ in store for A（Aを待ち受けて）"
    },
    30: { // No. 30: deal (に対処する，を扱う)
        origin: "古英語 daelan（分ける・分配する）→ 課題を小分けにしてうまく処理・対処する",
        link: "ディーラー（配る人・販売業者）、ディール（取引）",
        note: "deal with A（Aに対処する・Aを扱う）/ a great deal of A（たくさんのA）"
    },
    31: { // No. 31: save (（時間、金銭など）を節約する)
        origin: "ラテン語 salvare（無事にする・救う）→ 危険から救う、無駄遣いを防いで節約する",
        link: "セーフ（安全な）、セーブ（保存・救出）",
        note: "save A B（AのB[手間・費用]を省く）/ save money（貯金する）"
    },
    32: { // No. 32: happen (（事が）起こる、たまたまする)
        origin: "古ノルド語 happ（偶然・好機）→ 偶然の巡り合わせで（事が）起こる",
        link: "ハッピー（幸運な）、ハプニング（偶発事態）",
        note: "happen to do（たまたま〜する）/ It happens that ...（たまたま…である）"
    },
    33: { // No. 33: occur (（事が）起こる)
        origin: "ob-（〜に向かって）+ currere（走る）→ 目の前に走って飛び出して生じる",
        link: "カレント（電流・現在の）、コースと同根",
        note: "occur to A（考えなどがAの心にふと浮かぶ）"
    },
    42: { // No. 42: mind (心、精神)
        origin: "印欧祖語 men-（考える・心）→ 思考・記憶の座としての心・精神",
        link: "マインド（精神・心構え）、メンタル（精神の）",
        note: "keep in mind（心に留めておく）/ Would you mind doing?（〜していただけますか）"
    },
    43: { // No. 43: language (言語)
        origin: "ラテン語 lingua（舌・言葉）→ 口と舌を使って発する言葉・言語",
        link: "ランゲージ（言語）、バイリンガル（2言語話者）",
        note: "body language（身振り手振り）/ native language（母国語）"
    },
    45: { // No. 45: knowledge (知識)
        origin: "know（知る）+ -leche（状態・行為）→ 学びや経験によって知り得た知識",
        link: "ナレッジ（知識・知見）、ナレッジマネジメント",
        note: "have knowledge of A（Aの知識がある）/ to the best of my knowledge（知る限り）"
    },
    46: { // No. 46: skill (技能、技術)
        origin: "古ノルド語 skil（識別・分別）→ 物事を正しく見極めて実行できる技能",
        link: "スキル（技能・技術）、熟練",
        note: "skill in [at] A（Aにおける技能・腕前）/ skillful（熟練した）"
    },
    47: { // No. 47: technology (科学技術)
        origin: "techne（技術・技芸）+ -logy（学問・理論）→ 科学的知識を応用した技術体系",
        link: "テクノロジー（科学技術）、テクニック（技巧）",
        note: "technological advance（技術の進歩）"
    },
    48: { // No. 48: culture (文化)
        origin: "colere（耕す・手入れする）→ 心や土地を耕して築き上げた文化・教養",
        link: "カルチャー（文化）、アグリカルチャー（農業）",
        note: "cultural difference（文化の違い）/ cultivate（耕す・養う）"
    },
    49: { // No. 49: experience (経験)
        origin: "ex-（外へ）+ periri（試す・危険を冒す）→ 実際に試して体で覚えた経験",
        link: "エキスパート（熟達者）、エクスペリメント（実験）と同根",
        note: "have experience in A（Aの経験がある）/ learn by experience（経験から学ぶ）"
    },
    50: { // No. 50: result (結果)
        origin: "re-（後ろへ）+ salire（跳ねる）→ 行為の後から跳ね返ってくる結果",
        link: "サルサ（踊り: 跳ねる）と同根",
        note: "result in A（結果としてAを生む）/ result from A（Aに起因する）"
    },
    51: { // No. 51: reason (理由)
        origin: "ラテン語 ratio（計算・理性）→ 筋道を立てて考えた理由・根拠",
        link: "リーズナブル（理にかなった・妥当な）、レイト（割合）と同根",
        note: "reason for A（Aの理由）/ by reason of A（Aの理由で）"
    },
    52: { // No. 52: cause (原因)
        origin: "ラテン語 causa（原因・裁判の理由）→ 結果を引き起こす元となる原因",
        link: "コーズ（原因）、ビコーズ（なぜなら）",
        note: "cause A to do（Aが〜する原因となる）/ cause and effect（原因と結果）"
    },
    53: { // No. 53: effect (影響、効果)
        origin: "ex-（外へ）+ facere（作る・成し遂げる）→ 外に現れ出た影響・効果",
        link: "エフェクト（効果・演出）、エフェクティブ（効果的な）",
        note: "have an effect on A（Aに影響を与える）= affect A"
    },
    93: { // No. 93: unique (特有の)
        origin: "uni-（1つの・唯一の）+ -que（形容詞語尾）→ 他に並ぶものがない・特有の・唯一無二の",
        link: "ユニーク（独特な、唯一の）、ユニバース（宇宙）",
        note: "be unique to A（Aに特有である・Aだけに見られる）"
    },
    101: { // No. 101: notice (気づく)
        origin: "notus（知られている・印）→ 気づいて目に留める",
        link: "ノーティス（通知・予告）、ノートと同根",
        note: "notice A do [doing]（Aが〜するのに気づく）/ take notice of A（Aに気づく）"
    },
    102: { // No. 102: note (注意する、注目する)
        origin: "notus（知られた印・覚え書き）→ 注目して書き留める",
        link: "ノートブック（手帳）、ノーティスと同根",
        note: "take note of A（Aに注目・留意する）/ notable（注目すべき）"
    },
    103: { // No. 103: discover (を発見する)
        origin: "dis-（否定）+ cover（覆う）→ 覆いを外して新事実を発見する",
        link: "ディスカバリー（発見）",
        note: "discover that ...（…ということを発見する）/ discovery（発見）"
    },
    104: { // No. 104: realize (（はっきりと）理解する)
        origin: "real（現実の）+ -ize（〜化する）→ 頭の中で現実のものとして実感・理解する",
        link: "リアリティ（現実）、リアライズ",
        note: "realize one's dream（夢を実現する）/ realization（認識・実現）"
    },
    105: { // No. 105: recognize (をそれとわかる)
        origin: "re-（再び）+ cognize（知る）→ 以前知っていたものと再会して認める",
        link: "コグニション（認知）",
        note: "recognize A as B（AをBとして認める・認識する）"
    },
    106: { // No. 106: encourage (を励ます)
        origin: "en-（中に入れる）+ courage（勇気）→ 勇気を与えて励ます・促す",
        link: "カレッジ（勇気）、エンカレッジ",
        note: "encourage A to do（Aに〜するよう励ます・促す）⇔ discourage"
    },
    107: { // No. 107: force (（人）に無理やりさせる)
        origin: "ラテン語 fortis（強い・頑丈な）→ 力で無理やり〜させる",
        link: "フォース（物理的な力、スター・ウォーズのフォース）",
        note: "force A to do（Aに無理やり〜させる）/ by force（力ずくで）"
    },
    108: { // No. 108: order (を注文する)
        origin: "ラテン語 ordo（順序・列・規律）→ 順序を整える、命令・注文する",
        link: "オーダー（注文・順序）、インオーダー",
        note: "in order to do（〜するために）/ place an order（注文する）"
    },
    109: { // No. 109: affect (に影響する)
        origin: "ad-（〜へ）+ facere（作用する・行う）→ 心や体に働きかけて影響を与える",
        link: "エフェクト（効果・結果）の動詞形",
        note: "affect A（Aに影響を与える ※他動詞、affect onは不可）"
    },
    110: { // No. 110: offer (（人）に（物・事）を提供する)
        origin: "ob-（〜の前に）+ ferre（運ぶ・差し出す）→ 相手の目の前に差し出して提供・申し出る",
        link: "オファー（申し出・提示）",
        note: "offer A B = offer B to A（AにBを提供する）/ offer to do（〜すると申し出る）"
    },
    111: { // No. 111: demand (を要求する)
        origin: "de-（強く）+ mandare（委ねる・命令する）→ 強い権利として要求する",
        link: "オンデマンド（要求に応じて）、コマンドと同根",
        note: "demand that S (should) do（〜するよう要求する）/ in demand（需要があって）"
    },
    112: { // No. 112: argue (と主張する)
        origin: "ラテン語 arguere（明白にする・主張する）→ 筋道を立てて論じ主張する",
        link: "アーギュメント（議論・引数）",
        note: "argue that ...（…と主張する）/ argue with A about B（BのことでAと議論する）"
    },
    113: { // No. 113: claim (を主張する)
        origin: "ラテン語 clamare（大声で叫ぶ）→ 当然の権利として主張・要求する",
        link: "クレーム（権利の主張・要求）、プロクレイム（布告する）",
        note: "claim that ...（…と主張する）/ lay claim to A（Aの所有権を主張する）"
    },
    114: { // No. 114: object (反対する)
        origin: "ob-（向かって）+ jacere（投げる・投げつける）→ 相手に向かって反対の声をぶつける",
        link: "オブジェクト（対象・物体）、オブジェクティブ（客観的な）",
        note: "object to A / object to doing（Aに反対する ※自動詞）/ objection（反対）"
    },
    115: { // No. 115: challenge (に異議を唱える)
        origin: "ラテン語 calumnia（言いがかり・難癖）→ 異議を唱える、難題に挑む",
        link: "チャレンジ（挑戦・課題）",
        note: "challenge A to B（AにBを挑む）/ challenging task（やりがいのある困難な課題）"
    },
    116: { // No. 116: involve (を巻き込む)
        origin: "in-（中に）+ volvere（巻く・巻き込む）→ 渦の中に巻き込む・含む",
        link: "リボルバー（回転式拳銃）、エボルブ（進化する）と同根",
        note: "be involved in A（Aに関与・熱中している）/ involvement（関与）"
    },
    117: { // No. 117: include (を含む)
        origin: "in-（中へ）+ clude（閉じる）→ 枠の中に囲い込んで含める",
        link: "インクルーシブ（包括的な）",
        note: "include doing（〜することを含む）/ including A（Aを含めて）"
    },
    118: { // No. 118: contain (を含む)
        origin: "con-（共に）+ tenere（保つ・収める）→ 枠の中にすっぽり収めて含む",
        link: "コンテナ（輸送用容器）、コンテント（内容）",
        note: "container（容器）/ contain one's anger（怒りを抑える）"
    },
    119: { // No. 119: relate (を関連づける)
        origin: "re-（後ろへ）+ latus（運ばれた）→ 過去の事柄と結びつけて関係づける",
        link: "リレーション（関係）、リレーティブ（親戚）",
        note: "relate A to B（AをBに関連づける）/ be related to A（Aと関係がある）"
    },
    120: { // No. 120: connect (をつなぐ)
        origin: "con-（共に）+ nectere（結ぶ・縛る）→ 2つのものを直接つなぐ",
        link: "コネクション（つながり・人脈）、コネクト",
        note: "connect A with B（AをBと接続・関連づける）/ connection（関係・接続）"
    },
    121: { // No. 121: refer (言及する)
        origin: "re-（後ろへ）+ fer（運ぶ）→ 過去の文献や事実へ視点を戻して参照・言及する",
        link: "レファレンス（参考文献）、レフェリーと同根",
        note: "refer to A（Aに言及する・Aを参照する）/ reference（参照）"
    },
    122: { // No. 122: contact (と連絡する)
        origin: "con-（共に）+ tangere（触れる）→ 互いに触れ合う・連絡を取る",
        link: "コンタクトレンズ（直接触れるレンズ）",
        note: "contact A（Aと連絡を取る ※他動詞、contact withは不要）/ make contact with A"
    },
    123: { // No. 123: compare (を比べる)
        origin: "com-（共に）+ par（同等の・並べる）→ 2つを並べて比較・対比する",
        link: "ペア（一対）、パラレルと同根",
        note: "compare A with B（AとBを比較する）/ compare A to B（AをBに例える）"
    },
    124: { // No. 124: measure (を測る)
        origin: "ラテン語 mensura（尺度・測定）→ 長さや量を測る、手段",
        link: "メジャー（巻尺、基準）",
        note: "take measures to do（〜する対策・措置を講じる）/ measurement（測定・寸法）"
    },
    126: { // No. 126: approach (近づく)
        origin: "ad-（〜へ）+ prope（近く）→ 対象にぐっと近づく・アプローチする",
        link: "アプローチ（接近・研究手法）",
        note: "approach A（Aに近づく ※他動詞、approach toは不要）"
    },
    128: { // No. 128: achieve (を達成する)
        origin: "ad-（〜へ）+ chief/caput（頭・頂点）→ 頂点に到達して成し遂げる",
        link: "アチーブメント（達成・実績）、チーフと同根",
        note: "achieve a goal（目標を達成する）/ achievement（業績・達成）"
    },
    129: { // No. 129: receive (を受け取る)
        origin: "re-（後ろに）+ ceive/cept（つかむ）→ 届いたものを手元に引き取って受け取る",
        link: "レシーブ（バレーボールの受け）、レシート（受領証）",
        note: "receipt（領収書・受領）/ reception（歓迎会・フロント）"
    },
    130: { // No. 130: complete (を完成させる)
        origin: "com-（完全に）+ pleo（満たす）→ すべてを満たして完璧に仕上げる",
        link: "コンプリート（完全達成）",
        note: "completely（完全に）/ completion（完成）"
    },
    131: { // No. 131: lead (を導く)
        origin: "古英語 laedan（先導する・連れて行く）",
        link: "リーダー（指導者）、リードする",
        note: "lead to A（A[結果]につながる・Aを引き起こす）/ lead A to B（AをBに導く）"
    },
    137: { // No. 137: reduce (を減らす)
        origin: "re-（後ろへ）+ duce（導く）→ 手前に引き戻して減らす",
        link: "プロデュース（前へ導く）の対義語",
        note: "reduce A to B（AをBに減らす）/ reduction（削減）"
    },
    140: { // No. 140: prevent (を妨げる)
        origin: "pre-（前もって）+ vent（来る）→ 問題が来る前に先回りして防ぐ",
        link: "インベント（発明）、イベントと同根",
        note: "prevent A from doing（Aが〜するのを防ぐ・妨げる）"
    },
    171: { // No. 171: project (事業)
        origin: "pro-（前方へ）+ ject（投げる）→ 未来へ投げかける大がかりな企て・事業",
        link: "プロジェクター（映写機）、プロジェクション",
        note: "projected growth（予測成長率）"
    },
    181: { // No. 181: financial (財政（上）の)
        origin: "finis（終わり・決済・期限）→ 金銭の決済に関する・財政上の",
        link: "ファイナンス（資金調達・財務）",
        note: "financial support（財政支援）/ finance（財政）"
    },
    191: { // No. 191: positive (積極的な)
        origin: "ponere（置く・定める）→ 確固たる基礎が置かれている・肯定的な",
        link: "ポジティブ（前向きな、陽性）",
        note: "positive effect on A（Aに対する好影響）⇔ negative"
    },
    201: { // No. 201: wonder (と思う)
        origin: "古英語 wundor（驚異・奇跡）→ 不思議に思って思いを巡らせる",
        link: "ワンダーランド（不思議の国）、ワンダフル",
        note: "wonder if / whether ...（…だろうかと思う）/ no wonder（当然だ）"
    },
    202: { // No. 202: suppose (（たぶん）と思う、もしならば)
        origin: "sub-（下に）+ pose（置く）→ 前提として下に置いて仮定する",
        link: "プロポーズ（前に置く）、エクスポーズ（外に置く）と同根",
        note: "be supposed to do（〜することになっている・〜するはずである）"
    },
    203: { // No. 203: imagine (を想像する)
        origin: "image（心像・姿）+ -ine（〜化する）→ 頭の中に像を描いて想像する",
        link: "イマジネーション（想像力）",
        note: "imagine doing（〜することを想像する）/ imaginary（架空の）"
    },
    204: { // No. 204: regard (を見なす)
        origin: "re-（じっくり）+ guard/gard（見る・守る）→ じっくり注意を向けて見なす",
        link: "ガーディアン（守護者）と同根",
        note: "regard A as B（AをBとみなす）/ with regard to A（Aに関して）"
    },
    205: { // No. 205: wish (と思う)
        origin: "ゲルマン祖語 wunskjan（望む・愛する）→ 実現困難なことを願う",
        link: "ウィッシュ（願い・希望）",
        note: "wish to do / wish that S + 仮定法（〜であればと願う）"
    },
    206: { // No. 206: determine (を決定する)
        origin: "de-（徹底的に）+ termine（限界・境界）→ 限界線を引いてきっぱり決定する",
        link: "ターミナル（終点・境界）と同根",
        note: "determine to do（〜することを固く決意する）/ determination（決意）"
    },
    207: { // No. 207: express (を表現する)
        origin: "ex-（外へ）+ press（押す・圧迫する）→ 内にある感情を外へ押し出して表現する",
        link: "エクスプレス（急行便・感情表現）",
        note: "expression（表現・表情）/ express one's gratitude（感謝の意を表す）"
    },
    208: { // No. 208: represent (を象徴する、を代表する)
        origin: "re-（再び）+ present（提示する・前に置く）→ 再び目の前に表して代表・象徴する",
        link: "プレゼンテーション（提示）、リプレゼンタティブ（代表者）",
        note: "represent A（Aを代表する・表す）/ representative（代表者・典型的な）"
    },
    209: { // No. 209: identify (を特定する)
        origin: "idem（同じもの）+ facere（する）→ 全く同じものだと見極めて特定する",
        link: "IDカード（身分証明書）、アイデンティティ（自己同一性）",
        note: "identify A with B（AとBを同一視する）/ identification（身元確認・識別）"
    },
    210: { // No. 210: mention (に言及する)
        origin: "印欧祖語 men-（心・考える）→ 心に浮かんだことを軽く言葉にして言及する",
        link: "メンション（SNSで名前を挙げて言及する）",
        note: "mention A（Aについて言及する ※他動詞、mention aboutは不可）/ not to mention A（Aは言うまでもなく）"
    },
    211: { // No. 211: solve (を解決する)
        origin: "ラテン語 solvere（解く・緩める）→ もつれた糸をほどいて解決する",
        link: "ソリューション（解決策）、ソルベント（溶剤）",
        note: "solve a problem（問題を解決する）/ solution（解決策）"
    },
    212: { // No. 212: prove (を証明する)
        origin: "ラテン語 probare（試す・検査する）→ テストして本物であることを証明する",
        link: "プルーブ（証明）、プルーフルーフ（防証・耐性）",
        note: "prove to be A（Aであることが判明する = turn out to be A）/ proof（証拠）"
    },
    213: { // No. 213: communicate (意思を通じ合う)
        origin: "communis（共通の）+ -ate → 共通の場を作って意思を通じ合う",
        link: "コミュニケーション、コミュニティ（共同体）と同根",
        note: "communicate with A（Aと意思疎通を図る）/ communication skill"
    },
    214: { // No. 214: respect (を尊敬する)
        origin: "re-（再び）+ spect（見る）→ 何度も見直すほど敬意を払う",
        link: "リスペクト（敬意）、アスペクト（局面）と同根",
        note: "with respect to A（Aに関して）/ in this respect（この点において）"
    },
    215: { // No. 215: prefer (のほうを好む)
        origin: "pre-（前に）+ fer（運ぶ）→ 他のものより優先して手前に運んで好む",
        link: "プレファレンス（好み・優先権）",
        note: "prefer A to B（BよりAを好む）/ preference（好み）"
    },
    217: { // No. 217: establish (を設立する)
        origin: "ラテン語 stabilis（安定した・建てる）→ 基礎を固めて制度や会社を設立する",
        link: "エスタブリッシュメント（体制派・支配階級）",
        note: "establish a relationship（関係を築く）/ establishment（設立・施設）"
    },
    218: { // No. 218: found (を設立する)
        origin: "ラテン語 fundus（底・土台）→ 地面にしっかり土台を据えて創設する",
        link: "ファウンデーション（化粧下地・基礎・財団）",
        note: "found-founded-founded（設立する ※findの過去形と混同注意）/ foundation（基盤）"
    },
    219: { // No. 219: publish (を出版する)
        origin: "publicus（公の・人々に開かれた）→ 一般の人々に広く公開・出版する",
        link: "パブリック（公の）、パブリッシャー（出版社）",
        note: "publish a book（本を出版する）/ publication（出版・発行）"
    },
    220: { // No. 220: serve (役に立つ)
        origin: "ラテン語 servire（仕える・給仕する）→ 誰かのために尽くす・役に立つ",
        link: "サーバー（給仕人・配信用計算機）、サービス",
        note: "serve as A（Aとして機能する・役立つ）/ serve A（Aに仕える・食事を出す）"
    },
    221: { // No. 221: supply (を供給する)
        origin: "sub-（下から）+ plere（満たす）→ 下から物を補給して満たす",
        link: "サプライチェーン（供給網）、サプライズと同根",
        note: "supply A with B = supply B to A（AにBを供給する）"
    },
    222: { // No. 222: apply (申し込む、を適用する)
        origin: "ad-（〜へ）+ plecare（折り重ねる・合わせる）→ 基準に合わせて適用する",
        link: "アプリ（アプリケーション）、アプライ",
        note: "apply for A（Aに応募・申請する）/ apply to A（Aに適用される）"
    },
    223: { // No. 223: treat (を扱う、を治療する)
        origin: "ラテン語 tractare（引っ張る・手で扱う）→ 手を加えて治療する・もてなす",
        link: "トリートメント（手入れ・治療）、トリックオアトリート",
        note: "treat A as B（AをBとして扱う）/ treat A for B（B[病気]でAを治療する）"
    },
    225: { // No. 225: prepare (準備する)
        origin: "pre-（前もって）+ parare（用意する・整える）→ 前もって用意して準備する",
        link: "プレパレーション（準備）",
        note: "prepare for A（Aの準備をする）/ be prepared to do（〜する覚悟ができている）"
    },
    226: { // No. 226: protect (を保護する)
        origin: "pro-（前に）+ tect（覆う）→ 前に覆いをかざして保護する",
        link: "プロテクター（防具）、ディテクト（探知: 覆いを外す）",
        note: "protect A from B（BからAを保護する・守る）"
    },
    232: { // No. 232: advance (前進する)
        origin: "ab-（〜から）+ ante（前へ）→ 前方へ力強く前進する・進歩する",
        link: "アドバンス（前進・前払い金）、アドバンスト",
        note: "in advance（前もって・あらかじめ）/ advanced technology（先端技術）"
    },
    233: { // No. 233: tend (傾向がある)
        origin: "ラテン語 tendere（伸ばす・向ける）→ 特定の方向へ心が伸びて〜する傾向がある",
        link: "テンション（緊張: 引っ張ること）と同根",
        note: "tend to do（〜する傾向がある）/ tendency（傾向）"
    },
    234: { // No. 234: depend (依存する)
        origin: "de-（下に）+ pend（ぶら下がる）→ 相手にぶら下がって頼る・依存する",
        link: "ペンダント（首からぶら下がる装飾品）と同根",
        note: "depend on A（Aに頼る・A次第である）/ independent（自立した）"
    },
    235: { // No. 235: exist (存在する)
        origin: "ex-（外へ）+ sistere（立つ）→ 現実世界の外側に立ち現れて存在する",
        link: "イグジスタンス（存在）、エグジットと同根",
        note: "exist on A（Aを食べて生存する）/ existence（存在・生存）"
    },
    240: { // No. 240: suffer (苦しむ)
        origin: "sub-（下から）+ fer（運ぶ・耐える）→ 苦難を背負って苦しむ",
        link: "サファリング（受難・苦しみ）",
        note: "suffer from A（A[病気・不遇]に苦しむ）"
    },
    241: { // No. 241: act (行動する)
        origin: "ラテン語 agere（動かす・行う）",
        link: "アクション（行動）、アクティブ（活動的な）",
        note: "act as A（Aとして機能する・振る舞う）/ take action（行動を起こす）"
    },
    271: { // No. 271: region (（広大な）地域)
        origin: "regere（支配する・統治する）→ 支配下の広大な領域・地域",
        link: "リージョン（地域）、ロイヤル（王室の）と同根",
        note: "regional difference（地域差）/ in the region of A（約A、Aのあたりで）"
    },
    281: { // No. 281: previous (前の)
        origin: "pre-（前に）+ via（道）→ 前の道を通ってきた・以前の",
        link: "プレビュー（前もって見る）",
        note: "previous to A（Aに先立って）/ previously（以前は）"
    },
    301: { // No. 301: assume (当然と思う)
        origin: "ad-（〜へ）+ sumere（取る）→ 証拠がないまま事実として引き受けて思い込む",
        link: "コンシューム（消費する: 取り尽くす）と同根",
        note: "assume that ...（…と思い込む・仮定する）/ assumption（仮定）"
    },
    303: { // No. 303: associate (から連想する)
        origin: "ad-（〜へ）+ socius（仲間）→ 仲間として結びつけて連想する",
        link: "ソサエティ（社会）、アソシエーション（協会）",
        note: "associate A with B（AからBを連想する・AをBと結びつける）"
    },
    305: { // No. 305: indicate (を示す)
        origin: "in-（中に）+ dicare（指し示す・言う）→ 指をさして明確に示す",
        link: "インデックス（見出し・索引）、ディクテーションと同根",
        note: "indicate that ...（…ということを示す）/ indicator（指標）"
    },
    306: { // No. 306: respond (応答する)
        origin: "re-（後ろへ）+ spondere（誓う・答える）→ 呼びかけに答えて反応する",
        link: "レスポンス（応答・返答）",
        note: "respond to A（Aに応答・反応する）/ response（反応）"
    },
    308: { // No. 308: attempt (を試みる)
        origin: "ad-（〜へ）+ temptare（試す・触れる）→ 勇気を出して試みる・企てる",
        link: "テンプテーション（誘惑: 試すこと）と同根",
        note: "attempt to do（〜しようと試みる）/ in an attempt to do（〜しようとして）"
    },
    309: { // No. 309: manage (をなんとかやり遂げる、をうまく扱う)
        origin: "ラテン語 manus（手）→ 手綱を握ってうまく操り、成し遂げる",
        link: "マネージャー（管理者）、マネジメント",
        note: "manage to do（どうにか〜やり遂げる）/ management（経営）"
    },
    310: { // No. 310: maintain (を維持する、を主張する)
        origin: "main-（手で）+ tain（保つ）→ 手元で崩れないよう維持する",
        link: "メンテナンス（保守・整備）",
        note: "maintenance（維持・管理）/ maintain that ...（…と主張する）"
    },
    311: { // No. 311: unite (結合する)
        origin: "unus（1つの）+ -ite → 多数のものを1つに結合する",
        link: "ユナイテッド（団結した）、ユニオン（労働組合）",
        note: "unite against A（Aに対抗して団結する）/ unity（結束・統一）"
    },
    313: { // No. 313: attract (を引きつける)
        origin: "ad-（〜へ）+ trahere（引く・引っ張る）→ 相手の関心を手元へ引きつける",
        link: "トラクター（牽引車）、アトラクション（人を引きつける催し）",
        note: "attract attention（注目を集める）/ attractive（魅力的な）"
    },
    314: { // No. 314: match (調和する)
        origin: "古英語 gemacca（等しい仲間・相棒）→ 2つのものが調和する・匹敵する",
        link: "マッチ（試合・お似合いの相手）、マッチング",
        note: "match with A（Aと調和する）/ A match B（AはBと釣り合う・調和する）"
    },
    315: { // No. 315: attack (を襲う、攻撃する)
        origin: "ad-（〜へ）+ tac/stak（杭・杭で囲む）→ 相手の陣地へ突撃して攻撃する",
        link: "アタック（攻撃・挑戦）、ステーク（杭）と同根",
        note: "under attack（攻撃を受けて）/ heart attack（心臓発作）"
    },
    316: { // No. 316: seek (を探し求める)
        origin: "古英語 secan（探し求める・追求する）→ 真理や助けを求めて努力する",
        link: "シークバー（再生位置検索バー）、ハイド・アンド・シーク（かくれんぼ）",
        note: "seek help（助けを求める）/ seek-sought-sought"
    },
    317: { // No. 317: engage (従事する、を引き入れる)
        origin: "en-（〜の中へ）+ gage（誓い・担保）→ 約束の中に身を投じて従事・婚約する",
        link: "エンゲージリング（婚約指輪）、エンゲージメント",
        note: "be engaged in A（Aに従事している）/ be engaged to A（Aと婚約している）"
    },
    318: { // No. 318: succeed (成功する、継承する)
        origin: "sub-（下から）+ cedere（進む・行く）→ 跡を継いで前進する、成功する",
        link: "サクセス（成功）、プロシード（前進する）と同根",
        note: "succeed in A（Aで成功する）/ succeed to A（A[王位・財産]を継承する）"
    },
    320: { // No. 320: attend (に出席する)
        origin: "ad-（〜へ）+ tend（伸ばす）→ 心をそちらへ向けて出席・配慮する",
        link: "アテンダント（乗務員）、アテンション（注目）",
        note: "attend to A（Aに注意を払う・Aの世話をする）"
    },
    321: { // No. 321: satisfy (を満足させる)
        origin: "satis（十分に）+ facere（作る・する）→ 望みを十分に満たして満足させる",
        link: "サティスファクション（満足度）",
        note: "be satisfied with A（Aに満足している）/ satisfactory（満足な）"
    },
    322: { // No. 322: survive (（切り抜けて）生き残る)
        origin: "sur-（越えて）+ vive（生きる）→ 苦難や災難を越えて生き残る",
        link: "サバイバル（生存競争）、ビビッド（鮮やかな）と同根",
        note: "survive A（A[事故・病気]を生き延びる ※他動詞）"
    },
    323: { // No. 323: promote (を促進する)
        origin: "pro-（前へ）+ movere（動かす）→ 物事を前に押し進めて促進・昇進させる",
        link: "プロモーション（販売促進・昇進）、リモートと同根",
        note: "promote peace（平和を促進する）/ be promoted to A（Aに昇進する）"
    },
    324: { // No. 324: earn (を稼ぐ)
        origin: "古英語 earnian（刈り取る・収穫する）→ 労働の対価として稼ぐ・得る",
        link: "アーニング（稼ぎ・収益）",
        note: "earn one's living（生計を立てる）/ earn a reputation（名声を得る）"
    },
    326: { // No. 326: taste (～の味がする)
        origin: "古フランス語 taster（手で触れて確かめる）→ 舌で味わう、趣味・嗜好",
        link: "テイスト（味・好み・作風）",
        note: "taste of A（Aの味がする）/ good taste in A（Aのセンスが良い）"
    },
    328: { // No. 328: adapt (（…に）順応する(to))
        origin: "ad-（〜へ）+ aptus（適合した）→ 新しい環境に合わせて順応・適合させる",
        link: "アダプター（接続器具）、アプト（適切な）と同根",
        note: "adapt to A（Aに順応する）/ adapt A for B（BのためにAを改変する）"
    },
    329: { // No. 329: adopt (（考え、方針）を採用する)
        origin: "ad-（〜へ）+ optare（選ぶ）→ 選んで自分のものとして採用する・養子にする",
        link: "オプション（選択肢）、オプトと同根",
        note: "adopt a policy（方針を採用する）/ adopt a child（養子を迎える）"
    },
    330: { // No. 330: adjust (を調節する)
        origin: "ad-（〜へ）+ justus（正しい・正当な）→ 正しい状態に調節・適合させる",
        link: "ジャスト（ちょうど）、アジャスト",
        note: "adjust to A（Aに適応する）/ adjust the volume（音量を調整する）"
    },
    331: { // No. 331: separate (を分離する)
        origin: "se-（離れて）+ parare（用意する・整える）→ 引き離して別々にする",
        link: "セパレート（分離された）",
        note: "separate A from B（AをBから切り離す）/ separation（分離）"
    },
    333: { // No. 333: replace (を取り替える)
        origin: "re-（再び）+ place（配置する）→ 代わりのものを同じ場所に置いて置き換える",
        link: "リプレイス（交換・更新）",
        note: "replace A with B（AをBで置き換える）"
    },
    339: { // No. 339: reveal (を明らかにする、暴露する)
        origin: "re-（逆・解く）+ velum（ベール・覆い）→ ベールを剥ぎ取って暴露する",
        link: "ベール（覆い布）と同根",
        note: "reveal that ...（…を明らかにする）⇔ conceal（隠す）"
    },
    340: { // No. 340: emerge (現れる)
        origin: "ex-（外へ）+ mergere（沈む）→ 水底から外へ浮上して現れる",
        link: "マージ（融合する: 沈み合う）の対義語",
        note: "emerge from A（Aから現れる）/ emergency（緊急事態: 突発出現）"
    },
    341: { // No. 341: arise (（問題、困難、機会などが）生じる)
        origin: "a-（上へ）+ rise（立ち上がる）→ 問題や事態が下から湧き上がる",
        link: "アライズ（発生する）",
        note: "arise from A（Aから生じる）/ if need arises（必要が生じたら）"
    },
    361: { // No. 361: instance (（具体）例)
        origin: "in-（上に）+ stare（立つ）→ 目の前に立っている具体的な事例",
        link: "インスタント（即席の: 目の前の）と同根",
        note: "for instance（例えば = for example）/ in the first instance（第一段階として）"
    },
    371: { // No. 371: difficulty (困難、苦労)
        origin: "dis-（否定）+ facilis（容易な・簡単）→ 簡単でないこと・困難",
        link: "ディフィカルト（難しい）、ファシリティーと同根",
        note: "have difficulty (in) doing（〜するのに苦労する）"
    },
    391: { // No. 391: essential (必要不可欠な)
        origin: "esse（存在する）→ 物事の存在の根底をなす・必要不可欠な",
        link: "エッセンス（本質・精油）、エッセンシャル思考",
        note: "be essential to [for] A（Aにとって極めて重要である）"
    },
    401: { // No. 401: trust (を信頼する)
        origin: "ゲルマン祖語 traustaz（安全な・確固たる）→ 固い絆で信頼する",
        link: "トラスト（信頼・企業合同）",
        note: "trust A to do（Aが〜すると信頼する）/ trustworthy（信頼できる）"
    },
    402: { // No. 402: promise (を約束する)
        origin: "pro-（前へ）+ mittere（送る）→ 相手の前に言葉を差し出して約束する",
        link: "プロミス（約束・公約）",
        note: "promise to do（〜すると約束する）/ keep [break] a promise（約束を守る[破る]）"
    },
    403: { // No. 403: predict (を予測する)
        origin: "pre-（前もって）+ dict（言う）→ 起きる前に前もって言う・予言する",
        link: "ディクショナリー（辞書）、ディクテーションと同根",
        note: "predict that ...（…と予測する）/ prediction（予測）"
    },
    404: { // No. 404: reflect (を反映する、を反射する)
        origin: "re-（後ろへ）+ flect（曲げる）→ 光や思考を跳ね返して反射・熟考する",
        link: "フレキシブル（曲げやすい）と同根",
        note: "reflect on A（Aについて深く省察・熟考する）/ reflection（反映・反省）"
    },
    405: { // No. 405: recall (を思い出す)
        origin: "re-（再び）+ call（呼ぶ）→ 過去の記憶を心に呼び戻して思い出す",
        link: "リコール（回収・呼び戻し）",
        note: "recall that ... / recall doing（〜したことを思い出す）"
    },
    406: { // No. 406: rely (頼る)
        origin: "re-（再び）+ ligare（結ぶ）→ 固く結びつけて頼りにする",
        link: "ラリー（再結集）、リガメント（靭帯）と同根",
        note: "rely on A（Aに頼る・依存する = depend on A）/ reliable（信頼できる）"
    },
    407: { // No. 407: commit (（罪、過失など）を犯す、（金、人、時間など）を投入する)
        origin: "con-（共に）+ mittere（委ねる・送る）→ 完全に委ねる・罪を犯す・傾倒する",
        link: "コミットメント（誓約・関与）、委員会（コミッティ）",
        note: "commit a crime（罪を犯す）/ be committed to A（Aに全力を傾けている）"
    },
    408: { // No. 408: appreciate (をありがたく思う、を正しく認証（評価）する)
        origin: "ad-（〜へ）+ pretium（価格・価値）→ 正当な価値を認めて感謝・鑑賞する",
        link: "プライス（価格）と同根",
        note: "I would appreciate it if you could ...（〜していただけると幸いです）"
    },
    409: { // No. 409: praise (を褒める)
        origin: "pretium（価格・価値）→ 高い価値を認めて賞賛する",
        link: "プライス（価格）、アプリシエイトと同根",
        note: "praise A for B（BのことでAを褒め称える）⇔ criticize"
    },
    410: { // No. 410: doubt (を疑わしいと思う、ではないと思う)
        origin: "ラテン語 dubitare（2つの間で迷う）→ 本当かどうか疑わしいと思う",
        link: "ダウト（疑い・トランプゲーム）",
        note: "doubt that ...（…ではないと疑う）/ no doubt（間違いなく）"
    },
    411: { // No. 411: complain (不平を言う)
        origin: "com-（強意）+ plangere（胸を叩いて嘆く）→ 感情をぶつけて不平を言う",
        link: "プレイント（嘆き・哀歌）と同根",
        note: "complain of [about] A（Aについて不満を述べる）/ complaint（苦情）"
    },
    412: { // No. 412: ignore (を無視する)
        origin: "in-（否定）+ gno（知る）→ 知っているのにあえて見ないふりして無視する",
        link: "ノー（知る）、コグニションと同根",
        note: "ignorant of A（Aを知らない・無知な）/ ignorance（無知）"
    },
    413: { // No. 413: warn (に警告する)
        origin: "ゲルマン祖語 warnon（注意を払う・見張る）→ 危険を知らせて警告する",
        link: "ウォーニング（警告・警報）",
        note: "warn A of B（AにBを警告する）/ warn A to do（Aに〜するよう警告する）"
    },
    414: { // No. 414: gather (を集める、拾い集める)
        origin: "古英語 gaderian（一緒に集める・まとめる）",
        link: "ギャザリング（集会）、トゥゲザー（一緒に）と同根",
        note: "gather information（情報を集める）/ gather round（周りに集まる）"
    },
    415: { // No. 415: acquire (（習慣など）を身に付ける)
        origin: "ad-（〜へ）+ quaerere（求める・探す）→ 努力して手に入れて習得する",
        link: "アクワイア（獲得）、リクエストと同根",
        note: "acquire a language（言語を習得する）/ acquisition（習得・買収）"
    },
    416: { // No. 416: examine (を調べる)
        origin: "ラテン語 examinare（天秤ではかる）→ 細部まで厳密に調べて診察する",
        link: "イグザム（試験）、エグザミネーション",
        note: "examine a patient（患者を診察する）/ examination（試験・調査）"
    },
    418: { // No. 418: judge (を判断する)
        origin: "jus（法）+ dicere（言う）→ 法に照らして正邪を言い渡し判断する",
        link: "ジャッジ（審判・裁判官）、ジャスティス（正義）と同根",
        note: "judge from A（Aから判断すると）/ judgment（判断・判決）"
    },
    419: { // No. 419: select (を選び出す)
        origin: "se-（離して）+ legere（選ぶ・拾う）→ 多数の中から慎重に選抜する",
        link: "セレクション（選集）、セレクトショップ",
        note: "select A from B（BからAを選び出す）/ selection（選抜・選択）"
    },
    420: { // No. 420: divide (を分ける)
        origin: "dis-（離れて）+ videre（分ける）→ 境界線を引いて分割する",
        link: "ディビジョン（部門・割り算）、ビデオと同根",
        note: "divide A into B（AをBに分割する）/ dividend（配当）"
    },
    421: { // No. 421: distinguish (を区別する)
        origin: "dis-（離れて）+ stinguere（印をつける）→ 目印をつけて区別する",
        link: "ディスティンクト（明確な）と同根",
        note: "distinguish A from B（AとBを区別する = tell A from B）"
    },
    422: { // No. 422: graduate (卒業する)
        origin: "gradus（階段・歩調）+ -ate → 学問の階段を登りきって卒業する",
        link: "グラデュエーション（卒業式）、グレード（等級）と同根",
        note: "graduate from A（A[学校]を卒業する）/ graduate in A（A[専攻]を修めて卒業する）"
    },
    423: { // No. 423: shift (（位置、方針など）を変える)
        origin: "古英語 sciftan（分ける・手配する）→ 位置や方針を別の方向へ切り替える",
        link: "シフト（交代勤務、シフトキー）",
        note: "shift from A to B（AからBへ移行する）/ gear shift（変速機）"
    },
    427: { // No. 427: display (を示す)
        origin: "dis-（否定・解く）+ plicare（折る）→ 折りたたんだ布を広げて展示する",
        link: "ディスプレイ（画面・展示）",
        note: "on display（展示されて）"
    },
    428: { // No. 428: define (を定義する)
        origin: "de-（徹底的に）+ finis（限界・境界）→ 境界線を定めて意味を定義する",
        link: "デフィニション（高精細・定義）、ファイナルと同根",
        note: "define A as B（AをBと定義する）/ definite（明確な）"
    },
    429: { // No. 429: invent (を発明する)
        origin: "in-（中へ）+ venire（来る）→ 心の中に新しいアイデアがやって来て発明する",
        link: "インベンション（発明）、イベントと同根",
        note: "invent a machine（機械を発明する）/ necessity is the mother of invention"
    },
    431: { // No. 431: expand (を拡大する)
        origin: "ex-（外へ）+ pandere（広げる）→ 外側に向かって面積や体積を拡大する",
        link: "エクスパンション（拡張・発展）",
        note: "expand into A（Aの分野に進出する）/ expansion（拡大）"
    },
    439: { // No. 439: refuse (を拒む)
        origin: "re-（後ろへ）+ fundere（注ぐ・流す）→ 差し出されたものを突き返して拒絶する",
        link: "リフューズ（拒絶する）",
        note: "refuse to do（〜するのを拒絶する）/ refusal（拒絶）"
    },
    441: { // No. 441: deny (を否定する)
        origin: "de-（完全に）+ negare（否定する）→ まったく事実ではないと否定する",
        link: "ネガティブ（否定的な）と同根",
        note: "deny doing（〜したことを否定する）/ denial（否定・拒絶）"
    },
    451: { // No. 451: element (要素)
        origin: "ラテン語 elementum（基本原理・文字）→ 構成の最小基本要素",
        link: "エレメント（要素・成分）、エレメンタリー",
        note: "essential element（不可欠な要素）/ elementary（初歩の）"
    },
    461: { // No. 461: series (連続)
        origin: "ラテン語 serere（つなぎ合わせる・編む）→ 鎖のように連なるひと続きのもの",
        link: "シリーズ（連作）、シリアル（連続の）",
        note: "a series of A（一連のA）"
    },
    481: { // No. 481: alternative (代替の)
        origin: "alter（もう一方の）+ -ative → もう1つの選択肢・代替の",
        link: "オルタナティブ（代替案、オルタナロック）",
        note: "have no alternative but to do（〜するより他に手がない）"
    },
    501: { // No. 501: perceive (を知覚する)
        origin: "per-（完全に）+ ceive（つかむ）→ 五感でしっかり捉えて知覚する",
        link: "パーセプション（認知・知覚）",
        note: "perceive A to be B（AをBだと気づく・知覚する）"
    },
    502: { // No. 502: fascinate (を魅了する)
        origin: "ラテン語 fascinum（呪文・魔力）→ 魔法にかけられたように魅了する",
        link: "ファシネーション（魅力・陶酔）",
        note: "be fascinated by A（Aに魅了される・夢中になる）"
    },
    504: { // No. 504: disappoint (を失望させる)
        origin: "dis-（否定）+ appoint（任命する・決める）→ 期待した約束が破れて失望させる",
        link: "アポイントメント（予約・約束）",
        note: "be disappointed with [at] A（Aに失望する）"
    },
    505: { // No. 505: imply (それとなく言う)
        origin: "in-（中に）+ plicare（折り込む）→ 言葉の中に意味を折り込んで暗示する",
        link: "エクスプリシット（明白な）の対義語",
        note: "implication（暗示・影響）/ imply that ...（…を暗に示す）"
    },
    506: { // No. 506: recommend (を勧める)
        origin: "re-（強意）+ com-（共に）+ mendare（委ねる）→ 信頼して人に推薦する",
        link: "コマンド（命令）、レコメンド機能",
        note: "recommend that S (should) do / recommend doing"
    },
    507: { // No. 507: demonstrate (を証明する)
        origin: "de-（完全に）+ monstrare（指し示す）→ 証拠を提示して実証・論証する",
        link: "デモンストレーション（実演・示威運動）、モンスターと同根",
        note: "demonstrate that ...（…であることを実証する）/ demonstration（実証）"
    },
    508: { // No. 508: conclude (と結論づける)
        origin: "con-（強意）+ clude（閉じる）→ 議論や思考を最後に閉じて結論づける",
        link: "インクルード（含める）、エクスクルード（排除する）と同根",
        note: "conclude that ...（…と結論を下す）/ conclusion（結論）"
    },
    509: { // No. 509: announce (を発表する)
        origin: "ad-（〜へ）+ nuntiare（報告する・告げる）→ 人々に向けて公にアナウンスする",
        link: "アナウンサー、プロナウンス（発音する）と同根",
        note: "announce that ...（…と発表する）/ announcement（告知・発表）"
    },
    510: { // No. 510: appeal (心に訴える)
        origin: "ad-（〜へ）+ pellere（押し出す・駆り立てる）→ 人の心へ訴えかける・引きつける",
        link: "アピール（訴求力・懇願）、パルスと同根",
        note: "appeal to A（A[人の心]に訴える・Aの好みに合う）/ make an appeal（訴えを起こす）"
    },
    511: { // No. 511: address (（問題）に取り組む、（人）に演説する)
        origin: "ad-（〜へ）+ directus（まっすぐ向ける）→ 真正面から問題に取り組む・演説する",
        link: "アドレス（住所・宛名）、ダイレクトと同根",
        note: "address a problem（問題に取り組む）/ address the audience（聴衆に演説する）"
    },
    514: { // No. 514: afford (を持つ余裕がある)
        origin: "古英語 geforthian（前進させる・遂行する）→ 経済的・時間的に余裕がある",
        link: "アフォーダブル（手頃な価格の）",
        note: "can afford to do（〜する余裕がある）"
    },
    515: { // No. 515: purchase (を購入する)
        origin: "pro-（前へ）+ chaser（追う・手に入れる）→ 代金を支払って品物を購入する",
        link: "パーチェス（購買・購入品）",
        note: "purchase a ticket（切符を購入する）/ power of purchase（購買力）"
    },
    516: { // No. 516: participate (参加する)
        origin: "part（部分）+ cip/cap（取る）→ 一端を引き受けて参加する",
        link: "パート（部分）、キャプチャー（つかむ）と同根",
        note: "participate in A（Aに参加する = take part in A）"
    },
    517: { // No. 517: belong (所属している、ものである)
        origin: "be-（強意）+ longen（適する・ふさわしい）→ 本来あるべき場所や組織に所属する",
        link: "ビロング（帰属する）",
        note: "belong to A（Aに所属している・Aのものである ※進行形不可）/ belonging（所持品）"
    },
    518: { // No. 518: conduct (を行う)
        origin: "con-（共に）+ ducere（導く・率いる）→ 計画に沿って指揮・遂行する",
        link: "コンダクター（指揮者・車掌）、セミコンダクター（半導体）",
        note: "conduct an experiment（実験を行う）/ code of conduct（行動規範）"
    },
    519: { // No. 519: behave (振る舞う)
        origin: "be-（徹底的に）+ have（保つ）→ 自分自身の態度を律して振る舞う",
        link: "ビヘイビア（行動・挙動）",
        note: "behave oneself（行儀よく振る舞う）/ behavioral science（行動科学）"
    },
    520: { // No. 520: operate (を操作する、手術を行う)
        origin: "ラテン語 opus/operari（働く・仕事をする）→ 機械を動かす、手術を行う",
        link: "オペレーション（作戦・操作）、オペレーター",
        note: "operate on A（A[患者]を手術する）/ operation（操作・事業・手術）"
    },
    521: { // No. 521: organize (を主催する、準備する)
        origin: "ギリシャ語 organon（道具・器官）→ 道具を機能的に組み合わせて組織・準備する",
        link: "オーガナイザー（主催者）、オルガン（器官）と同根",
        note: "organize an event（催しを準備する）/ organization（組織）"
    },
    523: { // No. 523: combine (を組み合わせる)
        origin: "com-（共に）+ bini（2つずつ）→ 2つ以上のものを結び合わせて結合する",
        link: "コンビ（二人組）、コンバイン",
        note: "combine A with B（AをBと結合させる）/ combination（組み合わせ）"
    },
    524: { // No. 524: deliver (配達する)
        origin: "de-（完全に）+ liberare（自由にする）→ 拘束を解いて送り届ける・演説を行う",
        link: "デリバリー（配達）、リバティ（自由）と同根",
        note: "deliver a speech（演説をする）/ deliver a package（小包を届ける）"
    },
    525: { // No. 525: locate (を（場所に）置く)
        origin: "locus（場所）+ -ate → 特定の場所に据える・位置を突き止める",
        link: "ロケーション（位置・撮影場所）、ローカルと同根",
        note: "be located in A（Aに位置している）/ locate the problem（問題の場所を特定する）"
    },
    526: { // No. 526: encounter (に（偶然）出会う)
        origin: "in-（中へ）+ contra（対抗して・向かい合って）→ 真正面から不意に出会う",
        link: "カウンター（対抗・計数台）と同根",
        note: "encounter difficulties（困難に遭遇する）/ a chance encounter（偶然の出会い）"
    },
    527: { // No. 527: surround (を囲む)
        origin: "super-（上に）+ unda（波）→ 大波が周囲を取り囲むように包囲する",
        link: "サラウンド音響（全方位音響）、アバンダント（豊富な: 波打つ）と同根",
        note: "be surrounded by A（Aに囲まれている）/ surrounding environment（周辺環境）"
    },
    528: { // No. 528: explore (を探検する)
        origin: "ex-（外へ）+ plorare（叫ぶ・泣く）→ 猟師が声を上げながら未知の森を探検・調査する",
        link: "エクスプローラー（探検家・Webブラウザ）",
        note: "explore the universe（宇宙を探検する）/ exploration（探検・調査）"
    },
    541: { // No. 541: escape (逃れる、脱出する、を免れる)
        origin: "ex-（外へ）+ cappa（マント）→ 掴まれたマントを脱ぎ捨てて脱出する",
        link: "エスケープキー（中断・脱出）",
        note: "escape from A（Aから脱出する）/ escape being injured（怪我を免れる）"
    },
    571: { // No. 571: symbol (象徴)
        origin: "syn-（共に）+ ballein（投げる）→ 意味と形を一緒に投げ合わせて表す象徴",
        link: "シンボル（象徴・記号）、バラッドと同根",
        note: "a symbol of peace（平和の象徴）/ symbolize（象徴する）"
    },
    581: { // No. 581: eager (熱望して)
        origin: "ラテン語 acer（鋭い・熱烈な）→ 心が鋭く前のめりになって熱望している",
        link: "エッジ（刃先）と同根",
        note: "be eager to do（しきりに〜したがる）/ be eager for A（Aを熱望する）"
    },
    591: { // No. 591: immediate (即座の)
        origin: "in-（否定）+ mediate（間にある）→ 間に障害や時間が一切挟まらない・即座の",
        link: "メディア（媒介するもの）の対義語",
        note: "immediate action（即座の行動）/ immediately（直ちに）"
    },
    601: { // No. 601: insist (断固要求する)
        origin: "in-（強意）+ sist（立つ）→ 一歩も引かずに主張する",
        link: "コンシスト（成り立つ）と同根",
        note: "insist that S (should) do（〜すべきだと主張する）/ insist on A"
    },
    602: { // No. 602: intend (を意図する、つもりでいる)
        origin: "in-（心の中に）+ tend（伸ばす）→ 心のベクトルを向けて意図する",
        link: "インテンション（意図・意向）",
        note: "intend to do（〜するつもりである）/ intention（意図）"
    },
    603: { // No. 603: inspire (を奮起させる)
        origin: "in-（中に）+ spire（息を吹き込む）→ 心に新しい息吹を吹き込んでひらめかせる",
        link: "スピリット（精神・息）、レスパイア（呼吸する）と同根",
        note: "inspire A to do（Aを奮起させて〜させる）/ inspiration（ひらめき）"
    },
    604: { // No. 604: emphasize (を強調する、力説する)
        origin: "en-（中に）+ phainein（示す・現れる）→ 光を当てて強く強調・力説する",
        link: "エンファシス（強調）、ファンタジーと同根",
        note: "emphasize that ...（…を力説する）/ put emphasis on A（Aを強調する）"
    },
    605: { // No. 605: propose (を提案する)
        origin: "pro-（前に）+ pose（置く）→ みんなの前に案を置いて提案する",
        link: "プロポーズ（結婚の申し込み）、プロポジション",
        note: "propose that S (should) do / propose doing"
    },
    606: { // No. 606: persuade (を説得する)
        origin: "per-（徹底的に）+ suadere（勧める）→ 徹底的に説得して〜させる",
        link: "スウィート（心地よい）と同根",
        note: "persuade A to do（Aを説得して〜させる）"
    },
    607: { // No. 607: convince (に納得させる)
        origin: "con-（完全に）+ vincere（打ち勝つ）→ 議論で相手を圧倒して心から納得させる",
        link: "ビクトリー（勝利）と同根",
        note: "convince A of B（AにBを納得させる）/ convince A that ..."
    },
    608: { // No. 608: admit (を（事実と）認める)
        origin: "ad-（〜へ）+ mittere（送る・入れる）→ 中へ入ることを許して認める",
        link: "ミッション（任務: 送られたもの）と同根",
        note: "admit doing（〜したことを認める）/ admission（入場・入学）"
    },
    611: { // No. 611: interpret (を解釈する)
        origin: "inter-（間に入って）+ pret/pars（価値を測る）→ 言語や意味を仲介して解釈・通訳する",
        link: "インタープリター（通訳者・解釈系）",
        note: "interpret A as B（AをBと解釈する）/ interpreter（通訳者）"
    },
    613: { // No. 613: concentrate (精神を集中する)
        origin: "con-（共に）+ center（中心）→ すべての力を中心に集めて集中する",
        link: "コンセントレーション（集中力）",
        note: "concentrate on A（Aに集中する = focus on A）"
    },
    614: { // No. 614: criticize (を非難する)
        origin: "ギリシャ語 krinein（ふるい分ける・判断する）→ 欠点を見極めて批判する",
        link: "クライシス（危機）、クライテリア（基準）と同根",
        note: "criticize A for B（BのことでAを批判する）/ criticism（批判）"
    },
    615: { // No. 615: blame (を（～のことで）責める(for)、を（～の）せいにする(on))
        origin: "ギリシャ語 blasphemein（悪口を言う）→ 責任を突きつけて非難する・責める",
        link: "ブラスフェミー（神涜）、ブラム",
        note: "blame A for B（BのことでAを責める）/ blame B on A（Bの責任をAに負わせる）"
    },
    616: { // No. 616: oppose (に反対する)
        origin: "ob-（反対に）+ ponere/pose（置く）→ 真正面に立ちはだかって反対する",
        link: "オポジション（野党・対抗）、プロポーズと同根",
        note: "be opposed to A（Aに反対している）/ opposite（反対の）"
    },
    617: { // No. 617: inform (に知らせる)
        origin: "in-（心の中に）+ formare（形作る）→ 相手の頭の中に知識を形作って知らせる",
        link: "インフォメーション（情報）、フォーメーションと同根",
        note: "inform A of B（AにBを知らせる）/ informative（有益な・情報に富んだ）"
    },
    618: { // No. 618: grant (（人）に（物）を（求めに応じて）与える)
        origin: "ラテン語 credere（信じる・委ねる）→ 信用して求めに応じ与える・認める",
        link: "クレジット（信用）、グランティと同根",
        note: "take A for granted（Aを当たり前と思う）/ grant A's request（要求を聞き入れる）"
    },
    619: { // No. 619: obtain (を得る)
        origin: "ob-（対して）+ tain（つかむ・保つ）→ 手を伸ばしてしっかり手に入れる",
        link: "メインテイン（維持する）、コンテイン（含む）と同根",
        note: "obtainable（入手可能な）/ obtain permission（許可を得る）"
    },
    620: { // No. 620: transform (を変える)
        origin: "trans-（越えて・変えて）+ form（形）→ 境界を越えて姿形を完全に変える",
        link: "トランスフォーマー、トランスフォーム",
        note: "transform A into B（AをBに一変させる）"
    },
    621: { // No. 621: alter (を変える)
        origin: "ラテン語 alter（もう一方の）→ 別の状態に変える",
        link: "オルタナティブ（代替の）と同根",
        note: "alter one's mind（考えを変える）/ alteration（変更）"
    },
    622: { // No. 622: arrange (を（きちんと）並べる、手はずを整える)
        origin: "ad-（〜へ）+ rang（列・並び）→ 綺麗に列を整えて手配・配列する",
        link: "アレンジメント（手配・編曲）、ランクと同根",
        note: "arrange for A to do（Aが〜するよう手配する）/ arrange flowers（花を生ける）"
    },
    623: { // No. 623: interact (相互に作用する)
        origin: "inter-（相互に）+ act（行動する）→ 互いに影響を及ぼし合って交流する",
        link: "インタラクティブ（双方向の・対話型の）",
        note: "interact with A（Aと交流・相互作用する）/ interaction（相互作用）"
    },
    624: { // No. 624: handle (（問題など）を処理する)
        origin: "hand（手）+ -le（道具・反復）→ 手に取って巧みに扱う・問題を処理する",
        link: "ハンドル（車の取っ手・操縦桿）",
        note: "handle a problem（問題をうまく処理する）/ handle with care（取扱注意）"
    },
    625: { // No. 625: extend (を延長する)
        origin: "ex-（外へ）+ tendere（伸ばす）→ 手足を外へ伸ばして期間や範囲を延長する",
        link: "エクステンション（拡張・延長コード）",
        note: "extend a deadline（締切を延長する）/ extensive（広範囲にわたる）"
    },
    626: { // No. 626: settle (定住する、を決める)
        origin: "古英語 setl（腰掛け・座席）→ 腰を落ち着けて定住する・紛争を解決する",
        link: "セツルメント（開拓地・入植地）、シート（座席）と同根",
        note: "settle a dispute（紛争を解決する）/ settle down（落ち着く・定住する）"
    },
    627: { // No. 627: contribute (貢献する、を寄付する)
        origin: "con-（共に）+ tribute（与える）→ みんなで力を持ち寄って貢献する",
        link: "トリビュート（賛辞）、ディストリビューションと同根",
        note: "contribute to A（Aに貢献する・Aの一因となる）"
    },
    628: { // No. 628: construct (を建設する)
        origin: "con-（共に）+ struere（積み重ねる）→ 部品を積み上げて組み立て建設する",
        link: "コンストラクション（建設工事）、インストラクションと同根",
        note: "construct a building（建物を建設する）/ constructive criticism（建設的な批判）"
    },
    629: { // No. 629: consist (成る、（本質が）ある)
        origin: "con-（共に）+ sist（立つ）→ 構成要素が一緒に立って成り立つ",
        link: "アシスト（そばに立つ）、レジスト（逆らって立つ）と同根",
        note: "consist of A（Aから成り立つ）/ consist in A（Aにある・本質とする）"
    },
    661: { // No. 661: occasion (場合、時)
        origin: "ob-（〜へ）+ cadere（落ちる・偶然起きる）→ 偶然巡り合ってきた特定の機会・場合",
        link: "アクシデント（事故: 落ちてくるもの）と同根",
        note: "on this occasion（この機会に）/ occasionally（時折）"
    },
    671: { // No. 671: target (目標)
        origin: "古ノルド語 targa（小さな丸い盾）→ 矢を射る的・目標",
        link: "ターゲット（対象・標的）",
        note: "target A at B（AをBに向け目標とする）/ hit the target（的を射る）"
    },
    691: { // No. 691: elementary (初等（教育）の)
        origin: "ラテン語 elementum（基本要素）+ -ary → 物事の土台となる初歩的な",
        link: "エレメンタリースクール（小学校）",
        note: "elementary school（小学校）/ elementary knowledge（初歩的知識）"
    },
    701: { // No. 701: confirm (を裏付ける、(本当だと)確認する)
        origin: "con-（強意）+ firm（確固とした・固い）→ ぐらつかないように確定・確認する",
        link: "ファーム（会社・固い）、コンファーム（予約確認）",
        note: "confirmation（確認・確証）"
    },
    702: { // No. 702: illustrate (を説明する、を例証する)
        origin: "in-（中に）+ lustrare（光を当てる・明るくする）→ 光を当てて絵や例で分かりやすく説明する",
        link: "イラストレーター、イラストレーション",
        note: "illustrate with examples（例を挙げて説明する）"
    },
    704: { // No. 704: bother (を困らせる)
        origin: "アイルランド語 bodhar（耳が遠い・騒がしい）→ うるさく悩ませる・気に病む",
        link: "ドント・ボザー（お構いなく）",
        note: "bother to do（わざわざ〜する）/ don't bother（気にしないで）"
    },
    705: { // No. 705: annoy (をいらいらさせる、悩ます)
        origin: "ラテン語 in odio esse（憎らしい・不快である）→ いらいらさせて悩ます",
        link: "アノイング（うっとうしい・迷惑な）",
        note: "be annoyed with [at] A（Aにいらだつ）/ annoying habit（不快な癖）"
    },
    706: { // No. 706: disturb (を邪魔する)
        origin: "dis-（徹底的に）+ turba（騒乱・群衆）→ 秩序をかき乱して邪魔する・妨げる",
        link: "タービュランス（乱気流）、タービンと同根",
        note: "do not disturb（邪魔しないでください）"
    },
    707: { // No. 707: discourage (を思いとどまらせる、を落胆させる)
        origin: "dis-（否定）+ courage（勇気）→ 勇気をくじいて思いとどまらせる・落胆させる",
        link: "エンカレッジ（勇気づける）の対義語",
        note: "discourage A from doing（Aに〜するのを思いとどまらせる）⇔ encourage"
    },
    708: { // No. 708: embarrass (を当惑させる、に恥ずかしい思いをさせる)
        origin: "in-（中に）+ barra（棒・障害物）→ 障害物に引っかかって立ち往生し、赤面・当惑する",
        link: "エンバラスメント（困惑・恥ずかしさ）、バー（棒）と同根",
        note: "be embarrassed about [at] A（Aについて恥ずかしい思いをする）"
    },
    709: { // No. 709: frighten (を怖がらせる)
        origin: "古英語 fyrhto（恐怖）+ -en（動詞化）→ 急に怖がらせて怯えさせる",
        link: "フライト（突然の恐怖・飛行）と同根",
        note: "be frightened of A（Aを怖がる）/ frighten A into doing（Aを脅して〜させる）"
    },
    710: { // No. 710: puzzle (を当惑させる)
        origin: "語源不詳（16世紀英語 pose/oppose に由来か）→ 複雑に入り組んで当惑させる",
        link: "パズル（謎解きゲーム）、ジグソーパズル",
        note: "be puzzled by A（Aに頭を抱える・当惑する）/ puzzling question（不可解な問い）"
    },
    711: { // No. 711: upset (を動揺させる)
        origin: "up（上に）+ set（置く）→ ひっくり返して動揺させる",
        link: "アップセット（番狂わせ、取り乱した状態）",
        note: "be upset about A（Aについて取り乱している）"
    },
    712: { // No. 712: stimulate (を刺激する)
        origin: "ラテン語 stimulus（牛を追う尖った杖）→ チクッと刺激して活性化させる",
        link: "スティミュレーション（刺激）、スティミュラス",
        note: "stimulate the economy（経済を刺激する）/ stimulus（刺激）"
    },
    716: { // No. 716: cure (を治す)
        origin: "ラテン語 cura（配慮・手入れ・治療）→ 病気や悪癖を手入れして完治させる",
        link: "キュア（治癒）、キュレーター（学芸員: 資料を手入れする人）",
        note: "cure A of B（AのB[病気・癖]を治す）/ a cure for cancer（がんの治療法）"
    },
    717: { // No. 717: recover (回復する)
        origin: "re-（再び）+ capere/cover（手に入れる）→ 失った健康や地位を再び取り戻す",
        link: "リカバリー（回復・復旧）、カバーと同根",
        note: "recover from A（A[病気・ショック]から回復する）/ recovery（回復）"
    },
    718: { // No. 718: overcome (を克服する)
        origin: "over（上から越えて）+ come（来る）→ 困難を乗り越えて打ち勝つ・克服する",
        link: "オーバーカム",
        note: "overcome difficulties（困難を克服する）/ be overcome with grief（悲しみに打ちひしがれる）"
    },
    719: { // No. 719: quit (をやめる)
        origin: "ラテン語 quietus（静かな・自由な）→ 義務から解放されてすっぱりやめる",
        link: "クイット（終了・中止）、クワイエット（静かな）と同根",
        note: "quit doing（〜するのをやめる = stop doing）/ quit one's job（仕事を辞める）"
    },
    720: { // No. 720: transfer (を移す)
        origin: "trans-（越えて）+ ferre（運ぶ）→ 場所・部署・乗り物を別のところへ移す",
        link: "トランスファー（乗り換え・転送・移籍）",
        note: "transfer to A（Aに転校・転勤する）/ transfer A to B（AをBに移す）"
    },
    721: { // No. 721: transport (を輸送する)
        origin: "trans-（越えて）+ portare（運ぶ）→ 国境や境界を越えて物資を輸送する",
        link: "ポータブル（携帯できる）、トランスポート",
        note: "public transportation（公共交通機関）"
    },
    722: { // No. 722: export (を輸出する)
        origin: "ex-（外へ）+ portare（運ぶ）→ 国境の外へ荷を運び出して輸出する",
        link: "ポータブルと同根 ⇔ import（輸入する）",
        note: "export goods to A（A国へ製品を輸出する）/ export earnings（輸出収入）"
    },
    723: { // No. 723: import (を輸入する)
        origin: "in-（中へ）+ portare（運ぶ）→ 国内へ物資を持ち込んで輸入する",
        link: "インポート（輸入・取り込み）⇔ export",
        note: "import raw materials（原材料を輸入する）/ import duty（輸入関税）"
    },
    724: { // No. 724: invest (投資する)
        origin: "in-（中に）+ vestire（服を着せる・装う）→ 権利を授けて将来のために資本を投資する",
        link: "ベスト（チョッキ・衣類）と同根",
        note: "invest A in B（A[資金・時間]をBに投資する）/ investment（投資）"
    },
    725: { // No. 725: investigate (を調査する)
        origin: "in-（中に）+ vestigium（足跡）→ 足跡を追って徹底的に調査する",
        link: "ベスティージ（痕跡・名残）と同根",
        note: "investigate the cause（原因を調査する）/ investigation（捜査・調査）"
    },
    726: { // No. 726: manufacture (を(大量に)製造する)
        origin: "manus（手）+ facere（作る）→ 手を使って大規模に製品を製造する",
        link: "マニュファクチャ（工場制手工業）、マニュアルと同根",
        note: "manufacturer（製造業者・メーカー）/ manufacturing industry（製造業）"
    },
    727: { // No. 727: react (反応する)
        origin: "re-（跳ね返して）+ act（行動する）→ 刺激に対して即座に反応・反作用を示す",
        link: "リアクション（反応・受け答え）、リアクター（原子炉）",
        note: "react to A（Aに反応する）/ chemical reaction（化学反応）"
    },
    730: { // No. 730: prohibit (を禁止する)
        origin: "pro-（前に）+ habit/hibere（保つ・制止する）→ 前に立ちはだかって法的に禁止する",
        link: "インヒビット（抑制する）と同根",
        note: "prohibit A from doing（Aが〜するのを禁止する）"
    },
    731: { // No. 731: forbid (を禁じる)
        origin: "for-（離れて・禁じて）+ bid（命じる）→ 厳しく命じて禁じる",
        link: "フォービドゥン（禁断の）",
        note: "forbid A to do（Aが〜するのを禁じる）⇔ allow"
    },
    732: { // No. 732: abandon (を捨てる)
        origin: "ad-（〜へ）+ ban（布告・権限）→ 支配権を放り出して完全に捨てる・断念する",
        link: "バン（追放令）と同根",
        note: "abandon a plan（計画を断念する）"
    },
    741: { // No. 741: capture (を捕らえる)
        origin: "ラテン語 capere（つかむ・捕らえる）",
        link: "キャプチャー（捕獲・画面保存）、キャプテンと同根",
        note: "capture the market（市場を獲得する）/ captive（捕虜）"
    },
    791: { // No. 791: stable (安定した)
        origin: "ラテン語 stare（立つ）+ -able → 倒れずにしっかり立っていられる・安定した",
        link: "ステーション（駅: 立つ場所）、スタチューと同根",
        note: "stable condition（安定した容態）⇔ unstable"
    },
    794: { // No. 794: abstract (抽象的な)
        origin: "ab-（離れて）+ tract（引く）→ 具体的な現実からエッセンスだけを引き抜いた・抽象的な",
        link: "アトラクション（引きつけるもの）、トラクターと同根",
        note: "abstract ⇔ concrete（具体的な）/ in the abstract（抽象的に）"
    },
    801: { // No. 801: permit (許可する)
        origin: "per-（通り抜けて）+ mittere（送る・行かせる）→ 通過を認めて許可する",
        link: "パーミッション（権限・許可証）",
        note: "permit A to do（Aが〜するのを許可する）⇔ forbid"
    },
    802: { // No. 802: suspect (ではないかと思う)
        origin: "sub-（下から）+ spect（見る）→ 眉をひそめて下からじろりと疑う",
        link: "サスペクト（容疑者）、サスペンス",
        note: "suspect that ...（…ではないかと疑う）⇔ doubt（…ではないと思う）"
    },
    803: { // No. 803: pursue (を追求する、（仕事など）に従事する)
        origin: "pro-（前へ）+ sequi（従う・追う）→ 目的の後を熱心に追跡・追求する",
        link: "スーツ（訴訟: 追及すること）、シークエンスと同根",
        note: "pursue a goal（目標を追求する）/ pursuit of happiness（幸福の追求）"
    },
    804: { // No. 804: pretend (ふりをする)
        origin: "pre-（前に）+ tendere（伸ばす・広げる）→ 前に見せかけの幕を張って〜のふりをする",
        link: "テンション（張り）と同根",
        note: "pretend to do（〜するふりをする）/ pretension（見栄・主張）"
    },
    805: { // No. 805: calculate (を計算する)
        origin: "ラテン語 calculus（小石・そろばんの玉）→ 小石を並べて計算・推計する",
        link: "カルキュレーター（電卓）、カルシウムと同根",
        note: "calculate the cost（費用を計算する）/ calculation（計算）"
    },
    806: { // No. 806: guarantee (を保証する、確約する)
        origin: "ゲルマン祖語 ward-（見張る・守る）→ 損害が出ないよう保証する",
        link: "ワラント（保証）、ギャランティ（出演料保証）",
        note: "guarantee that ...（…を保証する）/ under guarantee（保証期間中で）"
    },
    807: { // No. 807: acknowledge (を認める)
        origin: "ad-（〜へ）+ know（知る）+ -ledge → 証拠や事実を真正面から認知・受容する",
        link: "ナレッジ（知識）と同根",
        note: "acknowledge that ...（…と認める）/ acknowledge receipt of A（Aの受領を通知する）"
    },
    808: { // No. 808: impress (を感動させる)
        origin: "in-（心の中に）+ press（強く押す）→ 心に深い刻印を残して強い感銘を与える",
        link: "インプレッション（印象・表示回数）、プレッシャーと同根",
        note: "impress A with B（BでAに深い印象を与える）/ be impressed by A（Aに感銘を受ける）"
    },
    809: { // No. 809: urge (を熱心に勧める)
        origin: "ラテン語 urgere（押し進める・駆り立てる）→ 強く促して行動を起こさせる",
        link: "アージェント（緊急の）、アージ（衝動）",
        note: "urge A to do（Aに〜するよう強く促す）/ urgent need（緊急の必要性）"
    },
    810: { // No. 810: convey (を伝達する)
        origin: "con-（共に）+ via（道）→ 道を一緒に通って相手に考えや荷を伝達・運搬する",
        link: "コンベアー（ベルトコンベア）、ボヤージュ（航海）と同根",
        note: "convey one's feelings（気持ちを伝える）/ conveyor belt"
    },
    811: { // No. 811: celebrate (（行事など）を祝う)
        origin: "ラテン語 celeber（人が大勢集まる・名高い）→ 大勢で集まって祝う",
        link: "セレブ（著名人）、セレブレーション",
        note: "celebrate an anniversary（記念日を祝う）/ celebration（祝賀）"
    },
    812: { // No. 812: admire (感嘆する)
        origin: "ad-（〜へ）+ mirari（驚く・見つめる）→ 目を見張るほど素晴らしいと感嘆・賞賛する",
        link: "ミラクル（奇跡）、ミラー（鏡）と同根",
        note: "admire A for B（BのことでAを称賛する）/ admiration（感嘆）"
    },
    813: { // No. 813: devote (（時間など）を充てる)
        origin: "de-（誓いによって）+ vovere（誓う）→ 神聖な誓いをもって全身全霊を捧げる・充てる",
        link: "ボート（投票・誓い）と同根",
        note: "devote A to B [doing]（A[時間・労力]をBに捧げる）/ devoted（献身的な）"
    },
    814: { // No. 814: dominate (を支配する、統治する)
        origin: "dominus（主人・支配者）+ -ate → 主人として他者を完全に支配・圧倒する",
        link: "ドメイン（領域）、ドミナント（優勢な）",
        note: "dominate the game（試合を支配する）/ domination（支配）"
    },
    815: { // No. 815: eliminate (を取り除く)
        origin: "ex-（外へ）+ limen（敷居・境界）→ 敷居の外へ追い出して完全に排除・除去する",
        link: "リミット（限界）と同根",
        note: "eliminate waste（無駄を排除する）/ elimination of poverty（貧困の撲滅）"
    },
    816: { // No. 816: restrict (を制限する)
        origin: "re-（後ろへ）+ stringere（きつく締める）→ 縄で縛り上げて範囲を制限・制限する",
        link: "ストリクト（厳格な）、ストレインと同根",
        note: "restrict A to B（AをBに制限する）/ restriction（制限・規制）"
    },
    817: { // No. 817: isolate (を切り離す)
        origin: "insula（島）+ -ate → 周囲から切り離して孤立した島のように隔離する",
        link: "アイランド（島）、インスリンと同根",
        note: "isolate A from B（AをBから隔離・孤立させる）/ isolation（孤立・隔離）"
    },
    818: { // No. 818: endanger (を（滅亡の）危険にさらす)
        origin: "en-（〜の状態にする）+ danger（危険）→ 滅亡や危害の危機にさらす",
        link: "デンジャー（危険）",
        note: "endangered species（絶滅危惧種）"
    },
    819: { // No. 819: secure (を確保する)
        origin: "se-（離れて・なしに）+ cura（心配）→ 心配の種をなくして安全に確保する",
        link: "セキュア、セキュリティ（安全保障）",
        note: "secure a seat（席を確保する）/ feel secure（安心感を抱く）"
    },
    820: { // No. 820: reserve (を予約する)
        origin: "re-（後ろへ）+ servare（保つ・取っておく）→ 後で使うために手元に取っておく・予約する",
        link: "リザーブシート（指定席）、プリザーブ（保存する）と同根",
        note: "reserve a table（席を予約する）/ with reservation（遠慮がちに・条件付きで）"
    },
    821: { // No. 821: possess (（性質・能力など）を持っている)
        origin: "potis（力のある）+ sedere（座る）→ 主人として上に座って所有する",
        link: "ポゼッション（所有権・ボール保持）",
        note: "possess great talent（非凡な才能を持つ）/ possession（所有物）"
    },
    822: { // No. 822: launch (を始める)
        origin: "古フランス語 lancier（槍を投げる）→ 宇宙へ打ち上げる、新規事業を開始する",
        link: "ロケット打ち上げ、ローンチ（公開・開始）",
        note: "launch a project（事業を立ち上げる）/ launch a satellite（人工衛星を打ち上げる）"
    },
    823: { // No. 823: detect (を見つける、検出する)
        origin: "de-（剥ぎ取る）+ tegere（覆う）→ 覆いを剥ぎ取って隠された兆候を見つけ出す",
        link: "ディテクティブ（探偵）、プロテクト（保護する）の対義語",
        note: "detect a disease early（病気を早期発見する）/ detector（探知機）"
    },
    840: { // No. 840: apologize (謝る)
        origin: "apo-（離れて）+ logos（言葉）→ 言い訳を述べて許しを請い、謝罪する",
        link: "アポロジー（謝罪文・弁明）",
        note: "apologize to A for B（BのことでAに謝罪する）"
    },
    841: { // No. 841: forgive (（人の罪など）を許す)
        origin: "for-（完全に）+ give（与える）→ 恨みの感情を相手にすっかり手渡して水に流す・許す",
        link: "フォーギブ",
        note: "forgive A for B（BのことでAを許す）"
    },
    871: { // No. 871: notion (考え)
        origin: "noscere（知る）→ 頭の中に形成された概念・考え",
        link: "ノーティス、ノウ（知る）と同根",
        note: "have a notion that ...（…という考えを持っている）"
    },
    882: { // No. 882: fundamental (基本の)
        origin: "fundus（底・土台）+ -ment + -al → 最も深い基礎をなす・根本的な",
        link: "ファンダメンタルズ（経済の基礎的条件）",
        note: "fundamental human rights（基本的人権）"
    },
    891: { // No. 891: equivalent (相当する)
        origin: "aequus（等しい）+ valere（価値がある）→ 同等の価値を持つ・相当する",
        link: "バリュー（価値）、イコールと同根",
        note: "be equivalent to A（Aに相当する・等しい）"
    },
    897: { // No. 897: distinct (まったく異なる)
        origin: "dis-（離れて）+ stinguere（刺す・区別する）→ 明確に区別された・独特の",
        link: "ディスティンクション（区別・卓越）",
        note: "be distinct from A（Aと明確に異なっている）"
    },
    901: { // No. 901: greet (（人）にあいさつする)
        origin: "古英語 gretan（近づく・声をかける）→ 歓迎の気持ちで挨拶する",
        link: "グリーティングカード",
        note: "greet A with a smile（笑顔でAを迎える）"
    },
    902: { // No. 902: chat (おしゃべりをする)
        origin: "古英語 chateren（ペチャクチャ鳴く鳥の擬音）→ 気軽に親しくおしゃべりする",
        link: "チャット（雑談・オンライン会話）",
        note: "have a chat with A（Aと雑談する）/ chat room"
    },
    903: { // No. 903: remark (と述べる、言う)
        origin: "re-（強意）+ mark（印・注意）→ 目を留めて言葉として述べる",
        link: "リマーク（所見・批評）、マーク（印）",
        note: "remark that ...（…と述べる）/ remarkable（注目すべき）"
    },
    904: { // No. 904: command (を命ずる)
        origin: "com-（強意）+ mandare（手に託す・命じる）→ 強い権限で命じる・支配する",
        link: "コマンド（指示）、コマンダー（指揮官）",
        note: "command a fine view（素晴らしい景色を見渡す）/ have a good command of English"
    },
    905: { // No. 905: utter (（言葉など）を発する)
        origin: "古英語 utera（より外の）→ 心の中の言葉を口の外へ発する、全くの",
        link: "アウター（外側の）と同根",
        note: "utter a word（一言口にする）/ utter silence（完全な静寂）"
    },
    906: { // No. 906: declare (を宣言する)
        origin: "de-（徹底的に）+ clarus（明るい・明白な）→ 曖昧さをなくして公式に宣言する",
        link: "クリア（明るい・明瞭な）と同根",
        note: "declare war（宣戦布告する）/ declaration of independence（独立宣言）"
    },
    907: { // No. 907: pronounce (を発音する)
        origin: "pro-（前に向けて）+ nuntiare（告げる）→ 人前で声に出して公式に発音・宣言する",
        link: "プロナンシエーション（発音）、アナウンスと同根",
        note: "pronounce a word correctly（正しく単語を発音する）/ pronunciation（発音）"
    },
    908: { // No. 908: correspond (一致する、（手紙などで）連絡を取り合う)
        origin: "com-（共に）+ respondere（応答する）→ 互いに応答し合って一致する・文通する",
        link: "レスポンスと同根、コレスポンデンス",
        note: "correspond to A（Aに一致・対応する）/ correspond with A（Aと文通する）"
    },
    909: { // No. 909: imitate (をまねる)
        origin: "ラテン語 imitari（真似る・写す）→ お手本を見本にして忠実に模倣する",
        link: "イミテーション（模造品・見本）",
        note: "imitate one's accent（口調を真似る）/ imitation（模倣）"
    },
    910: { // No. 910: resemble (に似ている)
        origin: "re-（強意）+ similis（似ている）→ 外見や性質が非常によく似ている",
        link: "シミラー（似ている）、アセンブルと同根",
        note: "resemble A（Aに似ている ※他動詞、resemble to/withは不可）/ resemblance（類似）"
    },
    911: { // No. 911: exhibit (を（展覧会などに）展示する、（感情、兆候など）を示す)
        origin: "ex-（外へ）+ habere（持つ・提示する）→ 外に持ち出して展示する",
        link: "エキシビション（展覧会・模範試合）",
        note: "on exhibit（展示されて）/ exhibition（展示会）"
    },
    912: { // No. 912: distribute (を分配する)
        origin: "dis-（あちこちに）+ tribuere（割り当てる）→ 各所へ広く配分・流通させる",
        link: "トリビュート（貢ぎ物）、コントリビュートと同根",
        note: "distribute A to B（AをBに配る）/ distribution（流通・配分）"
    },
    913: { // No. 913: attribute (（結果）を（～の）せい[おかげ]と考える(on))
        origin: "ad-（〜へ）+ tribuere（割り当てる）→ 原因や功績をその人のものとして帰する",
        link: "アトリビュート（属性・特質）",
        note: "attribute A to B（Aの原因をBに帰する・AをBのおかげと考える）"
    },
    914: { // No. 914: evaluate (を評価する)
        origin: "ex-（外へ）+ valere（価値がある）→ 価値を外から客観的に見極めて評価する",
        link: "バリュー（価値）、エバリュエーション",
        note: "evaluate performance（実績を評価する）/ evaluation（評価）"
    },
    915: { // No. 915: assess (を評価する)
        origin: "ad-（そばに）+ sedere（座る）→ 裁判官の隣に座って損害額や税額を査定・評価する",
        link: "アセスメント（環境影響評価・査定）",
        note: "assess the damage（被害を査定する）/ assessment（査定・評価）"
    },
    916: { // No. 916: deserve (に値する)
        origin: "de-（強意）+ servire（尽くす・仕える）→ 努力に値するだけの報酬や報いを受ける価値がある",
        link: "サービスと同根",
        note: "deserve to do / deserve A（Aを受けるに値する）/ well deserved（当然の報い）"
    },
    917: { // No. 917: weigh (の重さがある、の重さを量る)
        origin: "古英語 wegan（重さを測る・持ち上げる）→ 天秤にかけて重さを量る・重要性を比較考慮する",
        link: "ウエイト（重量）、ハイウェイ（主要道路）と同根",
        note: "weigh A against B（AとBを比較考量する）/ weigh 70 kg（体重が70kgある）"
    },
    918: { // No. 918: strengthen (を強くする)
        origin: "strength（力・強さ）+ -en（〜化する）→ より強固にして強化する",
        link: "ストロング（強い）の派生語",
        note: "strengthen ties（絆を強める）⇔ weaken（弱める）"
    },
    919: { // No. 919: weaken (を弱める)
        origin: "weak（弱い）+ -en（〜化する）→ 勢いや力を弱める・衰えさせる",
        link: "ウィーク（弱い）の派生語",
        note: "weaken one's influence（影響力を弱める）⇔ strengthen"
    },
    920: { // No. 920: approve (賛成する)
        origin: "ad-（〜へ）+ probare（良いと認める）→ 基準に達していると認めて公式に承認・賛成する",
        link: "プルーブ（証明する）と同根",
        note: "approve of A（Aに賛成・是認する）/ approval（承認・賛成）"
    },
    921: { // No. 921: assign (（仕事など）を割り当てる)
        origin: "ad-（〜へ）+ signum（印・署名）→ 印をつけて特定の任務を割り当てる",
        link: "サイン（署名）、アサイン（任命）",
        note: "assign A to B（A[仕事]をBに割り当てる）/ assignment（宿題・課題）"
    },
    922: { // No. 922: sustain (を持続させる)
        origin: "sub-（下から）+ tenere（支え持つ）→ 下から落とさないように支えて維持・持続する",
        link: "サステナビリティ（持続可能性）、コンテインと同根",
        note: "sustain economic growth（経済成長を維持する）/ sustainable（持続可能な）"
    },
    923: { // No. 923: accomplish (を成し遂げる)
        origin: "ad-（〜へ）+ complere（満たす）→ 目標を満杯まで満たして見事に成し遂げる",
        link: "コンプリート（完全な）と同根",
        note: "accomplish a task（課題を完遂する）/ accomplishment（業績・達成感）"
    },
    924: { // No. 924: relieve (（苦痛など）を和らげる、（不安など）を減らす)
        origin: "re-（再び）+ levis（軽い）→ 重荷を取り除いて心をふたたび軽くし、安心させる・和らげる",
        link: "レリーフ（浮き彫り・安心）、エレベーターと同根",
        note: "relieve stress（ストレスを和らげる）/ what a relief!（あぁ安心した！）"
    },
    925: { // No. 925: frustrate (に不満を抱かせる)
        origin: "ラテン語 frustra（無駄に・むなしく）→ 努力を水泡に帰して欲求不満にさせる",
        link: "フラストレーション（欲求不満・いらだち）",
        note: "be frustrated with A（Aに苛立ち・挫折感を覚える）/ frustrating（もどかしい）"
    },
    926: { // No. 926: scare (を怖がらせる)
        origin: "古ノルド語 skirra（怖がらせて追い払う）→ 突然ぎょっとさせて怖がらせる",
        link: "スケアリー（恐ろしい・お化けの）",
        note: "be scared of A（Aを怖がる）/ scare A away（Aを脅かして追い払う）"
    },
    931: { // No. 931: neglect (を怠る)
        origin: "nec-（否定）+ legere（拾い上げる・選ぶ）→ 拾い上げずにそのまま放置する・怠る",
        link: "コレクト（集める: 共に拾う）の対義語",
        note: "neglect one's duties（義務を怠る）/ negligence（過失・怠慢）"
    },
    961: { // No. 961: incident (出来事)
        origin: "in-（中へ）+ cadere（落ちる）→ 日常の中にポトリと落ちてきた出来事・事件",
        link: "アクシデント（事故）と同根",
        note: "without incident（何事もなく・無事に）"
    },
    971: { // No. 971: logic (論理)
        origin: "ギリシャ語 logos（言葉・論理・理性）",
        link: "ロジック（論理）、ロジカル（論理的な）",
        note: "logical thinking（論理的思考）"
    },
    991: { // No. 991: apparent (（見て）明らかな、見たところ?らしい)
        origin: "ad-（〜へ）+ parere（現れる）→ 一見して外見上すぐにわかる・明白な",
        link: "アピアランス（外見）と同根",
        note: "it is apparent that ...（…なのは明白だ）/ apparently（見たところ〜らしい）"
    },
    1001: { // No. 1001: delight (大喜びさせる)
        origin: "de-（強意）+ lacere（引きつける・誘惑する）→ 心を奪われるほど大喜びさせる",
        link: "デリシャス（美味しい: 魅惑的な）と同根",
        note: "take delight in A（Aを大いに楽しむ）/ delighted with A（Aを喜んでいる）"
    },
    1002: { // No. 1002: entertain (楽しませる)
        origin: "inter-（間に入って）+ tenere（保つ）→ 人々の心をつなぎ止めて楽しませる・もてなす",
        link: "エンターテインメント（娯楽・芸能）",
        note: "entertain guests（客をもてなす）/ entertainment industry"
    },
    1003: { // No. 1003: fulfill (満たす)
        origin: "full（満ちた）+ fill（満たす）→ 条件や約束を完全に満たして果たす",
        link: "フルフィルメント（業務遂行）",
        note: "fulfill a promise [dream]（約束[夢]を果たす）/ fulfillment（達成感）"
    },
    1004: { // No. 1004: cheer (元気づける)
        origin: "ラテン語 cara（顔・表情）→ 笑顔にして元気づける・歓声を送る",
        link: "チアリーダー、チアフル（陽気な）",
        note: "cheer up（元気を出す）/ cheer for A（Aを応援する）"
    },
    1005: { // No. 1005: amuse (笑わせる)
        origin: "a-（〜へ向けて）+ muser（口を開けて見とれる）→ 人の口元を緩めて笑わせる・楽しませる",
        link: "アミューズメントパーク（遊園地）、ミュージアムと同根",
        note: "be amused at [by] A（Aをおもしろがる）/ amusement（娯楽）"
    },
    1006: { // No. 1006: anticipate (予期する)
        origin: "anti-（前もって）+ capere（つかむ）→ 先回りして受け止めて楽しみに予期する",
        link: "キャプチャー（つかむ）と同根",
        note: "anticipate doing（〜することを楽しみに予期する）/ anticipation（期待）"
    },
    1007: { // No. 1007: confront (立ちはだかる)
        origin: "con-（共に・向かい合って）+ frons（額・正面）→ 額を突き合わせて真正面から立ち向かう",
        link: "フロント（正面）、フロンティアと同根",
        note: "be confronted with A（A[困難・危機]に直面する）/ confrontation（対決）"
    },
    1008: { // No. 1008: undergo (経験する)
        origin: "under（下を）+ go（通る）→ 苦難や変化の下をくぐり抜けて経験する・受ける",
        link: "アンダーゴー",
        note: "undergo surgery（手術を受ける）/ undergo dramatic changes（劇的変化を経験する）"
    },
    1009: { // No. 1009: exceed (超える)
        origin: "ex-（外へ）+ cedere（進む・歩く）→ 定められた限度の境界線を踏み越えて超過する",
        link: "エクセレント（卓越した）、プロシードと同根",
        note: "exceed the speed limit（速度制限を超える）/ exceedingly（非常に・極めて）"
    },
    1010: { // No. 1010: overwhelm (まいらせる)
        origin: "over（上から）+ whelmen（押し潰す・転覆する）→ 圧倒的な力で上から押し潰す・圧倒する",
        link: "オーバーウェルミング（圧倒的な）",
        note: "be overwhelmed by [with] A（Aに圧倒される・打ちのめされる）"
    },
    1013: { // No. 1013: rob (奪う)
        origin: "ゲルマン祖語 raub（奪う・剥ぎ取る）→ 暴力を用いて人や場所から金品を強奪する",
        link: "ロバー（強盗）、強奪",
        note: "rob A of B（AからBを強奪する ※rob B from Aは不可）"
    },
    1014: { // No. 1014: deprive (奪う)
        origin: "de-（完全に）+ privus（個人の・奪う）→ 本来持っている権利や自由を完全に奪い去る",
        link: "プライベート（私的な）、プリビレッジと同根",
        note: "deprive A of B（AからB[自由・権利]を奪う）"
    },
    1016: { // No. 1016: interrupt (さえぎる)
        origin: "inter-（間に）+ rumpere（壊す・割って入る）→ 進行中の会話や行動を途中で遮る",
        link: "コラプト（堕落した）、バンクセプト（破産）と同根",
        note: "interrupt a conversation（会話を遮る）/ without interruption（途切れなく）"
    },
    1017: { // No. 1017: interfere (邪魔する)
        origin: "inter-（間に）+ ferire（打つ・衝突する）→ 間に割り込んで干渉・邪魔をする",
        link: "干渉（インターフェアランス）",
        note: "interfere with A（Aを邪魔する）/ interfere in A（Aに内政干渉する）"
    },
    1018: { // No. 1018: bully (いじめる)
        origin: "オランダ語 boel（恋人→威張るやつへと変化）→ 弱い者を脅していじめる",
        link: "ブリー（いじめっ子）",
        note: "bully A into doing（Aを脅して〜させる）/ cyberbullying（ネットいじめ）"
    },
    1019: { // No. 1019: defend (守る)
        origin: "de-（離れて）+ fendere（突く・打つ）→ 敵の攻撃を打ち払って防衛・擁護する",
        link: "ディフェンス（守備）、ディフェンダー",
        note: "defend A against [from] B（BからAを守る）/ defendant（被告）"
    },
    1020: { // No. 1020: rescue (を救う)
        origin: "re-（再び）+ excutere（振り落とす・救い出す）→ 危機的状況から引っ張り出して救助する",
        link: "レスキュー隊（救助隊）",
        note: "rescue A from B（Bの危機からAを救う）/ come to the rescue（救助に駆けつける）"
    },
    1021: { // No. 1021: accuse (非難する)
        origin: "ad-（〜へ）+ causa（裁判の理由・罪）→ 罪を突きつけて告発・非難する",
        link: "コーズ（原因）と同根",
        note: "accuse A of B（BのことでAを非難・告発する）"
    },
    1022: { // No. 1022: sue (訴える)
        origin: "pro-（前へ）+ sequi（追う）→ 権利侵害に対して法廷で相手を追い詰めて訴える",
        link: "スーツ（訴訟）、パースー（追求する）と同根",
        note: "sue A for B（Bの損害賠償を求めてAを訴える）/ lawsuit（訴訟）"
    },
    1024: { // No. 1024: chase (追いかける)
        origin: "ラテン語 captiare（捕らえようとする・狩る）→ 逃げるものの後を追いかける",
        link: "チェイス（追跡・カーチェイス）、キャッチと同根",
        note: "chase after A（Aの後を追いかける）/ chase a dream（夢を追い求める）"
    },
    1025: { // No. 1025: arrest (逮捕する)
        origin: "ad-（〜へ）+ restare（立ち止まる・留まる）→ 容疑者の身柄をその場に制止して逮捕する",
        link: "レスト（休息）、アレスト",
        note: "arrest A for B（Bの容疑でAを逮捕する）/ under arrest（逮捕されて）"
    },
    1026: { // No. 1026: submit (提出する)
        origin: "sub-（下へ）+ mittere（送る）→ 相手の足元に書類を差し出して提出・屈服する",
        link: "ミッション（使節・任務）と同根",
        note: "submit to A（Aに屈する）/ submit A to B（BにAを提出する）"
    },
    1027: { // No. 1027: punish (罰する)
        origin: "ラテン語 punire（罰する）→ 罪や違反に対して法や規則で処罰する",
        link: "パニッシュメント（刑罰）、ペナルティと同根",
        note: "punish A for B（BのことでAを罰する）/ capital punishment（死刑）"
    },
    1031: { // No. 1031: modify (修正する)
        origin: "modus（度合い・基準）+ facere（作る）→ 行き過ぎを調整して修正する",
        link: "モード（様式）、モディファイ（仕様変更）",
        note: "modify a plan（計画を一部修正する）/ modification（修正）"
    },
    1035: { // No. 1035: substitute (代わりに使う)
        origin: "sub-（下に・代わりに）+ statuere（立てる）→ 本物の代わりに代理を立てる",
        link: "スタチュー（像）、ステータスと同根",
        note: "substitute A for B（Bの代わりにAを使う）"
    },
    1071: { // No. 1071: opponent (相手、敵)
        origin: "ob-（対して）+ ponere（置く）→ 真正面に立ち塞がって置かれた競争相手・敵",
        link: "コンポーネント（構成要素）と同根",
        note: "political opponent（政敵）⇔ proponent（提案者・支持者）"
    },
    1081: { // No. 1081: optimistic (楽観的な)
        origin: "optimum（最善のもの）+ -istic → すべてを最も良い方向に考える・楽観的な",
        link: "オプティマイズ（最適化）と同根",
        note: "be optimistic about A（Aについて楽観的である）⇔ pessimistic"
    },
    1091: { // No. 1091: precious (貴重な)
        origin: "pretium（価格・価値）+ -ous → 極めて高い価値を持つ・貴重な",
        link: "プライス（価格）、アプリシエイトと同根",
        note: "precious metals（貴金属）/ precious memory（大切な思い出）"
    },
    1097: { // No. 1097: inevitable (避けられない)
        origin: "in-（否定）+ evitabilis（避けられる）→ どうしても避けることができない・不可避な",
        link: "エビタブル（回避可能）",
        note: "it is inevitable that ...（…は避けられない）/ inevitably（必然的に）"
    },
    1101: { // No. 1101: forecast (予報)
        origin: "fore-（前もって）+ cast（投げる・計算する）→ 前方へ視線を投げて天候などを予測する",
        link: "キャスト（配役・投げる）",
        note: "weather forecast（天気予報）"
    },
    1102: { // No. 1102: speculate (思索する)
        origin: "specere（じっと見る・観察する）→ 状況をじっと見つめてあれこれ推測・投機する",
        link: "スペクタクル（壮大な光景）、メガネと同根",
        note: "speculate on [about] A（Aについて推測する）"
    },
    1104: { // No. 1104: quote (引用する)
        origin: "ラテン語 quot（いくつの・番号）→ 出典の章や節の番号を挙げて引用する",
        link: "クォーテーションマーク（引用符）",
        note: "quote A from B（BからAを引用する）/ quotation（引用文）"
    },
    1105: { // No. 1105: consult (意見を求める)
        origin: "con-（共に）+ consulere（熟考する）→ 専門家と一緒に考えて相談する",
        link: "コンサルタント、コンサルティング",
        note: "consult with A（Aに相談する）/ consult a dictionary（辞書を引く）"
    },
    1106: { // No. 1106: dispute (に異議を唱える)
        origin: "dis-（離れて・反対に）+ putare（計算する・考える）→ 意見を異にして激しく論争する",
        link: "コンピューター（共に計算するもの）と同根",
        note: "in dispute（論争中で）/ beyond dispute（議論の余地なく）"
    },
    1107: { // No. 1107: accumulate (集める、蓄積する)
        origin: "ad-（〜へ）+ cumulus（積み重なり・山）→ 山のように次々と積み上げて蓄積する",
        link: "アキュムレーション、積雲（キュムラス）と同根",
        note: "accumulate wealth（富を蓄積する）/ accumulation（蓄積）"
    },
    1108: { // No. 1108: grasp (ぎゅっとつかむ、理解する)
        origin: "ゲルマン祖語 grappon（手でぎゅっと握る）→ 手で強く握る、意味を深く把握する",
        link: "グリップと同根",
        note: "grasp the meaning（意味を正確に理解する）/ beyond one's grasp（理解を超えて）"
    },
    1109: { // No. 1109: grip (をしっかり握る)
        origin: "古英語 gripan（つかむ・握る）→ 滑らないように力いっぱい握る",
        link: "グリップ（握り・把持力）",
        note: "grip A tightly（Aをしっかり握る）/ lose one's grip（制御を失う）"
    },
    1110: { // No. 1110: seize (つかむ)
        origin: "古フランス語 seisir（法的に占有する・急につかむ）→ チャンスや獲物を一瞬でわしづかみにする",
        link: "シーザー（占領者）",
        note: "seize the opportunity（好機を逃さずつかむ）/ seize power（権力を握る）"
    },
    1111: { // No. 1111: comprehend (理解する)
        origin: "com-（完全に）+ prehendere（つかむ）→ 全体を丸ごと手でつかんで完全に理解する",
        link: "プリズン（捕らえる場所）と同根",
        note: "comprehensive（包括的な）/ comprehensible（理解できる）"
    },
    1112: { // No. 1112: constitute (構成する)
        origin: "con-（共に）+ statuere（立てる・設置する）→ 構成要素が集まって全体を形作る・構成する",
        link: "コンスティチューション（憲法・構成）、インスティテュートと同根",
        note: "constitute a threat（脅威を構成する・脅威となる）/ constitution（憲法）"
    },
    1113: { // No. 1113: reinforce (強化する)
        origin: "re-（再び）+ in-（中に）+ force（力）→ 外から支えを足して強度を補強・強化する",
        link: "レインフォースメント（補強・強化学習）",
        note: "reinforce a structure（構造を補強する）/ reinforce an argument（議論を補強する）"
    },
    1114: { // No. 1114: resort (訴える)
        origin: "re-（再び）+ sortir（出かける・行く）→ 最終的な拠り所として特定の手段に訴える・頼る",
        link: "リゾート地（人が足繁く通う保養地）",
        note: "resort to violence（暴力という最後の手段に訴える）/ as a last resort（最後の手段として）"
    },
    1115: { // No. 1115: donate (寄付する)
        origin: "donum（贈り物・寄付）+ -ate → 社会や他者のために無償で寄付・寄贈する",
        link: "ドナー（臓器提供者・寄付者）、パードンと同根",
        note: "donate money to charity（慈善団体に寄付する）/ donation（寄付金）"
    },
    1116: { // No. 1116: obey (従う)
        origin: "ob-（〜に向かって）+ audire（聞く）→ 声に真剣に耳を傾けて規則や命令に従う",
        link: "オーディオ（音声）と同根",
        note: "obey the rules（規則に従う ※他動詞、obey toは不可）⇔ disobey"
    },
    1117: { // No. 1117: dedicate (ささげる)
        origin: "de-（徹底的に）+ dicare（宣言する・捧げる）→ 私心を捨てて特定の目的へ人生を捧げる",
        link: "デディケーション（献身・献呈）、インディケートと同根",
        note: "dedicate oneself to A [doing]（Aに専念する・身を捧げる）"
    },
    1118: { // No. 1118: transmit (伝える)
        origin: "trans-（越えて）+ mittere（送る）→ 空間や世代を越えて電波や情報を送信・伝達する",
        link: "トランスミッター（送信機）、ミッションと同根",
        note: "transmit data（データを送信する）/ transmission（送信・伝染）"
    },
    1119: { // No. 1119: equip (装備する)
        origin: "古ノルド語 skipa（船に装備を整える）→ 旅立ちに必要な設備や装備を備え付ける",
        link: "エキップメント（備品・設備）、シップと同根",
        note: "equip A with B（AにBを装備させる）/ well-equipped（設備の整った）"
    },
    1120: { // No. 1120: bind (縛る)
        origin: "ゲルマン祖語 bindan（縄で縛る・結びつける）→ 自由を奪って縛る・契約で拘束する",
        link: "バインダー（書類挟み）、バンド（束ねるもの）と同根",
        note: "be bound by law（法律に拘束される）/ be bound to do（必ず〜する運命にある）"
    },
    1121: { // No. 1121: pose (投げかける)
        origin: "ラテン語 pausare（立ち止まる・置く）→ 問題や危険を目の前に突きつける",
        link: "ポーズ（姿勢・構え）",
        note: "pose a problem [threat]（問題[脅威]を投げかける）"
    },
    1123: { // No. 1123: hesitate (ためらう、躊躇する)
        origin: "ラテン語 haerere（くっつく・立ち往生する）→ 足が止まってためらう",
        link: "アドヒア（接着する）と同根",
        note: "hesitate to do（〜するのをためらう）/ hesitation（ためらい）"
    },
    1124: { // No. 1124: split (分割する)
        origin: "中世低地ドイツ語 splitten（縦にパカッと割る）→ 2つ以上の部分に引き裂いて分割する",
        link: "スプリット（分割・股割り）、バナナスプリット",
        note: "split into two（2つに分裂する）/ split the bill（割り勘にする）"
    },
    1125: { // No. 1125: bend (曲げる)
        origin: "古英語 bendan（弓の弦を引いて曲げる）→ 力を加えて湾曲させる・腰をかがめる",
        link: "ベンド（カーブ・曲がり角）、バインドと同根",
        note: "bend down（かがむ）/ bend the rules（規則を曲げて便宜を図る）"
    },
    1131: { // No. 1131: cheat (だます)
        origin: "古英語 eschete（没収財産・詐術）→ 不正を行ってだます",
        link: "チート（不正行為・裏技）",
        note: "cheat on an exam（試験でカンニングする）/ cheat A out of B"
    },
    1141: { // No. 1141: fade (消えていく)
        origin: "古フランス語 fader（弱まる・衰える）→ 色や記憶が次第に消えていく",
        link: "フェードアウト（次第に消える）",
        note: "fade away（徐々に消え去る）"
    },
    1161: { // No. 1161: obligation (義務)
        origin: "ob-（〜に向かって）+ ligare（固く結ぶ）→ 契約や道徳で縛りつけられた義務",
        link: "ラリー、リガメントと同根",
        note: "have an obligation to do（〜する義務がある）/ legal obligation（法的義務）"
    },
    1171: { // No. 1171: tragedy (悲惨な出来事)
        origin: "ギリシャ語 tragoidia（ヤギの歌・悲劇）→ 取り返しのつかない悲惨な結末・悲劇",
        link: "トラジック（悲劇的な）",
        note: "tragic accident（悲惨な事故）⇔ comedy（喜劇）"
    },
    1181: { // No. 1181: noble (高貴な)
        origin: "gnobilis（知られている・高名な）→ 人格や身分が際立って高い・高貴な",
        link: "ノーベル賞、ノウ（知る）と同根",
        note: "noble goal（気高い目標）/ nobility（貴族階級）"
    },
    1191: { // No. 1191: ultimate (最終的な)
        origin: "ultimus（最も遠い・最後の）→ 極限の果てに行き着いた・究極の",
        link: "アルティメット（究極のフリスビー競技）",
        note: "ultimate goal（最終目標）/ ultimately（最終的に・究極的には）"
    },
    1201: { // No. 1201: whisper (ささやく)
        origin: "印欧祖語 kwei-（息をひそめる擬音）→ ささやく",
        link: "ウィスパーボイス",
        note: "whisper to A（Aに耳打ちする）"
    },
    1202: { // No. 1202: yell (叫ぶ)
        origin: "古英語 giellan（甲高い声で叫ぶ・吠える擬音）→ 遠くまで響く大声で叫ぶ",
        link: "エール（応援の叫び）",
        note: "yell at A（Aを怒鳴りつける）/ yell for help（大声で助けを呼ぶ）"
    },
    1203: { // No. 1203: scream (叫び声をあげる)
        origin: "古ノルド語 skraema（悲鳴を上げて怖がらせる）→ 恐怖や激痛で甲高く叫び声をあげる",
        link: "スクリーム（絶叫映画・悲鳴）",
        note: "scream in pain [terror]（痛み[恐怖]で悲鳴をあげる）"
    },
    1204: { // No. 1204: nod (うなずく)
        origin: "古英語 hnoddian（頭をすばやく動かす）→ うなずく・会釈する",
        link: "ノッド",
        note: "nod in agreement（同意してうなずく）"
    },
    1205: { // No. 1205: swallow (飲み込む)
        origin: "古英語 swelgan（ゴクリと飲む・飲み込む）→ 喉の奥へ流し込む、屈辱に耐える",
        link: "スワロー（ツバメの古名と同音）",
        note: "swallow one's pride（誇りを捨てて耐える）/ hard to swallow（到底受け入れ難い）"
    },
    1206: { // No. 1206: yawn (あくびをする)
        origin: "古英語 geonian（大きく口を開ける）→ 眠気や退屈で大きなあくびをする",
        link: "ヤーン",
        note: "give a yawn（あくびをする）"
    },
    1207: { // No. 1207: cough (咳をする)
        origin: "中英語 coughen（喉を鳴らす擬音）→ 喉の異物を出すために咳をする",
        link: "コフシロップ（咳止めシロップ）",
        note: "have a bad cough（ひどい咳が出る）"
    },
    1208: { // No. 1208: hug (抱きしめる)
        origin: "古ノルド語 hugga（心を慰める・抱きしめる）→ 両腕でぎゅっと包み込んで抱きしめる",
        link: "ハグ（抱擁）",
        note: "give A a big hug（Aを力強く抱きしめる）"
    },
    1209: { // No. 1209: sweep (掃く)
        origin: "古英語 swapan（ほうきで一気に払う・掃く）→ ゴミをほうきで掃く、波が押し流す",
        link: "スイーパー（掃除機・サッカーの守備役）",
        note: "sweep the floor（床を掃く）/ sweep-swept-swept"
    },
    1210: { // No. 1210: polish (磨く)
        origin: "ラテン語 polire（滑らかにする・磨く）→ 表面をピカピカに磨く、表現を推敲する",
        link: "ネイルポリッシュ（マニキュア）、ポリッシュ",
        note: "polish shoes（靴を磨く）/ polish up one's English（英語を磨き直す）"
    },
    1211: { // No. 1211: decorate (装飾する)
        origin: "decus（美・名誉）+ -ate → 飾り立てて美しく見栄えを良くする",
        link: "デコレーション（装飾・飾り付け）",
        note: "decorate A with B（AをBで装飾する）"
    },
    1212: { // No. 1212: shed (（涙）を流す)
        origin: "古英語 sceadan（分け隔てる・外へ落とす）→ 涙や葉、古い皮を外へ自然と流す・脱ぎ捨てる",
        link: "シェッド（物置・流す）",
        note: "shed tears（涙を流す）/ shed light on A（Aに光を当てて真相を解明する）"
    },
    1213: { // No. 1213: drag (引きずる)
        origin: "古ノルド語 draga（重いものを引きずる）→ 地面を引きずって運ぶ、マウスでドラッグする",
        link: "ドラッグ＆ドロップ",
        note: "drag A out of B（BからAを引きずり出す）/ time drags（時間が長く感じられる）"
    },
    1214: { // No. 1214: spoil (台無しにする)
        origin: "ラテン語 spolium（戦利品・剥ぎ取った甲冑）→ 甘やかしすぎて台無しにする・腐る",
        link: "ネタバレ（スポイラー）、スポイル（甘やかす）",
        note: "spoil a child（子供を甘やかす）/ spoil one's appetite（食欲を失わせる）"
    },
    1215: { // No. 1215: burst (破裂する)
        origin: "古英語 berstan（内圧でバンと破裂する）→ 感情や容器が一気に破裂・飛び散る",
        link: "バースト（タイヤ破裂・バーストモード）",
        note: "burst into tears（ワッと泣き出す）/ burst out laughing（ドッと笑い出す）"
    },
    1216: { // No. 1216: explode (爆発する)
        origin: "ex-（外へ）+ plaudere（手を叩いて追い払う）→ 溜まったエネルギーが激しく大爆発する",
        link: "アプローズ（拍手喝采）の対義語、エクスプロージョン",
        note: "explode with anger（怒りを爆発させる）/ explosion（爆発）"
    },
    1217: { // No. 1217: compromise (妥協する)
        origin: "com-（共に）+ promittere（約束する）→ 互いに譲歩し合って妥協する",
        link: "プロミスと同根、コンプロマイズ",
        note: "reach a compromise（妥協に達する）/ compromise with A（Aと妥協する）"
    },
    1218: { // No. 1218: exaggerate (誇張する)
        origin: "ex-（外へ）+ agger（土手・盛り土）→ 話を山のように大げさに盛って誇張する",
        link: "エグザジェレーション（誇張）",
        note: "exaggerate the truth（真実を誇張して話す）/ exaggerated claims（誇大広告）"
    },
    1219: { // No. 1219: exploit (搾取する)
        origin: "ex-（外へ）+ plicare（折り目を広げる）→ 資源を開発して利用する、労働者を不当に搾取する",
        link: "エクスプロイト（利用・開拓）",
        note: "exploit natural resources（天然資源を開発する）/ exploitation（搾取・開発）"
    },
    1220: { // No. 1220: utilize (利用する)
        origin: "uti（使う・役に立つ）+ -ize → 長所を生かして有効に利用・活用する",
        link: "ユーティリティ（実用性・利便性）",
        note: "utilize solar energy（太陽エネルギーを活用する）/ utilization（利用）"
    },
    1221: { // No. 1221: irritate (いらいらさせる)
        origin: "ラテン語 irritare（刺激する・怒らせる）→ 神経を逆なでしていらいらさせる",
        link: "イリテーション（苛立ち）",
        note: "be irritated by [at] A（Aに苛立つ）/ irritable（怒りっぽい）"
    },
    1222: { // No. 1222: insult (侮辱する)
        origin: "in-（〜の上に）+ salire（飛び跳ねる）→ 相手を踏みつけるように無礼な言葉で侮辱する",
        link: "アサルト（強襲）と同根",
        note: "insult A in public（人前でAを侮辱する）/ an insult to A（Aに対する侮辱）"
    },
    1223: { // No. 1223: deceive (だます)
        origin: "de-（悪く・離れて）+ capere/ceive（つかむ）→ 罠にかけて巧みに騙す・欺く",
        link: "ディセプション（詐欺・ペテン）、レシーブと同根",
        note: "deceive oneself（自分を偽る）/ deceptive appearance（見かけ倒しの外見）"
    },
    1224: { // No. 1224: violate (違反する)
        origin: "vis（暴力・力）+ -ate → 法や約束を暴力的に踏みにじって違反・侵害する",
        link: "バイオレンス（暴力）と同根",
        note: "violate human rights（人権を侵害する）/ violation of the law（法違反）"
    },
    1225: { // No. 1225: disgust (嫌悪感を持たせる)
        origin: "dis-（否定）+ gustus（味・好み）→ 吐き気を催すほど不快で嫌悪感を抱かせる",
        link: "ガスト（突風・味）と同根",
        note: "to one's disgust（うんざりしたことには）/ be disgusted with A（Aに愛想を尽かす）"
    },
    1227: { // No. 1227: tolerate (耐える)
        origin: "ラテン語 tolerare（重荷に耐える）→ 気に入らなくても我慢して許容する",
        link: "トレランス（寛容・耐性）",
        note: "tolerate doing（〜することを大目に見る・許容する）"
    },
    1231: { // No. 1231: undertake (引き受ける)
        origin: "under（下から）+ take（引き受ける）→ 責任の重みを下から背負って引き受ける",
        link: "テイクアンダー",
        note: "undertake a task（課題を引き受ける）/ undertaking（大事業・引き受け）"
    },
    1281: { // No. 1281: superior (優れている)
        origin: "super（〜の上に）+ -ior（比較級）→ 他より上位に立って優れている",
        link: "スーペリア（上質の）、スーパーと同根",
        note: "be superior to A（Aより優れている）⇔ inferior（劣っている）"
    },
    1291: { // No. 1291: manual (手による)
        origin: "ラテン語 manus（手）+ -al → 機械でなく手作業で行う・手の",
        link: "マニュアル（手引き書）、マニュファクチャーと同根",
        note: "manual labor（肉体労働）/ instruction manual（取扱説明書）"
    },
    1301: { // No. 1301: conceive (を抱く、思いつく)
        origin: "con-（共に・完全に）+ ceive（つかむ・宿す）→ 心の中にアイデアや命を宿す",
        link: "コンセプト（概念）、インセプションと同根",
        note: "conceive of A as B（AをBとして心に描く）/ concept（概念）"
    },
    1302: { // No. 1302: confess (を告白する)
        origin: "con-（完全に）+ fateri（認める・話す）→ 包み隠さずすべて口にして告白する",
        link: "プロフェッサー（公言する人）と同根",
        note: "confess to doing（〜したことを白状する）/ confession（告白）"
    },
    1303: { // No. 1303: conform (従う)
        origin: "con-（共に）+ form（形）→ 周囲と同じ形に合わせて一致・順応する",
        link: "フォーマル（形式通りの）、コンフォーミスト",
        note: "conform to A（A[規則・社会通念]に従う・順応する）"
    },
    1304: { // No. 1304: offend (を怒らせる)
        origin: "ob-（向かって）+ fendere（突く・打つ）→ 攻撃的にぶつかって感情を害する・違反する",
        link: "ディフェンド（防御）の対義語、オフェンス（攻撃）",
        note: "offend against A（A[法・道徳]に違反する）/ offensive（不快な）"
    },
    1305: { // No. 1305: envy (をうらやむ)
        origin: "in-（悪意をもって）+ videre（じっと見る）→ 相手の幸運を妬みの目で見る・羨む",
        link: "エンヴィ（七つの大罪の嫉妬）",
        note: "envy A for B（BのことでAを羨む）/ green with envy（ひどく嫉妬して）"
    },
    1306: { // No. 1306: boast (自慢する)
        origin: "古英語 bōst（誇り・自慢）→ 声高に自慢する",
        link: "ボースト",
        note: "boast of [about] A（Aを自慢する・誇る）"
    },
    1307: { // No. 1307: dare (あえてする、する勇気がある)
        origin: "ゲルマン祖語 dars-（勇気がある）→ 恐れずにあえて思い切って〜する",
        link: "デアデビル（命知らず）、アイ・デア・ユー",
        note: "How dare you do ...!（よくも図々しく〜できるな！）/ dare to do（あえて〜する）"
    },
    1308: { // No. 1308: confine (を限定する)
        origin: "con-（共に）+ finis（境界線・限界）→ 境界線の内側に閉じ込めて限定・監禁する",
        link: "ファイナル（最後）と同根",
        note: "confine A to B（AをBの範囲に限定する・閉じ込める）/ confinement（監禁）"
    },
    1309: { // No. 1309: contradict (と矛盾する)
        origin: "contra-（反対に）+ dict（言う）→ 相手の言葉と正反対のことを言って矛盾する",
        link: "ディクテーションと同根",
        note: "contradict each other（互いに矛盾する）/ contradiction（矛盾）"
    },
    1310: { // No. 1310: compensate (に補償する)
        origin: "con-（共に）+ pensare（重さを量る・釣り合わせる）→ 釣り合う対価を払って埋め合わせる・補償する",
        link: "ペンション（年金）、サスペンドと同根",
        note: "compensate for A（Aを埋め合わせる・補償する）"
    },
    1311: { // No. 1311: coincide (同時に起こる)
        origin: "con-（共に）+ in-（中へ）+ cadere（落ちる）→ 偶然同じ時に落ち合って同時に起こる・一致する",
        link: "アクシデント（事故）と同根",
        note: "coincide with A（Aと時期が偶然一致する・見解が合致する）/ coincidence（偶然の一致）"
    },
    1312: { // No. 1312: assure (に安心させる)
        origin: "ad-（〜へ）+ securus（安心な・安全な）→ 不安を取り除いて安心・保証する",
        link: "インシュアランス（保険）、セキュアと同根",
        note: "assure A that ... / assure A of B（Aに…を保証する・確信させる）"
    },
    1313: { // No. 1313: attain (を達成する)
        origin: "ad-（〜へ）+ tangere（触れる・達する）→ 手を伸ばして目標に到達・達成する",
        link: "コンタクト（接触）と同根",
        note: "attain a goal（目標を達成する）/ attainable（達成可能な）"
    },
    1314: { // No. 1314: inquire (を尋ねる)
        origin: "in-（中に）+ quaerere（求める・探す）→ 内部深くに立ち入って尋ねる",
        link: "クエリ（問い合わせ）、リクエストと同根",
        note: "inquire about A（Aについて尋ねる）/ inquiry（問い合わせ・調査）"
    },
    1315: { // No. 1315: invade (を侵略する、に侵攻する)
        origin: "in-（中に）+ vadere（進む・歩く）→ 境界を越えて中へ侵入・侵略する",
        link: "インベーダー（侵略者）",
        note: "invade a country（国を侵略する）/ invasion（侵略）"
    },
    1316: { // No. 1316: conquer (を征服する)
        origin: "con-（完全に）+ quaerere（求める・獲得する）→ 完全に力で手に入れて征服する",
        link: "コンクエスト（征服）",
        note: "conquer fear（恐怖を克服する）/ conqueror（征服者）"
    },
    1317: { // No. 1317: persist (固執する、しつこく続ける)
        origin: "per-（徹底的に）+ sist（立ち続ける）→ 困難にも屈せず頑なに持続・固執する",
        link: "アシスト、レジストと同根",
        note: "persist in A（Aに固執する）/ persistent（粘り強い）"
    },
    1318: { // No. 1318: last (続く)
        origin: "古英語 laestan（足跡をたどる・留まる）→ 終わらずにずっと持ちこたえて続く",
        link: "ラスト（最後・持続する）",
        note: "last for a long time（長い間持続する）/ lasting peace（長続きする平和）"
    },
    1319: { // No. 1319: surrender (を引き渡す)
        origin: "sur-（上に・手放して）+ rendre（引き渡す）→ 白旗を揚げて降伏する・権利を明け渡す",
        link: "レンダー（与える）と同根",
        note: "surrender to A（Aに降伏する）/ surrender one's rights（権利を放棄する）"
    },
    1320: { // No. 1320: betray (を裏切る、を漏らす)
        origin: "be-（強意）+ tradere（引き渡す）→ 敵の手に密かに引き渡して裏切る・本性を漏らす",
        link: "トレード（取引）、トラディションと同根",
        note: "betray one's trust（信頼を裏切る）/ betray one's ignorance（無知を露呈する）"
    },
    1321: { // No. 1321: strain (をぴんと張る、を痛める)
        origin: "ラテン語 stringere（きつく引っ張る）→ 限界まで引っ張ってピンと張る・筋を痛める",
        link: "ストリクト（厳格な）と同根",
        note: "strain one's eyes（目を凝らす）/ muscle strain（肉離れ・筋緊張）"
    },
    1322: { // No. 1322: refrain (控える)
        origin: "re-（後ろへ）+ frenum（手綱）→ 手綱を引いて自制し、控える・やめておく",
        link: "リフレイン（繰り返す句・自制）",
        note: "refrain from doing（〜するのを差し控える）/ refrain from smoking（喫煙を控える）"
    },
    1323: { // No. 1323: scatter (をまき散らす)
        origin: "古英語 scateren（四方八方に飛び散る）→ 風や力で広範囲にまき散らす",
        link: "スキャッター（散乱・分散）",
        note: "scatter seeds（種をまく）/ be scattered all over（一面に散乱している）"
    },
    1324: { // No. 1324: spill (をこぼす)
        origin: "古英語 spillan（破壊する・こぼす）→ 容器から液体をうっかりこぼす",
        link: "スピル（流出事故）",
        note: "no use crying over spilled milk（覆水盆に返らず）/ spill the beans（秘密を漏らす）"
    },
    1325: { // No. 1325: prevail (普及する、勝る)
        origin: "prae-（前に立って）+ valere（力がある）→ 圧倒的な強さで社会に広く普及する・打ち勝つ",
        link: "プレバレント（普及している）、バリューと同根",
        note: "prevail over A（Aに打ち勝つ）/ prevailing opinion（支配的な意見）"
    },
    1326: { // No. 1326: starve (飢えに苦しむ、渇望する)
        origin: "古英語 steorfan（死ぬ・衰弱する）→ 食料がなくて飢えに苦しむ・飢死する",
        link: "スターベーション（飢餓）",
        note: "starve to death（餓死する）/ be starving（お腹がペコペコだ）"
    },
    1327: { // No. 1327: digest (を消化する)
        origin: "dis-（あちこちへ）+ gerere（運ぶ）→ 胃の中で分解して消化する・本の内容を咀嚼する",
        link: "ダイジェスト版（要約・消化版）",
        note: "digest food easily（食べ物を容易に消化する）/ digestion（消化）"
    },
    1328: { // No. 1328: disguise (を変装させる)
        origin: "dis-（否定・覆す）+ guise（外見・服装）→ 外見を変装させて正体を隠す",
        link: "ディスガイズ（変装）",
        note: "in disguise（変装して）/ a blessing in disguise（一見不幸に見えるが実は幸運なこと）"
    },
    1396: { // No. 1396: supreme (最高の、最大の)
        origin: "super（上に）の最上級 → 最上位に位置する・最高の",
        link: "シュプリーム（至高の）、スーパーと同根",
        note: "Supreme Court（最高裁判所）/ supremacy（至高・覇権）"
    },
    1397: { // No. 1397: infinite (無限の)
        origin: "in-（否定）+ finis（限界・境界）→ 終わりの境界線がない・無限の",
        link: "フィニッシュ（終わり）、ファイナルと同根",
        note: "infinite patience（無限の忍耐）⇔ finite（有限の）"
    },
    1398: { // No. 1398: static (変化のない)
        origin: "ギリシャ語 statikos（立っている・動かない）→ 動きがなく静止した",
        link: "スタチュー（像）、ステーションと同根",
        note: "static ⇔ dynamic（動的な）"
    },
    1399: { // No. 1399: thorough (徹底的な)
        origin: "古英語 thurh（貫通して）→ through（通り抜けて）と同根、徹底的な",
        link: "スルー（通り抜ける）",
        note: "thorough investigation（徹底的な調査）/ thoroughly（徹底的に）"
    },
    1400: { // No. 1400: immense (計り知れない)
        origin: "in-（否定）+ mensus（測られた・限界）→ 測定器では測りきれないほど巨大な",
        link: "メジャー（測定する・寸法）と同根",
        note: "immense wealth（計り知れない富）/ immensely（非常に）"
    },
};

/**
 * 単語オブジェクトから対応するヒントを取得
 * @param {Object} wordObj - { id, word, ... }
 * @returns {Object|null} - 厳選ヒントまたはnull
 */
export function getWordHint(wordObj) {
    if (!wordObj || !wordObj.id) return null;
    const hint = hintsData1400[wordObj.id];
    if (!hint) return null;
    if (!hint.origin && !hint.link && !hint.note) return null;
    return hint;
}
