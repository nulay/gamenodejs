var ImaginariumGame = require("./imaginariumgame");
//var CardFirm = require("./cardfirm");
//var CardPlusMinus = require("./cardplusminus");
//var CardPrison = require("./cardprison");
//var CardCheating = require("./cardcheating");
var UserImaginarium = require("./userimaginarium");

class GameSettings{
    static createStandartGame(roomForJoin){
       console.log('createStandartImaginarium : '+JSON.stringify(roomForJoin));
       var listCard =[new CardPlusMinus('Старт', [5000], '01.jpg'),
                      new CardFirm('Мягков', 1500, 5, 700, 1, 2, 'firmR.png')
                      ];
        var listUsers = [];
        
        for(var i=0;i<roomForJoin.roomUsers.length;i++){       
           var oldUser = roomForJoin.roomUsers[i];
           var mUser = new UserMonopoly(oldUser, 5);          
           listUsers[listUsers.length]=mUser;
        }
       var imaginariumGame=new ImaginariumGame(listCard, roomForJoin.nameRoom, roomForJoin.maxCountUser, listUsers);
       imaginariumGame.setImageFolder("images/monopoly");
       imaginariumGame.setImageCenter("center.jpg");
       
       imaginariumGame.setPenalty_cheating(10000);
     
       
       imaginariumGame.startGameF();
       console.log(imaginariumGame);
       return imaginariumGame;
    }
}

module.exports = GameSettings; 
