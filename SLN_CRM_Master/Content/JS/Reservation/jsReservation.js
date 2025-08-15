//$(document).ready(function () {

//    OpenModalAddReservation();
//    CloseModalAddReservation();
//    CloseModalModifyReservation();

//    $('#mdlAddReservation').on('hidden.bs.modal', clearNewReservationModal);

//    var fechaActual = new Date();
//    var fechaFormateada = fechaActual.toISOString().split('T')[0];
//    $('#txtCheckIn').val(fechaFormateada);
//    $('#txtCheckOut').val(fechaFormateada);
//    $('#txtCheckInReservation').val(fechaFormateada);
//    $('#txtCheckOutReservation').val(fechaFormateada);
//    if ($.fn.DataTable.isDataTable('#tblReservation')) {
//        $('#tblReservation').DataTable().destroy();
//    }

//    $('#tblReservation').DataTable({

//        "paging": true,
//        "lengthChange": true,
//        "searching": true,
//        "ordering": true,
//        "responsive": true,
//        "buttons": [
//            'copy', 'excel', 'pdf', 'print'
//        ],
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



//    $('#ddlReservationStatus').change(function () {
//        var selectedValue = $(this).val();
//        var checkInVal = $('#txtCheckInReservation').val();
//        var checkOutVal = $('#txtCheckOutReservation').val();

//        if (!(checkInVal instanceof Date)) checkInVal = new Date(checkInVal);
//        if (!(checkOutVal instanceof Date)) checkOutVal = new Date(checkOutVal);


//        var formattedStartDate = checkInVal.toISOString().slice(0, 19).replace('T', ' ');
//        var formattedEndDate = checkOutVal.toISOString().slice(0, 19).replace('T', ' ');

//        mostrarSpinner();
//        $.ajax({
//            url: '@Url.Action("SeachReservationByStatus", "Reservation")',
//            type: 'GET',
//            data: {
//                reservationStatus: selectedValue,
//                StartDate: formattedStartDate,
//                EndDate: formattedEndDate
//            },
//            success: function (partialView) {
//                if ($.fn.DataTable.isDataTable('#tblReservation')) {
//                    $('#tblReservation').DataTable().destroy();
//                }
//                $('#contenedorVistaParcial').html(partialView);

//                $('#tblReservation').DataTable({
//                    "scrollX": true,
//                    "paging": true,
//                    "lengthChange": true,
//                    "searching": true,
//                    "ordering": true,
//                    "responsive": true,
//                    "buttons": [
//                        'copy', 'excel', 'pdf', 'print'
//                    ],
//                    "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, "Todo"]],
//                    "language": {
//                        "lengthMenu": "Mostrar _MENU_ registros por página",
//                        "zeroRecords": "No se encontraron registros",
//                        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
//                        "infoEmpty": "No hay registros disponibles",
//                        "infoFiltered": "(filtrados de _MAX_ registros en total)",
//                        "search": "Buscar:",
//                        "paginate": {
//                            "first": "Primero",
//                            "last": "Último",
//                            "next": "Siguiente",
//                            "previous": "Anterior"
//                        }
//                    }
//                });
//            },
//            error: function () {
//                alert('Ha ocurrido un error al obtener los datos.');
//            }
//        });
//        ocultarSpinner();
//    });




//    $('#txtCheckIn').on('change', function () {
//        var originalCheckIn = $(this).data('lastValue');
//        var newCheckIn = $(this).val();
//        var checkOutVal = $('#txtCheckOut').val();

//        if (new Date(newCheckIn) >= new Date(checkOutVal)) {
//            if (originalCheckIn) {
//                $(this).val(originalCheckIn);
//            }
//        } else {
//            $(this).data('lastValue', newCheckIn);
//            var Days = tmpDays(newCheckIn, checkOutVal);


//            Expense_Details(Days, 'txtExpenseDetails');
//            var guestCount = parseInt($("#txtGuestCount").val()) || 1;
//            updateDatalistHotelRoomFromServer('AddRoomList', newCheckIn, checkOutVal, guestCount);

//        }
//    }).data('lastValue', $('#txtCheckIn').val());

//    $('#txtCheckOut').on('change', function () {
//        var originalCheckOut = $(this).data('lastValue');
//        var newCheckOut = $(this).val();
//        var checkInVal = $('#txtCheckIn').val();

//        if (new Date(newCheckOut) <= new Date(checkInVal)) {
//            if (originalCheckOut) {
//                $(this).val(originalCheckOut);
//            }
//        } else {
//            $(this).data('lastValue', newCheckOut);
//            var Days = tmpDays(checkInVal, newCheckOut);


