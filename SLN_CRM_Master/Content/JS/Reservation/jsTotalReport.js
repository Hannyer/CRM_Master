$(document).ready(function () {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con 0 al inicio
    var dd = String(today.getDate()).padStart(2, '0');      // Día con 0 al inicio

    var formattedDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById('txtCheckInTotalReport').value = formattedDate;
    document.getElementById('txtCheckOutTotalReport').value = formattedDate;

    ExportDataTotalReport(formattedDate, formattedDate);

});

function ExportDataTotalReport(checkIn, tmpCheckOut) {

    if (checkIn == '' || checkIn == undefined || tmpCheckOut == '' || tmpCheckOut == undefined) {
        checkIn = $('#txtCheckInTotalReport').val();
        tmpCheckOut = $('#txtCheckOutTotalReport').val();
    }

    var parameters = { checkIn: checkIn, tmpCheckOut: tmpCheckOut };

    $.ajax({
        url: '/ReservationReport/ExportDataTotalReport',
        type: 'POST',
        data: parameters,
    }).done(function (response) {
        $("#contenedorVistaParcialTotalReport").html(response);

        // Inicializa o reinicializa el DataTable
        $('#tblTotalReport').DataTable({
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
                    title: 'Reporte Total de Reservas del ' + checkIn + ' al ' + tmpCheckOut
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fa fa-file-excel"></i> Excel',
                    title: 'Reporte Total de Reservas del ' + checkIn + ' al ' + tmpCheckOut
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
}