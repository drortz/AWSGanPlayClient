
import { CountingIntroComponent } from './games/counting-intro/counting-intro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountingComponent } from './games/counting/counting.component';
import { HomeComponent } from './home/home.component';
import { LettersIntroComponent } from './games/letters/letters-intro/letters-intro.component';
import { LettersComponent } from './games/letters/letters/letters.component';

const routes: Routes = [
  {path: 'counting/:id' , component: CountingComponent},
  {path: 'counting', component: CountingIntroComponent},
  {path: 'letters', component: LettersIntroComponent},
  {path: 'letters/:id', component: LettersComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
