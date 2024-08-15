import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { GlobalService } from '../services/global.service';
import { Product } from '../product';
import { Category } from '../category';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesComponent,ItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products!:Product[];
  categories!:Category[];
  constructor(private Service:GlobalService,private router:Router){


  }
  selectCategory(i:any){
    if (i) {
      this.Service.getProductsByCategoryId(i).subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  };



  goToCart() {
    this.router.navigate(['/cart']);
  }

  continueShopping() {
    console.log('Continuing shopping...');
    this.router.navigate(['/items']);
  }


  }

