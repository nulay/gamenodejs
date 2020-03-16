class GameRoom {
  gameStarted=false;
  roomUsers=[];

  constructor(nameRoom, typeRoom, maxCountUserd, openRoom) {
    this.nameRoom = nameRoom;
    this.typeRoom = typeRoom;
    this.maxCountUser = maxCountUserd;
    this.openRoom = openRoom;
  }

  isStartGame() {
     return this.gameStarted;
  }

  getUsers() {
    console.log('getuser='+this.roomUsers);
    return this.roomUsers;
  }

  //add user
  addUser(roomUser) {
    if(this.gameStarted) return false;
    if(this.roomUsers.length >= this.maxCountUser) return false;
    this.roomUsers[this.roomUsers.length] = roomUser;
    if (this.roomUsers.length == this.maxCountUser){
       this.gameStarted = true;     
    }
    return true;
  }

  //Remove user
  removeUser(roomUser){
    this.roomUsers = this.roomUsers.filter(function(value, index, arr){
         return value != roomUser;
    });
  }

  //Check allow room for specific user
  isPermission(userRoom){

  }

  //Check that room is opened for entrance
  isOpenRoom(){
    return this.openRoom;
  }

  //count people in room
  countPerson(){
    return usersRoom.length;
  }
  
  //List traced users for game
  getListViewUser(){
    return this.listViewUser;
  }
}


module.exports = GameRoom
