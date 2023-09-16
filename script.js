//const apiKey="2ebe9eb7";
const baseUrl=`https://www.omdbapi.com/`;

const Key = document.getElementById('key');
const searchTerm = document.getElementById('searchinput');
const searchbtn=document.getElementById('search');
const loader = document.getElementById('loader');



// ***********************loader 
let loaderDisplayStartTime; 

function showLoader() {
    loader.style.display = "block";
    loaderDisplayStartTime = Date.now(); 
}

function hideLoader() {
    const timePassed = Date.now() - loaderDisplayStartTime;  
    const remainingTime = 3000 - timePassed;  

    if (remainingTime <= 0) {
        loader.style.display = "none"; 
    } else {
        setTimeout(() => { loader.style.display = "none"; }, remainingTime);  
    }
}



//   our INput
searchbtn.addEventListener("click",() =>{
    let searchinput=searchTerm.value;
    let apiKey=Key.value.trim();
    if(searchinput==""){
        alert("Enter Movie Name");
        return;
    }
    if(apiKey==""){
      alert('Please provide an API key.');
      return;
    }
    showLoader();
    getsearchresult(searchinput,apiKey);
});

async function getsearchresult(searchinput,apiKey){
    let url=`${baseUrl}?s=${searchinput}&apikey=${apiKey}`;{
        try{
            const response=await fetch(url);
            const result=await response.json();
           
            if (result.Response === "False"){
                return;
            }
            console.log(result);
            addDataToUi(result);
        } catch (error){
            
            console.error('Failed to fetch and render videos:', error);
        }finally {
         
            hideLoader();
        }
    }
}

function addDataToUi(data){
 const container=document.getElementById('films');
 container.innerHTML = '';
 if (data.Search && data.Search.length > 0) {
    let movieNumber = 1;
    
     data.Search.forEach(movie => {
        const posterImage = (movie.Poster !== "N/A") ? movie.Poster : 'path_to_default_placeholder_image.jpg';
        const card=document.createElement("div");
        card.className="card";
        card.innerHTML=`
        <div class="mov-det">
            <p>${movie.Type}</p>
            <p>${movie.year}</p>
        </div>

        <div class="img">
            <img class="img" src="${posterImage}" alt="${movie.Title}" />
        </div>
        
        <div class="name-num">
            <p>${movieNumber}</p>
            <h4>${movie.Title}</h4>
        </div>  
        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
        `;
        container.appendChild(card);
        movieNumber++; 
     });
 }else {
        container.innerHTML = '<p>No results found.</p>';
    }
}





