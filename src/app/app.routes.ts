import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ShopComponent } from './Components/shop/shop.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { ShopdetailsComponent } from './shopdetails/shopdetails.component';
import { CartComponent } from './Components/cart/cart.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { ProductsComponent } from './Components/products/products.component';
import { UpdateDeleteProductComponent } from './Components/update-delete-product/update-delete-product.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { LoginComponent } from './Components/login/login.component';
import { FavouriteComponent } from './Components/favourite/favourite.component';

export const routes: Routes = [
 {path:"",redirectTo:"login",pathMatch:"full"},
 {path:"login",component:LoginComponent},
//  {path:"home",component:HomeComponent},
//  {path:"shop", component:ShopComponent},
//  {path:"cart",component:CartComponent},
//  {path:"contact",component:ContactComponent},
//  {path:"shopdetails/:id", component:ShopdetailsComponent},
//  {path:"products",component:ProductsComponent},
//  {path:"update/:id",component:UpdateDeleteProductComponent},
//  {path:"add",component:AddProductsComponent},
//  {path:"reviews",component:ReviewsComponent},
{path:"", component:NavBarComponent, children:[
    {path:"home",component:HomeComponent},
    {path:"products",component:ProductsComponent},
    {path:"shop", component:ShopComponent},
     {path:"cart",component:CartComponent},
     {path:"contact",component:ContactComponent},
     {path:"shopdetails/:id", component:ShopdetailsComponent},
     {path:"products",component:ProductsComponent},
     {path:"update/:id",component:UpdateDeleteProductComponent},
     {path:"add",component:AddProductsComponent},
     {path:"reviews",component:ReviewsComponent},
    {path:'favourite', component:FavouriteComponent},
    // {path:"**",component:ErrorComponent}
]}


];
