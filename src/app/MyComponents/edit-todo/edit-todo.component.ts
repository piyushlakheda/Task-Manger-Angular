  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Todo } from '../../Todo';

  @Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.css']
  })
  export class EditTodoComponent implements OnInit {
    todo: Todo;

    constructor(
      private route: ActivatedRoute,
      private router: Router
    ) { }

    ngOnInit(): void {
      const taskId = this.route.snapshot.paramMap.get('id');
      this.todo = this.getTodoById(taskId);
    }

    onSubmit() {
      this.updateTodo();
      this.router.navigate(['/todos']);
    }

    private getTodoById(id: string): Todo {
      const todosString = localStorage.getItem('todos');
      if (!todosString) {
        console.error('No todos found in local storage.');
        return null;
      }
    
      const todos: Todo[] = JSON.parse(todosString);
      const todo = todos.find(t => t.id === Number(id));
    
      if (!todo) {
        console.error('Todo with ID not found.');
        return null;
      }
    
      return todo;
    }
    private updateTodo(): void {
      this.todo.history.push(`Task updated on ${new Date().toLocaleString()}`);
      const todosString = localStorage.getItem('todos');
      if (!todosString) {
        console.error('No todos found in local storage.');
        return;
      }

      const todos: Todo[] = JSON.parse(todosString);
      const index = todos.findIndex(t => t.id === this.todo.id);

      if (index === -1) {
        console.error('Todo with ID not found.');
        return;
      }

      todos[index] = this.todo;
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log('Updated Todo:', this.todo);
    }
  }
