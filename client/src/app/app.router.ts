import { ProfileComponent } from './user/profile/profile.component';
import { BlogComponent } from './blog/blog.component';
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
        redirectTo : 'about',
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
            }]
    },
    {
        path : 'chat' , 
        component : ChatComponent , 
        canActivate : [IsLoginGuard] 
    },
    {
        path : 'blog' , 
        component : BlogComponent 
    },
    {
        path : 'about' , 
        component : AboutComponent 
    },
];
