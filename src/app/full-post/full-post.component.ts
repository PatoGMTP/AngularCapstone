import { Component, ComponentRef, OnInit } from '@angular/core';
import { PostInt } from '../postInt';
import { SupabaseService } from '../supabase.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {

  posts: PostInt[] = [];

  post?: PostInt;

  source: string = "";

  size: number = 5;

  rows: number[] = [...Array(this.size).keys()];

  cols: number[] = [...Array(this.size).keys()];

  holders: ComponentRef<any>[][][] = []

  constructor(private readonly supabase: SupabaseService, private route: ActivatedRoute)
  {
    this.supabase.updates.subscribe(items => this.posts = items);
  }

  ngOnInit(): void {
    console.log(this.route.snapshot)

    this.post = this.posts.find(item => item.id == +this.route.snapshot.url[1].path)
    // this.route.queryParams.subscribe(params => {
    //   // this.name = params['name'];
    //   console.log(params);
    // });
  }

}
