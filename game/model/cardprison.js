class CardPrison extends CardDefault {
    //private int penalty;
    var penalty;

    //public CardPrison(String name,int penalty){
    constructor(name,type, penalty){
        super();
        setType(type);
        setName(name);
        this.penalty=penalty;
    }

    //@Override
    //public void transferCardForUser(Room room, UserRoom userRoom) {
    transferCardForUser(room, userRoom) {
        //GameMonopoly gameMonopoly = (GameMonopoly) room;
        //счатаем что количество дней отдыха равно - количеству карт
        room.goToCard(Util.getRandom(1,gameMonopoly.getListCard().size()));
    }

    //@Override
    //public void dropInToCard(Room room, UserRoom userRoom) {
    dropInToCard(room, userRoom) {
        //UserMonopoly userMonopoly = (UserMonopoly) userRoom;
        if(userRoom.getPrison()!=0){
            if(userRoom.getPrison()<3){
                userRoom.getAvailableAction().add(THROW_CUBE);
            }
        }
    }

    //public int getPenalty() {
    getPenalty() {
        return this.penalty;
    }

    //public void setPenalty(int penalty) {
    setPenalty(penalty) {
        this.penalty = penalty;
    }
}
module.exports = CardPrison;