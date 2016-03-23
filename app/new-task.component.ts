import {Component, EventEmitter} from 'angular2/core';
import {Task} from './task.model';

@Component({
  selector: 'new-task',
  outputs: ['onSubmitNewTask'],
  template: `
  <div class="task-form">
    <h3>Create Task:</h3>
    <input placeholder="Description" class="col-sm-8 input-lg" #newDescription>
    <select (change)="onChange($event.target.value)">
    <option value="low" selected="selected">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
    </select>
    <button class="add-button" (click)="addTask(newDescription)">Add</button>
  </div>
  `
})

export class NewTaskComponent {
  public onSubmitNewTask: EventEmitter<Task>;
  public selectedPriority: string = 'low';
  constructor(){
    this.onSubmitNewTask = new EventEmitter();
  }
  addTask(userDescription: HTMLInputElement){
    this.onSubmitNewTask.emit(new Task(userDescription.value, this.selectedPriority));
    userDescription.value = '';
  }
  onChange(priority: string){
    this.selectedPriority = priority;
  }
}
