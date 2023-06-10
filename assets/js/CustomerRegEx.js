/** Customer Regular Expressions */
$('#txtCustomerId').focus();

const cusIdRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9, |A-z, ]{7,}$/;
const cusMobileNoRegEx = /^[0-9]{10}$/;

$('#txtCustomerId').keyup(function () {
    let input = $('#txtCustomerId').val();
    if (cusIdRegEx.test(input)) {
        $('#txtCustomerId').css('border', '2px solid green');
        $('.control-error').text("");
    }else{
        $('#txtCustomerId').css('border', '2px solid red');
        $('.control-error').text("Customer ID Pattern is Wrong Format: C00-001");
    }
});

$('#txtCustomerName').keyup(function () {
    let input = $('#txtCustomerName').val();
    if (cusNameRegEx.test(input)) {
        $('#txtCustomerName').css('border', '2px solid green');
        $('.control-error').text("");
    }else{
        $('#txtCustomerName').css('border', '2px solid red');
        $('.control-error').text("Customer Name Pattern is Wrong Format: A-z 5-20");
    }
});

$('#txtCustomerAddress').keyup(function () {
    let input = $('#txtCustomerAddress').val();
    if (cusAddressRegEx.test(input)) {
        $('#txtCustomerAddress').css('border', '2px solid green');
        $('.control-error').text("");
    }else{
        $('#txtCustomerAddress').css('border', '2px solid red');
        $('.control-error').text("Customer Address Pattern is Wrong Format: A-z 0-9 ,/");
    }
});

$('#txtCustomerMobileNo').keyup(function () {
    let input = $('#txtCustomerMobileNo').val();
    if (cusMobileNoRegEx.test(input)) {
        $('#txtCustomerMobileNo').css('border', '2px solid green');
        $('.control-error').text("");
    }else{
        $('#txtCustomerMobileNo').css('border', '2px solid red');
        $('.control-error').text("Customer Mobile No Pattern is Wrong Format: 071-2345678");
    }
});