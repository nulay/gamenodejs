var MonopolyGame = require("./monopolygame");
var CardFirm = require("./cardfirm");


class GameSettings(){
    static createStandartMonopoly(roomForJoin){
    var listCard =[new CardFirm('Мягков', 'firm', 1500,5,700,1,2,'firmR.png' ),
                   new CardFirm('Мягков2', 'firm', 1500,5,700,1,2,'firmR.png' )];
       var monopolyGame=new MonopolyGame(listCard, 3000, 1000, roomForJoin);
       return monopolyGame;
    }
}

module.exports = GameSettings;
