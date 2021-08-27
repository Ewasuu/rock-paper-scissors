'use strict'
const playAgain = document.querySelector('.play__again')
const fragment = document.createDocumentFragment()
document.querySelectorAll('.first').forEach( element => {element.value = 1})
document.querySelectorAll('.second').forEach( element => element.value = 2)
document.querySelectorAll('.third').forEach( element => element.value = 3)
const score = document.querySelector('.score__score-score')
const gameArea = document.querySelector('.game__container')
const tokenArea = document.querySelector('.token__container')


let contador = localStorage.getItem('wins')? parseInt(localStorage.getItem('wins')) : parseInt(0)
score.textContent = contador
let gameWinner = ''



const chooseWinner = (realPlayer, tokenPlayed)=>{
 if(realPlayer === 1){
     switch (tokenPlayed) {
         case 'rock':
            gameWinner = 'TIE'           
             break;
     
         case 'paper':
            gameWinner = 'YOU LOSE'
             break;
        case 'scissors':
            gameWinner = 'YOU WIN'
            break;
        }
 }
 if(realPlayer === 2){
    switch (tokenPlayed) {
        case 'rock':
           gameWinner = 'YOU WIN'           
            break;
    
        case 'paper':
           gameWinner = 'TIE'
            break;
       case 'scissors':
           gameWinner = 'YOU LOSE'
           break;
       }
}
if(realPlayer === 3){
    switch (tokenPlayed) {
        case 'rock':
           gameWinner = 'YOU LOSE'           
            break;
    
        case 'paper':
           gameWinner = 'YOU WIN'
            break;
       case 'scissors':
           gameWinner = 'TIE'
           break;
       }
}
}

gameArea.addEventListener('click', (e)=>{
    if (e.target.value !== undefined && e.target.value !== 'undefined' && gameArea.getAttribute('choose') !== '1' && gameArea.getAttribute('choose') !== '2' && gameArea.getAttribute('choose') !== '3') {
        let random = Math.floor(Math.random() * 100)
        var houseoption = {}
        if(random <= 33){
            houseoption ={
                url: '../images/icon-paper.svg',
                class: 'paper__container2',
                class2: 'paper'
            }
        }
        else if(random > 33 && random >= 66){
            houseoption ={
                url: '../images/icon-rock.svg',
                class: 'rock__container2',
                class2: 'rock'
            }
        }
        else{
            houseoption ={
            url: '../images/icon-scissors.svg',
            class: 'scissors__container2',
            class2: 'scissors'
        }
        }

        gameArea.setAttribute('choose', e.target.value)
        const paragraph = document.createElement('p')
        const paragraph2 = document.createElement('p')
        const div = document.createElement('div')
        div.classList.add('unknown__container')
        paragraph.classList.add('created__paragraph')
        paragraph2.classList.add('created__paragraph2')
        paragraph.textContent = 'YOU PICKED'
        paragraph2.textContent = 'THE HOUSE PICKED'
        fragment.appendChild(paragraph)
        fragment.appendChild(paragraph2)
        fragment.appendChild(div)
        tokenArea.appendChild(fragment)

        setTimeout(()=>{
           const housePick = document.createElement('img')
           housePick.src = houseoption.url
           housePick.classList.add(houseoption.class2)
           div.classList.replace('unknown__container', houseoption.class)
           div.appendChild(housePick)
        }, 1000)
        setTimeout(()=>{
            document.body.style.setProperty('--after-border', 'radial-gradient(circle at center, #ffffff09 20%, transparent 20%, #ffffff09 25%, transparent 25%, #ffffff09 30%, transparent 30%)')
            chooseWinner(e.target.value, houseoption.class2)
            document.querySelector('.another__created-paragraph').textContent = gameWinner
            document.querySelector('.another__created-paragraph').style.display = 'block'

            playAgain.addEventListener('click', ()=>{
                try{
                    tokenArea.removeChild(div)
                    tokenArea.removeChild(paragraph)
                    tokenArea.removeChild(paragraph2)
                    document.querySelector('.another__created-paragraph').style.display = 'none'
                    document.body.style.setProperty('--after-border', 'transparent')
                    gameArea.setAttribute('choose', '0')
                    playAgain.style.display = 'none'
                }
                catch{}
                

            })

            playAgain.style.display = 'block'
            if(gameWinner === 'YOU WIN'){
                contador = contador + 1
                localStorage.setItem('wins', contador)
                score.textContent = contador
            }
            if(gameWinner === 'YOU LOSE'){
                console.log('perdio')
                contador = contador - 1
                localStorage.setItem('wins', contador)
                score.textContent = contador
            }
        }, 1000)
    }
    
})

document.querySelector('.modal__btn').addEventListener('click', ()=>{
    document.querySelector('.modal').style.display = 'none'
})
document.querySelector('.btn__rules').addEventListener('click', ()=>{
    console.log('click')
    document.querySelector('.modal').style.display = 'block'
})
