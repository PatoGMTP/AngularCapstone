import { Component, OnInit } from '@angular/core';
import { SupabaseService } from "./supabase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCapstone';

  constructor(private readonly supabase: SupabaseService) { }
  
  session = this.supabase.session;

  ngOnInit()
  {
    this.supabase.authChanges((_, session) => {
      console.log("Sauce")
      this.session = session;
    });
  }

  signIn(): void
  {
    this.supabase.signInWithGoogle();
  }

  signOut(): void
  {
    this.supabase.signOut();
  }

  async print(): Promise<void>
  {
    console.log(this.supabase.user);

    let resp = await this.supabase.user_posts
    resp.data.forEach(item => console.log(item));

    this.supabase.all_posts.then(resp => resp.data.forEach(console.log));

    // console.log(await this.supabase.user_posts);
    // console.log(await this.supabase.all_posts);
    // console.log(await this.supabase.user_topics);
    // console.log(await this.supabase.all_topics);
    // console.log(await this.supabase.profile);
    // console.log(await this.supabase.all_profiles);

    // this.supabase.testPost();
  }
}
