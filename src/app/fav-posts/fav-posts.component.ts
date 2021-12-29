import { Component, Input, OnInit } from '@angular/core';
import { PostInt } from '../postInt';

@Component({
  selector: 'app-fav-posts',
  templateUrl: './fav-posts.component.html',
  styleUrls: ['./fav-posts.component.scss']
})
export class FavPostsComponent implements OnInit {

  @Input() favs: PostInt[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
