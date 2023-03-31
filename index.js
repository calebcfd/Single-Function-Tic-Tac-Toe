
/* This is Single Function Tic-Tac-Toe. Call it, passing in {type: 'init, nodeId: <desired node id>}, to inject a Tic-Tac-Toe baord anywhere. Playable with two players or a bot! */

function SFTTT(action) {

    /* These functions make X's and O's out of elements to avoid using png's or svg's */
    function makeO() {
        var O = document.createElement('div')
            O.style.display = 'flex'
            O.style.justifyContent = 'center'
            O.style.alignItems = 'center'
            O.style.width = '100%'
            O.style.height = '100%'

        var circle = document.createElement('div')
            circle.style.background = 'radial-gradient(transparent 0%, transparent 50%, hsl(207, 90%, 54%) 50%, hsl(207, 90%, 54%) 65%, transparent 65%)'
            circle.style.borderRadius = '50%'
            circle.style.width = '80%'
            circle.style.height = '80%'
            circle.style.filter = 'drop-shadow(5px 5px 5px black)'

        O.appendChild(circle)

        return O
    }

    function makeX() {
        var X = document.createElement('div')
            X.style.position = 'relative'
            X.style.width = '100%'
            X.style.height = '100%'

        var cross1 = document.createElement('div')
            cross1.style.position = 'absolute'
            cross1.style.width = '100%'
            cross1.style.height = '20px'
            cross1.style.transformOrigin = '0% 50%'
            cross1.style.transform = 'rotate(45deg) translate(20%, -40%)'
            cross1.style.backgroundColor = 'hsl(4, 90%, 58%)'
            cross1.style.filter = 'drop-shadow(5px 5px 5px black)'

        var cross2 = document.createElement('div')
            cross2.style.position = 'absolute'
            cross2.style.width = '100%'
            cross2.style.height = '20px'
            cross2.style.transformOrigin = '100% 50%'
            cross2.style.transform = 'rotate(-45deg) translate(-20%, -40%)'
            cross2.style.backgroundColor = 'hsl(4, 90%, 58%)'
            cross2.style.filter = 'drop-shadow(5px 5px 5px black)'

        X.appendChild(cross1)
        X.appendChild(cross2)

        return X
    }
    /* End of defining Functions */
    /* SFTTT takes the action argument simmilar to how a Redux reducer uses actions */
    switch (action.type) {
        case 'init':

            if (action.reset == undefined) {
                var root = document.getElementById(action.nodeId)

                var wrapper = document.createElement('div')
                    wrapper.setAttribute('id', 'wrapper')
                    wrapper.style.width = '90vmin'
                    wrapper.style.height = '90vmin'
                    wrapper.style.backgroundImage = 'linear-gradient( #F7CE68, #FBAB7E )'
            } else {
                var wrapper = document.getElementById('wrapper')
            }

            var menu = document.createElement('div')
                menu.setAttribute('id', 'menu')
                menu.style.width = '100%'
                menu.style.height = '100%'
                menu.style.textAlign = 'center'
                menu.style.paddingTop = '10%'

            var title = document.createElement('h1')
                title.innerHTML = 'Select  Your  Opponent'
                title.style.margin = '10% auto 10% auto'
                title.style.fontSize = '3em'
                title.style.color = 'white'
                title.style.fontFamily = 'Trebuchet MS'

            var buttonHolder = document.createElement('div')
                buttonHolder.style.width = '100%'
                buttonHolder.style.display = 'flex'
                buttonHolder.style.justifyContent = 'space-around'
                buttonHolder.style.alignItems = 'center'

            var pvp = document.createElement('div')
                pvp.innerHTML = 'Player 2'
                pvp.setAttribute('onclick', 'SFTTT({type: "pvp"})')
                pvp.setAttribute('onmouseenter', 'SFTTT({type: "red", event: event})')
                pvp.setAttribute('onmouseleave', 'SFTTT({type: "white", event: event})')

            var pve = document.createElement('div')
                pve.innerHTML = 'Computer'
                pve.setAttribute('onclick', 'SFTTT({type: "pve"})')
                pve.setAttribute('onmouseenter', 'SFTTT({type: "blue", event: event})')
                pve.setAttribute('onmouseleave', 'SFTTT({type: "white", event: event})')

            var buttonStyle = {
                width: '30%',
                padding: '2% 0',
                borderRadius: '15% / 50%',
                cursor: 'pointer',
                backgroundColor: 'white',
                fontSize: '1.5em',
                transition: 'background-color .25s, color .25s'
            }
            for (let key of Object.keys(buttonStyle)) {
                pvp.style[key] = buttonStyle[key]
                pve.style[key] = buttonStyle[key]
            }


            buttonHolder.appendChild(pvp)
            buttonHolder.appendChild(pve)
            menu.appendChild(title)
            menu.appendChild(buttonHolder)
            wrapper.appendChild(menu)
            if (action.reset == undefined) {
                root.appendChild(wrapper)
            }


            this.random = Math.floor(Math.random()*8)
            this.board = [null, '', '', '', '', '', '', '', '', '']
            this.alpha = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
            this.combos = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [1, 4 ,7],
                [2, 5, 8],
                [3 ,6 ,9],
                [1, 5, 9],
                [3, 5, 7]
            ]
            this.moves = 0
            this.player1 = null
            this.player2 = null
            this.botTeam = null
            this.gamemode = null
            this.botColor = null


        break
        case 'createBoard':


            var grid = document.createElement('div')
                grid.setAttribute('id', 'grid')
                var gridStyle = {
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr 1fr',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    width: '100%',
                    height: '100%',
                    border: '2px solid black'
                }
                for (let key of Object.keys(gridStyle)) {
                    grid.style[key] = gridStyle[key]
                }


            for (let i = 1; i < 10; i++) {
                var tile = document.createElement('div')
                    tile.setAttribute('class', 'tile')
                    tile.setAttribute('id', this.alpha[i])
                    tile.setAttribute('onclick', 'SFTTT({type: "playerTurn", event: event, callback: ()=>{SFTTT({type: "check"})}, callbackBot: ()=>{SFTTT({type: "botTurn", callback: ()=>{SFTTT({type: "check"})} })} })')
                    tile.style.border = '2px solid black'
                    grid.appendChild(tile)
            }

            document.getElementById('wrapper').appendChild(grid)


        break
        case 'pvp':


            this.player1 = ()=>makeX()
            this.player2 = ()=>makeO()
            this.gamemode = 'pvp'
            this.activePlayer = 0

            document.getElementById('menu').remove()
            SFTTT({type: 'createBoard'})


        break
        case 'pve':


            document.getElementById('menu').remove()

            var menu = document.createElement('div')
                menu.setAttribute('id', 'menu')
                menu.style.width = '100%'
                menu.style.height = '100%'
                menu.style.textAlign = 'center'
                menu.style.paddingTop = '10%'

            var title = document.createElement('h1')
                title.innerHTML = 'Choose your Team'
                title.style.margin = '10% auto 10% auto'
                title.style.fontSize = '3em'
                title.style.color = 'white'
                title.style.fontFamily = 'Trebuchet MS'

            var buttonHolder = document.createElement('div')
                buttonHolder.style.width = '100%'
                buttonHolder.style.display = 'flex'
                buttonHolder.style.justifyContent = 'space-around'
                buttonHolder.style.alignItems = 'center'

            var pveX = document.createElement('div')
                pveX.innerHTML = 'X'
                pveX.setAttribute('onclick', 'SFTTT({type: "pveX"})')
                pveX.setAttribute('onmouseenter', 'SFTTT({type: "red", event: event})')
                pveX.setAttribute('onmouseleave', 'SFTTT({type: "white", event: event})')

            var pveO = document.createElement('div')
                pveO.innerHTML = 'O'
                pveO.setAttribute('onclick', 'SFTTT({type: "pveO", callback: ()=>{SFTTT({type: "botTurn"})} })')
                pveO.setAttribute('onmouseenter', 'SFTTT({type: "blue", event: event})')
                pveO.setAttribute('onmouseleave', 'SFTTT({type: "white", event: event})')

            var buttonStyle = {
                width: '30%',
                padding: '2% 0',
                borderRadius: '15% / 50%',
                cursor: 'pointer',
                backgroundColor: 'white',
                fontSize: '1.5em',
                transition: 'background-color .25s, color .25s'
            }
            for (let key of Object.keys(buttonStyle)) {
                pveX.style[key] = buttonStyle[key]
                pveO.style[key] = buttonStyle[key]
            }

            buttonHolder.appendChild(pveX)
            buttonHolder.appendChild(pveO)
            menu.appendChild(title)
            menu.appendChild(buttonHolder)
            document.getElementById('wrapper').appendChild(menu)
            this.activePlayer = 0
            this.gamemode = 'pve'


        break
        case 'pveX':

            document.getElementById('menu').remove()

            this.player1 = ()=>makeX()
            this.botTeam = ()=>makeO()
            this.botColor = 'hsl(207, 90%, 54%)'

            SFTTT({type: 'createBoard'})


        break
        case 'pveO':

            document.getElementById('menu').remove()

            this.player1 = ()=>makeO()
            this.botTeam = ()=>makeX()
            this.botColor = 'hsl(4, 90%, 58%)'

            SFTTT({type: 'createBoard'});
            
            action.callback()


        break
        case 'playerTurn':


            let tileNum = this.alpha.indexOf(action.event.target.id)
        
            if (this.board[tileNum] === '') {
                if (this.activePlayer == 0) {
                    this.board[tileNum] = 0
                    action.event.target.appendChild(this.player1())
                    if (this.gamemode === 'pvp') { this.activePlayer = 1}
                } else if (this.activePlayer == 1) {
                    this.board[tileNum] = 1
                    action.event.target.appendChild(this.player2())
                    if (this.gamemode === 'pvp') { this.activePlayer = 0 }
                }

                this.moves++   
        
                action.callback()
            
                if (this.gamemode == 'pve') {
                    action.callbackBot()
                }
            }
        

        break
        case 'botTurn':

            /* This for loop checks for winning moves, and takes them immeadiatly */
            for (let combo of this.combos) {

                let counter = 0
                let x = true
                let index = null
        
                for (let val of combo) {
                    if (this.board[val] === 1) {
                        counter++
                    } else if (this.board[val] === 0) {
                        x = false
                    } else if (this.board[val] === '') {
                        index = val
                    }
                }
        
                if (counter === 2 && x === true && index != null) {
                this.board[index] = 1
                document.querySelector('#'+this.alpha[index]).appendChild(this.botTeam())
                action.callback()
                return null
                }
        
            }
        
            /* This for loop blocks winning moves from the Player */
            for (let combo of this.combos) {
        
                let counter = 0
                let x = true
                let index = null
        
                for (let val of combo) {
                    if (this.board[val] === 0) {
                        counter++
                    } else if (this.board[val] === 1) {
                        x = false
                    } else if (this.board[val] === '') {
                        index = val
                    }
                }
        
                if (counter === 2 && x === true && index != null) {
                this.board[index] = 1
                document.querySelector('#'+this.alpha[index]).appendChild(botTeam())
                this.moves++
                action.callback()
                return null
                }
        
            }


            /* If neither of the previous moves need to be made, the bot will follow one of these movesets. */
            if (this.random <= 2) {
                var prefered = [1, 9, 3, 7, 5, 2, 4, 6, 8]
            } else if (this.random <= 4){
                var prefered = [7, 3, 1, 9, 5, 4, 2, 8, 6]
            } else if (this.random <=6) {
                var prefered = [9, 1, 7, 3, 5, 8, 4, 6, 2]
            } else {
                var prefered = [3, 7, 9, 1, 5, 6, 8, 2, 4]
            }
            for (let num of prefered) {
                if (this.board[num] === '') {
                    this.board[num] = 1
                    document.getElementById(this.alpha[num]).appendChild(botTeam())
                    this.moves++
                    action.callback()
                    return null
                }
            }
        

        break
        case 'check':


            console.log(this.moves)
            for (let combo of this.combos) {

                if (this.board[combo[0]] === 0 && this.board[combo[1]] === 0 && this.board[combo[2]] === 0 ) {
                    console.log('player1 wins')
                    setTimeout(SFTTT({type: 'win', who: 'Player 1'}), 1000)
                } else if (this.board[combo[0]] === 1 && this.board[combo[1]] === 1 && this.board[combo[2]] === 1) {
                    console.log('computer wins')
                    if (this.gamemode == 'pvp') {
                        setTimeout(()=>{SFTTT({type: 'win', who: 'Player 2'})}, 1000)
                    } else {
                        setTimeout(()=>{SFTTT({type: 'win', who: 'Computer'})}, 1000)
                    }
                } 
        
            }
        
            if ( this.moves == 9) {
                setTimeout(()=>{SFTTT({type: 'win', who: 'Draw'})}, 1000)
            }
        

        break
        case 'win':

            document.getElementById('grid').remove()

            var menu = document.createElement('div')
                menu.setAttribute('id', 'menu')
                menu.style.width = '100%'
                menu.style.height = '100%'
                menu.style.textAlign = 'center'
                menu.style.paddingTop = '10%'

            var title = document.createElement('h1')
                if (action.who === 'Draw') {
                    title.innerHTML = 'Draw'
                } else if (action.who === 'Player 1'){
                    title.innerHTML = '<span style="color: hsl(4, 90%, 58%)">Player 1</span> Wins!'
                } else if (action.who === 'Player 2'){
                    title.innerHTML = '<span style="color: hsl(207, 90%, 54%)">Player 2</span> Wins!'
                } else if (action.who === 'Computer'){
                    title.innerHTML = '<span style="color: ' + this.botColor + '">Computer</span> Wins!'
                }
                title.style.margin = '10% auto 10% auto'
                title.style.fontSize = '3em'
                title.style.color = 'white'
                title.style.fontFamily = 'Trebuchet MS'

            var reset = document.createElement('div')
                reset.innerHTML = 'Play Again'
                reset.setAttribute('onclick', 'SFTTT({type: "reset"})')
                reset.setAttribute('onmouseenter', 'SFTTT({type: "red", event: event})')
                reset.setAttribute('onmouseleave', 'SFTTT({type: "white", event: event})')
                var buttonStyle = {
                    width: '30%',
                    padding: '2% 0',
                    borderRadius: '15% / 50%',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    fontSize: '1.5em',
                    transition: 'background-color .25s, color .25s',
                    margin: 'auto'
                }
                for (let key of Object.keys(buttonStyle)) {
                    reset.style[key] = buttonStyle[key]
                    reset.style[key] = buttonStyle[key]
                }

            menu.appendChild(title)
            menu.appendChild(reset)
            document.getElementById('wrapper').appendChild(menu)


        break
        case 'reset':


            document.getElementById('menu').remove()
            SFTTT({type: "init", reset: true})


        break
        case 'red':


            var target = action.event.target
            target.style.backgroundColor = 'hsl(4, 90%, 58%)'
            target.style.color = 'white'


        break
        case 'blue':


            var target = action.event.target
            target.style.backgroundColor = 'hsl(207, 90%, 54%)'
            target.style.color = 'white'


        break
        case 'white':


            var target = action.event.target
            target.style.backgroundColor = 'white'
            target.style.color = 'black'


        break
    }
}