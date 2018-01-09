webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n<nav class=\"navbar navbar-default navbar-inverse\" role=\"navigation\">\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class=\"container\">  \n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" >Ahmed</a>\n    </div>\n\n    <div class=\"collapse navbar-collapse navbar-ex1-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li><a  routerLinkActive='active' routerLink=\"/user\">user</a></li>\n        <!-- hide chat is user is not login -->\n        <li><a  routerLinkActive='active' routerLink=\"chat\" *ngIf=\"isLogin()\" >chat</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n\n<div class=\"container\" >\n  <router-outlet></router-outlet>\n</div>\n "

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_userService) {
        this._userService = _userService;
        // on open the app 
        // ckeck if this app is have token
        // if have token ckeck if this token is good
        // ckeck token on open the app
        // if not auth clear token and _id 
        if (this._userService.isLogin()) {
            this._userService.ckeckToken()
                .subscribe(function (data) {
                if (!data.auth) {
                    localStorage.clear();
                }
            });
        }
    }
    ;
    // ckeck if user login or not
    AppComponent.prototype.isLogin = function () {
        return this._userService.isLogin();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__user_user_service__["a" /* UserService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsLoginGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IsNotLoginGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// IsLoginGuard
var IsLoginGuard = (function () {
    function IsLoginGuard(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    ;
    // if user login true
    // return true
    // if user login false
    // return false
    // go to /user/login
    IsLoginGuard.prototype.canActivate = function () {
        if (this._userService.isLogin()) {
            return true;
        }
        else {
            this._router.navigate(['/user', 'signin']);
            return false;
        }
    };
    IsLoginGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], IsLoginGuard);
    return IsLoginGuard;
}());

// IsNotLoginGuard
var IsNotLoginGuard = (function () {
    function IsNotLoginGuard(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    ;
    // if user login true
    // return false 
    // if user login false
    // return false
    // go to /user/logout
    IsNotLoginGuard.prototype.canActivate = function () {
        if (!this._userService.isLogin()) {
            return true;
        }
        else {
            this._router.navigate(['/user', 'logout']);
            return false;
        }
    };
    IsNotLoginGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], IsNotLoginGuard);
    return IsNotLoginGuard;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_guard__ = __webpack_require__("../../../../../src/app/app.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_signin_signin_component__ = __webpack_require__("../../../../../src/app/user/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_router__ = __webpack_require__("../../../../../src/app/app.router.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_user_component__ = __webpack_require__("../../../../../src/app/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat_chat_component__ = __webpack_require__("../../../../../src/app/chat/chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_signup_signup_component__ = __webpack_require__("../../../../../src/app/user/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_logout_logout_component__ = __webpack_require__("../../../../../src/app/user/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__chat_chat_service__ = __webpack_require__("../../../../../src/app/chat/chat.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_9__chat_chat_component__["a" /* ChatComponent */],
                __WEBPACK_IMPORTED_MODULE_1__user_signin_signin_component__["a" /* SigninComponent */],
                __WEBPACK_IMPORTED_MODULE_10__user_signup_signup_component__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_12__user_logout_logout_component__["a" /* LogoutComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__app_router__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_11__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_0__app_guard__["a" /* IsLoginGuard */], __WEBPACK_IMPORTED_MODULE_0__app_guard__["b" /* IsNotLoginGuard */], __WEBPACK_IMPORTED_MODULE_13__chat_chat_service__["a" /* ChatService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_guard__ = __webpack_require__("../../../../../src/app/app.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_chat_component__ = __webpack_require__("../../../../../src/app/chat/chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_component__ = __webpack_require__("../../../../../src/app/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_router__ = __webpack_require__("../../../../../src/app/user/user.router.ts");





var router = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: __WEBPACK_IMPORTED_MODULE_2__user_user_component__["a" /* UserComponent */], children: __WEBPACK_IMPORTED_MODULE_4__user_user_router__["a" /* UserRouter */] },
    { path: 'chat', component: __WEBPACK_IMPORTED_MODULE_1__chat_chat_component__["a" /* ChatComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__app_guard__["a" /* IsLoginGuard */]] }
];
var routing = __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */].forRoot(router);


