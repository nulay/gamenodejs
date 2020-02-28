var users = [];
var fs = require("fs");

var user = function (name, password, email,age,gender) {
    this.name = name;
    this.password = password;
    this.email=email;
    this.age = age;
    this.gender = gender;
    this.sotialid = [];
    

    this.validPassword = function(password){
      //need to hide

       this.password = password;
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
}

function writeUsersToFile(){
   console.log('Save users to file');
   fs.writeFile("users.json",JSON.stringify(users), (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
   });
}

function readuserfromfile(){
   fs.readFile('users.json', (err, data) => {
     if (err) throw err;
     users = JSON.parse(data);
     console.log('reading is executed count records are ' +global.users.length );
   });
}

var readusisdone = false;

function getusers(){
   if (users.length === 0 && !readusisdone){
      readuserfromfile();
      readusisdone = true;
   }
   if (users.length === 0) return null;
   return users;
}

function finduserbysotialid(id){
    console.log('finduserbyid id is: '+id);
    if (getusers() == null) return null;
    for(i = 0 ; i<users.length ;i++){
      if(users[i].sotialid.length>0){
         for(y = 0 ; y<users[i].sotialid.length ;y++){
           if(users[i].sotialid[y] == id){

              return users[i];
           }
         }   
      }
    }
    return null;
}



function is_user(userb){
    console.log('count user in list: '+ users.length);
    console.log(user.toString());
    if (getusers() == null) return false;
    for(i = 0 ; i< users.length ;i++){
      if(userb.equils_creds(users[i])){

         return true;
      }
    }
    return false;
}


function is_user_name(user){
    console.log('count user in list: '+users.length);
    console.log(user.toString());
    if (getusers() == null) return null;
    for(i = 0 ; i<users.length ;i++){
       console.log(users[i].toString());

       if(user.name == users[i].name){
          return user;
       }
    }
    return null;
}

function create(auth){
    var us = new user(auth.username, auth.password, auth.email);
    users[users.length] = us;
    writeUsersToFile();
    return us
}



function findOne (objusauth, funccheck){
       var usert=null;
       if(objusauth.id!=null){
          usert = finduserbysotialid(objusauth.id);
       }
       if(objusauth.name!=null){
          usert = is_user_name(objusauth.name);
       }
       if (funccheck){
          funccheck(null, usert);
       }
       return usert;
}

 function then(user, funccb){
      if(funccb!=null){
         funccb(this)
      }
      return user;
}


function save(user_name,password,functioncb){
       users[users.length] = new userf(user_name,password);
       writeuserstofile();
       functioncb();
       return users[users.length-1];
}


function catche (funccb){
      if(funccb!=null){
         funccb(this)
      }
   };


module.exports = user;
module.exports.is_user = is_user;
module.exports.is_user_name = is_user_name;
module.exports.create = create;
module.exports.save = save;
module.exports.then = then;
module.exports.findOne = findOne;
module.exports.catche = catche;

