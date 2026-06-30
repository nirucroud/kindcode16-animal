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
const axisTypeMap=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const questions=[
{text:'みんなと話しながら考えると、自分らしい答えが見つかりやすい',axis:0,dir:1},
{text:'にぎやかな場では、自分から空気を明るくすることが多い',axis:0,dir:1},
{text:'一人で静かに考える時間があると、心が整いやすい',axis:0,dir:-1},
{text:'深く集中してから動く方が、自分の力を出しやすい',axis:0,dir:-1},
{text:'相手の気持ちを想像して、まず寄り添うことを大切にする',axis:1,dir:1},
{text:'場の空気や心の動きに、自然と目が向きやすい',axis:1,dir:1},
{text:'状況を整理して、必要な役割や段取りを考えるのが得意だ',axis:1,dir:-1},
{text:'困ったときほど、感情よりも手順や仕組みを整えたくなる',axis:1,dir:-1},
{text:'まだ見えていない可能性や未来の展開を考えるのが好きだ',axis:2,dir:1},
{text:'新しいアイデアや希望を見つけると、気持ちが前に向く',axis:2,dir:1},
{text:'慣れたやり方や信頼できる約束を大事にしたい',axis:2,dir:-1},
{text:'急な変化より、確かな一歩を積み重ねる方が落ち着く',axis:2,dir:-1},
{text:'誰かのそばで支えることに、自分のやさしさが出やすい',axis:3,dir:1},
{text:'人の安心や回復を助ける役に、自然となることが多い',axis:3,dir:1},
{text:'必要なときは前に立って、方向性を示すことができる',axis:3,dir:-1},
{text:'大切なものを守るためなら、責任を持って導きたい',axis:3,dir:-1}
];
let idx=0,axes=[0,0,0,0],history=[];
const answerLabels=['とても当てはまる','少し当てはまる','どちらともいえない','あまり当てはまらない','当てはまらない'];
const answerValues=[2,1,0,-1,-2];
function go(id){if(id==='book')id='animalBook';document.body.dataset.page=id;document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');scrollTo(0,0);if(id==='quiz')startQuiz()}document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
function startQuiz(){idx=0;axes=[0,0,0,0];history=[];renderQ()}
function applyAnswer(questionIndex,answerIndex,direction=1){let q=questions[questionIndex];axes[q.axis]+=direction*answerValues[answerIndex]*q.dir}
function renderQ(){let q=questions[idx];progress.textContent=`${idx+1} / ${questions.length}`;qtext.textContent=q.text;answers.innerHTML='';answerLabels.forEach((t,n)=>{let b=document.createElement('button');b.textContent=t;b.onclick=()=>{applyAnswer(idx,n);history[idx]={answerIndex:n};idx++;idx<questions.length?renderQ():showResult()};answers.appendChild(b)});back.style.visibility=idx?'visible':'hidden'}
back.onclick=()=>{if(idx>0){idx--;let previous=history[idx];if(previous)applyAnswer(idx,previous.answerIndex,-1);history.length=idx;renderQ()}};
function showResult(){let bits=axes.map((value,i)=>value===0?(history.reduce((sum,item,index)=>sum+(index+1)*(item.answerIndex+1)*(i+2),0)%2?1:0):(value>0?1:0));let axisIndex=bits[0]*8+bits[1]*4+bits[2]*2+bits[3];let answerPattern=history.reduce((sum,item,index)=>sum+(index+3)*(item.answerIndex+1)*(5-item.answerIndex),0);let contrast=history.reduce((sum,item,index)=>{let next=history[(index+1)%history.length]||item;return sum+(index%4+1)*Math.abs(item.answerIndex-next.answerIndex)},0);let axisShape=axes.reduce((sum,value,index)=>sum+(value+8)*(index+5)*(index+7),0);let typeIndex=(axisIndex*5+answerPattern*7+contrast*3+axisShape)%types.length;let t=types[axisTypeMap[typeIndex]];resultImg.src=t.img;resultImg.alt=`診断結果 ${t.name}`;go('result')}
const books=['animal1.jpeg','animal2.jpeg','mystery1.jpeg','mystery2.jpeg'];function showBook(i){go(i<2?'animalBook':'mysteryBook')}window.showBook=showBook;
