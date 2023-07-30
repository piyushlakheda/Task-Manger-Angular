import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Input() i: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  onStatusChange() {
    this.todoCheckbox.emit(this.todo);
  }

  ngOnInit(): void {
  }

  onClick(todo: Todo) {
    this.todoDelete.emit(todo);
  }

  onCheckboxClick(todo) {
    this.todoCheckbox.emit(todo);
  }

}
