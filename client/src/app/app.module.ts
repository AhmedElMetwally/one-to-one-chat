import { IsLoginGuard ,IsNotLoginGuard} from './app.guard';
import { SigninComponent } from './user/signin/signin.component';
import {  routing } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent  } from './user/signup/signup.component';
import { UserService } from './user/user.service';
import { LogoutComponent } from './user/logout/logout.component';
import { ChatService } from './chat/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [UserService   , IsLoginGuard , IsNotLoginGuard  , ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
