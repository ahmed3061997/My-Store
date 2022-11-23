import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number | null = null;
  products: Product[] = [];
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
    this.productService.getProduct().subscribe(res => {
      this.products = res;
      this.product = this.getProductById(this.id)
      console.log(this.product)
    })
  }
  
  getProductById(id: number | null): Product {
    return this.products.filter(product => product.id === id)[0];
  }

  onSubmit(product: Product, event: any): boolean {
    let newProduct: Product[] = [];
    let message: string = '';
    let isCartOptionExist: boolean = false;

    const selectedOption = event.target[0].options[event.target[0].options.selectedIndex].value;
    const products: Product[] | [] = this.productService.getCart();

    const index = products.findIndex(cart => cart.id === product.id)
    newProduct = products;

    if ((index === -1) || (products.length === 0)) {
      newProduct.push(Object.assign(product, { count: selectedOption }))
      message = `New Item '${product.name}' added to cart`;
    } else {
      const count: string = newProduct[index].count;
      isCartOptionExist = selectedOption === count

      if (isCartOptionExist) {
        message = `${count} Item(s) of '${product.name}' already exist in cart.`;
      } else {
        newProduct[index].id = product.id;
        newProduct[index].count = selectedOption;
        message = `${count} Item(s) of '${product.name}' already exist in cart. Updated to ${selectedOption}`;
      }
    }
    !isCartOptionExist ? this.productService.updateCart(newProduct) : null;

    alert(message);
    return false;
  }

}
