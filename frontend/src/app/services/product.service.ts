import { Injectable } from '@angular/core';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor() {}

  async getProductList(categoryId: number): Promise<Product[]> {
    try {
      const url = `${this.baseUrl}/search/findAllByCategoryId?id=${categoryId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetResponse = await response.json();
      return data._embedded.products;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
