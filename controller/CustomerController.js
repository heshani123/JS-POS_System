$('#linkCustomer').click(function () {
    $('#customerContent').fadeIn(1000);
});

/** Key Events to Customer Content */
$('#txtCustomerId').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#txtCustomerName').focus();
        }
        checkCID();
    });

$('#txtCustomerName').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#txtCustomerAddress').focus();
        }
        checkName();
    });

$('#txtCustomerAddress').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#txtCustomerMobileNo').focus();
        }
        checkAddr();
    });

$('#txtCustomerMobileNo').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#btnSaveCustomer').focus();
        }
        checkTp();
    });

/** Key Event to Save Customer */
$('#btnSaveCustomer').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtCustomerId').focus();
        let res = saveCustomer($('#txtCustomerId').val(), $('#txtCustomerName').val(), $('#txtCustomerAddress').val(), $('#txtCustomerMobileNo').val());
        if (res) {
            clearAllCustomerText();
            genatareCID();
            alertSs();
        }
    }
});

/** Key Event to Search Customer */
$('#btnSearchCustomer').on('keyup', function (event) {
    if (event.key == 'Enter') {
        let customer = searchCustomer($('#txtCustomerSearch').val());
        if (customer == null) {
            alert("Can't Found Search Customer..!");
        } else {
            $('#txtCustomerId').val(customer.getCustomerID());
            $('#txtCustomerName').val(customer.getCustomerName());
            $('#txtCustomerAddress').val(customer.getCustomerAddress());
            $('#txtCustomerMobileNo').val(customer.getCustomerMobileNo());
        }
    }
});

$('#txtCustomerSearch').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#btnSearchCustomer').focus();
        }
    });

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerMobileNo').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

/** Sweet Alert for Save Customer */
function alertSs() {
    Swal.fire({
        position: 'top',
        icon: 'success',
        text:'Saved Customer Successfully...!',
        title: 'Succsess',
        showConfirmButton: false,
        timer: 1500
    });
}

/** Save Customer in btn Click */
$('#btnSaveCustomer').click(function () {
    let res = saveCustomer($('#txtCustomerId').val(), $('#txtCustomerName').val(), $('#txtCustomerAddress').val(), $('#txtCustomerMobileNo').val());
    if (res) {
        clearAllCustomerText();
        $('#txtCustomerId').focus();
        genatareCID();
        alertSs();
    }
});

/** Update Customer in btn Click */
$('#btnUpdateCustomer').click(function () {
    let cusID = $("#txtCustomerId").val();
    let option = confirm(`Do you want to Update this customer ? ${cusID}`);
    if (option) {
        let res = updateCustomer($('#txtCustomerId').val(), $('#txtCustomerName').val(), $('#txtCustomerAddress').val(), $('#txtCustomerMobileNo').val());
        if (res) {
            clearAllCustomerText();
            alert("Customer Updated Successfully..!");
        } else {
            alert("Customer Updated Failed..!");
        }

    }

});

/** Delete Customer in btn Click */
$('#btnDeleteCustomer').click(function () {
    let cusID = $("#txtCustomerId").val();
    let option = confirm(`Do you want to Delete this customer ? ${cusID}`);
    if (option) {
        let res = deleteCustomer(cusID);
        if (res) {
            alert("Customer Deleted Successfully..!");
            clearAllCustomerText();
        } else {
            alert("Customer Deleted Failed..!");
        }
    }
});

/** Clear Customer in btn Click */
$('#btnClearCustomer').click(function () {
    clearAllCustomerText();
});

$('#tblCustomer>tr').css('cursor', 'pointer');

/** ========================================== CRUD Operations in Customer Content. ================================== */

