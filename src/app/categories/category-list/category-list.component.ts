import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { ProductService } from '../../products/product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [ProductService, CategoryService],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  selectCategory(selectedCategory?: Category) {
    if (!selectedCategory) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = selectedCategory;
    }
  }
}
