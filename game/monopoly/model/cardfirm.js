var CardDefault = require("./carddefault");
var Util = require("./util");
var ActionUser = require("./actionuser");
class CardFirm extends CardDefault {
    
    //private int id;
    id;
    //стоимость фирмы
    //private int price;
    price;
    //владелец фирмы
    //private UserMonopoly userOwner;
    userOwner;
    //возможное количество филиалов
    //private int countFilial;
    countFilial;
    //размещенное количество филиалов
    //private int filialStay;
    filialStay;
    //стоимость филиала
    //private int filialPrice;
    filialPrice;
    //номер монополии
    //private int numMonopoly;
    numMonopoly;
    //количество фирм в монополии
    //private int countFirmInMonopoly;
    countFirmInMonopoly;
    //private int penalty;
    penalty
    //фирма находится в залоге
    //private boolean put=false;
    put=false;

   // public CardFirm(String name, int price, int countFilial, int filialPrice, int numMonopoly, int countFirmInMonopoly) {
    constructor(name, price, countFilial, filialPrice, numMonopoly, countFirmInMonopoly, image){
        super(name,"CARD_FIRM",image);
        this.price = price;      
        this.countFilial = countFilial;
        this.filialPrice = filialPrice;
        this.numMonopoly=numMonopoly;
        this.countFirmInMonopoly=countFirmInMonopoly;
    }

    //public int getId() {
    getId() {
        return this.id;
    }

    //public int getPrice() {
    getPrice() {
        return this.price;
    }

    //public void setPrice(int price) {
    setPrice( price) {
        this.price = price;
    }

    //public UserMonopoly getUserOwner() {
    getUserOwner() {
        return this.userOwner;
    }

    //public void setUserOwner(UserMonopoly userOwner) {
    setUserOwner( userOwner) {
        this.userOwner = userOwner.getName();
    }

    //public int getCountFilial() {
    getCountFilial() {
        return this.countFilial;
    }

    //public void setCountFilial(int countFilial) {
    setCountFilial(countFilial) {
        this.countFilial = countFilial;
    }

    //public int getFilialStay() {
    getFilialStay() {
        return this.filialStay;
    }

    //public void setFilialStay(int filialStay) {
    setFilialStay(filialStay) {
        this.filialStay = filialStay;
    }

    //public int getFilialPrice() {
    getFilialPrice() {
        return this.filialPrice;
    }

    //public void setFilialPrice(int filialPrice) {
    setFilialPrice(filialPrice) {
        this.filialPrice = filialPrice;
    }

    //public int getNumMonopoly() {
    getNumMonopoly() {
        return this.numMonopoly;
    }

    //public void setNumMonopoly(int numMonopoly) {
    setNumMonopoly(numMonopoly) {
        this.numMonopoly = numMonopoly;
    }

    //public int getCountFirmInMonopoly() {
    getCountFirmInMonopoly() {
        return this.countFirmInMonopoly;
    }

    //public void setCountFirmInMonopoly(int countFirmInMonopoly) {
    setCountFirmInMonopoly(countFirmInMonopoly) {
        this.countFirmInMonopoly = countFirmInMonopoly;
    }

    //public boolean isPut() {
    isPut() {
        return this.put;
    }

    //public void setPut(boolean put) {
    setPut( put) {
        this.put = put;
    }

    //@Override
    //public void transferCardForUser(Room room, UserRoom userRoom) {
    transferCardForUser(gameMonopoly, userMonopoly) {
        console.log('transferCardForUser');
        //если фирма ничья то ее можно купить или выставить на аукцион
        if (this.getUserOwner() == null) {
            if (userMonopoly.getMoney() >= this.getPrice()) {
                Util.addUnicAll(userMonopoly.getAvailableAction(),["BUY_FIRM"]);
                console.log('add buy: '+userMonopoly.getAvailableAction());
                //userMonopoly.getAvailableAction().add(BUY_FIRM);
            }
            //userMonopoly.getAvailableAction().add(AUCTION_START);
            Util.addUnicAll(userMonopoly.getAvailableAction(),["AUCTION_START"]);
            console.log('add AUCTION_START: '+userMonopoly.getAvailableAction());
        } else {
            if (userMonopoly.getName() != this.getUserOwner() && !this.isPut() ) {
                userMonopoly.setPenalty(0 - this.getPenalty());
                if(userMonopoly.getMoney()>this.getPenalty()) {
                    //userMonopoly.getAvailableAction().add(PAY_PENALTY);
                    Util.addUnicAll(userMonopoly.getAvailableAction(),["PAY_PENALTY"]);
                }
            }else{
                gameMonopoly.nextGamer();
                return;
            }
        }
    }

    //@Override
    //public void dropInToCard(Room room, UserRoom userRoom) {
    dropInToCard(room, userRoom) {

    }

    //купить филиал
    //public void buyFilial(MonopolyGame monopolyGame,UserMonopoly user){
    buyFilial( monopolyGame, user){
        if(this.getFilialStay()< this.getCountFilial() && user.getMoney()>=this.getFilialPrice()) {
            user.setMoney(user.getMoney() - this.getFilialPrice());
            this.setFilialStay(this.getFilialStay()+1);
            ActionUser.createInstance(monopolyGame, user, "BUY_FILIAL", this);
        }else{
            // штраф
            monopolyGame.penaltyCheating(user);
        }
    }

    //public void sellFilial(MonopolyGame monopolyGame,UserMonopoly user){
    sellFilial(monopolyGame, user){
        if(this.getUserOwner()!=null && user.getName()==this.getUserOwner() && this.getFilialStay()>0) {
            user.setMoney(user.getMoney() + this.getFilialPrice());
            this.setFilialStay(this.getFilialStay()-1);
        }else{
            //штраф
            monopolyGame.penaltyCheating(user);
        }
    }

    //вернуть в банк
    //public void returnInBank(GameMonopoly gameMonopoly) {
    returnInBank(gameMonopoly) {
        //фирму в банк деньги пользователю
        var fullUser = gameMonopoly.getUserByName(this.getUserOwner());
        fullUser.setMoney(fullUser.getMoney()+this.getFilialStay()*this.getFilialPrice()+this.getPrice());
        this.setUserOwner(null);
    }

   // public int getPenalty() {
    getPenalty() {
        return Math.round(this.getPrice()/5+(this.getPrice()*(this.filialStay*this.filialStay))/10);
    }


    //public boolean putFirm(MonopolyGame monopolyGame, UserMonopoly curentUser) {
    putFirm(monopolyGame, curentUser) {
        if(this.getUserOwner()==curentUser.getName() & this.getFilialStay()==0){
            curentUser.setMoney(curentUser.getMoney()+Math.round(this.getPrice()/2));
            this.put=true;
            return true;
        }else{
            //штраф
            monopolyGame.penaltyCheating(curentUser);
            return false;
        }
    }

    //public boolean redeemFirm(MonopolyGame monopolyGame, UserMonopoly curentUser) {
    redeemFirm(monopolyGame, curentUser) {
       if(this.getUserOwner()==curentUser.getName() && this.isPut() && curentUser.getMoney()>this.getPrice()){
            curentUser.setMoney(curentUser.getMoney()-this.getPrice());
            put=false;
            return true;
        }else{
            //штраф
            monopolyGame.penaltyCheating(curentUser);
            return false;
        }
    }
}

module.exports = CardFirm;
