var CardDefault = require("./../../model/carddefault");
var Util = require("./../../model/util");
var ActionUser = require("./actionuser");
class Card extends CardDefault {
    
    //private int id;
    id;
    
    userOwner;
    
    constructor(name, image){
        super(name,"CARD",image);
        this.price = price; 
    }

    getId() {
        return this.id;
    }

    getUserOwner() {
        return this.userOwner;
    }

    setUserOwner( userOwner) {
        this.userOwner = userOwner.getName();
    }

}

module.exports = Card;
