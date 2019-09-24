const icons = [
    { name: "taxi", points: 1, key: 0 },
    { name: "train", points: 1, key: 1 },
    { name: "compass", points: 1, key: 2 },
    { name: "camera", points: 2, key: 3 },
    { name: "luggage", points: 2, key: 4 },
    { name: "map", points: 3, key: 5 },
    { name: "palmTree", points: 3, key: 6 },
    { name: "plane", points: 5, key: 7 },
    { name: "globe", points: 5, key: 8 },
    { name: "passport", points: 10, key: 9 },
    { name: "boardingPass", points: 25, key: 10 }];


function Reel(reelnum, numTiles) {
    this.reelnum = reelnum;
    isWin = false;
    this.tiles = [];

    for (var i = 0; i < numTiles; i++) {
        this.tiles.push({location: i, name: "", isWin: false});
    }

};

function SlotMachine(reel0, reel1, reel2, reel3, reel4, reel5, reel6, reel7, reel8, reel9) {
    this.grid = [];

    for (var i = 0; i < arguments.length; i++) {
        this.grid.push(arguments[i]);
    }
};

function generateRandomNum(max, arrUnavailable, skew) {
    
    var randomGeneratedNumber;
    if (arrUnavailable === undefined){
        arrUnavailable = [];
    }
    do {
        randomGeneratedNumber = Math.floor(Math.random() * max);
    } while (arrUnavailable.indexOf(randomGeneratedNumber) > -1); 

    return randomGeneratedNumber; 
};
function doubleLoop(maxField1, maxField2, func){
    for (var i = 0; i < maxField1; i++){
        for (var j = 0; j < maxField2; j++){
            func(i,j);
        }
    }
}

var model = {

    numReels: 5,
    numLines: 3,
    reel0: {},
    reel1: {},
    reel2: {},
    reel3: {},
    reel4: {},
    slotMachine: {},

    betAmount: 0.50,
    betIncrement: 0.5,
    cashBalance: 100,

    isWin: false,
    lineHits: 0,
    reelHits: 0,
    winIconKeys: [],
    winAmount: 0,
    totalWins: 0,
    totalLosses: 0,
    numFreeSpins: 0,
    
    reset: function () {
        doubleLoop(this.numReels, this.numLines, function(i,j){
            model.slotMachine.grid[i].tiles[j].name = "";
            model.slotMachine.grid[i].tiles[j].isWin = false;
        })
        this.isWin = false;
        this.lineHits = 0;
        this.reelHits = 0;
        this.winIconKeys = [];
        this.winAmount = 0;
        this.numFreeSpins = 0;

    },
    updateCashBalance: function (amountChange) {
        this.cashBalance += amountChange;
    },
    generateOutcome: function() {
        var outcome = generateRandomNum(100);
        console.log('outcome: ' + outcome);
        if (outcome <= 20) { //<-- 20%
            console.log("reel connect");
            //reel connect
            this.isWin = true;
            console.log('is win: ' + this.isWin);
            this.totalWins++;
            this.lineHits = generateRandomNum(this.numLines) + 1; //adding 1 (0 hit is actually 1 hit)
            console.log('lineHits: ' + this.lineHits);
            this.reelHits = generateRandomNum(this.numReels, [0,1,2]) + 1; //<-- must be at least 3, no points if we only matched 1 or 2 reels
            console.log('reelhits: ' + this.reelHits);
            for (var i = 0; i < this.lineHits; i++) {
                this.winIconKeys.push(generateRandomNum(icons.length, this.winIconKeys));
            }
            console.log('win Icon keys:');
            console.log(this.winIconKeys);

            //add wilds in later
            // var chanceForWilds = generateRandomNum(100);
            // if (chanceForWilds <= 25){

            // }
        } else if (outcome <=35) {//<-- 15%
            console.log("free spins");
            //free spins
            this.isWin = true;
            this.totalWins++;
            // this.numFreeSpins += generateRandomNum(11);

        } else if (outcome <=40) {//<-- 5%  <-- higher if already won, up to max bonus = 0%
            console.log("bonus");
            //bonus
            this.isWin = true;
            this.totalWins++;

        } else { //<-- 60%
            console.log("lose");
            //lose
            this.totalLosses;

        } 
    },
    placeTiles: function() {

        //place winning tiles
        if (this.isWin) {
            doubleLoop(this.reelHits, this.lineHits, function(i,j){
                var tiles = model.slotMachine.grid[i].tiles;
                var randomLine = 0;
                var flag = true;

                while (flag){ //loop until we find one that's not already taken
                    randomLine = generateRandomNum(model.numLines)
                    if (!tiles[randomLine].isWin) {
                        flag = false;
                        tiles[randomLine].isWin = true;
                        tiles[randomLine].name = icons[model.winIconKeys[j]].name;
                    }
                }
            })
        }

        //fill in grid with losing tiles
        doubleLoop(this.numReels, this.numLines, function(i,j){
            var tile = model.slotMachine.grid[i].tiles[j];
            if (!tile.isWin) {
                var randomIcon = icons[generateRandomNum(icons.length, model.winIconKeys)].name;
                tile.name = randomIcon;
                tile.isWin = false;
            }
        })
    },
    calculateWinnings: function() {
        for (var i = 0; i < this.lineHits; i++) {
            console.log('bet amount: ' + this.betAmount);
            console.log('reel hits:' + this.reelHits);
            console.log('points: ' + icons[this.winIconKeys[i]].points);
            this.winAmount += this.betAmount * this.reelHits * icons[this.winIconKeys[i]].points; 
            console.log('win amount:' + this.winAmount);
        }
    }
};

