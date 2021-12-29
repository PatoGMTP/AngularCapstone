import { Component, OnInit } from '@angular/core';
import { PostInt } from '../postInt';
import { SupabaseService } from '../supabase.service';
import { TopicInt } from '../topicInt';

@Component({
  selector: 'app-public-posts',
  templateUrl: './public-posts.component.html',
  styleUrls: ['./public-posts.component.scss']
})
export class PublicPostsComponent implements OnInit {

  posts: PostInt[] = [];

  topics: TopicInt[] = [];

  filtered: PostInt[] = [];

  constructor(private readonly supabase: SupabaseService) 
  {
    this.supabase.updates.subscribe(items => this.posts = items);
    this.supabase.topics.subscribe(items => this.topics = items);
  }

  ngOnInit(): void
  {
    // this.supabase.all_topics.then(resp => this.topics = resp.data)
  }

  reloadPosts(filtered: PostInt[])
  {
    this.filtered = filtered;
  }

}
