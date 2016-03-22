import { Component } from 'angular2/core';

@Component({
  selector: 'task-list',
  inputs: ['taskList', 'otherThing'],
  template:
`  <div class="container" *ngFor="#currentTask of taskList">
    <p>{{ otherThing }}</p>
    <h2 (click)="taskSelected(currentTask)">{{ currentTask.description }}</h2>
    <h3 (click)="idSelected(currentTask)">#{{ currentTask.id }}</h3>
  </div>`
})

export class TaskListComponent {
  public otherThing: String;
  public taskList: Task[];
  taskSelected(selectedTask: Task) : void{
    console.log(selectedTask);
  }
  idSelected(task) : void{
    console.log(task.id);
  }
}

@Component ({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
    <h1>To Do List</h1>
    <task-list
      [taskList]="tasks"
      [otherThing]="fakeString">
    </task-list>
  `
})

export class AppComponent {
  public tasks: Task [];
  public fakeString = moment().format('MMMM Do YYYY, h:mm:ss a');
  constructor(){
    this.tasks = [
      new Task('Create To-Do List app.'),
      new Task('Try components'),
      new Task('Clean the toilet'),
      new Task('Buy a ferraaaai'),
  ];
  }
}

export class Task {
  public done: boolean = false;
  public id: number = Math.floor(Math.random() * 100);
  constructor(public description: string){
  }
}
