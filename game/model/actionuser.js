class ActionUser {
    //private Date dateAction;
    //private ActionMonopolyE action;
    //private Object infoAction;
    //private UserMonopoly user;
    //--private Auction auction;
    //GameMonopoly

    createInstance(monopolyGame, user, action, infoAction){
        var au=new ActionUser(user,action,infoAction);
        populateUserByActions(au,monopolyGame.listUser);
        populateUserByActions(au,monopolyGame.listViewUser); 
            
    }

    populateUserByActions(au, listUser){
        for(var i=0;i<listUser.length;i++){
            um = this.monopolyGame.listUser[i];
            um.addActionUser(au);
        }
    }

    constructor(user, action, infoAction) {
        this.user=user;
        this.action = action;
        this.infoAction = infoAction;
        this.dateAction=new Date();
    }
}

module.exports = ActionUser;
