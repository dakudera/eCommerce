import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor() { }

  async getProduct(productId: number): Promise<Product> {
    try {
      const url = `${this.baseUrl}/products/${productId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }

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

  async getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number
  ): Promise<GetProductResponse> {
    try {
      const url = `${this.baseUrl}/products/search/findAllByCategoryId?`
        + `id=${categoryId}&page=${page}&size=${pageSize}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProductResponse = await response.json();
      return data;
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

  async searchProductPaginate(
    page: number,
    pageSize: number, 
    keyword: string
  ): Promise<GetProductResponse> {
    try {
      const url = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`
        + `&page=${page}&size=${pageSize}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProductResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }


}

interface Page {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

interface GetProductResponse {
  _embedded: {
    products: Product[];
  },
  page: Page
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}