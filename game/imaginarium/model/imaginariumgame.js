var UserImaginarium = require("./userimaginarium");
var GameRoom = require("./../../../model/gameroom");
var ActionUser = require("./../../model/actionuser");
var Util = require("./../../model/util");

class ImaginariumGame{
    roomUrl = "imaginarium/public/pole.html";
    roomName;
    listUsers = [];
    listViewUser = [];

    timeStartGame;
    currentTime;
    listCard = [];

    startGame = false;
    
    imageFolder;
    
    imageCenter;

    penalty_cheating;

    curentUser = null;

    maxCountUser;

    cardset = [];

    constructor(roomName, maxCountUser, listUsers) {
        this.timeStartGame = new Date().getTime();

        this.roomName = roomName;
        this.listUsers = listUsers       
        this.maxCountUser = maxCountUser;
    }
    
     getUserByName(nameUser){
       for(const user of this.listUsers){
          if(user.getName()==nameUser){
              return user;
          }
       }
       for(const user of this.listViewUser){
          if(user.getName()==nameUser){
              return user;
          }
       }
       return null;
    }

    getListCard() {
        return this.listCard;
    }

    setListCard(listCard) {
        this.listCard = listCard;
    }

    getTimeStartGame() {
        return this.timeStartGame;
    }
    
    setTimeStartGame(timeStartGame) {
         this.timeStartGame = timeStartGame;
    }

    getCurrentTime() {
        return new Date().getTime();
    }

    setCurrentTime(currentTime) {
        this.currentTime = currentTime;
    }

    getNumberRoom() {
        return this.nameRoom;
    }

    setNumberRoom(nameRoom) {
        this.nameRoom=nameRoom;
    }

    getListUser() {
        return this.listUsers;
    }

    getListViewUser() {
        return this.listViewUser;
    }

    startGameF(){
                      
        for(var i= 0 ;i<this.getListUser().length; i++) {
            var user = this.getListUser()[i];
            user.setMoney(this.getStartMoney());
            ActionUser.createInstance(this, user, "START_GAME", "Hello in GameRoom");
            ActionUser.createInstance(this, user, "CHOISE_SET_CARD", this.cardset);

        }
        this.curentUser=this.getListUser()[Util.getRandom(0, this.maxCountUser)];
        this.nextGamer();
        this.startGame=true;
    }
    
    nextGamer(){
        this.curentUser.setActivGamer(false);
        //чистим список монополий в которых был куплен филиал на текущем шаге
        Util.clear(this.curentUser.getMonopByFilThisStep());
        //.clear();
        if(this.isWinSomebody()){
            return;
        }
        if(this.auction!=null){
            this.auction.nextGamer();
            return;
        }
        if(this.curentUser.getCountThrowDouble()==0){
            if(this.getListUser()[this.getListUser().length-1]==this.curentUser){
                this.curentUser=this.getListUser()[0];
            }else{
                this.curentUser=this.getListUser()[this.getListUser().indexOf(this.curentUser)+1];
            }
        }
        this.curentUser.setThrowCubs(false);
        //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
        Util.clear(this.curentUser.getAvailableAction());
        this.getListCard()[this.curentUser.getIndexPosition()].dropInToCard(this,this.curentUser);

        if(!this.canCheckPenalty(this.curentUser)){
            Util.addUnicAll(this.curentUser.getAvailableAction(), ["THROW_CUBE"]);          
        }
        this.giveTakeCredit(this.curentUser);
        this.firmFilialSell(this.curentUser);
        this.curentUser.setActivGamer(true);
        if(this.curentUser.getPrison()!=0){
            ActionUser.createInstance(this, this.curentUser, "CHANGE_USER", this.curentUser.getName());
            return;
        }
        this.canBuyFilial();
        ActionUser.createInstance(this, this.curentUser, "CHANGE_USER", this.curentUser.getName());
    }

    isWinSomebody() {
        //победа
        if(this.getListUser().length==1){
            this.curentUser=this.getListUser()[0];
            ActionUser.createInstance(this, this.curentUser, "WIN", this.curentUser.getName());
            this.curentUser.setActivGamer(true);
            this.curentUser.setWin(true);
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            Util.clear(this.curentUser.getAvailableAction());
            Util.addUnicAll(this.curentUser.getAvailableAction(),["GAME_CLOSE"]);
            //this.curentUser.getAvailableAction()[this.curentUser.getAvailableAction().length]="GAME_CLOSE";
            return true;
        }
        return false;
    }

    isStartGame() {
        return this.startGame;
    }

    getImageFolder() {
        return this.imageFolder;
    }

    setImageFolder(imageFolder) {
        this.imageFolder = imageFolder;
    }

    getImageCenter() {
        return this.imageCenter;
    }

    setImageCenter(imageCenter) {
        this.imageCenter = imageCenter;
    }
}

module.exports = ImaginariumGame;
