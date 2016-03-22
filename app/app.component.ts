import { Component, EventEmitter } from 'angular2/core';
/// <reference path="moment.d.ts"/>

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

@Component ({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
    <h1>To Do List</h1>
    <task-list
      [taskList]="tasks"
      [currentDate]="currentDate"
      (receivedTask)="taskSelected($event)">
    </task-list>
  `
})

export class AppComponent {
  public tasks: Task [];
  public currentDate: string = moment().format('MMMM Do YYYY, h:mm:ss a');
  constructor(){
    this.tasks = [
      new Task('Create To-Do List app.'),
      new Task('Try components'),
      new Task('Clean the toilet'),
      new Task('Buy a ferrari'),
  ];
  }
  taskSelected(selectedTask: Task) : void{
    console.log('parent', selectedTask);
  }
}

export class Task {
  public done: boolean = false;
  public id: number = Math.floor(Math.random() * 100);
  constructor(public description: string){
  }
}
