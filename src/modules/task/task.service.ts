import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";

 interface tasks{

  name:string;
  about:string;
 }

@Injectable()
export class taskService {
  private tasks:tasks[] = [];
createTask(CreateTaskDto:CreateTaskDto){
    const task={
      ...CreateTaskDto
    };
    this.tasks.push(task);
    return task;

  
  }
}