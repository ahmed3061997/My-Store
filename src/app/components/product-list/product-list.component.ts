import { Component, OnInit } from '@angular/core';
import { Product, ProductCount } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productCount: string[] = ProductCount;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(res => {
      this.products = res;
    });
  }

  onSubmit(product: Product, event: any): boolean {
    let newProduct: Product[] = [];
    let message: string = '';
    let isCartOptionExist: boolean = false;

    const selectedOption = event.target[0].options[event.target[0].options.selectedIndex].value;
    const products: Product[] | [] = this.productService.getCartProducts();

    const cartIdx = products.findIndex(cart => cart.id === product.id)
    newProduct = products;

    if ((cartIdx === -1) || (products.length === 0)) {
      newProduct.push(Object.assign(product, { count: selectedOption }))
      message = `New Item '${product.name}' added to cart`;
    } else {
      const count: string = newProduct[cartIdx].count;
      isCartOptionExist = selectedOption === count

      if (isCartOptionExist) {
        message = `${count} Item(s) of '${product.name}' already exist in cart.`;
      } else {
        newProduct[cartIdx].id = product.id;
        newProduct[cartIdx].count = selectedOption;
        message = `${count} Item(s) of '${product.name}' already exist in cart. Will be updated to ${selectedOption}`;
      }

    }
    !isCartOptionExist ? this.productService.addToCart(newProduct) : null;

    alert(message);

    this.printLocalData(); // for debugging
    return false;
  }

  printLocalData(): void {
    console.log(this.productService.getProduct())
  }
}
