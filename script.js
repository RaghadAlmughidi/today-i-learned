// category Array color
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

//global variable decleration
 const btnOpen = document.querySelector('.btn-open');
 const form = document.querySelector('.fact-form');
 const factsList = document.querySelector(".facts-list");

 factsList.innerHTML="";


//load database from subabase
loadFacts();
async function loadFacts(){
  //always use await with prommises
  //fetch data from api of subabase DB
  const res = await fetch("https://psdsehqmncbohcosdcqz.supabase.co/rest/v1/facts",{
  headers:{
    apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZHNlaHFtbmNib2hjb3NkY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNjQxNjYsImV4cCI6MTk5MjY0MDE2Nn0.wzLCVZexdF-8DlldJXuQABHgsE_UuMuZ9xzooGkS_rQ",
    authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZHNlaHFtbmNib2hjb3NkY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNjQxNjYsImV4cCI6MTk5MjY0MDE2Nn0.wzLCVZexdF-8DlldJXuQABHgsE_UuMuZ9xzooGkS_rQ"
  },
})
//convert that data comes from subabase to json 
const dataJson= await res.json();
//use the display function
 createFactsList(dataJson);
}



//display the list in html
//it is indpendent function
//to deg=finde deffrent color for categore i use find() then combaer current fact category with CATEGORIES array color name
 function createFactsList(dataArray){
   const listOfFacts= dataArray.map(
  (fact)=> `<li class="fact">
  <p>
     ${fact.text}
      <a class="source"${fact.source}" target="_blank">(Source)</a>
  </p>

  <span class="tag" style="background-color: ${CATEGORIES.find((cat)=>cat.name === fact.category).color}">${fact.category}</span>
  <div class="vote-buttons">
      <button>👍 ${fact.votesInteresting}</button>
      <button>🤯 ${fact.votesMindblowing}</button>
      <button>⛔️ ${fact.votesFalse}</button>
  </div>
</li> `);
//join all li element
const factsArr = listOfFacts.join("");
//to display last fact comes at the top of the list
factsList.insertAdjacentHTML('afterbegin',factsArr)
 };



//toogle btn for form visibility

 btnOpen.addEventListener("click",()=>{
   
    if(form.classList.contains("hedden")){
        form.classList.remove("hedden")
        btnOpen.textContent="close"
    }else{
        form.classList.add("hedden")
        btnOpen.textContent="share a fact"
    }
 })

