import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-text',
  templateUrl: './sub-text.component.html',
  styleUrls: ['./sub-text.component.scss']
})
export class SubTextComponent implements OnInit {

  @Input() initial: number = 1;

  style = {height: "", width: ""};

  constructor() {}

  ngOnInit(): void {
    this.setDim();
  }

  updateDim(input: string): void
  {
    console.log(input)
    if (+input > 0)
    {
      this.initial = +input;
      console.log(this.initial);
      this.setDim();
    }
  }

  setDim(): void
  {
    this.style.height = (this.initial * 200).toString() + "px";
    this.style.width = (this.initial * 200).toString() + "px";
    console.log(this.style)
  }

}
