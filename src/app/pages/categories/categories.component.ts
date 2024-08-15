import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import { Category } from '../../category';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent  {
categories!:Category[];
constructor(private global:GlobalService){
this.global.getCategories().subscribe({
  next:(res)=>this.categories = res,
  error:(err)=>console.log("error")
})
}
}
