import { ToDo } from "./ToDoContext";

export interface ToDoProps{
    element: ToDo;
    setChange: (val: string) => void;
    change:string|undefined  
}