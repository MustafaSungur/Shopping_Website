import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  loading: boolean = false;
  isLike: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  likeClick(): void {
    if (!this.isLike) {
      this.isLike = true;
    } else {
      this.isLike = false;
    }
  }
  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.productService.getProductById(id).subscribe((result) => {
        this.product = { ...result, id: id };
        this.loading = false;
      });
    });
  }
}
