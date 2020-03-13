class UserMonopoly
//extends DefaultUserRoom implements UserMonopoly{
    //money
    //private int 
    var money;
    //penalty
    //private int 
    var penalty;
    //++@JsonIgnore
    //++private SecureRandom rand=new SecureRandom();
    //position of user
    //private int 
    var indexPosition=0;
    //credit for user
    //private int 
    var credit;
    //active user or not
    //private boolean 
    var activGamer=false;
    //go Forward or back;
    //private boolean 
    var goForward=true;
    //List each actions of user, after execute to cleanup
    //++@JsonIgnore
    //++private List<ActionUser> 
    var actionsAllUser=[];
    //++@JsonIgnore
    //list bought cards(firm)
    //++private List<Card> 
    var listBuyCard=[];
    //louse
    //private boolean 
    var loose=false;
    //win
    //private boolean 
    var win=false;
    //++@JsonIgnore
    //it is checked that user threw cube
    //private boolean 
    var throwCubs=false;
    //количество выкинутых дублей за один ход
    //private int 
    var throwDouble=0;
    //количество преложенных обменов за один ход
    //private int 
    var changeFirmCount=0;
    //Список монополий в которых был куплен филиал на текущем шаге.
    //private Set<Integer> 
    var monopByFilThisStep = [];
    //Находится ли пользователь в тюрьме и сколько ходов 0 - не находится.
    //private int 
    var prison=0;
    //list available action
    //++@JsonIgnore
    //private Set<String> listAvailableActions;
    //private Set 
    var availableAction=[];

    consructor(){
        this(null, 1);
    }

    //consructor(User user){
    consructor(user){
        this(user, 1);
    }

    //public UserMonopolyImpl(User user, int maxCountActiveRoom) {
    consructor(user, maxCountActiveRoom){
        this(user, maxCountActiveRoom,0);
    }

    //public UserMonopolyImpl(User user, int maxCountActiveRoom, Integer money) {
    consructor(user, maxCountActiveRoom, money){
        super(user,maxCountActiveRoom);
        //setAvailableAction(new ActionMonopolyC());

        this.money = money;
        actionsAllUser=new ArrayList<>();
        monopByFilThisStep=new HashSet<>();

        listBuyCard=new ArrayList<>();
        availableAction=EnumSet.noneOf(ActionRoomI.class);
    }

    //@Override
    //public Set 
    get availableAction(){
      return this.availableAction;
    }
    //@Override
    set availableAction(availableAction) {
        this.availableAction = availableAction;
    }

    //public int getMoney() {
    getMoney() {
        return money;
    }

    //public void setMoney(int money) {
    setMoney(money) {
        this.money = money;
    }

    //public int getPenalty() {
    getPenalty() {
        return penalty;
    }

    //public void setPenalty(int penalty) {
    setPenalty(penalty) {
        this.penalty = penalty;
    }

    //public int getIndexPosition() {
    getIndexPosition() {
        return indexPosition;
    }

    //public void setIndexPosition(int indexPosition) {
    setIndexPosition(indexPosition) {
        this.indexPosition = indexPosition;
    }

    //public int getCredit() {
    getCredit() {
        return credit;
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
           // List<ActionUser> oldAU = new ArrayList<>();
            oldAU =[];
            Array.prototype.push.apply(oldAU, this.actionsAllUser);
            //oldAU.addAll(actionsAllUser);
            this.actionsAllUser.splice(0,this.actionsAllUser.length);
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
        return loose;
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
    throwDouble(yes)
        if(yes) {
            this.throwDouble += 1;
        }else {
            this.throwDouble = 0;
        }
    }

    //@Override
    //public int 
    getCountThrowDouble() {
        return throwDouble;
    }

    //public boolean isWin() {
    isWin() {
        return win;
    }

    //public Set<Integer> getMonopByFilThisStep() {
    getMonopByFilThisStep() {
      return monopByFilThisStep;
    }

    //@Override
    //public void setMonopByFilThisStep(Collection<Integer> monopByFilThisStep) {
    setMonopByFilThisStep(monopByFilThisStep) {            
        this.monopByFilThisStep = monopByFilThisStep;
    }

    //@Override
    //public boolean isMonopByFilThisStep(int numMonopoly) {
    isMonopByFilThisStep(numMonopoly)
        for(var monopN : monopByFilThisStep){
            if(monopN == numMonopoly){
                return true;
            }
        }
        return false;
    }

    //public boolean isThrowCubs() {
    isThrowCubs() {
        return throwCubs;
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