//            Expense_Details(Days, 'txtExpenseDetails');
//            var guestCount = parseInt($("#txtGuestCount").val()) || 1;
//            updateDatalistHotelRoomFromServer('AddRoomList', checkInVal, newCheckOut, guestCount);

//        }
//    }).data('lastValue', $('#txtCheckOut').val());
//    $('#txtGuestCount').on('change', function () {
//        clearRoomSelection();
//        var checkIn = $('#txtCheckIn').val();
//        var checkOut = $('#txtCheckOut').val();
//        var guestCount = parseInt($(this).val()) || 1;

//        var Days = tmpDays(checkIn, checkOut);
//        Expense_Details(Days, 'txtExpenseDetails');

//        updateDatalistHotelRoomFromServer('AddRoomList', checkIn, checkOut, guestCount);

//    });

//    var fechaActual = new Date().toISOString().split('T')[0];
//    $('#txtCheckIn, #txtCheckOut').attr('min', fechaActual);
//    $('#txtModifyCheckIn, #txtModifyCheckOut').attr('min', fechaActual);

//    InitializerEventDropDownListClassic('ddlAddRoomModal', 'AddRoomList');

//    InitializerEventDropDownList2('ddlModifyReservationModal', 'ModifyReservationList', 'ModifyTarifaList', '');
//    InitializerEventDropDownListClient('ddlModifyTarifaModal', 'ModifyTarifaList', 'Buscar tarifa...', 'txtModifyDescription', 'txtExpenseDetails', 'AddRoomList');

//    $('#ddlAddReservationModal').select2({
//        dropdownParent: $('#mdlAddReservation'),
//        placeholder: 'Buscar cliente...',
//        allowClear: true,
//        minimumInputLength: 2,
//        language: {
//            inputTooShort: function (args) {
//                return 'Por favor ingrese ' + args.minimum + ' o más caracteres';
//            },
//            noResults: function () {
//                return "No se encontraron resultados";
//            },
//            searching: function () {
//                return "Buscando...";
//            }
//        },
//        ajax: {
//            url: '/Reservation/BuscarClientes',
//            dataType: 'json',
//            delay: 250,
//            data: function (params) {
//                return {
//                    term: params.term
//                };
//            },
//            processResults: function (data) {
//                console.log(data)
//                return {

//                    results: data.map(function (cliente) {
//                        console.log(cliente.id)
//                        return {
//                            id: cliente.id,
//                            text: cliente.nombre + ' - ' + cliente.cedula + ' (' + cliente.correo + ')'
//                        };
//                    })
//                };
//            },
//            cache: true
//        }
//    });

//    $('#ddlAddReservationModal').on('change', function () {
//        const clientId = $(this).val();
//        const clientName = $('#ddlAddReservationModal option:selected').text();
//        const checkIn = $('#txtCheckIn').val();
//        const checkOut = $('#txtCheckOut').val();
//        const guestCount = parseInt($("#txtGuestCount").val()) || 1;
//        const roomId = $("#ddlAddRoomModal").val();


//        const nights = tmpDays(checkIn, checkOut);

//        const shouldClean =
//            !clientId || !checkIn || !checkOut || nights <= 0;

//        if (shouldClean) {
//            $("#txtDescription").val("");
//            $("#txtExpenseDetails").val("");
//            return;
//        }


//        updateDatalistHotelRoomFromServer("AddRoomList", checkIn, checkOut, guestCount);
//    });

//    $('#ddlAddReservationModal').on('select2:select', function (e) {
//        const selectedClient = e.params.data;
//        console.log("Cliente seleccionado:", selectedClient);
//    });

//});
function NewReservation() {
    try {
        if (!ValidateReservation(
            '#ddlAddReservationModal',
            '#txtCheckIn',
            '#txtCheckOut',
            '#txtGuestCount',
            '#ddlAddRoomModal',
            true
        )) return;

        const days = tmpDays($('#txtCheckIn').val(), $('#txtCheckOut').val());
        const reservation = {
            ClientId: $('#ddlAddReservationModal').val(),
            CheckIn: $('#txtCheckIn').val(),
            CheckOut: $('#txtCheckOut').val(),
            GuestCount: parseInt($('#txtGuestCount').val(), 10),
            RoomId: $('#ddlAddRoomModal').val(),
            Nights: days,
            Description: $('#txtDescription').val().trim() || undefined
        };

        mostrarSpinner();
        $.post('/Reservation/NewReservation', reservation)
            .done(function (response) {
               
                if (response.includes('exitosamente')) {
                    
                    $('#mdlAddReservation').modal('hide');
                    clearNewReservationModal();
                    FilterReservacion();
                    Swal.fire({ text: response, icon: 'success' });
                } else {
                    Swal.fire('', response, 'warning');
                }
            })
            .fail(function () {
                ocultarSpinner();
                Swal.fire('', 'Error al procesar la reservación. Intente de nuevo.', 'error');
            })
            .always(function () {
               
                ocultarSpinner();
            });
    } catch (e) {
        ocultarSpinner();
        console.error(e);
        Swal.fire('', 'Ocurrió un error inesperado.', 'error');
    }
}

