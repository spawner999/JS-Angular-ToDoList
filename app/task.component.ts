import { Component, EventEmitter } from 'angular2/core';
import { Task } from './task.model';

@Component({
    selector: 'task-display',
    inputs: ['task', 'currentDate'],
    outputs: ['onTaskSelect'],
  template: `
    <div class="container">
      <h2 (click)="taskSelected(task)">{{ task.description }}</h2>
      <h3 (click)="idSelected(task)">#{{ task.id }}</h3>
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
}
