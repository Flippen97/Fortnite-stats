var url = `https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/`;
var mykey = apiKey.MY_KEY;
var person1Name = "ziper240";
var person1Platform = "pc";
var person2Name = "OlstedT";
var person2Platform = "pc";
var bothPlayersArray = [];

function fetchStats(){
    
  var comparePlayers = [];
    
  const player1 = fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/pc/ziper240`, {
    headers: { 'TRN-Api-Key': mykey }
  }).then((response) => response.json())
    
    comparePlayers.push(player1);
    
  const player2 = fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/pc/OlstedT`, {
    headers: { 'TRN-Api-Key': mykey }
  }).then((response) => response.json())
    
    comparePlayers.push(player2);

    Promise.all(comparePlayers)
        .then((bothPlayers) => {
            bothPlayersArray.push(bothPlayers);
            //function listPlayerStats();
            console.log(bothPlayersArray);
        })
}

fetchStats();

function displayPlayer1(fortniteData){
    
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
    console.log(compare);
};