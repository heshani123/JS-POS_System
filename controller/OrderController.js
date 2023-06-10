$('#linkPlaceOrder').click(function () {
    $('#placeOrderContent').fadeIn(1000);

});

$('#linkPlaceOrder').on('click', function () {
    if (customerArray.length > 0) {
        loadAllCustomersID();
    }
    if (itemArray.length > 0) {
        loadAllItemsID();
    }
});

/** Load All Customers IDs */
function loadAllCustomersID() {
    $('#cmbCusIDs').empty();
    $('#cmbCusIDs').append(`<option value=0 id="option">Select Customer</option>`);
    for (let i in customerArray) {
        let id = customerArray[i].getCustomerID();
        console.log(i);
        var option = `<option value=${i} id="option">${id}</option>`;
        $('#cmbCusIDs').append(option);
    }
}

/** Load All Item Codes */
function loadAllItemsID() {
    $('#cmbItemCodes').empty();
    $('#cmbItemCodes').append(`<option value=0 id="option">Select Item</option>`);
    for (let i in itemArray) {
        let id = itemArray[i].getItemCode();
        console.log(i);
        var option = `<option value=${i} id="option">${id}</option>`;
        $('#cmbItemCodes').append(option);
    }
}

/** Get Selected Customer ID */
$('#cmbCusIDs').on('change', function () {
    console.log('change cust cmb');
    loadCustomerData($('#cmbCusIDs option:selected').text());
});

/** Get Selected Item Code */
$('#cmbItemCodes').on('change', function () {
    console.log('change item cmb');
    loadItemData($('#cmbItemCodes option:selected').text());
});

/** Generate Order ID */
$('#orderId').val("R00-001");

function genatareOID() {
    $('#orderId').val('');
    let arr = getOrder();
    let ord = arr[arr.length - 1];
    let LastId=ord.getOrderId();
    $('#orderId').val('R00-00' + (parseInt(LastId.split('R00-00')[1]) + 1));
}

$('#btnAddToCart').click(function () {
    addToCart();
});

/** Set Customers Details */
function loadCustomerData(cid) {
    let customer = searchCustomer(cid);
    if (customer == null) {
    } else {
        $('#cusName').val(customer.getCustomerName());
        $('#cusAddress').val(customer.getCustomerAddress());
        $('#cusMobileNo').val(customer.getCustomerMobileNo());
    }
}

/** Set Items Details */
function loadItemData(id) {
    let item = searchItem(id);
    if (item == null) {
    } else {
        console.log(item.getItemName() + 'load id t' + id);
        $('#itemName').val(item.getItemName());
        $('#itemAvailableQty').val(item.getItemQty());
        $('#itemUnitPrice').val(item.getItemUnitPrice());
    }
}

/** Get Order Details */
function getOrder() {
    return orderArray;
}

/** Add All Items to Cart */
function addToCart() {
    if (checkingOrderID) {
        if (checkItem()) {
            if (checkBQty($('#itemBuyQty').val())) {
                let itemCode = $('#cmbItemCodes option:selected').text();
                if (duplicateItemsCheck(itemCode)) {
                } else {
                    let orderId = $('#orderId').val();
                    let item = searchItem(itemCode);
                    let cart = new CartModel(orderId, itemCode, item.getOItemName(), item.getOItemUnitPrice(), item.getItemAvailableQty(), $('#itemBuyQty').val());
                    cartArray.push(cart);
                    addItemToTable(itemCode);
                    deletecartItem(item);
                    clearCartItem();
                }
            } else {
            }
        } else {
        }
    } else {
    }
}

function checkCName() {
    if ($('#cusName').val() == null) {
        return false;
    }
    return true;
}

function checkItem() {
    let item = searchItem($('#cmbItemCodes option:selected').text());
    if (item == null) {
        $('#cmbItemCodes').css('border', '2px solid red').focus();
        $("#lblOItemCode").text("Choose Item").css('color','red');
        return false;
    }
    $('#cmbItemCodes').css('border', '2px solid green').focus();
    $("#lblOItemCode").text("");
    return true;
}

function checkCustomerFill() {
    let customer = searchCustomer($('#cmbCusIDs option:selected').text());
    if (customer == null) {
        $('#cmbCusIDs').css('border', '2px solid red').focus();
        $("#lblCusID").text("Select Customer ID").css('color','red');
        return false;
    }
    $('#cmbCusIDs').css('border', '2px solid green').focus();
    $("#lblCusID").text("");
    return true;
}

$('#itemBuyQty').on('keyup', function () {
    checkBQty($('#itemBuyQty').val());
});

function checkBQty(bqty) {
    if (/^[0-9]{1,}$/.test(bqty)) {//  ("^\\d{10}$")
        $('#itemBuyQty').css('border', '2px solid green');
        $("#lblItemBuyQty").text(" ");
        return checkAvaQty(bqty);
    } else {
        $('#itemBuyQty').css('border', '2px solid red');
        $("#lblItemBuyQty").text("Your Input Item Buy Qty Pattern is Wrong : 10").css('color','red');
    }
    return false;
}

