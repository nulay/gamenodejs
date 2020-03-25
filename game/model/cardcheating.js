var CardDefault = require("./carddefault");
class CardCheating extends CardDefault {
    //private int numPrison;
    numPrison;
    /**
     * Constructor with name and count steps for skip
     * @param name - name
     * @param numPrison - count step need skip
     */
    constructor(name, numPrison, image){
        super(name, 'CardCheating', image);
        this.numPrison=numPrison;       
    }

    /**{@inheritDoc}*/
    //@Override
    //public void transferCardForUser(Room room, UserRoom userRoom) {
    transferCardForUser(gameMonopoly, userMonopoly) {
        
        userMonopoly.setPrison(1);
        userMonopoly.setPenalty(gameMonopoly.getListCard()[this.numPrison].getPenalty());
        userMonopoly.setIndexPosition(numPrison);
        ActionUser.createInstance(gameMonopoly, userMonopoly, "GO_PRISON", userMonopoly);
    }

    /**{@inheritDoc}*/
    //@Override
    //public void dropInToCard(Room room, UserRoom userRoom) {
    dropInToCard(room, userRoom) {
    }

    /**
     * Count step need skip
     * @return count step need skip
     */
    //public int getNumPrison() {
    getNumPrison() {
        return this.numPrison;
    }

    /**
     * Set count step need skip
     * @param numPrison set count step need skip
     */
    //public void setNumPrison(int numPrison) {
    setNumPrison(numPrison) {
        this.numPrison = numPrison;
    }
}
module.exports = CardCheating;
