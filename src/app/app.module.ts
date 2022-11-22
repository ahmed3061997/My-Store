import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    OrderPlacedComponent,
    ProductDetailsComponent,
    NavbarComponent,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
