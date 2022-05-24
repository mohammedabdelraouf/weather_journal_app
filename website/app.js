/* Global Variables */
const baseUrl= "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey= "&appid=7ec4c316059f3c90db567fa1a4877ea6";
let currentUrl="";
let postalCode ;
let userFeeling;
let currentData;
//let index ;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//
document.querySelector('#generate').addEventListener("click" , appAction);

function appAction() {
  postalCode = document.querySelector("#zip").value;
  userFeeling = document.querySelector("#feelings").value;
  currentUrl = baseUrl+postalCode+apiKey ;
  getDataFromApi(currentUrl).then(function(data){ console.log(`currentData is : ${data}`);
   postOnServer('/add' , {  temperature : data.list[0].main.temp-273.15/*to calculate Celsius equivalence */ ,
    date :data.list[0].dt_txt , city : data.city.name, feeling: userFeeling ,});
   }).then(showResultForUser());
  
}


// Get the data we need from api

const getDataFromApi = async (url) => {
  const res = await fetch(url) ;
  try {

    const data = await res.json();
    console.log(data);
    return data;
  }  catch(error) {
    console.log("error", error);
    
  }
  
}

// post data on server to use it later
const postOnServer = async ( url='', data={})=>{
  const request = await fetch(url , {
      method:'POST',
      credentials:'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     body:JSON.stringify(data)  // body data type must match "Content-Type" header
    });
  
  try {
      const newEntry = await request.json();
      return newEntry ;
  } catch(e) {
    console.log(e);
  }

}
// use the data on server and update the user interface 
 const showResultForUser = async ()=> {
  const response = await fetch('/all');
  try {
   const update = await response.json() ;
    document.querySelector("#city").innerText= ` city : ${update.city} ` ;
    document.querySelector("#date").innerText= ` date : ${update.date} ` ;
    document.querySelector("#temp").innerText= ` temp : ${update.temperature}  Cْ ` ;
    document.querySelector("#content").innerText= ` feeling : ${update.feelings} ` ;
  } catch(e) {
    alert(e);
  }

  
}