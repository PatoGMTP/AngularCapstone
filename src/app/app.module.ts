import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account/account.component';
import { AvatarComponent } from './avatar/avatar.component';
import { PostComponent } from './post/post.component';
import { FavPostsComponent } from './fav-posts/fav-posts.component';
import { FavTopicsComponent } from './fav-topics/fav-topics.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SubTextComponent } from './sub-text/sub-text.component';
import { SubVideoComponent } from './sub-video/sub-video.component';
import { SubImageComponent } from './sub-image/sub-image.component';
import { PublicPostsComponent } from './public-posts/public-posts.component';
import { FullPostComponent } from './full-post/full-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostMakerComponent } from './post-maker/post-maker.component';
import { MakerSidebarComponent } from './maker-sidebar/maker-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccountComponent,
    AvatarComponent,
    PostComponent,
    FavPostsComponent,
    FavTopicsComponent,
    SearchFilterComponent,
    SubTextComponent,
    SubVideoComponent,
    SubImageComponent,
    PublicPostsComponent,
    FullPostComponent,
    UserProfileComponent,
    PostMakerComponent,
    MakerSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
