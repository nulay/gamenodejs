var UserMonopoly = require("./usermonopoly");
var GameRoom = require("./../../model/gameroom");
var ActionUser = require("./actionuser");
var Util = require("./util");
var Auction = require("./auction");
class MonopolyGame{
// implements GameMonopoly{
    //игровая комната
    //private Room room;
    roomName;
    listUsers=[];
    listViewUser=[];
    //Время начала игры
    //private Long timeStartGame;
    timeStartGame;
    //private Long currentTime;
    currentTime;
    //список ячеек по которым может передвигаться пользователь
    //++@JsonIgnore
    //private List<Card> listCard;
    listCard = [];
    //private boolean startGame=false;
    startGame=false;
    //private String imageFolder;
    imageFolder;
    //private String imageCenter;
    imageCenter;
    //штраф за обман
    //++@JsonIgnore
    //private Integer penalty_cheating;
    penalty_cheating;
    //Текущий пользователь
    //private UserMonopoly curentUser=null;
    curentUser=null;
    //Деньги за круг
    //private int circleMoney;
    circleMoney;
    //стартовые деньги
    //private int startMoney;
    startMoney;
    //возможный кредит
    //private int credit;
    possibleCredit;
    maxCountUser;

    //public MonopolyGame(List<Card> listCard) {
   

