import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
  ],
  exports: [AuthComponent],
})
export class AuthenticationModule {}
