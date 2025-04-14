import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//angular material
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//models
import { FormPatternsEnum } from './login.model';
import { LocalStorageKeysEnum } from '@models/local-storage.model';
import { PageUrlEnum, ParentUrlEnum } from '@models/page-url.model';
//services
import { LoginService } from './login.service';
import { LocalStorageService } from '@root/local-storage.service';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  private destroyRef = inject(DestroyRef);
  private _snackBar = inject(MatSnackBar);

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(FormPatternsEnum.Email)],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(FormPatternsEnum.Password)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  login() {
    const params = {
      email: this.loginForm.get('email')?.value || '',
    };
    this.loginService
      .login(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((res) => {
          if (res?.length > 0 && res[0].email) {
            this.localStorageService.setLocalStorageKey(
              LocalStorageKeysEnum.User,
              res
            );
            this.router.navigate([
              `${ParentUrlEnum.Dashboard}/${PageUrlEnum.Cars}`,
            ]);
            this.dialogRef.close();
            return;
          }
          this._snackBar.open('Something went wrong, please try again', 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
          });
        })
      )
      .subscribe();
  }
}
