import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductCount } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  productCount: string[] = ProductCount;
  totalPrice: number = 0;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.cart = this.productService.getCartProducts();
    this.calculateTotalPrice();
  }

  selectChange(id: number, event: any): void {
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const cartIdx = this.cart.findIndex(x => x.id === id);
    cartIdx != -1 && this.cart.length > 0 ? this.cart[cartIdx].count = selectedOption : null;
    this.cart.length > 0 ? this.productService.addToCart(this.cart) : null;
    this.calculateTotalPrice()
  }

  removeCart(id: number): void {
    const cartIdx = this.cart ? this.cart.findIndex(cart => cart.id === id) : -1;
    if (cartIdx != -1 && this.cart.length > 0) {
      this.cart.splice(cartIdx, 1)
      this.productService.addToCart(this.cart)
      this.calculateTotalPrice()
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((acc: number, val: any) => {
      return acc + val.price * Number(val.count);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  checkoutSuccess(firstName: string): void {
    this.productService.clearCart();
    this.route.navigateByUrl(`order-placed/${firstName}/${this.totalPrice}`);
  }
}
