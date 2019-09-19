window.onload = init;

/*
//create global tile objs
var taxi = new Tile("taxi", 0, 2);
var train = new Tile("train", 1, 3);
var compass = new Tile("compass", 2, 3);
var camera = new Tile("camera", 3, 5);
var luggage = new Tile("luggage", 4, 5);
var map = new Tile("map", 5, 5);
var palmTree = new Tile("palmTree", 6, 5);
var plane = new Tile("plane", 7, 10);
var globe = new Tile("globe", 8, 10);
var passport = new Tile("passport", 9, 0);
var boardingPass = new Tile("boardingPass", 10, 0);
var tiles = [taxi, train, compass, camera, luggage, map, palmTree, plane, globe, passport, boardingPass];

//create global win objs
var lose = new WinType(0);
var connectTiles = new WinType(1);
var wilds = new WinType(2);
var freeSpins = new WinType(3);
var bonus = new WinType(4);
var winTypes = [lose, connectTiles, wilds, freeSpins, bonus];

function Tile(name, randGeneratedKey, points) {
    this.randGeneratedKey = randGeneratedKey;
    this.name = name;
    this.points = points;
}
function lookupTileTypeFromIndex(index) {
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
*/

function WinType(randGeneratedKey) {
    this.randGeneratedKey = randGeneratedKey;
}
function lookupWinTypeFromIndex(index) {
    for (var w in winTypes) {
        if (w.randGeneratedKey === index) {
            return w;
        }
    }
}

