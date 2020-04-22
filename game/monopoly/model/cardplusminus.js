var CardDefault = require("./../../carddefault");
var ActionUser = require("./actionuser");
var Util = require("./../../util");
class CardPlusMinus extends CardDefault {
    //private List<Integer> possibleShtraf;
    possibleShtraf;

    constructor(name, possibleShtraf, image) {
        super(name, "CardPlusMinus", image);
        this.possibleShtraf = possibleShtraf;
    }

    //public List<Integer> getPossibleShtraf() {
    getPossibleShtraf() {
        return this.possibleShtraf;
    }

    //public void setPossibleShtraf(List<Integer> possibleShtraf) {
    setPossibleShtraf(possibleShtraf) {
        this.possibleShtraf = possibleShtraf;
    }

    /**{@inheritDoc}*/
    //@Override
    //public void transferCardForUser(Room room, UserRoom userRoom) {
    transferCardForUser(gameMonopoly, userMonopoly) {
         
        var pm=userMonopoly.getPenalty();
        if(pm==0) {
            pm = this.possibleShtraf[Util.getRandom(0,this.possibleShtraf.length)];
        }
        if(pm>0){
            userMonopoly.setMoney(userMonopoly.getMoney() + pm);
            ActionUser.createInstance(gameMonopoly,userMonopoly, "RECEIVE_INCOME", userMonopoly.getName());
            gameMonopoly.nextGamer();
        }else{
            ActionUser.createInstance(gameMonopoly,userMonopoly, "GET_PENALTY", pm);
            userMonopoly.setPenalty(pm);
        }
    }

    /**{@inheritDoc}*/
    //@Override
    //public void dropInToCard(Room room, UserRoom userRoom) {
    dropInToCard(room, userRoom) {
    }
}
module.exports = CardPlusMinus;
