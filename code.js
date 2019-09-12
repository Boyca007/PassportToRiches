/*
Game Mechanics:

9 plain icons (transparent background)
    -map
    -luggage
    -plane
    -compass
    -palm tree
    -train
    -globe
    -camera
    -taxi
    //https://deszone.net/freebies/travel-vector-free-icon-set/




-boarding pass in the 5th reel: unlocks bonus
    -world destinations are multipliers of bonus round
    -X free spins @ X multiplier
    -exponential for # of cities to unlock:
        NYC
        London
        Paris
        Tokyo
        Beijing
        Sydney
        Cairo
        Vancouver
        Moscow
        Sao Paulo
        Los Angeles
        Rome





-3 passports on screen: unlocks X free spins

-random wilds: plane flies over a reel, entire row is wild



Art assets:
-tile icons for spots:

-city background images

-big/bonus wins 

-"wild" trigger plane animation 
    large cartoon plane (aerial view), move it across screen bottom to top

-panel decoration

-screen decoration 

-screen background

-primary background
    
-Passport To Riches Logo

-audio:
    -loser spin / clicks of icon locking

    -BGM

    -win / coin clinking sound

    -button presses

    

    -free spin / bonus music



HTML Design:

header
    logo

Screen
    5x3 table 

Panel
    bet change buttons (??)
    repeat bet

Jello layout:
    fixed width: 1000
    margins: auto
*/
//JS Design:

const tileTypes = {
    taxi: 1,
    train: 2,
    compass: 3,
    camera: 4,
    luggage: 5, 
    map: 6,
    palmTree: 7,
    plane: 8, 
    globe: 9,
    passport: 0,
    boardingPass: 0
}
// const winType {

// }

var model = {
    betAmount: 0,
    cashBalance: 0,
    totalWins: 0,
    totalLosses: 0,
    isBonus: false,
    bonusHits: 0, //number of times user hit the bonus, to calc the multiplier
    freeSpins: 0,
    winType: 0,
    winnings: 0,
    numReels: 5,
    numLines: 3,
    output: [[0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]],


    betSubmit: function(bet) {
        this.reset();
        this.updateCashBalance(bet);
        view.displayAnimation();

        do {
            this.generateOutcome();
            this.handleWinType();
            this.placeLosingTiles();
            this.updateCashBalance();
        } while ( freeSpins > 0);

    },
    updateCashBalance: function(change){
        this.cashBalance += change;
        view.updateCash();
    },
    generateOutcome: function(){
        this.winType = this.generateWinLoss(); //random# (0-7, param)
        if (this.winType > 0) {
            totalWins++;
        } else {
            totalLosses++;
        }
    },
    handleWinType: function() {
        switch(this.winType) {
            case 1:
                var kind = tileGenerator();
                var hits = reelHitGenerator();

                this.placewinningtiles(kind, hits);
                this.calculateWinnings(kind, hits);
                break;
            case 2: 
                
                //rethink this one

                var reel = reelHitGenerator();
                placewinningtiles("fixed", tileTypes.passport, reel)
                
                var lineHits = lineHitGenerator();
                for (var i = 0; i < lineHits; i++) {
                    var hits = reelHitGenerator();
                    var kind = tileGenerator();
                    //do something with results
                }
                placewinningtiles(tileTypes.passport, );
                break;

                // which reel - numhitgenerator()

                //     //how many other matching tiles?
                //         random match # - linehitgenerator()
                //             for (x in matchnum)
                //                 how many - numhitgenerator()
                //                 which kind - tilegenerator()

                //     placewinningtiles(passports, 3, reel#)
                //     calculatewinnings(type, num)

            case 3: 
                placewinningtiles(tileTypes.passport, 3, reel#); //what?
                this.freeSpins += 25;
                view.displayFreeSpins();
            
            case 4: 
                placewinningtiles(); //what?
                this.bonusHits++;
        }
    },
    calculateWinnings: function(type, num) {
        var multipler = Math.pow(this.bonusHits, 2)
        if (multipler === 1) {multipler = 2;}
        this.winnings += ((type * num) * multipler);
        view.displayWinnings();
    },
    generateWinLoss: function() {
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
    tileGenerator: function(arr) {
        var tile = Math.floor(Math.random() * tileTypes.length);
        
        //revisit this - how to write without duplicating code?

        try {
            arr
        } catch(error) {
            
            return tileTypes[tile];
        }
        
        //if (isbonus) then replace passport with a new city
    },
    reelHitGenerator() {
        var reel = Math.floor(Math.random() * this.numReels);
    },
    lineHitGenerator: function() {
        var reel = Math.floor(Math.random() * this.numLines);
    },
    placewinningtiles: function(tile, reel) {
        //optional fixed
        
        var exitLoop = false;
        do {
            for (var i = 0; i < reel; i++) {
                var line = this.lineHitGenerator();
                if (output[i][line] === 0) {
                    output[i][line] = tile;
                    return;
                }
            }
        } while (!exitLoop)
    },
    placeLosingTiles: function() {
        for (var i = 0; i < this.numReels; i++){
            for (var j = 0; i < this.numLines; j++){
                if (output[i][line] === 0) {
                    this.tileGenerator(); 
                    //filter conditions with 3 (top,mid,btm to left of tile)
                }
            }
        }
    },
    reset: function() {
        this.output = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]    
        this.isBonus = false;
        this.bonusHits = 0;
        this.freeSpins = 0;
        this.winType = 0;
        this.winnings = 0
        view.resetBackground();
    }
}
var view = {
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

}
var controller = {
    processBet: function() {

    }
}
function init() {
    var 
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
