import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CafeShopService } from '../Services/cafe-shop.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shopdetails',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[CafeShopService],
  templateUrl: './shopdetails.component.html',
  styleUrl: './shopdetails.component.css'
})
export class ShopdetailsComponent  implements OnInit {
  ID: any;
  product: any;
  stars: string[] = [
    'fas fa-star',
    'far fa-star',
    'far fa-star',
    'far fa-star',
    'far fa-star',
  ];

  constructor(
    myActivate: ActivatedRoute,
    private productService: CafeShopService
  ) {
    this.ID = myActivate.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.GetProductByID(this.ID).subscribe({
      next: (data) => {
        this.product = data;
        const apiRating = this.product.star;
        this.setStarRating(apiRating);
        const reviewRating1 = this.product.reviews[0].rating;
        this.setReviewRating1(reviewRating1);
        const reviewRating2 = this.product.reviews[1].rating;
        this.setReviewRating2(reviewRating2);
      },
    });
  }

  setStarRating(rating: any): void {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < rating) {
        this.stars[i] = 'fas fa-star';
      } else {
        this.stars[i] = 'far fa-star';
      }
    }
  }
  setReviewRating1(rating: any): void {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < rating) {
        this.stars[i] = 'fas fa-star';
      } else {
        this.stars[i] = 'far fa-star';
      }
    }
  }
  setReviewRating2(rating: any): void {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < rating) {
        this.stars[i] = 'fas fa-star';
      } else {
        this.stars[i] = 'far fa-star';
      }
    }
  }


}
