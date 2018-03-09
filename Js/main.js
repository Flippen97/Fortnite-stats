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
            bothPlayersArray.length = 0;
            bothPlayersArray.push(bothPlayers);
            listPlayersLifetimeStats();
            console.log(bothPlayersArray);
        })
}

function listPlayersLifetimeStats(){

    const listOfPlayersLifetimeStats = 
          document.getElementById('listOfPlayersLifetimeStats');
    const player = bothPlayersArray[0];
    
    function sumTop3_10(player){
        sum = +player.lifeTimeStats[0].value 
            + +player.lifeTimeStats[1].value 
            + +player.lifeTimeStats[2].value;
        return sum;
    }
    
    function sumTop6_25(player){
        sum = +player.lifeTimeStats[3].value 
            + +player.lifeTimeStats[4].value 
            + +player.lifeTimeStats[5].value;
        return sum;
    }
    
    let FortniteInfo = '';
    for (i = 0; i < player.length; i++) {
    FortniteInfo += `
        <div class="player${[i + 1]}">
            <div class="nameAndPlatform">
                <span class="name">${player[i].epicUserHandle}</span>
                <span class="platform">${player[i].platformNameLong}</span>
            </div>
            <div class="lifetimePlacing">
                <div class="lifetimeWins">
                    <p>${player[i].lifeTimeStats[8].value}</p>
                    <p>${player[i].lifeTimeStats[8].key}</p>
                </div>
                <div class="lifetimeTop3-10">
                    <p>${sumTop3_10(player[i])}</p>
                    <p>Top3/5/10</p>
                </div>
                <div class="lifetimeTop6-25">
                    <p>${sumTop6_25(player[i])}</p>
                    <p>Top6/12/25</p>
                </div>      
            </div>
            <div class="lifetimeStats">
                <p>${player[i].lifeTimeStats[6].key}:</p><p>${player[i].lifeTimeStats[6].value}</p>
                <p>${player[i].lifeTimeStats[7].key}:</p><p>${player[i].lifeTimeStats[7].value}</p>
                <p>${player[i].lifeTimeStats[9].key}:</p><p>${player[i].lifeTimeStats[9].value}</p>
                <p>${player[i].lifeTimeStats[10].key}:</p><p>${player[i].lifeTimeStats[10].value}</p>
                <p>${player[i].lifeTimeStats[11].key}:</p><p>${player[i].lifeTimeStats[11].value}</p>
                <p>${player[i].lifeTimeStats[13].key}:</p><p>${player[i].lifeTimeStats[13].value}</p>
            </div>   
        </div>
    `;
    }
    listOfPlayersLifetimeStats.innerHTML = FortniteInfo;
}

function comparePLayerStats(GameMode){
    
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
