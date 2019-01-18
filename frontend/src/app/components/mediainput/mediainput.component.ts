import {Component, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

export interface IMedia {
  id?: number;
  originalFileName?: string;
  contentType?: string;
  size?: number;
}

@Component({
  selector: 'app-mediainput',
  templateUrl: './mediainput.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediainputComponent),
      multi: true
    }
  ]
})
export class MediainputComponent implements OnInit, ControlValueAccessor {
  resourceUrl = '/api/media';
  name: string;
  medias: IMedia[];
  uploader: FileUploader;
  accept: string;
  onChange = (medias: IMedia[]) => {
    // empty default
  };


  constructor(private authService: AuthService, private userService: UserService, private http: HttpClient, elm: ElementRef,
              private toastrService: ToastrService) {
    this.name = elm.nativeElement.getAttribute('name');
    this.accept = elm.nativeElement.getAttribute('accept');
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.resourceUrl,
      authToken: 'Bearer ' + localStorage.getItem(this.authService.accessTokenLocalStorageKey),
      autoUpload: true
    });
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      if (!this.medias) {
        this.medias = [];
      }
      this.medias.push({
        contentType: item.file.type,
        originalFileName: item.file.name,
        size: item.file.size
      });
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const uploadedMedia = <IMedia>JSON.parse(response);
      this.medias.find(media => !media.id && media.originalFileName === uploadedMedia.originalFileName).id = uploadedMedia.id;
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.toastrService.error('Upload failed Server not available');

    };
    this.uploader.onCompleteAll = () => {
      this.onChange(this.medias);
    };
  }

  deleteMedia(index: number): void {
    this.medias.splice(index, 1);
    this.onChange(this.medias);
  }

  downloadMedia(media: IMedia): void {
    this.http.get(`${this.resourceUrl}/${media.id}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const fileURL = URL.createObjectURL(blob);
      const a = <HTMLAnchorElement>document.createElement('a');
      a.href = fileURL;
      a.download = media.originalFileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // not implemented
  }

  setDisabledState(isDisabled: boolean): void {
    // not implemented
  }

  writeValue(obj: any): void {
    this.medias = obj;
    this.onChange(obj);
  }

}
