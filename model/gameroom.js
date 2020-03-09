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
  
  //List traced users for game
  get listViewUser(){
    return this.listViewUser;
  }
}


module.exports = GameRoom
