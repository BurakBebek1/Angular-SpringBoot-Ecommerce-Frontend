import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

@Injectable({
  providedIn: "root",
})
export class CartService {
  carItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.carItems.length > 0) {
      //find the item in the cart based on item id
      existingCartItem = this.carItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );
      //check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      //increment the quntity
      existingCartItem.quantity++;
    } else {
      //just add the item to array
      this.carItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.carItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
