import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {


  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.listProductCategories();
      }
    );
  }

  async listProductCategories() {
    try {
      this.productCategories = await this.productService.getProductCategoriesList();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

}
