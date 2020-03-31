class DataForGame {
   // private UserRoom userRoom;
   // private List<ActionUser> listAction;
   // private Set availAction;
   // private Auction auction;

    constructor(userRoom, availAction, listAction, auction, listUser) {
        this.userRoom = userRoom;
        this.listAction = listAction;
        this.availAction=availAction;
        this.auction=auction;
        this.listUser=listUser;
    }
}

module.exports = DataForGame;
