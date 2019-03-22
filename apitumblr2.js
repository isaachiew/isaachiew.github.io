//query form
const form  = document.getElementById('query-form');

//input text field
const query  = document.getElementById('query');

//append to list data 
const list  = document.getElementById('list-data');

// list of keywords to guess from
const keywords = ['food', 'drink', 'malaysia', 'phone', 'android', 'hamster', 'puppy','kitten','beer'];


//onload
let answerText = getGuessButton();
getDefaultPhotos(answerText);


function getGuessButton(){
    
    const btnList = document.getElementById('btn-list');
    let answer = "";

    for(let i = 0; i < 4; i++){
        const randomNo = Math.floor(Math.random() * keywords.length); 
        
        guessBtnName = keywords[randomNo];
        // set answer
        answer = guessBtnName;

        const guessBtn = document.createElement('button');
        guessBtn.innerHTML = guessBtnName;
        //guessBtn.setAttribute('onclick','getUserClickedBtn()')
        btnList.appendChild(guessBtn);    
        
        guessBtn.onclick = getUserClickedBtn    // refer to getUserClickedBtn but not calling that function to run
    }

    return answer; 
}

function getDefaultPhotos(answer){
    fetch('https://api.tumblr.com/v2/tagged?tag='+answer+'&api_key=en5gTK8zwatHe1uNeupgf7PyXyyCOzVgEBrtQCfda4pcrYXpBC')
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        //clear list 
        list.innerHTML = '';

        const items = result.response;
        
        for(let i = 0; i < items.length; i++){
            const item = items[i];

            //check if item.photos[0] is undefined
            if(item.photos != undefined){
                const altSizes = item.photos[0].alt_sizes;
                const imgSrc = altSizes[altSizes.length - 2].url;
                const imgTimestmp = timestmpToDate(item.timestamp);

                const img = document.createElement('img');
                img.src = imgSrc;

                const caption = document.createElement('p');
                caption.innerHTML = imgTimestmp;

                const li = document.createElement('li');
    
                list.appendChild(li);
                li.appendChild(img);
            }

        }
    })
}

function getUserClickedBtn(event){
    const clickBtnText = event.target.innerHTML;

    if(clickBtnText == answerText){ 
        alert("YAY YOU GOT IT RIGHT!!!!");
}
    else{
        alert("Wrong answer!!!!");
}

    window.location.reload();
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
form.onsubmit = function(event){
    event.preventDefault();

    //get value from input field
    const queryText = query.value;

    getTaggedPhotos(queryText);
}
*/

//convert timestamp to readable Time(Except Date)
function timestmpToDate(t){
    var dt = new Date(t*1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
}

function getTaggedPhotos(queryInput){
    fetch('https://api.tumblr.com/v2/tagged?tag='+queryInput+'&api_key=en5gTK8zwatHe1uNeupgf7PyXyyCOzVgEBrtQCfda4pcrYXpBC')
        .then(function(response){
            return response.json();
        }).then(function(result){

            //clear list 
            list.innerHTML = '';

            const items = result.response;
            
            for(let i = 0; i < items.length; i++){
                const item = items[i];
    
                //check if item.photos[0] is undefined
                if(item.photos != undefined){
                    const altSizes = item.photos[0].alt_sizes;
                    const imgSrc = altSizes[altSizes.length - 2].url;
                    const imgTimestmp = timestmpToDate(item.timestamp);

                    const img = document.createElement('img');
                    img.src = imgSrc;

                    const caption = document.createElement('p');
                    caption.innerHTML = imgTimestmp;

                    const li = document.createElement('li');
        
                    list.appendChild(li);
                    li.appendChild(img);
                    //li.appendChild(caption);
                }
    
            }
        }).catch(function(err){
            console.log(err);
        })
}


