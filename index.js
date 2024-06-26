$(document).ready(async () => {

    await populateHeroes(6);

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
