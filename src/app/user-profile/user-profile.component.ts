import { Component, OnInit } from '@angular/core';
import { PostInt } from '../postInt';
import { SupabaseService } from '../supabase.service';
import { TopicInt } from '../topicInt';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  posts: PostInt[] = [];

  favs: PostInt[] = [];

  topics: TopicInt[] = [];

  filtered: PostInt[] = [];

  constructor(private readonly supabase: SupabaseService)
  {
    this.supabase.updates.subscribe(items => this.posts = items.filter(item => item.owner == this.supabase.user?.id))
    this.supabase.topics.subscribe(items => this.topics = items);
    this.supabase.favs.subscribe(items => this.favs = items);
  }

  ngOnInit(): void { }

  reloadPosts(filtered: PostInt[])
  {
    this.filtered = filtered;
  }

}
