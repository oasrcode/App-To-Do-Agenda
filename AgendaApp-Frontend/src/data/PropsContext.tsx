import { ToDo } from "./ToDoContext";

export interface ToDoProps{
    element: ToDo;
    setChange: (val: boolean) => void;  
}