/** Save Customer */
function saveCustomer(cid, cname, addr, tp) {
    if (checkCID()) {
        if (checkName()) {
            if (checkAddr()) {
                if (checkTp()) {
                    if (checkDuplicteID(cid)) {
                        $('#txtCustomerId').css('border', '2px solid red');
                        $("#lblCusID").text("Duplicate Customer ID (C00-001)");
                    } else {
                        let customer = new CustomerModel(cid, cname, addr, tp);
                        customerArray.push(customer);

                        /** Load All Customers to Table */
                        loadCustomertoTheTable();

                        $('#tblCustomer>tr').click(function () {
                            let id = $(this).children().eq(0).text();
                            let name = $(this).children().eq(1).text();
                            let address = $(this).children().eq(2).text();
                            let tp = $(this).children().eq(3).text();

                            $('#txtCustomerId').val(id);
                            $('#txtCustomerName').val(name);
                            $('#txtCustomerAddress').val(address);
                            $('#txtCustomerMobileNo').val(tp);
                        })
                        dblclickEvent();
                        return true;
                    }
                } else {
                    $('#txtCustomerMobileNo').focus();
                    $('#txtCustomerMobileNo').css('border', '2px solid red').focus();
                }
            } else {
                $('#txtCustomerAddress').focus();
                $('#txtCustomerAddress').css('border', '2px solid red');
            }
        } else {
            $('#txtCustomerName').focus();
            $('#txtCustomerName').css('border', '2px solid red');
        }

    } else {
        $('#txtCustomerId').focus();
        $('#txtCustomerId').css('border', '2px solid red');
    }
    return false;
}

/** Delete Customer */
function deleteCustomer(cid) {
    let customer = searchCustomer(cid);
    if (customer != null) {
        let number = customerArray.indexOf(customer);
        customerArray.splice(number, 1);

        /** Load All Customers to Table */
        loadCustomertoTheTable();

        return true;
    } else {
        return false;
    }
}

/** Update Customer */
function updateCustomer(cid, cname, addr, tp) {
    if (checkCID()) {
        if (checkName()) {
            if (checkAddr()) {
                if (checkTp()) {
                    let customer = searchCustomer(cid);
                    if (customer != null) {
                        customer.setCustomerName(cname);
                        customer.setCustomerAddress(addr);
                        customer.setCustomerMobileNo(tp);

                        /** Load All Customers to Table */
                        loadCustomertoTheTable();

                        $('#tblCustomer>tr').click(function () {
                            let id = $(this).children().eq(0).text();
                            let name = $(this).children().eq(1).text();
                            let address = $(this).children().eq(2).text();
                            let tp = $(this).children().eq(3).text();

                            $('#txtCustomerId').val(id);
                            $('#txtCustomerName').val(name);
                            $('#txtCustomerAddress').val(address);
                            $('#txtCustomerMobileNo').val(tp);

                        });

                        /** Double Click Event to Delete Customer */
                        $('#tblCustomer>tr').on('dblclick', function () {
                            let cusID = $("#txtCustomerId").val();
                            let option = confirm(`Do you want to Deleted this customer ? ${cusID}`);
                            if (option) {
                                $(this).remove();
                                let res = deleteCustomer(cusID);
                                if (res) {
                                    alert("Customer Deleted Successfully..!");
                                    clearAllCustomerText();
                                } else {
                                    alert("Customer Deleted Failed..!");
                                }
                            }
                        });
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    $('#txtCustomerMobileNo').focus();
                    $('#txtCustomerMobileNo').css('border', '2px solid red');
                }
            } else {
                $('#txtCustomerAddress').focus();
                $('#txtCustomerAddress').css('border', '2px solid red');
            }
        } else {
            $('#txtCustomerName').focus();
            $('#txtCustomerName').css('border', '2px solid red');
        }
    }
    return false;
}

/** Get All Customers */
function getAllCustomers() {
    return customerArray;
}

/** Search Customer */
function searchCustomer(id) {
    for (let i in customerArray) {
        if (customerArray[i].getCustomerID() == id) return customerArray[i];
    }
    return null;
}

/** Load All Customers to Table */
function loadCustomertoTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer>tr').empty();
    for (let i in allCustomers) {
        let cid = allCustomers[i].getCustomerID();
        let cname = allCustomers[i].getCustomerName();
        let addr = allCustomers[i].getCustomerAddress();
        let tp = allCustomers[i].getCustomerMobileNo();

        var code = `<tr><td>${cid}</td><td>${cname}</td><td>${addr}</td><td>${tp}</td></tr>`;
        $('#tblCustomer').append(code);

        $('#tblCustomer>tr').click(function () {
            let id = $(this).children().eq(0).text();
            let name = $(this).children().eq(1).text();
            let address = $(this).children().eq(2).text();
            let tp = $(this).children().eq(3).text();

            $('#txtCustomerId').val(id);
            $('#txtCustomerName').val(name);
            $('#txtCustomerAddress').val(address);
            $('#txtCustomerMobileNo').val(tp);

        });
    }
}

