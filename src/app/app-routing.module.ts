import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: "verify-email",
    loadChildren: () =>
      import("./verify-email/verify-email.module").then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'create-instance',
    loadChildren: () => import('./create-instance/create-instance.module').then( m => m.CreateInstancePageModule)
  },
  {
    path: 'create-behavior',
    loadChildren: () => import('./create-behavior/create-behavior.module').then( m => m.CreateBehaviorPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
