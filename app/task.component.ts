import { Component, EventEmitter } from 'angular2/core';
import { Task } from './task.model';

@Component({
    selector: 'task-display',
    inputs: ['task', 'currentDate'],
    outputs: ['onTaskSelect'],
  template: `
    <div class="container">
      <h2 (click)="taskSelected(task)">{{ task.description }} - <span>{{ task.priority }}</span></h2>
      <input *ngIf="task.done" type="checkbox" checked (click)="toggleDone(false)"/>
      <input *ngIf="!task.done" type="checkbox" (click)="toggleDone(true)"/>
      <label (click)="idSelected(task)">#{{ task.id }}</label>
    </div>
  `
})

export class TaskComponent {
  public task: Task;
  public onTaskSelect: EventEmitter<Task>;
  constructor(){
    this.onTaskSelect = new EventEmitter();
  }
  taskSelected(selectedTask: Task) : void{
    console.log('child', selectedTask);
    this.onTaskSelect.emit(selectedTask);
  }
  idSelected(task) : void{
    console.log(task.id);
  }
  toggleDone(setState: boolean){
    this.task.done = setState;
  }
}
