import { Component, OnInit } from '@angular/core';
import { PostInt } from '../postInt';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  posts: PostInt[] = [];

  constructor(private readonly supabase: SupabaseService)
  {
    this.supabase.updates.subscribe(items => this.posts = items.filter(item => item.owner == this.supabase.user?.id))
  }

  ngOnInit(): void {
  }

}
