class GameRoom {
  _gameStarted=false;
  

  constructor(roomName, roomType, maxCountUser, openRoom) {
    this._roomName = roomName;
    this._roomType = roomType;
    this._maxCountUser = maxCountUser;
    this_openRoom = openRoom;
  }

  isStartGame() {
     return _gameStarted;
  }

  get users() {
    return this._roomUsers;
  }

  //add user
  addUser(roomUser) {
    if(this._gameStarted) return false;
    if(this._roomUsers.length >= this._maxCountUser) retutrn false;
    this._roomUsers[this._roomUsers.length] = roomUser;
    return true;
  }

  //Remove user
  removeUser(roomUser){
    this._roomUsers = this._roomUsers.filter(function(value, index, arr){
         return value != roomUser;
    });
  }

  //Get room number
  get numberRoom(){
    return this._numberRoom;
  }
  
  //set room number
  set numberRoom(numberRoom){
    this._numberRoom=numberRoom;
  }

  //Check allow room for specific user
  isPermission(userRoom){

  }

  //Check that room is opened for entrance
  isOpenRoom(){
    return this._openRoom;
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
    this._maxCountUser=maxCountUser;
  }
  
  //Max count active user that can be to room
  get maxCountUser(){
    return this._maxCountUser;
  }
    
  //List traced users for game
  get listViewUser(){
    return this._listViewUser;
  }
}
