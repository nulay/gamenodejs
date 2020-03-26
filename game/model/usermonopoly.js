var DefaultUserRoom = require("./defaultuserroom");
var Util = require("./util");
class UserMonopoly extends DefaultUserRoom {
//implements UserMonopoly{
    //money
    //private int 
    money;
    //penalty
    //private int 
    penalty;
    //++@JsonIgnore
    //++private SecureRandom rand=new SecureRandom();
    //position of user
    //private int 
    indexPosition=0;
    //credit for user
    //private int 
    credit;
    //active user or not
    //private boolean 
    activGamer=false;
    //go Forward or back;
    //private boolean 
    goForward=true;
    //List each actions of user, after execute to cleanup
    //++@JsonIgnore
    //++private List<ActionUser> 
    actionsAllUser=[];
    //++@JsonIgnore
    //list bought cards(firm)
    //++private List<Card> 
    listBuyCard=[];
    //louse
    //private boolean 
    loose=false;
    //win
    //private boolean 
    win=false;
    //++@JsonIgnore
    //it is checked that user threw cube
    //private boolean 
    throwCubs=false;
    //количество выкинутых дублей за один ход
    //private int 
    throwDouble=0;
    //количество преложенных обменов за один ход
    //private int 
    changeFirmCount=0;
    //Список монополий в которых был куплен филиал на текущем шаге.
    //private Set<Integer> 
    monopByFilThisStep = [];
    //Находится ли пользователь в тюрьме и сколько ходов 0 - не находится.
    //private int 
    prison=0;
    //list available action
    //++@JsonIgnore
    //private Set<String> listAvailableActions;
    //private Set 
    availableAction=[];

    //public UserMonopolyImpl(User user, int maxCountActiveRoom, Integer money) {
    constructor(user, maxCountActiveRoom, money){
        super(user,maxCountActiveRoom);
        //setAvailableAction(new ActionMonopolyC());

        this.money = money;
        this.actionsAllUser=[];
        this.monopByFilThisStep=[];

        this.listBuyCard=[];
        this.availableAction=[];
    }

    //@Override
    //public Set 
    getAvailableAction(){
      return this.availableAction;
    }
    //@Override
    setAvailableAction(availableAction) {
        this.availableAction = availableAction;
    }

    //public int getMoney() {
    getMoney() {
        return this.money;
    }

    //public void setMoney(int money) {
    setMoney(money) {
        this.money = money;
    }

    //public int getPenalty() {
    getPenalty() {
        return this.penalty;
    }

    //public void setPenalty(int penalty) {
    setPenalty(penalty) {
        this.penalty = penalty;
    }

    //public int getIndexPosition() {
    getIndexPosition() {
        return this.indexPosition;
    }

    //public void setIndexPosition(int indexPosition) {
    setIndexPosition(indexPosition) {
        this.indexPosition = indexPosition;
    }

    //public int getCredit() {
    getCredit() {
        return this.credit;
    }

    //public void setCredit(int credit) {
    setCredit(credit) {
        this.credit = credit;
    }

    //public boolean isActivGamer() {
    isActivGamer() {
        return this.activGamer;
    }

    //public void setActivGamer(boolean activGamer) {
    setActivGamer(activGamer) {
        this.activGamer = activGamer;
    }
    
    //@Override
    //public boolean isGoForward() {
    isGoForward(){
        return this.goForward;
    }
    //@Override
    //public void setGoForward(boolean goForward) {
    setGoForward(goForward) {
        this.goForward = goForward;
    }


    //@JsonIgnore
    //@Override
    //public List<ActionUser> getAndClearActionsAllUser() {
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

    //@Override
    //public boolean addActionUser(ActionUser actionUser) {
    addActionUser(actionUser) {       
       return this.actionsAllUser[this.actionsAllUser.length]=actionUser;
    }

    //@Override
    //public boolean isLoose() {
    isLoose() {
        return this.loose;
    }

    //@Override
    //public void setLoose(boolean key) {
    setLoose( key) {
        this.loose=key;
    }

    //@Override
    //public void setWin(boolean key) {
    setWin(key) {
        this.win=key;
    }

    //@Override
    //public void throwDouble(boolean yes) {
    isthrowDoubleF(yes){
        if(yes) {
            this.throwDouble += 1;
        }else {
            this.throwDouble = 0;
        }
    }

    //@Override
    //public int 
    getCountThrowDouble() {
        return this.throwDouble;
    }

    //public boolean isWin() {
    isWin() {
        return this.win;
    }

    //public Set<Integer> getMonopByFilThisStep() {
    getMonopByFilThisStep() {
      return this.monopByFilThisStep;
    }

    //@Override
    //public void setMonopByFilThisStep(Collection<Integer> monopByFilThisStep) {
    setMonopByFilThisStep(monopByFilThisStep) {            
        this.monopByFilThisStep = monopByFilThisStep;
    }

    //@Override
    //public boolean isMonopByFilThisStep(int numMonopoly) {
    isMonopByFilThisStep(numMonopoly){
        for(const monopN of monopByFilThisStep){
            if(monopN == numMonopoly){
                return true;
            }
        }
        return false;
    }

    //public boolean isThrowCubs() {
    isThrowCubs() {
        return this.throwCubs;
    }

    //public void setThrowCubs(boolean throwCubs) {
    setThrowCubs(throwCubs) {
       this.throwCubs = throwCubs;
    }

    //@Override
    //public void doChangeFirm() {
    doChangeFirm() {
        this.changeFirmCount+=1;
    }

    //public void setChangeFirmCount(int changeFirmCount) {
    setChangeFirmCount(changeFirmCount) {
       this.changeFirmCount = changeFirmCount;
    }

    //@Override
    //public int getChangeFirmCount() {
    getChangeFirmCount() {
        return this.changeFirmCount;
    }

    //public int getPrison() {
    getPrison() {
        return this.prison;
    }

    //public void setPrison(int prison) {
    setPrison(prison) {
        this.prison = prison;
    }
}
module.exports = UserMonopoly;
