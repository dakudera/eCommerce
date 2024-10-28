import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor() { }

  async placeOrder(purchase: Purchase): Promise<any> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchase)
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      return await response.json();
    } catch (error) {
      // Handle errors (network issues, server errors, etc.)
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }

}
