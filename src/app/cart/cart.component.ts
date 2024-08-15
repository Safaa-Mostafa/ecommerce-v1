import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Order } from '../order';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user';
import Cookies from 'js-cookie';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  userId!: string;
  order!: Order[];
  productInfo!: Product;
  constructor(public Service: GlobalService, private router: Router) {
    this.userId = Cookies.get('userId') || '';
    if (this.userId != '') {
      this.loadGrid();
    }
  }

  public loadGrid() {
    this.Service.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.order = res;
      },
      error: (err) => {
        Swal.fire('Something went wrong try again');
      },
    });
  }

  onChange(op: string, pr: Order) {
    this.Service.getProduct(pr.productId).subscribe({
      next: (res) => {
        this.productInfo = res;
      },
    });
    if (this.productInfo) {
      if (op == '+') {
        this.productInfo.availableInStock--;
        pr.quantity++;
      } else if (op == '-') {
        if (pr.quantity > 0) {
          this.productInfo.availableInStock++;
          pr.quantity--;
        }
      }
    }
  }
  Delete(or: Order) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((confirmd: any) => {
      if (confirmd.isConfirmed) {
        console.log(confirmd);
        this.Service.deleteOrder(or).subscribe({
          next: (res) => {
            Swal.fire(
              'Thank you...',
              'Your Order deleted successfully!',
              'success'
            );
            this.loadGrid();
          },
          error: (err) =>
            Swal.fire('oops...', 'maybe something wrong!', 'error'),
        });
        Swal.fire('Poof! Your Order has been deleted!', 'success');
      } else {
        Swal.fire('Your Order is safe!');
      }
    });
  }
}
