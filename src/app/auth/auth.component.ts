import { Component, OnInit } from '@angular/core';
import { SupabaseService } from "../supabase.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loading = false;

  constructor(private readonly supabase: SupabaseService) { }

  async handleLogin(input: string) {
    try {
      this.loading = true;
      await this.supabase.signIn(input);
      alert('Check your email for the login link!');
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      this.loading = false;
    }
  }

  signInGoogle(): void
  {
    this.supabase.signInWithGoogle();
  }

}
