import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCapstone';

  constructor(private readonly supabase: SupabaseService) { }
  
  session = this.supabase.session;

  ngOnInit()
  {
    this.supabase.authChanges((_, session) => this.session = session);
  }
}
