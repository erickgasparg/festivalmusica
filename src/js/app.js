document.addEventListener('DOMContentLoaded', function(){

    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija(){
    const header = document.querySelector('.header')
    const sobrefestival = document.querySelector('.sobre-festival')

    window.addEventListener('scroll', function(){
        if (sobrefestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
            
        }
        
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')

    const CANTIDAD_IMAGENES= 16
    for(let i=1; i <= CANTIDAD_IMAGENES; i++){
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;
        

        //Even handler es el proceso de detectar y responder a la interacción del usuario
        imagen.onclick = function(){
            mostrarImagen(i)
            // console.log('Diste Click', i);
            
        }

        galeria.appendChild(imagen)
        
    }
    
}

function mostrarImagen(i){
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;


    //Generar Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    //Boton cerrar modal
    // const cerrarModalBtn = document.createElement('BUTTON')
    // cerrarModalBtn.textContent = 'Cerrar'
    // cerrarModalBtn.classList.add('btn-cerrar')
    // cerrarModalBtn.onclick = cerrarModal

    //mostrar Contenido imagen y botón de cerrar
    modal.appendChild(imagen)
    // modal.appendChild(cerrarModalBtn)

    //Agragra al HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}
//cerrar el modal de imagen conanimación
function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
    
}

function resaltarEnlace() {
    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')


        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= (sectionTop - sectionHeight /3)){
                actual = section.id
                
            }
            
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
            
        })
    })
}