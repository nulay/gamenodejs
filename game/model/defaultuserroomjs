class DefaultUserRoom {
    //Outside user
    //@JsonIgnore
    //private User user;
    user;
    //list rooms what user was entrance
    //@JsonIgnore
    //private List<Room> activeRooms;
    activeRooms;
    //max count rooms is available for user can entrance
    //private int maxCountActiveRoom;
    maxCountActiveRoom;
    //@JsonIgnore
    //date last entrance
    //private Date lastIn;
    lastIn;

    constructor(user, maxCountActiveRoom) {
        this.user = user;
        this.activeRooms=[];
        this.maxCountActiveRoom=maxCountActiveRoom;

    }

    /**{@inheritDoc}*/
    //@Override
    //public List<Room> getActiveRooms(){
    getActiveRooms(){
        return this.activeRooms;
    }

    //Method return user
    //public User getUser() {
    getUser() {
        return this.user;
    }

    /**{@inheritDoc}*/
    //@Override
    //public void setUser(Object user) {
    setUser(user) {
        this.user = user;
    }

    /**{@inheritDoc}*/
    //@Override
    //public String getName() {
    getName() {
        return this.user.getName();
    }

    /**{@inheritDoc}*/
    //@Override
    //public void checkedTime() {
    checkedTime() {
        lastIn=new Date();
    }

    /**{@inheritDoc}*/
    //@Override
    //public Date getLastIn() {
    getLastIn() {
        return this.lastIn;
    }
}
