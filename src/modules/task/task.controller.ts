import {Controller, Post,Body} from "@nestjs/common"
import { taskService } from "./task.service"
import { CreateTaskDto } from "./dto/create-task.dto"
@Controller("/tasks")
export class taskController {
  constructor(private readonly taskService:taskService){}

  @Post()
  createTask(@Body()CreateTaskDto:CreateTaskDto){
    return this.taskService.createTask(CreateTaskDto);

  }
    
}