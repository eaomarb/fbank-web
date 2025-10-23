import { Component } from '@angular/core';
import { HomeNavbar } from "../../../shared/layout/home-navbar/home-navbar";
import { RouterLink } from '@angular/router';
import { Footer } from '../../../shared/layout/footer/footer';

@Component({
  selector: 'login',
  imports: [HomeNavbar, RouterLink, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
