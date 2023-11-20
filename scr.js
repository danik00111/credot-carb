const inpM = document.getElementById('date-m');
const inpY = document.getElementById('date-y');
const outM = document.getElementById('card-date-m');
const outY = document.getElementById('card-date-y');
const randInt = (min, max) => (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min));
const currentYear = parseInt(('' + (new Date).getFullYear()).slice(-2));
const currentMonth = (new Date).getMonth() + 1;
const yearRange = [currentYear, 30]; // edge values inclusive
const toggle = document.querySelector('#toggle');
const label = document.querySelector('.toggle');
let tog = true;
label.addEventListener('animationstart', () => {toggle.disabled = true;});
label.addEventListener('animationend', () => {toggle.disabled = false;});
const gen = () => {document.getElementById('card-num').innerHTML = `${('000' + randInt(0, 9999)).slice(-4)} ${('000' + randInt(0, 9999)).slice(-4)} ${('000' + randInt(0, 9999)).slice(-4)} ${('000' + randInt(0, 9999)).slice(-4)}`;}
gen();
outM.innerHTML = ('0' + ((new Date).getMonth() + 1)).slice(-2);
outY.innerHTML = ('0' + ((new Date).getYear() + 4)).slice(-2);
document.getElementById('date-tog').addEventListener('change', ()=>{
  if(document.getElementById('date-tog').checked) {
    inpM.disabled = false; inpY.disabled = false;
    outM.innerHTML = ((isNaN(parseInt(inpM.value) + 1)) ? 'NA' : ('0' + (parseInt(inpM.value)))).slice(-2);
    outY.innerHTML = ((isNaN(parseInt(inpY.value) + 1)) ? 'NA' : ('0' + (parseInt(inpY.value) + 4))).slice(-2);
    if((inpM.value == '') || !((parseInt(inpM.value)>=1)&&(parseInt(inpM.value)<=12))) inpM.classList.add('error');
    if((inpY.value == '') || !((parseInt(inpY.value)>=yearRange[0])&&(parseInt(inpY.value)<=yearRange[1]))) inpY.classList.add('error');
  } else {
    inpM.disabled = true; inpY.disabled = true;
    outM.innerHTML = ('0' + currentMonth).slice(-2);
    outY.innerHTML = ('0' + currentYear).slice(-2);
    inpM.classList.remove('error');
    inpY.classList.remove('error');
  }
});
inpM.addEventListener('input', ()=>{
  console.log('Here!m');
  if (!((parseInt((inpM.value))>=1)&&(parseInt((inpM.value))<=12))) {
    inpM.classList.add('error');
    outM.innerHTML='ER';
    return;
  }
  inpM.classList.remove('error');
  outM.innerHTML=((isNaN(parseInt(inpM.value)+1))?'NA':('0'+(parseInt(inpM.value)))).slice(-2);
});
inpY.addEventListener('input',()=>{
  console.log('Here!y\n', inpY.value);
  if (!((parseInt((inpY.value))>=yearRange[0])&&(parseInt((inpY.value))<=yearRange[1]))) {
    inpY.classList.add('error');
    outY.innerHTML='ER';
    return;
  }
  inpY.classList.remove('error');
  outY.innerHTML=((isNaN(parseInt(inpY.value)+1))?'NA':('0'+(parseInt(inpY.value)+4))).slice(-2);
});
document.getElementById('full-name').addEventListener('input',()=>{
  document.getElementById('full-name').classList.remove('error');
  if (!(document.getElementById('full-name').value).match(/^[a-zA-Z]+\s[a-zA-Z]+$/)) {
    document.getElementById('full-name').classList.add('error');
  }
})