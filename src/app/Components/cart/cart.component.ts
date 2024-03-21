import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { CartapiService } from '../../Services/cartapi.service';
import { NotificationService } from '../../Services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule],
  providers: [NotificationService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  CartItems: any;
  totalPrice: number=0;
  constructor(private notificServ:NotificationService,private router:Router) { }
  ngOnInit(): void {
    this.CartItems = JSON.parse(localStorage.getItem('cart') || "Empty Card")
    console.log(this.CartItems);
  }
  decQuant(cartItem: any) {
    if (cartItem.quantity > 0) {
        cartItem.quantity--;
    }
    // console.log("Quantity Decreased")
  }
  incQuant(cartItem: any) {
    if (cartItem.quantity >= 0) {
        cartItem.quantity++;
    }
    // console.log("Quantity Decreased")
  }
  removeCartItem(cartItem:any) {
    this.CartItems = this.CartItems.filter((item: any) => item.id !== cartItem.id)
    localStorage.setItem("cart", JSON.stringify(this.CartItems))
    // alert(`${cartItem.title}  Removed From Your Card`);
    this.notificServ.showSuccess(`${cartItem.title}  Removed From Your Card`);
    setTimeout(()=>location.reload(),4000);
  }

  
  calcTotalPrice(items: any[]){
      let sum = 0;
      items.forEach((item: any)=>{
          sum += item.price * item.quantity;
      })
      return sum;
  }
}

