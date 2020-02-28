class Room {
  constructor(roomName, roomType) {
    this.roomName = roomName;
    this.roomType = roomType;
  }
  get users() {
    return this._users;
  }

  //add user
  addUser(user) {
    this._users[this._users.length] = user;
  }

  //Remove user
  removeUser(UserRoom user){

  }

  //Get room number
  get numberRoom(){
    return this._numberRoom;
  }
  
  //set room number
  set numberRoom(numberRoom){
    this._numberRoom=numberRoom;
  }

  //Check allow rom for specific user
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
