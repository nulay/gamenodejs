class ActionUser {
    //private Date dateAction;
    //private ActionMonopolyE action;
    //private Object infoAction;
    //private UserMonopoly user;
    //--private Auction auction;
    //GameMonopoly

    static createInstance(monopolyGame, user, action, infoAction){
        var au=new ActionUser(user,action,infoAction);
        ActionUser.populateUserByActions(au,monopolyGame.getListUser());
        ActionUser.populateUserByActions(au,monopolyGame.getListViewUser()); 
            
    }

    static populateUserByActions(au, listUser){
        for(var i=0;i<listUser.length;i++){
            var um = listUser[i];
            um.addActionUser(au);
        }
    }

    constructor(user, action, infoAction) {
        //this.user=user;
        this.action = action;
        this.infoAction = infoAction;
        this.dateAction=new Date();
    }
}

module.exports = ActionUser;
