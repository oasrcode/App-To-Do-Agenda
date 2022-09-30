export type ToDoType = 'task' | 'resting' | 'hobby';

export interface ToDo{
    id:string|null,
    title:string
    summ:string
    time:string
    type:ToDoType
}