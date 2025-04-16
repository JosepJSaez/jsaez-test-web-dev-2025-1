function validaciones() {

    console.log('test');

    const titulo = $('#titulo').val().trim();
    const fuente = $('#fuente').val().trim();
    const imagen = $('#imagen').val().trim();
    const cuerpo = $('#cuerpo').val().trim();


    // diferentes validaciones de formulario con expresiones regulares, comprobaciones de cadenas,
    //  carácteres no permitidos y correo, utilizo sweet alert para darle un toque menos tosco de forma rápida.
    //*Código picado con cierta ayuda del copilot

    const urlRegex = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*\.(jpg|png)$/i;
    const safeTextRegex = /^[^<>]{0,}$/;

    if (titulo.length < 5 || titulo.length > 100) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El título debe tener entre 5 y 100 caracteres.",
            footer: '<a href="#">Por favor, ajusta el título</a>'
        });
        return;
    }

    if (fuente.length < 5 || fuente.length > 150) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La fuente debe tener entre 5 y 150 caracteres.",
            footer: '<a href="#">Por favor, ajusta la fuente</a>'
        });
        return;
    }


    if (!urlRegex.test(imagen)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La URL de la imagen no es válida.",
            footer: '<a href="#">Por favor, ingresa una URL válida</a>'
        });
        return;
    }

    if (cuerpo.length > 700) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha excedido el máximo de caracteres permitido para el cuerpo de la noticia (700).",
            footer: '<a href="#">Por favor, reduce el tamaño del cuerpo</a>'
        });
        return;
    }

    if (!safeTextRegex.test(cuerpo)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El cuerpo contiene caracteres no permitidos (< o >).",
            footer: '<a href="#">Por favor, elimina los caracteres no permitidos</a>'
        });
        return;
    }

    //Tras validar y con SweetAlert, se inserta en la web/bdd la nueva noticia y se cierra el modal al confirmar el usuario.
    Swal.fire({
        icon: "success",
        title: "Formulario enviado",
        text: "Noticia creada correctamente.",
    }).then(() => {
        const fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual
    
        // Crear la nueva tarjeta con los atributos data-fecha y data-fuente
        //*Código picado con cierta ayuda del copilot
        
        const nuevaTarjeta = `
            <div class="col-12 col-md-4 col-lg-6" data-fecha="${fechaActual}" data-fuente="${fuente}">
                <div class="card h-100">
                    <img src="${imagen}" class="card-img-top img-fluid" alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${cuerpo}</p>
                    </div>
                    <div class="card-footer text-muted d-flex justify-content-between">
                        <small class="text-start">${fuente}</small>
                        <small class="text-end">${fechaActual}</small>
                    </div>
                </div>
            </div>
        `;
    
        //Insertar
        $('#noticias').append(nuevaTarjeta);
        // Ordenar
        const filtroSeleccionado = $('#filtro').val(); // Obtener el valor del filtro seleccionado
        sortFiltro(filtroSeleccionado); // Ordenar las tarjetas por fecha o fuente

        // Cerrar el modal
        $('#modalAgregarNoticia').modal('hide');
    });
};
