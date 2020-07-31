const results = document.getElementById('results');
const input = document.getElementById('main-input');
const searchbutton = document.getElementById('search-button');
const header = document.getElementById('the-header');
const outspan = document.getElementById('outspan');
let realarray;
let arr = [];

//hold array
const something = (thing)=>{
  realarray = [...thing]
  buttonit();
}

//get quotes put them into array, then into a function
axios.get( "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json")
    .then( response=>{
    response.data.map(item =>{
    arr.push(item)
      })
    something(arr)
    })
    .catch(err => console.log('something went wrong =>',err));

//after clicking the search button show header again
const backToSearch = ()=>{
  outspan.addEventListener('click', (e)=>{
     header.style.display = 'block';
      outspan.style.display = 'none';
    let items = results;
    if (results.childNodes.length > 0) {
		while (items.firstChild) {
			items.removeChild(items.firstChild);
		}
	}
  })
}

//allow search to happen when you hit enter
input.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    e.preventDefault();
    searchbutton.click();
  }
});

//when there is a matching search term show it
 const showresults = (realitem)=>{
        let divitem = document.createElement('div');
        divitem.classList = 'divexample divanimation2';
        let ptag = document.createElement('p');
        ptag.className = 'ptag';
        ptag.textContent = realitem.quote;
        let spantag = document.createElement('span')
        spantag.textContent = realitem.author;
        spantag.className = 'spantag';
        divitem.appendChild(ptag);
        divitem.appendChild(spantag);
        results.appendChild(divitem);
  }
 
 //when there are no results or nothing has been entered into input field use this
  const noresults = (entered)=>{
        let divitem = document.createElement('div');
        divitem.classList = 'divanimation4';
        let ptag = document.createElement('p');
        ptag.className = 'ptag';
        ptag.textContent = entered;
        let spantag = document.createElement('span')
        spantag.textContent = 'SR';
        spantag.className = 'spantag';
        divitem.appendChild(ptag);
        divitem.appendChild(spantag);
        results.appendChild(divitem);
  }
  
  
 //

const mistyped = ()=>{
  if(nomatch.length === 1){
    let divitem = document.createElement('div');
    divitem.classList = 'divanimation4';
    let ptag = document.createElement('p');
    ptag.className = 'ptag';
    ptag.textContent = `Please try again, no quote found for [${nomatch}]`;
    let spantag = document.createElement('span')
    spantag.textContent = 'SR';
    spantag.className = 'spantag';
    divitem.appendChild(ptag);
    divitem.appendChild(spantag);
    results.appendChild(divitem);
    
       input.value = '';
       backToSearch();
    }
}

const somefunction2 = ()=>{
   showresults(randomquote);
   input.value = '';
   backToSearch();
   randomarray=[];
}

////
   let randomquote;
   let randomarray = [];
   let noresultArray = [];
   let nomatch=[];
   
////
let thing;
const conditionalfunction = ()=>{

  if(randomquote){
    somefunction2()
    input.value = ''
    randomquote = ''
    backToSearch();
  }else if(thing === false){
    noresults(`no match found`)
    input.value = '';
    randomarray=[];
    backToSearch();;;;
   
  }
}


//when you click on the search button conduct search
 const buttonit = ()=>{
   searchbutton.addEventListener('click', ()=>{
     header.style.display = 'none';
     outspan.style.display = 'block';
      if(input.value !== '' || input.value.length !== 0){
        realarray.forEach(item=>{
        if(item.quote.includes(input.value)){
          randomarray.push(item);
          for(let i = 0; i < randomarray.length; i++){
              randomquote = randomarray[Math.floor(Math.random()* randomarray.length)];
            }
        thing = true;
        }else if(!item.quote.includes(input.value)){
            thing = false;
            randomarray = [];
          nomatch.push('nomatch');
            return thing
         }
       });
     conditionalfunction();
      }else if(input.value === '' && input.value.length === 0){
       noresults('Please enter a word into the search field')
       input.value = '';
       backToSearch();
     }
   });
}
 