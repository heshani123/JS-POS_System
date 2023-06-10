function ItemModel(itemCode, itemName, itemUnitPrice, itemQty) {
    var __itemCode = itemCode;
    var __itemName = itemName;
    var __itemUnitPrice = itemUnitPrice;
    var __itemQty = itemQty;

    this.getItemCode = function (){
        return __itemCode;
    }
    this.setItemCode = function (newItemCode) {
        __itemCode = newItemCode;
    }
    this.getItemName = function (){
        return __itemName;
    }
    this.setItemName = function (newItemName) {
         __itemName = newItemName;
    }
    this.getItemUnitPrice = function (){
        return __itemUnitPrice;
    }
    this.setItemUnitPrice = function (newItemUnitPrice) {
        __itemUnitPrice = newItemUnitPrice;
    }
    this.getItemQty = function (){
        return __itemQty;
    }
    this.setItemQty = function (newItemQty) {
        __itemQty = newItemQty;
    }
}