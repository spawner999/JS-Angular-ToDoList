export class Task {
  public done: boolean = false;
  public id: number = Math.floor(Math.random() * 100);
  constructor(public description: string, public priority: string){
  }
}
