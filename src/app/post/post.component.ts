import { Component, OnInit, Input } from '@angular/core';
import { PostInt } from '../postInt';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: PostInt;

  constructor() { }

  ngOnInit(): void {
  }

}
