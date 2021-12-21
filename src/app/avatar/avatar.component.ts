import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  _avatarUrl: SafeResourceUrl | undefined;
  uploading = false;

  @Input()
  set avatarUrl(url: string | undefined) {
    if (url) {
      this.downloadImage(url);
    }
  };

  @Output() upload = new EventEmitter<string>();

  constructor(
    private readonly supabase: SupabaseService,
    private readonly dom: DomSanitizer
  ) { }

  async downloadImage(path: string) {
    try {
      const {data} = await this.supabase.downLoadImage(path);
      this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data!));
    } catch (error: any) {
      console.error('Error downloading image: ', error.message);
    }
  }

  async uploadAvatar(event: any) {
    try {
      this.uploading = true;
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      await this.supabase.uploadAvatar(filePath, file);
      this.upload.emit(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.uploading = false;
    }
  }

}
