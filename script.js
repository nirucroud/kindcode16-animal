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
const questions=[
'人の輪に入り、空気をやわらかくするのが得意だ',
'相手の気持ちの変化にすぐ気づく',
'困っている人を見ると、自然に手を差しのべたくなる',
'計画を立てて、みんなを前に進めるのが得意だ',
'新しい希望やアイデアを考えるとわくわくする',
'強く引っぱるより、自然に寄り添う方が自分らしい',
'静かな場所で、人や物事をじっくり見守る方が落ち着く',
'正しいと思うことは、時間がかかっても守りたい',
'一度決めたことは、最後までこつこつ続けられる',
'相手を受け止める安心感を大切にしている',
'小さな変化や違和感に気づきやすい',
'約束や信頼をかなり大切にする',
'人を安心させる言葉や空気づくりをよく選ぶ',
'急がず慎重に判断する方だ',
'深く考えてから動くことが多い',
'誰かの支えになると、自分にも力がわいてくる'
];
let idx=0,score=Array(types.length).fill(0),history=[];
const answerLabels=['とても当てはまる','少し当てはまる','どちらともいえない','あまり当てはまらない','当てはまらない'];
function scoreTargets(questionIndex,answerIndex){const base=(questionIndex+answerIndex*3)%types.length;return [base,(base+5)%types.length,(base+11)%types.length,(questionIndex*7+answerIndex*2)%types.length]}
function answerWeight(answerIndex,rank){const table=[6,4,3,2];return table[rank]-(answerIndex===2&&rank>1?1:0)}
function responseSignature(){return history.reduce((sum,item,i)=>sum+(item.answerIndex+1)*(i+3)*(i+7),0)%types.length}
function go(id){if(id==='book')id='animalBook';document.body.dataset.page=id;document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');scrollTo(0,0);if(id==='quiz')startQuiz()}document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
function startQuiz(){idx=0;score=Array(types.length).fill(0);history=[];renderQ()}
function applyAnswer(questionIndex,answerIndex,direction=1){scoreTargets(questionIndex,answerIndex).forEach((typeIndex,rank)=>score[typeIndex]+=direction*answerWeight(answerIndex,rank))}
function renderQ(){let q=questions[idx];progress.textContent=`${idx+1} / ${questions.length}`;qtext.textContent=q;answers.innerHTML='';answerLabels.forEach((t,n)=>{let b=document.createElement('button');b.textContent=t;b.onclick=()=>{applyAnswer(idx,n);history[idx]={answerIndex:n};idx++;idx<questions.length?renderQ():showResult()};answers.appendChild(b)});back.style.visibility=idx?'visible':'hidden'}
back.onclick=()=>{if(idx>0){idx--;let previous=history[idx];if(previous)applyAnswer(idx,previous.answerIndex,-1);history.length=idx;renderQ()}};
function showResult(){let signature=responseSignature();let adjusted=score.map((value,i)=>value+(i===signature?0.75:0)+(((signature+i*3)%7)*0.01));let max=adjusted.indexOf(Math.max(...adjusted));let t=types[max];resultImg.src=t.img;resultImg.alt=`診断結果 ${t.name}`;go('result')}
const books=['animal1.jpeg','animal2.jpeg','mystery1.jpeg','mystery2.jpeg'];function showBook(i){go(i<2?'animalBook':'mysteryBook')}window.showBook=showBook;
