$(document).ready(function () {


    InitializeTable();


});


function NewRole() {

   
    var Description = $("#txtDescription").val();
   
    var Opcion = 0;
    if (Description.length > 0) {
        mostrarSpinner();
        var role = { Opcion: Opcion, Description: Description, Status:true};
        $.ajax({
            url: '/Security/NewRole',
            type: 'POST',
            data: role,
        }).done(function (response) {

            if (response.includes("exitosamente")) {
                Swal.fire({
                    text: response,
                    icon: 'success',
                    didClose: () => {
                        $('#mdlAddRole').modal('hide');
                        RefresRole();
                    }
                });
            }
            else {
                Swal.fire('', response, 'error');
            }
        });
    } else {
        Swal.fire('', "Debe digitar una descripción", 'error');
    }

    ocultarSpinner();

}


function ModifyRole() {
    var ID_Role = $("#hdfID_Role").val();
    var Description = $("#txtModifyDescription").val();
    var Status = $("#chkModifyRole").prop("checked");
    var Opcion = 0;
    if (Description.length > 0 ) {
        var role = { Opcion: Opcion, ID_Role: ID_Role, Description: Description, Status: Status };
        $.ajax({
            url: '/Security/UpdateRole',
            type: 'POST',
            data: role,
        }).done(function (response) {

            if (response.includes("exitosamente")) {
                Swal.fire({
                    text: response,
                    icon: 'success',
                    didClose: () => {
                        $('#mdlModifyRole').modal('hide');
                        RefresRole();
                    }
                });

            }
            else {
                Swal.fire('', response, 'error');
            }
        });
    } else {
        Swal.fire('', "Debe digitar una descripción", 'error');
    }

}


function DeleteRole(button) {
    var ID_Role = $(button).data('idrole');

   
    Swal.fire({
        title: '¿Está seguro?',
        text: '¡Que desea borrar este registro!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí puedes realizar la acción de borrado
           

            var Opcion = 1;

            var role = { Opcion: Opcion, ID_Role: ID_Role };
            $.ajax({
                url: '/Security/DeleteRole',
                type: 'POST',
                data: role,
            }).done(function (response) {

                if (response.includes("exitosamente")) {
                    Swal.fire({
                        text: response,
                        icon: 'success',
                        didClose: () => {
                            RefresRole();
                        }
                    });

                }
                else {
                    Swal.fire('', response, 'warning');
                }
            });
        }
    });

}

function OpenModalModifyRole(button, modal) {

    var ID_Role = $(button).data('idrole');
    var description = $(button).data('description');
    var status = $(button).data('status');
    document.getElementById('txtModifyDescription').value = description;

    $("#chkModifyRole").prop("checked", JSON.parse(status.toLowerCase()))
    document.getElementById('hdfID_Role').value = ID_Role;
    OpenModal(modal);
}


function InitializeTable() {
    // Inicializa o reinicializa el DataTable
    $('#tblRole').DataTable({
        destroy: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        responsive: true,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-copy"></i> Copiar',
                title: 'Configuración'
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel"></i> Excel',
                title: 'Configuración'
            }
        ],
        lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No se encontraron registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "No hay registros disponibles",
            infoFiltered: "(filtrados de _MAX_ registros en total)",
            search: "Buscar:",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }
        }
    });
}

function RefresRole() {
    mostrarSpinner();
    $.ajax({
        url: '/Security/RefresRole',
        type: 'GET',

        success: function (partialView) {
            if ($.fn.DataTable.isDataTable('#tblRole')) {
                $('#tblRole').DataTable().destroy();
            }
            $('#contenedorVistaParcial').html(partialView);

            // Inicializa o reinicializa el DataTable
            $('#tblRole').DataTable({
                destroy: true,
                paging: true,
                lengthChange: true,
                searching: true,
                ordering: true,
                responsive: true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'copyHtml5',
                        text: '<i class="fa fa-copy"></i> Copiar',
                        title: 'Configuración'
                    },
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel"></i> Excel',
                        title: 'Configuración'
                    }
                ],
                lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
                language: {
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    zeroRecords: "No se encontraron registros",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    infoEmpty: "No hay registros disponibles",
                    infoFiltered: "(filtrados de _MAX_ registros en total)",
                    search: "Buscar:",
                    paginate: {
                        first: "Primero",
                        last: "Último",
                        next: "Siguiente",
                        previous: "Anterior"
                    }
                }
            });
        },
        error: function () {
            alert('Ha ocurrido un error al obtener los datos.');
        }
    });
    ocultarSpinner();

}