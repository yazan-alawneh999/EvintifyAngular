import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule}from  '@angular/common/http';



@NgModule({
  declarations: [
    NavbarComponent,
    SideBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    NavbarComponent,
    SideBarComponent,
    FooterComponent,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class SharedModule { }
