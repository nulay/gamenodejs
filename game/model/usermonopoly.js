class UserMonopolyImpl 
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
    var listBuyCard;
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
    get money() {
        return money;
    }

    //public void setMoney(int money) {
    set money(money) {
        this.money = money;
    }

    //public int getPenalty() {
    //    return penalty;
    //}

    //public void setPenalty(int penalty) {
    //    this.penalty = penalty;
    //}

    //public int getIndexPosition() {
    //    return indexPosition;
    //}

    //public void setIndexPosition(int indexPosition) {
    //    this.indexPosition = indexPosition;
    //}

    //public int getCredit() {
    //    return credit;
    //}

    //public void setCredit(int credit) {
    //    this.credit = credit;
    //}

    //public boolean isActivGamer() {
    isActivGamer() {
        return this.activGamer;
    }

    //public void setActivGamer(boolean activGamer) {
    //    this.activGamer = activGamer;
    //}
    
    //@Override
    //public boolean isGoForward() {
    isGoForward(){
        return this.goForward;
    }
    //@Override
    //public void setGoForward(boolean goForward) {
    //    this.goForward = goForward;
    //}


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

    @Override
    public boolean isLoose() {
        return loose;
    }

    @Override
    public void setLoose(boolean key) {
        this.loose=key;
    }

    @Override
    public void setWin(boolean key) {
        this.win=key;
    }

    @Override
    public void throwDouble(boolean yes) {
        if(yes) {
            this.throwDouble += 1;
        }else {
            this.throwDouble = 0;
        }
    }

    @Override
    public int getCountThrowDouble() {
        return throwDouble;
    }

    public boolean isWin() {
        return win;
    }

    public Set<Integer> getMonopByFilThisStep() {
        return monopByFilThisStep;
    }

    @Override
    public void setMonopByFilThisStep(Collection<Integer> monopByFilThisStep) {
            this.monopByFilThisStep = (Set<Integer>) monopByFilThisStep;
    }


    @Override
    public boolean isMonopByFilThisStep(int numMonopoly) {
        for(Integer monopN:monopByFilThisStep){
            if(monopN.intValue()==numMonopoly){
                return true;
            }
        }
        return false;
    }

    public boolean isThrowCubs() {
        return throwCubs;
    }

    public void setThrowCubs(boolean throwCubs) {
        this.throwCubs = throwCubs;
    }

    @Override
    public void doChangeFirm() {
        this.changeFirmCount+=1;
    }

    public void setChangeFirmCount(int changeFirmCount) {
        this.changeFirmCount = changeFirmCount;
    }

    @Override
    public int getChangeFirmCount() {
        return changeFirmCount;
    }

    public int getPrison() {
        return prison;
    }

    public void setPrison(int prison) {
        this.prison = prison;
    }
}
