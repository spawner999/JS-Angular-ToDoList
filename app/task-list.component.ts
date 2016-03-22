import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import {DonePipe} from './done.pipe';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  inputs: ['taskList', 'currentDate'],
  outputs: ['receivedTask'],
  pipes: [DonePipe],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template:`
  <select (change)="onChange($event.target.value)">
  <option value="all" selected="selected">Show All</option>
  <option value="done">Show Done</option>
  <option value="notDone">Show Not Done</option>
  </select>
  <div class="container" *ngFor="#currentTask of taskList | done:filterDone">
  <p>{{ currentDate }}</p>
  <task-display [task]="currentTask"
  [class.selected]="currentTask === coloredTask"
  (onTaskSelect)="taskReceived($event)"></task-display>
  </div>
  <edit-task-details *ngIf="coloredTask"
  [task]="coloredTask"></edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)"></new-task>
`
})

export class TaskListComponent {
  public receivedTask: EventEmitter<Task>;
  public currentDate: String;
  public taskList: Task[];
  public coloredTask: Task;
  public filterDone: string = "all";
  constructor(){
    this.receivedTask = new EventEmitter();
  }
  taskReceived(selectedTask){
    this.coloredTask = selectedTask;
    this.receivedTask.emit(selectedTask);
  }
  createTask(description: string){
    this.taskList.push(new Task(description));
  }
  onChange(filterOption){
    this.filterDone = filterOption;
    console.log(this.filterDone);
  }
}
