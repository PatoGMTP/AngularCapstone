import
{ 
  Component, 
  OnInit, 
  // ComponentFactoryResolver,
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

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  image_class = SubImageComponent
  text_class = SubTextComponent
  video_class = SubVideoComponent

  components: ComponentRef<any>[] = []

  subs: HTMLElement[] = []

  constructor
  (
    // private CFR: ComponentFactoryResolver
  ) { }

  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template
    // const componentFactory = this.CFR.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentClass);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  ngOnInit(): void {
  }

}
