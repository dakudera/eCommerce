import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => this.handleProductDetails()
    )
  }

  async handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductList(productId);
    try {
      this.product = await this.productService.getProduct(productId);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

}