/***/ }),

/***/ "../../../../../src/app/chat/chat.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "button.user{\n    min-width: 80%;\n    padding: 10px 10px;\n    margin-top: 14px ;\n}\n\n.messages{\n    padding: 10px;\n    max-height: 200px;\n    min-height: 200px;\n    overflow-y: auto;\n}\n\n.users{\n    max-height: 300px;\n    overflow-y: auto;\n}\n\n.messages .msg{\n    background: #424242;\n    color: white;\n    font-size: 15px;\n    border-radius: 8px;\n    padding: 5px 15px;\n    width: 70%;\n    word-break: break-all;\n    \n}\n\n.messages .msg.me{\n    margin-left: 30%;\n    text-align: right;\n}\n\n.messages .date{\n    color: whitesmoke;\n    font-size: 10px;\n    padding-top: 12px;\n}\n ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chat/chat.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center hidden-xs\">Real Time Chat</h1>\n<h3 class=\"text-center visible-xs \">Real Time Chat</h3>\n<hr>\n<!-- panel-default -->\n<div class=\"panel panel-default chat\">\n  <div class=\"panel-body\">\n\n    <div class=\"row\">\n\n      <!-- users -->\n      <div class=\"col-md-3\"  >\n  \n        <!-- check if users -->\n        <div *ngIf=\"users.length\" class=\"users\" >\n\n          <!-- for loop users -->\n          <div *ngFor=\"let user of users\" >\n            <!-- \n              onclick check if caller == user\n              if caller if user\n              clearCaller\n              else\n              set this user in caller\n              and set class success remove default\n\n              if click anther btn \n              set anther user in caller\n              set class default remove success\n              \n             -->\n            <button \n              [ngClass]=\n              \"{\n                'btn-success' : user.socketId == caller?.socketId, \n                'btn-default' : user.socketId != caller?.socketId  \n              }\"\n              class=\"btn  center-block user\" \n              title='{{user.email}}' \n              (click)='caller?._id == user._id ? clearCaller() : call(user)'\n            >\n              {{user.name}}\n             \n              <!-- if user online -->\n              <span *ngIf=\"user.online\" style=\"margin-left:5px\" class=\"glyphicon glyphicon-send text-success\"></span>\n              <span *ngIf=\"!user.online\" style=\"margin-left:5px\"  class=\"glyphicon glyphicon-send\"></span>\n            </button>\n          </div>\n        </div>\n\n        <!-- check if users -->\n        <div *ngIf=\"!users.length\" >\n          <button class=\"btn btn-success center-block user\">No  Users</button>\n        </div>\n\n      </div>\n      <!-- end users -->\n\n      <br>\n\n      <!-- message body -->\n      <div class=\"col-md-9 panel-body\" *ngIf='caller'>\n\n        <!-- messages -->\n        <!-- scroll to end this div -->\n        <div class=\"messages\" #scrollMe [scrollTop]=\"scrollMe.scrollHeight\">\n          <div *ngFor=\"let message of messages\" >\n              <!-- message.user._id == _id  -> this user if owner this msg -->\n            <p \n              class=\"lead msg \"\n              [ngClass]=\"{\n                'me' : message.user._id == _id \n              }\"\n              (click)='message.showDate = !message.showDate'\n            >\n              {{message.content}}\n              <br>\n              <!-- \n                use undefind proparty to hide date\n                on click convert this proparty \n              -->\n              <span class=\"date\" [hidden]='!message.showDate'>\n                  {{message.created | date:'medium'}}\n              </span>\n            </p>\n            \n            \n          </div>\n        </div>\n        <!-- end messages -->\n\n        <br>\n        \n        <!-- form sent message -->\n        <form method=\"post\" (submit)='sent(msg)'>\n          <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Message....\" #msg >\n            <div class=\"input-group-btn\">\n              <button class=\"btn btn-primary\" type=\"submit\">Sent</button>\n            </div>\n          </div>\n        </form>\n        <!-- end form sent message -->\n\n      </div>\n      <!-- end message body -->\n\n    </div>\n  </div>\n\n<!-- panel-default -->\n</div> \n"

/***/ }),

