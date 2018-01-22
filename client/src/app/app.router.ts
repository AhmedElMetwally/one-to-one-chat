import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ProfileComponent } from './user/profile/profile.component';
import { TweetComponent } from './tweet/tweet.component';
import { LogoutComponent } from './user/logout/logout.component';
import { SignupComponent } from './user/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { Routes } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { IsLoginGuard, IsNotLoginGuard } from './app.guard';
import { AboutComponent } from './about/about.component';



export const routing : Routes = [
    {
        path : '' , 
        redirectTo : 'user',
        pathMatch:'full' 
    },
    {
        path : 'user' , 
        component : UserComponent , 
        children: 
            [{
                path : '' ,  
                pathMatch:'full', 
                redirectTo : 'signin' 
            },
            {
                path : 'signin' , 
                component : SigninComponent ,
                canActivate : [IsNotLoginGuard] 
            },
            {
                path : 'signup' , 
                component : SignupComponent  ,
                canActivate : [IsNotLoginGuard] 
            },
            {
                path : 'logout' , 
                component : LogoutComponent , 
                canActivate : [IsLoginGuard]  
            },
            {
                path : 'profile' , 
                component : ProfileComponent , 
                canActivate : [IsLoginGuard]  
            },
            {
                path : 'forget-password' , 
                component : ForgetPasswordComponent , 
                canActivate : [IsNotLoginGuard] 
            }]
    },
    {
        path : 'chat' , 
        component : ChatComponent , 
        canActivate : [IsLoginGuard] 
    },
    {
        path : 'tweet' , 
        component : TweetComponent 
    },
    {
        path : 'about' , 
        component : AboutComponent 
    },
    {
        path : 'viewProfile/:_id' , 
        component : ViewProfileComponent 
    },
    {
        path : 'change-password/:password_token' , 
        component : ChangePasswordComponent ,
        canActivate : [IsNotLoginGuard] 
    },
];
