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
{text:'人の輪に入り、空気をやわらかくするのが得意だ',plus:[0,1,12],minus:[7,13,14],guide:0},
{text:'相手の気持ちの変化にすぐ気づく',plus:[1,2,10],minus:[3,8,13],guide:1},
{text:'困っている人を見ると、自然に手を差しのべたくなる',plus:[5,15,9],minus:[7,13,14],guide:5},
{text:'計画を立てて、みんなを前に進めるのが得意だ',plus:[3,6,8],minus:[1,12,14],guide:3},
{text:'新しい希望やアイデアを考えるとわくわくする',plus:[4,1,0],minus:[8,11,13],guide:4},
{text:'強く引っぱるより、自然に寄り添う方が自分らしい',plus:[0,5,9],minus:[3,7,8],guide:9},
{text:'静かな場所で、人や物事をじっくり見守る方が落ち着く',plus:[6,14,13],minus:[3,4,12],guide:6},
{text:'正しいと思うことは、時間がかかっても守りたい',plus:[7,8,11],minus:[1,4,12],guide:7},
{text:'一度決めたことは、最後までこつこつ続けられる',plus:[8,13,11],minus:[4,12,1],guide:8},
{text:'相手を受け止める安心感を大切にしている',plus:[9,5,0],minus:[7,3,13],guide:9},
{text:'小さな変化や違和感に気づきやすい',plus:[10,2,6],minus:[4,12,3],guide:10},
{text:'約束や信頼をかなり大切にする',plus:[11,15,7],minus:[4,12,1],guide:11},
{text:'人を安心させる言葉や空気づくりをよく選ぶ',plus:[12,0,5],minus:[7,8,3],guide:12},
{text:'急がず慎重に判断する方だ',plus:[13,8,14],minus:[4,12,3],guide:13},
{text:'深く考えてから動くことが多い',plus:[14,6,10],minus:[3,4,12],guide:14},
{text:'誰かの支えになると、自分にも力がわいてくる',plus:[15,5,11],minus:[14,7,13],guide:15}
];
let idx=0,score=Array(types.length).fill(0),history=[];
const answerScores=[2,1,0,-1,-2];
const answerLabels=['とても当てはまる','少し当てはまる','どちらともいえない','あまり当てはまらない','当てはまらない'];
function go(id){if(id==='book')id='animalBook';document.body.dataset.page=id;document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');scrollTo(0,0);if(id==='quiz')startQuiz()}document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
function startQuiz(){idx=0;score=Array(types.length).fill(0);history=[];renderQ()}
function applyAnswer(q,value,direction=1){q.plus.forEach((typeIndex,rank)=>score[typeIndex]+=direction*value*(3-rank));q.minus.forEach((typeIndex,rank)=>score[typeIndex]-=direction*value*(3-rank))}
function renderQ(){let q=questions[idx];progress.textContent=`${idx+1} / ${questions.length}`;qtext.textContent=q.text;if(quizAnimal){quizAnimal.src=types[q.guide].img;quizAnimal.alt=`${types[q.guide].name}が質問を案内しています`}answers.innerHTML='';answerLabels.forEach((t,n)=>{let b=document.createElement('button');b.textContent=t;b.onclick=()=>{let value=answerScores[n];applyAnswer(q,value);history[idx]={q,value};idx++;idx<questions.length?renderQ():showResult()};answers.appendChild(b)});back.style.visibility=idx?'visible':'hidden'}
back.onclick=()=>{if(idx>0){idx--;let previous=history[idx];if(previous)applyAnswer(previous.q,previous.value,-1);history.length=idx;renderQ()}};
function showResult(){let max=score.indexOf(Math.max(...score));let t=types[max];resultTitle.textContent=t.name;resultSub.textContent=`${t.id}｜${t.sub}`;resultImg.src=t.img;go('result')}
const books=['animal1.jpeg','animal2.jpeg','mystery1.jpeg','mystery2.jpeg'];function showBook(i){go(i<2?'animalBook':'mysteryBook')}window.showBook=showBook;