function ModifyReservation() {
  
    var IdCard_Client = GetDropDownValueSelected('ddlModifyReservationModal', 'ModifyReservationList');
    var Reservation_Description = $("#txtModifyDescription").val();
    var CheckIn = $("#txtModifyCheckIn").val();
    var CheckOut = $("#txtModifyCheckOut").val();
    var Status = 0;
    var Days = tmpDays(CheckIn, CheckOut);
    var ID_Rate = GetDropDownValueSelected('ddlModifyTarifaModal', 'ModifyTarifaList');
    var Id = $('#hdfIdReservationModify').val();
    if (Validate('ddlModifyReservationModal', 'ModifyReservationList', 'ddlModifyTarifaModal', 'ModifyTarifaList', 'txtModifyCheckIn', 'txtModifyCheckOut')) {
        mostrarSpinner();
        var parameters = { IdCard_Client: IdCard_Client, Reservation_Description: Reservation_Description, CheckIn: CheckIn, CheckOut: CheckOut, Status: Status, Days: Days, ID_Rate: ID_Rate, Id: Id };
            $.ajax({
                url: '/Reservation/ModifyReservation',
                type: 'POST',
                data: parameters,
            }).done(function (response) {
                ocultarSpinner();
                if (response.includes("exitosamente")) {
                    Swal.fire({
                        text: response,
                        icon: 'success',
                        didClose: () => {
                            $("#txtDescription").text('');
                            $("#txtModifyDescription").val('');
                            window.location.href = '/Reservation/Index';
                        }
                    });
                }
                else {
                    Swal.fire('', response, 'warning');
                }
            });
       
    } 
}

// Función para calcular la diferencia de días entre dos fechas
function tmpDays(P_CHECKIN, P_CHECKOUT) {
    // Convertir las fechas a objetos de fecha
    const tmpP_CHECKIN = new Date(P_CHECKIN);
    const tmpP_CHECKOUT = new Date(P_CHECKOUT);

    // Calcular la diferencia en milisegundos
    const diferenciaMs = tmpP_CHECKOUT - tmpP_CHECKIN;

    // Convertir la diferencia a días
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    return diferenciaDias;
}



