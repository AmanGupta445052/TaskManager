import { useState,useEffect } from "react";

// This hook synchronizes React state ↔ localStorage.

export default function useLocalstorage(key,initialValue){
   const [value,setValue] = useState(() => {

      try{
        // gets the value from localstorage and convert it to array,
        //  as localstorage contains only string values
        const stored = localStorage.getItem(key); // changed from get() -> getItem (correct one)
           if (!stored) return initialValue;
     const parsed = JSON.parse(stored);
    return parsed === null ? initialValue : parsed;     
 }
      catch{
        return initialValue;
      }
   });

   useEffect(() =>{
    // convert again the value to string so we can store it in localstorage
      localStorage.setItem(key,JSON.stringify(value));
   },[key,value]); // whenever there's any changes in these two this function will run.
   return [value,setValue];
}