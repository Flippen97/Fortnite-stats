var url = `https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/`;
var mykey = apiKey.MY_KEY;
var bothPlayersArray = [];

document.getElementById('compareButton').addEventListener('click', getTwoPlayersAndURL);

function getTwoPlayersAndURL(){
    
    const player1Name = document.getElementById('player1Name').value;
    const player1Platform = document.getElementById("player1Platform").value;
    const player1URL = `${url}${player1Platform}/${player1Name}`;
    
    const player2Name = document.getElementById('player2Name').value;
    const player2Platform = document.getElementById("player2Platform").value;
    const player2URL = `${url}${player2Platform}/${player2Name}`;   
    
    fetchStats(player1URL, player2URL)
}

function fetchStats(player1URL, player2URL) {
    
    var comparePlayers = [];

    const player1 = fetch(player1URL, {
        headers: {'TRN-Api-Key': mykey}
    }).then((response) => response.json())

    comparePlayers.push(player1);

    const player2 = fetch(player2URL, {
        headers: {'TRN-Api-Key': mykey }
    }).then((response) => response.json())

    comparePlayers.push(player2);

    Promise.all(comparePlayers)
        .then((bothPlayers) => {
            bothPlayersArray.push(bothPlayers);
            listPlayersLifetimeStats();
            console.log(bothPlayersArray);
        })
}

function listPlayersLifetimeStats(){

    const listOfPlayersLifetimeStats = 
          document.getElementById('listOfPlayersLifetimeStats');
    const player1 = bothPlayersArray[0][0];
    const player2 = bothPlayersArray[0][1];
    console.log(player1);
    console.log(player2);
    
    var FortniteInfo = `

    `;
    
    listOfPlayersLifetimeStats.innerHTML += FortniteInfo;
}


/*
function displayPlayer1(fortniteData) {

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
};*/
