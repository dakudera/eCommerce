import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor() {}

  async getProductList(categoryId: number): Promise<Product[]> {
    try {
      const url = `${this.baseUrl}/products/search/findAllByCategoryId?id=${categoryId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProductResponse = await response.json();
      return data._embedded.products;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }

  async getProductCategoriesList(): Promise<ProductCategory[]> {
    try {
      const url = `${this.baseUrl}/product-category`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProductCategoryResponse = await response.json();
      return data._embedded.productCategory;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }

  async searchProduct(keyword: string): Promise<Product[]> {
    try {
      const url = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProductResponse = await response.json();
      return data._embedded.products;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }


}

interface GetProductResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}