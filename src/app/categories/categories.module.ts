import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminGuard } from '../authentication/admin.guard';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

@NgModule({
  declarations: [CreateCategoryComponent, CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild([
      {
        path: 'categories/create',
        component: CreateCategoryComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  exports: [CreateCategoryComponent, CategoryListComponent],
})
export class CategoriesModule {}
