import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() editable = true;
  @Output() deleted = new EventEmitter<Project>();
  @Output() edited = new EventEmitter<Project>();

  constructor(public translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
      this.translate.use(lang);
  }

  ngOnInit() {
  }

  onDelete() {
    this.deleted.emit(this.project);
  }

  onEdit() {
    this.edited.emit(this.project);
  }

}
