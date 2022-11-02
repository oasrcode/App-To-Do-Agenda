import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage"
export function useStorage(){

    const [store,setStore] = useState<Storage>();
    const [user,setUser] = useState();

    useEffect(()=>{
        
        const initStorage = async ()=>{
        const newStore = new Storage();
        const store = await newStore.create()
        setStore(store)

        const getStoredUser = await store.get("user");
        setUser(getStoredUser)
        }

        initStorage();
    },[])

    return {user}
}