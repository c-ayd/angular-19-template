import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hidePassword: boolean = true;

  private returnUrl: string = '/';
  private readonly afterLoginUrl: string = '/';   // NOTE: Change the route depending on your need

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{10,}$/)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.afterLoginUrl]);
    }
    else {
      this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ?? this.afterLoginUrl;
    }
  }

  onTogglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogIn(): void {
    // NOTE: Log in to the system and route the user to the 'returnUrl'
  }

  get email() {
    return this.loginForm.get('email');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) return $localize`Email is required.`;
    if (this.email?.hasError('email')) return $localize`Email is invalid.`;
    return '';
  }

  get password() {
    return this.loginForm.get('password');
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError('required')) return $localize`Password is required.`;
    if ((this.password?.value?.length ?? 0) < 10) return $localize`Password must be at least 10 characters.`;
    if (this.password?.hasError('pattern')) return $localize`Password must contain at least one letter and one number.`;
    return '';
  }
}
