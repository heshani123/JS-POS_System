/** Customer Regular Expressions */

/*  Focused customerID input field When Firstly open that page..*/
$('#txtCustomerId').focus();

const cusIdRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9, |A-z, ]{7,}$/;
const cusMobileNoRegEx = /^[0-9]{10}$/;

/* Defined Validation Array */
let customerValidations = [];

/* Pushed regex pattern , related Input field Object & error massage to the Array */
customerValidations.push({reg: cusIdRegEx, field: $('#txtCustomerId'), error: 'Customer ID Pattern is Wrong Format: C00-001'});
customerValidations.push({reg: cusNameRegEx, field: $('#txtCustomerName'), error: 'Customer Name Pattern is Wrong Format: A-z 5-20'});
customerValidations.push({reg: cusAddressRegEx, field: $('#txtCustomerAddress'), error: 'Customer Address Pattern is Wrong Format: A-z 0-9 ,/'});
customerValidations.push({reg: cusMobileNoRegEx, field: $('#txtCustomerMobileNo'), error: 'Customer Mobile No Pattern is Wrong Format: 071-2345678'});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerMobileNo').on('keydown',function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerMobileNo').on('keyup',function (event) {
    checkValidity();
});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerMobileNo').on('blur',function (event) {
    checkValidity();
});

function checkValidity() {
    let errorCount = 0;
    for (let validation of customerValidations) {
        if (validation.reg.text(validation.field.val())) {
            textSuccess(validation.field,"");
        }else {
            errorCount = errorCount + 1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function textSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    }else {
        txtField.css('border','2px solid green');
        txtField.parent().children('.control-error').text(error);
    }
}

function setTextError(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultText(txtField,"");
    }else {
        txtField.css('border','2px solid red');
        txtField.parent().children('.control-error').text(error);
    }
}

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveCustomer").attr('disabled', true);
    } else {
        $("#btnSaveCustomer").attr('disabled', false);
    }
}

function defaultText(txtField, massage) {
    txtField.css("border", "2px solid #ced4da");
    txtField.parent().children('.control-error').text(massage);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function focusText(txtField) {
    txtField.focus();
}

function clearAllTexts() {
    $('#txtCustomerId').focus();
    $('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerMobileNo').val("");
    checkValidity();
}

$('#txtCustomerId').on('keydown',function (event) {
    if (event.key == 'Enter' && check(cusIdRegEx,$('#txtCustomerId'))) {
        $('#txtCustomerName').focus();
    }else {
        focusText($('#txtCustomerId'));
    }
});

$('#txtCustomerName').on('keydown',function (event) {
    if (event.key == 'Enter' && check(cusNameRegEx,$('#txtCustomerName'))) {
        focusText($('#txtCustomerAddress'));
    }
});

$('#txtCustomerAddress').on('keydown',function (event) {
    if (event.key == 'Enter' && check(cusAddressRegEx,$('#txtCustomerAddress'))) {
        focusText($('#txtCustomerMobileNo'));
    }
});

$('#txtCustomerMobileNo').on('keydown',function (event) {
    if (event.key == 'Enter' && check(cusMobileNoRegEx,$('#txtCustomerMobileNo'))) {
        let response = confirm("Do you want to add this customer ?");
        if (response) {
            clearAllTexts();
        }
    }
});
