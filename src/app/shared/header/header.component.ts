import Cookies from 'js-cookie'
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../product';
import { Category } from './../../category';
import { Component, Input,EventEmitter,Output, HostListener, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { User } from '../../user';
import Swal from 'sweetalert2';
import { Order } from '../../order';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
dataFlag! :Category[];
@Input() categories!: Category[];
@Input() products!: Product[];
CategoryName!:string;
userId!:string;
orders!:Order[];
constructor(public srv:GlobalService,private router:Router,private Service:GlobalService){
  this.loadGrid();
}

ngOnInit(): void {


}

loadGrid(){
  this.userId = Cookies.get('userId') || "";
  this.Service.getUserOrders(this.userId).subscribe({
    next:(res)=>{
  this.orders  =res;
    }
  })
}

logout() {
  if (Cookies.get('userId')) {
    this.srv.editUser({ token: '' }, this.userId).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Logout done successfully', 'success');
        Cookies.set('userId', '');
        this.router.navigateByUrl('/login').then(() => {
          window.location.reload();
        });
        this.router.navigateByUrl('/signup').then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    });
  }
}



}




