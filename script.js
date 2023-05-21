const Sites = [
    {
        name:"test 01",
        src:"https://petidev.tech"
    },
    {
        name:"test 02",
        src:"https://petidev.tech"
    }
]
const main = document.querySelector("main");

Sites.forEach(site =>{
    const card = document.createElement("dir");
    const title = document.createElement("h2");
    const frame = document.createElement("iframe");

    card.classList.add("card");
    title.innerText = site.name;
    frame.src = site.src;

    card.appendChild(title);
    card.appendChild(frame);
    main.appendChild(card);

})