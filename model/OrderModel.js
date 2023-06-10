function OrderModel(orderId, cusId, detail,total, date) {
    var __orderId = orderId;
    var __cusId = cusId;
    var __detail = detail;
    var __total = total;
    var __date = date;

    this.getOrderId = function (){
        return __orderId;
    }
    this.setOrderId = function (newOrderId) {
        __orderId = newOrderId;
    }
    this.getCusId = function (){
        return __cusId;
    }
    this.setCusId = function (newCusId) {
        __cusId = newCusId;
    }
    this.getDetail = function (){
        return __detail;
    }
    this.setDetail = function (newDetail) {
        __detail = newDetail;
    }
    this.getTotalAmount = function (){
        return __total;
    }
    this.setTotalAmount=function (newTotal) {
        __total = newTotal;
    }
    this.getDate = function (){
        return __date;
    }
    this.setDate = function (newDate) {
        __date = newDate;
    }
}