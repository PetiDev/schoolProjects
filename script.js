const Sites = [
    {
        name: "test 01",
        src: "https://petidev.tech"
    },
    {
        name: "test 02",
        src: "https://petidev.tech"
    }
]
const main = document.querySelector("main");
const menu = document.querySelector("menu");
let counter = 0

Sites.forEach(site => {
    //uniqueID
    counter++

    //add site to main
    const card = document.createElement("dir");
    const title = document.createElement("h2");
    const frame = document.createElement("iframe");

    card.classList.add("card");
    card.id = `card_${counter}`
    title.innerText = site.name;
    frame.src = site.src;

    card.appendChild(title);
    card.appendChild(frame);
    main.appendChild(card);

    //add site to nav menu

    const navUrl = document.createElement("a");
    navUrl.href = `#card_${counter}`;
    navUrl.innerText = site.name

    menu.appendChild(navUrl);

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