import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignupComponent  } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ChatComponent } from './chat/chat.component';

import { AuthService } from './service/auth.service';
import { ChatService } from './service/chat.service';

import { IsLoginGuard ,IsNotLoginGuard} from './app.guard';
import {  routing } from './app.router';

import {TimeAgoPipe} from 'time-ago-pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    TimeAgoPipe,
    NavbarComponent,
    AboutComponent // use this line becouse error [ $ ng build --prod --aot=false ]
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routing),
    ReactiveFormsModule
  ],
  providers: [ 
    IsLoginGuard, 
    IsNotLoginGuard , 
    ChatService , 
    AuthService, 
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
