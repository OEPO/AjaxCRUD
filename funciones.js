$(document).ready(function() {
    let edit = false;
    ObtenerProductos();

    $("#Rbusqueda").hide();
    $("#busqueda").keyup(function(e) {
        if ($("#busqueda").val()) {
            let search = $("#busqueda").val();
            $.ajax({
                url: 'buscador.php',
                type: 'POST',
                data: { search: search },
                success: function(response) {
                    let datos = JSON.parse(response);
                    let template = '';
                    datos.forEach(element => {
                        template += `<li>
                    ${element.nombre}
                    </li>`;
                        // console.log(element);

                    });
                    $("#container").html(template);
                    $("#Rbusqueda").show();

                }
            });
        }
    });


    $('#Fproductos').submit(function(e) {
        const Rdatos = {
            nombre: $('#nombre').val(),
            codigo: $('#codigo').val(),
            categoria: $('#categoria').val(),
            frase_promocional: $('#frase_promocional').val(),
            descripcion: $('#descripcion').val(),
            colores: $("#colores").val(),
            precio: $("#precio").val(),
            disponibilidad: $('#disponibilidad').val(),
            promocion: $('#promocion').val(),
            fecha: $('#fecha').val(),
            id: $("#ProductoID").val()
        };
        let url = edit === false ? 'add.php' : 'edit.php';
        $.post(url, Rdatos, function(response) {
            ObtenerProductos();
            console.log(response);
            $("#Fproductos").trigger('reset');
        });
        //console.log(Rdatos);
        e.preventDefault();
    });


    function ObtenerProductos() {
        $.ajax({
            url: "listar.php",
            type: "GET",
            success: function(response) {
                let template = '';

                let Productos = JSON.parse(response);

                Productos.forEach(element => {
                    template += `<tr productoID="${element.id}">
                <td>${element.id}</td>
                <td><a href="#" class="Iproducto">${element.nombre}</a></td>
                <td>${element.codigo}</td>
                <td>${element.categoria}</td>
                <td>${element.frase_promocional}</td>
                <td>${element.descripcion}</td>
                <td>${element.colores}</td>
                <td>${element.precio}</td>
                <td>${element.disponibilidad}</td>
                <td>${element.promocion}</td>
                <td>${element.fecha}</td>
                <td>
                <button class="producto-borrar btn btn-danger">Eliminar</button>
                </td>
                </tr>`;
                });
                $("#tabla-productos").html(template);


            }
        });

    };

    $(document).on('click', '.producto-borrar', function() {
        if (confirm("¿Estas seguro de querer eliminar el producto?")) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('productoID');
            $.post('eliminar.php', { id }, function(response) {
                //console.log(response)
                alert(`se elimino correctamente el elemento con ID: ${id}`);
                ObtenerProductos();
            });
        }
        //console.log(id);

    });

    $(document).on("click", '.Iproducto', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('productoID');
        $.post('productounico.php', { id }, function(response) {
            const producto = JSON.parse(response);
            $('#nombre').val(producto.nombre);
            $('#codigo').val(producto.codigo);
            $('#categoria').val(producto.categoria);
            $('#frase_promocional').val(producto.frase_promocional);
            $('#descripcion').val(producto.descripcion);
            $("#colores").val(producto.colores);
            $("#precio").val(producto.precio);
            $('#disponibilidad').val(producto.disponibilidad);
            $('#promocion').val(producto.promocion);
            $('#fecha').val(producto.fecha);
            $("#ProductoID").val(producto.id);
            edit = true;


        });
    });


});