function Machine() {
    //call all reels and tiles to populate winning/losing tiles
        //ech reel: hey, am i a winning? populate accordingly

    //convert to array of #'s -- how to send to view

}
function Reel(reelNum) {
    this.reelNum = reelNum;
    this.isWinningReel = 0;
}
function Tile(key, reelNum, lineNum) {
    this.key = key;
    this.lineNum = lineNum;
    this.reelNum = reelNum;
    this.isWinningTile = false;
}
Tile.prototype.fillIcon = function (arr) {
    //look at outcome for my index
    //update isWinningTile
    //if (isWinningTile) {
        //get tile icon from winning grid
    //} else {
        //generate losing tile - pick random icon
    //}
}
function WinLose() {
    this.isWin = false;
    this.winningIcon = 0;
    this.generate = function () {
        //pick wintype
        };
    
    this.placeWinningTiles = function () { };
    this.wonAmount = function () { };
}
var model = {
    betAmount: 0,
    cashBalance: 0,
    totalWins: 0,
    totalLosses: 0,
    isBonus: false,
    bonusHits: 0,
    numRemainingFreeSpins: 0,
    winType: 0,
    winTileType: 0,
    winnings: 0,
    numReels: 0,
    numLines: 0,
    /*   tileGrid: [compass,map,globe,boardingPass, plane,
           compass, map, globe, boardingPass, plane,
           compass, map, globe, boardingPass, plane],*/
    //tileGrid: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    init() {

        var icons = [
            { name: "taxi", points: 2 , key: 0 },
            { name: "train", points: 2, key: 1 },
            { name: "compass", points: 2 , key: 2 },
            { name: "camera", points: 3 , key: 3 },
            { name: "luggage", points: 3 , key: 4 },
            { name: "map", points: 5 , key: 5 },
            { name: "palmTree", points: 5 , key: 6 },
            { name: "plane", points: 10 , key: 7 },
            { name: "globe", points: 10 , key: 8 },
            { name: "passport", points: 20 , key: 9 },
            { name: "boardingPass", points: 50 , key: 10 }];

        /*var tile0 = new Tile(0, 0, 0);
        var tile1 = new Tile(1, 0, 1);
        var tile2 = new Tile(2, 0, 2);
        var tile3 = new Tile(3, 1, 0);
        var tile4 = new Tile(4, 1, 1);
        var tile5 = new Tile(5, 1, 2);
        var tile6 = new Tile(6, 2, 0);
        var tile7 = new Tile(7, 2, 1);
        var tile8 = new Tile(8, 2, 2);
        var tile9 = new Tile(9, 3, 0);
        var tile10 = new Tile(10, 3, 1);
        var tile11 = new Tile(11, 3, 2);
        var tile12 = new Tile(12, 4, 0);
        var tile13 = new Tile(13, 4, 1);
        var tile14 = new Tile(14, 4, 2);*/

        var reel0 = new Reel(0);
        var reel1 = new Reel(1);
        var reel2 = new Reel(2);
        var reel3 = new Reel(3);
        var reel4 = new Reel(4);

        var slotMachine = new Machine(reel1, reel2, reel3, reel4, reel5);

        var outcome = new WinLose();

        this.numReels = slotMachine.length;
        this.numLines = reel1.length;

    },

    betSubmit: function (bet) {
        this.reset();
        this.updateCashBalance(betAmount);
        view.displayAnimation();

        //same do loop
        //outcome.generate();
        //outcome.placewinningTiles();
        //event - tiles determine their icons

       /* do {
            this.generateOutcome();
            this.handleWinType();
            this.placeLosingTiles();
            this.updateCashBalance();
        } while (this.numRemainingFreeSpins > 0);*/

    },
    updateCashBalance: function (change) {
        this.cashBalance += change;
        view.updateCash();
    },
    generateOutcome: function () {
        var randomlyGeneratedOutcome = Math.floor(Math.random() * winTypes.length);
        this.winType = lookupWinTypeFromIndex(randomlyGeneratedOutcome);
        //replace with more advanced functionality:
        // win-loss = (total wins + total losses) / total wins

        //     //https://stackoverflow.com/questions/11383242/how-to-generate-skewed-random-numbers-in-javascript
        //     skew = ++ based on recent win
        //     skew = ++ based on bet amount
        //     skew = based on win% of 92% (1-winlosratio)

        //     generate with % odds 
        //     check condition

        //     0. lose - 30%
        //     1. connect icons - 30%
        //     2. wilds - 15% 
        //     3. passports / free spins - 15% <-- gradually gets less based on # of free spins
        //     4. bonus - 10% <-- goes up if bonus hit is > 1, 0% if bonus hit is at max
    },
    handleWinType: function () {
        var typeOfTileHit = 0;
        var numOfReelHits = 0;
        var numOfLineHits = 0;

        switch (this.winType) {
            case lose:
                this.totalLosses++;
                break;

            case connectTiles:
                this.totalWins++;
                typeOfTileHit = tileHitGenerator();
                numOfReelHits = reelHitGenerator();

                this.placewinningtiles(typeOfTileHit, numOfReelHits);
                this.calculateWinnings(typeOfTileHit, numOfReelHits);
                break;

            case wilds:
                this.totalWins++;
                //rethink this one

                numOfReelHits = reelHitGenerator();
                placewinningtiles(passport, numOfReelHits, "fixed");

                numOfLineHits = lineHitGenerator();
                for (var i = 0; i < numOfLineHits; i++) {
                    typeOfTileHit = tileHitGenerator();
                    numOfReelHits = reelHitGenerator();
                    //do something with results
                }
                placewinningtiles(tileTypes.passport);
                break;

            // which reel - numhitgenerator()

            //     //how many other matching tiles?
            //         random match # - linehitgenerator()
            //             for (x in matchnum)
            //                 how many - numhitgenerator()
            //                 which kind - tilegenerator()

            //     placewinningtiles(passports, 3, reel#)
            //     calculatewinnings(type, num)

            case freeSpins:
                placewinningtiles(tileTypes.passport, 3, reel); //what?
                this.numRemainingFreeSpins += 25;
                view.displayFreeSpins();
                break;
            case 4:
                placewinningtiles(); //what?
                this.bonusHits++;
        }
    },
    calculateWinnings: function (type, num) {
        var multipler = Math.pow(this.bonusHits, 2)
        if (multipler === 1) { multipler = 2; }
        this.winnings += type.points * num * multipler;
        //factor in bet amount: the more you bet, the more you win - 
        // you return a % of your bet

        view.displayWinnings();
    },

    tileHitGenerator: function (arr) {//tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9) {

        /*var arr = [];
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Tile) {
                arr.push(arguments[i]);
            }
        }*/
        do {
            var randGeneratedNumber = Math.floor(Math.random() * tiles.length);
            var randomTile = lookupTileTypeFromIndex(randGeneratedNumber);
        } while (arr.indexOf(randomTile) > -1);

        return randomTile;

        //if (isbonus) then replace passport with a new city
    },
    reelHitGenerator() {
        return Math.floor(Math.random() * this.numReels);
    },
    lineHitGenerator: function () {
        return Math.floor(Math.random() * this.numLines);
    },
    placewinningtiles: function (typeOfTileHit, numOfReelHits, optional_fixed) {
        this.winTileType = typeOfTileHit;
        var index;
        if (optional_fixed === "fixed") {
            for (var j = 0; j < this.numLines; j++) {
                index = j * this.numReels + numOfReelHits - 1;
                this.tileGrid[index] = typeOfTileHit;

            }
        } else {
            for (var i = 0; i < numOfReelHits; i++) {
                var line = this.lineHitGenerator();
                index = (1 + i) + (line * this.numReels) - 1;
                if (this.tileGrid[index] === 0) {
                    this.tileGrid[index] = typeOfTileHit;
                    console.log('placed winning tile:' + this.tileGrid[index].name + ' in location: ' + index);
                }
            }
        }
    },
    placeLosingTiles: function () {
        for (var i = 0; i < (this.numReels * this.numLines); i++) {
            var priorReelValues = this.determinePriorReelValues(i);
            console.log(i);
            console.log(priorReelValues);
            if (this.tileGrid[i] === 0) {
                this.tileGrid[i] = this.tileHitGenerator(priorReelValues);
                console.log('placed losing tile:' + this.tileGrid[i].name + ' in location: ' + i);
            } else { console.log('skipping location: ' + i);}
        }
    },
    determinePriorReelValues: function (i) {
        arr = [];
        //hard coded for now
        /*if (i === 0 || i === 5 || i === 10) {
        } else*/
        if (i === 1 || i === 6 || i === 11) {
            arr.push(this.tileGrid[0]);
            arr.push(this.tileGrid[5]);
            arr.push(this.tileGrid[10]);
        }else if (i === 2 || i === 7 || i === 12) {
            arr.push(this.tileGrid[1]);
            arr.push(this.tileGrid[4]);
            arr.push(this.tileGrid[11]);
        }else if (i === 3 || i === 8 || i === 13) {
            arr.push(this.tileGrid[2]);
            arr.push(this.tileGrid[7]);
            arr.push(this.tileGrid[12]);
        }else if (i === 4 || i === 9 || i === 14) {
            arr.push(this.tileGrid[3]);
            arr.push(this.tileGrid[8]);
            arr.push(this.tileGrid[13]);
        }
        if (this.winTileType !== 0) { arr.push(this.winTileType); }

        return arr;
    },
    reset: function () {
        this.tileGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.isBonus = false;
        this.bonusHits = 0;
        this.numRemainingFreeSpins = 0;
        this.winType = 0;
        this.winTileType = 0;
        this.winnings = 0;
        //view.resetBackground();
    }
};
var view = {

    displayGrid() {
        var cells = document.getElementsByClassName("tile");
        for (var i = 0; i < cells.length; i++) {
            cells.item(i).setAttribute("class", "tile " + model.tileGrid[i].name);
        }
    }
    /*
    display reel animation pending outcome
        setInterval -> twitching effect on each  
            function(td-id) {
                td-id.setAttribute("class", model.tileGenerator());
            }  
        clear Interval after x on each
        
    dislay output icons for each cell
        random number to "lock in" + stop randomly twiching

        model.grid

        if win > x display big win


    display big win sign
        count++ animation

    display current bet

    display available cash balance

    display recent bet win

    trigger bonus
            update background image

    reset background

    dislpay free spings
    */

};
var controller = {
    processBet: function () {

    }
};
function init() {
    
}
function HandleBetChange() {
    
}

/*    

=

Init:
assign button handlers
display available cash

handle Bet change
model.bet amount = 
view.display bet

Handle Bet Submit
model.betsubmit

if animation = stop animation and generate outcome

Handle Key Press
Enter, Space = repeat bet

*/

model.placewinningtiles(taxi, 5);
console.log(model.tileGrid);
model.placeLosingTiles();
view.displayGrid();

/*var a = model.determinePriorReelValues(1);
console.log(a);*/
