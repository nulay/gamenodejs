function  getPageSize(){
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight){ // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight){
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth){
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }
    return [pageWidth,pageHeight,windowWidth,windowHeight];
}

function getMaxSizeInnerBlockInProportion(widthInner, heightInner, elWidth, elHeight) {
    if (widthInner < elWidth) {
        var t = elWidth / widthInner;
        widthInner = elWidth;
        heightInner = heightInner * t;
    }
    if (heightInner < elHeight) {
        var t = elHeight / heightInner;
        heightInner = elHeight;
        widthInner = widthInner * t;
    }
    if (widthInner > elWidth) {
        var t = elWidth / widthInner;
        widthInner = elWidth;
        heightInner = heightInner * t;
    }
    if (heightInner > elHeight) {
        var t = elHeight / heightInner;
        heightInner = elHeight;
        widthInner = widthInner * t;
    }
    //decrease on 1%
    return [Math.floor(widthInner - 1 % widthInner), Math.floor(heightInner - 1 % heightInner)]
}

function shuffle(array) {
    var currentIndex = array.length,
    temporaryValue,
    randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var Class={create:function(){return function(){this.initialize.apply(this, arguments);}}}
Object.extend = function(d,s){for (var property in s) {d[property] = s[property];}return d;}


var predictURL = "http://localhost:63342/cms/monogol/web";

var langRu = {
    THROW_CUBE: "Бросить кубик",
    BUY_FIRM: "Купить фирму",
    BUY_FILIAL: "Купить филиал",
    TAKE_CREDIT: "Взять кредит",
    GIVE_CREDIT: "Вернуть кредит",
    PUT_FIRM: "Заложить фирму",
    REDEEM_FIRM: "Выкупить фирму",
    CHANGE_FIRM: "Обмен фирмами",
    SELL_FILIAL: "Продать филиал",
    PAY_PENALTY: "Заплатить штраф",
    AUCTION_START: "Объявить аукцион",
    AUCTION_FOLD: "Отказаться",
    AUCTION_BUY: "Поставить",
    GAME_END: "Сдаться",
    GAME_CLOSE: "Закрыть игру",
    SEND_MESSAGE: "Отправить",
    CANCAL: "Отмена",
    YOURS_WIN: "ВЫ ПОБЕДИЛИ!!!!"
}
var langEn = {
    THROW_CUBE: "Throw cube",
    BUY_FIRM: "Buy firm",
    BUY_FILIAL: "Buy filial",
    TAKE_CREDIT: "Take credit",
    GIVE_CREDIT: "Give credit",
    PUT_FIRM: "Put firm",
    REDEEM_FIRM: "Redeem Firm",
    CHANGE_FIRM: "Change firm",
    SELL_FILIAL: "Sell filial",
    PAY_PENALTY: "Pay penalty",
    AUCTION_START: "Start auction",
    AUCTION_FOLD: "Fold",
    AUCTION_BUY: "Buy",
    GAME_END: "I loose",
    GAME_CLOSE: "Game close",
    SEND_MESSAGE: "Send",
    CANCAL: "Cancal",
    YOURS_WIN: "YOURS WIN!!!!"
}

var Fishka = Class.create();
Fishka.prototype = {
    colorF: ["red", "black", "yellow", "lightblue","white","green","darkblue"],
    colorText: ["white;", "white;", "black", "black"],
    initialize: function (numF, posit, name, size, countUser) {
        this.numF = numF;
        this.posit = posit;
        this.name = name;
        this.size = size;
        this.countUser = countUser;
        this.build();
    },
    build: function () {
        var thisEl=this;		
		var w = this.size[0];
		var countFishkaInRow = (this.countUser<5)?this.countUser:4;
        var r = Math.floor(Math.floor(w / 7) / countFishkaInRow);
        this.vid = $('<div style="border-radius:' + r + 'px;display:inline-block;margin:auto;text-align:center;width:' + r + 'px;height:' + r + 'px; background-color: ' + this.colorF[this.numF - 1] + ';border: 3px solid white;"><span style="color:' + this.colorText[this.numF - 1] + 'font-weight:bold;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">' + this.numF + '</span></div>')
        this.vid.hide().show();
		this.vid.click(function(){
			var userName = $("<div style='font-size:90px;font-weight:bold;position: absolute;left:"+Math.floor(w/2)+"px;top:"+Math.floor(thisEl.size[1]/2.5)+"px;'>"+thisEl.name+"</div>");
			$('#poleGame').append(userName);
			$( userName ).animate({
				opacity: 0.25,
				"font-size" : 0
			}, 2000, function() {
				userName.remove();
			});
		})
		
		var infoG = this.vid.clone();		
		$("#gameInfo").append($('<div style="display:inline-block;padding:10px">').append(infoG).append("<label style='margin-left: 10px;'>"+this.name+"</label>"))
	}
}

var Gamer = Class.create();
Gamer.prototype = {
    initialize: function (user, game, num) {
        this.user = user;
        this.fishka = new Fishka(num, user.indexPosition, user.name, game.sizeEl.sizeGamePlace, game.room.maxCountUser);
        this.game = game;
        this.build();
    },
    build: function () {
        
    },
    updateVid: function () {
       
    }
}

var Cell = Class.create();
Cell.prototype = {
    procentPosition: [[90, 8], [78, 5], [67, 4], [56, 7], [46, 5], [36, 4], [26, 8], [16, 5], [7, 5], [2, 21],
        [10, 29], [18, 29], [28, 32], [39, 28], [49, 29], [60, 28], [69, 30], [80, 32],
        [81, 53], [72, 56], [62, 55], [52, 53], [42, 55], [32, 55], [22, 54], [12, 56], [3, 56],
        [2, 75], [11, 80], [20, 78], [30, 80], [40, 79], [49, 79], [59, 79], [69, 80], [79, 78], [87, 76], [91, 57], [91, 36]],
    initialize: function (gameM, ind) {
        this.gameM = gameM;
        this.ind = ind;
        this.buildCell();		
    },
    buildCell: function () {        
		var sizeCell = this.gameM.sizeEl.sizeCell;		
        this.vid = $('<div style="position:absolute;text-aligne:center;">').css('float', 'left').css('height', sizeCell.h + 'px').css('width', sizeCell.w + 'px').css('left', this.procentPosition[this.ind][1] + '%').css('top', this.procentPosition[this.ind][0] + '%');
        this.poleForFishka = $('<div style="display:inline-block;vertical-align: middle;"></div>');
        this.vid.append(this.poleForFishka);
        return this.vid;
    },
    goOn: function (gamer) { //фишка попала на поле
        this.goOnFishka(gamer.fishka)
    },
    goOnFishka: function (fishka) {
        this.poleForFishka.append(fishka.vid);
    }
}

var DataGameLoader = Class.create();
DataGameLoader.prototype = {
    colorF: "",
	numError: 0,
    cards: [],
    users: [],
    activeUser: null,
    indexActiveUser: 0, //index active user in users array
    initialize: function () {},
    build: function () {},
    initialize: function (lang, online) {},
    loadDataGame: function (obj, collbackNameFunction) {        
        $.ajax({
            url: "/games/monopoly/gameinfo",
            dataType: "json",
            type: "GET"
        }).done(function (data) {
            if (data != null) {
                obj.room = data;
                obj[collbackNameFunction]();
            }
        });
    },
    loadCurrentPosition: function (obj, collbackNameFunction) {
        if (data != null) {
            if (data != null) {
                obj.room = data;
                obj[collbackNameFunction]();
            }
        }
    },
    loadUser: function (obj, collbackNameFunction) {},
    loadgamedata: function (obj, collbackNameFunction) {},
	actions: function (obj, collbackNameFunction, dataReq) {
		var thisEl = this;		
		$.ajax({
            url: predictURL + "/games/monopoly/actions/" + dataReq.action.toLowerCase(),
            dataType: dataReq.datat,
            data: dataReq.datas,
            //            contentType: "application/json",
            type: dataReq.typeReq
        }).done(function (data) {
            if (data != null) {                
                obj[collbackNameFunction](data);
            }
        }).error(function () {
            if (thisEl.numError < 10) {
                thisEl.numError += 1;
            }
            setTimeout(function () {
                thisEl.actions(obj, collbackNameFunction, dataReq)
            }, 3000 * thisEl.numError);
        });		
	}
}

var DataGameNoLoad = Class.create();
DataGameNoLoad.prototype = DataGameLoader.prototype;
DataGameNoLoad.prototype.gamers = [];
DataGameNoLoad.prototype.loadDataGame = function (obj, collbackNameFunction) {
    //here we need pull in place and cards
    var data = new Object();
    var rootPath = "images/"; //resources/images/games/imaginarium/
    data.pole = new Object();
    data.setCard = [{"name":"Base", "countCard" : 96, "type":"jpg"}, 
	{"name":"Ariadna", "countCard" : 98, "type":"jpg"}, 
	{"name":"Himera", "countCard" : 98, "type":"jpg"}, 
	{"name":"Pandora", "countCard" : 98, "type":"jpg"}, 
	{"name":"5yers", "countCard" : 98, "type":"png"},
	{"name":"Persephone", "countCard" : 98, "type":"png"},
	{"name":"Childhood", "countCard" : 98, "type":"png"},
	{"name":"Soyuzmultfilm", "countCard" : 98, "type":"png"},
	{"name":"Odissea", "countCard" : 98, "type":"png"}];
    data.pole.src = rootPath + "pole.jpg";
	data.rootPath = rootPath;
    if (data != null) {
        obj[collbackNameFunction](data);
    }
}
DataGameNoLoad.prototype.showError = function (el, text) {
    var err = $("<div>").text(text);
    $(el).append(err);
    err.fadeOut(3000, function () {
        err.remove();
    });
}
DataGameNoLoad.prototype.loadCurrentPosition = function (obj, collbackNameFunction) {
    var thisEl = obj;
}
DataGameNoLoad.prototype.loadUser = function (obj, collbackNameFunction) {
    StartGame.showStartWindow(obj, collbackNameFunction);
}

DataGameNoLoad.prototype.loadgamedata = function (obj, collbackNameFunction) {
    var data = {};

    data.userRoom = StartGame.currentUser;
    data.listAction = StartGame.listAction.slice(0);
    data.availAction = [];
    data.listUser = StartGame.listUsers;
	
	Util.clear(StartGame.listAction);
    if (data != null) {
        obj[collbackNameFunction](data);
    }
}

DataGameNoLoad.prototype.getSelectedCard = function () {	
	var selC = [];
	for (var i = 0; i < StartGame.selectedCard.length; i++) {
	    if (StartGame.selectedCard[i].user != StartGame.currentUser.name) {
	        selC[selC.length] = StartGame.selectedCard[i];
	    }
	}
	return shuffle(selC);
}

DataGameNoLoad.prototype.actions = function (obj, collbackNameFunction, dataReq) {
    if(dataReq.action == "CHOISE_SET_CARD"){	
        var listCard = [];
		for (var i = 0; i < dataReq.datas.setCard.length; i++) {
		    for (var y = 1; y < dataReq.datas.setCard[i].countCard+1; y++) {
		        var card = {};
		        card.src = "cards/"+dataReq.datas.setCard[i].name + '/' + ((y < 10) ? '00' + y : '0' + y) + '.'+dataReq.datas.setCard[i].type;
				card.name = dataReq.datas.setCard[i].name+"_"+y;
		        listCard[listCard.length] = card;
		    }
		}
		StartGame.listCard = shuffle(listCard);
		//data.listCard = StartGame.listCard.slice(0);		
		
		StartGame.giveCardsForUsers();
		
		var data={"listCard":StartGame.currentUser.listCard, 'soltSet': StartGame.currentUser.listSoltSet};
		
		StartGame.createAction(StartGame.currentUser.name, "PUSH_CARD",data);
		//obj[collbackNameFunction]();
	}
	if(dataReq.action == "PUSH_CARD"){
		var listCard = [];
		
		StartGame.selectedCard=[];	
		StartGame.currentAssosiation = dataReq.datas.assosiation;
		
		var selectCard = StartGame.currentUser.listCard[dataReq.datas.selectCard];
		selectCard.main=true;
		selectCard.user=StartGame.currentUser.name;
		
		StartGame.currentUser.listCard.splice(dataReq.datas.selectCard, 1);
			
		StartGame.selectedCard[StartGame.selectedCard.length] = selectCard;
		
		for(var i=0; i<dataReq.datas.soltCards.length;i++){
			var selectCard = StartGame.currentUser.listSoltSet[i][dataReq.datas.soltCards[i]];
			
			StartGame.currentUser.listSoltSet[i].splice(dataReq.datas.soltCards[i], 1);
			
			StartGame.selectedCard[StartGame.selectedCard.length] = selectCard;
		}
		
		StartGame.indexMain = StartGame.currentUserInd;
		
		var isNext = StartGame.nextUser();
		
		if(isNext){
			 var data={"listCard":StartGame.currentUser.listCard, 'soltSet': StartGame.currentUser.listSoltSet, 'assosiation': StartGame.currentAssosiation};
			 StartGame.createAction(StartGame.currentUser.name, "PUSH_ASSOCIATE_CARD", data);
		}else{
			StartGame.createAction(StartGame.currentUser.name, "SHOW_ALL_CARD", this.getSelectedCard());
		}
	}
	if(dataReq.action == "PUSH_ASSOCIATE_CARD"){
		
		var listCard = [];
		
		var selectCard = StartGame.currentUser.listCard[dataReq.datas.selectCard];
		selectCard.main=false;
		selectCard.user=StartGame.currentUser.name;
		
		StartGame.currentUser.listCard.splice(dataReq.datas.selectCard, 1);
		
		StartGame.selectedCard[StartGame.selectedCard.length] = selectCard;
				
		var isNext = StartGame.nextUser();
		
		if(isNext){
			 var data={"listCard":StartGame.currentUser.listCard, 'soltSet': StartGame.currentUser.listSoltSet, 'assosiation': StartGame.currentAssosiation};
			 StartGame.createAction(StartGame.currentUser.name, "PUSH_ASSOCIATE_CARD", data);
		}else{
			StartGame.nextUser(); //перематываем ведущего			
			StartGame.createAction(StartGame.currentUser.name, "SHOW_ALL_CARD", this.getSelectedCard());
		}
	}
	if(dataReq.action == "USER_VOTE"){
		var data={};	
		var listCard = [];
				
		var selectCard = StartGame.selectedCard[dataReq.datas.selectCard];
		for (var i = 0; i < StartGame.selectedCard.length; i++) {
			if (StartGame.selectedCard[i].name == dataReq.datas.nameSelectCard) {
				selectCard = StartGame.selectedCard[i];
				break;
			}
		}
		
		if(selectCard.voteUser == null){
			selectCard.voteUser = [];
		}
		if(selectCard.user == StartGame.currentUser.name){
			//обманщик вызываем пока не исправится :)
			StartGame.createAction(StartGame.currentUser.name, "SHOW_ALL_CARD_AGAIN", this.getSelectedCard());
			return;
		}else{
			selectCard.voteUser[selectCard.voteUser.length] = StartGame.currentUser.name;
		}
						
		var isNext = StartGame.nextUser();
		
		if(isNext){			
		     StartGame.createAction(StartGame.currentUser.name, "SHOW_ALL_CARD", this.getSelectedCard());
		}else{			
		    StartGame.calculateResult();
			var el={"listCard":StartGame.selectedCard, 'assosiation': StartGame.currentAssosiation};
		    StartGame.createAction(StartGame.currentUser.name, "SHOW_ALL_VOTE", el);
			for(var i = 0; i < StartGame.listUsers.length; i++){
			   StartGame.createAction(StartGame.listUsers[i].name, "MOVE_USER");			   
			}					
		}
	}
	if(dataReq.action == "NEXT_TOUR"){
		//проверяем окончание игры
					
		var isNext = StartGame.nextUser();
		var win = false;
		for(var i = 0; i < StartGame.listUsers.length; i++){
			if(StartGame.listUsers[i].indexPosition>=39){
			   StartGame.createAction(StartGame.listUsers[i].name, "WIN");
			   win=true;
			}
		}	
		if (win) return;		
		StartGame.giveOneCardsForUsers();
		
		var data={"listCard":StartGame.currentUser.listCard, 'soltSet': StartGame.currentUser.listSoltSet, 'assosiation': StartGame.currentAssosiation};
			 
		StartGame.createAction(StartGame.currentUser.name, "PUSH_CARD", data);
	}
}

var StartGame = {
    skeepneed: true,
	listUsers:[],
	listAction:[],
	listCard:[],	
	selectedCard:[],
	countSolts : 1,
	giveCardsForUsers:function(){
		for(var i=0;i<this.listUsers.length;i++){
			for(var y=0;y<6;y++){
				if(this.listUsers[i].listCard == null){ 
					this.listUsers[i].listCard = [];
					this.listUsers[i].listSoltSet = [];
				}
				this.listUsers[i].listCard[this.listUsers[i].listCard.length] = this.listCard[this.listCard.length-1];
				this.listCard.splice(this.listCard.length-1, 1);
				this.addSoltSet(this.listUsers[i]);
			}
		}
	},
	addSoltSet(user){
		for(var z=0;z<this.countSolt;z++){
			var card=this.listCard[this.listCard.length-1];
			card.solt=true;
			if(user.listSoltSet[z]==null){
				user.listSoltSet[z] = [];
			}
			if(user.listSoltSet[z].length<7){
				user.listSoltSet[z][user.listSoltSet[z].length] = card;
				this.listCard.splice(this.listCard.length-1, 1);
			}
		}
	},
	calculateResult:function(){
		for(var i=0;i<this.selectedCard.length;i++){
			var card = this.selectedCard[i];
			if(card.solt){
				continue;
			}
                        var mainUser = this.listUsers[this.indexMain];
      			if(card.main){
				if(card.voteUser == null || card.voteUser.length == 0){
					mainUser.indexPosition = mainUser.indexPosition - 2;//ведущий на 2 хода назад
					if(mainUser.indexPosition<0){
						mainUser.indexPosition = 0;
					}					
				}else{					
					if(card.voteUser.length == this.listUsers.length - 1){
						mainUser.indexPosition = mainUser.indexPosition - 3;//ведущий на 3 хода назад	
						if(mainUser.indexPosition<0){
							mainUser.indexPosition = 0;
						}
						return;
					}else{
						mainUser.indexPosition = mainUser.indexPosition + card.voteUser.length + 3;
						for(var y = 0; y < card.voteUser.length;y++){
							var user = this.getUserByName(card.voteUser[y]);
							user.indexPosition += 3;
						}
					}						
				}				
			}else{				
			   if(card.voteUser!=null){
					var user = this.getUserByName(card.user);
					user.indexPosition += card.voteUser.length;	
			   }				
			}
                     
		}
	},
	getUserByName:function(name){
		for(var i=0;i<this.listUsers.length; i++){
			if(this.listUsers[i].name == name){
				return this.listUsers[i];
			}
		}
		return null;
	},
	giveOneCardsForUsers:function(){
		for(var i=0;i<this.listUsers.length;i++){
			for(var y=0;y<1;y++){
				if(this.listUsers[i].listCard == null){ 
					this.listUsers[i].listCard = [];
				}
				this.listUsers[i].listCard[this.listUsers[i].listCard.length] = this.listCard[this.listCard.length-1];
				this.listCard.splice(this.listCard.length-1, 1);
				this.addSoltSet(this.listUsers[i]);
			}
		}
	},
    showStartWindow: function (obj, collbackNameFunction) {
        this.addOnePlayer();
		this.addOnePlayer();
        if (this.skipNeed())
            return;
        var thisEl = this;
        $(document).on('click', '#minusPlayer', function () {
            thisEl.removeOnePlayer()
        });
        $(document).on('click', '#plusPlayer', function () {
            thisEl.addOnePlayer()
        });
		$(document).on('click', '#minusSolt', function () {
            thisEl.removeSolt()
        });
        $(document).on('click', '#plusSolt', function () {
            thisEl.addSolt()
        });
        $(document).on('click', '#buttonStart', function () {
            thisEl.startGame(obj, collbackNameFunction);
        });
        $(document).on('change', '#passSwitch', function () {
            if (this.checked) {
                $('.passPanel').show();
            } else {
                $('.passPanel').hide();
            }
        });
        $('.playerField').show();
    },		
    nextUser() {
        this.currentUserInd += 1;
        if (this.currentUserInd >= this.maxCountUser) {
            this.currentUserInd = 0;
        }
		
        this.currentUser = this.listUsers[this.currentUserInd];
		return !(this.indexMain == this.currentUserInd);
    },
    skipNeed: function () {
        if (this.skeepneed) {
            var listPlayerEl = $(".namePlayer");
            for (var i = 0; i < listPlayerEl.length; i++) {
                $(listPlayerEl[i]).val("Player " + (i + 1));
            }
            //this.startGame();
        }
        this.skeepneed = false;
        return this.skeepneed;
    },
    addOnePlayer: function () {
        var el = $(".playerField");
        if (el.length == 7) {
            this.showError("We have maximum players!");
            return;
        }
		if(el.length>1){
			$("#countSolts").text(0);
			this.countSolt = 0;
		}
        var plF = $(el[0]).clone();
        plF.find(".numPlayer").text(el.length + 1);		
        $('#playerPanel').append(plF);
		
		plF.find(".namePlayer").val("Player " + ($(".namePlayer").length));
        $('#countPlayers').text(el.length + 1);
    },
	addSolt:function(){
		this.countSolt =  parseInt($("#countSolts").text());
        if (this.countSolt == 3) {
            this.showError("We have maximum solt!");
            return;
        }        
		this.countSolt++;
		$('#countSolts').text(this.countSolt);		
	},
	removeSolt:function(){
		var pl = $(".playerField");        
		this.countSolt = parseInt($("#countSolts").text());
        if (pl.length == 2 && this.countSolt == 1 || pl.length>2 && this.countSolt==0) {
            this.showError("We have minimum solt!");
            return;
        }
		this.countSolt--;
        $('#countSolts').text(this.countSolt);		
	},
    removeOnePlayer: function () {
        var el = $(".playerField");
        if (el.length == 3) {
            this.showError("We have minimum players!");
            return;
        }
		if(el.length == 3){
			if(this.countSolt<1){
				this.countSolt=1;
				$("#countSolts").text(this.countSolt);
			}
		}
        $(el[el.length - 1]).remove();
        $('#countPlayers').text(el.length - 1);
    },
    showError: function (text) {
        var err = $("<div>").text(text);
        $('#errorPlace').append(err);
        err.fadeOut(3000, function () {
            err.remove();
        });
    },
    startGame: function (obj, collbackNameFunction) {
        var data = {};
        var listUsers = [];
        var plF = $('.playerField');
        for (var i = 0; i < plF.length; i++) {
            listUsers[i] = {};
            listUsers[i].name = $(plF[i]).find('.namePlayer').val();
            listUsers[i].password = $(plF[i]).find('.passPlayer').val();
            listUsers[i].indexPosition = 0;
        }
        data.listUsers = shuffle(listUsers);
        this.listUsers = data.listUsers;
        this.currentUserInd = 0;
        this.currentUser = data.listUsers[0];
        this.maxCountUser = listUsers.length;
        data.room = {};
        data.room.maxCountUser = this.maxCountUser;
        $('#startWindow').hide();
        this.listUsers = data.listUsers;
		this.createAction(this.listUsers[0].name, "CHOISE_SET_CARD", ["Base", "Ariadna", "Himera", "Pandora"]);
		for(var i = 1; i<this.listUsers.length;i++){
			this.createAction(this.listUsers[i].name, "WAIT");			
		}
        obj[collbackNameFunction](data);
    },
	createAction(userName, actionName, infoAction){
		var action = {};
		action.user=userName;
        action.action = actionName;
        action.infoAction = infoAction;
        action.dateAction=new Date();
		this.listAction[this.listAction.length]=action;
		return action;
	},
    getAllUser() {
        var listPlayerEl = $(".namePlayer");

        var users = [];
        for (var i = 0; i < listPlayerEl.length; i++) {
            var user = {};
            user.name = $(listPlayerEl[i]).val();
            user.pass = $(listPlayerEl[i]).parent().find(".passPlayer").val();
            user.id = i + 1;
            users[i] = user;
        }
        return users;
    }
}

var GameImaginarium = Class.create();
GameImaginarium.prototype = {
    sizeEl: {},
    gamers: [],
    listCell: [],
    room: {},
    step: 0,
    lang: langRu,
    infoGame: '',
    poleGame: $('#poleGame'),
    buttons: [],
    timeLoad: 2000,
    currentUser: null,
    online: true,
    dataGameLoader: null,
	rootPath:"",
	currentUserApprove : false,
	cardPosition : [{},{"left":"33%"},{"left":"66%"},{"top":"37%"},{"top":"37%","left":"33%"},{"top":"37%","left":"66%"}],
	setCard : null,
    initialize: function (lang, online) {		
        this.sizeEl.pageS = getPageSize();
		this.sizeEl.sizeGamePlace = getMaxSizeInnerBlockInProportion(567, 794, this.sizeEl.pageS[2], this.sizeEl.pageS[3]);
        this.sizeEl.sizeCell = this.calculateSizeCell();        
        if (lang) {
            this.lang = lang;
        }
        this.online = online;
        if (online) {
            this.dataGameLoader = new DataGameLoader();
        } else {
            this.dataGameLoader = new DataGameNoLoad();
        }
        this.dataGameLoader.loadDataGame(this, "loadPlace");
        this.dataGameLoader.loadUser(this, "synhroGame");       
    },
    migEl: null,
    setMigEl: function (el) {
        var t = this.migEl;
        this.migEl = el;
        if (t != null) {
            t.fadeIn('slow');
        }
    },
	calculateSizeCell: function (){
		var sizeCell = {};		
		sizeCell.w = Math.floor(this.sizeEl.sizeGamePlace[0] / 5);
		sizeCell.h = Math.ceil(sizeCell.w/2);
		return sizeCell;
	},
    blink: function () {
        var thisEl = this;
        $(this.migEl).fadeOut('slow', function () {
            $(this).fadeIn('slow', function () {
                thisEl.blink(this);
            });
        });
    },
    startloadgamedata: function () {
        var thisEl = this;
       
        setInterval(function () {
            thisEl.dataGameLoader.loadgamedata(thisEl, "loadgamedata");
        }, thisEl.timeLoad);
    },
    loadgamedata: function (data) {
        var thisEl = this;
        if (data != null) {
            if (this.keyLoad != 0) {
                if (thisEl.gamers.length != thisEl.room.maxCountUser) {
                    if (data.listAction.length > 0) {
                        var t = false;
                        for (var i = 0; i < data.listAction.length; i++) {
                            if (data.listAction[i].action == "START_GAME") {
                                t = true;
                                break;
                            }
                        }
                        if (t) {
                            thisEl.dataGameLoader.loadUser(thisEl, "getStartGamers");
                        }
                    }
                } else {}
                
                thisEl.currentUser = data.userRoom;
                
                thisEl.showButton(data);
				if(data.listAction.length>0 && !thisEl.online && !thisEl.currentUserApprove){
					thisEl.showTransfer(data);
					return;
				}
                for (var i = 0; i < data.listAction.length; i++) {
                    var gamerA = thisEl.getUserByName(data.listAction[i].user);
                    // thisEl.loginfo(data.listAction[i].infoAction+" "+data.listAction[i].user.name);
                    if (gamerA != null) {
                        gamerA.user = thisEl.getUserByNameL(data.listAction[i].user, data.listUser);
                        gamerA.updateVid();
                        thisEl.loginfo(gamerA.user.name + ' - ' + data.listAction[i].action + '(' + data.listAction[i].infoAction + ')');
                        if (data.listAction[i].action == "CHOISE_SET_CARD") {
                            thisEl.choiseSetCard(data.listAction[i].infoAction); //list set card
                        }
                        if (data.listAction[i].action == "THROW_CUBE") {
                            thisEl.throw_cubeObr(data.listAction[i].infoAction, gamerA.fishka);
                        }
                        if (data.listAction[i].action == "PUSH_CARD") {
							thisEl.soltCards=[];
							playAudio("sounds/selectcard.mp3");
							thisEl.showCard(data.listAction[i].infoAction.listCard);
							thisEl.soltSet = data.listAction[i].infoAction.soltSet;
							$('.entAss').show();
                        }
                        if (data.listAction[i].action == "PUSH_ASSOCIATE_CARD") {

                            thisEl.showCard(data.listAction[i].infoAction.listCard);
							$('.choseAss').show();
							$('.placeAssotiation').text(data.listAction[i].infoAction.assosiation);
                        }
                        if (data.listAction[i].action == "SHOW_ALL_CARD") {
                            thisEl.showCard(data.listAction[i].infoAction);							
							$('.choseMainCard').show();							
							$('.placeAssotiation').text(data.listAction[i].infoAction.assosiation);
                        }
						if (data.listAction[i].action == "SHOW_ALL_CARD_AGAIN") {
                            playAudio("sounds/yourcard.mp3");
                            thisEl.showCard(data.listAction[i].infoAction);							
							$('.choseMainCard').show();
							$('.placeAssotiation').text(data.listAction[i].infoAction.assosiation);
                        }                        
                        if (data.listAction[i].action == "SHOW_ALL_VOTE") {
							//show cards and switch to user 
							//list card with  namevotedusers
							this.showAllVote(data.listAction[i].infoAction);
						}						
                        if (data.listAction[i].action == "WIN") {
                            $('#win').show();
                            $('.winBlock label').text($('.winBlock label').text()+" "+"Поздравляю игрок "+gamerA.user.name+" выиграл!!!");
							
                        }

                    }
                }
            }
        }
    },
	showAllVote: function (data) {		
		this.selInd = null;
		$('.voteBlock').show();
		$('.placeAssotiation').text(data.assosiation);
		$('#selectCard').show();
		$('.voteUser').empty();	    
		$('#selectCard .card a').hide();
		var elR = $('#selectCard .cardPlace');
		var cardel = $('#selectCard .card1');
		cardel.removeClass("card1");
		elR.empty();
		for(var i = 0; i < data.listCard.length; i++){
			var elForCard = cardel.clone();
			elForCard.css(this.cardPosition[i]);
			elForCard.addClass("card"+(i+1));
			elR.append(elForCard)
			$(elForCard).find('img').attr("src" , this.rootPath+"/"+data.listCard[i].src);
			$(elForCard).find('.voteUser').show();
			if(data.listCard[i].main){
				$(elForCard).find('.voteUser').append('<div style="font-weight:bold;">Карта ведущего</div>');
			}
			if(data.listCard[i].voteUser!=null){
				for(var y=0;y<data.listCard[i].voteUser.length;y++){
					$(elForCard).find('.voteUser').append('<div>'+data.listCard[i].voteUser[y]+'</div>');
				}
			}
		}
	},
	showCard: function (data) {		
		this.selInd = null;
		this.setCardSelect = data;
		$('#selectCard').show();
	    var elR = $('#selectCard .cardPlace');
		var cardel = $('#selectCard .card1');
		cardel.removeClass("card1");
		elR.empty();
		$('#selectCard .card a').hide();		
		for(var i = 0; i < data.length; i++){
			var elForCard = cardel.clone();
			elForCard.css(this.cardPosition[i]);
			elForCard.addClass("card"+(i+1));
			elR.append(elForCard)
			$(elForCard).find('img').attr("src" , this.rootPath+"/"+data[i].src);
			$(elForCard).find('a').show();
		}
	},
	showCardForSolt:function () {
        data = this.soltSet[this.soltCards.length];
		$('#selectCard').show();	    
		var elR = $('#selectCard .cardPlace');
		var cardel = $('#selectCard .card1');
		cardel.removeClass("card1");
		elR.empty();
		$('#selectCard .card a').hide();
		for(var i = 0; i < data.length; i++){
			var elForCard = cardel.clone();
			elForCard.css(this.cardPosition[i]);
			elForCard.addClass("card"+(i+1));
			elR.append(elForCard)
			$(elForCard).find('img').attr("src" , this.rootPath+"/"+data[i].src);
			$(elForCard).find('a').show();
		}
	},
	showTransfer: function (data) {		
		$('#transferDevice').show();
		$('.namePlayerTransfer').text(this.currentUser.name);
		$('#nameGamer').text(this.currentUser.name);
		this.currentdata = data;		
	},
    choiseSetCard: function (data) {
        $('#selectSetCard').show();
    },
    loadPlace: function (data) {
        var thisEl = this;
        if (data != null) {
			this.rootPath = data.rootPath;			
            thisEl.buildPlace(data);
        }
    },
    buildPlace: function (data) {
		var thisEl = this;
        $('body').css('background', 'black');
        var gC = 1;
		
		var size = this.sizeEl.sizeGamePlace;

        var topline = $('<div>');
        this.poleGame = $('#poleGame');
        this.poleGame.css('width', (size[0] - 2) + 'px');
		var fontSize = Math.ceil(this.sizeEl.sizeGamePlace[0] / 25) + 'px';
        $('#poleGame').css("font-size", fontSize);
		
		$('input').css("font-size", fontSize);		

        var centerLine = $('<div style="display: inline; clear: left;">');
        centerLine.append('<div id="centerPl" class="centerPlace" style="position:relative;width:' + (size[0] - 2) + 'px;height:' + (size[1] - 2) + 'px;display: inline; float: left;"><img src="' + data.pole.src + '" width="' + (size[0] - 2) + 'px" height="' + (size[1] - 2) + 'px"/></div>');
        this.choiseSetCardPanel = $('<div id="choiseSetCardPanel" class="centerPlace" style="position:absolute;z-index:10;width:' + (size[0] - 2) + 'px;height:' + (size[1] - 2) + 'px; float: left; background : black"></div>').hide();
        this.choiseSetCardPanel.build = false;

        $('#startWindow').css("width", "" + (size[0] - 2) + "px");
        $('#startWindow').css("height", "" + (size[1] - 2) + "px");
		
		//$('#poleHelp').css("width", "" + (size[0] - 2) + "px");
        // $('#poleHelp').css("height", "" + (size[1] - 2) + "px");
        
		$('#selectSetCard').css("width", "" + (size[0] - 2) + "px");
        $('#selectSetCard').css("height", "" + (size[1] - 2) + "px");
        
		$('#transferDevice').css("width", "" + (size[0] - 2) + "px");
        $('#transferDevice').css("height", "" + (size[1] - 2) + "px");

        $('#poleCell').css("width", "" + (size[0] - 2) + "px");
        $('#poleCell').css("height", "" + (size[1] - 2) + "px");
		
        $('#selectCard').css("width", "" + (size[0] - 2) + "px");
        $('#selectCard').css("height", "" + (size[1] - 2) + "px"); 
		
		$('#infoGame').css("width", "" + (size[0] - 2) + "px");
        $('#infoGame').css("height", "" + (size[1] - 2) + "px");
		
		$('#win').css("width", "" + (size[0] - 2) + "px");
        $('#win').css("height", "" + (size[1] - 2) + "px");
		
		this.sizeEl.pageS[4] = Math.floor(size[0] / 3);
		this.sizeEl.pageS[5] = Math.floor(this.sizeEl.pageS[4] * 1.5);

		$('#selectCard .card img').css("width", "" + (Math.floor(size[0] / 3)) + "px");
		/**$('#selectCard').on("mouseenter",".card img", function (ev) {
		   $(ev.currentTarget).css("border","2px solid gray");
		})
		.on("mouseleave",".card img", function (ev) {
		     $(ev.currentTarget).css("border","");
		});*/
		
		$('#selectCard').on("click", ".selectCardB", function (ev) {
			var sizeEl = Math.floor(size[0] - size[0]*0.3);
			thisEl.resizeCard($(ev.currentTarget).parent().parent(),$(ev.currentTarget).parent().parent().find('img'), sizeEl);
			$('#readyassosiation').show();
			$('#readysam').show();
			$('#playercard').show();
			$('#readyVoteButton').show();			
		    thisEl.selIndT = $('.selectCardB').toArray().indexOf($(ev.currentTarget)[0]);			
		});
		$('#selectCard').on("click", ".card img", function (ev) {			
			var sizeEl = Math.floor(size[0] - size[0]*0.06);			
			thisEl.resizeCard($(ev.currentTarget).parent(),ev.currentTarget, sizeEl);		    
		});
		
        var setC = $('#setCardPanel').find('.setCard');  
        thisEl.setCard = data.setCard;
        for (var i = 0; i < data.setCard.length; i++) {
			var sclone = setC
			if(i != 0){
              sclone = setC.clone();
			  sclone.find('input').prop('checked', false);
			}
			sclone.find('input').val(i);
            sclone.find('label').text(data.setCard[i].name);            
            $('#setCardPanel').append(sclone);
        }
		
		$('#TransferComplete').on('click', function(){
			if(thisEl.currentUser.pass==null || thisEl.currentUser.pass==$('.passTransfer').val()){
				$('#transferDevice').hide();
				thisEl.currentUserApprove = true;
				thisEl.loadgamedata(thisEl.currentdata);
			}
		});
		
		$('#readyassosiation').on('click', function(){
			if(thisEl.selInd == null){
				thisEl.selInd = thisEl.selIndT;									
			}else{
				thisEl.soltCards[thisEl.soltCards.length] = thisEl.selIndT;				
			}		
			thisEl.selIndT = null;					
			if(thisEl.soltSet.length != thisEl.soltCards.length){				
				thisEl.resizeCard($('#selectCard .card.big')[0],$('#selectCard .card.big img')[0], 0);
				$('.cardimg').attr("src", thisEl.rootPath + "emptycard.jpg");
				thisEl.showCardForSolt();	
				
			}else{
				thisEl.actionsUser("PUSH_CARD", "PUSH_CARD".toLowerCase() + "Obr");
				$('.cardimg').attr("src", thisEl.rootPath + "emptycard.jpg");
				$('#selectCard').hide();
			}			
		});
		
		$('#readysam').on('click', function(){
			thisEl.selInd = thisEl.selIndT;
			thisEl.selIndT = null;
			thisEl.actionsUser("PUSH_ASSOCIATE_CARD", "PUSH_ASSOCIATE_CARD".toLowerCase() + "Obr");
			$('#selectCard').hide();
			$('.cardimg').attr("src",thisEl.rootPath + "emptycard.jpg");
		});
		
		$('#playercard').on('click', function(){
			thisEl.selInd = thisEl.selIndT;
			thisEl.selIndT = null;
			thisEl.actionsUser("USER_VOTE", "USER_VOTE".toLowerCase() + "Obr");
			$('#selectCard').hide();
			$('.cardimg').attr("src",thisEl.rootPath + "emptycard.jpg");
		});
		
		$(document).on('click', '#buttonCloseInfo', function () {
			$('#infoGame').hide();
		});
		
		$(document).on('click', '#poleForSign', function () {
			if($('#infoGame').is(':visible')){
				$('#infoGame').hide();
			}else{
				$('#infoGame').show();
			}
		});
		
		$(document).on('click', '#buttonStartSelCard', function () {
			thisEl.selInd = thisEl.selIndT;
			thisEl.selIndT = null;
			thisEl.actionsUser("CHOISE_SET_CARD", "CHOISE_SET_CARD".toLowerCase() + "Obr");
			$('#selectSetCard').hide();
        });
		
		$('.voteUser').hide();
		$(document).on('click','#winBut',function(){$('#win').hide();});
		$(document).on('click', '#readyVoteButton', function () {		
			thisEl.selInd = thisEl.selIndT;
			thisEl.selIndT = null;		
			$('#selectCard').hide();
			thisEl.callbackAfterMove = "afterreadyVoteButton";
			thisEl.moveUser();
			//for(var i =0; i<thisEl.gamers.length;i++){
				
			//	thisEl.go_sellObr(thisEl.gamers[i].user,thisEl.gamers[i].fishka);
			//}
        });
		
		$(document).on('click', 'a.button9', function(){playAudio("sounds/click.mp3");});
		$(document).on('click', '#showgame', function(){$('#selectCard').hide();$("#poleForButClose").show();});
		$(document).on('click', '#buttonShowSelectCard', function(){$('#selectCard').show();$("#poleForButClose").hide();});

        this.poleGame.append($('<div id="place" style="float:left;">').append(centerLine)).append(this.choiseSetCardPanel);
        $('#waitGwin').hide();

        this.buildCell();
		this.buildInfoSign();
    },
	buildInfoSign:function(){
		var h = this.sizeEl.sizeGamePlace[1] - 2;
        var w = this.sizeEl.sizeGamePlace[0] - 2;
		$("#rule").css("height",h - Math.round(h*0.4));
		var vidhelpButton = $('<div style="position:absolute;text-aligne:center; z-index:100000;">').css('height', Math.round(h / 15) + 'px').css('width', Math.round(w / 7) + 'px').css('left', w - Math.round(w / 5)).css('top', "10px");
        var helpButton = $('<a href="#" id="poleForSign" class="button9">?</a>');
        vidhelpButton.append(helpButton);
		$('#poleHelp').append(vidhelpButton);		
		
		var vidgoToCardButton = $('<div id = "poleForButClose" style="display:none; position:absolute;text-aligne:center; z-index:501;">').css('float', 'left').css('height', Math.round(h / 15) + 'px').css('width', Math.round(w / 3) + 'px').css('left', Math.round(w / 3.8)).css('top', h-Math.round(h / 9.5));
        var goToCardButton = $('<div style="display:inline-block;vertical-align: middle; color:white;"><a href="#" id="buttonShowSelectCard" class="button9">Show card</a></div>');
        vidgoToCardButton.append(goToCardButton);
		$('#poleCell').append(vidgoToCardButton);
	},	
	afterreadyVoteButton:function(){
		this.actionsUser("NEXT_TOUR", "NEXT_TOUR".toLowerCase() + "Obr");
		playAudio("sounds/nexttour.mp3");
	},
	resizeCard: function (el, elImg, sizeEl) {
	    var thisEl = this;
		
		if(thisEl.datec != null && thisEl.datec+1000 > new Date().getTime()){
			return; //double click
		} 
		thisEl.datec = new Date().getTime();
	    if ($(el).hasClass("big")) {
			$('.selectCardB').show();
			$('#readyassosiation').hide();
			$('#readysam').hide();
			$('#choseMainCard').hide();
			
	        $(el).removeClass("big");

	        $(el).animate({
	            "left": thisEl.posC.l,
	            "top": thisEl.posC.t
	        });
			
	        $(elImg).animate({
	            "width": thisEl.sizeEl.pageS[4] + "px"
	        }, "slow");
			if(sizeEl == 0){
				$(el).css('left',thisEl.posC.l);
				$(el).css('top',thisEl.posC.t);
				$(elImg).css("width",thisEl.sizeEl.pageS[4] + "px");
			}			
	        $(el).css({
	            "width": ""
	        });
	        $(el).animate({
	            "z-index": "1005"
	        });
	    } else {
	        $(el).addClass("big");
			$('.selectCardB').hide();
	        thisEl.posC = {};
	        $(el).css("z-index", "1050");
	        thisEl.posC.t = $(el).css("top");
	        thisEl.posC.l = $(el).css("left");
	        $(el).animate({
	            "left": "0px",
	            "top": "0px"
	        });
	        $(elImg).animate({
	            "width": sizeEl + "px",
	        }, "slow");
	        $(el).animate({
	            "width": "100%"
	        },150);
	    }
	},
    getSizePl: function (countCard) {
        var cCardInW = (countCard - 4) / 4 + 2;
        var cCardInH = cCardInW;
        var razmP = this.sizeEl.pageS[2];
        if (this.sizeEl.pageS[2] > this.sizeEl.pageS[3]) {
            razmP = this.sizeEl.pageS[3];
        }
        var shMc = Math.floor(razmP / (cCardInW + 1.2));
        var shBc = Math.floor(shMc + shMc * 0.6);
        razmP = shMc * (cCardInW - 2) + 2 * shBc;
        var shCPl = shMc * (cCardInW - 2);
        this.actSize = {
            cCardInW: cCardInW,
            cCardInH: cCardInH,
            razmP: razmP,
            shMc: shMc,
            shBc: shBc,
            shCPl: shCPl,
            fontsize: Math.ceil(this.sizeEl.sizeGamePlace[0] / 25)
        };
        return this.actSize;
    },

    loginfo: function (text) {
       // this.infoGame.prepend('<hr style="color:orange; width:60px;"/>');
       // this.infoGame.prepend('<div>' + text + '</div>');
    },
    getUserByName: function (name) {
        for (var y = 0; y < this.gamers.length; y++) {
            if (this.gamers[y].user.name == name) {
                return this.gamers[y];
            }
        }
    },
	getUserByNameL:function(name, listUser){
        for(var y=0;y<listUser.length;y++){
            if(listUser[y].name==name){
                return listUser[y];
            }
        }
        return null;
    },
    showHidebut: function (pos, but) {
        if (pos) {
            but.removeAttr('disabled').css('font-weight', 'bold');
        } else {
            but.attr('disabled', 'disabled').css('font-weight', 'normal');
        }
    },
    hideAllBut: function () {
		$('.entAss').hide();
		$('.choseAss').hide();
		$('.choseMainCard').hide();
		$('.voteBlock').hide();
		$('.voteUser').hide();
		$('#selectCard').hide();
		$('#readyButton').hide();
        for (var b in this.buttons) {
            this.buttons[b].attr('disabled', 'disabled').css('font-weight', 'normal');
        }
    },
    showButton: function (data) {
        for (var b in this.buttons) {
            var show = false;
            for (var i = 0; i < data.availAction.length; i++) {
                if (b == data.availAction[i]) {
                    if (b == 'AUCTION_BUY' || b == 'AUCTION_FOLD') {
                        this.panelAuction.show();
                    }
                    show = true;
                    break;
                }
            }
            this.showHidebut(show, this.buttons[b]);
        }
        if (data.availAction.length > 1) {
            this.timeLoad = 2000;
        } else {
            this.timeLoad = 2000;
        }
    },
    synhroGame: function (data) {
        if (data != null) {
            if (data.room != null) {
                this.room.maxCountUser = data.room.maxCountUser;
            }
            var users = data.listUsers;
            for (var i = 0; i < users.length; i++) {
                var gamer = this.getUserByName(users[i].name);
                if (gamer == null) {
                    var num = this.gamers.length;
                    this.gamers[num] = new Gamer(users[i], this, num + 1);
                    gamer = this.gamers[num];
                }
                if (gamer.user.indexPosition == null) {
                    gamer.user.indexPosition = 0;
                }
                this.listCell[gamer.user.indexPosition].goOn(gamer);
            }
        }
		this.startloadgamedata();
    },
    buildCell: function () {
        for (var ind = 0; ind < 39; ind++) {
            this.listCell[ind] = new Cell(this, ind);
            $('#poleCell').append(this.listCell[ind].vid);
        }

    },
    createBut: function (butName) {
        this.buttons['' + butName] = this._createBut(butName);
    },
    _createBut: function (butName) {
        var thisEl = this;
        return $('<button style="vertical-align: top;font-size:' + this.actSize.fontsize + 'px;width:' + (Math.round(this.actSize.shCPl / 4) - 2) + 'px;height:' + Math.round((this.actSize.shCPl / 3) / 4) + 'px;" value="' + this.lang[butName] + '">' + this.lang[butName] + '</button>').click(function () {
            thisEl.actionsUser(butName, butName.toLowerCase() + "Obr");
        });
    },    
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    actionsUser: function (action, functObr) {
		var dataReq = {};
		
        var thisEl = this;
        dataReq.datas = null;
        dataReq.typeReq = "GET";
        dataReq.datat = "json";
		dataReq.action = action;
        this.numError = 0;
		
		if (action == "CHOISE_SET_CARD"){			
		    var arr = $('.inputSetCard:checked').toArray().map(item => item.value);
			var arrR = [];
			for(var i=0; i<arr.length ;i++){
				arrR[i] = this.setCard[arr[i]];
			}
			dataReq.datas = {'setCard': arrR};
		}
		if (action == "PUSH_CARD"){			
			dataReq.datas = {'selectCard' : thisEl.selInd, 'assosiation': $('#assosiationInp').val(),'soltCards':thisEl.soltCards};
			$('#assosiationInp').val("");
			this.resizeCard($('#selectCard .card.big')[0],$('#selectCard .card.big img')[0], 0);			
			this.currentUserApprove = false;
		}
		if (action == "PUSH_ASSOCIATE_CARD")
		{			
			dataReq.datas = {'selectCard' : thisEl.selInd};			
			this.resizeCard($('#selectCard .card.big')[0],$('#selectCard .card.big img')[0], 0);			
			this.currentUserApprove = false;
		}
		
		if (action == "USER_VOTE")
		{			
			dataReq.datas = {'nameSelectCard' : thisEl.setCardSelect[thisEl.selInd].name};			
			this.resizeCard($('#selectCard .card.big')[0],$('#selectCard .card.big img')[0], 0);			
			this.currentUserApprove = false;
		}
		
		if (action == "NEXT_TOUR")
		{							
			this.resizeCard($('#selectCard .card.big')[0],$('#selectCard .card.big img')[0], 0);
			this.currentUserApprove = false;
		}
     
		if (action == 'SEND_MESSAGE') {
            dataReq.datas = {
                'message': this.messageField.val()
            };
            this.messageField.val("");
            dataReq.typeReq = "POST";
        }
		 
		 if (action == 'GAME_END') {
            this.buttons['GAME_CLOSE'].show();
            //this.butGE.hide();
        }
        this.hideAllBut();
        this.keyLoad = 1;
       
		this.dataGameLoader.actions(this, "actionCallBack", dataReq);
    },
	actionCallBack:function(data){
		this.keyLoad = 2000;
		this.loadgamedata();
		if (data.action == 'GAME_END') {
		    this.buttons['GAME_CLOSE'].removeAttr('disabled').css('font-weight', 'bold');
		}
		
	},
	moveUser:function(){
		this.moveGamers=[];
		for(var i=0;i<this.gamers.length;i++){
			if(this.gamers[i].user.indexPosition - this.gamers[i].fishka.posit!=0){
				this.moveGamers[this.moveGamers.length] = this.gamers[i];
			}
		}
		this._moveUser();
    },
	_moveUser:function(){
		if(this.moveGamers.length > 0){
			var us=this.moveGamers[this.moveGamers.length-1];
			this.go_sellObr(us.user,us.fishka);
			this.moveGamers.splice(this.moveGamers.length-1,1);
		}else{
			this[this.callbackAfterMove]();
		}
	},
	go_sellObr:function(user,fishka){
        var step=user.indexPosition - fishka.posit;
        fishka.posit = user.indexPosition;
		var maxCountStep = 39;
        if(fishka.posit > maxCountStep){
            fishka.posit = maxCountStep;
        }
		var forward=step>0;
        this.setFishkaI(fishka,Math.abs(step),forward);
    },
    setFishkaI: function (fishka, step, forward) {        
        var ind = (forward)?fishka.posit - step:fishka.posit+step;        
        this.listCell[ind].goOnFishka(fishka);
		playAudio("sounds/step.mp3");
        if (step != 0) {
            var thisEl = this;
            setTimeout(function () {
                thisEl.setFishkaI(fishka, step - 1, forward)
				
            }, 500);
        }else{
			this._moveUser();
		}
    },
    win: function (ind) {
        var thisEl = this;
        if (!ind) {
            ind = 0;
            this.panelWin = $('<div style="background:black;position:absolute;z-index:40;top:0;left:0;width:' + this.actSize.shCPl + 'px;height:' + (this.actSize.shCPl - 2) + 'px; text-align:center;"></div>');
            $('#systContr').append(this.panelWin);
            this.imgWin = $('<img style="" src="' + this.imgName + 'win/' + 1 + '.gif" width="' + Math.round(this.actSize.shCPl / 2) + 'px" height="' + Math.round((this.actSize.shCPl - 2) / 2) + 'px"/>');
            this.panelWin.append($('<div style="display: inline-block; vertical-align: middle; color: WHITE; padding: 60px;color:white; font-weight: bold;"></div>')
                .append('<div>' + this.lang['YOURS_WIN'] + '</div>').append(this.imgWin).append($('<div>' + this.lang['GAME_CLOSE'] + '</div>')
                    .click(function () {
                        document.location.href = predictURL + "/games/monopoly/actions/game_close";
                    })))
            .append('<div style="vertical-align: middle;display:inline-block;height:100%;"></div>');
        }
        this.imgWin.attr('src', this.imgName + 'win/' + this.getRandomInt(1, 3) + '.gif');
        ind += 1;
        setTimeout(function () {
            thisEl.win(ind)
        }, 2000);
    }
};

function arrToString(namePr, arrm) {
    var res = "";
    for (var i = 0; i < arrm.length; i++) {
        res += namePr
    }
    return
}

class Util{
  static getRandom(min,max){
       return min + Math.floor((max - min) * Math.random());
  }
  static addUnicAll(mainArr, additArr){
       //Array.prototype.push.apply(mainArr, additArr);
       for(const ell of additArr){
          if(!this.isElementInArray(mainArr, ell)){
             mainArr[mainArr.length] = ell;
          }
       }
  }
  static isElementInArray( arr, element){
       for(const ell of arr){
         if(JSON.stringify(ell) === JSON.stringify(element)){
            return true;
         }
       }
       return false;
  }
  static clear(arr){
      arr.splice(0, arr.length);
  }
  static removeElementFromArray(arr,element){
     arr.splice(arr.indexOff(element), 1);
  }
}

function playAudio(src){
		var myAudio = new Audio;
		myAudio.src = src;
		myAudio.play();
}

$(document).ready(function () {
    new GameImaginarium(langRu, false);
});