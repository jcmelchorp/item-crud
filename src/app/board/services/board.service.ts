import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private userId: string;
  private userTkn: string;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userTkn = user.refreshToken;
      }
    });
  }
  /**
   * Creates a new board for the current user
   */
  async createBoard(board: Board) {
    return this.db.list(`boards/${this.userId}`).push(board);
    /* return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    }); */
  }

  getAll() {
    return this.db.list(`items/${this.userId}`).snapshotChanges();
  }

  /**
   * Get all boards owned by current user
   */
  getUserBoards() {
    return this.db.list(`items/${this.userId}`).snapshotChanges();
    /* return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    ); */
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]): void {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    return this.db.object(`boards/${this.userId}/${boardId}`).remove;
    // return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * Updates the tasks on board
   */
  /* updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  } */

  /**
   * Remove a specifc task from the board
   */
  /* removeTask(boardId: string, task: Task): Promise<void> {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  } */
}
