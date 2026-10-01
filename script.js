const status = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const red = document.getElementById("bloodRed");
const blue = document.getElementById("bloodBlue");

const info = {
  cor: "<b>Cor:</b> múscul que impulsa la sang. Té quatre cavitats: dues aurícules i dos ventricles.",
  pulmons: "<b>Pulmons:</b> aquí la sang incorpora oxigen i allibera diòxid de carboni.",
  cos: "<b>Cos:</b> les cèl·lules reben oxigen i nutrients i hi deixen residus com el diòxid de carboni.",
  arteries: "<b>Artèries:</b> vasos sanguinis que porten la sang des del cor cap als teixits.",
  veins: "<b>Venes:</b> vasos sanguinis que retornen la sang cap al cor.",
  capillaries: "<b>Capil·lars:</b> vasos molt fins que connecten artèries i venes i permeten l'intercanvi de substàncies."
};

document.querySelectorAll("[data-info]").forEach(el => {
  el.addEventListener("click", () => {
    status.innerHTML = info[el.dataset.info] || "";
  });
});

function move(el, points, color, label){
  el.style.color = color;
  el.style.opacity = "1";
  let i=0;
  function step(){
    if(i>=points.length){ el.style.opacity="0"; return; }
    el.style.left = points[i][0]+"%";
    el.style.top = points[i][1]+"%";
    i++; setTimeout(step, 650);
  }
  step();
}

startBtn.addEventListener("click", ()=>{
  startBtn.disabled=true;
  status.innerHTML="<b>🔴 La sang surt del cor...</b> Porta oxigen cap al cos.";
  move(red, [[47,32],[62,25],[75,30],[82,45],[70,58],[55,62]], "#e74c3c");
  setTimeout(()=>{
    status.innerHTML="<b>🔵 La sang torna cap al cor...</b> Ara porta poc oxigen i més diòxid de carboni.";
    move(blue, [[55,67],[68,72],[80,67],[78,48],[62,35],[48,32]], "#2878d4");
  },4500);
  setTimeout(()=>{
    status.innerHTML="<b>🫁 La sang arriba als pulmons!</b> Deixa CO₂, agafa oxigen i torna a començar el circuit.";
    startBtn.disabled=false;
  },9000);
});

const questions = [
 {q:"Quin òrgan impulsa la sang?", a:["Els pulmons","El cor","Els capil·lars"], c:1},
 {q:"Quins vasos porten la sang des del cor cap al cos?", a:["Les artèries","Les venes","Els capil·lars"], c:0},
 {q:"On incorpora oxigen la sang?", a:["Als pulmons","A les venes","A l'estómac"], c:0},
 {q:"Quins vasos retornen la sang cap al cor?", a:["Les artèries","Les venes","Els bronquis"], c:1},
 {q:"Què passa als capil·lars?", a:["La sang es fabrica","Es produeix l'intercanvi de substàncies","El cor deixa de bategar"], c:1}
];

const quiz = document.getElementById("quiz");
questions.forEach((x,i)=>{
  const div=document.createElement("div");
  div.className="question";
  div.innerHTML=`<p>${i+1}. ${x.q}</p>`+
    x.a.map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${a}</label>`).join("");
  quiz.appendChild(div);
});
document.getElementById("checkBtn").addEventListener("click",()=>{
  let score=0;
  questions.forEach((x,i)=>{
    const chosen=document.querySelector(`input[name="q${i}"]:checked`);
    if(chosen && Number(chosen.value)===x.c) score++;
  });
  const box=document.getElementById("score");
  box.textContent=`Resultat: ${score}/${questions.length} encerts.`;
  box.style.color=score===questions.length ? "#16803c" : "#243447";
});
