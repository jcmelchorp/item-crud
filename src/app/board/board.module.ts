import { RouterModule } from '@angular/router';
import { BoardService } from './services/board.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { MenuLayoutComponent } from './containers/menu-layout/menu-layout.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/board/board.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';

@NgModule({
  declarations: [
    BoardComponent,
    MenuLayoutComponent,
    DeleteButtonComponent,
    BoardsComponent,
    BoardDialogComponent,
    TaskDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BoardRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    DragDropModule,
    LayoutModule,
  ],
  exports: [
    BoardComponent,
    MenuLayoutComponent,
    DeleteButtonComponent,
    BoardsComponent,
    BoardDialogComponent,
    TaskDialogComponent,
  ],
  providers: [BoardService],
})
export class BoardModule {}
