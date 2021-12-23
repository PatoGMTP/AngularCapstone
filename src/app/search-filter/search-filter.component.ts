import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostInt } from '../postInt';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Input() posts: PostInt[] = []

  @Output() filter = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

}
