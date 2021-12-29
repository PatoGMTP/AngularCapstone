import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PostInt } from '../postInt';
import { TopicInt } from '../topicInt';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnChanges
{
  private searchDebouncer$: Subject<string> = new Subject();

  query: string = '';

  all: boolean;

  options: {data: TopicInt, value: boolean}[] = [];

  @Input() posts: PostInt[] = [];
  
  @Input() topics: TopicInt[] = [];

  @Output() filter = new EventEmitter();

  results: PostInt[]= [];

  constructor()
  {
    this.all = true;
  }

  ngOnInit(): void
  {
    this.searchDebouncer$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((term: string) => {
      this.query = term.toLocaleLowerCase();
      this.checks();
    });

    if (this.options.length == 0 && this.topics.length > 0)
    {
      this.options = [];
      this.topics.forEach(item => this.options.push({data: item, value: true}))
    }
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes['posts'])
    {
        if (!changes['posts'].previousValue || changes['posts'].previousValue.length == 0)
        {
          this.results = this.posts;
          this.filter.emit(this.results)
        }
    }
    else if (changes["topics"])
    {
      this.options = [];
      this.topics.forEach(item => this.options.push({data: item, value: true}))
    }
  }

  prepSearch(input: string): void
  {
    this.searchDebouncer$.next(input);
  }

  setAll(): void
  {
    this.options.forEach(item => item.value = !this.all);
    this.checks();
  }

  updateAll(): void
  {
    this.all = this.options.every(t => t.value);
    this.checks();
  }

  checks(): void
  {
    this.results = this.posts.filter(item => {
      return this.options.some(option => option.data.id == item.topic && option.value)
    });
    this.results = this.results.filter(item => item.title.toLocaleLowerCase().includes(this.query))
    this.filter.emit(this.results);
  }
}
