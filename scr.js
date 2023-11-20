const inpM = document.getElementById('date-m');
const inpY = document.getElementById('date-y');
const outM = document.getElementById('card-date-m');
const outY = document.getElementById('card-date-y');
const inpN = document.getElementById('full-name');
const outN = document.getElementById('card-name');
const randInt = (min, max) => (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min));
const currentYear = parseInt(('' + (new Date).getFullYear()).slice(-2));
const currentMonth = (new Date).getMonth() + 1;
const yearRange = [currentYear, 30]; // edge values inclusive
const toggle = document.querySelector('#toggle');
const label = document.querySelector('.toggle');
let lastClickTime = 0;
const timeoutDisable=()=>{
  if((Date.now()-lastClickTime) < 500) return; // hardocded 500ms cuz thats the animation length
  lastClickTime = Date.now();
  toggle.checked = !toggle.checked;
};
const gen=()=>{
  document.getElementById('card-num').innerHTML = `${('000' + randInt(0,9999)).slice(-4)} ${('000' + randInt(0,9999)).slice(-4)} ${('000' + randInt(0,9999)).slice(-4)} ${('000' + randInt(0,9999)).slice(-4)}`;}
gen();
outM.innerHTML = ('0' + ((new Date).getMonth() + 1)).slice(-2);
outY.innerHTML = ('0' + ((new Date).getYear() + 4)).slice(-2);
document.getElementById('date-tog').addEventListener('change', ()=>{
  inpM.disabled=!inpM.disabled;inpY.disabled=!inpY.disabled;
  if(document.getElementById('date-tog').checked) {
    outM.innerHTML=((isNaN(parseInt(inpM.value)+1))?'NA':('0'+(parseInt(inpM.value)))).slice(-2);
    outY.innerHTML=((isNaN(parseInt(inpY.value)+1))?'NA':('0'+(parseInt(inpY.value)+4))).slice(-2);
    if((inpM.value == '') || !((parseInt(inpM.value)>=1)&&(parseInt(inpM.value)<=12))) inpM.classList.add('error');
    if((inpY.value == '') || !((parseInt(inpY.value)>=yearRange[0])&&(parseInt(inpY.value)<=yearRange[1]))) inpY.classList.add('error');
  } else {
    outM.innerHTML = ('0' + currentMonth).slice(-2);
    outY.innerHTML = parseInt(('0' + currentYear).slice(-2))+4;
    inpM.classList.remove('error');
    inpY.classList.remove('error');
  }
});
const edgeCaseCheck=()=>{

}
inpM.addEventListener('input', ()=>{
  if (!((parseInt((inpM.value))>=1)&&(parseInt((inpM.value))<=12))){inpM.classList.add('error');outM.innerHTML='ER';return;}
  inpM.classList.remove('error');
  outM.innerHTML=((isNaN(parseInt(inpM.value)+1))?'NA':('0'+(parseInt(inpM.value)))).slice(-2);
  edgeCaseCheck();
});
inpY.addEventListener('input',()=>{
  if (!((parseInt((inpY.value))>=yearRange[0])&&(parseInt((inpY.value))<=yearRange[1]))){inpY.classList.add('error');outY.innerHTML='ER';return;}
  inpY.classList.remove('error');
  outY.innerHTML=((isNaN(parseInt(inpY.value)+1))?'NA':('0'+(parseInt(inpY.value)+4))).slice(-2);
  edgeCaseCheck();
});
inpN.addEventListener('input',()=>{
  inpN.classList.remove('error');
  outN.classList.remove('placeholder');
  if(inpN.value===''){outN.classList.add('placeholder')};
  document.querySelector('notice.invalid').classList.remove('shown');
  if(!(inpN.value).match(/^[a-zA-Z]+\s[a-zA-Z]+$/)) {
    inpN.classList.add('error');
    document.querySelector('notice.invalid').classList.add('shown');
  };
  outN.innerHTML = inpN.value.slice(0,26);
  document.querySelector('notice.overflow').classList.remove('shown');
  outN.classList.remove('ellipsis');
  if(inpN.value.length>26){
    outN.classList.add('ellipsis');
    document.querySelector('notice.overflow').classList.add('shown');
    inpN.classList.add('error');
  };
});