function DeleteReservation(Id) {

    
 
    console.log(Id);
       
        Swal.fire({
            title: '¿Está seguro?',
            text: '¡Que desea borrar este dato!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, borrarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                
             
                var parameters = { Id: Id };
                $.ajax({
                    url: '/Reservation/DeleteReservation',
                    type: 'POST',
                    data: parameters,
                }).done(function (response) {

                    if (response.includes("exitosamente")) {
                        Swal.fire({
                            text: response,
                            icon: 'success',
                            didClose: () => {
                                FilterReservacion();
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

/**
 * Valida los datos mínimos de una reservación: cliente, fechas, huéspedes y habitación.
 *
 * @param {string} clientSel   Selector jQuery para el dropdown de cliente (p. ej. '#ddlAddReservationModal')
 * @param {string} checkInSel  Selector jQuery para la fecha de entrada (p. ej. '#txtCheckIn')
 * @param {string} checkOutSel Selector jQuery para la fecha de salida (p. ej. '#txtCheckOut')
 * @param {string} guestSel    Selector jQuery para la cantidad de huéspedes (p. ej. '#txtGuestCount')
 * @param {string} roomSel     Selector jQuery para el campo oculto de habitación (p. ej. '#ddlAddRoomModal')
 * @param {boolean} checkExisting (opcional) Si es true, también valida que el cliente no tenga ya una reserva activa
 * @returns {boolean} true si todo es válido; false en otro caso (muestra un Swal.error)
 */
function ValidateReservation(clientSel, checkInSel, checkOutSel, guestSel, roomSel, checkExisting = false) {
    var clientId = $(clientSel).val();
    if (!clientId) {
        Swal.fire('', 'Debe seleccionar un cliente.', 'error');
        return false;
    }

    var checkIn = $(checkInSel).val();
    var checkOut = $(checkOutSel).val();
    if (!checkIn) {
        Swal.fire('', 'Debe seleccionar la fecha de entrada.', 'error');
        return false;
    }
    if (!checkOut) {
        Swal.fire('', 'Debe seleccionar la fecha de salida.', 'error');
        return false;
    }
    var days = tmpDays(checkIn, checkOut);
    if (days < 1) {
        Swal.fire('', 'La fecha de salida debe ser posterior a la de entrada.', 'error');
        return false;
    }

    var guestCount = parseInt($(guestSel).val(), 10) || 0;
    if (guestCount < 1) {
        Swal.fire('', 'La cantidad de huéspedes debe ser al menos 1.', 'error');
        return false;
    }

    var roomId = $(roomSel).val();
    if (!roomId) {
        Swal.fire('', 'Debe seleccionar una habitación.', 'error');
        return false;
    }

    //if (checkExisting && SeachExistsReservacionClient(clientId)) {
    //    Swal.fire('', 'El cliente ya tiene una reservación activa.', 'error');
    //    return false;
    //}

    return true;
}

function SeachExistsReservacionClient(IdCar_clientReservation) {

    return reservationList.find(function (reservation) {

  
        return (reservation.IdCard_Client.toLowerCase() === IdCar_clientReservation.toLowerCase() && reservation.Status.toLowerCase()==='reservado' ) ;
    });
}

function GenerateInvoceReservation(button) {
    var ReservationJson = button.getAttribute("data-reservation");
    var reservation = JSON.parse(ReservationJson);
    Console.log(reservation);
    Swal.fire({
        title: '¿Está seguro?',
        text: '¡Que desea facturar esta reservación!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Facturar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        
        if (result.isConfirmed) {
            mostrarSpinner();
            var parameters = { reservation: reservation };
            $.ajax({
                url: '/Reservation/GenerateInvoceReservation',
                type: 'POST',
                data: parameters,
            }).done(function (response) {
                ocultarSpinner();
                if (response.includes("exitosamente")) {
                    Swal.fire({
                        text: response,
                        icon: 'success',
                        didClose: () => {
                           
                            window.location.href = '/Reservation/Index';
                        }
                    });

                }
                else {
                    Swal.fire('', response, 'warning');
                }
            });
        }

    });

    ocultarSpinner();
}
function GenerateInvoceReservation(button) {
    var ReservationJson = button.getAttribute("data-reservation");
    var reservation = JSON.parse(ReservationJson);
    console.log(reservation);
    Swal.fire({
        title: '¿Está seguro?',
        text: '¡Que desea facturar esta reservación!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Facturar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            mostrarSpinner();
            var parameters = { reservation: reservation };
            $.ajax({
                url: '/Reservation/GenerateInvoceReservation',
                type: 'POST',
                data: parameters,
            }).done(function (response) {
                ocultarSpinner();
                if (response.includes("exitosamente")) {
                    Swal.fire({
                        text: response,
                        icon: 'success',
                        didClose: () => {

                            window.location.href = '/Reservation/Index';
                        }
                    });

                }
                else {
                    Swal.fire('', response, 'warning');
                }
            });
        }

    });

    ocultarSpinner();
}
function EndProcess(button) {
    var ReservationJson = button.getAttribute("data-reservation");
    var reservation = JSON.parse(ReservationJson);

    Swal.fire({
        title: '¿Está seguro?',
        text: '¡Que desea finalizar esta reservación!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            mostrarSpinner();
            var parameters = { reservation: reservation };
            $.ajax({
                url: '/Reservation/EndProccess',
                type: 'POST',
                data: parameters,
            }).done(function (response) {
                ocultarSpinner();
                if (response.includes("exitosamente")) {
                    Swal.fire({
                        text: response,
                        icon: 'success',
                        didClose: () => {

                            window.location.href = '/Reservation/Index';
                        }
                    });

                }
                else {
                    Swal.fire('', response, 'warning');
                }
            });
        }

    });

    ocultarSpinner();
}

function AddDeposit(button) {


    var ReservationJson = button.getAttribute("data-reservation");
    var reservation = JSON.parse(ReservationJson);
    console.log(reservation);

    localStorage.setItem('currentReservation', JSON.stringify(reservation));



    $('#mdlDeposit').modal('show');


}

function SendDeposit(){
    var DepositAmmount = $('#txtDepositAmmount').val();
    var storedReservation = JSON.parse(localStorage.getItem('currentReservation'));
    if (storedReservation.Currency == "CRC") {
        if (DepositAmmount < 5000) {

            Swal.fire('', 'El valor del depósito debe ser mayor a ₡5.000', 'error');
            return;
        }
        else {
           // if(storedReservation.)
        }

    }
    else {
        if (DepositAmmount < 20) {

            Swal.fire('', 'El valor del depósito debe ser mayor a $20.00', 'error');
            return;
        }

    }

    Swal.fire({
        title: '¿Está seguro?',
        text: '¡Que desea agregar el deposito a la reservación!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            mostrarSpinner();
            var parameters = { reservation: storedReservation, Ammount: DepositAmmount };
            $.ajax({
                url: '/Reservation/AddDeposit',
                type: 'POST',
                data: parameters,
            }).done(function (response) {
                ocultarSpinner();
                if (response.includes("exitosamente")) {
                    Swal.fire({
                        text: response,
                        icon: 'success',
                        didClose: () => {

                            window.location.href = '/Reservation/Index';
                        }
                    });

                }
                else {
                    Swal.fire('', response, 'error');
                }
            });
        }

    });

    ocultarSpinner();

}

// Prueba arreglar js


function ExportDataTotalReportTMP() {
    $('#mdlAddReservation').modal('show');
    const checkIn = $('#txtCheckIn').val();
    const checkOut = $('#txtCheckOut').val();
    const guests = parseInt($('#txtGuestCount').val(), 10) || 1;
    updateDatalistHotelRoomFromServer('roomCardsContainer', checkIn, checkOut, guests);
}
function updateDatalistHotelRoomFromServer(dataListContainerId, startDate, endDate, guestCount) {
    const prevRoomId = $('#ddlAddRoomModal').val();

    if (!(startDate instanceof Date)) startDate = new Date(startDate);
    if (!(endDate instanceof Date)) endDate = new Date(endDate);

    const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

    $.ajax({
        type: "GET",
        url: "/Reservation/GetHotelRoomListByCapacity",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            GuestCount: guestCount
        },
        success: function (data) {
            const container = $('#roomCardsContainer');
            container.empty();

            if (data.length === 0) {
                Swal.fire('', 'No hay habitaciones disponibles en las fechas solicitadas.', 'error');
                clearRoomSelection();
                return;
            }

            let foundPrev = false;
            data.forEach(hotel => {
                const card = $(`
                  <div class="room-card" data-room-id="${hotel.ID}">
                    <strong>${hotel.Description}</strong><br/>
                    <span>Precio: ₡${parseFloat(hotel.Price).toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span><br/>
                    <span>USD: $${parseFloat(hotel.DolarPrice).toFixed(2)}</span><br/>
                    <small>ID: ${hotel.ID}</small>
                  </div>
                `);

                if (hotel.ID.toString() === prevRoomId) {
                    card.addClass('selected');
                    foundPrev = true;
                }

                card.on('click', function () {
                    $('.room-card').removeClass('selected');
                    $(this).addClass('selected');
                    $('#ddlAddRoomModal').val(hotel.ID);
                    const days = tmpDays($('#txtCheckIn').val(), $('#txtCheckOut').val());
                    Expense_Details(days, 'txtExpenseDetails');
                });

                container.append(card);
            });
            if (foundPrev) {
                $('#ddlAddRoomModal').val(prevRoomId);

                const days = tmpDays($('#txtCheckIn').val(), $('#txtCheckOut').val());
                Expense_Details(days, 'txtExpenseDetails');
            } else {
                $("#ddlAddRoomModal").val('');
                clearRoomSelection();
            }
        },
        error: function (error) {
            console.error("Error al obtener habitaciones:", error);
        }
    });
}

function myfunction() {

    mostrarSpinner();
    var selectedRoleId = '1';
    if (selectedRoleId === '') {
        selectedRoleId = '0';
    }



    $('#tblPermissons').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "responsive": true,
        "buttons": [
            'copy', 'excel', 'pdf', 'print'
        ],
        "lengthMenu": [[25, 50, 100], [25, 50, "Todo"]],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",

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


    console.log(selectedRoleId);

    $.ajax({
     /*   url: '@Url.Action("PartialPermissionView", "Security")',*/
        url: '/Security/PartialPermissionView',
        type: 'GET',
        data: { roleId: selectedRoleId },
        success: function (data) {

           
            $("#tblPermissons").html(data);
            ocultarSpinner();
        }

    });
    //$("#ddlRoles").change(function () {
    //    mostrarSpinner();
    //    var selectedRoleId = $(this).val();
    //    if (selectedRoleId === '') {
    //        selectedRoleId = '0';
    //    }
    //    console.log(selectedRoleId);

    //    $.ajax({
    //        url: '@Url.Action("PartialPermissionView", "Security")',
    //        type: 'GET',
    //        data: { roleId: selectedRoleId },
    //        success: function (data) {

    //            $("#tblPermissons").html(data);
    //            ocultarSpinner();
    //        }

    //    });
    //});
}