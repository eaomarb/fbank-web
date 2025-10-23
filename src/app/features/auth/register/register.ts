import { Component } from '@angular/core';
import { HomeNavbar } from "../../../shared/layout/home-navbar/home-navbar";
import { Footer } from '../../../shared/layout/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'register',
  imports: [HomeNavbar, Footer, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}