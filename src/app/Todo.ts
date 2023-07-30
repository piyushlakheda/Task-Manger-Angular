export class Todo {
    id: number;
    title: string
    desc: string
    active: boolean
    taskDate: string;
    priority: string;
    status: string;
    history: string[];

    constructor() {
        this.history = []; // Initialize the history log as an empty array
      }
}