$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })

    // setting owl carousel

    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('#hero-carousel').owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        nav:true,
        navText: navText,
        autoplay: true,
        autoplayHoverPause: true
    })

    $('#top-conferencias-slide').owlCarousel({
        items: 2,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            500: {
                items: 3
            },
            1280: {
                items: 4
            },
            1600: {
                items: 6
            }
        }
    })

    $('.conferencias-slide').owlCarousel({
        items: 1,
        dots: false,
        nav:true,
        navText: navText,
        margin: 15,
        responsive: {
            650: {
                items: 2
            },
            900: {
                items: 3
            },
            1280: {
                items: 4
            }
        }
    })
})

//hacer un pedido(Solicitud-request) a la API
fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        const usuario = data.results[1];
        const name = usuario.name;
        const especie = usuario.species;
        
        //mostrar por el navegador
        const userInfo = document.getElementById('user-info');
        userInfo.innerHTML = `${name}`;
        const userInfo2 = document.getElementById('user-job');
        userInfo2.innerHTML = `${especie}`;

        document.getElementById("user-photo").src = usuario.image;
    })
    .catch(error => {
        console.log("No se obtuvieron datos", error);
    });