/***/ "../../../../../src/app/chat/chat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_service__ = __webpack_require__("../../../../../src/app/chat/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatComponent = (function () {
    function ChatComponent(_chatService) {
        var _this = this;
        this._chatService = _chatService;
        // socket.io
        this.io = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].url);
        // _id  
        // token
        // myuser
        this._id = localStorage.getItem('_id');
        this.token = localStorage.getItem('token');
        // all users 
        this.users = [];
        // get all messages of caller
        this.messages = [];
        // for loop nlineUser
        // check if caller._id in onlineUser._id
        // if caller not online 
        // set caller = null
        // reset isConnect = false 
        this.isConnect = false;
        // login in soketIo 
        // sent _id
        // socket.io update socketId in db 
        this.io.emit('login', this.token);
        // get all users  
        // get myuser from users
        // filter myuser form users
        this.io.on('login', function (users) {
            _this.users = [];
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == _this._id) {
                    _this.user = users[i];
                }
                else {
                    _this.users.push(users[i]);
                }
            }
        });
        // refresh
        // get all users online
        // filter myUser form online users
        // if thisUser is in caller
        // ckeckCallerIsOnline after this refresh
        this.io.on('refresh', function (users) {
            _this.users = [];
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == _this._id) {
                    _this.user = users[i];
                }
                else {
                    _this.users.push(users[i]);
                }
            }
            if (_this.caller) {
                _this.ckeckCallerIsOnline();
            }
            console.log('refresh onlineUsers');
        });
        // on new msg
        // check if caller
        // ckeck if msg.callerId is userId
        this.io.on('msg', function (msg) {
            if (_this.caller) {
                if (_this.caller._id == msg.user._id) {
                    _this.messages.push(msg);
                }
                ;
            }
            ;
        });
        console.log('constrtor');
    }
    ;
    // sent message on submit form
    // content - caller  - user._id
    // import to caller
    // must click the user btn to run function call
    // push this msg in messages after sent it 
    ChatComponent.prototype.sent = function (msg) {
        if (msg.value) {
            this.io.emit('msg', {
                content: msg.value,
                user: this.user,
                caller: this.caller,
                created: new Date().toISOString()
            });
            this.messages.push({
                content: msg.value,
                user: this.user,
                caller: this.caller,
                created: new Date().toISOString()
            });
            msg.value = '';
        }
    };
    ;
    // call user
    // set caller in this.caller to sent and get the messages
    // show form 
    // replace all messages to his messages
    ChatComponent.prototype.call = function (caller) {
        var _this = this;
        this.caller = caller;
        this.messages = [];
        this._chatService.getMessages(this._id, caller._id)
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    ;
    // clear Call
    // clear messages
    // hide form and messages
    ChatComponent.prototype.clearCaller = function () {
        this.caller = null;
        this.messages = [];
    };
    ;
    ChatComponent.prototype.ckeckCallerIsOnline = function () {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i]._id == this.caller._id && this.users[i].online) {
                this.isConnect = true;
                break;
            }
        }
        if (!this.isConnect) {
            this.caller = null;
        }
        this.isConnect = false;
    };
    ChatComponent.prototype.ngOnInit = function () { };
    ;
    ChatComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-chat',
            template: __webpack_require__("../../../../../src/app/chat/chat.component.html"),
            styles: [__webpack_require__("../../../../../src/app/chat/chat.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__chat_service__["a" /* ChatService */]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "../../../../../src/app/chat/chat.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatService = (function () {
    function ChatService(_http) {
        this._http = _http;
    }
    ;
    ChatService.prototype.getMessages = function (userId, callerId) {
        return this._http.get(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].url + "/api/messages?userId=" + userId + "&&callerId=" + callerId)
            .map(function (res) { return res.json(); });
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "../../../../../src/app/user/logout/logout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogoutComponent = (function () {
    function LogoutComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    ;
    // logout user
    // go to /user/signin
    LogoutComponent.prototype.logout = function () {
        this._userService.Logout();
        this._router.navigate(['/user', 'signin']);
    };
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-logout',
            template: "\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"logout()\">Logout</button>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "../../../../../src/app/user/signin/signin.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!-- show error in signup -->\n<div *ngIf=\"ErrorAlert\"  class=\"alert alert-danger\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n  <strong>Signin Fail</strong> Pleace Ckeck Your Date ... \n</div>\n\n\n<form  role=\"form\" [formGroup]='myform' (submit)='onSubmit()'>\n  <!-- \n    set class error if formControlName us invalid\n    set class success if formControlName us valid\n\n    Validator [email , required] in html only\n  -->\n  <div class=\"form-group has-feedback\" \n    [ngClass]=\"{\n      'has-error' : myform.controls.email.invalid && myform.controls.email.touched ,\n      'has-success' : myform.controls.email.valid\n    }\" \n  >\n    <label for=\"\" class=\"control-label\">Email</label>\n    <input \n      type=\"email\" \n      class=\"form-control\" \n      placeholder=\"Email\"\n      formControlName='email'\n      required   \n      email\n    >\n    <small *ngIf=\"myform.controls.email.invalid && myform.controls.email.touched\"  class=\"text-danger\"> Must be 5-30 characters long</small>  \n  </div>\n\n  <!-- \n    set class error if formControlName us invalid\n    set class success if formControlName us valid\n\n    Validator [required] in html only\n  -->\n  <div class=\"form-group has-feedback\" \n    [ngClass]=\"{\n      'has-error' : myform.controls.password.invalid && myform.controls.password.touched ,\n      'has-success' : myform.controls.password.valid\n    }\"\n  >\n    <label for=\"\" class=\"control-label\">Password</label>\n    <input \n      type=\"password\" \n      class=\"form-control\" \n      placeholder=\"Password\"\n      formControlName='password'\n      required  \n    >\n    <small *ngIf=\"myform.controls.password.invalid && myform.controls.password.touched\"  class=\"text-danger\"> Must be 8-30 characters long</small>  \n  </div>\n  <!-- \n    submit is disabled if form invalid\n  -->\n  <button type=\"submit\" [disabled]='myform.invalid'  class=\"btn btn-primary\">Submit</button>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/user/signin/signin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_formValidators__ = __webpack_require__("../../../../../src/app/user/user.formValidators.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninComponent = (function () {
    function SigninComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        // to show alert of error
        this.ErrorAlert = false;
    }
    ;
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        // user object
        // signin with user
        // Login the User in localStorge
        // reset the form 
        // go to /chat
        // if err -> throw Error
        this.user = {
            email: this.myform.controls.email.value,
            password: this.myform.controls.password.value
        };
        this._userService.signinUser(this.user).subscribe(function (user) {
            _this._userService.Login(user.token, user._id);
            _this.myform.reset();
            _this._router.navigate(['/chat']);
        }, function (err) {
            _this.ErrorAlert = true;
            console.log(err);
        });
    };
    ;
    SigninComponent.prototype.ngOnInit = function () {
        // create new form 
        // with email and password
        // formControlName : ('' , [Validators])
        this.myform = __WEBPACK_IMPORTED_MODULE_0__user_formValidators__["a" /* signinMyform */];
    };
    ;
    SigninComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-signin',
            template: __webpack_require__("../../../../../src/app/user/signin/signin.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], SigninComponent);
    return SigninComponent;
}());

;


/***/ }),

/***/ "../../../../../src/app/user/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!-- show error in signup -->\n<div *ngIf=\"ErrorAlert\"  class=\"alert alert-danger\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n  <strong>Error</strong> Pleace Ckeck Your Date ... \n</div>\n\n<form  role=\"form\" [formGroup]='myform' (submit)='onSubmit()'>\n  <!-- \n    set class error if formControlName us invalid\n    set class success if formControlName us valid\n\n    Validator [required] in html only\n  -->\n  <div \n    class=\"form-group has-feedback\" \n    [ngClass]='{\n      \"has-error\" : myform.controls.name.invalid && myform.controls.name.touched ,\n      \"has-success\" : myform.controls.name.valid\n      }'\n  >\n    <label for=\"\" class=\"control-label\">Name</label>\n    <input \n      type=\"text\" \n      class=\"form-control\" \n      placeholder=\"name\"\n      formControlName='name'\n      required   \n    >\n    <!-- danger message -->\n    <small *ngIf=\"myform.controls.name.invalid && myform.controls.name.touched\"  class=\"text-danger\"> Must be 5-30 characters long</small>  \n  </div>\n\n\n\n\n  <!-- \n    set class error if formControlName us invalid\n    set class success if formControlName us valid\n\n    Validator [required , email] in html only\n  -->\n  <div \n    class=\"form-group has-feedback\" \n    [ngClass]='{\n      \"has-error\" : myform.controls.email.invalid && myform.controls.email.touched ,\n      \"has-success\" : myform.controls.email.valid\n      }'\n  >    \n    <label for=\"\" class=\"control-label\">Email</label>\n    <input \n      type=\"email\" \n      class=\"form-control\" \n      placeholder=\"Email\"\n      formControlName='email'\n      required   \n      email\n    >\n    <!-- danger message -->\n    <small *ngIf=\"myform.controls.email.invalid && myform.controls.email.touched\"  class=\"text-danger\"> Must be Email</small> \n  </div>\n\n  <!-- \n    set class error if formControlName us invalid\n    set class success if formControlName us valid\n\n    Validator [required] in html only\n  -->\n  <div \n    class=\"form-group has-feedback\" \n    [ngClass]='{\n      \"has-error\" : myform.controls.password.invalid && myform.controls.password.touched ,\n      \"has-success\" : myform.controls.password.valid\n      }'\n  >\n    \n    <label for=\"\" class=\"control-label\">Password</label>\n    <input \n      type=\"password\" \n      class=\"form-control\" \n      placeholder=\"Password\"\n      formControlName='password'\n      required\n    >\n    <!-- danger message -->\n    <small *ngIf=\"myform.controls.password.invalid && myform.controls.password.touched\"  class=\"text-danger\"> Must be 8-30 characters long</small> \n  </div>\n\n  <button type=\"submit\" [disabled]='myform.invalid'   class=\"btn btn-primary\">Submit</button>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/user/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_formValidators__ = __webpack_require__("../../../../../src/app/user/user.formValidators.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupComponent = (function () {
    function SignupComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        // to show alert of error
        this.ErrorAlert = false;
    }
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        // new User
        // singup new User
        // Login the User in localStorge
        // reset the form 
        // go to /chat
        // if err throw Error
        this.user = {
            name: this.myform.controls.name.value,
            email: this.myform.controls.email.value,
            password: this.myform.controls.password.value
        };
        this._userService.signupUser(this.user).subscribe(function (user) {
            _this._userService.Login(user.token, user._id);
            _this.myform.reset();
            _this._router.navigate(['/chat']);
        }, function (err) {
            _this.ErrorAlert = true;
            console.log(err);
        });
    };
    ;
    SignupComponent.prototype.ngOnInit = function () {
        // create new form 
        // with name and email and password
        // formControlName : ('' , [Validators])
        this.myform = __WEBPACK_IMPORTED_MODULE_0__user_formValidators__["b" /* signupMyform */];
    };
    ;
    SignupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'app-signup',
            template: __webpack_require__("../../../../../src/app/user/signup/signup.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], SignupComponent);
    return SignupComponent;
}());

