import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-project-media',
  templateUrl: './project-media.component.html',
  styleUrls: ['./project-media.component.scss']
})
export class ProjectMediaComponent implements OnInit {


  projectMediaForm;

  constructor() {
    this.projectMediaForm = new FormGroup({
      'files': new FormControl([])
    });
  }

  ngOnInit() {
  }

}
