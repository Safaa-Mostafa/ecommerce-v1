import { Component, Input } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Category } from '../category';
import { Product } from '../product';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  @Input() hideSpecificTag: boolean = false;

  title = 'Ecommerce-v1';
  categoryName!: string;
  prods!: Product[];
  category!: Category[];

  productFiltered!:Product[];
  categoryFilter!:Category[];
  getAll!:string;
  constructor(public Service: GlobalService) {
    this.Service.getItems().subscribe({
      next:(data)=>{
        this.prods =data;
      },
      error:(error)=>{
        console.log('error Fetching',error);
      }
    })
    this.Service.getCategories().subscribe({
      next:(data)=>{
        this.category = data;
      },
      error:(error)=>{
        console.log('error Fetching',error);
      }
    })
  }

  onCategoryChange(newProducts: string | any): void {
    if (typeof newProducts == 'object') {
      this.categoryFilter = this.category.filter(
        (e) => e.name === newProducts.target.value.toLowerCase()
      );
      if (this.categoryFilter.length == 1) {
        this.productFiltered = this.prods.filter(
          (e) => e.categoryId === this.categoryFilter[0].id
        );
      }else if(newProducts.target.value.toLowerCase() == 'all'){
        this.productFiltered=this.prods;
      }
       else {
        this.productFiltered = this.productFiltered;
      }



    } else if (typeof newProducts == 'string') {
      this.categoryFilter = this.category.filter(
        (e) => e.name === newProducts.toLowerCase()
      );
      if (this.categoryFilter.length == 1) {
        this.productFiltered = this.prods.filter(
          (e) => e.categoryId ===  this.categoryFilter[0].id
        );
      } else {
        this.productFiltered = this.productFiltered;
      }
    }
  }
}
