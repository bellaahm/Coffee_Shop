import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Router, RouterModule } from '@angular/router';
// import { ProductsService } from '../../services/products.service';
import { CafeShopService } from '../../Services/cafe-shop.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule,ProductComponent,RouterModule],
  providers:[CafeShopService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productServ:CafeShopService,private router:Router){}

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
  
      this.productServ.GetAllProducts().subscribe({

        next:(data)=>{
          this.Products = data;
        },
        error:(err)=>{console.log(err)}
      })
    }
    
  }

}
