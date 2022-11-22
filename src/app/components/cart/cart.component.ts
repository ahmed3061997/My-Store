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
    const product = this.cart.filter(x => x.id === id)[0];
    product.count = selectedOption;
    if (this.cart.length > 0)
      this.productService.addToCart(this.cart)
    this.calculateTotalPrice()
  }

  removeCart(id: number): void {
    const index = this.cart ? this.cart.findIndex(cart => cart.id === id) : -1;
    if (index != -1 && this.cart.length > 0) {
      this.cart.splice(index, 1)
      this.productService.addToCart(this.cart)
      this.calculateTotalPrice()
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((acc: number, val: Product) => {
      return acc + val.price * Number(val.count);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  checkoutSuccess(firstName: string): void {
    this.productService.clearCart();
    this.route.navigateByUrl(`order-placed/${firstName}/${this.totalPrice}`);
  }
}
