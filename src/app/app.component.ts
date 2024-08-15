import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ItemComponent } from './item/item.component';
import { GlobalService } from './services/global.service';
import { Product } from './product';
import { LoginComponent } from './auth/login/login.component';
import { Category } from './category';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    ItemComponent,
    LoginComponent,
    SignupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  implements OnInit  {
  title = 'Ecommerce-v1';
  private router : Router;

  constructor(public Service: GlobalService,private routerd:Router) {
    this.router = routerd;

  }

    ngOnInit() {
      if (typeof window !== 'undefined') {
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          window.scrollTo(0, 0);
        });
      }
    }

}
