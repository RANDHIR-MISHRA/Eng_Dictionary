let input=document.querySelector('#input');
let searchbtn=document.querySelector('#search');
let apikey='16be8eb2-f309-4948-b668-0742d8b0b41d';
let notfound=document.querySelector('.not_found');
let defbox=document.querySelector('.def');
let audiobox=document.querySelector('.audio');
let loading=document.querySelector('.loading');

searchbtn.addEventListener('click',function(e){
    e.preventDefault();
   // clear data
   audiobox.innerHTML='';
   notfound.innerText='';
   defbox.innerText='';
    //get input data
  let word =input.value;
    //call API get data
if(word===''){
alert('word is required');
return;
}
getData(word);


})


async function getData(word){
    loading.style.display='block';
    //api
 const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)
 const data=await response.json();

//if empty res
 if(!data.length){
    loading.style.display='none';
    notfound.innerText='No result Found';
    return;
 }
  //if res is suggestion
  if(typeof data[0]==='string'){
    loading.style.display='none';
      let heading=document.createElement('h3');
      heading.innerText='Did you mean ?';
      notfound.appendChild(heading);
      data.forEach(element => {
        let suggestions=document.createElement('span');
        suggestions.classList.add('suggested');
        suggestions.innerText=element;
        notfound.appendChild(suggestions);
      })
      return;
  }
//if result found
loading.style.display='none';
let defination=data[0].shortdef[0];
defbox.innerText=defination;
//sound
const soundName=data[0].hwi.prs[0].sound.audio;
if(soundName){
    rendersound(soundName);
}

console.log(data);
}

function rendersound(soundName){
    //https://media.merriam-webster.com/soundc11
    let subfolder=soundName.charAt(0);
    let soundsrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;

    let aud=document.createElement('audio');
    aud.src=soundsrc;
    aud.controls=true;
    audiobox.appendChild(aud);
}
