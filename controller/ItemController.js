$('#linkItem').click(function () {
    $('#itemContent').fadeIn(1000);
});

/** Key Events to Item Content */
$('#txtItemCode').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#txtItemName').focus();
        }
        checkItemID();
});

$('#txtItemName').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#txtItemPrice').focus();
        }
        checkItemName();
});

$('#txtItemPrice').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#txtItemQuantity').focus();
        }
        checkUPrice();
});

$('#txtItemQuantity').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#btnSaveItem').focus();
        }
        checkQty();
});

/** Sweet Alert for Save Item */
function alertSsItm() {
    Swal.fire({
        position: 'top',
        icon: 'success',
        text:'Saved Item Successfully...!',
        title: 'Succsess',
        showConfirmButton: false,
        timer: 1500
    });
}

/** Key Event to Save Item */
$('#btnSaveItem').on('keyup', function (event) {

    if (event.key == 'Enter') {
        $('#floatingInputItemID').focus();
        let res = saveItem($('#floatingInputItemID').val(), $('#floatingInputItemName').val(), $('#floatingInputUPrice').val(), $('#floatingInputQty').val(), $('#formFile').val(), getSelectedRbtn(), imgsrc);
        if (res) {
            alertSsItm();
            clearAllItemText();
            $('#floatingInputItemID').focus();
            genatareItemID();
        }
    }

});

/** Key Event to Search Item */
$('#btnItemSearch').click(function () {
    scrhItem();
});

$('#btnItemSearch').on('keyup', function (event) {
    if (event.key == 'Enter') {
        scrhItem();
    }
});

$('#txtItemSearch').on('keyup', function (event) {
        if (event.key == 'Enter') {
            $('#btnItemSearch').focus();
        }
});

function scrhItem() {
    let item = searchItem($('#txtItemSearch').val());
    console.log(item)
    if (item == null) {
        alert("Can't Found Item..!");
    } else {
        $('#txtItemCode').val(item.getItemCode());
        $('#txtItemName').val(item.getItemName());
        $('#txtItemPrice').val(item.getItemUnitPrice());
        $('#txtItemQuantity').val(item.getItemQty());
    }
}

$('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

/** Save Item in btn Click */
$('#btnSaveItem').click(function () {
    let res = saveItems($('#txtItemCode').val(), $('#txtItemName').val(), $('#txtItemPrice').val(), $('#txtItemQuantity').val());
    if (res) {
        clearAllItemText();
        alertSsItm();
        $('#txtItemCode').focus();
        genatareItemID();
    }
});

/** Update Item in btn Click */
$('#btnUpdateItem').click(function () {
    let itemID = $("#txtItemCode").val();
    let option = confirm(`Do you want to Update this item ? ${itemID}`);
    if (option) {
        let res = updateItems($('#txtItemCode').val(), $('#txtItemName').val(), $('#txtItemPrice').val(), $('#txtItemQuantity').val());
        if (res) {
            clearAllItemText();
            alert("Item Updated Successfully..!");
        } else {
            alert("Item Updated Failed..!");
        }
    }
});

/** Delete Item in btn Click */
$('#btnDeleteItem').click(function () {
    let itemID = $("#txtItemCode").val();
    let option = confirm(`Do you want to Delete this item ? ${itemID}`);
    if (option) {
        let res = deleteItems(itemID);
        if (res) {
            clearAllItemText();
            alert("Item Deleted Successfully..!");
        } else {
            alert("Item Deleted Failed..!");
        }
    }
});

/** Clear Item in btn Click */
$('#btnClearItem').click(function () {
    clearAllItemText();
});

$('#tblItem>tr').css('cursor', 'pointer');

/** ========================================== CRUD Operations in Item Content. ================================== */

/** Save Item */
function saveItems(itemCode,itemName,itemUnitPrice,itemQty) {
    if (checkItemID()) {
        if (checkItemName()) {
            if (checkUPrice()) {
                if (checkQty()) {
                        if (checkDuplicteItemID(itemCode)) {
                            $('#txtItemCode').css('border', '2px solid red');
                            $("#lblItemCode").text("Duplicate Item Code : I00-001").css('color','red');
                        } else {
                            let item = new ItemModel(itemCode,itemName,itemUnitPrice,itemQty);
                            itemArray.push(item);

                            /** Load All Items to Table */
                            loadItemtoTheTable();

                            $('#tblItem>tr').click(function () {
                                let itemCode = $(this).children().eq(0).text();
                                let itemName = $(this).children().eq(1).text();
                                let itemUnitPrice = $(this).children().eq(2).text();
                                let itemQty = $(this).children().eq(3).text();

                                $('#txtItemCode').val(itemCode);
                                $('#txtItemName').val(itemName);
                                $('#txtItemPrice').val(itemUnitPrice);
                                $('#txtItemQuantity').val(itemQty);
                            });
                            dblItemClick();
                            return true;
                        }
                } else {
                    $('#txtItemQuantity').css('border', '2px solid red').focus();
                }
            } else {
                $('#txtItemPrice').css('border', '2px solid red').focus();
            }
        } else {
            $('#txtItemName').css('border', '2px solid red').focus();
        }
    } else {
        $('#txtItemCode').css('border', '2px solid red').focus();
    }
    return false;
}

/** Delete Item */
function deleteItems(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let number = itemArray.indexOf(item);
        itemArray.splice(number, 1);
        /** Load All Items to Table */
        loadItemtoTheTable();
        clearAllItemText();
        $('#txtItemCode').val(genatareItemID());
        return true;
    } else {
        return false;
    }
}

