import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, NgFor, HttpClientModule, RouterModule, NgbModule]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 100;


  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  async handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    try {
      const response = await this.productService.searchProductPaginate(this.pageNumber - 1, this.pageSize, keyword);
      this.processResult(response);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async handleListProducts() {

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      const categoryId = this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = categoryId ? +categoryId : 1;
    } else {
      this.currentCategoryId = 1;
    }

    try {
      const response = await this.productService.getProductListPaginate(
        this.pageNumber - 1, this.pageSize, this.currentCategoryId
      );
      this.processResult(response);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  updatePageSize(value: string){
    this.pageSize=+value;
    this.pageNumber=1;
    this.listProducts();
  }

  processResult(response: any){
    this.products = response._embedded.products;
    this.pageNumber = response.page.number + 1;
    this.pageSize = response.page.size;
    this.totalElements = response.page.totalElements;
  }


  addToCart(product: Product){
    
    const cartItem: CartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);

  }


}
