import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CafeShopService } from '../../Services/cafe-shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-delete-product',
  standalone: true,
  imports: [HttpClientModule],
  providers:[CafeShopService],
  templateUrl: './update-delete-product.component.html',
  styleUrl: './update-delete-product.component.css'
})
export class UpdateDeleteProductComponent  implements OnInit{
  ID: any;
  Product: any

  constructor(myActivated: ActivatedRoute, private ProductServ: CafeShopService, private router: Router) {
    this.ID = myActivated.snapshot.params["id"]
  }
  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if(Object.keys(currentUser).length===0){
      alert('Please login first');
      this.router.navigateByUrl('/')
    }
    else if(!(currentUser.isAdmin)){
      alert('You are not authorized to view this page');
      this.router.navigateByUrl('/home')
    }
    else{
      this.ProductServ.GetProductByID(this.ID).subscribe({
        next:(data)=>{
          this.Product=data
        },
        error:(err)=> { console.log(err)}
      })
    }

  }
  Updateprd(title:any, description:any, ingredients:any, image:any,category:any,price:any) {
    let newProduct = {title, description, ingredients, image,category,price};

    //covert ingredients from string to array  (milk,coffee => ['milk','coffee'])
    const split_ingredients = newProduct.ingredients.split(",");
     newProduct.ingredients = split_ingredients

     const  intPrice = parseInt(newProduct.price)
     newProduct.price= intPrice

     this.ProductServ.updateProduct(this.ID,newProduct).subscribe({
      complete:()=>{
        console.log('updated')
        this.router.navigate(['products'])
      }
     })



   }
   
   Deleteprd(){

    let res: any = confirm('Delete Product ?')

    if (res) {

      this.ProductServ.deleteProduct(this.ID).subscribe({
        complete:()=>{
          this.router.navigate(['products'])
        }
      })
    
    }
   }
}