   constructor(listCard, startMoney, circleMoney, roomName,maxCountUser,listUsers) {
        this.timeStartGame=new Date().getTime();
        this.listCard = listCard;
        this.roomName = roomName;
        this.listUsers=listUsers 
        this.startMoney = startMoney;
        this.maxCountUser=maxCountUser;
        this.circleMoney = circleMoney;
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

    //public int getStartMoney() {
    getStartMoney() {
        return this.startMoney;
    }

    //public void setStartMoney(int startMoney) {
    setStartMoney(startMoney) {
        this.startMoney = startMoney;
    }

    //public int getCircleMoney() {
    getCircleMoney() {
        return this.circleMoney;
    }

    //public void setCircleMoney(int circleMoney) {
    setCircleMoney(circleMoney) {
        this.circleMoney = circleMoney;
    }

    //public List<Card> getListCard() {
    getListCard() {
        return this.listCard;
    }

    //public void setListCard(List<Card> listCard) {
    setListCard(listCard) {
        this.listCard = listCard;
    }

    //public Long getTimeStartGame() {
    getTimeStartGame() {
        return this.timeStartGame;
    }

    //public void setTimeStartGame(Long timeStartGame) {
    setTimeStartGame(timeStartGame) {
         this.timeStartGame = timeStartGame;
    }

    //public Long getCurrentTime() {
    getCurrentTime() {
        return new Date().getTime();
    }

    //public void setCurrentTime(Long currentTime) {
    setCurrentTime(currentTime) {
        this.currentTime = currentTime;
    }

    //@Override
    //public long getNumberRoom() {
    getNumberRoom() {
        return this.nameRoom;
    }

    //@Override
    //public void setNumberRoom(long numberRoom) {
    setNumberRoom(nameRoom) {
        this.nameRoom=nameRoom;
    }

    
    //@Override
    //public List<UserMonopoly> getListUser() {
    getListUser() {
        return this.listUsers;
    }


    //@Override
    //public List<UserMonopoly> getListViewUser() {
    getListViewUser() {
        return this.listViewUser;
    }

    //public void startGame(){
    startGameF(){
        //this.maxCountUser=this.getListUser().length-1               
        for(var i= 0 ;i<this.getListUser().length; i++) {
            var user = this.getListUser()[i];
            user.setMoney(this.getStartMoney());
            ActionUser.createInstance(this, user, "START_GAME", "Hello in GameRoom");
        }
        this.curentUser=this.getListUser()[Util.getRandom(0, this.maxCountUser)];
        this.nextGamer();
        this.startGame=true;
    }
    
    //@Override
    //public void nextGamer(){
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

    //private boolean isWinSomebody() {
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

    ///public boolean isStartGame() {
    isStartGame() {
        return this.startGame;
    }

    //public String getImageFolder() {
    getImageFolder() {
        return this.imageFolder;
    }

    //public void setImageFolder(String imageFolder) {
    setImageFolder(imageFolder) {
        this.imageFolder = imageFolder;
    }

    //public String getImageCenter() {
    getImageCenter() {
        return this.imageCenter;
    }

    //public void setImageCenter(String imageCenter) {
    setImageCenter(imageCenter) {
        this.imageCenter = imageCenter;
    }

    //++@JsonIgnore
    //private SecureRandom rand=new SecureRandom();
    //var rand=new SecureRandom();

    //Бросить кубик
    //public int[] throwCube() {
    throwCube() {
        console.log('throwCube');
        if(this.curentUser.getAvailableAction().includes("THROW_CUBE")){
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            Util.clear(this.curentUser.getAvailableAction());
            console.log('Available action for curent user shold be 0 :'+this.curentUser.getAvailableAction().length);
            var toValue=[Util.getRandom(1,6), Util.getRandom(1,6)];
            this.curentUser.isthrowDoubleF(toValue[0]==toValue[1]);
            
            ActionUser.createInstance(this, this.curentUser, "THROW_CUBE", toValue);
            if(this.curentUser.getPrison()>0){
                if(this.curentUser.getCountThrowDouble()==1){
                    //выходит из тюрьмы
                    this.curentUser.setPrison(0);
                }else{
                    this.curentUser.setPrison(this.curentUser.getPrison()+1);
                    this.nextGamer();
                }
            }
            if(this.curentUser.getCountThrowDouble()==3){
                //устанавливаем выбрасывание кубика в 0 раз
                this.goPrison(this.curentUser);
                this.nextGamer();
                this.curentUser.throwDouble(false);
                return toValue;
            }
            this.goToCard(toValue[0]+toValue[1]);
            return toValue;
        }else{
            //штраф
            this.penaltyCheating(this.curentUser);
        }
        return null;
    }

    //private void goPrison(UserMonopoly user) {
    goPrison(user) {
        user.setPrison(1);
        var cP=getCardPrison();
        if(cP!=null) {
            user.setPenalty(cP.getPenalty());
            user.setIndexPosition(this.listCard.indexOf(cP));
            ActionUser.createInstance(this, user, "GO_PRISON", user.getName());
        }
    }

   // public CardPrison getCardPrison(){
     getCardPrison(){
        for(const card of this.listCard){
            if(card.getType() == "CARD_PRISON"){
                return card;
            }
        }
        return null;
    }

    //получение денег за круг
    //private void getMoneybyCircle(UserMonopoly curentUser) {
    getMoneybyCircle(curentUser) {
        curentUser.setMoney(curentUser.getMoney() + this.circleMoney);
    }

    //@Override
    //public void buyFirm(){
    buyFirm(){
        if(this.curentUser.getAvailableAction().includes("BUY_FIRM")){
            if(this.listCard[this.curentUser.getIndexPosition()].getType() == "CARD_FIRM") {
                //CardFirm
                var cardF = this.listCard[this.curentUser.getIndexPosition()];
                if(cardF.getUserOwner()==null && this.curentUser.getMoney()>=cardF.getPrice()) {
                    this.curentUser.setMoney(this.curentUser.getMoney() - cardF.getPrice());
                    cardF.setUserOwner(this.curentUser);
                    ActionUser.createInstance(this, this.curentUser, "BUY_FIRM", cardF);
                    //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
                    Util.clear(this.curentUser.getAvailableAction());
            }else{
                    //штраф
                    this.penaltyCheating(this.curentUser);
                }
                this.nextGamer();
            }
        }
    }

    //public void penaltyCheating(UserMonopoly user) 
    penaltyCheating(user){
        ActionUser.createInstance(this, user, "PENALTY_CHEATING", getPenalty_cheating());
    }

    //public void penaltyCheating(UserMonopoly user, Object obj) {
    penaltyCheating(user, obj) {
        ActionUser.createInstance(this,user, "PENALTY_CHEATING", obj);
    }

    //@Override
    //public void payPenalty() {
    payPenalty() {
        if(this.curentUser.getAvailableAction().includes("PAY_PENALTY")){
            if(this.curentUser.getPenalty()!=0 && this.curentUser.getMoney()+this.curentUser.getPenalty()>=0){
                var c=this.getListCard()[this.curentUser.getIndexPosition()];
                if(c.getType() == "CARD_FIRM"){
                    //CardFirm 
                    var card=c;
                    var cardUserOwner=this.getUserByName(card.getUserOwner());
                    cardUserOwner.setMoney(cardUserOwner.getMoney()-this.curentUser.getPenalty());
                    ActionUser.createInstance(this, this.curentUser, "RECEIVE_INCOME", card.getUserOwner());
                }
                Util.clear(this.curentUser.getAvailableAction());
                //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
                this.curentUser.setMoney(this.curentUser.getMoney()-Math.abs(this.curentUser.getPenalty()));
                ActionUser.createInstance(this, this.curentUser, "PAY_PENALTY", this.curentUser.getName());
                this.curentUser.setPenalty(0);
                //если был в тюрьме выходит из тюрьмы
                this.curentUser.setPrison(0);
                this.nextGamer();
            }else{
                this.penaltyCheating(this.curentUser);
            }
        }
    }

    //private Auction 
    auction=null;

    //@Override
    //public void startAuction() {
    startAuction() {
        if(this.curentUser.getAvailableAction().includes("AUCTION_START")) {
            Util.clear(this.curentUser.getAvailableAction());
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            this.auction = new Auction(this);
            this.nextGamer();

        }else{
            this.penaltyCheating(this.curentUser);
        }
    }

    //public void stopAuction() {
    stopAuction() {
        this.auction=null;
        this.nextGamer();
    }

    //@Override
    //public void putFirm(int[] indFirm) {
    putFirm(indFirm) {
        if(this.curentUser.getAvailableAction().includes("PUT_FIRM")) {
            for(var i=0; i < indFirm.length; i++) {
                try {
                    //CardFirm
                    var cF = getListCard()[indFirm[i]];
                    if(cF.putFirm(this, this.curentUser)) {
                        ActionUser.createInstance(this, this.curentUser, "PUT_FIRM", cF);
                        this.firmFilialSell(this.curentUser);
                        this.canBuyFilial();
                    }
                } catch ( e) {
                    this.penaltyCheating(this.curentUser);
                }
            }
            if(!this.canCheckPenalty(this.curentUser)){
                var card=this.listCard[this.getCurentUser().getIndexPosition()];
                if(card.getType() == "CARD_FIRM") {
                    if (card.getUserOwner()==null && this.curentUser.getMoney() >= card.getPrice()) {
                        Util.addUnicAll(this.curentUser.getAvailableAction(),["BUY_FIRM"]);
                        // this.curentUser.getAvailableAction()[this.curentUser.getAvailableAction().length]="BUY_FIRM";
                    }
                }
            }
        }else{
            this.penaltyCheating(this.curentUser);
        }
    }

    //@Override
    //public void redeemFirm(int[] indFirm) {
    redeemFirm(indFirm) {
        if(this.curentUser.getAvailableAction().includes("REDEEM_FIRM")) {
           // List<CardFirm> 
            lCF=[];
            var price=0;
            for(var i=0;i<indFirm.length;i++) {
                try {
                    //CardFirm 
                    var cF =  getListCard()[indFirm[i]];
                    lCF[lCF.length]=cF;
                    price+=cF.getPrice();
                } catch ( e) {
                    this.penaltyCheating(this.curentUser);
                }
            }
            if(this.curentUser.getMoney()>price){
                for(const cF of lCF) {
                    if (cF.redeemFirm(this, this.curentUser)) {
                        ActionUser.createInstance(this, this.curentUser, "REDEEM_FIRM", cF);
                        Util.removeElementFromArray(this.curentUser.getAvailableAction(),"REDEEM_FIRM");
                        //this.curentUser.getAvailableAction().remove("REDEEM_FIRM");
                        this.firmFilialSell(this.curentUser);
                        this.canBuyFilial();
                    }
                }
            }else{
                ActionUser.createInstance(this, this.curentUser, "NOT_MONEY", price);
            }
        }else{
            this.penaltyCheating(this.curentUser);
        }
    }


    //@Override
    //public void buyFilial(int[] indFirm) {
    buyFilial(indFirm) {
        if(this.curentUser.getAvailableAction().includes("BUY_FILIAL")){
            try {
                //Set<Integer> 
                var lICBF= this.canBuyFilial(this.curentUser);
                //List<Integer> 
                var lMon=[];
                for(var i=0;i<indFirm.length;i++){
                    var canBuy=false;
                    for(const fN of lICBF){
                        if(indFirm[i]==fN){
                            var numMon=getListCard()[fN].getNumMonopoly();
                            for(const fNM of lMon){
                                if(numMon==fNM){
                                    //нельзя покупать 2 филиала в одной монополии за один ход
                                    //штраф
                                    this.penaltyCheating(this.curentUser);
                                    return;
                                }
                            }
                            lMon[lMon.length]=numMon;
                            canBuy=true;
                            break;
                        }
                    }
                    if(!canBuy){
                        this.curentUser.getMonopByFilThisStep().remove(getListCard()[indFirm[i]].getNumMonopoly());
                        //штраф
                        this.penaltyCheating(this.curentUser);
                        return;
                    }
                }
            } catch ( e) {
                //штраф
                this.penaltyCheating(this.curentUser);
                return;
            }
            for(var i=0;i<indFirm.length;i++){
                try {
                    //CardFirm
                    var cF= getListCard()[indFirm[i]];
                    cF.buyFilial(this, this.curentUser);
                    this.curentUser.getMonopByFilThisStep().add(cF.getNumMonopoly());

                } catch ( e) {
                    //штраф
                    this.penaltyCheating(this.curentUser);
                }
            }
            this.canBuyFilial();
        }
    }


    //@Override
    //public void sellFilial(Set<Integer> indFirm) {
    sellFilial(indFirm) {
        if(this.curentUser.getAvailableAction().includes("SELL_FILIAL")){
            //Set<Integer> 
            lICBF=canSellFilial(this.curentUser);
            for(const indF of indFirm) {
                //boolean 
                var canSell=false;
                for (const numFil of lICBF) {
                    if(indF ==numFil){
                        canSell=true;
                        break;
                    }
                }
                if(!canSell){
                    this.penaltyCheating(this.curentUser);
                    return;
                }
            }
            for(const indF of indFirm){
                try {
                    //CardFirm 
                    cF= getListCard()[indF];
                    cF.sellFilial(this, this.curentUser);
                    // curentUser.getMonopByFilThisStep().add(cF.getNumMonopoly());

                    ActionUser.createInstance(this, this.curentUser, "SELL_FILIAL", cF);
                } catch ( e) {
                    //штраф
                    this.penaltyCheating(this.curentUser);
                }
            }
            Util.removeElementFromArray(this.curentUser.getAvailableAction(),"SELL_FILIAL");
            //this.curentUser.getAvailableAction().remove("SELL_FILIAL");
            this.canSellFilial();
            this.canCheckPenalty(this.curentUser);
        }
    }

    //проверка на возможность пользователя оплатить штраф
    //public boolean canCheckPenalty(UserMonopoly userMonopoly){
    canCheckPenalty(userMonopoly){
        if(Math.abs(this.curentUser.getPenalty())>0 && this.curentUser.getMoney()>=Math.abs(this.curentUser.getPenalty())){
            Util.addUnicAll(this.curentUser.getAvailableAction(), ["PAY_PENALTY"]);
            //this.curentUser.getAvailableAction().add(PAY_PENALTY);
            return true;
        }
        return false;
    }

    //@Override
    //public void gameClose(UserMonopoly user) {
    gameClose(user) {
        //synchronized (room.getListViewUser()){
            this.room.getListViewUser().remove(user);
        //}
    }

    //проверяем куплин ли хоть один филиал в монополии
    //private boolean isBuyFilialInMonopoly(Integer numMonopoly) {
    isBuyFilialInMonopoly(numMonopoly) {
        for(const c of getListCard()) {
            if(c.getType() == "CARD_FIRM" && c.getNumMonopoly()==numMonopoly && c.getFilialStay()>0) {
                return true;
            }
        }
        return false;
    }

    //@JsonIgnore
    //@Override
    //public Collection<Integer> getPossibleFirmCh(String nameUser){
    getPossibleFirmCh(nameUser){
        //Set<Integer> 
        var lC=[];
        var umFCH=this.getUserByName(nameUser);
        if(umFCH==null){
            return null;
        }
        for(const card of listCard){
            if(card.getType() == "CARD_FIRM"){
                cf = card;
                if(cf.getUserOwner()!=null && umFCH.getName() == cf.getUserOwner() && !cf.isPut() && cf.getFilialStay()==0 && !isBuyFilialInMonopoly(cf.getNumMonopoly())){
                    lC[lC.length]=getListCard().indexOf(cf);
                }
            }
        }
        return lC;
    }

    //@JsonIgnore
    //@Override
    //public Collection<Integer> getPossibleFirm(String type) {
    getPossibleFirm(type) {
        var lC=[];
        if((type == "PUT_FIRM" && this.curentUser.getAvailableAction().includes("PUT_FIRM")) || (type == "CHANGE_FIRM" && this.curentUser.getAvailableAction().includes("CHANGE_FIRM"))) {
            for(const card of listCard){
                if(card.getType() == "CARD_FIRM"){
                    var cf = card;
                    if(cf.getUserOwner()!=null && this.curentUser.getName()==cf.getUserOwner().getName() && !cf.isPut() && cf.getFilialStay()==0 && !isBuyFilialInMonopoly(cf.getNumMonopoly())){
                        lC[lC.length] = getListCard().indexOf(cf);
                    }
                }
            }
        }
        if(type =="REDEEM_FIRM" && this.curentUser.getAvailableAction().includes("REDEEM_FIRM")) {
            for(const card of listCard){
                if(card.getType() == "CARD_FIRM"){
                    //CardFirm 
                    var cf= card;
                    if(cf.getUserOwner()!=null && this.curentUser.getName()==cf.getUserOwner().getName() && cf.isPut()){
                        lC[lC.length] = this.getListCard().indexOf(cf);
                    }
                }
            }
        }
        if(type =="BUY_FILIAL" && this.curentUser.getAvailableAction().includes("BUY_FILIAL")) {
            Util.addUnicAll(lC, this.canBuyFilial(this.curentUser));
            //lC.addAll(canBuyFilial(this.curentUser));
        }
        if(type == "SELL_FILIAL" && this.curentUser.getAvailableAction().includes("SELL_FILIAL")) {
            //lC.addAll(canSellFilial(this.curentUser));
            Util.addUnicAll(lC, this.canSellFilial(this.curentUser));
        }
        return lC;
    }

   // @JsonIgnore
   // public Map<Integer, Set<CardFirm>> getAllMonopoly(){
    getAllMonopoly(){ 
        return this.getAllMonopoly(null);
    }

    //@JsonIgnore
    //public Map<Integer, Set<CardFirm>> getAllMonopoly(UserMonopoly user){
    getAllMonopoly(user){
        //Map<Integer,Set<CardFirm>> 
        var listAllMonopoly={};
        //Map<Integer,Set<CardFirm>>
        var listUserMonopoly={};
        for(const card of this.listCard) {
            if (card.getType() == "CARD_FIRM") {
                var cf = card;
                if(cf.getUserOwner()!=null){
                    if(user!=null && !cf.getUserOwner()==user.getName()){
                        continue;
                    }
                    //Set<CardFirm>
                    var lCard=listAllMonopoly[cf.getNumMonopoly()];
                    if(lCard==null){
                        lCard=[];
                        listAllMonopoly[cf.getNumMonopoly()]=lCard;
                    }
                    lCard[lCard.length]=cf;
                    if(lCard.length==cf.getCountFirmInMonopoly()) {
                        listUserMonopoly[cf.getNumMonopoly()]=lCard;
                    }
                }
            }
        }
        return listUserMonopoly;
    }

    //поиск пользователя по имени
    //private UserMonopoly getUserByName(String userName){
    getUserByName(userName){
        for(const um of this.getListUser()){
            if(um.getName() == userName){
                return um;
            }
        }
        return null;
    }

    
    //@Override
    //public void changeFirm(Set<Integer> indFirm, Set<Integer> indFirm2, int money, int money2, String userName) {
    changeFirm(indFirm, indFirm2, money, money2, userName) {
        if(this.curentUser.getAvailableAction().includes("CHANGE_FIRM")){
            //UserMonopoly 
            var umA=this.getUserByName(userName);
            if(umA==null){
                this.penaltyCheating(this.curentUser);
                return;
            }
            this.curentUser.doChangeFirm();
            Util.clear(this.curentUser.getAvailableAction());          
            umA.getAvailableAction()[umA.getAvailableAction().length]="EXCHANGE_OFFERS";
            this.curentUser.setActivGamer(false);
            //todo сделать проверки на принадлежность фирм и необходимой суммы денег
            objectOffers=new ChangeFirm(indFirm, indFirm2, money, money2, this.curentUser,umA);
            this.curentUser=umA;
            ActionUser.createInstance(this,this.curentUser, "CHANGE_USER", this.curentUser.getName());
            this.curentUser.setActivGamer(true);
            ActionUser.createInstance(this,this.curentUser, "EXCHANGE_OFFERS", objectOffers);
        }
    }

    //public void changeFirm(ChangeFirm changeFirm) {
    changeFirm(changeFirm) {
        this.changeFirm(changeFirm.getIndFirmUserChanger(),changeFirm.getIndFirm(),changeFirm.getMoneyUserChanger(),changeFirm.getMoney(),changeFirm.getUserName());
    }

    //public void changeFirm(ActionMonopolyE type){
    changeFirm(type){
        if(this.curentUser.getAvailableAction().includes("EXCHANGE_OFFERS")){
            Util.clear(this.curentUser.getAvailableAction());
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            //UserMonopoly 
             usCH=this.objectOffers.getUserChanger();
            if(type=="CHANGE_FIRM_OK"){
                for (const  indF of this.objectOffers.getIndFirmUserChanger()){
                    this.getListCard()[indF].setUserOwner(objectOffers.getUser());
                    ActionUser.createInstance(this,objectOffers.getUser(), "BUY_FIRM", getListCard()[indF]);
                }
                this.objectOffers.getUser().setMoney(objectOffers.getUser().getMoney() + objectOffers.getMoneyUserChanger());
                usCH.setMoney(usCH.getMoney()-objectOffers.getMoneyUserChanger());
                for (const indF of this.objectOffers.getIndFirm()){
                    this.getListCard()[indF].setUserOwner(usCH);
                    ActionUser.createInstance(this,usCH, "BUY_FIRM", getListCard()[indF]);
                }
                this.objectOffers.getUser().setMoney(this.objectOffers.getUser().getMoney() - this.objectOffers.getMoney());
                usCH.setMoney(usCH.getMoney()+this.objectOffers.getMoney());
                ActionUser.createInstance(this,this.curentUser, "CHANGE_FIRM_OK", objectOffers);
            }else{
                ActionUser.createInstance(this,this.curentUser, "CHANGE_FIRM_CANCAL", objectOffers);
            }
            this.curentUser.setActivGamer(false);
            this.curentUser=usCH;
            ActionUser.createInstance(this,this.curentUser, "CHANGE_USER", this.curentUser.getName());
            this.curentUser.setActivGamer(true);
            if(this.curentUser.isThrowCubs()) {
                //Card 
                card=this.getListCard()[this.curentUser.getIndexPosition()];;
                if(card.getType() == "CARD_FIRM") {
                    //CardFirm 
                    var cardF=card;
                    if (cardF.getUserOwner() == null) {
                        if (this.curentUser.getMoney() >= cardF.getPrice()) {
                           // this.curentUser.getAvailableAction()[]=BUY_FIRM);
                           Util.addUnicAll(this.curentUser.getAvailableAction(),["BUY_FIRM"]);
                        }
                        Util.addUnicAll(this.curentUser.getAvailableAction(),["AUCTION_START"]);
                        //this.curentUser.getAvailableAction().add(AUCTION_START);
                    }
                }
                this.canCheckPenalty(this.curentUser);
                this.giveTakeCredit(this.curentUser);
                this.firmFilialSell(this.curentUser);
            }else{
                Util.clear(this.curentUser.getAvailableAction());
                //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
                this.getListCard().get(this.curentUser.getIndexPosition()).transferCardForUser(this, curentUser);
                if(!canCheckPenalty(this.curentUser)){
                    Util.addUnicAll(this.curentUser.getAvailableAction(),["THROW_CUBE"]);
                    //this.curentUser.getAvailableAction().add(THROW_CUBE);
                }
                this.giveTakeCredit(this.curentUser);
                this.firmFilialSell(this.curentUser);
                this.canBuyFilial();
            }
            this.objectOffers=null;
        }
    }
       
    //public void 
    canSellFilial(){
        //this.curentUser.getAvailableAction().remove(SELL_FILIAL);
        Util.removeElementFromArray(this.curentUser.getAvailableAction(), "SELL_FILIAL");
        //Set<Integer> list=canSellFilial(z);
        var list = this.canSellFilial(z);
        if(list.size()>0){
            Util.addUnicAll(this.curentUser.getAvailableAction(), ["SELL_FILIAL"]);
            //this.curentUser.getAvailableAction().add(SELL_FILIAL);
        }
    }

    //филиалы каких фирм может продать пользователь user.
    //private Set<Integer> canSellFilial(UserMonopoly user){
    canSellFilial(user){
        var lC=[];
        var lmonopcuruser =this.getAllMonopoly(this.curentUser);
        for(const key of Reflect.ownKeys(lmonopcuruser)){
            var cardList = lmonopcuruser[key];
            var maxM=0;
            var minM = cardList[0].getCountFilial();
            for(const cfs of cardList){
                if(maxM<cfs.getFilialStay()){
                    maxM=cfs.getFilialStay();
                }
                if(cfs.getFilialStay()<minM){
                    minM=cfs.getFilialStay();
                }
            }
            if(minM==maxM){
                if(minM>0){
                    minM-=1;
                }else{
                    continue;
                }
            }
            for(const cfs of cardList){
                if(cfs.getFilialStay()>minM){
                    lC[lC.length]=this.listCard.indexOf(cfs);
                }
            }
        }
        return lC;
    }

    //public void canBuyFilial(){
    canBuyFilial(){
        Util.removeElementFromArray(this.curentUser.getAvailableAction(),"BUY_FILIAL");
        //this.curentUser.getAvailableAction().remove(BUY_FILIAL);
        //Set<Integer> 
        var list=this.canBuyFilial(this.curentUser);
        if(list.length>0){
            Utiil.addUnicAll(this.curentUser.getAvailableAction(),["BUY_FILIAL"]);
            //this.curentUser.getAvailableAction().add(BUY_FILIAL);
        }
    }

    //филиалы каких фирм может купить пользователь user.
    //private Set<Integer> canBuyFilial(UserMonopoly user){
    canBuyFilial( user){
        var lC=[];
        var lmonopcuruser =this.getAllMonopoly(this.curentUser);
        for(const key of Reflect.ownKeys(lmonopcuruser)){
            var cardList = lmonopcuruser[key];
            var maxM=0;
            var minM=cardList[0].getCountFilial();
            //ключ проверяющий заложенность филиала в монополи (если хоть 1 заложен то покупать филиалы нельзя)
            var keyPut=false;
            for(const cfs of cardList){
                if(maxM<cfs.getFilialStay()){
                    maxM=cfs.getFilialStay();
                }
                if(cfs.getFilialStay()<minM){
                    minM=cfs.getFilialStay();
                }
                if(cfs.isPut()){
                    keyPut=true;
                    break;
                }
            }
            if(keyPut){
                continue;
            }
            if(minM==maxM){
                if(maxM+1<=cardList[0].getCountFilial()){
                    maxM+=1;
                }else{
                    continue;
                }
            }
            for(const cfs of cardList){
                if(cfs.getFilialStay()<maxM){
                    //проверяем был ли куплен филиал пользователем user на этом шаге
                    varkeyBuy=false;
                    for(const numMonop of user.getMonopByFilThisStep()){
                        if(cfs.getNumMonopoly()==numMonop.intValue()){
                            keyBuy=true;
                        }
                    }
                    if(!keyBuy) {
                        lC[lC.length]=this.listCard.indexOf(cfs);
                    }
                }
            }
        }
        return lC;
    }

    //@Override
    //public void gameEnd(UserMonopoly user) {
    gameEnd( user) {
       // synchronized (getListUser()){
            Util.clear(user.getAvailableAction());
            //user.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            for(const card of getListCard()){
                if(card.getType() == "CARD_FIRM"){
                    var cardF=card;
                    if(cardF.getUserOwner()!=null && cardF.getUserOwner()==user.getName()) {
                        cardF.returnInBank(this);
                        ActionUser.createInstance(this, this.curentUser, "RETURN_IN_BANK", cardF);
                    }
                }
            }
            //возврат денег тому на ячейки которого обанкротился , если такая есть
            if(user.getPenalty()<0){
                var c = getListCard()[user.getIndexPosition()];
                if (card.getType() == "CARD_FIRM") {
                    var card = c;
                    var retM=Math.abs(user.getPenalty());
                    if(retM>user.getMoney()){
                        retM=user.getMoney();
                    }
                    var cardUserOwner=this.getUserByName(card.getUserOwner());
                    cardUserOwner.setMoney(cardUserOwner.getMoney() + retM);
                    user.setPenalty(0);
                }
            }
            ActionUser.createInstance(this,user, "LOOSE", null);
            Util.removeElementFromArray(getListUser(),user);
            //getListUser().remove(user);
            getListViewUser()[getListViewUser().length] =user;
            Util.removeElementFromArray(user.getAvailableAction(),"GAME_END");
            // user.getAvailableAction().remove(GAME_END);
            Util.addUnicAll(user.getAvailableAction(),["GAME_CLOSE"]);
            //user.getAvailableAction().add(GAME_CLOSE);
            if(user.getName()==this.curentUser.getName()){
                if(this.getListUser().size()>1) {
                    this.nextGamer();
                }
            }
            this.isWinSomebody();
      //  }
    }

