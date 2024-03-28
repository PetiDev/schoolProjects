/*

Egyértelműen lehetne jobb, de beleuntam kicsit

Ha fehér a "mentett játék" gomb akkor lesz mentve a játék

Ha rákattint egy mentett rekordra akkor törlődik

*/

const mainElement = document.querySelector("main");
const differentCardAmountElement = document.querySelector("#differentCardAmount")
const pairsFoundElement = document.querySelector("#pairsFound")
const tryesElement = document.querySelector("#tryes")
const timerElement = document.querySelector("#timer")
const isGameSavedElement = document.querySelector("#isGameSaved")
const scoreboardElement = document.querySelector("#scoreboard")

//dialog stuff
const saveGameDialogElement = document.querySelector("#saveGameDialog")
const usernameElement = document.querySelector("#username")


const TIME_BEFORE_ACTION = 700 //ms
const MIN_DIFFERENT_CARDS = 2
const MAX_DIFFERENT_CARDS = 25
const AMOUNT_OF_MATCHING_CARDS = 2
const PATTERN_ON_CARD = "♥♣♦♠"

class Timer {
    value = 0;
    clock = undefined;

    constructor(timerTickTimeout, runOnTick = ()=>{}){
        this.clock = setInterval(() => {
            this.value++

            runOnTick(this.value)
        }, timerTickTimeout);
    }

    stopTimer(){
        clearInterval(this.clock)
    }
};

