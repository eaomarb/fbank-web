import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserNavbar } from "../../shared/layout/user-navbar/user-navbar";
import { Footer } from "../../shared/layout/footer/footer";
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'dashboard',
  imports: [UserNavbar, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  private readonly auth = inject(Auth);
  readonly currentUser = this.auth.currentUser;
}
