const inpD = document.getElementById('date-d');
const inpM = document.getElementById('date-m');
const inpY = document.getElementById('date-y');
const outM = document.getElementById('card-date-m');
const outY = document.getElementById('card-date-y');
const inpN = document.getElementById('full-name');
const outN = document.getElementById('card-name');
const randInt = (min, max) => (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min));
const currentYear = parseInt(('' + (new Date).getFullYear()).slice(-2));
const currentMonth = (new Date).getMonth() + 1;
const currentDay = (new Date).getDate();
const yearRange = [currentYear, 30]; // edge values inclusive
const toggle = document.querySelector('#toggle');
const label = document.querySelector('.toggle');
let lastClickTime = 0;
const timeoutDisable=()=>{
  if((Date.now()-lastClickTime) < 525) return; // hardocded animation length + 25ms of just-in-case
  lastClickTime = Date.now();
  toggle.checked = !toggle.checked;
};
const gen=()=>{document.getElementById('card-num').innerHTML = `${('000' + randInt(0,9999)).slice(-4)} ${('000' + randInt(0,9999)).slice(-4)} ${('000' + randInt(0,9999)).slice(-4)} ${('000' + randInt(0,9999)).slice(-4)}`};
const gencvv=()=>{document.getElementById('cvv').innerHTML=('00'+randInt(0,999)).slice(-3)};
gen();gencvv();
outM.innerHTML = ('0' + ((new Date).getMonth() + 1)).slice(-2);
outY.innerHTML = ('0' + ((new Date).getYear() + 4)).slice(-2);
document.getElementById('date-tog').addEventListener('change', ()=>{
  inpM.disabled=!inpM.disabled;inpY.disabled=!inpY.disabled;inpD.disabled=!inpD.disabled;
  if(document.getElementById('date-tog').checked) {
    outM.innerHTML=((isNaN(parseInt(inpM.value)+1))?'NA':('0'+(parseInt(inpM.value)))).slice(-2);
    outY.innerHTML=((isNaN(parseInt(inpY.value)+1))?'NA':('0'+(parseInt(inpY.value)+4))).slice(-2);
    if((inpD.value == '') || !((parseInt(inpD.value)>=1)&&(parseInt(inpD.value)<=31))) inpD.classList.add('error');
    if((inpM.value == '') || !((parseInt(inpM.value)>=1)&&(parseInt(inpM.value)<=12))) inpM.classList.add('error');
    if((inpY.value == '') || !((parseInt(inpY.value)>=yearRange[0])&&(parseInt(inpY.value)<=yearRange[1]))) inpY.classList.add('error');
    edgeCasePastCheck();
    if(inpY.value>(currentYear+10)){inpY.classList.add('error');document.querySelector('notice.future').classList.add('shown')};
  } else {
    outM.innerHTML = ('0' + currentMonth).slice(-2);
    outY.innerHTML = parseInt(('0' + currentYear).slice(-2))+4;
    inpD.classList.remove('error');
    inpM.classList.remove('error');
    inpY.classList.remove('error');
    document.querySelector('notice.past').classList.remove('shown');
  }
});
const days = [-Infinity,31,28,31,30,31,30,31,31,30,31,30,31]; // one-indexing the array because yes
const edgeCasePastCheck=()=>{
  document.querySelector('notice.past').classList.remove('shown');
  if(((inpY.value<=currentYear)&&(((inpM.value<=currentMonth)&&(inpD.value<currentDay))||(inpM.value<currentMonth)))||(inpY.value<currentYear)){
    document.querySelector('notice.past').classList.add('shown'); return false;
  } return true;
};
const edgeCaseLeapCheck=()=>{if(inpD.value!=29)return;console.log('Ran!');
  console.log((inpY.value), parseInt(inpY.value)%4);
  if((parseInt(inpY.value)%4)===0){inpD.classList.remove('error');return}
  else if((inpM.value=='2')||(inpM.value=='02')){inpD.classList.add('error');return}
  else inpD.classList.remove('error');
};
inpD.addEventListener('input', ()=>{
  edgeCasePastCheck(); edgeCaseLeapCheck();
  // if(((inpM.value=='2')||(inpM.value=='02'))&&(inpD.value==29)){inpD.classList.remove('error')};
  inpD.classList.remove('error');
  if((inpD.value<1)||(inpD.value>31))inpD.classList.add('error');
  if(!(inpM.classList.contains('error'))&&(inpD.value>days[inpM.value]))inpD.classList.add('error');
});
inpM.addEventListener('input', ()=>{
  edgeCasePastCheck(); edgeCaseLeapCheck();
  inpD.classList.remove('error');
  if((inpD.value<1)||(inpD.value>31))inpD.classList.add('error');
  if(!(inpM.classList.contains('error'))&&(inpD.value>days[inpM.value]))inpD.classList.add('error');
  inpM.classList.remove('error');
  if((inpM.value<1)||(inpM.value>12)){inpM.classList.add('error');outM.innerHTML='ER';return};
  outM.innerHTML=((isNaN(parseInt(inpM.value)+1))?'NA':('0'+(parseInt(inpM.value)))).slice(-2);
});
inpY.addEventListener('input',()=>{
  edgeCasePastCheck(); edgeCaseLeapCheck();
  inpY.classList.remove('error');
  document.querySelector('notice.future').classList.remove('shown');
  if(inpY.value<(currentYear))inpY.classList.add('error');
  if(inpY.value>(currentYear+10)){inpY.classList.add('error');document.querySelector('notice.future').classList.add('shown')};
  outY.innerHTML=((isNaN(parseInt(inpY.value)+1))?'NA':('0'+(parseInt(inpY.value)+4))).slice(-2);
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
const showModal=()=>{
  document.querySelector('modal').invisible = !document.querySelector('modal').invisible;
}