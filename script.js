const Sites = [
    {
        name: "Paralimpia",
        src: "./src/paralimpia/paralimpia.html"
    },
    {
        name: "Év madara",
        src: "./src/evMadara/evmadara.html"
    },
    {
        name: "Memoria",
        src: "./src/memoria/"
    },
    {
        name: "test 04",
        src: "https://petidev.tech"
    },
    {
        name: "test 05",
        src: "https://petidev.tech"
    },
    {
        name: "test 06",
        src: "https://petidev.tech"
    },
    {
        name: "test 07",
        src: "https://petidev.tech"
    },
    {
        name: "test 08",
        src: "https://petidev.tech"
    },
]
const main = document.querySelector("main");
const menu = document.querySelector("menu");
let counter = 0

Sites.forEach(site => {
    //uniqueID
    counter++

    //add site to main
    const card = document.createElement("a");
    const title = document.createElement("h2");
    const frame = document.createElement("iframe");

    card.classList.add("card");
    card.id = `card_${counter}`;
    card.href = site.src;
    card.target = "theSite"
    title.innerText = site.name;
    frame.src = site.src;
    frame.scrolling = "no";
    card.tabIndex = counter+1

    card.appendChild(title);
    card.appendChild(frame);
    main.appendChild(card);

    //add site to nav menu

    const navUrl = document.createElement("a");
    navUrl.href = `#card_${counter}`;
    navUrl.innerText = site.name

    menu.appendChild(navUrl);

})


//menü bezárása ha kattint
const menuCheckbox = document.getElementById("menuCheckbox");
document.addEventListener("mousedown", ()=>{
    let isChechked = menuCheckbox.checked;
    setTimeout(() => {
        if (isChechked) {
            menuCheckbox.checked = false;
        }
    }, 80);
})
document.addEventListener("touchstart", ()=>{
    if (isChechked) {
        menuCheckbox.checked = false;
    }
})



//vissza a tetejére
const scrollTop = document.getElementById("scrollTop")
document.addEventListener("scroll",()=>{
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        console.log("asd");
        scrollTop.style.display = "block";
    }else{
        scrollTop.style.display = "none";
    }

})
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


//egyértelműen nem egy easteregg
const notAnEasteregg = document.querySelector("header a");
let notACounter = 0;

document.addEventListener("click", ()=>{
    notACounter++
    if (notACounter >= 30) {
        notAnEasteregg.style.display = "flex";
    }

})