var controller = {
    handleBet: function(){

        //reset
        model.reset();

        //assign bet + take cash 
        model.updateCashBalance(model.betAmount*-1);

        //
        do {
            model.generateOutcome();
            model.placeTiles();
            model.calculateWinnings();
            model.numFreeSpins -= 1;
            console.log('numFreeSpins remaining: ' + model.numFreeSpins);
            //view pause animation
        } while (model.numFreeSpins > 0);

        console.log(model.slotMachine.grid);

        //give winnings
        model.updateCashBalance(model.winAmount);

        //view animate
        view.animateGrid();
        view.showCashBalance();
        view.showWinAmount();

        console.log("handleBet complete");
            
    },
    reduceBet: function(change){
        if (model.betAmount !== 0.5){
            model.betAmount -= model.betIncrement;
            view.showCurrentBet();
        }
    },
    increaseBet: function(){
        if (model.betAmount !== 3){
            model.betAmount += model.betIncrement;
            view.showCurrentBet();
        }
    },
    maxBet: function(){
        model.betAmount = 3;
        view.showCurrentBet();
    }

};

    

var view = {
    showCashBalance: function(){
        var cash = document.getElementById("cash")
        cash.innerHTML = "$" + model.cashBalance;
    },
    showWinAmount: function() {
        var win = document.getElementById("winAmount");
        win.innerHTML = "$" + model.winAmount;
        //if big win
    },
    showCurrentBet: function(){
        var bet = document.getElementById("currentBet");
        bet.innerHTML = "$" + model.betAmount;
    },
    displayGrid: function(){
        var tiles = document.getElementsByClassName("tile");
        var currReel = 0;
        var currLine = 0;
        for (var i = 0; i < tiles.length; i++){
            var tileIcon = model.slotMachine.grid[currReel].tiles[currLine].name
            tiles.item(i).setAttribute("class", "tile " + tileIcon);
            currReel++;
            if (currReel === (model.numReels)){
                currReel = 0;
                currLine++;
            }
        }
    },
    animateGrid: function(){
        var tiles = document.getElementsByClassName("tile");

        for (var i = 0; i < tiles.length; i++){
            this.fastTwitch(tiles.item(i));
        }
    },
    fastTwitch: function(item){
        var randTime = generateRandomNum(4) * 1000 + generateRandomNum(11) * 100;
        var x = setInterval(view.displayRandomTile,100,item)
        setTimeout(function() {
            clearInterval(x);
            view.slowTwitch(item);
        },randTime);
    },
    slowTwitch: function(item){
        var x = setInterval(view.displayRandomTile,250,item)
        setTimeout(function() {
            clearInterval(x);
            view.displayTile(item);
        },1000);
    },
    displayRandomTile: function(tile){
        var tileIcon = icons[generateRandomNum(icons.length)].name;
        tile.setAttribute("class", "tile " + tileIcon);
    },
    displayTile: function(tile) {
        var tileReel = tile.id.charAt(0);
        var tileLine = tile.id.charAt(1);
        var slotTile = model.slotMachine.grid[tileReel].tiles[tileLine]
        var tileIcon = slotTile.name
        
        if (slotTile.isWin) {
            tile.setAttribute("class", "tile " + tileIcon + " win");
        } else {
            tile.setAttribute("class", "tile " + tileIcon);
        }
    }   

}

function init(){
    
    model.reel0 = new Reel(0, model.numLines);
    model.reel1 = new Reel(1, model.numLines);
    model.reel2 = new Reel(2, model.numLines);
    model.reel3 = new Reel(3, model.numLines);
    model.reel4 = new Reel(4, model.numLines);

    model.slotMachine = new SlotMachine(model.reel0, model.reel1, model.reel2, model.reel3, model.reel4);

    //model.slotMachine = new SlotMachine(new Reel())

    //set up handlers
    var submitBet = document.getElementById("repeatBet");
    submitBet.onclick = controller.handleBet;
    var reduceBet = document.getElementById("reduceBet");
    reduceBet.onclick = controller.reduceBet;
    var increaseBet = document.getElementById("increaseBet");
    increaseBet.onclick = controller.increaseBet;
    var maxBet = document.getElementById("maxBet");
    maxBet.onclick = controller.maxBet;


}
window.addEventListener("load", function() {
    var f = document.getElementsByClassName('win');
    for (var x in wins) {
        setInterval()
    }
    
    //for (var x in wins) {
        // setInterval(function() {
        //     x.style.
        // x.style.display = (x.style.display == 'none' ? '' : 'none');
        // }, 500);
    //}

}, false);

window.onload = init;
