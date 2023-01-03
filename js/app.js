const textoIngreso = document.getElementById('texto-ingreso_input');
const botonEncriptar = document.getElementById('boton-encriptar');
const botonDesencriptar = document.getElementById('boton-desencriptar');
const textoEncriptado = document.getElementById('mensaje-encriptado-tipo-dos_texto');
const botonCopiar = document.getElementById('boton-copiar');

const mensajeEncriptadoUno = document.getElementById('mensaje-encriptado-tipo-uno');
const mensajeEncriptadoDos = document.getElementById('mensaje-encriptado-tipo-dos');

const botonBorrar = document.getElementById('cancel-icon');

let claves = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
};

const textoIngresoEsValido = (textoEscrito) => {
    //Si el texto esta vacio o si comienza con uno o mas espacios
    if(textoEscrito == '' || /^\s+/.test(textoEscrito)){
        return false;
    }
    //Se busca si solo contiene letras minusculas
    let expReg =  /^[a-z\s]+$/g;
    return expReg.test(textoEscrito);
};


const encriptarTexto = (textoEscrito) => {
    for(let i=0; i< Object.values(claves).length; i++){
        textoEscrito = textoEscrito.replaceAll(Object.keys(claves)[i], Object.values(claves)[i]);
    }
    return textoEscrito;
}

const mostrarTextoEncriptado = () =>{
    mensajeEncriptadoUno.classList.remove('mensaje-encriptado-tipo-uno-active');
    mensajeEncriptadoDos.classList.add('mensaje-encriptado-tipo-dos-active');    
}

const borrarTextoEscrito = () => {
    textoIngreso.value = '';
}

const desencriptarTexto = (txtEncriptado) => {
    for(let i=0; i<Object.values(claves).length; i++){
        txtEncriptado = txtEncriptado.replaceAll(Object.values(claves)[i],Object.keys(claves)[i]);
    }
    return txtEncriptado;
}

const verificarMsjIngreso = () => {
    let txtEscrito = textoIngreso.value;
    if(textoIngresoEsValido(txtEscrito) || txtEscrito == ''){
        textoIngreso.classList.remove('texto-ingreso_input-error');
        document.getElementById('texto-ingreso-info').classList.remove('texto-ingreso-info-error');
    }else{
        textoIngreso.classList.add('texto-ingreso_input-error');
        document.getElementById('texto-ingreso-info').classList.add('texto-ingreso-info-error');
    }
}

const mostrarMsjCopiado = () => {
    document.getElementById('ventana-copiado').classList.add('ventana-copiado-active');
    setTimeout( () => {//despues de 1seg se borra
        document.getElementById('ventana-copiado').classList.remove('ventana-copiado-active');
    }, 1000);
}

botonEncriptar.addEventListener('click', (e) => {
    let txtEscrito = textoIngreso.value;
    if(textoIngresoEsValido(txtEscrito)){
        let txtEncriptado = encriptarTexto(txtEscrito);
        mostrarTextoEncriptado();
        borrarTextoEscrito();
        textoEncriptado.textContent = txtEncriptado;
    }
});

botonDesencriptar.addEventListener('click', (e) => {
    let txtEncriptado = textoIngreso.value;
    if(textoIngresoEsValido(txtEncriptado)){
        let txtDesencriptado = desencriptarTexto(txtEncriptado);
        mostrarTextoEncriptado();
        borrarTextoEscrito();
        textoEncriptado.textContent = txtDesencriptado;
    }
});

botonCopiar.addEventListener('click', (e) => {
    let text = textoEncriptado.innerHTML;
    navigator.clipboard.writeText(text)
    .then(() => {
        mostrarMsjCopiado();
        console.log('Text copied to clipboard');
    })
    .catch(err => {
        console.error('Error in copying text: ', err);
    });
});

textoIngreso.addEventListener('keyup', () => {
    if(textoIngreso.value == ''){
        botonBorrar.classList.remove('cancel-icon-active');
    }else{
        botonBorrar.classList.add('cancel-icon-active');
    }
    verificarMsjIngreso();
});

botonBorrar.addEventListener('click', () => {
    textoIngreso.value = '';
    verificarMsjIngreso();
    mensajeEncriptadoDos.classList.remove('mensaje-encriptado-tipo-dos-active');
    mensajeEncriptadoUno.classList.add('mensaje-encriptado-tipo-uno-active');
    botonBorrar.classList.remove('cancel-icon-active');
});

window.onload = function () {
    textoIngreso.focus();
}