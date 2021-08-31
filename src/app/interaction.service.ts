import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/models/product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private http: HttpClient) { }

  private products:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getProducts(category?:string, isSubCategory?:Boolean):Observable<Product[]> {
    if (this.products.value.length === 0) {
      this.http.get<Product[]>('assets/products.json').subscribe(res => {
        this.products.next(res);
      },
      (err: HttpErrorResponse) => {
        alert(`${err.statusText} error occured`)
      });
    }
    return this.products.asObservable().pipe(
      map(r => {
        if (category) {
          if (isSubCategory) {
            return r.filter(p => p.subCategory === category);
          }
          return r.filter(p => p.category === category);
        }
        return r;
    })
    )
  }

  setProducts(productList:Product[]):void {
    let products = this.products.value;
    for (let product of productList) {
        products = products.filter(p => p.productId !== product.productId)
        products.push(product);
    }
    this.products.next(products)
  }
  removeProduct(id: number):void {
    const products = this.products.value.filter(p => p.productId !== id);
    this.products.next(products)
  }
}
