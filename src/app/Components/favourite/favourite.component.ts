import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent implements OnInit{
  constructor(){}
  FavProducts:any=[];
    ngOnInit(): void {
      this.FavProducts =  JSON.parse(localStorage.getItem( "Favourite" )||"[]");
    
    }
  
  }