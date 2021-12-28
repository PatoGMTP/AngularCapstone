import { Component, OnInit } from '@angular/core';
import { PostInt } from '../postInt';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-public-posts',
  templateUrl: './public-posts.component.html',
  styleUrls: ['./public-posts.component.scss']
})
export class PublicPostsComponent implements OnInit {

  posts: PostInt[] = [];

  constructor(private readonly supabase: SupabaseService) 
  {
    this.supabase.updates.subscribe(items => this.posts = items)
  }

  ngOnInit(): void {
    // this.supabase.all_posts.then(resp => this.posts = resp.data)
  }

  reloadPosts(filtered: PostInt[])
  {
    console.log(filtered);
  }

}
