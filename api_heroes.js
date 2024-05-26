async function API_fetch(url){
    let api_results = []
    let respuesta = await fetch(url).then(response => response.json());
    do {
        api_results = api_results.concat( respuesta.results);
        respuesta = await fetch(respuesta.info.next).then(response => response.json());
    } while (respuesta.info.next);
    api_results = api_results.concat( respuesta.results);
    // console.log('_end', api_results);
    return api_results;
}

async function populateHeroes(iterations) {
    const url = 'https://rickandmortyapi.com/api/character';
    const Heroes = await API_fetch(url);
    const section = document.getElementById("conferencias-slide");
    // const section = document.querySelector("#conferencia-item-0");
    // const section = document.querySelector("#section-conferencias > div > div.conferencias-slide.carousel-nav-center.owl-carousel.owl-loaded.owl-drag")

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    };

    Titles = [
        "10 tips para elevar el rendimiento de sus sitios web",
        "From zero to AI engineer",
        "Construyendo Bajo Presión: cómo armar el primer MVP de tu startup en 2024",
        "¡Conviértete en un Centauro del Código Limpio!",
        "10 tips para elevar el rendimiento de sus sitios web",
        "From zero to AI engineer",
        "Construyendo Bajo Presión: cómo armar el primer MVP de tu startup en 2024",
        "¡Conviértete en un Centauro del Código Limpio!",
        "10 tips para elevar el rendimiento de sus sitios web",
        "From zero to AI engineer",
        "Construyendo Bajo Presión: cómo armar el primer MVP de tu startup en 2024",
        "¡Conviértete en un Centauro del Código Limpio!"
    ];

    for (let i=0; i<iterations; i++) {
        // Declare elements of the block
        const conferenciaItem = document.createElement("a");
        const img = document.createElement("img");
        const divContent = document.createElement("div");
        const divTitle = document.createElement("div");
        const divInfos = document.createElement("div");
        const divInfo = document.createElement("div");
        const iUserPin = document.createElement("i");
        const divUserInfo = document.createElement("div");
        const divInfoJob = document.createElement("div");
        const iPurchase = document.createElement("i");
        const divUserJob = document.createElement("div");
        // Set properties of the elements
        conferenciaItem.href = "./pages/detalle.html";
        conferenciaItem.className = "conferencia-item";
        var character = Heroes[getRandomInt(Heroes.length)];
        img.src = character.image;
        img.id = "user-photo";
        img.alt = "";
        divContent.className = "conferencia-item-content";
        divTitle.className = "conferencia-item-title";
        divTitle.innerHTML = Titles[getRandomInt(Titles.length)];
        divInfos.className = "conferencia-infos";
        divInfo.className = "conferencia-info";
        iUserPin.className = 'bx bxs-user-pin';
        divUserInfo.id = "user-info";
        divUserInfo.innerHTML = character.name;
        divInfoJob.className = "conferencia-info-job";
        iPurchase.className = 'bx bxs-purchase-tag-alt';
        divUserJob.id = "user-job";
        divUserJob.innerHTML = character.species + " from " + character.origin.name;
        // Append elements
        divInfo.appendChild(iUserPin);
        divInfo.appendChild(divUserInfo);
        divInfos.appendChild(divInfo);
        divInfoJob.appendChild(iPurchase);
        divInfoJob.appendChild(divUserJob);
        divInfos.appendChild(divInfoJob);
        divContent.appendChild(divTitle);
        divContent.appendChild(divInfos);
        conferenciaItem.append(img);
        conferenciaItem.append(divContent);
        section.insertBefore(conferenciaItem, section.firstChild);
        section.removeChild(section.lastChild)
    }
}

