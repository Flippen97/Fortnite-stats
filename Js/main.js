var mykey = apiKey.MY_KEY;

function fetchStats(){
  fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/pc/ziper240`, {
    headers: {
      'TRN-Api-Key': mykey
    }
  })
  .then((response) => response.json())
  .then((fortniteData) => {
    console.log(fortniteData);
    //displayFortniteData(fortniteData);
    displayFortnite(fortniteData);
  })
  .catch((error) => {
      console.log(error);
  })
}

fetchStats();

/*function displayFortniteData(fortniteData){
 const displayFortniteInfo = document.getElementById('FortniteDiv');
    let FortniteInfo = `
    <p> ${fortniteData.epicUserHandle} </p>
    `;
    displayFortniteInfo.innerHTML += FortniteInfo;
};*/

function displayFortnite(fortniteData){
 const displayFortnite = document.getElementById('FortniteDiv');
    const lifeTimeStats = fortniteData.lifeTimeStats
var FortniteInfo = `
    <p> ${fortniteData.epicUserHandle} </p>
    <div class="grid-container">
    `;
    for (i = 0; i < lifeTimeStats.length; i++) {
        FortniteInfo += `
        <div class="grid-item">
            <span> ${lifeTimeStats[i].key}</span><br>
            <span>${lifeTimeStats[i].value}</span>
        </div>`;
    }
    FortniteInfo += `</div>`;
        
    displayFortnite.innerHTML += FortniteInfo;
};