    //@Override
    //public Auction getAuction() {
    getAuction() {
        return this.auction;
    }

    //@Override
    //public UserMonopoly getCurentUser() {
    getCurentUser() {
        return this.curentUser;
    }

    //public int getCredit() {
    getPossibleCredit() {
        return this.possibleCredit;
    }

    //public void setCredit(int credit) {
    setPossibleCredit(possibleCredit) {
        this.possibleCredit = possibleCredit;
    }

   // public Room getRoom() {
    getRoom() {
        return this.room;
    }

    //public void setRoom(Room room) {
    setRoom(room) {
        this.room = room;
    }

    //public Integer getPenalty_cheating() {
    getPenalty_cheating() {
        return this.penalty_cheating;
    }

    //public void setPenalty_cheating(Integer penalty_cheating) {
    setPenalty_cheating(penalty_cheating) {
        this.penalty_cheating = penalty_cheating;
    }

    //проверка на возможность взять отдать кредит
    //public void giveTakeCredit(UserMonopoly userMonopoly) {
    giveTakeCredit( userMonopoly) {
        if(userMonopoly.getCredit()>0){
            Util.addUnicAll(userMonopoly.getAvailableAction(),["GIVE_CREDIT"]);
            //userMonopoly.getAvailableAction().add(GIVE_CREDIT);
        }else{
            //userMonopoly.getAvailableAction().add(TAKE_CREDIT);
            Util.addUnicAll(userMonopoly.getAvailableAction(),["TAKE_CREDIT"]);          
        }
    }
    
