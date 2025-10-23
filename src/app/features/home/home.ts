import { Component } from '@angular/core';
import { HomeNavbar } from "../../shared/layout/home-navbar/home-navbar";
import { Footer } from "../../shared/layout/footer/footer"

@Component({
  selector: 'home',
  imports: [HomeNavbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
