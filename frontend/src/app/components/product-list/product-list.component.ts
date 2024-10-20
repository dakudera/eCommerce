import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, NgFor, HttpClientModule]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1; // Default to 1
  searchMode: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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
      this.products = await this.productService.searchProduct(keyword);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      const categoryId = this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = categoryId ? +categoryId : 1;
    } else {
      this.currentCategoryId = 1;
    }

    try {
      this.products = await this.productService.getProductList(this.currentCategoryId);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

}