    takeCredit(){
        if(this.getCurentUser().getCredit()==0 && this.getCurentUser().getAvailableAction().includes("TAKE_CREDIT")){
           this.getCurentUser().setMoney(this.getCurentUser().getMoney()+this.getPossibleCredit());
           
        }
        giveTakeCredit(this.getCurentUser());
    }

    //проверка на возможность продать филиал или заложить или выкупить фирму
    //public void firmFilialSell(UserMonopoly userMonopoly){
    firmFilialSell( userMonopoly){
        for(const card of this.getListCard()){
            if(card.getType() == "CARD_FIRM" && card.getUserOwner()==userMonopoly.getName()){
                //заложить фирму
                if(!card.isPut() && card.getFilialStay()==0) {
                    //userMonopoly.getAvailableAction().add(PUT_FIRM);
                    //userMonopoly.getAvailableAction().add(CHANGE_FIRM);
                    Util.addUnicAll(userMonopoly.getAvailableAction(),["PUT_FIRM","CHANGE_FIRM"]);
                    continue;
                }
                //выкупить фирму
                if(this.curentUser.getPrison()==0) {
                    if ( card.isPut() && userMonopoly.getMoney() >  card.getPrice()) {
                        //userMonopoly.getAvailableAction().add(REDEEM_FIRM);
                        Util.addUnicAll(userMonopoly.getAvailableAction(),["REDEEM_FIRM"]);
                        continue;
                    }
                }
                //продать филиал
                if(card.getFilialStay()>0){
                    //userMonopoly.getAvailableAction().add(SELL_FILIAL);
                    Util.addUnicAll(userMonopoly.getAvailableAction(),["SELL_FILIAL"]);
                }
            }
        }
    }

