import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  errorMessage: string = '';
  todos: Todo[];
  localItem: string;
  statusFilter: string = '';
  priorityFilter: string = '';
  sortType: string = 'asc'; // Default sorting type is ascending
  nextId: number = 1; // To keep track of the next ID for new todo objects

  constructor(private router: Router) {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItem);
    }
  }

  ngOnInit(): void {}

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  addTodo(todo: Todo) {
    // Check if any field is empty
    if (!todo.title || !todo.desc || !todo.taskDate || !todo.priority || !todo.status) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    // Reset the error message
    this.errorMessage = '';

    // Rest of the code remains the same
    const newTodo = new Todo(); // Create a new Todo instance with the history log
    newTodo.id = this.nextId++; 
    newTodo.title = todo.title;
    newTodo.desc = todo.desc;
    newTodo.active = todo.active;
    newTodo.taskDate = todo.taskDate;
    newTodo.priority = todo.priority;
    newTodo.status = todo.status;
    newTodo.history.push(`Task created on ${new Date().toLocaleString()}`); // Add task creation log

    this.todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  

  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    const log = `Status changed to ${this.todos[index].active ? 'active' : 'inactive'} on ${new Date().toLocaleString()}`;
    this.todos[index].history.push(log);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Toggle the sorting type between ascending and descending
  toggleSortType() {
    this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
  }

  // Filter and Sort the todos based on status, priority, and date
  get filteredTodos(): Todo[] {
    let filteredTodos = this.todos;

    if (this.statusFilter) {
      filteredTodos = filteredTodos.filter(todo => todo.status === this.statusFilter);
    }

    if (this.priorityFilter) {
      filteredTodos = filteredTodos.filter(todo => todo.priority === this.priorityFilter);
    }

    // Sort the todos by taskDate based on the sortType
    filteredTodos.sort((a, b) => {
      if (this.sortType === 'asc') {
        return new Date(a.taskDate).getTime() - new Date(b.taskDate).getTime();
      } else {
        return new Date(b.taskDate).getTime() - new Date(a.taskDate).getTime();
      }
    });

    return filteredTodos;
  }

  getPriorityClass(priority: string) {
    if (priority === 'high') {
      return 'priority-high';
    } else if (priority === 'medium') {
      return 'priority-medium';
    } else if (priority === 'low') {
      return 'priority-low';
    } else {
      return '';
    }
  }
  // getPriorityColor(priority: string): string {
  //   switch (priority) {
  //     case 'high':
  //       return 'red';
  //     case 'medium':
  //       return 'yellow';
  //     case 'low':
  //       return 'green';
  //     default:
  //       return '';
  //   }
  // }

  exportToCSV() {
    const csvData = Papa.unparse(this.filteredTodos, {
      header: true, // Include header row in the CSV
    });
  
    // Create a Blob object and set the type to 'text/csv'
    const blob = new Blob([csvData], { type: 'text/csv' });
  
    // Create a download link for the Blob
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.csv';
    document.body.appendChild(a);
    a.click();
  
    // Cleanup: Revoke the URL and remove the link
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  // Function to navigate to the edit-todo component

  editTask(todo: Todo) {
    // Check if the todo object is valid and has the 'id' property
    if (!todo || typeof todo.id === 'undefined') {
      console.error('Invalid todo object or todo ID is missing.');
      return;
    }

    // Navigate to the edit-todo component with the todo ID as a parameter
    this.router.navigate(['/edit-todo', todo.id]);
      // Add history entry for edit task
  todo.history.push(`Task edited on ${new Date().toLocaleString()}`);
  }

  
}
