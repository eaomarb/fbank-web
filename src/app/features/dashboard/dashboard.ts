import { Component } from '@angular/core';
import { UserNavbar } from "../../shared/layout/user-navbar/user-navbar";
import { Footer } from "../../shared/layout/footer/footer";

@Component({
  selector: 'dashboard',
  imports: [UserNavbar, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
