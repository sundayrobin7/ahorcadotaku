document.addEventListener('DOMContentLoaded', function () {
    const palabras = ['naruto', 'inuyasha', 'anime', 'luffy', 'ramen', 'kakashi', 'saitama', 'goku', 'vegeta', 'pikachu'];
    let adivinar = [];
    let mostrar = [];
    let numIntentos = 5;
    let letra = document.querySelector('#letra');
    let boton = document.querySelector('#boton');
    let result = document.querySelector('#resultado');
    let intentos = document.querySelector('#intentos');

// selecciona una palabra del arreglo palabras de manera aleatoria, y en cada intento repinta la pantalla
    function iniciar () {
        let posicion = _.random(palabras.length - 1);
        let pAleatoria = palabras[posicion];
        adivinar = pAleatoria.split('');
        for (let letra of adivinar) {
            mostrar.push('_');
        }
        repintarPantalla();
    }

//vuelve a cargar todos los componentes de la pantalla con los nuevos valores
    function repintarPantalla () {
        result.textContent = mostrar.join(' ');
        intentos.textContent = numIntentos;
    }

//verifica si la letra ingresada es correcta y si los numeros de intentos restantes ya se acabaron
    function verificar () {
        let ingresada = letra.value;
        letra.value = '';
        letra.focus();
        for (const [posicion, aAdivinar] of adivinar.entries()) {
            if (ingresada == aAdivinar) {
                mostrar[posicion] = aAdivinar;
            }
        }
        if (!adivinar.includes(ingresada)) {
            numIntentos -= 1;
        }
        finalizar();
        repintarPantalla();
    }

// verifica si el usuario pulso la tecla enter para verificar la letra ingresada
    function pulsoEnter (evento) {
        if (evento.code == 'Enter') {
            verificar();
        }
    }

//muestra los resultados y un mensaje si perdiste o ganaste y reinicia el juego
    function finalizar () {
        if (!mostrar.includes('_')) {
            alert('Muy bien!!! era '+ adivinar.join('') +', acertaste dattebayo!!!');
            location.reload(true);
        }
        if (numIntentos == 0) {
            alert('Fallaste Sasuke!!! Era: ' + adivinar.join('') + '. Te falta odio');
            location.reload(true);
        }
    }

    //agrega evento al boton y verifica la tecla pulsada
    boton.addEventListener('click', verificar);
    letra.addEventListener('keyup', pulsoEnter);

    //carga los componentes en pantalla
    iniciar(); 
});