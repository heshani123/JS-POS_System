function CustomerModel(cusId, cusName, cusAddress, cusMobileNo) {
    var __cusId = cusId;
    var __cusName = cusName;
    var __cusAddress = cusAddress;
    var __cusMobileNo = cusMobileNo;

    this.getCustomerID = function (){
        return __cusId;
    }
    this.setCustomerID = function (newCusId) {
        __cusId = newCusId;
    }
    this.getCustomerName = function (){
        return __cusName;
    }
    this.setCustomerName = function (newCusName) {
        __cusName = newCusName;
    }
    this.getCustomerAddress = function (){
        return __cusAddress;
    }
    this.setCustomerAddress = function (newCusAddress) {
        __cusAddress = newCusAddress;
    }
    this.getCustomerMobileNo = function (){
        return __cusMobileNo;
    }
    this.setCustomerMobileNo =function (newCusMobileNo) {
        __cusMobileNo = newCusMobileNo;
    }
}