    //public void goToCard(int countStep){
    goToCard(countStep){
        console.log("goToCard :"+ countStep);
        var pos=0;
        if(this.curentUser.isGoForward()){
            pos=this.curentUser.getIndexPosition()+countStep;
            if(pos>=this.listCard.length){
                pos=pos-this.listCard.length;
                //выдать деньги за круг
                this.getMoneybyCircle(this.curentUser);
                //увеличить кредит на 50%
                this.curentUser.setCredit(this.curentUser.getCredit()*1.3);
            }
        }else{
            pos=this.curentUser.getIndexPosition()-countStep;
            if(pos<0){
                pos=this.listCard.length-1+pos;
            }
            //меняем направление на правильное
            this.curentUser.setGoForward(true);
        }
        this.curentUser.setThrowCubs(true);
        this.curentUser.setIndexPosition(pos);
        ActionUser.createInstance(this,this.curentUser, "GO_SELL", countStep);
        this.listCard[pos].transferCardForUser(this,this.curentUser);
        if(this.curentUser.getPrison()>0){
            this.nextGamer();
            return;
        }
        this.canCheckPenalty(this.curentUser);
        this.giveTakeCredit(this.curentUser);
        this.firmFilialSell(this.curentUser);
    }
}
module.exports = MonopolyGame;
