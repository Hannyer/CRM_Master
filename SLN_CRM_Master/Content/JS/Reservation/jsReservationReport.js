$(document).ready(function () {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con 0 al inicio
    var dd = String(today.getDate()).padStart(2, '0');      // Día con 0 al inicio

    var formattedDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById('txtCheckIn').value = formattedDate;
    document.getElementById('txtCheckOut').value = formattedDate;

    ExportDataReservationReport(formattedDate, formattedDate);

});
function ExportDataReservationReport(checkIn, tmpCheckOut) {

    if (checkIn == '' || checkIn == undefined || tmpCheckOut == '' || tmpCheckOut == undefined) {
        checkIn = $('#txtCheckIn').val();
        tmpCheckOut = $('#txtCheckOut').val();
    }

    var parameters = { checkIn: checkIn, tmpCheckOut: tmpCheckOut };

    $.ajax({
        url: '/ReservationReport/ExportData',
        type: 'POST',
        data: parameters,
    }).done(function (response) {
        $("#contenedorVistaParcial").html(response);

        // Inicializa o reinicializa el DataTable
        $('#tblReservationReport').DataTable({
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
                    title: 'Reporte de Reservas del ' + checkIn + ' al ' + tmpCheckOut
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fa fa-file-excel"></i> Excel',
                    title: 'Reporte de Reservas del ' + checkIn + ' al ' + tmpCheckOut
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






//function ExportDataAvailabilityReport() {
//    $("#btnExportDataAvailabilityReport").click(function () {
//        mostrarSpinner();
//        var checkIn = $('#txtCheckInAvailability').val();
//        var tmpCheckOut = $('#txtCheckOutAvailability').val();

//        var parameters = { checkIn: checkIn, tmpCheckOut: tmpCheckOut };
//        $.ajax({
//            url: '/ReservationReport/ExportDataAvailability',
//            type: 'POST',
//            data: parameters,
//        }).done(function (response) {
//            $("#contenedorVistaAvailabilityReport").html(response);
//            var table = $('#tblAvailabilityReport').DataTable({
//                "paging": true,
//                "lengthChange": true,
//                "searching": true,
//                "ordering": true,
//                "responsive": true,
//                buttons: [
//                    'copy', 'excel', 'pdf'
//                ],
//                "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
//                "language": {
//                    "lengthMenu": "Mostrar _MENU_ registros por página",
//                    "zeroRecords": "No se encontraron registros",
//                    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
//                    "infoEmpty": "No hay registros disponibles",
//                    "infoFiltered": "(filtrados de _MAX_ registros en total)",
//                    "search": "Buscar:",
//                    "paginate": {
//                        "first": "Primero",
//                        "last": "Último",
//                        "next": "Siguiente",
//                        "previous": "Anterior"
//                    }
//                }
//            });

//        });
//        $("#divBtnDownload").fadeIn();

//        ocultarSpinner();
//    });
//}
//function ExportDataAvailabilityReportToExcel() {
//    $("#btnExportToExcel").click(function () {
//        mostrarSpinner();
//        var checkIn = $('#txtCheckInAvailability').val();
//        var tmpCheckOut = $('#txtCheckOutAvailability').val();

//        var parameters = { CheckIn: checkIn, CheckOut: tmpCheckOut };
//        $.ajax({
//            url: '/ReservationReport/ExportReservationAvailabilityReportEToExcel',
//            type: 'POST',
//            data: parameters,
//        }).done(function (response) {
          

//        });
//        $("#divBtnDownload").fadeIn();

//        ocultarSpinner();
//    });
//}
//function ExportDataReservationReportStart() {
//    var fechaActual = new Date();
//    var fechaFormateada = fechaActual.toISOString().split('T')[0];
//    $('#txtCheckIn').val(fechaFormateada);
//    $('#txtCheckOut').val(fechaFormateada);
//    $("#divBtnDownload").hide();

//    var table = $('#tblReservationReport').DataTable({
//        "paging": true,
//        "lengthChange": true,
//        "searching": true,
//        "ordering": true,
//        "responsive": true,
//        "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
//        "language": {
//            "lengthMenu": "Mostrar _MENU_ registros por página",
//            "zeroRecords": "No se encontraron registros",
//            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
//            "infoEmpty": "No hay registros disponibles",
//            "infoFiltered": "(filtrados de _MAX_ registros en total)",
//            "search": "Buscar:",
//            "paginate": {
//                "first": "Primero",
//                "last": "Último",
//                "next": "Siguiente",
//                "previous": "Anterior"
//            }
//        }
//    });

//}

//function ExportDataTotalReportEStart() {
//    var fechaActual = new Date();
//    var fechaFormateada = fechaActual.toISOString().split('T')[0];
//    $('#txtCheckInTotalReport').val(fechaFormateada);
//    $('#txtCheckOutTotalReport').val(fechaFormateada);
//    $("#divBtnDownloadTotalReport").hide();

//    var table = $('#tblTotalReport').DataTable({
//        "paging": true,
//        "lengthChange": true,
//        "searching": true,
//        "ordering": true,
//        "responsive": true,
//        "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
//        "language": {
//            "lengthMenu": "Mostrar _MENU_ registros por página",
//            "zeroRecords": "No se encontraron registros",
//            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
//            "infoEmpty": "No hay registros disponibles",
//            "infoFiltered": "(filtrados de _MAX_ registros en total)",
//            "search": "Buscar:",
//            "paginate": {
//                "first": "Primero",
//                "last": "Último",
//                "next": "Siguiente",
//                "previous": "Anterior"
//            }
//        }
//    });

//}

//function DownloadReservationReport() {
//    mostrarSpinner()
//    $("#btnReservationReporDownload").click(function () {
//        $.ajax({
//            url: '/ReservationReport/ExportReservationReportEToExcel',
//            type: 'POST',
//        }).done(function (response) {
         

//        });
//    });
//    ocultarSpinner();
//}

//function DownloadTotalReport() {
//    $("#btnTotalReportDownload").click(function () {
       
//    });

  
//}