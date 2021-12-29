import { Injectable } from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import {environment} from "../environments/environment";
import { PostInt } from './postInt';
import { ProfileInt } from './profileInt';
import { TopicInt } from './topicInt';

export interface Profile {
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  public updates = new BehaviorSubject<PostInt[]>([]);
  public topics = new BehaviorSubject<TopicInt[]>([]);
  public favs = new BehaviorSubject<PostInt[]>([]);
  private posts: PostInt[] = [];
  private fav_posts: PostInt[] = [];
  
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.init();

    const posts = this.supabase
      .from('posts')
      .on('*', payload => {
        console.log('Change received!', payload)

        switch(payload.eventType)
        {
          case "INSERT":
            this.posts.push(payload.new)
            break;
          case "DELETE":
            this.posts = this.posts.filter(item => item.id != payload.old.id)
            break;
          case "UPDATE":
            Object.assign(this.posts.find(item => item.id == payload.old.id), payload.new);
            break;
        }

        this.updates.next(this.posts);
      })
      .subscribe()
    console.log(posts);

    const favs = this.supabase
      .from(`profiles_to_posts:profile=${this.user?.id}`)
      .on('*', payload => {
        console.log('Change received!', payload)

        switch(payload.eventType)
        {
          case "INSERT":
            this.fav_posts.push(payload.new)
            break;
          case "DELETE":
            this.fav_posts = this.fav_posts.filter(item => item.id != payload.old.id)
            break;
          case "UPDATE":
            Object.assign(this.fav_posts.find(item => item.id == payload.old.id), payload.new);
            break;
        }

        this.updates.next(this.fav_posts);
      })
      .subscribe()
    console.log(favs);
  }
  
  async init(): Promise<void>
  {
    let resp = this.supabase
      .from('posts')
      .select(`*, topics (*), profiles!posts_owner_fkey (*)`)as unknown as Promise<{ data: PostInt[]; error: any; }>;

    resp.then(item => {
      this.posts = item.data;
      this.updates.next(this.posts);
    });

    let resp2 = this.supabase
      .from('topics')
      .select(`*`) as unknown as Promise<{data: TopicInt[], error: any}>;

    resp2.then(item => {
      this.topics.next(item.data)
    });

    let resp3 = this.supabase
      .from('profiles_to_posts')
      .select(`*, posts (*)`)
      .eq('profile', this.user?.id) as unknown as Promise<{data: any[], error: any}>;

    resp3.then(item => {
      item.data.forEach(fav => this.fav_posts.push(fav.posts))
      this.favs.next(this.fav_posts);
    });
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  get all_profiles() {
    return this.supabase
      .from('profiles')
      .select(`*`) as unknown as Promise<{data: ProfileInt[], error: any}>;
  }

  get user_posts()
  {
    return this.supabase
      .from('posts')
      .select(`*, topics (*)`)
      .eq('owner', this.user?.id) as unknown as Promise<{data: PostInt[], error: any}>;
  }

  get user_favs()
  {
    return this.supabase
      .from('profiles_to_posts')
      .select(`*, posts (*)`)
      .eq('profile', this.user?.id) as unknown as Promise<{data: PostInt[], error: any}>;
  }

  get user_topics()
  {
    return this.supabase
      .from('profiles_to_topics')
      .select(`*, topics (*), profiles (*)`)
      .eq('profile', this.user?.id) as unknown as Promise<{data: TopicInt[], error: any}>;
  }

  get all_posts()
  {
    return this.supabase
      .from('posts')
      .select(`*, topics (*)`) as unknown as Promise<{data: PostInt[], error: any}>;
  }

  get all_topics()
  {
    return this.supabase
      .from('topics')
      .select(`*`) as unknown as Promise<{data: TopicInt[], error: any}>;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    console.log("Pasta", this.session, this.user, this.profile)
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signIn({email});
  }

  async signInWithGoogle() {
    const { user, session, error, provider, url } = await this.supabase.auth.signIn({
      provider: 'google',
    })

    console.log(user, session, error, provider, url)
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date()
    }

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  async testPost(): Promise<void>
  {
    console.log
    ( await this.supabase.from('posts').upsert
      (
        [
          {
            owner: this.user?.id,
            title: "testers22",
            picture: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png",
            topic: 4,
          },
          {
            owner: this.user?.id,
            title: "testers33",
            picture: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png",
            topic: 4,
          }
        ],
        {
          returning: 'representation'
        }
      )
    );
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage
      .from('avatars')
      .upload(filePath, file);
  }
}
