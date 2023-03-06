import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, exhaustMap, map, take, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from './product.model';
import { AuthService } from '../authentication/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  private url = environment.database_url;

  constructor(private http: HttpClient, private authservice: AuthService) {}

  getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products.json/').pipe(
      map((data) => {
        const products: Product[] = [];

        for (const key in data) {
          if (categoryId) {
            if (data[key].categoryId == categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }

        return products;
      })
    );
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + 'products/' + id + '.json');
  }

  createProduct(product: Product): Observable<Product> {
    return this.authservice.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http.post<Product>(
          this.url + 'products.json?auth=' + user?.token,
          product
        );
      })
    );
  }
}
