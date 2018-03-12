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
            comparePLayerStats();
            console.log(bothPlayersArray);
        })
        .catch((error) => {
            if(error == "SyntaxError: Unexpected token < in JSON at position 0"){
                alert('faaan')
            }
            console.log(error);
        })
}

function listPlayersLifetimeStats(){
    const containerForPlayersLifetimeStats = 
          document.getElementById('containerForPlayersLifetimeStats');
    
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
    FortniteInfo += `
    <select id="sortByGamemode">
                <option value="p2">Solo</option>
                <option value="p9">Duo</option>
                <option value="p10">Squad</option>
                <option value="curr_p2">S3 Solo</option>
                <option value="curr_p9">S3 Duo</option>
                <option value="curr_p10">S3 Squad</option>
    </select>
    `;
    
    containerForPlayersLifetimeStats.innerHTML = FortniteInfo;
    
    document.getElementById('sortByGamemode').addEventListener('change', function() {
        this.selected = this.value;
        var gamemode = this.value;
        comparePLayerStats(gamemode);
    });
}

function comparePLayerStats(gameMode){
    const containerForComparePLayerStats = 
          document.getElementById('containerForComparePLayerStats');
        var player1 = '';
        var player2 = '';
    switch(gameMode) {
        case "p2":
            player1 = bothPlayersArray[0][0].stats.p2;
            player2 = bothPlayersArray[0][1].stats.p2;
        break;
        case "p9":
             player1 = bothPlayersArray[0][0].stats.p9;
             player2 = bothPlayersArray[0][1].stats.p9;
        break;
        case "p10":
             player1 = bothPlayersArray[0][0].stats.p10;
             player2 = bothPlayersArray[0][1].stats.p10;
        break;
        case "curr_p2":
             player1 = bothPlayersArray[0][0].stats.curr_p2;
             player2 = bothPlayersArray[0][1].stats.curr_p2;
        break;
        case "curr_p9":
             player1 = bothPlayersArray[0][0].stats.curr_p9;
             player2 = bothPlayersArray[0][1].stats.curr_p9;
        break;
        case "curr_p10":
             player1 = bothPlayersArray[0][0].stats.curr_p10;
             player2 = bothPlayersArray[0][1].stats.curr_p10;
        break;
        default:
            player1 = bothPlayersArray[0][0].stats.p2;
            player2 = bothPlayersArray[0][1].stats.p2;
    }
      
    let FortniteInfo = ``;
    FortniteInfo += `
        <div class="player1compare">
            <div class="wins">
                <p>${player1.top1.label}</p>
                <p>${player1.top1.displayValue}</p>
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player1.top1.percentile}%;"></div>
                </div>
            </div>
            <div class="winRatio">
                <p>${player1.winRatio.label}</p>
                <p>${player1.winRatio.displayValue}</p>
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player1.winRatio.percentile}%;"></div>
                </div>
            </div>
            <div class="kills">
                <p>${player1.kills.label}</p>
                <p>${player1.kills.displayValue}</p>
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player1.kills.percentile}%;"></div>
                </div>
            </div>
            <div class="kd">
                <p>${player1.kd.label}</p>
                <p>${player1.kd.displayValue}</p>
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player1.kd.percentile}%;"></div>
                </div>
            </div>
            <div class="minutesPlayed">
                <p>${player1.minutesPlayed.label}</p>
                <p>${player1.minutesPlayed.displayValue}</p>
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player1.minutesPlayed.percentile}%;"></div>
                </div>
            </div>
        </div>
    
        <div class="player2compare">
            <div class="wins">
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player2.top1.percentile}%;"></div>
                </div>
                <p>${player2.top1.label}</p>
                <p>${player2.top1.displayValue}</p>
            </div>
            <div class="winRatio">
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player2.winRatio.percentile}%;"></div>
                </div>
                <p>${player2.winRatio.label}</p>
                <p>${player2.winRatio.displayValue}</p>
            </div>
            <div class="kills">
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player2.kills.percentile}%;"></div>
                </div>
                <p>${player2.kills.label}</p>
                <p>${player2.kills.displayValue}</p>
            </div>
            <div class="kd">
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player2.kd.percentile}%;"></div>
                </div>
                <p>${player2.kd.label}</p>
                <p>${player2.kd.displayValue}</p>
            </div>
            <div class="minutesPlayed">
                <div class="progressbar">
                    <div class="progress" style="width: ${100 - +player2.minutesPlayed.percentile}%;"></div>
                </div>
                <p>${player2.minutesPlayed.label}</p>
                <p>${player2.minutesPlayed.displayValue}</p>
            </div>
        </div>
    `;
    
    containerForComparePLayerStats.innerHTML = FortniteInfo;
}

