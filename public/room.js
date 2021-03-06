﻿ var Room = {            
            init: function(maxuser) {
                this.countUs = 2;
                var thisEl = this;
                var imgSel = $('<img src="/images/siluetsel.png" width="20"/>').attr("ind", "2");
                jQuery('#silImg').empty().append(imgSel);
                for(var i=1;i<maxuser;i++){
                   jQuery('#silImg').append(imgSel.clone().attr("ind", ""+(i+1)));
                }
                this.unsel(2);
                $('#silImg img').click(function(el) {
                    thisEl.unsel(parseInt($(el.target).attr('ind')));
                });
            },
            unselSiluet: function(el, ind) {
                if (ind == 0) {
                    unsel(ind);
                }
            },
            unsel: function(ind) {
                $('.countUs').val(ind);
                console.log('unsel='+$('.countUs').val());
                this.countUs = ind;
                var mi = $("#silImg img");
                mi.attr('src', '/images/siluetsel.png');
                for (var i = ind; i < mi.length; i++) {
                    $(mi[i]).attr('src', '/images/siluet.png');
                }
            }
        }


        var objRoom = {            
            init: function() {
                var thisEl = this;
                this.loadRoomSettings();
                this.loadAllGame();
                //this.createForm();
                $('#typeGame').change(function(){
                           console.log(JSON.stringify(thisEl));
                           thisEl.changeRoom();    
                });               
                // this is the id of the form
                $("#createForm").submit(function(e) {
                     e.preventDefault(); // avoid to execute the actual submit of the form.
        
                     var form = $(this);
                     var url = form.attr('action');
                     console.log('go to : '+url);
                     $.ajax({
                        type: "POST",
                        url: url,
                        data: form.serialize(), // serializes the form's elements.
                        success: function(data)
                        {
                             alert(data); // show response from the server.
                        }
                     });
                });
            },
            changeRoom:function(){
               var el=$('#typeGame');
               console.log(el);
               console.log(el.val());
               for(var i=0; i<this.gameSett.length;i++){
                  if (this.gameSett[i].typeGame == el.val()){
                     //maxCountUser
                     Room.init(this.gameSett[i].maxCountUser);
                  }
               }

            },
            createForm: function() {
                this.dialog = $('#createForm').dialog({
                    autoOpen: false,
                    resizable: false,
                    width: 400,
                    show: { effect: 'drop', direction: "up" },
                    modal: true,
                    draggable: true,
                    buttons: [{
                        text: "Создать игру",
                        "class": "btn-add-properties",
                        click: function() {
                            var form = $('form', this);
                            $.post(form.prop('action'),
                                    form.serialize(),
                                    function(response) {
                                       alert("Game is created");
                                    })
                                .fail(function() {
                                    alert("error");
                                });
                            $("#createForm").dialog('close');
                        }
                    }, {
                        text: "Отмена",
                        "class": "btn-add-properties",
                        click: function() {
                            $("#createForm").dialog('close');
                        }
                    }]
                });
            },              
            isUserInList: function(users){
                console.log(JSON.stringify(users));
                console.log(JSON.stringify(this.user));
            	for(var i=0; i<users.length;i++){
            	   if(this.user.name == users[i].name){
            	       return true;
            	   }
            	}
                return false;
            },
            loadAllGame: function() {
                var thisEl = this;
                jQuery.ajax({
                    url: "/games/room/getallroom",
                    dataType: "json",
                    type: "GET"
                }).done(function(data) {      
                    $('#listGames').empty();
                    if (data !== null && data.length != 0) {
                        for (var i = 0; i < data.length; i++) {
                        	var elD = $('<div><input type="hidden" value="' + data[i].nameRoom + '"><span>' + data[i].typeRoom + ' ' + (parseInt(data[i].nameRoom) + 1) + ' (' + data[i].roomUsers.length + '/' + data[i].maxCountUser + ') ' + '</span></div>');
                        	if(data[i].roomUsers !== null && thisEl.isUserInList(data[i].roomUsers)){
                                   if(data[i].maxCountUser>data[i].roomUsers.length){
                                         var waiterEl = $('<div>Ожидаем игроков...</div>');
                            
                                          elD.append(waiterEl);
                                    }else{
                                   var buttonD = $('<a href="/game/'+data[i].nameRoom+'">Перейти в игру</a>');
                            
                                   elD.append(buttonD);
                         	      }
                                  }else{
                                  var buttonD = $('<button value="Присоединиться">Присоединиться</button>');
                            
                                  elD.append(buttonD);
                            }
                            $('#listGames').append(elD);
                            thisEl.createCl(buttonD, data[i].nameRoom);
                        }
                    } else {
                        jQuery('#listGames').empty();                        
                    }
                }).always(function() {
                    setTimeout(function() {
                        thisEl.loadAllGame()
                    }, 3000);
                });
            },
            loadRoomSettings: function() {
                var thisEl = this;
                jQuery.ajax({
                    url: "/roominfo",
                    dataType: "json",
                    type: "GET"
                }).done(function(data) {
                    console.log(data);
                    if (data != null) {
                        thisEl.gameSett = data.roomSettings;
                        thisEl.user = data.user;
                        if (thisEl.gameSett.length != null && thisEl.gameSett.length != 0) {
                           for (var i = 0; i < thisEl.gameSett.length; i++) {
                               $('#typeGame').append('<option value="'+thisEl.gameSett[i].typeGame+'">'+thisEl.gameSett[i].typeGame+'</option>');                                                                        
                           }
                           Room.init(thisEl.gameSett[0].maxCountUser);
                        }
                    } else {
                        jQuery('#listGames').append('<div style="color:red">Ошибка загрузки данных</>');                        
                    }
                });
            }, 
            createCl: function(buttonD, numberRoom) {
                var thisEl = this;
                buttonD.click(function() {
                    jQuery.ajax({
                    url: "/jointoroom",
                    dataType: "json",
                    data:{'nameRoom':numberRoom},
                    type: "GET"
                }).done(function(data) {
                    console.log(data);
                    if (data != null) {
                      if(!data.success){
                      
                         jQuery('#listGames').append('<div style="color:red">Не возможно присоединиться к игре.</>');
                      }
                        
                    } else {
                        jQuery('#listGames').append('<div style="color:red">Ошибка загрузки данных</>');                        
                    }
                });
                });
            }            
            //joinRoom: function(numberRoom) {
             //   document.location.href = "/games/monopoly/" + numberRoom + "/joinRoom.html";
            //}
        }
        $(function() {
            objRoom.init();
        })