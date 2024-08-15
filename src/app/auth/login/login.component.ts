import { Component } from '@angular/core';
import Cookies from 'js-cookie'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private service: GlobalService,
    private router:Router
  ) {}
  form!: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.service.getAllUsers().subscribe((users) => {
        const existingUser = users.find(
          (user) => user.email === this.form.value.email && user.password == this.form.value.password
        );
        if (!existingUser) {
          Swal.fire('Something went Wrong please Go To Signup');
        }
        if (existingUser) {
          Cookies.set('userId', existingUser.id);

          this.service
            .editUser({ token: uuidv4() }, existingUser.id)
            .subscribe({
              next: (res) => {
                Swal.fire('You are logged in', 'success');
                this.router.navigate(['']).then(() => {
                  window.location.reload();
                });              },
              error: (err) => {
                Swal.fire("Something went wrong","error")
              },
            });
        }
      });
    }
  }
}
