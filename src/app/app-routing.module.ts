import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullPostComponent } from './full-post/full-post.component';
import { PostMakerComponent } from './post-maker/post-maker.component';
import { PostComponent } from './post/post.component';
import { PublicPostsComponent } from './public-posts/public-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:"home", component:PublicPostsComponent},
  {path:"profile", component:UserProfileComponent},
  {path:"maker", component:PostMakerComponent},
  {path:"post/:id", component:FullPostComponent},
  {path:"", redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
