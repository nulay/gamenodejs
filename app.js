
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var path = require('path');
var User = require('./user');
const fs = require("fs");
var GameRoom = require("./model/gameroom");

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var dirs1 = path.join(__dirname, 'public');
var dirs2 = path.join(__dirname, 'game/public');

global.rooms = [];


// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(express.static(dirs1));
app.use(express.static(dirs1));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

//app.get('*', function (req, res) {
//    var file = path.join(dirs1, req.path.replace(/\/$/, '/index.html'));
//    if (file.indexOf(dirs1 + path.sep) !== 0) {
//        return res.status(403).end('Forbidden');
//    }
//    var type = mime[path.extname(file).slice(1)] || 'text/plain';
//    var s = fs.createReadStream(file);
//    s.on('open', function () {
//        res.set('Content-Type', type);
//        s.pipe(res);
//    });
//    s.on('error', function () {
//        res.set('Content-Type', 'text/plain');
//        res.status(404).end('Not found');
//    });
//});

// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user signup
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/signup.html');
    })
    .post((req, res) => {
        console.log('create user');
        var usert = User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        if(usert!=null){
            req.session.user = usert;
            console.log('go to dashboard');
            res.redirect('/dashboard');
        }else{
            res.redirect('/signup');
        }
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        var usert = User.findOne({'name':username});
        User.then(usert, function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user;
                res.redirect('/dashboard');
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
         var data = fs.readFileSync( "./public/dashboard.html", "utf8");
                 console.log(data);
        let message = "Hello "+req.session.user.name+"!"; 
         console.log(message);
        let header = "Главная страница";
        data = data.replace("{message}", message);
        res.send(data);

    
        //res.sendFile(__dirname + '/public/dashboard.html');
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});










//===========Game==========
var gameSettings = [{"typeGame" : "monopolia", "maxCountUser":4},{"typeGame" : "imaginarium", "maxCountUser":6}];


// route for room
app.route('/gameroom')
    .get(sessionChecker, (req, res) => {
       res.sendFile(__dirname + '/game/public/gameroom.html');
       // res.sendFile(__dirname + '/public/dashboard.html');
     })
     .post(sessionChecker, (req, res) => {
          var user = req.session.user;
          var typeRoom = req.session.user;


          var gameRoom = new GameRoom(null,typeRoom,4,true);
          gameRoom.addUser(user);

          global.rooms[global.rooms.length]=gameRoom;
          
          res.json(global.rooms);
});

// route for room /games/room/getAllRoom   ([]numberRoom,typeRoom,countUsers,maxCountUser,
app.route('/games/room/getAllRoom')
    .get(sessionChecker, (req, res) => {
        res.json(global.rooms);
       // res.json([{'numberRoom':1,'typeRoom':'monopoly','countUsers':2,'maxCountUser':6}]);
    });


// route for room
app.route('/game')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/game/public/game.html');
    });

// route for room
app.route('/games/monopoly/gameinfo')
    .get(sessionChecker, (req, res) => {
        res.send("{'users':[]}");
    });




// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
