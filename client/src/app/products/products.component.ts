import { Product } from './../modal/product';
import { ErrorStateMatcher } from '@angular/material/core';

import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from '../modal/product';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  data: Product[] = [];
  displayedColumns: string[] = ['prodName', 'prodDesc', 'prodPrice'];
  isLoadingResults = true;
  showProductPage = false;

  productForm: FormGroup;
  prodName = '';
  prodDesc = '';
  prodPrice = '';
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prodName': [null, Validators.required],
      'prodDesc': [null, Validators.required],
      'prodPrice': [null, Validators.required]
    });
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.data = products;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  addProduct() {
    this.showProductPage = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  onFormSubmit(form) {
    this.productService.saveProduct(form)
    .subscribe(
      product => this.data.push(product),
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.showProductPage = false;
    this.productForm.reset();
  }

  deleteProduct(prod) {
    const index: number = this.data.indexOf(prod);
    if (index !== -1) {
        this.data.splice(index, 1);
        this.productService.deleteProduct(prod.id)
        .subscribe();
    }
  }

}
