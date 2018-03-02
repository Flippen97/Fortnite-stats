/*
    const weatherInfoElement = document.getElementById('FortniteDiv');
    let weatherInfo = `
    <p> ${weatherData.weather[0].description} </p>
    <p> ${weatherData.main.temp} </p>
    `;
    weatherInfoElement.insertAdjacentHTML('afterbegin', weatherInfo);
*/
var mykey = apiKey.MY_KEY;

function fetchStats(){
  fetch('https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/pc/ziper240', {
    headers: {
      'TRN-Api-Key': mykey
    }
  })
  .then(function(response){
    return response.json();
  })
  .then(function(fortniteData) {
    console.log(fortniteData);
    displayFortniteData(fortniteData);
  })
  .catch(function(error) {
      console.log(error);
  })
}

fetchStats();

function displayFortniteData(fortniteData){
 const displayFortniteInfo = document.getElementById('FortniteDiv');
    let FortniteInfo = `
    <p> ${fortniteData.epicUserHandle} </p>
    <p> ${fortniteData.lifeTimeStats[0].key} </p>
    `;
    displayFortniteInfo.insertAdjacentHTML('afterbegin', FortniteInfo);
};