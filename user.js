global.users = [];

var user = function (name, password, age,gender) {
    this.name = name;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.sotialid = [];

    this.findOne = function(objusauth, funccheck){
       usert = finduserbysotialid(objusauth.id);
       funccheck(null, usert);
    }

    this.save = function(functioncb){
       global.users[global.users.length] = new userf(user_name,password);
       functioncb();
    }

    this.toString = function() {
      return this.name + " " +
             this.age + " years old" +
             (this.gender == 'M' ? " man" : " woman");
    };
   this.equils_creds = function(personB) {
   console.log("users: "+this.toString());
   console.log(personB.toString());

   if(this.name == personB.name &&
      this.password == personB.password){
	return true;
   }
   return false;
};

    return this;
}

function finduserbysotialid(id){
    console.log('finduserbyid id is: '+id);
    if (global.users.length === 0) return null;
    for(i = 0 ; i<global.users.length ;i++){
      if(global.users[i].sotialid.length>0){
         for(y = 0 ; y<global.users[i].sotialid.length ;y++){
           if(global.users[i].sotialid[y] == id){

              return global.users[i];
           }
         }   
      }
    }
    return null;
}



function is_user(userb){
    console.log('count user in global list: '+global.users.length);
    console.log(user.toString());
    if (global.users.length === 0) return false;
    for(i = 0 ; i<global.users.length ;i++){
      if(userb.equils_creds(global.users[i])){

         return true;
      }
    }
    return false;
}


function is_user_name(user){
    console.log('count user in global list: '+global.users.length);
    console.log(user.toString());
    if (global.users.length === 0) return false;
    for(i = 0 ; i<global.users.length ;i++){
    console.log(global.users[i].toString());

       if(user.name == global.users[i].name){
          return true;
       }
    }
    return false;
}

module.exports = user;
module.exports.is_user = is_user;
module.exports.is_user_name = is_user_name;
