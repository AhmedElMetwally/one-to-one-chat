import { IsLoginGuard , IsNotLoginGuard } from './../app.guard';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';

export const UserRouter : Routes = [
    {path : '' ,  pathMatch:'full' , redirectTo : 'signin' },
    {path : 'signin' , component : SigninComponent  ,canActivate : [IsNotLoginGuard] },
    {path : 'signup' , component : SignupComponent  ,canActivate : [IsNotLoginGuard] },
    {path : 'logout' , component : LogoutComponent , canActivate : [IsLoginGuard]  }
];
