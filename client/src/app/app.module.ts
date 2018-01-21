import { TweetComponent } from './tweet/tweet.component';
import { TweetService } from './service/tweet.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignupComponent  } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserNavbarComponent } from './user/user-navbar/user-navbar.component';


import { AuthService } from './service/auth.service';
import { ChatService } from './service/chat.service';
import { ProfileService } from './service/profile.service';

import { IsLoginGuard ,IsNotLoginGuard} from './app.guard';
import {  routing } from './app.router';

import {TimeAgoPipe} from 'time-ago-pipe';



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
    AboutComponent,
    TweetComponent,
    ProfileComponent,
    UserNavbarComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routing),
    ReactiveFormsModule,
  ],
  providers: [ 
    IsLoginGuard, 
    IsNotLoginGuard , 
    ChatService , 
    AuthService, 
    ProfileService,
    TweetService,
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { };
