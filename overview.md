
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

JS Design:

    const tileTypes = {

        (p) enum tile types

    }


    Model
        (p) bet  amount
        (p) cash balance
        (p) total wins
        (p) total losses
        (p) is bonus
        (p) bonus hits (number of times user hit the bonus)
        (p) free spins #
        (p) win type 
        (p) output = [[0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]]
        (p) winnings
        (p) num of reels (columns)
        (p) num of line  (rows)

      

        
        
        (m) bet submit
            reset tile board
            update cash bal (-bet amount)
            view.display animation
            
            

            do 

                generate outcome
                handle wintype
                place losing tiles
                update cash bal(+winnings)

            while free spins > 0






        (m) udate cash balance(change)
            cash = cash + change
            view.updaet cash

        (m) generate outcome (win or loss)

            this.winType = random# (0-7, param)

            if true
                0. 
                    total losses++

                else. 
                    total wins++




        
        (m) handleWinType
            winType
                0 - lose
                    do nothing

                1 - connect icons
                        how many - reelhitgenerator()
                        which kind - tilegenerator()

                        placewinningtiles(type, num)
                        calculatewinnings(type, num)

                2 - wilds
                        which reel - numhitgenerator()

                        //how many other matching tiles?
                            random match # - linehitgenerator()
                                for (x in matchnum)
                                    how many - numhitgenerator()
                                    which kind - tilegenerator()

                        placewinningtiles(passports, 3, reel#)
                        calculatewinnings(type, num)

                3 - free spins
                    
                        placewinningtiles(passports, 3, reel#)
                        free spins = + X;

                4 - bonus
                        place winningtiles()
                        bonus hit++


        (m) calculateWinnings(tileIcon, num)
            
            multiplier = (bonus hit ^ bonus hit)
            if multipler = 1 then multiplier = 2
            winnings = (winnings + (tileType * num)) * multiplyer
            view.displaywinnings


        (m) random number generator(optional % odds, optional filter out conditions 1-3)
            
            //how do I change this to suit my needs given the call?
                if win type, X filters
                vs. random tile generator
                vs. random how many generator (max 5)
                vs. random reel generator (max 5)

                win-loss = (total wins + total losses) / total wins

                //https://stackoverflow.com/questions/11383242/how-to-generate-skewed-random-numbers-in-javascript
                skew = ++ based on recent win
                skew = ++ based on bet amount
                skew = based on win% of 92% (1-winlosratio)

                generate with % odds 
                check condition

                0. lose - 30%
                1. connect icons - 30%
                2. wilds - 15% 
                3. passports / free spins - 15% <-- gradually gets less based on # of free spins
                4. bonus - 10% <-- goes up if bonus hit is > 1, 0% if bonus hit is at max

        (m) tileGenerator(optional conditions)
                generate random number 1 to max number of tile types

                conditions if it can't be anything passed in the as arg

                if (isbonus) then replace passport with a new city

        (m) reel hit generator()
                generates random number of reels to be hit on (max 5)


        (m) line hit generator
                generators random row # (max 3)

        (m) place winning tiles(tileType, reels)
                
                for i in reels
                    line hit generator()

                    place in first reel
                    place in second
                    place in third

            
        (m) place losing tiles
                for every tile = 0

                random# for tile kind
                filter conditions with 3 (top,mid,btm to left of tile)


        (m) reset tile board()
                output = [[0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]]
                
                winnings = 0

                view.reset background

        



    View
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
        


    Controller

        (m) process bet


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


