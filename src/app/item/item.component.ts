import Cookies from 'js-cookie';
import { GlobalService } from './../services/global.service';
import { Component, Input, input, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import { RouterLink, RouterOutlet } from '@angular/router';
import { Order } from '../order';
import { Category } from '../category';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { SliderComponent } from '../pages/categories/slider/slider.component';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    CategoriesComponent,
    FormsModule,
    SweetAlert2Module,
    SliderComponent,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  @Input() hideSpecificTag: boolean = false;

  prdName: string = '';
  products: Product[] = [];
  categoryId!: any;
  containue!: boolean;
  categories!: Category[];
  searchForm!: FormGroup;
  order!: Order;
  orderInfo: any;
  orders!: Order[];
  newOrder!: Order;
  olderOrder!: Order;
  userInfo: any;
  constructor(
    public Service: GlobalService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.Service.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  selectCategory(i: any) {
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
  }

  filterProducts() {
    this.router.navigateByUrl;
  }

  onChange(op: string, pr: Product) {
    if (op == '+') {
      pr.availableInStock--;
      pr.quantity++;
    } else if (op == '-') {
      if (pr.quantity > 0) {
        pr.availableInStock++;
        pr.quantity--;
      }
    }
  }
  getStarArray(rating: number[]): number[] {
    const averageRating = rating.reduce((a, b) => a + b, 0) / rating.length;
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5 ? 0.5 : 0;
    return Array(fullStars)
      .fill(1)
      .concat(
        halfStar ? [0.5] : [],
        Array(5 - fullStars - (halfStar ? 1 : 0)).fill(0)
      );
  }
  addItemToCart(obj: Product) {
    if (Cookies.get('userId')) {
      this.Service.getAllOrders().subscribe({
        next: (res) => {
          this.orders = res;
          let dh = this.orders.filter(
            (o) =>
              o.productName === obj.name && o.userId === this.Service.userId
          );
          if (dh[0]) {
            this.olderOrder = {
              id: dh[0].id,
              productId: obj.id,
              categoryId: obj.categoryId,
              totalPrice:
                (obj.quantity + dh[0].quantity) * obj.priceAfterDiscount,
              userId: this.Service.userId,
              quantity: obj.quantity + dh[0].quantity,
              productImage: obj.img,
              productName: obj.name,
            };
            this.Service.editOrder(
              this.olderOrder,
              this.olderOrder.id
            ).subscribe({
              next: (res) => {
                Swal.fire({
                  title: 'Item Added to Cart!',
                  text: 'Do you want to continue shopping or go to your cart?',
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'Go to Cart',
                  cancelButtonText: 'Continue Shopping',
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.goToCart();
                  } else {
                    this.continueShopping();
                  }
                });
                // return true;
              },
              error: (err) => {
                Swal.fire('Error', 'Something went wrong');
              },
            });
            // return false;
          } else {
            this.newOrder = {
              id: uuidv4(),
              productId: obj.id,
              categoryId: obj.categoryId,
              totalPrice: obj.quantity * obj.priceAfterDiscount,
              userId: this.Service.userId,
              quantity: obj.quantity,
              productImage: obj.img,
              productName: obj.name,
            };
            this.Service.addOrder(this.newOrder).subscribe({
              next: (res) => {
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
        } else {
      this.router.navigateByUrl('/signup');
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  continueShopping() {
    console.log('Continuing shopping...');
    this.router.navigate(['/items']);
  }

  filterByName() {
    this.Service.getItems().subscribe({
      next: (res) => {
        this.products = res;
      },
    });
    this.products = this.products.filter((product) =>
      product.name.toLowerCase().startsWith(this.prdName.toLowerCase())
    );
  }

  filter() {
    this.router.navigateByUrl(`/items?categoryId=${this.categoryId}`);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'] ? +params['categoryId'] : 1;
      if (this.categoryId !== null) {
        this.Service.getProductsByCategoryId(this.categoryId).subscribe(
          (products: Product[]) => {
            this.products = products;
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    });
  }
}
