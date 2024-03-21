import { Component,HostListener, OnChanges, OnInit, SimpleChanges, effect, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CartItem } from '../../Models/CartItem';
import { Auth, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FooterComponent,HttpClientModule,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  currentUser:any;
  constructor(private router:Router,private afAuth:Auth){}

  onLogout(){
    localStorage.clear()
    signOut(this.afAuth)
    this.router.navigateByUrl("/")
  }
  cart: CartItem[] = [];

  ngOnInit(): void {
    // Fixed Navbar Scroll Listener
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
    this.cart = JSON.parse(localStorage.getItem('cart') || "[]");
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")||"[]")
  }

  handleScroll(): void {
    const scrollTop = window.scrollY;
    const isMobile = window.innerWidth < 992;
    const fixedTopElement = document.querySelector('.fixed-top') as HTMLElement;

    if (isMobile) {
      if (scrollTop > 55) {
        fixedTopElement.classList.add('shadow');
      } else {
        fixedTopElement.classList.remove('shadow');
      }
    } else {
      if (scrollTop > 55) {
        fixedTopElement.classList.add('shadow');
        fixedTopElement.style.top = '-55px';
      } else {
        fixedTopElement.classList.remove('shadow');
        fixedTopElement.style.top = '0';
      }
    }
  }
  getCartItemCount(): number{
    return  this.cart.length;
  }
}


