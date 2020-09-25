import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './components/home/home.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AboutComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WellcomeComponent,
    MainComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    UnderConstructionComponent,
    WellcomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  exports: [
    AboutComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WellcomeComponent,
    MainComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    UnderConstructionComponent,
    WellcomeComponent,
  ],
})
export class CoreModule {}