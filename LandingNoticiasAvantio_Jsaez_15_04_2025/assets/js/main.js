
$(document).ready(function () {
    $('#modalAgregarNoticia').on('shown.bs.modal hidden.bs.modal', function () {
        $('#formularioNoticia')[0].reset();
    });

    $('#filtro').on('change', function() {
        filtroValor = $(this).val();
        sortFiltro(filtroValor);
    });
    
});


// Load de modales
fetch('assets/modals/modals.html')
    .then(response => response.text())
    .then(html => {
    document.getElementById('contenedorModales').innerHTML = html;
});


// Creación de tarjetas/noticias bebiendo del .json
//*Código picado con cierta ayuda del copilot
$.ajax({
    url: 'assets/data/noticiasDump.json', 
    method: 'GET',
    dataType: 'json',
    success: function (noticias) {
        noticias.forEach(function (noticia) {
            const tarjeta = `
                <div class="col-12 col-md-4 col-lg-6" data-fecha="${noticia.fecha}" data-fuente="${noticia.source}">
                    <div class="card h-100">
                        <img src="${noticia.imagen}" class="card-img-top img-fluid" alt="${noticia.titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${noticia.titulo}</h5>
                            <p class="card-text">${noticia.descripcion}</p>
                        </div>
                        <div class="card-footer text-muted d-flex justify-content-between">
                            <small class="text-start">${noticia.source}</small>
                            <small class="text-end">${noticia.fecha}</small>
                        </div>
                    </div>
                </div>
            `;
            $('#noticias').append(tarjeta);
        });
    },
    error: function (xhr, status, error) {
        console.error('Error al cargar las noticias:', error);
    }
});

// Func modal agregar noticia
function abrirModal() {
    const modal = new bootstrap.Modal(document.getElementById('modalAgregarNoticia'));
    modal.show();
}

// Func filtro
//*Código picado con cierta ayuda del copilot
function sortFiltro(valor) {

    const tarjetas = $('#noticias .col-12');

    let ordenadas;

    if (valor === 'fecha') {
        console.log('Ordenando por fecha');

        // Ordenamos ascendente fecha (a mas antiguas)
        ordenadas = tarjetas.sort(function(a, b) {
            const fechaA = $(a).data('fecha');  
            const fechaB = $(b).data('fecha');  

            return fechaB.localeCompare(fechaA);  
        });

    } else if (valor === 'source') {
        console.log('Ordenando por fuente');

        // Ordenamos fuente (alfabéticamente)
        ordenadas = tarjetas.sort(function(a, b) {
            const fuenteA = $(a).data('fuente');  
            const fuenteB = $(b).data('fuente');  

            return fuenteA.localeCompare(fuenteB); 
        });
    }

    // Reinsertamos las tarjetas ordenadas
    $('#noticias').html(ordenadas);
}


