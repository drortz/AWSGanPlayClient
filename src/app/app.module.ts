import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CountingComponent } from './games/counting/counting.component';
import { NumbersComponent } from './games/counting/numbers/numbers.component';
import { ImageComponent } from './games/counting/image/image.component';
import { HomeComponent } from './home/home.component';
import { AnswerFeedbackComponent } from './games/answer-feedback/answer-feedback.component';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { CountingIntroComponent } from './games/counting-intro/counting-intro.component';
import { FormsModule } from '@angular/forms';
import { LettersComponent } from './games/letters/letters/letters.component';
import { LettersIntroComponent } from './games/letters/letters-intro/letters-intro.component';
import { LettersBarComponent } from './games/letters/letters-bar/letters-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatButtonToggleModule, 
  MatIconModule, MatBadgeModule, MatSliderModule, MatFormFieldModule, MatSelectModule,
MatPaginatorModule, MatExpansionModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MathComponent } from './games/Math/Math.component';
import { MathIntroComponent } from './games/Math/math-intro/math-intro.component';
import { MathCountingObjectsComponent } from './games/Math/math-counting-objects/math-counting-objects.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CountingComponent,
    NumbersComponent,
    ImageComponent,
    HomeComponent,
    AnswerFeedbackComponent,
    LoadSpinnerComponent,
    CountingIntroComponent,
    LettersComponent,
    LettersIntroComponent,
    LettersBarComponent,
    MathComponent,
    MathIntroComponent,
    MathCountingObjectsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    MatSliderModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
