class GameRoom {
  gameStarted=false;
  roomUsers=[];

  constructor(roomName, roomType, maxCountUser, openRoom) {
    this.roomName = roomName;
    this.roomType = roomType;
    this.maxCountUser = maxCountUser;
    this.openRoom = openRoom;
  }

  isStartGame() {
     return this.gameStarted;
  }

  get users() {
    return this.roomUsers;
  }

  //add user
  addUser(roomUser) {
    if(this.gameStarted) return false;
    if(this.roomUsers.length >= this.maxCountUser) return false;
    this.roomUsers[this.roomUsers.length] = roomUser;
    return true;
  }

  //Remove user
  removeUser(roomUser){
    this.roomUsers = this.roomUsers.filter(function(value, index, arr){
         return value != roomUser;
    });
  }

  //Get room number
  get numberRoom(){
    return this.numberRoom;
  }
  
  //set room number
  set numberRoom(numberRoom){
    this.numberRoom=numberRoom;
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
    
  //List user in room
  get listUser(){
    return this.users;
  }
    
  //Max count user that can be to room
  set MaxCountUser(maxCountUser){
    this.maxCountUser=maxCountUser;
  }
  
  //Max count active user that can be to room
  get maxCountUser(){
    return this.maxCountUser;
  }
  set maxCountUser(maxCountUser){
    this.maxCountUser=maxCountUser;
  }
    
  //List traced users for game
  get listViewUser(){
    return this.listViewUser;
  }
}


module.exports = GameRoom
