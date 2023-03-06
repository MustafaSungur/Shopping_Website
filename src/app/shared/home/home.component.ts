import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts(0).subscribe((products) => {
      this.products = products;
    });
  }
}
