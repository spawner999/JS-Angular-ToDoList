import { Pipe, PipeTransform} from 'angular2/core';
import { Task } from './task.model';

@Pipe({
  name: 'done',
  pure: false
})
export class DonePipe implements PipeTransform {
  transform(input: Task[], args) {
     var desiredDoneState = args[0];
     if(desiredDoneState === 'done') {
       return input.filter((task) =>{
         return task.done;
       });
     } else if (desiredDoneState === 'notDone'){
       return input.filter((task) => {
         return !task.done;
       })
     }
     else if(desiredDoneState === 'low') {
       return input.filter((task) =>{
         return this.filter(desiredDoneState, task.priority);
       });
     } else if (desiredDoneState === 'medium'){
       return input.filter((task) => {
         return this.filter(desiredDoneState, task.priority);
       })
     }
     else if (desiredDoneState === 'high'){
       return input.filter((task) => {
         return this.filter(desiredDoneState, task.priority);
       })
     }
     else return input;
  }
  filter(string1: string, string2: string){
    return string1 === string2;
  }
}
