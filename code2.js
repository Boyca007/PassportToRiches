//work list
    //bug - add prior reel to removed icon list
    //free spins
    //bonus
        //how to make sticky icons
    


const icons = [
    { name: "taxi", points: 0.50, key: 0 },
    { name: "train", points: .50, key: 1 },
    { name: "compass", points: .75, key: 2 },
    { name: "camera", points: 1, key: 3 },
    { name: "luggage", points: 1.25, key: 4 },
    { name: "map", points: 1.25, key: 5 },
    { name: "palmTree", points: 1.5, key: 6 },
    { name: "plane", points: 2, key: 7 },
    { name: "globe", points: 2.5, key: 8 },
    { name: "passport", points: 3, key: 9 },
    { name: "boardingPass", points: 5, key: 10 }];
const linePatterns = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,2,0,0],
    [0,2,2,2,0],
    [0,1,1,1,0],
    [0,1,0,1,0],
    [0,2,0,2,0],
    [0,2,1,2,0],
    [0,1,2,1,0],
    [1,1,1,1,1],
    [1,1,0,1,1],
    [1,1,2,1,1],
    [1,2,0,2,1],
    [1,2,2,2,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,2,1,2,1],
    [1,2,2,2,1],
    [1,0,0,0,1],
    [1,0,2,0,1],
    [2,2,2,2,2],
    [2,2,1,2,2],
    [2,0,2,0,2],
    [2,1,2,1,2],
    [2,0,1,0,2],
    [2,1,0,1,2],
    [2,2,0,2,2],
    [2,1,1,1,2],
    [2,0,0,0,2,]
]

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
    console.log(arrUnavailable);
    do {
        randomGeneratedNumber = Math.floor(Math.random() * max);
        console.log(randomGeneratedNumber);
        console.log(arrUnavailable.indexOf(randomGeneratedNumber))
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
function isTileCollision(pattern1,arr){
    for (var i = 0; i < arr.length; i++){
        for (var j = 0; j < pattern1.length; j++){
            if (pattern1[j] === arr[i][j]){
                return true;
            }
        }   
    }
    return false;
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
    winPatterns: [],
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
        this.winPatterns = [],
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
            this.totalWins++;
            this.lineHits = generateRandomNum(this.numLines) + 1; //adding 1 (0 hit is actually 1 hit)
            this.reelHits = generateRandomNum(this.numReels, [0,1]) + 1; //<-- must be at least 3, no points if we only matched 1 or 2 reels
            for (var i = 0; i < this.lineHits; i++) {
                this.winIconKeys.push(generateRandomNum(icons.length, this.winIconKeys));
            }

            
        } else if (outcome <=35) {//<-- 15%
            console.log("free spins");
            //free spins
            this.isWin = true;
            this.totalWins++;
            // this.numFreeSpins += generateRandomNum(11);

            //free spins icon looks different
                //"Your ticket to... FREE SPINS"    


        } else if (outcome <=40) {//<-- 5%  <-- higher if already won, up to max bonus = 0%
            console.log("bonus");
            //bonus
            this.isWin = true;
            this.totalWins++;

            //assign 3 passports
                //X number of free spins
                    //add first city to icon list
                        //city is sticky and acts as wild + multiplier for line
                        //once you get 3 more passports, city changes to next city + increase
                        //multiplier

            //have icons look different

        } else { //<-- 60%
            console.log("lose");
            //lose
            this.totalLosses;

        } 
    },
    placeTiles: function() {
        var pattern;
        var tile;
        //place winning tiles
        if (this.isWin) {
            for (var i = 0; i < this.lineHits; i++) {
                
                do {
                    pattern = linePatterns[generateRandomNum(linePatterns.length)];
                } while (isTileCollision(pattern,this.winPatterns))
                this.winPatterns.push(pattern);

                for (var j = 0; j < this.reelHits; j++){
                    tile = this.slotMachine.grid[j].tiles[pattern[j]];
                    tile.isWin = true;
                    tile.name = icons[this.winIconKeys[i]].name;
                }
                
            }
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
            this.winAmount += this.betAmount * this.reelHits * icons[this.winIconKeys[i]].points; 
        }
    }
};

var controller = {
    handleBet: function(){

        //reset
        model.reset();
        view.reset();

        //assign bet + take cash 
        model.updateCashBalance(model.betAmount*-1);
        view.showCashBalance();
        view.showWinAmount();

        //process bet
        do {
            model.generateOutcome();
            model.placeTiles();
            model.calculateWinnings();
            model.numFreeSpins -= 1;
            //view pause animation
        } while (model.numFreeSpins > 0);

        console.log(model.slotMachine.grid);

        //give winnings
        model.updateCashBalance(model.winAmount);

        //view animate
        view.animateGrid();

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
    numTilesDisplayed: 0,
    isAnimationFinished: false,
    reset: function(){
        this.numTilesDisplayed = 0,
        this.isAnimationFinished = false
    },
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
        this.numTilesDisplayed++;
        if (this.numTilesDisplayed === (model.numReels * model.numLines)) {
            this.isAnimationFinished = true;
            this.showWinAmount();
            this.showCashBalance();
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

window.onload = init;

