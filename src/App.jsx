import { useState, useEffect } from 'react'
import './App.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function App() {
  const [groceryItems,setGroceryItems]=useState([]);
  const [inputItem,setInputItem]=useState({});
  const [inputValue,setInputValue]=useState("");

  const setItem=(e)=>{
    setInputValue(e.target.value);
    const newItem={
      checked: false,
      item: e.target.value
    }

    setInputItem(newItem);
  }

  const addGroceryItem=()=>{
    let newGroceryItems=[...groceryItems,inputItem];
    setGroceryItems(newGroceryItems);
    console.log(newGroceryItems);
    setInputValue("");

    localStorage.setItem("groceryItems",JSON.stringify(newGroceryItems));
  }

  const setCheckedItem=(index)=>{
    let newGroceryItems=groceryItems.map((item,idx)=>{
      if(idx==index){
        return {...item, checked: !item.checked}
      }
      return item;
    })
    setGroceryItems(newGroceryItems);
  }

  const deleteItem=(index)=>{
    let newGroceryItems=groceryItems.filter((item,idx)=>{
      return idx!=index;
    })
    setGroceryItems(newGroceryItems);
  }

  //local storage implementation
  useEffect(()=>{
    if(groceryItems.length>0){
      localStorage.setItem("groceryItems",JSON.stringify(groceryItems));
    }
  },[groceryItems])


  useEffect(()=>{
    if(localStorage.getItem("groceryItems")){
      const newGroceryItems=JSON.parse(localStorage.getItem("groceryItems"));
      setGroceryItems(newGroceryItems);
    }
  },[])




  return (
    <>
      <div className=' mt-28 px-5 py-9 mx-auto w-[500px] flex flex-col items-center shadow-md bg-white'>
          <h1 className='text-center text-3xl mb-8'>Grocery Bud</h1>
          <div className='flex gap-3 items-center'>
            <input type="text" value={inputValue} onChange={setItem} className='bg-gray-100 border-2 rounded-lg w-72 text-xl px-2 py-1'/>
            <button onClick={addGroceryItem} className='bg-blue-300 px-4 py-2 rounded-lg hover:scale-110 transition-all'>Add item</button>
          </div>

          <div className='flex flex-col gap-5  mt-8 '>
            {
              groceryItems.map((groceryItem,index)=>
                <div key={index} className='flex justify-between w-[395px] text-xl bg-blue-300 px-4 py-2 rounded-lg'>
                  <div className='flex gap-2'>
                    <input type="checkbox" checked={groceryItem.checked} onChange={()=>setCheckedItem(index)}/>
                    <p className={groceryItem.checked ? "line-through" : ""}>{groceryItem.item}</p>
                  </div>

                 <button onClick={()=>deleteItem(index)} className=' hover:scale-105 transition-all'> <DeleteForeverIcon /></button>
                </div>
              )
            }
          </div>
       </div> 
    </>
  )
}

export default App