/** Clear All Customers Test */
function clearAllCustomerText() {
    $('#txtCustomerId').val(genatareCID());
    $('#txtCustomerName').val('');
    $('#txtCustomerAddress').val('');
    $('#txtCustomerMobileNo').val('');
    $('#txtCustomerSearch').val('');
}

/** Key Events Add to Input Fields */
function checkCID() {
    if (/^(C00-)[0-9]{1,3}$/.test($('#txtCustomerId').val())) {
        $('#txtCustomerId').css('border', '2px solid green');
        $("#lblCusID").text(" ");
        return true;
    } else {
        $('#txtCustomerId').css('border', '2px solid red');
        $("#lblCusID").text("Your Input Customer ID Pattern is Wrong : C00-001").css('color','red');
    }
    return false;
}

function checkName() {
    if (/^[A-z ]{1,}$/.test($('#txtCustomerName').val())) {
        $('#txtCustomerName').css('border', '2px solid green');
        $("#lblCusName").text(" ");
        return true;
    } else {
        $('#txtCustomerName').css('border', '2px solid red');
        $("#lblCusName").text("Your Input Customer Name Pattern is Wrong : Kamal").css('color','red');
    }
    return false;
}

function checkAddr() {
    if (/^[A-z, |0-9:./]*\b$/.test($('#txtCustomerAddress').val())) {
        $('#txtCustomerAddress').css('border', '2px solid green');
        $("#lblCusAddress").text(" ");
        return true;
    } else {
        $('#txtCustomerAddress').css('border', '2px solid red');
        $("#lblCusAddress").text("Your Input Customer Address Pattern is Wrong : Matara").css('color','red');
    }
    return false;
}

function checkTp() {
    if (/^[0-9]{3}(-)[0-9]{7}$/.test($('#txtCustomerMobileNo').val())) {//  ("^\\d{10}$")
        $('#txtCustomerMobileNo').css('border', '2px solid green');
        $("#lblCusMobileNo").text(" ");
        return true;
    } else {
        $('#txtCustomerMobileNo').css('border', '2px solid red');
        $("#lblCusMobileNo").text("Your Input Customer Mobile No Pattern is Wrong : 071-2345678").css('color','red');
    }
    return false;
}

function checkDuplicteID(id) {
    let allCustomers = getAllCustomers();
    for (let i in allCustomers) {
        if (id == allCustomers[i].getCustomerID()) {
            return true;
        }
        return false;
    }
}

function genatareCID() {
    let LastId = customerArray[customerArray.length - 1].getCustomerID();
    $('#txtCustomerId').val('C00-00' + (parseInt(LastId.split('C00-00')[1]) + 1));
}

$('#txtCustomerId').val('C00-001');

function dblclickEvent() {
    /** Double Click Event to Delete Customer */
    $('#tblCustomer>tr').on('dblclick', function () {
        let cusID = $("#txtCustomerId").val();
        let option = confirm(`Do you want to Delete this customer ? ${cusID}`);
        if (option) {
            $(this).remove();
            let res = deleteCustomer(cusID);
            if (res) {
                alert("Customer Deleted Successfully..!");
                clearAllCustomerText();
            } else {
                alert("Customer Deleted Failed..!");
            }
        }
    });
}

