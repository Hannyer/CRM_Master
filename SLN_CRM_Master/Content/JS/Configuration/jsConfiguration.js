$(document).ready(function () {

    // Inicializa o reinicializa el DataTable
    $('#tblConfiguration').DataTable({
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


});


function GetDataForTableToTxt() {
    // Manejar clic en una fila de la tabla
    document.getElementById('tblConfiguration').addEventListener('click', function (e) {
        // Verificar si se hizo clic en una celda (td)
        if (e.target.tagName === 'TD') {
            // Obtener la fila (tr) asociada a la celda clicada
            var fila = e.target.closest('tr');

            var Key03 = fila.cells[2].innerText;
            var Key04 = fila.cells[3].innerText;
            var Key05 = fila.cells[4].innerText;
            var Key06 = fila.cells[5].innerText;
            var Value = fila.cells[6].innerText;

            // Actualizar el valor del textbox con los datos de la fila
            document.getElementById('txtKey03').value = Key03;
            document.getElementById('txtKey04').value = Key04;
            document.getElementById('txtKey05').value = Key05;
            document.getElementById('txtKey06').value = Key06;
            document.getElementById('txtValue').value = Value;
        }
    });
}
function updateInputFields(row) {
    // Actualizar los campos de entrada con los datos de la fila seleccionada
    var Key03 = row.find('td:eq(2)').text();
    var Key04 = row.find('td:eq(3)').text();
    var Key05 = row.find('td:eq(4)').text();
    var Key06 = row.find('td:eq(5)').text();
    var Value = row.find('td:eq(6)').text();

    $('#txtKey03').val(Key03);
    $('#txtKey04').val(Key04);
    $('#txtKey05').val(Key05);
    $('#txtKey06').val(Key06);
    $('#txtValue').val(Value);
}
function ModifyConfiguration(button) {
    var ConfigurationJson = button.getAttribute("data-configuration");
    var configuration = JSON.parse(ConfigurationJson);

    $('#txtKey03').val(configuration.KEY03);


    $('#txtKey04').val(configuration.KEY04);


    $('#txtKey05').val(configuration.KEY05);


    $('#txtKey06').val(configuration.KEY06);


    $('#txtValue').val(configuration.VALUE);

    OpenModal('mdlModifyConfiguration');
}
function Validate() {

    if ($("#txtKey03").val() === '') {
        Swal.fire('', 'Debe seleccionar la configuración a modificar', 'error');
        return false;
    }
    if ($("#txtKey04").val() === '') {
        Swal.fire('', 'Debe seleccionar la configuración a modificar', 'error');
        return false;
    }
    if ($('#txtValue').val() === '') {
        Swal.fire('', 'Debe digitar el valor de la configuración', 'error');
        return false;
    }


    return true;
}
function Empty() {
    $("#txtKey03").val('');
    $("#txtKey04").val('');
    $("#txtKey05").val('');
    $("#txtKey06").val('');
    $("#txtValue").val('');
}
function UpdateSettings() {
    var Opcion = 0;
    var KEY03 = $("#txtKey03").val();
    var KEY04 = $("#txtKey04").val();
    var KEY05 = $("#txtKey05").val();
    var KEY06 = $("#txtKey06").val();
    var VALUE = $("#txtValue").val();


    if (Validate()) {
        var configuracion = {
            Opcion: Opcion,
            KEY03: KEY03,
            KEY04: KEY04,
            KEY05: KEY05,
            KEY06: KEY06,
            VALUE: VALUE
        };

        Swal.fire({
            title: '¿Estás seguro de modificar el registro?',
            text: 'Esta acción actualizará los ajustes. ¿Deseas continuar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, modificar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/Configuration/UpdateConfiguration',
                    type: 'POST',
                    data: configuracion,
                }).done(function (response) {
                    if (response.includes("exitosamente")) {
                        Swal.fire('', response, 'success').then(() => {
                            window.location.href = '/Configuration/Index';
                        });
                    } else {
                        Swal.fire('', response, 'warning');
                    }
                });
            }
        });
    }
    else {
        return
    }


}