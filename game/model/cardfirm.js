var CardDefault = require("./carddefault");

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
        super(name,"CardFirm",image);
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
        this.userOwner = userOwner;
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
        
        //если фирма ничья то ее можно купить или выставить на аукцион
        if (getUserOwner() == null) {
            if (userMonopoly.getMoney() >= this.getPrice()) {
                Util.addUnicAll(userMonopoly.getAvailableAction(),[BUY_FIRM]);
                //userMonopoly.getAvailableAction().add(BUY_FIRM);
            }
            //userMonopoly.getAvailableAction().add(AUCTION_START);
            Util.addUnicAll(userMonopoly.getAvailableAction(),[AUCTION_START]);
        } else {
            if (userMonopoly != getUserOwner() && !isPut() ) {
                userMonopoly.setPenalty(0 - getPenalty());
                if(userMonopoly.getMoney()>getPenalty()) {
                    //userMonopoly.getAvailableAction().add(PAY_PENALTY);
                    Util.addUnicAll(userMonopoly.getAvailableAction(),[PAY_PENALTY]);
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
        if(getFilialStay()< getCountFilial() && user.getMoney()>=getFilialPrice()) {
            user.setMoney(user.getMoney() - getFilialPrice());
            setFilialStay(getFilialStay()+1);
            ActionUser.createInstance(monopolyGame, user, BUY_FILIAL, this);
        }else{
            // штраф
            monopolyGame.penaltyCheating(user);
        }
    }

    //public void sellFilial(MonopolyGame monopolyGame,UserMonopoly user){
    sellFilial(monopolyGame, user){
        if(getUserOwner()!=null && user==getUserOwner() && getFilialStay()>0) {
            user.setMoney(user.getMoney() + getFilialPrice());
            setFilialStay(getFilialStay()-1);
        }else{
            //штраф
            monopolyGame.penaltyCheating(user);
        }
    }

    //вернуть в банк
    //public void returnInBank(GameMonopoly gameMonopoly) {
    returnInBank(gameMonopoly) {
        //фирму в банк деньги пользователю
        userOwner.setMoney(userOwner.getMoney()+getFilialStay()*getFilialPrice()+getPrice());
        setUserOwner(null);
    }

   // public int getPenalty() {
    getPenalty() {
        return Math.round(getPrice()/5+(getPrice()*(filialStay*filialStay))/10);
    }


    //public boolean putFirm(MonopolyGame monopolyGame, UserMonopoly curentUser) {
    putFirm(monopolyGame, curentUser) {
        if(getUserOwner()==curentUser & getFilialStay()==0){
            curentUser.setMoney(curentUser.getMoney()+Math.round(getPrice()/2));
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
       if(getUserOwner()==curentUser && isPut() && curentUser.getMoney()>getPrice()){
            curentUser.setMoney(curentUser.getMoney()-getPrice());
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