;


/***/ }),

/***/ "../../../../../src/app/user/user.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\" col-md-12\">\n  <ul class=\" nav nav-tabs \">\n      <!--\n        isLogin()\n          return true or false\n          check if user is login with token\n      -->\n    <li><a  routerLinkActive='active' routerLink='signin' *ngIf=\"!isLogin()\" > signin</a></li>\n    <li><a routerLinkActive='active' routerLink='signup' *ngIf=\"!isLogin()\" > signup</a></li>\n    <li><a routerLinkActive='active' routerLink='logout' *ngIf=\"isLogin()\" > logout</a></li>\n  </ul>\n\n  <br>\n  <router-outlet></router-outlet>\n</nav>"

/***/ }),

/***/ "../../../../../src/app/user/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__("../../../../../src/app/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserComponent = (function () {
    function UserComponent(_userService, _rouer) {
        this._userService = _userService;
        this._rouer = _rouer;
    }
    ;
    // check if user is login
    UserComponent.prototype.isLogin = function () {
        return this._userService.isLogin();
    };
    UserComponent.prototype.ngOnInit = function () { };
    UserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user',
            template: __webpack_require__("../../../../../src/app/user/user.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "../../../../../src/app/user/user.formValidators.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return signinMyform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return signupMyform; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");

// create new form 
// with email and password
// formControlName : ('' , [Validators])
var signinMyform = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormGroup */]({
    email: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].email]),
    password: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].maxLength(30)])
});
// create new form 
// with name and email and password
// formControlName : ('' , [Validators])
var signupMyform = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormGroup */]({
    name: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].maxLength(30)]),
    email: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].email]),
    password: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["e" /* Validators */].maxLength(30)])
});


