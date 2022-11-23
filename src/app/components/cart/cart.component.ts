import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.cart = this.productService.getCart();
    this.calculateTotalPrice();
  }

  selectChange(id: number, event: any): void {
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const product = this.cart.filter(x => x.id === id)[0];
    product.count = selectedOption;
    if (this.cart.length > 0)
      this.productService.updateCart(this.cart)
    this.calculateTotalPrice()
  }

  removeCart(id: number): void {
    const index = this.cart ? this.cart.findIndex(cart => cart.id === id) : -1;
    if (index != -1 && this.cart.length > 0) {
      this.cart.splice(index, 1)
      this.calculateTotalPrice()
      this.productService.updateCart(this.cart)
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((acc: number, val: Product) => {
      return acc + val.price * Number(val.count);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  success(firstName: string): void {
    this.productService.resetCart();
    this.route.navigateByUrl(`success/${firstName}/${this.totalPrice}`);
  }
}
