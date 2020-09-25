import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    BoardsListComponent,
    BoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    ShellComponent,
    DeleteButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    KanbanRoutingModule,
    FormsModule,
    DragDropModule,
  ],
  entryComponents: [BoardDialogComponent, TaskDialogComponent],
})
export class KanbanModule {}
