import { ToDo } from "./ToDoContext";

export interface ToDoProps{
    element: ToDo;
     setRefresh: (val: boolean) => void;
     refresh:boolean|undefined  
    
}