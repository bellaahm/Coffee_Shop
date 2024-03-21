import { Component, OnInit } from '@angular/core';
import { CafeShopService } from '../../Services/cafe-shop.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Product } from '../../Models/Product';
import { NotificationService } from '../../Services/notification.service';
// import { Cafe } from '../../../Models/Cafe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[CafeShopService,NotificationService],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
constructor(private shopServ:CafeShopService, private notificServ:NotificationService){}
Products:any=[];
Cart: any = [];
FavProducts:any=[];
categories:any=[];
filteredArray:any=[];
  ngOnInit(): void { 
this.GetAll()
this.getCategory()
  }
  GetAll(){
    this.shopServ.GetAllProducts().subscribe({
      next:(data)=>{
    this.Products=data;
    this.filteredArray=data
      }
      ,
      error:(err)=>{
      }
    })
  }
  getCategory(){
    this.shopServ.GetCategory().subscribe((data:any)=>{
      console.log(data)
        this.categories=data
      }

)}
GetFiltered(event:any){
let categoryName = event.target.value
console.log(categoryName)
this.filteredArray=this.Products.filter((item:any)=>( 
  item.category==categoryName
  )
)

console.log(this.filteredArray)
}


addToFav(product: any):void{
  this.FavProducts =  JSON.parse(localStorage.getItem( "Favourite" )||"[]");
  if (this.FavProducts.length !== 0) {
    let foundedProd = this.FavProducts.find((e:any) => e.id === product.id) 
    if (foundedProd) {
            alert(`${product.title} Already In  Favourite `)
    } else {
      alert(`${product.title}  Added To  Favourite`);
      this.FavProducts.push({...product });
    }
  } else {
    alert(`${product.title}  Added To  Favourite`);

    this.FavProducts.push({...product });
  }
  localStorage.setItem('Favourite', JSON.stringify(this.FavProducts));
}

addToCart(product: Product): void { 
  this.Cart = JSON.parse(localStorage.getItem('cart') || "[]");
  if (this.Cart.length !== 0) {
    let foundedProd = this.Cart.find((e:any) => e.id === product.id) 
    if (foundedProd) {
            // this.notificServ.showSuccess(`${product.title} Already In The Card 
            // Quantity Updated ${foundedProd.quantity}`);
            foundedProd.quantity++;
            alert(`${product.title} Already In The Card 
                Quantity Updated ${foundedProd.quantity}`)
    } else {
    // this.notificServ.showSuccess(`${product.title}  Added To Your Card`);
      alert(`${product.title}  Added To Your Card`);
      this.Cart.push({...product, quantity : 1 });
    }
  } else {
    // this.notificServ.showSuccess(`${product.title}  Added To Your Card`);
    alert(`${product.title}  Added To Your Card`);

    this.Cart.push({...product, quantity : 1 });
  }
  localStorage.setItem('cart', JSON.stringify(this.Cart));
  // setTimeout(()=>location.reload(),4000);
  // console.log(product)
}
}
