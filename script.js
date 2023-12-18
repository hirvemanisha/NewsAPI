const api_key="62d2540526fe4e3da22f1d92c180c63d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews('India'));

async function fetchNews(query){
  const res=await fetch(`${url}${query}&apiKey=${api_key}`) //serverse news fetch karata he fetch  //promis pe await karvaya
  const data= await res.json();        //jo bhi data milega convet it into json format
  console.log(data);
  bindData(data.articles);    // jo bhi article ayenge isame bind ho jayenge
}
function bindData (articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    

    cardsContainer.innerHTML="" ;       //pehele card emety karke new api call karne 

    articles.forEach(article=> {
        if(!article.urlToImage)return;    //agar url me image nahi aa raha he to return kar denge
        const cardClone=newsCardTemplate.content.cloneNode(true);   //ti meance card ke andar jitane bhi card he sare ke sare clone ho jane chahiye sif jo html me card dikh raha he o nahi
        fillDataInCard (cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDecs = cardClone.querySelector('#news-des');

    newsImg.src =article.urlToImage;
    newsTitle.innerHTML =article.title;
    newsDecs.innerHTML=article.description;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');

    })

}
const searchButton = document.getElementById("search_botton");
const searchText =document.getElementById("search_text");

searchButton.addEventListener("click",()=>{
    const query =searchText.value;
    fetchNews(query)
})