function checkAvaQty(bqty) {
    let itemAvailableQty = parseInt($('#itemAvailableQty').val());
    if (bqty > itemAvailableQty) {
        $('#itemAvailableQty').css('border', '2px solid red');
        $('#itemBuyQty').css('border', '2px solid red').focus();
        $("#lblItemBuyQty").text("Out of Stock. (available qty : " + itemAvailableQty + " )").css('color','red');
        return false;
    } else {
        $('#itemBuyQty').css('border', '2px solid green');
        $('#itemAvailableQty').css('border', '2px solid white');
        $("#lblItemBuyQty").text(" ");
        return true;
    }
}

/** Load All Items to Table */
function addItemToTable() {
    let allItems = cartArray;
    $('#tblOrderDetails>tr').empty();
    for (let i in allItems) {
        let itemCode = allItems[i].getItemCode();
        let itemName = allItems[i].getOItemName();
        let itemUnitPrice = allItems[i].getOItemUnitPrice();
        let itemAvailableQty = allItems[i].getItemAvailableQty();
        let itemBuyQty = allItems[i].getItemBuyQty();
        let total = allItems[i].getTotalAmount();

        var code = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemUnitPrice}</td><td>${itemAvailableQty}</td><td>${itemBuyQty}</td><td>${total}</td></tr>`;
        $('#tblOrderDetails').append(code);

        let subTot = parseFloat(parseFloat(itemUnitPrice) * parseFloat(itemBuyQty));
        $('#subTotal').val(subTot);
        calcTotal();

        $('#tblOrderDetails>tr').click(function () {
            let itemCode = $(this).children().eq(0).text();
            let itemName = $(this).children().eq(1).text();
            let itemUnitPrice = $(this).children().eq(2).text();
            let itemAvailableQty = $(this).children().eq(3).text();
            let itemBuyQty = $(this).children().eq(4).text();
            let total = $(this).children().eq(5).text();

            $('#hiddenItemCodes').val(itemCode);
            $('#itemName').val(itemName);
            $('#itemUnitPrice').val(itemUnitPrice);
            $('#itemAvailableQty').val(itemAvailableQty);
            $('#itemBuyQty').val(itemBuyQty);
            $('#total').val(total);
        });
        dblCartItemClick();
    }
}

/** Double Click Event to Delete Item */
function dblCartItemClick() {
    $('#tblOrderDetails>tr').on('dblclick', function () {
        let itemID = $('#hiddenItemCodes').val();
        let option = confirm(`Do you want to Delete this item ? ${itemID}`);
        if (option) {
            console.log(itemID);
            let res = deletecartItem(itemID);
            if (res) {
                $(this).remove();
                alert("Item Removed in cart Successfully..!");
                clearCartItem();
            } else {
                alert("Item Removed Failed..!");
            }
        }
    });
}

/** Search Items in Cart */
function searchItemCart(id) {
    for (let i in cartArray) {
        if (cartArray[i].getItemCode() == id) return cartArray[i];
    }
    return null;
}

/** Double Click Event to Delete Cart Item */
function deletecartItem(id) {
    let item = searchItemCart(id);
    if (item != null) {
        let number = cartArray.indexOf(item);
        cartArray.splice(number, 1);
        calcTotal();
        addItemToTable();
        clearCartItem();
        return true;
    } else {
        return false;
    }
}

/** Calculate the Total */
function calcTotal() {
    let total = parseFloat(0.0);
    for (let i in cartArray) {
        let uprice = parseFloat(cartArray[i].getOItemUnitPrice());
        let bqty = parseFloat(cartArray[i].getItemBuyQty());
        total = total + (uprice * bqty);
    }
    $('#total').val(total);
    return total;
}

/** Clear Cart Item */
function clearCartItem() {
    loadAllItemsID();
    $('#itemName').val('');
    $('#itemAvailableQty').val('');
    $('#itemUnitPrice').val('');
    $('#itemBuyQty').val('');
}

/** Delete Item in Click Event */
$('#btnPreOrderDelete').click(function () {
    dblCartItemClick();
});

function duplicateItemsCheck(id) {
    for (let i in cartArray) {
        if (cartArray[i].getItemCode() == id) {
            let bqty = parseInt($('#itemBuyQty').val()) + parseInt(cartArray[i].getItemBuyQty());
            console.log('bqty' + bqty);
            if (checkBQty(bqty)) {
                cartArray[i].setItemBuyQty(bqty);
                addItemToTable();
            } else {
                $('#itemBuyQty').css('border', '2px solid green');
                $('#itemAvailableQty').css('border', '2px solid white');
                $("#lblItemBuyQty").text("Out of Stock").css('color','red');
            }
            return true;
        }
    }
    return false;
}

/** Cash Event */
$('#cash').on('keyup', function () {
    if (/^[0-9.]{1,}$/.test($('#cash').val())) {
        $('#cash').css('border', '2px solid green');
        $("#lblCash").text("");
        let bal = parseFloat(parseFloat($('#cash').val()) - calcTotal());
        $('#balance').val(bal);
    } else {
        $('#cash').css('border', '2px solid red');
        $("#lblCash").text("Your Input Order Item Cash Pattern is Wrong : 300.00").css('color','red');
    }
});

/** Discount Event */
$('#discount').on('keyup', function () {
    if (/^[0-9.]{1,}$/.test($('#discount').val())) {
        $('#discount').css('border', '2px solid green');
        $("#lblDiscount").text("");
        let newBal = parseFloat(calcTotal() - (calcTotal() * (parseFloat($('#discount').val()) / 100)));
        $('#balance').val(newBal);
    } else {
        $('#discount').css('border', '2px solid red');
        $("#lblDiscount").text("Your Input Order Item Discount is Wrong : 50.00").css('color','red');
    }
});

/** Check Cart Details */
function checkingCart() {
    if (cartArray.length > 0) {
        return true;
    } else {
        return false;
    }
}

/** Check Order ID */
function checkingOrderID() {
    if ($('#orderId').val() != null) {
        return true
    }
    return false;
}

/** Place Order */
function placeOrderAction(orderId, cusId, detail, total, date) {
    if (checkingOrderID()) {
        console.log('chck ');
        if (checkingDate()) {
            console.log('chck 1');
            if (checkCustomerFill()) {
                console.log('chck 2');
                if (checkingCart()) {
                    console.log('chck 3');
                    if (checkCash()) {
                        console.log('chck 4');
                        if (checkBalnce()) {
                            console.log('chck 5');
                            let ord = new OrderModel(orderId, cusId, detail, total, date);
                            orderArray.push(ord);
                            return true;
                        } else {
                        }
                    } else {
                        $('#cash').css('border', '2px solid red');
                        $("#lblCash").text("Your Input Order Item Cash Pattern is Wrong : 1000.00").css('color','red');
                    }
                } else {
                    $('#cmbItemCodes').css('border', '2px solid red');
                    $("#lblOItemCode").text("Add Items to cart").css('color','red');
                }
            } else {
                $('#cmbCusIDs').css('border', '2px solid red');
                $("#lblCustomerID").text("Select Customer ID").css('color','red');
            }
        } else {
            $('#orderDate').css('border', '2px solid red');
            $("#lblOrdDate").text("Choose Date").css('color','red');
        }
    } else {
    }
    return false;
}

/** Print Reception */
function printReciept(orderId, cusId, detail, total, date) {
    let totle = $('#total').val();
    let cash = $('#cash').val();
    let balance = $('#balance').val();
    Swal.fire({
        position: 'center',
        icon: 'success',
        html: "Order ID : <br />" + orderId + "<br />Date : " + date + "<br />Customer ID : " +cusId+ "<br />No of Item : " + cartArray.length + "<br />Total(Rs.) : " + totle + "<br /><br/>Cash(Rs.) : " + cash + "<br />Balanace(Rs.) : " + balance,
        title: 'KAVINS Cafe Food & Restaurant - Reception',
        footer: 'Happy Customer....! Come Back...!',
        confirmButtonText: 'Ok',
    });
    cartArray.splice(0, cartArray.length);
}

function printError() {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops, Failed Place Order',
        text: 'Try Again...!',
        showConfirmButton: false,
        timer: 1500
    });
}

/** Place Order btn for Click Event */
$('#btnPlaceOrder').click(function () {
    let res = placeOrderAction($('#orderId').val(), $('#cmbCusIDs option:selected').text(), cartArray, $('#total').val(), $('#orderDate').val());
    if (res) {
        printReciept($('#orderId').val(), $('#cmbCusIDs option:selected').text(), cartArray, $('#total').val(), $('#orderDate').val());
        genatareOID();
        clearForm();
    } else {
        printError();
    }
});

/** Check Date */
function checkingDate() {
    $('#orderDate').val();
    return true;
}

/** Check Cash */
function checkCash() {
    let cash = parseFloat($('#cash').val());
    if (cash > 0) {
        return true;
    } else {
        $('#balance').css('border', '2px solid red');
        $('#lblBalance').text("");
        return false;
    }
}

/** Check Balance */
function checkBalnce() {
    let bal = parseFloat($('#balance').val());
    if (bal > 0) {
        return true;
    } else {
        $('#balance').css('border', '2px solid red');
        $('#lblBalance').text("");
        return false;
    }
}

/** Clear Form All Data */
function clearForm() {
    loadAllCustomersID();
    $('#tblOrderDetails>tr').empty();
    $('#cash').val('0.0');
    $('#subTotal').val('0.0');
    $('#total').val('0.0');
    $('#balance').val('0.0');
    $('#discount').val('0.0');
    $('#cmbCusIDs').focus();
}