function Reel(reelnum, numTiles) {//tile1, tile2, tile3) {
    this.reelnum = reelnum;
    isWin = false;

    for (var i = 0; i < numTiles; i++) {
        //what?
    }
    /*this.tile1 = tile1;
    this.tile2 = tile2;
    this.tile3 = tile3;*/
}
Reel.prototype.getOutcome = function () {
    for (var i in //(asks outcome object)
            //for each numWin, did this reel win ?
    //assigns icon text 
};
Reel.prototype.getOutgetIconeSet = function () {
//for all lines in this
            //arr.push(icon)
    //return arr
};

function SlotMachine(reel1, reel2, reel3) {
    this.lineHits = 0;
    this.grid = [reel1, reel2, reel2];
}
function generateOutcome() {
    var lineHits = 0;

    //generate outcome
        //getWinType
        //placeTiles
        //calc winnings

}
function getWinType() {
    //random winType
        //line hit - 30%
            //chance of wilds <--25%
            //rand num of line hits
            //random icon type
            //rand num of icon hits (baesd on reelnums)

        //free spins - 15%
        //bonus - 5% <-- higher if already won, up to max bonus = 0%
        //else lose
}
function placeTiles() {
    //assign tiles
       //place winning tiles:
        //for each reel
            //for each line  hit
                //rand line 
                //line = icon text
        //place losing tiles:
            //for each reel
            //for each line
            //rand icon (previous reel)
}
function calculateWinnings() {
    //calc winnings
        //for each line hit
            //betAmount * icon points * iconhits
}
function lookupIconNameFromKey(key) {
    for (var ea in model.icons) {
        if (key === ea.key) {
            return ea.name;
        }
    }

    //console.log(tiles);
    //for (var t in tiles) {
    for (var t = 0; t < tiles.length; t++) {
        //console.log(t);
        //console.log(tiles[t]);
        if (tiles[t].randGeneratedKey === index) {
            return tiles[t];
        }
    }
}

var model = {
    linehits: 0,
    totalwins: 0,
    totalLosses: 0,
    betAmount: 0, //.25, .5, .75, 1, 1.5, 2, 2.5
    cashBalance: 1000,
    winAmount: 0,
    isWin: false,
    numReels: 5,
    numLines: 3,
    
    init: function () {
        var icons = [
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

        var reel0 = new Reel(0, numLines);
        var reel1 = new Reel(1);
        var reel2 = new Reel(2);
        var reel3 = new Reel(3);
        var reel4 = new Reel(4);

        var slotMachine = new SlotMachine(reel0, reel1, reel2, reel3, reel4);
    },
    generateRandomNum: function(max, arrUnavailable) {
        var randomGeneratedNumber;
        var randomIcon;
        do {
            randomGeneratedNumber = Math.floor(Math.random() * max);
            randomIcon = lookupIconNameFromKey(randGeneratedNumber);
        } while (arrUnavailable.indexOf(randomTile) > -1);

        return randomIcon;
    },
    reset: function () {

    },
    updateCashBalance: function (change) {
        this.cashBalance += change;
        view.updateCash();
    }


};




//controller
    //resets hand
    //assign bet + take cash 
    //do
        //generate outcome
        //get outcome
    //while (free spins > 0)
    //give winnings
    //view animate


//view
    //animate spin

    //displayoutcome

    //show cash

    //show winning
        //if big win


        