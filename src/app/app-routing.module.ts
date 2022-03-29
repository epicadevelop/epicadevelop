import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { ContratoComponent } from './pages/contrato/contrato.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [  

  {path:'',component: PrincipalComponent,  
      children:[
        {path:'', component: LoginComponent},
        {path:'login', component: LoginComponent},        
        {path:'contrato', component: ContratoComponent, canActivate:[AuthGuard]}
      ]  
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[]
})

export class AppRoutingModule {  
}
