import { IsLoginGuard } from './app.guard';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { UserRouter } from './user/user.router';

const router : Routes = [
    {path : '' , redirectTo : 'user' ,pathMatch:'full' },
    {path : 'user' , component : UserComponent , children: UserRouter },
    {path : 'chat' , component : ChatComponent , canActivate : [IsLoginGuard] }
];

export const routing = RouterModule.forRoot(router);
