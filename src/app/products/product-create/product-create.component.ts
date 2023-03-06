import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../categories/category.model';
import { CategoryService } from '../../categories/category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService],
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  error: string;

  //two-way bining
  model: any = {
    categoryId: 0,
    isActive: false,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  saveProduct(form: NgForm) {
    const extensions = ['jpg', 'jpeg', 'png'];
    const extension = this.model.imgUrl.split('.').pop();
    if (extensions.indexOf(extension) == -1) {
      this.error = 'Resim uzantısı jpg, jpeg, png olamlıdır';
      return;
    }
    if (this.model.categoryId == 0) {
      this.error = 'Kategori Seçmediniz !';
      return;
    }

    const product = {
      id: 1,
      name: this.model.name,
      price: this.model.price,
      description: this.model.description,
      imgUrl: this.model.imgUrl,
      isActive: this.model.isActive,
      categoryId: this.model.categoryId,
    };
    if (form.valid) {
      this.productService.createProduct(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    } else {
      this.error = 'Formu kontrol ediniz !';
    }
  }
}
