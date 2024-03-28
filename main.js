/**
 * @author Laura Luque
 * @date 25/01/2024
 */

{
    document.addEventListener("DOMContentLoaded", function() {
        const textarea = document.getElementById('textarea');
        const controlador = new AbortController;

        function suma(event) {
            event.target.textContent = Number(event.target.textContent) + 2;
        }

        function multiplica(event) {
            event.target.textContent = Number(event.target.textContent) * 2;
        }

        function tipo (e) {
            textarea.value += `\n type: ${e.type}`;
        }
 
        // Botón limpia
        document.getElementById('limpia').addEventListener("click", function(){
            textarea.value = '';
        });

        // Botón solo una vez
        document.querySelector('.solo-una-vez').addEventListener('click',function(){
            this.innerText += 'SEACABÓ'+'('+ new Date().getSeconds()+')';
            this.className = 'pulsado';
        }, { once: true });

        // Botón multiplica-suma
        document.getElementById('contenedor').addEventListener('click', function(e) {
            if (e.target.classList.contains('multiplica-suma')) {
                multiplica(e);
                textarea.value += `\n ${e.target.innerText} capture!`
            }
        }, true);

        document.getElementById('contenedor').addEventListener('click', function(e) {
            if (e.target.classList.contains('multiplica-suma')) {
                suma(e);
                textarea.value += `\n ${e.target.innerText} bubling!`
            }
        });

        // Botón suma-multiplica
        document.getElementById('contenedor').addEventListener('click', function(e) {
            if (e.target.classList.contains('suma-multiplica')) {
                suma(e);
                textarea.value += `\n ${e.target.innerText} capture!`
            }
        }, true);

        document.getElementById('contenedor').addEventListener('click', function(e) {
            if (e.target.classList.contains('suma-multiplica')) {
                multiplica(e);
                textarea.value += `\n ${e.target.innerText} bubling!`
            }
        });

        // Elimina eventos con signal
        for (const boton of document.getElementsByClassName("mouse-event-1")) {
            boton.addEventListener(boton.textContent, function(e){
                textarea.value += `\n type: ${e.type}`
            }, {signal: controlador.signal});
        }
        document.getElementsByClassName("remove-mouse-signal")[0].addEventListener('click', function(){
            controlador.abort();
        });

        // Elimina eventos con removeEventListener
        for (const boton of document.getElementsByClassName("mouse-event-2")) {
            boton.addEventListener(boton.textContent, tipo);
        }
        document.getElementsByClassName("remove-event-listener")[0].addEventListener('click', function(){
            for (const boton of document.getElementsByClassName("mouse-event-2")) {
                boton.removeEventListener(boton.textContent, tipo);
            }
        });
    });
}
