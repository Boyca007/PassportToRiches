const betOptions = [.25, .5, .75, 1, 1.5, 2, 2.5, 3];
const icons = [
    { name: "taxi", points: 2, key: 0 },
    { name: "train", points: 2, key: 1 },
    { name: "compass", points: 2, key: 2 },
    { name: "camera", points: 3, key: 3 },
    { name: "luggage", points: 3, key: 4 },
    { name: "map", points: 5, key: 5 },
    { name: "palmTree", points: 5, key: 6 },
    { name: "plane", points: 10, key: 7 },
    { name: "globe", points: 10, key: 8 },
    { name: "passport", points: 20, key: 9 },
    { name: "boardingPass", points: 50, key: 10 }];

function lookupIconNameFromKey(key) {
    for (var i = 0; i < icons.length; i++) {
        if (icons[i].key === key) {
            return icons[i].name;
        }
    }
};
function Reel(reelnum, numTiles) {//tile1, tile2, tile3) {
    this.reelnum = reelnum;
    isWin = false;
    this.tiles = [];

    for (var i = 0; i < numTiles; i++) {
        this.tiles.push({location: i, icon: "", isWin: false});
    }

    //something to experiment with:
    //instead of lookup function,
    //getTileAtLocation(tileNum){
        //for each obj in this.tiles
    //}
};
function lookupTileLocationInReel(tileNum, reelNum){
    for (var i = 0; i < model.numLines; i++){
        if (model.slotMachine[reelNum].tiles[i].location === tileNum){
            return model.slotMachine[reelNum].tiles[i];
        }
    }
}
Reel.prototype.getOutcome = function () {
    //for (var i in //(asks outcome object)
            //for each numWin, did this reel win ?
    //assigns icon text 
};
Reel.prototype.getIconSet = function () {
//for all lines in this
            //arr.push(icon)
    //return arr
};

function SlotMachine(reel0, reel1, reel2, reel3, reel4, reel5, reel6, reel7, reel8, reel9) {
    this.grid = [];

    for (var i = 0; i < arguments.length; i++) {
        this.grid.push(arguments[i]);
    }
};

function generateRandomNum(max, arrUnavailable, skew) {
    
    var randomGeneratedNumber;
    var randomIcon;
    if (arrUnavailable === undefined){
        arrUnavailable = [];
    }
    console.log('arr unavailable:');
    console.log(arrUnavailable);
    do {
        randomGeneratedNumber = Math.floor(Math.random() * max);
        //randomIcon = lookupIconNameFromKey(randomGeneratedNumber);
        console.log('random number: ' + randomGeneratedNumber);
    } while (arrUnavailable.indexOf(randomGeneratedNumber) > -1); //(arrUnavailable.indexOf(randomIcon) > -1);

    return randomGeneratedNumber; //randomIcon;
};

var model = {

    numReels: 5,
    numLines: 3,
    reel0: {},
    reel1: {},
    reel2: {},
    reel3: {},
    reel4: {},
    slotMachine: {},

    betAmount: 0,
    cashBalance: 1000,

    isWin: false,
    linehits: 0,
    reelHits: 0,
    winIconKeys: [],
    winAmount: 0,
    totalWins: 0,
    totalLosses: 0,
    
    reset: function () {
        //reset all tile objects to no icon, iswin false

    },
    updateCashBalance: function (amountChange) {
        this.cashBalance += amountChange;
        view.updateCash();
    },
    generateOutcome: function() {
        var outcome = 29; //generateRandomNum(100);
        console.log('outcome: ' + outcome);
        if (outcome <= 30) { //<-- 30%
            //reel connect
            this.isWin = true;
            console.log('is win: ' + this.isWin);
            this.totalWins++;
            this.linehits = generateRandomNum(this.numLines);
            console.log('linehits: ' + this.linehits);
            this.reelHits = generateRandomNum(this.numReels, [0,1]); //<-- must be at least 3, no points if we only matched 1 or 2 reels
            console.log('reelhits: ' + this.reelHits);
            for (var i = 0; i < this.linehits; i++) {
                this.winIconKeys.push(generateRandomNum(icons.length, this.winIconKeys));
                console.log('wintypes:');
                console.log(this.winIconKeys);
            }

            //add wilds in later
            // var chanceForWilds = generateRandomNum(100);
            // if (chanceForWilds <= 25){

            // }
        } else if (outcome <=45) {//<-- 15%
            //free spins
            this.isWin = true;
            this.totalWins++;
        } else if (outcome <=50) {//<-- 5%  <-- higher if already won, up to max bonus = 0%
            //bonus
            this.isWin = true;
            this.totalWins++;
        } else { //<-- 50%
            //lose
            this.isWin = false;
            this.totalLosses;
            this.linehits = 0;
            this.reelHits = 0;
            this.winIconKeys = [];
            this.winAmount = 0;
        } 
    },
    placeTiles: function() {
        var winningTileLocationsOnThisReel = [];
        var randomLine = 0;
        var tile = {};

        //place winning tiles
        if (this.isWin) {
            for (var i = 0; i < this.reelHits; i++){
                for (var j = 0; j < this.linehits; j++){
                    randomLine = randomGeneratedNumber(this.numLines, winningTileLocationsOnThisReel);
                    tile = lookupTileLocationInReel(randomLine, i);
                    tile.isWin = true;
                    tile.icon = lookupIconNameFromKey(model.winIconKeys[j]);
                }
            }
        }

        //fill in grid with losing tiles
        for (var k = 0; k < this.numReels; k++){
            for (var l = 0; l < this.numLines; l++) {
                tile = lookupTileLocationInReel(k);
                if (!tile.isWin){
                    tile.icon = lookupIconNameFromKey(randomGeneratedNumber(icons.length, this.winIconKeys));
                    //need to also exclude icons from previous reel to accidentily match unintended icons
                }
            }
        }

    },
    calculateWinnings: function() {
        //calc winnings
            //for each line hit
                //betAmount * icon points * iconhits
    }


};

var controller = {
    //handle bet
        //resets hand
        //assign bet + take cash 
        //do
            //generate outcome
            //place tiles
            //calcwinnings
        //while (free spins > 0)
        //give winnings
        //view animate

    //handle bet amount change 
};

    

var view = {
    //animate spin

    //displayoutcome

    //show cash

    //show winning
        //if big win
}

function init(){
    console.log("init run start."); 
    model.reel0 = new Reel(0, model.numLines);
    //console.log()
    model.reel1 = new Reel(1, model.numLines);
    model.reel2 = new Reel(2, model.numLines);
    model.reel3 = new Reel(3, model.numLines);
    model.reel4 = new Reel(4, model.numLines);

    model.slotMachine = new SlotMachine(model.reel0, model.reel1, model.reel2, model.reel3, model.reel4);
    console.log(model.slotMachine);
    console.log("init run complete.");
}

window.onload = init;

//var x = lookupIconNameFromKey(7);
// var x = generateRandomNum(10, ["taxi","train","compass","globe","map","luggage","camera","palmTree","plane","boardingPass"]);
// console.log(x);

// console.log(model.reel0);
// console.log(model.reel1);
// console.log(model.reel2);
// console.log(model.reel3);
// console.log(model.reel4);
// console.log(model.slotMachine);
        
model.generateOutcome();
// console.log(model.isWin);
// console.log(model.linehits);
// console.log(model.reelHits);
// // console.log(model.winIconTypes);
// console.log('wintypes:');
//                 console.log(model.winIconKeys);