/** Update Item */
function updateItems(itemCode,itemName,itemUnitPrice,itemQty) {
    if (checkItemID()) {
        if (checkItemName()) {
            if (checkUPrice()) {
                if (checkQty()) {
                        let item = searchItem(itemCode);
                        if (item != null) {
                            item.setItemName(itemName);
                            item.setItemUnitPrice(itemUnitPrice);
                            item.setItemQty(itemQty);

                            /** Load All Items to Table */
                            loadItemtoTheTable();

                            $('#tblItem>tr').click(function () {
                                let itemCode = $(this).children().eq(0).text();
                                let itemName = $(this).children().eq(1).text();
                                let itemUnitPrice = $(this).children().eq(2).text();
                                let itemQty = $(this).children().eq(3).text();

                                $('#txtItemCode').val(itemCode);
                                $('#txtItemName').val(itemName);
                                $('#txtItemPrice').val(itemUnitPrice);
                                $('#txtItemQuantity').val(itemQty);
                            });
                            dblItemClick();
                            return true;
                        } else {
                            return false;
                        }
                } else {
                    $('#txtItemQuantity').css('border', '2px solid red').focus();
                }
            } else {
                $('#txtItemPrice').css('border', '2px solid red').focus();
            }
        } else {
            $('#txtItemName').css('border', '2px solid red').focus();
        }
    }
    return false;
}

/** Get All Item */
function getAllItem() {
    return itemArray;
}

/** Search Item */
function searchItem(itemCode) {
    for (let i in itemArray) {
        if (itemArray[i].getItemCode() == itemCode) return itemArray[i];
    }
    return null;
}

/** Load All Items to Table */
function loadItemtoTheTable() {
    let allItems = getAllItem();
    $('#tblItem>tr').empty();
    for (let i in allItems) {
        let itemCode = allItems[i].getItemCode();
        let itemName = allItems[i].getItemName();
        let itemUnitPrice = allItems[i].getItemUnitPrice();
        let itemQty = allItems[i].getItemQty();

        var code = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemUnitPrice}</td><td>${itemQty}</td></tr>`;
        $('#tblItem').append(code);

        $('#tblItem>tr').click(function () {
            let itemCode = $(this).children().eq(0).text();
            let itemName = $(this).children().eq(1).text();
            let itemUnitPrice = $(this).children().eq(2).text();
            let itemQty = $(this).children().eq(3).text();

            $('#txtItemCode').val(itemCode);
            $('#txtItemName').val(itemName);
            $('#txtItemPrice').val(itemUnitPrice);
            $('#txtItemQuantity').val(itemQty);
        });
    }
}

/** Clear All Items Text */
function clearAllItemText() {
    genatareItemID();
    $('#txtItemName').val('');
    $('#txtItemPrice').val('');
    $('#txtItemQuantity').val('');
    $('#txtItemSearch').val('');
}

/** Key Events Add to Item Input Fields */
function checkItemID() {
    if (/^(I00-)[0-9]{1,3}$/.test($('#txtItemCode').val())) {
        $('#txtItemCode').css('border', '2px solid green');
        $("#lblItemCode").text(" ");
        return true;
    } else {
        $('#txtItemCode').css('border', '2px solid red');
        $("#lblItemCode").text("Your Input Item Code Pattern is Wrong : I00-001").css('color','red');
    }
    return false;
}

function checkItemName() {
    if (/^[A-z ]{1,}$/.test($('#txtItemName').val())) {
        $('#txtItemName').css('border', '2px solid green');
        $("#lblItemName").text(" ");
        return true;
    } else {
        $('#txtItemName').css('border', '2px solid red');
        $("#lblItemName").text("Your Input Item Name Pattern is Wrong : Rice & Curry").css('color','red');
    }
    return false;
}

function checkUPrice() {
    if (/^[0-9.]{1,}$/.test($('#txtItemPrice').val())) {
        $('#txtItemPrice').css('border', '2px solid green');
        $("#lblItemPrice").text(" ");
        return true;
    } else {
        $('#txtItemPrice').css('border', '2px solid red');
        $("#lblItemPrice").text("Your Input Item Unit Price Pattern is Wrong : 300.00").css('color','red');
    }
    return false;
}

function checkQty() {
    if (/^[0-9]{1,}$/.test($('#txtItemQuantity').val())) {//  ("^\\d{10}$")
        $('#txtItemQuantity').css('border', '2px solid green');
        $("#lblItemQty").text(" ");
        return true;
    } else {
        $('#txtItemQuantity').css('border', '2px solid red');
        $("#lblItemQty").text("Your Input Item Qty Pattern is Wrong : 10").css('color','red');
    }
    return false;
}

function checkDuplicteItemID(itemCode) {
    let allItems = getAllItem();
    for (let i in allItems) {
        if (itemCode == allItems[i].getItemCode()) {
            return true;
        }
        return false;
    }
}

function genatareItemID() {
    let LastId = itemArray[itemArray.length - 1].getItemCode();
    $('#txtItemCode').val('I00-00' + (parseInt(LastId.split('I00-00')[1]) + 1));
}

$('#txtItemCode').val('I00-001');

function dblItemClick() {
    /** Double Click Event to Delete Item */
    $('#tblItem>tr').on('dblclick', function () {
        let itemCode = $("#txtItemCode").val();
        let option = confirm(`Do you want to Delete this item ? ${itemCode}`);
        if (option) {
            $(this).remove();
            let res = deleteItems(itemCode);
            if (res) {
                alert("Item Deleted Successfully..!");
                clearAllItemText();
            } else {
                alert("Item Deleted Failed..!");
            }
        }
    });
}
