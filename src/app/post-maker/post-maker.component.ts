import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import
{ 
  Component, 
  OnInit, 
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  Type,
  ComponentRef,
} from '@angular/core';
import { SubImageComponent } from '../sub-image/sub-image.component';
import { SubTextComponent } from '../sub-text/sub-text.component';
import { SubVideoComponent } from '../sub-video/sub-video.component';

@Component({
  selector: 'app-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.scss']
})
export class PostMakerComponent implements OnInit {

  size: number = 5;

  rows: number[] = [...Array(this.size).keys()];

  cols: number[] = [...Array(this.size).keys()];

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  image_class = SubImageComponent
  text_class = SubTextComponent
  video_class = SubVideoComponent

  // components: ComponentRef<any>[] = []

  texts: SubTextComponent[] = [];
  images: SubImageComponent[] = [];
  videos: SubVideoComponent[] = [];

  holders: ComponentRef<any>[][][] = []

  subs: HTMLElement[] = []

  constructor
  (
    private CFR: ComponentFactoryResolver
  ) { }

  // addComponent(componentClass: Type<any>) {
  //   // Create component dynamically inside the ng-template
  //   const componentFactory = this.CFR.resolveComponentFactory(componentClass);
  //   // const component = this.container.createComponent(componentClass);
  //   // this.container.move(component,0)

  //   // Push the component so that we can keep track of which components are created
  //   this.components.push(componentFactory);
  // }

  ngOnInit(): void
  {
    for (let i = 0; i < this.size; i++)
    {
      this.holders.push([]);

      for (let j = 0; j < this.size; j++)
      {
        this.holders[i].push([]);
      }
    }
  }

  drop(event: CdkDragDrop<any>): void
  {
    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else
    {
      console.log(event)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
