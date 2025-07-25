$(document).ready(function () {
   /* ExportDataTotalReportEStart();*/
    /* ExportDataTotalReport();*/
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con 0 al inicio
    var dd = String(today.getDate()).padStart(2, '0');      // Día con 0 al inicio

    var formattedDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById('txtCheckInTotalReport').value = formattedDate;
    document.getElementById('txtCheckOutTotalReport').value = formattedDate;

});
function ExportDataReservationReport() {
    $("#btnExportData").click(function () {
        var checkIn = $('#txtCheckIn').val();
        var tmpCheckOut = $('#txtCheckOut').val();

        var parameters = { checkIn: checkIn, tmpCheckOut: tmpCheckOut };
        $.ajax({
            url: '/ReservationReport/ExportData',
            type: 'POST',
            data: parameters,
        }).done(function (response) {
            $("#contenedorVistaParcial").html(response);
            var table =  $('#tblReservationReport').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "responsive": true,             
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
                "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "No se encontraron registros",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "No hay registros disponibles",
                    "infoFiltered": "(filtrados de _MAX_ registros en total)",
                    "search": "Buscar:",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });
           
        });
        $("#divBtnDownload").fadeIn();
    });
}

function ExportDataTotalReport() {
    var checkIn = $('#txtCheckInTotalReport').val();
    var tmpCheckOut = $('#txtCheckOutTotalReport').val();

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
                    text: '<i class="fa fa-copy"></i> Copiar'
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fa fa-file-excel"></i> Excel'
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fa fa-file-pdf"></i> PDF'
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


function MorasInternosDescargar() {
    $("#load_screen").show();
    $.ajax({
        type: "GET",
        url: "/ReporteComiTotalizado/MorasInternosDescargar",
        dataType: "json",
        success: function (data) {
            if (data.success) {
                var tablad = $('#tblMorasInternos').DataTable();
                var info = JSON.parse(data.data);
                tablad.destroy();

                // Obtener la fecha y hora actual
                var fechaHora = new Date().toLocaleString();

                var tabla = $('#tblMorasInternos').DataTable({
                    dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
                    buttons: {
                        buttons: [
                            { extend: 'copy', className: 'btn' },
                            { extend: 'csv', className: 'btn' },
                            {
                                extend: 'excel',
                                className: 'btn',
                                title: 'Reporte Total de Ingresos',
                                messageTop: 'Fecha y hora de impresión: ' + fechaHora
                            },
                            { extend: 'print', className: 'btn' }
                        ]
                    },
                    "oLanguage": {
                        "oPaginate": {
                            "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                            "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
                        },
                        "sInfo": "Showing page PAGE of PAGES",
                        "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                        "sSearchPlaceholder": "Search...",
                        "sLengthMenu": "Results :  MENU",
                    },
                    "stripeClasses": [],
                    "lengthMenu": [10, 20, 30, 50],
                    "pageLength": 10,
                    data: info,
                    columns: [
                        { data: 'Codigo Gestor' },
                        { data: 'Descripcion Gestor' },
                        { data: 'Mora' },
                        { data: 'Total Inicial Cobrar' },
                        { data: 'Cantidad Inicial' },
                        { data: 'Total por Cobrar' },
                        { data: 'Cantidad por Cobrar' },
                        { data: 'Total Cobrado' },
                        { data: 'Cantidad Cobrador' },
                        { data: 'TIPOCOMISION' },
                        { data: 'Porcentaje' },
                        { data: 'Comision' },
                        { data: 'Cantidad_Reconexiones' },
                        { data: 'Comision_Reconexiones' },
                    ],
                    "ordering": false,
                });

                $("#load_screen").hide();
            } else {
                Swal.fire({
                    title: 'Información',
                    text: data.error,
                    type: 'info',
                    confirmButtonText: 'Aceptar'
                });
                $("#load_screen").hide();
                return;
            }
        },
    });
}





function ExportDataAvailabilityReport() {
    $("#btnExportDataAvailabilityReport").click(function () {
        mostrarSpinner();
        var checkIn = $('#txtCheckInAvailability').val();
        var tmpCheckOut = $('#txtCheckOutAvailability').val();

        var parameters = { checkIn: checkIn, tmpCheckOut: tmpCheckOut };
        $.ajax({
            url: '/ReservationReport/ExportDataAvailability',
            type: 'POST',
            data: parameters,
        }).done(function (response) {
            $("#contenedorVistaAvailabilityReport").html(response);
            var table = $('#tblAvailabilityReport').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "responsive": true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
                "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "No se encontraron registros",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "No hay registros disponibles",
                    "infoFiltered": "(filtrados de _MAX_ registros en total)",
                    "search": "Buscar:",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                }
            });

        });
        $("#divBtnDownload").fadeIn();

        ocultarSpinner();
    });
}
function ExportDataAvailabilityReportToExcel() {
    $("#btnExportToExcel").click(function () {
        mostrarSpinner();
        var checkIn = $('#txtCheckInAvailability').val();
        var tmpCheckOut = $('#txtCheckOutAvailability').val();

        var parameters = { CheckIn: checkIn, CheckOut: tmpCheckOut };
        $.ajax({
            url: '/ReservationReport/ExportReservationAvailabilityReportEToExcel',
            type: 'POST',
            data: parameters,
        }).done(function (response) {
          

        });
        $("#divBtnDownload").fadeIn();

        ocultarSpinner();
    });
}
function ExportDataReservationReportStart() {
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toISOString().split('T')[0];
    $('#txtCheckIn').val(fechaFormateada);
    $('#txtCheckOut').val(fechaFormateada);
    $("#divBtnDownload").hide();

    var table = $('#tblReservationReport').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "responsive": true,
        "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrados de _MAX_ registros en total)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

}

function ExportDataTotalReportEStart() {
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toISOString().split('T')[0];
    $('#txtCheckInTotalReport').val(fechaFormateada);
    $('#txtCheckOutTotalReport').val(fechaFormateada);
    $("#divBtnDownloadTotalReport").hide();

    var table = $('#tblTotalReport').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "responsive": true,
        "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrados de _MAX_ registros en total)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

}

function DownloadReservationReport() {
    mostrarSpinner()
    $("#btnReservationReporDownload").click(function () {
        $.ajax({
            url: '/ReservationReport/ExportReservationReportEToExcel',
            type: 'POST',
        }).done(function (response) {
         

        });
    });
    ocultarSpinner();
}

function DownloadTotalReport() {
    $("#btnTotalReportDownload").click(function () {
       
    });

  
}