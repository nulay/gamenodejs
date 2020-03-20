class DataForGame {
   // private UserRoom userRoom;
   // private List<ActionUser> listAction;
   // private Set availAction;
   // private Auction auction;

    constructor(userRoom, availAction, listAction, auction) {
        this.userRoom = userRoom;
        this.listAction = listAction;
        this.availAction=availAction;
        this.auction=auction;
        
    }
}

module.exports = DataForGame;
