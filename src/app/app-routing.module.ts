import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order-placed/:firstName/:totalPrice', component: OrderPlacedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