/***/ }),

/***/ "../../../../../src/app/user/user.router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_guard__ = __webpack_require__("../../../../../src/app/app.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logout_logout_component__ = __webpack_require__("../../../../../src/app/user/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin_component__ = __webpack_require__("../../../../../src/app/user/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup_component__ = __webpack_require__("../../../../../src/app/user/signup/signup.component.ts");




var UserRouter = [
    { path: '', pathMatch: 'full', redirectTo: 'signin' },
    { path: 'signin', component: __WEBPACK_IMPORTED_MODULE_2__signin_signin_component__["a" /* SigninComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__app_guard__["b" /* IsNotLoginGuard */]] },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_3__signup_signup_component__["a" /* SignupComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__app_guard__["b" /* IsNotLoginGuard */]] },
    { path: 'logout', component: __WEBPACK_IMPORTED_MODULE_1__logout_logout_component__["a" /* LogoutComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__app_guard__["a" /* IsLoginGuard */]] }
];


/***/ }),

/***/ "../../../../../src/app/user/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    ;
    // check Login 
    // with token
    // with _id
    UserService.prototype.isLogin = function () {
        return localStorage.getItem('token') != null && localStorage.getItem('_id') != null;
    };
    ;
    // this is run when open the app
    // ckeck if user in DB
    // ckeck if token is good
    UserService.prototype.ckeckToken = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this._http.get(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].url + "/api/ckeck?token=" + localStorage.getItem('token') + "&&_id=" + localStorage.getItem('_id'), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // login user
    // with token
    // with _id
    UserService.prototype.Login = function (token, _id) {
        localStorage.setItem('token', token);
        localStorage.setItem('_id', _id);
    };
    // clear localStorage 
    UserService.prototype.Logout = function () {
        localStorage.clear();
    };
    // signup user with user interface Iuser
    // return token and user with _id
    UserService.prototype.signupUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this._http.post(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].url + '/api/signup', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // signin user with email & password
    // return token and user with _id
    UserService.prototype.signinUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this._http.post(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].url + '/api/signin', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    // if server in prod
    url: ''
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map