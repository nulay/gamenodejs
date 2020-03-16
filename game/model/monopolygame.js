var UserMonopoly = require("./usermonopoly");
var GameRoom = require("././model/gameroom");
class MonopolyGame{
// implements GameMonopoly{
    //игровая комната
    //private Room room;
    room;
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
    credit;

    //public MonopolyGame(List<Card> listCard) {
   

   constructor(listCard, startMoney, circleMoney, room) {
        this.timeStartGame=new Date().getTime();
        this.listCard = listCard;
        this.room = room;
        //TODO all user change to monopolyUser
        for(var i=0;i<room.getUsers().length;i++){
           
           var oldUser = room.getUsers()[i];
           var mUser = new UserMonopoly(oldUser, 5, startMoney);
           room.getUsers()[i]=mUser;
        }
        this.startMoney = startMoney;
        this.circleMoney = circleMoney;
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
    //public boolean addUser(UserRoom user) {
    addUser(user) {
        var mUser = user;
        if(this.room.addUser(user)){
            mUser.setAvailableAction([]);
            if(isOpenRoom()){
                return true;
            }else{
                startGame();
                return false;
            }
        }else{
            return false;
        }
    }

    //@Override
    //public boolean removeUser(UserRoom user) {
    removeUser(user) {
        return this.room.removeUser(user);
    }

    //@Override
    //public long getNumberRoom() {
    getNumberRoom() {
        return this.room.getNumberRoom();
    }

    //@Override
    //public void setNumberRoom(long numberRoom) {
    setNumberRoom(numberRoom) {
        this.room.setNumberRoom(numberRoom);
    }

    //@Override
    //public boolean isPermission(UserRoom user) {
    isPermission(user) {
        return this.room.isPermission(user);
    }

    //public boolean isOpenRoom() {
    isOpenRoom() {
        return this.room.isOpenRoom();
    }

    //@Override
    //public int countPerson() {
    countPerson() {
        return this.room.countPerson();
    }

    //@Override
    //public List<UserMonopoly> getListUser() {
    getListUser() {
        return this.room.getListUser();
    }

    //@Override
    //public void setMaxCountUser(int count) {
    setMaxCountUser(count) {
        this.room.setMaxCountUser(count);
    }

    //@Override
    //public int getMaxCountUser() {
    getMaxCountUser() {
        return this.room.getMaxCountUser();
    }

    //@Override
    //public List<UserMonopoly> getListViewUser() {
    getListViewUser() {
        return this.room.getListViewUser();
    }

    //public void startGame(){
    startGame(){
        this.startGame=true;      
        this.curentUser=getListUser()[Util.getRandom(0, getMaxCountUser()-1)];
        nextGamer();
        for(var i= 0 ;i<getListUser().length; i++) {
            var user = getListUser()[i];
            user.setMoney(getStartMoney());
            ActionUser.createInstance(this, user, START_GAME, "Hello in GameRoom");
        }
    }

    //@Override
    //public void nextGamer(){
    nextGamer(){
        this.curentUser.setActivGamer(false);
        //чистим список монополий в которых был куплен филиал на текущем шаге
        Util.clear(this.curentUser.getMonopByFilThisStep());
        //.clear();
        if(isWinSomebody()){
            return;
        }
        if(this.auction!=null){
            this.auction.nextGamer();
            return;
        }
        if(this.curentUser.getCountThrowDouble()==0){
            if(getListUser()[getListUser().length-1]==this.curentUser){
                this.curentUser=getListUser()[0];
            }else{
                this.curentUser=getListUser()[getListUser().indexOf(this.curentUser)+1];
            }
        }
        this.curentUser.setThrowCubs(false);
        //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
        Util.clear(this.curentUser.getAvailableAction());
        getListCard().get(this.curentUser.getIndexPosition()).dropInToCard(this,this.curentUser);

        if(!canCheckPenalty(this.curentUser)){
            Util.addUnicAll(this.curentUser.getAvailableAction(), [THROW_CUBE]);          
        }
        giveTakeCredit(this.curentUser);
        firmFilialSell(this.curentUser);
        this.curentUser.setActivGamer(true);
        if(this.curentUser.getPrison()!=0){
            ActionUser.createInstance(this, this.curentUser, CHANGE_USER, this.curentUser);
            return;
        }
        canBuyFilial();
        ActionUser.createInstance(this, this.curentUser, CHANGE_USER, this.curentUser);
    }

    //private boolean isWinSomebody() {
    isWinSomebody() {
        //победа
        if(getListUser().length==1){
            this.curentUser=getListUser()[0];
            ActionUser.createInstance(this, this.curentUser, WIN, this.curentUser);
            this.curentUser.setActivGamer(true);
            this.curentUser.setWin(true);
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            Util.clear(this.curentUser.getAvailableAction());
            Util.addUnicAll(this.curentUser.getAvailableAction(),[GAME_CLOSE]);
            //this.curentUser.getAvailableAction()[this.curentUser.getAvailableAction().length]=GAME_CLOSE;
            return true;
        }
        return false;
    }

    ///public boolean isStartGame() {
    isStartGame() {
        return startGame;
    }

    //public String getImageFolder() {
    getImageFolder() {
        return imageFolder;
    }

    //public void setImageFolder(String imageFolder) {
    setImageFolder(imageFolder) {
        this.imageFolder = imageFolder;
    }

    //public String getImageCenter() {
    getImageCenter() {
        return imageCenter;
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
        if(this.curentUser.getAvailableAction().contains(THROW_CUBE)){
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            Util.clear(this.curentUser.getAvailableAction());
            var toValue=[Util.getRandom(1,6), Util.getRandom(1,6)];
            this.curentUser.throwDouble(toValue[0]==toValue[1]);
            ActionUser.createInstance(this,curentUser, THROW_CUBE, toValue);
            if(this.curentUser.getPrison()>0){
                if(this.curentUser.getCountThrowDouble()==1){
                    //выходит из тюрьмы
                    this.curentUser.setPrison(0);
                }else{
                    this.curentUser.setPrison(this.curentUser.getPrison()+1);
                    nextGamer();
                }
            }
            if(this.curentUser.getCountThrowDouble()==3){
                //устанавливаем выбрасывание кубика в 0 раз
                goPrison(this.curentUser);
                nextGamer();
                this.curentUser.throwDouble(false);
                return toValue;
            }
            goToCard(toValue[0]+toValue[1]);
            return toValue;
        }else{
            //штраф
            penaltyCheating(this.curentUser);
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
            ActionUser.createInstance(this, user, GO_PRISON, user);
        }
    }

   // public CardPrison getCardPrison(){
     getCardPrison(){
        for(const card of this.listCard){
            if(card.name == Card.CARD_PRISON){
                return card;
            }
        }
        return null;
    }

    //получение денег за круг
    //private void getMoneybyCircle(UserMonopoly curentUser) {
    getMoneybyCircle(curentUser) {
        curentUser.setMoney(curentUser.getMoney() + circleMoney);
    }

    //@Override
    //public void buyFirm(){
    buyFirm(){
        if(this.curentUser.getAvailableAction().contains(BUY_FIRM)){
            if(this.listCard.get(this.curentUser.getIndexPosition()).type == Card.CARD_FIRM) {
                //CardFirm
                var cardF = this.listCard.get(this.curentUser.getIndexPosition());
                if(cardF.getUserOwner()==null && this.curentUser.getMoney()>=cardF.getPrice()) {
                    this.curentUser.setMoney(this.curentUser.getMoney() - cardF.getPrice());
                    cardF.setUserOwner(this.curentUser);
                    ActionUser.createInstance(this, this.curentUser, BUY_FIRM, cardF);
                    //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
                    Util.clear(this.curentUser.getAvailableAction());
            }else{
                    //штраф
                    penaltyCheating(this.curentUser);
                }
                nextGamer();
            }
        }
    }

    //public void penaltyCheating(UserMonopoly user) 
    penaltyCheating(user){
        ActionUser.createInstance(this, user, PENALTY_CHEATING, getPenalty_cheating());
    }

    //public void penaltyCheating(UserMonopoly user, Object obj) {
    penaltyCheating(user, obj) {
        ActionUser.createInstance(this,user, PENALTY_CHEATING, obj);
    }

    //@Override
    //public void payPenalty() {
    payPenalty() {
        if(this.curentUser.getAvailableAction().contains(PAY_PENALTY)){
            if(this.curentUser.getPenalty()!=0 && this.curentUser.getMoney()+this.curentUser.getPenalty()>=0){
                var c=getListCard()[this.curentUser.getIndexPosition()];
                if(c.type == Card.CARD_FIRM){
                    //CardFirm 
                    var card=c;
                    card.getUserOwner().setMoney(card.getUserOwner().getMoney()-this.curentUser.getPenalty());
                    ActionUser.createInstance(this, this.curentUser, RECEIVE_INCOME, card.getUserOwner());
                }
                Util.clear(this.curentUser.getAvailableAction());
                //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
                this.curentUser.setMoney(this.curentUser.getMoney()-Math.abs(this.curentUser.getPenalty()));
                ActionUser.createInstance(this, this.curentUser, PAY_PENALTY, this.curentUser);
                this.curentUser.setPenalty(0);
                //если был в тюрьме выходит из тюрьмы
                this.curentUser.setPrison(0);
                nextGamer();
            }else{
                penaltyCheating(this.curentUser);
            }
        }
    }

    //private Auction 
    auction=null;

    //@Override
    //public void startAuction() {
    startAuction() {
        if(this.curentUser.getAvailableAction().contains(AUCTION_START)) {
            Util.clear(this.curentUser.getAvailableAction());
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            auction = new Auction(this);
            nextGamer();

        }else{
            penaltyCheating(this.curentUser);
        }
    }

    //public void stopAuction() {
    stopAuction() {
        auction=null;
        nextGamer();
    }

    //@Override
    //public void putFirm(int[] indFirm) {
    putFirm(indFirm) {
        if(this.curentUser.getAvailableAction().contains(PUT_FIRM)) {
            for(var i=0; i < indFirm.length; i++) {
                try {
                    //CardFirm
                    var cF = getListCard()[indFirm[i]];
                    if(cF.putFirm(this, this.curentUser)) {
                        ActionUser.createInstance(this, this.curentUser, PUT_FIRM, cF);
                        firmFilialSell(this.curentUser);
                        canBuyFilial();
                    }
                } catch ( e) {
                    penaltyCheating(this.curentUser);
                }
            }
            if(!canCheckPenalty(this.curentUser)){
                var card=listCard.get(getCurentUser().getIndexPosition());
                if(card.type == Card.CARD_FIRM) {
                    if (card.getUserOwner()==null && this.curentUser.getMoney() >= card.getPrice()) {
                        Util.addUnicAll(this.curentUser.getAvailableAction(),[BUY_FIRM]);
                        // this.curentUser.getAvailableAction()[this.curentUser.getAvailableAction().length]=BUY_FIRM;
                    }
                }
            }
        }else{
            penaltyCheating(this.curentUser);
        }
    }

    //@Override
    //public void redeemFirm(int[] indFirm) {
    redeemFirm(indFirm) {
        if(this.curentUser.getAvailableAction().contains(REDEEM_FIRM)) {
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
                    penaltyCheating(this.curentUser);
                }
            }
            if(this.curentUser.getMoney()>price){
                for(const cF of lCF) {
                    if (cF.redeemFirm(this, this.curentUser)) {
                        ActionUser.createInstance(this, tjis.curentUser, REDEEM_FIRM, cF);
                        Util.removeElementFromArray(this.curentUser.getAvailableAction(),REDEEM_FIRM);
                        //this.curentUser.getAvailableAction().remove(REDEEM_FIRM);
                        firmFilialSell(this.curentUser);
                        canBuyFilial();
                    }
                }
            }else{
                ActionUser.createInstance(this, this.curentUser, NOT_MONEY, price);
            }
        }else{
            penaltyCheating(this.curentUser);
        }
    }


    //@Override
    //public void buyFilial(int[] indFirm) {
    buyFilial(indFirm) {
        if(this.curentUser.getAvailableAction().contains(BUY_FILIAL)){
            try {
                //Set<Integer> 
                var lICBF= canBuyFilial(this.curentUser);
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
                                    penaltyCheating(this.curentUser);
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
                        penaltyCheating(this.curentUser);
                        return;
                    }
                }
            } catch ( e) {
                //штраф
                penaltyCheating(this.curentUser);
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
                    penaltyCheating(this.curentUser);
                }
            }
            canBuyFilial();
        }
    }


    //@Override
    //public void sellFilial(Set<Integer> indFirm) {
    sellFilial(indFirm) {
        if(this.curentUser.getAvailableAction().contains(SELL_FILIAL)){
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
                    penaltyCheating(this.curentUser);
                    return;
                }
            }
            for(const indF of indFirm){
                try {
                    //CardFirm 
                    cF= getListCard()[indF];
                    cF.sellFilial(this, this.curentUser);
                    // curentUser.getMonopByFilThisStep().add(cF.getNumMonopoly());

                    ActionUser.createInstance(this, this.curentUser, SELL_FILIAL, cF);
                } catch ( e) {
                    //штраф
                    penaltyCheating(this.curentUser);
                }
            }
            Util.removeElementFromArray(this.curentUser.getAvailableAction(),SELL_FILIAL);
            //this.curentUser.getAvailableAction().remove(SELL_FILIAL);
            canSellFilial();
            canCheckPenalty(this.curentUser);
        }
    }

    //проверка на возможность пользователя оплатить штраф
    //public boolean canCheckPenalty(UserMonopoly userMonopoly){
    canCheckPenalty(userMonopoly){
        if(Math.abs(this.curentUser.getPenalty())>0 && this.curentUser.getMoney()>=Math.abs(this.curentUser.getPenalty())){
            Util.addUnicAll(this.curentUser.getAvailableAction(), [PAY_PENALTY]);
            //this.curentUser.getAvailableAction().add(PAY_PENALTY);
            return true;
        }
        return false;
    }

    //@Override
    //public void gameClose(UserMonopoly user) {
    gameClose(user) {
        //synchronized (room.getListViewUser()){
            room.getListViewUser().remove(user);
        //}
    }

    //проверяем куплин ли хоть один филиал в монополии
    //private boolean isBuyFilialInMonopoly(Integer numMonopoly) {
    isBuyFilialInMonopoly(numMonopoly) {
        for(const c of getListCard()) {
            if(c.type == Card.CARD_FIRM && c.getNumMonopoly()==numMonopoly && c.getFilialStay()>0) {
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
        var umFCH=getUserByName(nameUser);
        if(umFCH==null){
            return null;
        }
        for(const card of listCard){
            if(card.type == Card.CARD_FIRM){
                cf = card;
                if(cf.getUserOwner()!=null && umFCH == cf.getUserOwner() && !cf.isPut() && cf.getFilialStay()==0 && !isBuyFilialInMonopoly(cf.getNumMonopoly())){
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
        if((type == "PUT_FIRM" && this.curentUser.getAvailableAction().contains(PUT_FIRM)) || (type == CHANGE_FIRM && this.curentUser.getAvailableAction().contains(CHANGE_FIRM))) {
            for(const card of listCard){
                if(card.type == Card.CARD_FIRM){
                    var cf = card;
                    if(cf.getUserOwner()!=null && this.curentUser.equals(cf.getUserOwner()) && !cf.isPut() && cf.getFilialStay()==0 && !isBuyFilialInMonopoly(cf.getNumMonopoly())){
                        lC[lC.length] = getListCard().indexOf(cf);
                    }
                }
            }
        }
        if(type =="REDEEM_FIRM" && this.curentUser.getAvailableAction().contains(REDEEM_FIRM)) {
            for(const card of listCard){
                if(card.type() == Card.CARD_FIRM){
                    //CardFirm 
                    var cf= card;
                    if(cf.getUserOwner()!=null && this.curentUser.equals(cf.getUserOwner()) && cf.isPut()){
                        lC[lC.length] = getListCard().indexOf(cf);
                    }
                }
            }
        }
        if(type =="BUY_FILIAL" && this.curentUser.getAvailableAction().contains(BUY_FILIAL)) {
            Util.addUnicAll(lC, canBuyFilial(this.curentUser));
            //lC.addAll(canBuyFilial(this.curentUser));
        }
        if(type == "SELL_FILIAL" && this.curentUser.getAvailableAction().contains(SELL_FILIAL)) {
            //lC.addAll(canSellFilial(this.curentUser));
            Util.addUnicAll(lC, canSellFilial(this.curentUser));
        }
        return lC;
    }

   // @JsonIgnore
   // public Map<Integer, Set<CardFirm>> getAllMonopoly(){
    getAllMonopoly(){ 
        return getAllMonopoly(null);
    }

    //@JsonIgnore
    //public Map<Integer, Set<CardFirm>> getAllMonopoly(UserMonopoly user){
    getAllMonopoly(user){
        //Map<Integer,Set<CardFirm>> 
        listAllMonopoly={};
        //Map<Integer,Set<CardFirm>>
        listUserMonopoly={};
        for(const card of listCard) {
            if (card.type() == Card.CARD_FIRM) {
                var cf = card;
                if(cf.getUserOwner()!=null){
                    if(user!=null && !cf.getUserOwner().equals(user)){
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
        for(const um of getListUser()){
            if(um.getName() == userName){
                return um;
            }
        }
        return null;
    }

    
    //@Override
    //public void changeFirm(Set<Integer> indFirm, Set<Integer> indFirm2, int money, int money2, String userName) {
    changeFirm(indFirm, indFirm2, money, money2, userName) {
        if(this.curentUser.getAvailableAction().contains(CHANGE_FIRM)){
            //UserMonopoly 
            var umA=getUserByName(userName);
            if(umA==null){
                penaltyCheating(this.curentUser);
                return;
            }
            this.curentUser.doChangeFirm();
            Util.clear(this.curentUser.getAvailableAction());          
            umA.getAvailableAction()[umA.getAvailableAction().length]=EXCHANGE_OFFERS;
            this.curentUser.setActivGamer(false);
            //todo сделать проверки на принадлежность фирм и необходимой суммы денег
            objectOffers=new ChangeFirm(indFirm, indFirm2, money, money2, this.curentUser,umA);
            this.curentUser=umA;
            ActionUser.createInstance(this,this.curentUser, CHANGE_USER, this.curentUser);
            this.curentUser.setActivGamer(true);
            ActionUser.createInstance(this,this.curentUser, EXCHANGE_OFFERS, objectOffers);
        }
    }

    //public void changeFirm(ChangeFirm changeFirm) {
    changeFirm(changeFirm) {
        this.changeFirm(changeFirm.getIndFirmUserChanger(),changeFirm.getIndFirm(),changeFirm.getMoneyUserChanger(),changeFirm.getMoney(),changeFirm.getUserName());
    }

    //public void changeFirm(ActionMonopolyE type){
    changeFirm(type){
        if(this.curentUser.getAvailableAction().contains(EXCHANGE_OFFERS)){
            Util.clear(this.curentUser.getAvailableAction());
            //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
            //UserMonopoly 
             usCH=objectOffers.getUserChanger();
            if(type==CHANGE_FIRM_OK){
                for (const  indF of objectOffers.getIndFirmUserChanger()){
                    getListCard()[indF].setUserOwner(objectOffers.getUser());
                    ActionUser.createInstance(this,objectOffers.getUser(), BUY_FIRM, getListCard()[indF]);
                }
                objectOffers.getUser().setMoney(objectOffers.getUser().getMoney() + objectOffers.getMoneyUserChanger());
                usCH.setMoney(usCH.getMoney()-objectOffers.getMoneyUserChanger());
                for (const indF of objectOffers.getIndFirm()){
                    getListCard()[indF].setUserOwner(usCH);
                    ActionUser.createInstance(this,usCH, BUY_FIRM, getListCard()[indF]);
                }
                objectOffers.getUser().setMoney(objectOffers.getUser().getMoney() - objectOffers.getMoney());
                usCH.setMoney(usCH.getMoney()+objectOffers.getMoney());
                ActionUser.createInstance(this,this.curentUser, CHANGE_FIRM_OK, objectOffers);
            }else{
                ActionUser.createInstance(this,this.curentUser, CHANGE_FIRM_CANCAL, objectOffers);
            }
            this.curentUser.setActivGamer(false);
            this.curentUser=usCH;
            ActionUser.createInstance(this,this.curentUser, CHANGE_USER, this.curentUser);
            this.curentUser.setActivGamer(true);
            if(this.curentUser.isThrowCubs()) {
                //Card 
                card=getListCard()[this.curentUser.getIndexPosition()];;
                if(card.type() == Card.CARD_FIRM) {
                    //CardFirm 
                    var cardF=card;
                    if (cardF.getUserOwner() == null) {
                        if (this.curentUser.getMoney() >= cardF.getPrice()) {
                           // this.curentUser.getAvailableAction()[]=BUY_FIRM);
                           Util.addUnicAll(this.curentUser.getAvailableAction(),[BUY_FIRM]);
                        }
                        Util.addUnicAll(this.curentUser.getAvailableAction(),[AUCTION_START]);
                        //this.curentUser.getAvailableAction().add(AUCTION_START);
                    }
                }
                canCheckPenalty(this.curentUser);
                giveTakeCredit(this.curentUser);
                firmFilialSell(this.curentUser);
            }else{
                Util.clear(this.curentUser.getAvailableAction());
                //this.curentUser.getAvailableAction().splice(0, this.curentUser.getAvailableAction().length);
                getListCard().get(this.curentUser.getIndexPosition()).transferCardForUser(this, curentUser);
                if(!canCheckPenalty(this.curentUser)){
                    Util.addUnicAll(this.curentUser.getAvailableAction(),[THROW_CUBE]);
                    //this.curentUser.getAvailableAction().add(THROW_CUBE);
                }
                giveTakeCredit(this.curentUser);
                firmFilialSell(this.curentUser);
                canBuyFilial();
            }
            objectOffers=null;
        }
    }
       
    //public void 
    canSellFilial(){
        //this.curentUser.getAvailableAction().remove(SELL_FILIAL);
        Util.removeElementFromArray(this.curentUser.getAvailableAction(), SELL_FILIAL);
        //Set<Integer> list=canSellFilial(z);
        var list = canSellFilial(z);
        if(list.size()>0){
            Util.addUnicAll(this.curentUser.getAvailableAction(), [SELL_FILIAL]);
            //this.curentUser.getAvailableAction().add(SELL_FILIAL);
        }
    }

    //филиалы каких фирм может продать пользователь user.
    //private Set<Integer> canSellFilial(UserMonopoly user){
    canSellFilial(user){
        var lC=[];
        for(const cardList of getAllMonopoly(this.curentUser).values()){
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
                    lC[lC.length]=listCard.indexOf(cfs);
                }
            }
        }
        return lC;
    }

    //public void canBuyFilial(){
    canBuyFilial(){
        Util.removeElementFromArray(this.curentUser.getAvailableAction(),BUY_FILIAL);
        //this.curentUser.getAvailableAction().remove(BUY_FILIAL);
        //Set<Integer> 
        var list=canBuyFilial(this.curentUser);
        if(list.length>0){
            Utiil.addUnicAll(this.curentUser.getAvailableAction(),[BUY_FILIAL]);
            //this.curentUser.getAvailableAction().add(BUY_FILIAL);
        }
    }

    //филиалы каких фирм может купить пользователь user.
    //private Set<Integer> canBuyFilial(UserMonopoly user){
    canBuyFilial( user){
        lC=[];
        for(const cardList of getAllMonopoly(this.curentUser).values()){
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
                        lC[lC.length]=listCard.indexOf(cfs);
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
                if(card.type() == Card.CARD_FIRM){
                    var cardF=card;
                    if(cardF.getUserOwner()!=null && cardF.getUserOwner().equals(user)) {
                        cardF.returnInBank(this);
                        ActionUser.createInstance(this, this.curentUser, RETURN_IN_BANK, cardF);
                    }
                }
            }
            //возврат денег тому на ячейки которого обанкротился , если такая есть
            if(user.getPenalty()<0){
                var c = getListCard()[user.getIndexPosition()];
                if (card.type() == Card.CARD_FIRM) {
                    var card = c;
                    var retM=Math.abs(user.getPenalty());
                    if(retM>user.getMoney()){
                        retM=user.getMoney();
                    }
                    card.getUserOwner().setMoney(card.getUserOwner().getMoney() + retM);
                    user.setPenalty(0);
                }
            }
            ActionUser.createInstance(this,user, LOOSE, null);
            Util.removeElementFromArray(getListUser(),user);
            //getListUser().remove(user);
            getListViewUser()[getListViewUser().length] =user;
            Util.removeElementFromArray(user.getAvailableAction(),GAME_END);
            // user.getAvailableAction().remove(GAME_END);
            Util.addUnicAll(user.getAvailableAction(),[GAME_CLOSE]);
            //user.getAvailableAction().add(GAME_CLOSE);
            if(user.equals(this.curentUser)){
                if(getListUser().size()>1) {
                    nextGamer();
                }
            }
            isWinSomebody();
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
    getCredit() {
        return this.credit;
    }

    //public void setCredit(int credit) {
    setCredit(credit) {
        this.credit = credit;
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
            Util.addUnicAll(userMonopoly.getAvailableAction(),[GIVE_CREDIT]);
            //userMonopoly.getAvailableAction().add(GIVE_CREDIT);
        }else{
            //userMonopoly.getAvailableAction().add(TAKE_CREDIT);
            Util.addUnicAll(userMonopoly.getAvailableAction(),[TAKE_CREDIT]);          
        }
    }

    //проверка на возможность продать филиал или заложить или выкупить фирму
    //public void firmFilialSell(UserMonopoly userMonopoly){
    firmFilialSell( userMonopoly){
        for(const card of getListCard()){
            if(card.type() == Card.CARD_FIRM && card.getUserOwner()==userMonopoly){
                //заложить фирму
                if(!card.isPut() && card.getFilialStay()==0) {
                    //userMonopoly.getAvailableAction().add(PUT_FIRM);
                    //userMonopoly.getAvailableAction().add(CHANGE_FIRM);
                    Util.addUnicAll(userMonopoly.getAvailableAction(),[PUT_FIRM,CHANGE_FIRM]);
                    continue;
                }
                //выкупить фирму
                if(this.curentUser.getPrison()==0) {
                    if ( card.isPut() && userMonopoly.getMoney() >  card.getPrice()) {
                        //userMonopoly.getAvailableAction().add(REDEEM_FIRM);
                        Util.addUnicAll(userMonopoly.getAvailableAction(),[REDEEM_FIRM]);
                        continue;
                    }
                }
                //продать филиал
                if(card.getFilialStay()>0){
                    //userMonopoly.getAvailableAction().add(SELL_FILIAL);
                    Util.addUnicAll(userMonopoly.getAvailableAction(),[SELL_FILIAL]);
                }
            }
        }
    }

    //public void goToCard(int countStep){
    goToCard(countStep){
        var pos=0;
        if(this.curentUser.isGoForward()){
            pos=this.curentUser.getIndexPosition()+countStep;
            if(pos>=listCard.length){
                pos=pos-listCard.length;
                //выдать деньги за круг
                getMoneybyCircle(this.curentUser);
                //увеличить кредит на 50%
                this.curentUser.setCredit(this.curentUser.getCredit()*1.5);
            }
        }else{
            pos=this.curentUser.getIndexPosition()-countStep;
            if(pos<0){
                pos=listCard.length-1+pos;
            }
            //меняем направление на правильное
            this.curentUser.setGoForward(true);
        }
        this.curentUser.setThrowCubs(true);
        this.curentUser.setIndexPosition(pos);
        ActionUser.createInstance(this,this.curentUser, GO_SELL, countStep);
        listCard[pos].transferCardForUser(this,this.curentUser);
        if(this.curentUser.getPrison()>0){
            nextGamer();
            return;
        }
        canCheckPenalty(this.curentUser);
        giveTakeCredit(this.curentUser);
        firmFilialSell(this.curentUser);
    }
}
module.exports = MonopolyGame;
