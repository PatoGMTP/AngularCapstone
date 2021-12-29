import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-image',
  templateUrl: './sub-image.component.html',
  styleUrls: ['./sub-image.component.scss']
})
export class SubImageComponent implements OnInit {

  @Input() initial: number = 1;

  style = {height: "200", width: "200"};

  constructor() { }

  ngOnInit(): void {
    this.style.height = (this.initial * +this.style.height).toString() + "px";
    this.style.width = (this.initial * +this.style.width).toString() + "px";
  }

}
