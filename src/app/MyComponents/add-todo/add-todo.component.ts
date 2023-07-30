import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  id: number;
  title: string;
  desc: string;
  taskDate: string;
  priority: string; 
  status: string ;
  history: string[]; 

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const todo = {
      id: this.id,
      title: this.title,
      desc: this.desc,
      active: true,
      taskDate: this.taskDate,
      priority: this.priority,
      status: this.status ,
      history:this.history
    }

    this.todoAdd.emit(todo);
  }

}