let cards = [
    {
        value: 1,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 2,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 3,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 4,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 5,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 6,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 7,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 8,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 9,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
    {
        value: 0,
        amount: AMOUNT_OF_MATCHING_CARDS
    },
]

let pairsFound = 0
let tryes = 0

let activeCards = []
let timer = undefined;

let scores = localStorage.getItem("scores")?JSON.parse(localStorage.getItem("scores")):[];
let baseAmountOfCards = cards.length

//create the card element with text
//called by (generateCards)
const createCardTxt = (data, index) => {
    return `<section class="card" data-value="${data}" id="card${index}">
    <dir class="content">
        <div class="front">
        ${PATTERN_ON_CARD}
        </div>
        <div class="back">
            ${data}
        </div>
    </dir>
</section>`
}

//runs when all pairs were found
//called by (cardsMatch)
const gameOver = () => {
    timer.stopTimer()
    if (isGameSavedElement.dataset.save == "true") {
        saveGameDialogElement.show()
    }
    console.log(`It took ${timer.value}ms to complete`);
    console.log(`It took ${tryes} tryes to complete`);
}

const timerTickTask = (time) => {
    timerElement.innerText = `${time}ms`
}

//runs when first click is made
//called by (checkCardMatch)
const gameStart = () => {
    timer = new Timer(1, timerTickTask)
}

// Generate all cards which were given in the [cards] Array
//called by (main)
const generateCards = () => {
    mainElement.innerHTML = ""

    for (x = 0; x < baseAmountOfCards * 2; x++) {
        cards = cards.filter(f => f.amount);
        let randomCardIndex = Math.floor(Math.random() * cards.length)
        //console.log({randomCardIndex, cards});
        cards[randomCardIndex].amount--
        mainElement.innerHTML += createCardTxt(cards[randomCardIndex].value, x)
    }

    addListenerToCards()
}

// Runs if the [activeCards] are matching
//called by (checkCardMatch)
const cardsMatch = () => {
    pairsFoundElement.innerText = `${++pairsFound}`
    //check if all pairs are found
    if (pairsFound === baseAmountOfCards) gameOver();

    activeCards.map(m => {
        let c = document.querySelector(`#${m.id}`);
        c.classList.add("used")
        c.classList.remove("active")
    })
    activeCards = []
}

// Runs if the [activeCards] are NOT matching
//called by (checkCardMatch)
const cardsDontMatch = () => {
    activeCards.map(m => {
        document.querySelector(`#${m.id}`)?.classList.remove("active");
    })
    activeCards = []
}

// Runs if the [activeCards] length == 2
// AKA. if two cards are selected
//called by (cardClickHandlaer)
const checkCardMatch = () => {
    tryesElement.innerText = `${++tryes}`
    if (tryes == 1) gameStart();

    if (activeCards[0].value === activeCards[1].value) return cardsMatch();
    return cardsDontMatch();
}

// It is what it sounds like (cardClickHandlaer)
const cardClickHandlaer = ({ target }) => {
    const card = target.parentElement.parentElement
    if (target.classList.contains("back")) return;
    if (card.classList.contains("active")) return;
    if (card.classList.contains("used")) return;
    if (activeCards.length >= AMOUNT_OF_MATCHING_CARDS) return;

    activeCards.push({
        id: card.id,
        value: card.dataset.value
    });
    card.classList.add("active");
    if (activeCards.length >= AMOUNT_OF_MATCHING_CARDS) return setTimeout(checkCardMatch, TIME_BEFORE_ACTION);
}

// It is what it sounds like (addListenerToCards)
//called by (main)
const addListenerToCards = () => {
    document.querySelectorAll(".card").forEach(c => {
        c.addEventListener("click", cardClickHandlaer)
    })
}

// Find the divisors of given {n} number
const findDivisors = (n) => {
    const divisors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
};

const isPrime = (n) =>{
    if (n === 1) {
        return false
    }
    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true
}

// Set values to default
// Regenerate cards
// Called on buttonclick
const restart = () => {
    if (Number(differentCardAmountElement.value) < MIN_DIFFERENT_CARDS || Number(differentCardAmountElement.value) > MAX_DIFFERENT_CARDS) return;

    //reset values
    if (timer) timer.stopTimer();
    timer = undefined;
    tryes = 0;
    pairsFound = 0;
    cards = [];

    //generate cards
    for (let index = 0; index < Number(differentCardAmountElement.value); index++) {
        cards.push({ value: index, amount: AMOUNT_OF_MATCHING_CARDS });
    }

    //if the numbr is prime sort it in 10 columns
    //else sort elements to even columns
    if (isPrime(Number(differentCardAmountElement.value))) {
        if (Number(differentCardAmountElement.value) < 10) {
            mainElement.style.gridTemplateColumns = `repeat(${Number(differentCardAmountElement.value)},1fr)`
            
        }else{
            mainElement.style.gridTemplateColumns = `repeat(10,1fr)`
        }
    }else{
        mainElement.style.gridTemplateColumns = `repeat(${findDivisors(Number(differentCardAmountElement.value) * 2).sort((a, b) => a < b).filter(f => f < 11 && f != Number(differentCardAmountElement.value))[0]},1fr)`
    }
    baseAmountOfCards = cards.length
    main()
}





const deleteRecordFromLeaderboard = (id) => {
    scores = scores.filter(f => f.id != id)
    console.log(id);
    console.log(scores);
    updateLocalStorage()
}


const handleClickOnLeaderboard = ({target}) => {
    deleteRecordFromLeaderboard(target.id)
}

const addEventListenerToScoreboardRecords = () => {
    document.querySelectorAll(".scoreboardRecord").forEach(record => {
        record.addEventListener("click", handleClickOnLeaderboard)
    })
}

const createLeaderboardRecordTxt = (score, i) => {
    return `<div class="scoreboardRecord" id="${score.id}">
    <p>${i}</p>
    <h3>${score.username}</h3>
    <p>${score.time}ms</p>
    <p></p>
</div>`
}

const loadScoreBoard = () => {
    scores = scores.sort((a,b) => a.time > b.time)
    scoreboardElement.innerHTML = ""
    scores.forEach((score,i) => {
        scoreboardElement.innerHTML += createLeaderboardRecordTxt(score,i+1)
    });
    addEventListenerToScoreboardRecords()
}


const updateLocalStorage = () => {
    localStorage.setItem("scores", JSON.stringify(scores))

    loadScoreBoard()
}

const toggleSavedGame = () => {
    if (isGameSavedElement.dataset.save == "false") {
        isGameSavedElement.dataset.save = "true"
    }else{
        isGameSavedElement.dataset.save = "false"
    }
}

const dialogSaveButton = () => {
    scores.push({username: usernameElement.value, time: timer.value, id: `record${usernameElement.value}_${timer.value}`})

    updateLocalStorage()
    saveGameDialogElement.close()
}





const main = () => {
   generateCards()
   
   loadScoreBoard()
}
main()