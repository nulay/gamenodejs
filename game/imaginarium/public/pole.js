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

function getMaxSizeInnerBlock(widthInner, heightInner, elWidth, elHeight) {
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
    colorF: ["red", "darkblue", "yellow", "lightblue"],
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
        var r = Math.round(this.size[0] / this.countUser);
        this.vid = $('<div style="border-radius:' + r + 'px;display:inline;margin:auto;text-align:center;width:' + r + 'px;height:' + r + 'px; background-color: ' + this.colorF[this.numF - 1] + ';border: 3px solid white;"><span style="color:' + this.colorText[this.numF - 1] + 'font-weight:bold;font-size:' + 10 + 'pt;">' + this.numF + '</span></div>')
        this.vid.hide().show();
    }
}

var Gamer = Class.create();
Gamer.prototype = {
    initialize: function (user, game, num) {
        this.user = user;
        this.fishka = new Fishka(num, user.indexPosition, user.name, game.pageS, game.room.maxCountUser);
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
        this.h = this.gameM.pageS[1] - 2;
        this.w = this.gameM.pageS[0] - 2;
        this.vid = $('<div style="position:absolute;text-aligne:center;">').css('float', 'left').css('height', Math.round(this.h / 15) + 'px').css('width', Math.round(this.w / 7) + 'px').css('left', this.procentPosition[this.ind][1] + '%').css('top', this.procentPosition[this.ind][0] + '%');
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
    data.cardset = ["Base", "Ariadna", "Himera", "Pandora"];
    data.pole.src = rootPath + "pole.jpg";
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
DataGameNoLoad.prototype.actions = function (obj, collbackNameFunction, dataReq) {
    if(dataReq.datat.action = "CHOISE_SET_CARD"){	
        var data={};	
		var listCard = [];
		for (var i = 0; i < dataReq.datas.setCard.length; i++) {
		    for (var y = 0; y < 96; y++) {
		        var card = {};
		        card.src = dataReq.datas.setCard[i] + '/' + ((y < 10) ? '00' + y : '0' + y) + '.jpg';
		        listCard[listCard.length] = card;
		    }
		}
		StartGame.listCard = shuffle(listCard);
		data.listCard = StartGame.listCard.slice(0);		
		
		StartGame.giveCardsForUsers();
		
		this.createAction(StartGame.currentUser, "PUSH_CARD");
		//obj[collbackNameFunction]();
	}
}

var StartGame = {
    skeepneed: true,
	listUsers:[],
	listAction:[],
	listCard:[],
	giveCardsForUsers:function(){
		for(var i=0;i<this.listUsers.length;i++){
			for(var y=0;y<6;y++){
				if(this.listUsers[i].listCard == null){ 
					this.listUsers[i].listCard = [];
				}
				this.listUsers[i].listCard[this.listUsers[i].listCard.length] = this.listCard[this.listCard.length];
				this.listCard.splice(this.listCard.length-1, 1);
			}
		}
	},
    showStartWindow: function (obj, collbackNameFunction) {
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
        var plF = $(el[0]).clone();
        plF.find(".numPlayer").text(el.length + 1);
        $('#playerPanel').append(plF);
        $('#countPlayers').text(el.length + 1);
    },
    removeOnePlayer: function () {
        var el = $(".playerField");
        if (el.length == 2) {
            this.showError("We have minimum players!");
            return;
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
		this.listUsers[0].approve = false;
		for(var i = 1; i<this.listUsers.length;i++){
			this.createAction(this.listUsers[i].name, "WAIT");
			this.listUsers[i].approve = false;
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
    nextUser() {
        this.currentUserInd += 1;
        if (this.currentUserInd >= this.maxCountUser) {
            this.currentUserInd = 0;
        }
        this.currentUser = this.listUsers[this.currentUserInd];
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
    pageS: null,
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
    initialize: function (lang, online) {
        this.pageS = getPageSize();
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
    changeViewer: function (data) {},
    setMigEl: function (el) {
        var t = this.migEl;
        this.migEl = el;
        if (t != null) {
            t.fadeIn('slow');
        }
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
       
        setTimeout(function () {
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
                            thisEl.dataGameLoader.loadUser(this, "getStartGamers");
                        }
                    }
                } else {}
                if (thisEl.currentUser == null) {
                    thisEl.currentUser = data.userRoom;
                }
                thisEl.showButton(data);
				if(data.listAction.length>0 && !this.online && !thisEl.currentUser.approve){
					this.showTransfer(data);
					return;
				}
                for (var i = 0; i < data.listAction.length; i++) {
                    var gamerA = thisEl.getUserByName(data.listAction[i].user);
                    // thisEl.loginfo(data.listAction[i].infoAction+" "+data.listAction[i].user.name);
                    if (gamerA != null) {
                        gamerA.user = data.listAction[i].user;
                        gamerA.updateVid();
                        thisEl.loginfo(gamerA.user.name + ' - ' + data.listAction[i].action + '(' + data.listAction[i].infoAction + ')');
                        if (data.listAction[i].action == "CHOISE_SET_CARD") {
                            thisEl.choiseSetCard(data.listAction[i].infoAction); //list set card
                        }
					

                        if (data.listAction[i].action == "THROW_CUBE") {
                            thisEl.throw_cubeObr(data.listAction[i].infoAction, gamerA.fishka);
                        }
                        if (data.listAction[i].action == "PUSH_CARD") {
							thisEl.showCard();
                            //thisEl.addCard();
                            thisEl.setAssosiation(data.listAction[i].infoAction);
                        }
                        if (data.listAction[i].action == "PUSH_ASSOCIATE_CARD") {

                            thisEl.addCard();
                        }
                        if (data.listAction[i].action == "SHOW_ALL_CARD") {

                            thisEl.showCard(data.listAction[i].infoAction); //list ind + imgpath
                        }
                        if (data.listAction[i].action == "USER_VOTE") {

                            thisEl.userVote(data.listAction[i].infoAction); //nameUser
                        }
                        if (data.listAction[i].action == "SHOW_ALL_VOTE") {

                            thisEl.showVote(data.listAction[i].infoAction); //list card with  namevotedusers
                        }
                        if (data.listAction[i].action == "WAIT_ASSOSIATION") {

                            thisEl.vaitAssosiation(data.listAction[i].infoAction); //nameuser
                        }

                    }
                }
            }
        }

    },
	showTransfer: function (data) {		
		$('#transferDevice').show();
		$('.namePlayerTransfer').text(this.currentUser.name);
		this.currentdata = data;		
	},
    choiseSetCard: function (data) {
        $('#selectSetCard').show();
    },

    loadPlace: function (data) {
        var thisEl = this;
        if (data != null) {
            thisEl.buildPlace(data, getMaxSizeInnerBlock(567, 794, this.pageS[2], this.pageS[3]));

            //thisEl.buildSystemControl();
            // thisEl.getStartGamers();
            // thisEl.startloadgamedata();
        }
    },
    buildPlace: function (data, size) {
		var thisEl = this;
        $('body').css('background', 'black');
        var gC = 1;

        var topline = $('<div>');
        this.poleGame = $('#poleGame');
        this.poleGame.css('width', (size[0] - 2) + 'px');
        this.poleGame.css('font-size', 10 + 'pt');

        var centerLine = $('<div style="display: inline; clear: left;">');
        centerLine.append('<div id="centerPl" class="centerPlace" style="position:relative;width:' + (size[0] - 2) + 'px;height:' + (size[1] - 2) + 'px;display: inline; float: left;"><img src="' + data.pole.src + '" width="' + (size[0] - 2) + 'px" height="' + (size[1] - 2) + 'px"/></div>');

        //var fullPlace = $('<div id="fullPlace" class="centerPlace" style="position:relative;width:' + (size[0] - 2) + 'px;height:' + (size[1] - 2) + 'px;display: inline; float: left; background : black"></div>');

        //fullPlace.append(choiseSetCardPanel)

        this.choiseSetCardPanel = $('<div id="choiseSetCardPanel" class="centerPlace" style="position:absolute;z-index:10;width:' + (size[0] - 2) + 'px;height:' + (size[1] - 2) + 'px; float: left; background : black"></div>').hide();
        this.choiseSetCardPanel.build = false;

        $('#startWindow').css("width", "" + (size[0] - 2) + "px");
        $('#startWindow').css("height", "" + (size[1] - 2) + "px");
        
		$('#selectSetCard').css("width", "" + (size[0] - 2) + "px");
        $('#selectSetCard').css("height", "" + (size[1] - 2) + "px");
        
		$('#transferDevice').css("width", "" + (size[0] - 2) + "px");
        $('#transferDevice').css("height", "" + (size[1] - 2) + "px");

        $('#poleCell').css("width", "" + (size[0] - 2) + "px");
        $('#poleCell').css("height", "" + (size[1] - 2) + "px");

        var setC = $('#setCardPanel').find('.setCard');
        setC.find('label').text(data.cardset[0]);
        setC.find('input').val(data.cardset[0]);
        for (var i = 1; i < data.cardset.length; i++) {
            var sclone = setC.clone();
            sclone.find('label').text(data.cardset[i]);
            sclone.find('input').val(data.cardset[i]);
            $('#setCardPanel').append(sclone);
        }
		
		$('#TransferComplete').on('click', function(){
			if(thisEl.currentUser.pass==null || thisEl.currentUser.pass==$('.passTransfer').val()){
				$('#transferDevice').hide();
				thisEl.currentUser.approve = true;
				thisEl.loadgamedata(thisEl.currentdata);
			}
		});
		
		$(document).on('click', '#buttonStartSelCard', function () {
			  
			thisEl.actionsUser("CHOISE_SET_CARD", "CHOISE_SET_CARD".toLowerCase() + "Obr");
        });

        this.poleGame.append($('<div id="place" style="float:left;">').append(centerLine)).append(this.choiseSetCardPanel);
        $('#waitGwin').hide();

        this.buildCell();
    },
    getSizePl: function (countCard) {
        var cCardInW = (countCard - 4) / 4 + 2;
        var cCardInH = cCardInW;
        var razmP = this.pageS[2];
        if (this.pageS[2] > this.pageS[3]) {
            razmP = this.pageS[3];
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
            fontsize: Math.round(shMc / 8)
        };
        return this.actSize;
    },
    buildSystemControl: function () {
        var thisEl = this;
        this.createBut('THROW_CUBE');

        //this.createBut('GAME_END');
        this.createBut('GAME_CLOSE');
        this.buttons['GAME_CLOSE'].hide().click(function () {
            document.location.href = predictURL + "/";
        });

        this.butGE = this._createBut('GAME_END');

        var t = Math.round(this.actSize.shCPl / 4);
        this.infoGame = $('<div id="infoGame" style=";margin:3px 3px 0 3px;text-align:center; font-size:' + this.actSize.fontsize + 'pt;border:1px solid gray;width:' + Math.round(this.actSize.shCPl / 2 - 12) + 'px;height:' + ((t * 2) - 20 - this.actSize.fontsize * 2) + 'px;overflow: auto;color:white;">');

        this.userPanel = $('<div id="userPanel" style="float:left;display:inline-block;text-align:center;width:' + Math.round(this.actSize.shCPl / 2 - 2) + 'px;height:' + t * 2 + 'px;">');

        var topPanel = $('<div style="width:' + this.actSize.shCPl + 'px;height:' + (t * 2 - 2) + 'px;text-align:center;position:relative;">');
        var bottomPanel = $('<div style="background-color:black;opacity:0.85;font-size:' + this.actSize.fontsize + 'pt; color: white; width:' + this.actSize.shCPl + 'px; height: ' + (t * 2) + 'px;"></div>');
        this.messageField = $('<input type="text" style="font-size:' + this.actSize.fontsize + 'pt;color:white;background:black;margin:6px 3px 0 0;border:1px solid gray;width:' + (+Math.round(this.actSize.shCPl / 2) - (60 + this.actSize.fontsize * 4)) + 'px;"/>');
        var buttonSendMess = $('<button style="font-size:' + this.actSize.fontsize + 'pt;float:right;margin:3px 3px 3px 0;width:' + (40 + this.actSize.fontsize * 4) + 'px;">' + this.lang['SEND_MESSAGE'] + '</button>').click(function () {
                thisEl.actionsUser('SEND_MESSAGE', 'send_messageObr');
            });
        var infoPanel = $('<div style="float:left;display:inline-block;text-align:center;width:' + Math.round(this.actSize.shCPl / 2 - 1) + 'px;height:' + t * 2 + 'px;">');
        infoPanel.append(this.infoGame).append($('<div style="">').append(this.messageField).append(buttonSendMess));
        bottomPanel.append(this.userPanel).append(infoPanel);
        this.butPanel = $('<div style="width: ' + this.actSize.shCPl + 'px;height:' + t + 'px;text-align:center;position:absolute;z-index:10;top:0;left:0;">');
        for (var b in this.buttons) {
            if (b == 'AUCTION_BUY' || b == 'AUCTION_FOLD') {
                continue;
            }
            this.butPanel.append(this.buttons[b]);
        }
        this.imgName = '/resources/images/games/' + this.room.imageFolder + '/';
        this.butPanel.append(this.butGE);
        this.panelSelectFirm = $('<div style="background:black;position:absolute;z-index:10;top:0;left:0;width:' + this.actSize.shCPl + 'px;height:' + (t * 2 - 2) + 'px;"></div>').hide();
        this.panelAuction = $('<div style="background:black;position:absolute;z-index:10;top:0;left:0;width:' + this.actSize.shCPl + 'px;height:' + (t * 2 - 2) + 'px;"></div>').hide();
        this.panelAuction.append(this.buttons['AUCTION_BUY']).append(this.buttons['AUCTION_FOLD']);
        this.panelThrowCube = $('<div style="background:black;position:absolute;z-index:10;top:0;left:0;width:' + this.actSize.shCPl + 'px;height:' + (t * 2 - 2) + 'px;text-aligne:center;vertical-aligne:middle;"></div>').hide();
        this.imgThrowCube1 = $('<img style="vertical-align: middle;" src="' + this.imgName + 'cube/' + 1 + '.png" width="' + Math.round(t) + 'px" height="' + Math.round(t) + 'px"/>');
        this.imgThrowCube2 = $('<img style="vertical-align: middle;" src="' + this.imgName + 'cube/' + 2 + '.png" width="' + Math.round(t) + 'px" height="' + Math.round(t) + 'px"/>');
        this.panelThrowCube.append(this.imgThrowCube1).append(this.imgThrowCube2).append('<div style="display: inline-block; height: 100%; vertical-align: middle;"></div>');
        var butPut = $('<button value="' + this.lang['PUT_FIRM'] + '">' + this.lang['PUT_FIRM'] + '</button>').click(function () {
                thisEl.actionsUser('PUT_FIRM', 'put_firmObr');
                thisEl.cancalSelectFirm();
            }).hide();
        var butRed = $('<button value="' + this.lang['REDEEM_FIRM'] + '">' + this.lang['REDEEM_FIRM'] + '</button>').click(function () {
                thisEl.actionsUser('REDEEM_FIRM', 'redeem_firmObr');
                thisEl.cancalSelectFirm();
            }).hide();
        var butBuyF = $('<button value="' + this.lang['BUY_FILIAL'] + '">' + this.lang['BUY_FILIAL'] + '</button>').click(function () {
                thisEl.actionsUser('BUY_FILIAL', 'buy_filialObr');
                thisEl.cancalSelectFirm();
            }).hide();
        var butPutF = $('<button value="' + this.lang['SELL_FILIAL'] + '">' + this.lang['SELL_FILIAL'] + '</button>').click(function () {
                thisEl.actionsUser('SELL_FILIAL', 'sell_filialObr');
                thisEl.cancalSelectFirm();
            }).hide();
        this.buttonsWinBAY = {
            'PUT_FIRM': butPut,
            'REDEEM_FIRM': butRed,
            'BUY_FILIAL': butBuyF,
            'SELL_FILIAL': butPutF
        };
        var butPutCancal = $('<button value="' + this.lang['CANCAL'] + '">' + this.lang['CANCAL'] + '</button>').click(function () {
                thisEl.cancalSelectFirm();
            });
        this.poleF = $('<div style="width:' + Math.round(this.actSize.shCPl / 2) + 'px;height:' + (t * 2 - 30) + 'px; overflow: auto; border:1px solid white;margin:1px;"></div>');
        this.panelSum = $('<div style="color: white; width:' + Math.round(this.actSize.shCPl / 2) + 'px;height:25px; overflow: auto; border:1px solid white;margin:1px;"></div>')
            this.panelSelectFirm.append($('<div style="width:' + Math.round(this.actSize.shCPl / 2) + 'px;height:' + (t * 2 - 2) + 'px;float:left;margin:3px;"></div>').append(this.poleF).append(this.panelSum)).append($('<div></div>').append(butPut).append(butRed).append(butBuyF).append(butPutF).append(butPutCancal));
        topPanel.append(this.buildChangePanel()).append(('<div style="background-color:black;opacity:0.85;width: ' + this.actSize.shCPl + 'px;height:' + (t * 2) + 'px;text-align:center;position:absolute;z-index:1;top:0;left:0;">')).append(this.butPanel).append(this.panelSelectFirm).append(this.panelAuction).append(this.panelThrowCube);
        $('#centerPl').append($('<div id="systContr" style="position:absolute;left: 0;top:0; z-index: 10; width: ' + this.actSize.shCPl + 'px;height:' + this.actSize.shCPl + 'px;">').
            append(topPanel).append(bottomPanel));
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
    showHidebut: function (pos, but) {
        if (pos) {
            but.removeAttr('disabled').css('font-weight', 'bold');
        } else {
            but.attr('disabled', 'disabled').css('font-weight', 'normal');
        }
    },
    hideAllBut: function () {
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
            this.timeLoad = 10000;
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
                //this.userPanel.append(gamer.vid);
            }
        }
        //$('.userOwner').remove();
        //for (var i = 0; i < this.listCard.length; i++) {
        //    if (this.listCard[i].obj.userOwner != null) {
        //        var g = this.getUserByName(this.listCard[i].obj.userOwner.name);
        //        this.listCard[i].buyFirm(g);
        //    }
        //}
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
        return $('<button style="vertical-align: top;font-size:' + this.actSize.fontsize + 'pt;width:' + (Math.round(this.actSize.shCPl / 4) - 2) + 'px;height:' + Math.round((this.actSize.shCPl / 3) / 4) + 'px;" value="' + this.lang[butName] + '">' + this.lang[butName] + '</button>').click(function () {
            thisEl.actionsUser(butName, butName.toLowerCase() + "Obr");
        });
    },

    buildChangePanel: function () {
        var thisEl = this;
        var ochf = {};
        var t = Math.round(this.actSize.shCPl / 2);
        ochf.vid = $('<div style="float:clear;background:black;position:absolute;z-index:12;top:0;left:0;width:' + (this.actSize.shCPl) + 'px;height:' + t + 'px;"></div>').hide();
        var panelChMy = $('<div style="width:' + (this.actSize.shCPl / 2) + 'px;height:' + (t - 2) + 'px;float:left;"></div>');
        var panelCh2 = $('<div style="width:' + (this.actSize.shCPl / 2) + 'px;height:' + (t - 2) + 'px;float:left;"></div>');
        ochf.mySelect = $('<div style="border:1px solid gray;margin: 3px;height:' + (t - 100) + 'px;overflow:auto;"></div>');
        ochf.myMoney = $('<input type="text" style="background: black; color:#ffffff;">');
        panelChMy.append('<div style="height:22px;">Вы</div>').append(ochf.mySelect).append($('<div style="padding: 3px;">').append(ochf.myMoney));
        ochf.userSelect = $('<select style="background: black; color:#ffffff;margin: 3px;">');
        ochf.userSelect.change(function () {
            for (var i = 0; i < thisEl.listCell.length; i++) {
                thisEl.listCell[i].canSelectCancal2();
            }
            thisEl.listSelectFirm2 = [];
            thisEl.changePanel.apponentSelect.empty();
            thisEl.getPossibleFirm("CHANGE_FIRM", this.value);
        });
        ochf.apponentSelect = $('<div style="border:1px solid gray;margin: 3px;height:' + (t - 100) + 'px;overflow:auto;">');
        ochf.apponentMoney = $('<input type="text" style="background: black; color:#ffffff;">');
        ochf.panelBut = $('<div>')
            .append($('<button>ok</button>').click(function () {
                    thisEl.actionsUser("CHANGE_FIRM", "change_firmObr");
                    thisEl.cancalChangeFirm();
                }))
            .append($('<button>Отмена</button>').click(function () {
                    thisEl.cancalChangeFirm();
                }));
        panelCh2.append($('<div style="height:22px;">').append(ochf.userSelect)).append(ochf.apponentSelect).append($('<div style="padding: 3px;">').append(ochf.apponentMoney)).append(ochf.panelBut);

        ochf.vid.append(panelChMy).append(panelCh2);
        this.changePanel = ochf;
        return ochf.vid;
    },
    updPanelSum: function (action, ind) {
        var isum = 0;
        this.panelSum.text(isum);
    },
    throw_cubeObr: function (data, fishka, ind) {
        var thisEl = this;
        if (!ind) {
            ind = 0;
            this.panelThrowCube.show();
        }
        this.imgThrowCube1.attr('src', this.imgName + 'cube/' + this.getRandomInt(1, 6) + '.png');
        this.imgThrowCube2.attr('src', this.imgName + 'cube/' + this.getRandomInt(1, 6) + '.png');
        if (ind < 10) {
            ind += 1;
            setTimeout(function () {
                thisEl.throw_cubeObr(data, fishka, ind)
            }, 100);
        } else {
            this.imgThrowCube1.attr('src', this.imgName + 'cube/' + data[0] + '.png');
            this.imgThrowCube2.attr('src', this.imgName + 'cube/' + data[1] + '.png');
            //this.go_sellObr2(data,fishka);
        }
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    startGoSellFunction: function (data, fishka) {
        var thisEl = this;
        setTimeout(function () {
            thisEl.go_sellObr(data, fishka);
        }, 2000);
    },
    actionsUser: function (action, functObr) {
		var dataReq = {};
		
        var thisEl = this;
        dataReq.datas = null;
        dataReq.typeReq = "GET";
        dataReq.datat = "json";
		dataReq.action = action;
        this.numError = 0;
		
		if (action == "CHOISE_SET_CARD")
		{			
			dataReq.datas = {'setCard': $('.inputSetCard:checked').toArray().map(item => item.value)};
		}
		
        //jQuery.ajaxSettings.traditional = false;
		
		/*
		
        if (action == 'PUT_FIRM' | action == 'REDEEM_FIRM' | action == 'BUY_FILIAL' | action == 'SELL_FILIAL') {
            if (this.listSelectFirm.length == 0) {
                this.getPossibleFirm(action);
                return;
            } else {
                datas = {
                    'indFirm': this.listSelectFirm
                };
            }
        }
        if (action == 'CHANGE_FIRM') {
            if (this.listSelectFirm.length == 0 & this.listSelectFirm2.length == 0) {
                if (this.changePanel.vid.is(':visible')) {
                    this.loginfo("Для обмена нужно выбрать хотябы одну фирму с любой стороны");
                    return;
                }
                this.getPossibleFirm(action);
                return;
            } else {
                jQuery.ajaxSettings.traditional = true;
                typeReq = "POST";
                datat = "html";
                var money1 = parseInt(this.changePanel.myMoney.val());
                if (isNaN(money1)) {
                    money1 = 0;
                }
                var money2 = parseInt(this.changePanel.apponentMoney.val());
                if (isNaN(money2)) {
                    money2 = 0;
                }
                //                'indFirmUserChanger': this.listSelectFirm,'indFirm': this.listSelectFirm2,
                datas = {
                    'indFirmUserChanger': this.listSelectFirm,
                    'indFirm': this.listSelectFirm2,
                    'moneyUserChanger': money1,
                    'money': money2,
                    'userName': this.changePanel.userSelect.val()
                };
                //                alert(datas);
            }
        }
        
        
		 */
		 
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
        this.keyLoad = 0;
       
		this.dataGameLoader.actions(this, "actionCallBack", dataReq);
    },
	actionCallBack:function(data){
		this.keyLoad = 2000;
		this.loadgamedata();
		if (data.action == 'GAME_END') {
		    this.buttons['GAME_CLOSE'].removeAttr('disabled').css('font-weight', 'bold');
		}
		
	},
    setFishkaI: function (fishka, step) {
        var ind = fishka.posit - step;
        if (ind < 0) {
            ind = this.listCell.length + ind;
        }
        this.listCell[ind].goOnFishka(fishka);
        if (step > 0) {
            var thisEl = this;
            setTimeout(function () {
                thisEl.setFishkaI(fishka, step - 1)
            }, 200);
        } else {
            this.panelThrowCube.hide();
        }
    },
    win: function (ind) {
        var thisEl = this;
        if (!ind) {
            ind = 0;
            this.panelWin = $('<div style="background:black;position:absolute;z-index:40;top:0;left:0;width:' + this.actSize.shCPl + 'px;height:' + (this.actSize.shCPl - 2) + 'px; text-align:center;"></div>');
            $('#systContr').append(this.panelWin);
            this.imgWin = $('<img style="" src="' + this.imgName + 'win/' + 1 + '.gif" width="' + Math.round(this.actSize.shCPl / 2) + 'px" height="' + Math.round((this.actSize.shCPl - 2) / 2) + 'px"/>');
            this.panelWin.append($('<div style="display: inline-block; vertical-align: middle; color: WHITE; padding: 60px;color:white; font-weight: bold;font-size: 20pt;"></div>')
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

$(document).ready(function () {
    new GameImaginarium(langRu, false);
});