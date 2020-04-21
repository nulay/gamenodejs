var DefaultUserRoom = require("./../defaultuserroom");
var Util = require("./../../../module/util");
class UserImaginarium extends DefaultUserRoom {
    indexPosition=0;
    
    activGamer=false;
    
    goForward=true;
    
    actionsAllUser=[];
    
    listCard=[];
    
    loose=false;
    
    win=false;
    
    throwCubs=false;
    
    throwDouble=0;
    
    
    availableAction=[];

    constructor(user, maxCountActiveRoom){
        super(user,maxCountActiveRoom);

        this.actionsAllUser=[];
        
        this.availableAction=[];
    }

    getAvailableAction(){
      return this.availableAction;
    }

    setAvailableAction(availableAction) {
        this.availableAction = availableAction;
    }

    getIndexPosition() {
        return this.indexPosition;
    }
    
    setIndexPosition(indexPosition) {
        this.indexPosition = indexPosition;
    }

    isActivGamer() {
        return this.activGamer;
    }  
  
    setActivGamer(activGamer) {
        this.activGamer = activGamer;
    }
    
    isGoForward(){
        return this.goForward;
    }
    
    setGoForward(goForward) {
        this.goForward = goForward;
    }

    getAndClearActionsAllUser() {
       // synchronized (actionsAllUser) {
            console.log('getAndClearActionsAllUser:'+this.actionsAllUser.length);
           // List<ActionUser> oldAU = new ArrayList<>();
            var oldAU =[];         
            Util.addUnicAll(oldAU, this.actionsAllUser);
            //oldAU.addAll(actionsAllUser);
            Util.clear(this.actionsAllUser);
            console.log(this.actionsAllUser.length+'/'+oldAU.length);
            return oldAU;
       // }
    }
   
    addActionUser(actionUser) {       
       return this.actionsAllUser[this.actionsAllUser.length]=actionUser;
    }

    isLoose() {
        return this.loose;
    }

    setLoose( key) {
        this.loose=key;
    }

    setWin(key) {
        this.win=key;
    }

    isthrowDoubleF(yes){
        if(yes) {
            this.throwDouble += 1;
        }else {
            this.throwDouble = 0;
        }
    }

    getCountThrowDouble() {
        return this.throwDouble;
    }

    isWin() {
        return this.win;
    }
    
    isThrowCubs() {
        return this.throwCubs;
    }

    setThrowCubs(throwCubs) {
       this.throwCubs = throwCubs;
    }

    
}
module.exports = UserImaginarium;
