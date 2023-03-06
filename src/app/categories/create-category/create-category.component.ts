import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers: [CategoryService],
})
export class CreateCategoryComponent implements OnInit {
  model: any = {};
  count: boolean = true;
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveCategory(form: any) {
    console.log(form.value.name);
    this.categoryService
      .createCategory({ id: 0, name: form.value.name })
      .subscribe((data) => {
        this.router.navigate(['/products']);
      });
  }
}
