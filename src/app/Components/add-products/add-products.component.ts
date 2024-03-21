import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CafeShopService } from '../../Services/cafe-shop.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  providers:[CafeShopService],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit {
  constructor(private producrdServ:CafeShopService,private router:Router){}
  
  Products:any = []
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
      this.producrdServ.GetAllProducts().subscribe({

        next:(data)=>{
          this.Products = data;
        },
        error:(err)=>{console.log(err)}
      })
    }

   
  }
  Addprd(title:any, description:any, ingredients:any, image:any,category:any,price:any){
    
    let id = (this.Products.length+1).toString()

    let newProduct = {id,title, description, ingredients, image,category,price};

    //convert ingredients from string to array  (milk,coffee => ['milk','coffee'])
    const split_ingredients = newProduct.ingredients.split(",");
     newProduct.ingredients = split_ingredients

    let PriceStr = parseInt(newProduct.price)
    newProduct.price = PriceStr
    
    this.producrdServ.AddProduct(newProduct).subscribe({
      complete:()=>{
        this.router.navigate(['products'])
      }
    });
    // this.router.navigate(['products'])

  }

  myRegValid = new FormGroup({
    title:new FormControl(''),
    description:new FormControl('',[Validators.min(20),Validators.max(30)]),
    ingredients:new FormControl(''),
    image:new FormControl(''),
    category:new FormControl('',[Validators.min(20),Validators.max(30)]),


  });
}
