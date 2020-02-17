global.users = [];

var user = function (name, password, age,gender) {
    this.name = name;
    this.password = password;
    this.age = age;
    this.gender = gender;

    this.toString = function() {
      return this.name + " " +
             this.age + " years old" +
             (this.gender == 'M' ? " man" : " woman");
    };
   this.equils_creds = function(personB) {
   if(this.name == personB.name &&
      this.password == personB.password){
	return true;
   }
   return false;
};

    return this;
}



function is_user(userb){
    console.log('check user '+global.users.length);
    console.log(user.toString() + " " + user);
    if (global.users.length === 0) return false;
    for(i = 0 ; i<global.users.length ;i++){
      if(userb.equils_creds(global.users[i])){
         return true;
      }
    }
    return false;
}


function is_user_name(user){
    console.log(user.toString());
    if (global.users.length === 0) return false;
    for(i = 0 ; i<global.users.length ;i++){
       if(user.name == global.users[i].name){
          return true;
       }
    }
    return false;
}

module.exports = user;
module.exports.is_user = is_user;
module.exports.is_user_name = is_user_name;
