import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
//components
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly dialog = inject(MatDialog);

  login() {
    this.dialog.open(LoginComponent, {
      disableClose: true,
    });
  }
}
