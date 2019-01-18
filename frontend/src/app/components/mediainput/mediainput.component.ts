import {Component, ElementRef, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Media} from '../../api/Media';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {map} from 'rxjs/operators';


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
export class MediainputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  navigationSubscription;

  resourceUrl = '/api/media';
  name: string;
  medias: Media[] = [];
  uploader: FileUploader;
  accept: string;

  @Input() existingMedia;
  @Input() projectID: number;

  onChange = (medias: Media[]) => { };

  constructor(private authService: AuthService, private userService: UserService, private http: HttpClient, elm: ElementRef,
              private toastrService: ToastrService, private route: ActivatedRoute, private router: Router) {
    this.name = elm.nativeElement.getAttribute('name');
    this.accept = elm.nativeElement.getAttribute('accept');
    this.loadExistingFiles();
  }

  ngOnInit() {
    if (!this.medias) {
      this.medias = [];
    }

    this.uploader = new FileUploader({
      url: this.resourceUrl + '/' + this.projectID,
      authToken: 'Bearer ' + localStorage.getItem(this.authService.accessTokenLocalStorageKey),
      autoUpload: true
    });

    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      this.medias.push({
        contentType: item.file.type,
        originalFileName: item.file.name,
        size: item.file.size
      });
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const uploadedMedia = <Media>JSON.parse(response);
      this.medias.find(media => !media.id && media.originalFileName === uploadedMedia.originalFileName).id = uploadedMedia.id;
      this.toastrService.success('Update successfull');
    };

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.toastrService.error('Upload failed Server not available');

    };
    this.uploader.onCompleteAll = () => {
      this.loadExistingFiles();
      this.onChange(this.medias);
    };

    // hoedlale16: Hack to load already existing Data
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.loadExistingFiles();
      }
    });

    this.router.navigate(['project-details/' + this.projectID]);
}

  ngOnDestroy() {
    // source: https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

    loadExistingFiles() {
    // Load existing medias
    for (const mediaID in this.existingMedia) {
      if (this.existingMedia.hasOwnProperty(mediaID)) {
        console.log('Add Media <' + mediaID + '> , <' + this.existingMedia[mediaID] + '>to list');
        this.medias.push({
          id: +mediaID,
          originalFileName: this.existingMedia[mediaID],
        });
      }
    }
  }


  deleteMedia(media: Media, index: number): void {
    this.http.delete(this.resourceUrl + '/' + media.id).subscribe( (response) => {
        this.toastrService.success('Deleted sucessfully');
        this.medias.splice(index, 1);
        this.onChange(this.medias);
      });
  }

  downloadMedia(media: Media): void {
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
