//imports
import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../../task.service';
import { ItemsService } from '../../../items.service';
import { Task } from './task';

//déclaration du composant
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  //variables (mettre ici les variables "binded" à utiliser pour le template)
	tasks: Task[];
	currentTask = "";

  //constructeur
  constructor(private taskService: TaskService, private itemsService: ItemsService) {
  	
  }

  //appellé à l'initialisation du composant
  ngOnInit(): void {
    this.getTasks();
    //this.tasks = this.itemsService.getItemsBasic();
    //this.getItemsFromApi();
  }

  getItemsFromApi(): void {
    this.itemsService.getItemsFromApi()
      .subscribe(
        items => {
          console.log(items);
        });
  }

  getTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }

  //méthodes
  addTask(): void {
    let title = this.currentTask.trim();
    if (!title) { return; }
    this.taskService.addTask({ title: title, complete:false } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
    this.currentTask = "";
  }

  toggleTask(task): void {
    task.complete = !task.complete;
    this.taskService.updateTask(task).subscribe();
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }

}
