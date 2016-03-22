import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  inputs: ['taskList', 'currentDate'],
  outputs: ['receivedTask'],
  directives: [TaskComponent],
  template:
`  <div class="container" *ngFor="#currentTask of taskList">
    <p>{{ currentDate }}</p>
    <task-display [task]="currentTask"
    [class.selected]="currentTask === coloredTask"
    (onTaskSelect)="taskReceived($event)"></task-display>
  </div>`
})

export class TaskListComponent {
  public receivedTask: EventEmitter<Task>;
  public currentDate: String;
  public taskList: Task[];
  public coloredTask: Task;
  constructor(){
    this.receivedTask = new EventEmitter();
  }
  taskReceived(selectedTask){
    this.coloredTask = selectedTask;
    this.receivedTask.emit(selectedTask);
  }
}
