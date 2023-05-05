let two_selected_cards = []
let score = 0
let matched_cards_counter = 0
let cards_wrapper = document.getElementById('cards_wrapper')
let size;

let chooseOne = () => {
    let btn_4x4 = document.getElementById('btn_4x4')
    let btn_6x6 = document.getElementById('btn_6x6')

    btn_4x4.addEventListener('click', () => {
        size = 4
        displayCards(shuffleArray(imgs_4x4), 4)
    })
    btn_6x6.addEventListener('click', () => {
        size = 6
        displayCards(shuffleArray(imgs_6x6), 6)
    })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


let selectCard = (e) => {
    showScore(score)
    let id = parseInt(e.currentTarget.id)
    
    score++;
    two_selected_cards.push(id)
    
    let selectedCard = document.getElementById(id)
    selectedCard.classList.add('flipped')

    if(score % 2 === 0) {
        if(isCardsMatches(two_selected_cards[0], two_selected_cards[1], size)) {
            matched_cards_counter++;
            console.log(matched_cards_counter)
            two_selected_cards.map((card) => {
                let selectedCard = document.getElementById(card)
                selectedCard.classList.add('flipped')
                selectedCard.removeEventListener('click', selectCard, true)
            })
            two_selected_cards = []
        }
        else {
            setTimeout(() => {
                two_selected_cards.map((card) => {
                    let selectedCard = document.getElementById(card)
                    selectedCard.classList.remove('flipped')
                })
                two_selected_cards = []

                return 0
            }, 1000)
        }
    }

    youWin()
}

let displayCards = (shuffled_array, size) => {
    document.getElementById('btns_wrapper').style.display = 'none'

    for (let i = 0; i < shuffled_array.length; i++) {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('id', shuffled_array[i].id)

        if(size === 4) card.classList.add('four')
        if(size === 6) card.classList.add('six')

        card.innerHTML = `
            <div class="front">
                <img src=${shuffled_array[i].img} alt="">
            </div>
            <div class="back">${i}</div>
        `
        card.addEventListener('click', selectCard, true)
        cards_wrapper.appendChild(card)
    }

    flipAllCards()
}

let flipAllCards = () => {
    let cards = document.querySelectorAll('.card')

    cards.forEach((c) => {
        c.classList.add('flipped')
    })

    setTimeout(() => {
        cards.forEach((c) => {
            c.classList.remove('flipped')
        })

        timer()
    }, 3000)
}

let timer = () => {
    let time = 0;
    let intervalId = setInterval(() => {
        time++
        showTimer(time)
        if (youWin(time)) {
            clearInterval(intervalId);
        }
    }, 1000);
}

let showScore = (score) => document.getElementById('score').innerText = 'Score: ' + score

let showTimer = (time) => document.getElementById('time').innerText = 'Time: ' + time+ ' sec'

let youWin = (time) => {
    if(matched_cards_counter === size**2 / 2) {
        let container = document.getElementById('container')
        container.innerHTML = `
            <h1>You win!</h1>
            <h1>Score: ${score}</h1>
            <h1>Time: ${time} ec</h1>
        `
        return true
    }
    return false;
}

let isCardsMatches = (card1, card2, size) => {
    if(size === 4) return matches_4x4[card1] === card2 
    else return matches_6x6[card1] === card2 
}

chooseOne()