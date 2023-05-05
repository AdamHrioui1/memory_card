let imgs_4x4 = [
    {
        id: 0,
        img: 'https://images.pexels.com/photos/13445143/pexels-photo-13445143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 1,
        img: 'https://images.pexels.com/photos/12101739/pexels-photo-12101739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 2,
        img: 'https://images.pexels.com/photos/14744772/pexels-photo-14744772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 3,
        img: 'https://images.pexels.com/photos/16247029/pexels-photo-16247029.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    },
    {
        id: 4,
        img: 'https://images.pexels.com/photos/16284431/pexels-photo-16284431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 5,
        img: 'https://images.pexels.com/photos/15031194/pexels-photo-15031194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 6,
        img: 'https://images.pexels.com/photos/16668378/pexels-photo-16668378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 7,
        img: 'https://images.pexels.com/photos/16596851/pexels-photo-16596851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 8,
        img: 'https://images.pexels.com/photos/13445143/pexels-photo-13445143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 9,
        img: 'https://images.pexels.com/photos/12101739/pexels-photo-12101739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 10,
        img: 'https://images.pexels.com/photos/14744772/pexels-photo-14744772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 11,
        img: 'https://images.pexels.com/photos/16247029/pexels-photo-16247029.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    },
    {
        id: 12,
        img: 'https://images.pexels.com/photos/16284431/pexels-photo-16284431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 13,
        img: 'https://images.pexels.com/photos/15031194/pexels-photo-15031194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 14,
        img: 'https://images.pexels.com/photos/16668378/pexels-photo-16668378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 15,
        img: 'https://images.pexels.com/photos/16596851/pexels-photo-16596851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
];

let matches_4x4 = {
    0: 8,
    1: 9,
    2: 10,
    3: 11,
    4: 12,
    5: 13,
    6: 14,
    7: 15,
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 6,
    15: 7
}

let Array_4x4 = new Array(16).fill('')
let two_selected_cards = []
let score = 0
let matched_cards_counter = 0
let shuffled_array_4x4 = shuffleArray(imgs_4x4)
let cards_wrapper = document.getElementById('cards_wrapper')

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
        if(isCardsMatches(two_selected_cards[0], two_selected_cards[1])) {
            matched_cards_counter++;
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

let displayCards = () => {
    for (let i = 0; i < shuffled_array_4x4.length; i++) {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('id', shuffled_array_4x4[i].id)

        card.innerHTML = `
            <div class="front">
                <img src=${shuffled_array_4x4[i].img} alt="">
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

let showTimer = (time) => document.getElementById('time').innerText = 'Time: ' + time

let youWin = (time) => {
    if(matched_cards_counter === 8) {
        let container = document.getElementById('container')
        container.innerHTML = `
            <h1>You win!</h1>
            <h1>Score: ${score}</h1>
            <h1>Time: ${time}</h1>
        `
        return true
    }
    return false;
}

let isCardsMatches = (card1, card2) => matches_4x4[card1] === card2
displayCards()