const types=[
{id:'EHDU',name:'調和のシカ',sub:'平和の仲介者',img:'shika.jpeg'},
{id:'FLAC',name:'共鳴のラッコ',sub:'心のつなぎ手',img:'rakko.jpeg'},
{id:'SVDU',name:'察知のキツネ',sub:'気配の案内人',img:'kitsune.jpeg'},
{id:'ESTJ',name:'結束のビーバー',sub:'絆の設計士',img:'beaver.jpeg'},
{id:'PIKARIRU',name:'希望のイルカ',sub:'未来のひらめき役',img:'iruka.jpeg'},
{id:'EHDV',name:'慈愛のハクチョウ',sub:'愛を包む導き手',img:'hakucho.jpeg'},
{id:'ESFJ',name:'守護のフクロウ',sub:'知恵のガーディアン',img:'fukuro.jpeg'},
{id:'SDWG',name:'信念のオオカミ',sub:'誇り高き導き手',img:'ookami.jpeg'},
{id:'SHDJ',name:'忍耐のゾウ',sub:'大地の支え手',img:'zou.jpeg'},
{id:'SHDB',name:'包容のコアラ',sub:'みんなの安心基地',img:'koala.jpeg'},
{id:'ISDU',name:'配慮のハリネズミ',sub:'気づかいの名人',img:'harinezumi.jpeg'},
{id:'ISFJ',name:'忠誠のリス',sub:'信頼のパートナー',img:'risu.jpeg'},
{id:'ESHP',name:'癒やしのウサギ',sub:'やさしさのヒーラー',img:'usagi.jpeg'},
{id:'STTL',name:'慎重のカメ',sub:'確かな一歩の旅人',img:'kame.jpeg'},
{id:'IFDU',name:'深海のクジラ',sub:'静かな哲学者',img:'kujira.jpeg'},
{id:'EHDV2',name:'献身のシバイヌ',sub:'頼れるサポーター',img:'shiba.jpeg'}];
const qs=['人の輪に入り、空気をやわらかくするのが得意だ','相手の気持ちの変化にすぐ気づく','困っている人を見ると放っておけない','計画を立ててみんなを進めるのが得意だ','新しい希望やアイデアを出すのが好きだ','強く引っぱるより自然に寄り添いたい','静かな場所で人を見守る方が落ち着く','正しいと思うことは最後まで守りたい','時間がかかっても最後までやり抜く','相手を受け止める安心感を大切にする','小さな変化や違和感に気づきやすい','約束や信頼をかなり大切にする','人を安心させる言葉をよく選ぶ','急がず慎重に判断する方だ','深く考えてから動くことが多い','誰かの支えになると力が出る','みんなの意見をまとめるのが好きだ','自分から明るく声をかけることが多い','一人の時間で心を整えることがある','誰かの不安を聞く役になることが多い','目標に向けて努力を続けられる','場の空気を読んで行動を変えられる','相手のために自分の予定を調整できる','未来のことを考えるとわくわくする'];
let idx=0,score=Array(types.length).fill(0);const weights=qs.map((_,i)=>[i%16,(i*5+3)%16,(i*7+1)%16]);
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');scrollTo(0,0);if(id==='quiz')startQuiz()}document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
function startQuiz(){idx=0;score=Array(types.length).fill(0);renderQ()}function renderQ(){progress.textContent=`${idx+1} / ${qs.length}`;qtext.textContent=qs[idx];answers.innerHTML='';['とても当てはまる','少し当てはまる','どちらともいえない','あまり当てはまらない','当てはまらない'].forEach((t,n)=>{let b=document.createElement('button');b.textContent=t;b.onclick=()=>{weights[idx].forEach((w,k)=>score[w]+=[5,4,3,2,1][n]*(3-k));idx++;idx<qs.length?renderQ():showResult()};answers.appendChild(b)});back.style.visibility=idx?'visible':'hidden'}back.onclick=()=>{if(idx>0){idx--;renderQ()}};
function showResult(){let max=score.indexOf(Math.max(...score));let t=types[max];resultTitle.textContent=t.name;resultSub.textContent=`${t.id}｜${t.sub}`;resultImg.src=t.img;go('result')}
const books=['animal1.jpeg','animal2.jpeg','mystery1.jpeg','mystery2.jpeg'];function showBook(i){bookImg.src=books[i]}window.showBook=showBook;
