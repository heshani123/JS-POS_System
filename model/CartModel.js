function CartModel(orderId,itemCode, itemName, itemUnitPrice, itemAvailableQty,itemBuyQty) {
    var __orderId = orderId;
    var __itemCode = itemCode;
    var __itemName = itemName;
    var __itemUnitPrice = itemUnitPrice;
    var __itemAvailableQty = itemAvailableQty;
    var __itemBuyQty = itemBuyQty;

    this.getOrderID = function (){
        return __orderId;
    }
    this.setOrderID = function (newOrderId) {
        __orderId = newOrderId;
    }
    this.getItemCode = function (){
        return __itemCode;
    }
    this.setItemCode = function (newItemCode) {
        __itemCode = newItemCode;
    }
    this.getOItemName = function (){
        return __itemName;
    }
    this.setOItemName = function (newItemName) {
        __itemName = newItemName;
    }
    this.getOItemUnitPrice = function (){
        return __itemUnitPrice;
    }
    this.setOItemUnitPrice = function (newItemUnitPrice) {
        __itemUnitPrice = newItemUnitPrice;
    }
    this.getItemAvailableQty = function (){
        return __itemAvailableQty;
    }
    this.setItemAvailableQty = function (newItemAvailableQty) {
        __itemAvailableQty = newItemAvailableQty;
    }
    this.getItemBuyQty = function (){
        return __itemBuyQty;
    }
    this.setItemBuyQty = function (newItemBuyQty) {
        __itemBuyQty = newItemBuyQty;
    }

}