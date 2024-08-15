import { Component } from '@angular/core';
import Cookies from 'js-cookie'
import {
  FormBuilder,

  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../user';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder,private service:GlobalService,private router:Router) {}
  userInfo!: User;

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['', [Validators.email,Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.service.getAllUsers().subscribe(
        (users) => {
          const existingUser = users.find(
            (user) => user.email === this.form.value.email
          );

          if (existingUser) {
            Swal.fire('Error', 'Email already registered', 'error');
          } else {            this.userInfo = {
              id: uuidv4(),
              name: this.form.value.name,
              email: this.form.value.email,
              password: this.form.value.password,
              token: uuidv4(),
            };

            this.service.addUser(this.userInfo).subscribe({
              next: (res) => {
                Cookies.set('userId', this.userInfo.id);
                Swal.fire('Success', 'User registered successfully', 'success');
                this.router.navigate(['']).then(() => {
                  window.location.reload();
                });
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
