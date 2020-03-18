var MonopolyGame = require("./monopolygame");
var CardFirm = require("./cardfirm");
var CardPlusMinus = require("./cardplusminus");
var CardPrison = require("./cardprison");
var CardCheating = require("./cardcheating");
var UserMonopoly = require("./usermonopoly");

class GameSettings{
    static createStandartMonopoly(roomForJoin){
       console.log('createStandartMonopoly : '+JSON.stringify(roomForJoin));
       var listCard =[new CardPlusMinus('Старт', [5000],'01.jpg'),
                      new CardFirm('Мягков', 1500,5,700,1,2,'firmR.png' ),
                      new CardPlusMinus('CardPlusMinus',[-6000,-4000,-2000],'surprR.png'),
                      new CardFirm('Nemiroff', 1500,5,700,1,2,'firmR.png' ),
                      new CardFirm('Kent', 2500,5,1200,2,3,'firmR.png' ),
                      new CardPlusMinus('Шанс',[-4000,-2000,2000,4000,6000],'surprR.png'),
                      new CardFirm('Marlboro', 22500,5,1200,2,3,'firmR.png' ),
                      new CardFirm('Parlament', 3000,5,1500,2,3,'firmR.png' ),
                      new CardPrison('Тюрьма', 3000,'09.jpg' ),
                      new CardFirm('Panasonic', 3500,5,1700,3,3,'firmR.png' ),
                      new CardFirm('Siemens', 3500,5,1700,3,3,'firmR.png' ),
                      new CardFirm('Bosch', 4000,5,2000,3,3,'firmR.png' ),
                      new CardFirm('Nokia', 5500,5,2700,4,3,'firmR.png' ),
                      new CardPlusMinus('Шанс', [-4000,-2000,2000,4000,6000],'surprR.png' ),
                      new CardFirm('HTC', 5500,5,2700,4,3,'firmR.png' ),
                      new CardFirm('Samsung', 6000,5,3000,4,3,'firmR.png' ),
                      new CardPlusMinus('Шанс', [-4000,-2000,2000,4000,6000],'17.jpg' ),
                      new CardFirm('МТС', 8000, 5,4000,5,3,'firmR.png' ),
                      new CardPlusMinus('Шанс',[-4000,-2000,2000,4000,6000],'surprR.png'),
                      new CardFirm('Velcome', 8000,5,4000,5,3,'firmR.png' ),
                      new CardFirm('Beeline', 9000,5,4500,5,3,'firmR.png' ),
                      new CardFirm('Lexus', 11500,5,5700,6,3,'firmR.png' ),
                      new CardFirm('Mersedess', 11500, 5, 5700, 6, 3,'firmR.png'),
                      new CardFirm('BMW', 12000, 5, 6000, 6, 3,'firmR.png'),
                      new CardCheating('Мошенник', 8,'25.jpg'),
                      new CardFirm('Аэрофлот', 14500, 5, 7200, 7, 3,'firmR.png'),
                      new CardFirm('Аирлайнс', 14500, 5, 7200, 7, 3,'firmR.png'),
                      new CardPlusMinus('Шанс',[-4000,-2000,2000,4000,6000],'surprR.png'),
                      new CardFirm('АэроСвит', 15000, 5, 7500, 7, 3,'firmR.png'),
                      new CardPlusMinus('Налоговая',[-6000,-4000,-2000,2000],'surprR.png'),
                      new CardFirm('Лукойл', 17000, 5, 8500, 8, 2,'firmR.png'),
                      new CardFirm('Роснефть', 20000, 5, 10000, 8, 2,'firmR.png')];
        var listUsers = [];
        var startMoney =3000;
        var moneyForCircle=1000;
        for(var i=0;i<roomForJoin.roomUsers.length;i++){       
           var oldUser = roomForJoin.roomUsers[i];
           var mUser = new UserMonopoly(oldUser, 5, startMoney);          
           listUsers[listUsers.length]=mUser;
        }
       var monopolyGame=new MonopolyGame(listCard, startMoney, moneyForCircle, roomForJoin.nameRoom, listUsers);
       monopolyGame.setImageFolder("images/monopoly");
       monopolyGame.setImageCenter("center.jpg");
       monopolyGame.credit=10000;
       monopolyGame.penalty_cheating=10000;
       console.log(monopolyGame.startGameF);
       monopolyGame.startGameF();
       return monopolyGame;
    }
}

module.exports = GameSettings; 
