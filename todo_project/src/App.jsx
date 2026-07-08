import { useState } from 'react'
import NavBar from './navbar.jsx'
import { v4 as uuidv4 } from "uuid";
import edit_icon from "./assets/Edit.svg";
import delete_icon from "./assets/Delete.svg";

function App() {
  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])
  const [prevId,setPrevId]=useState("")
  let mode=0;

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleAdd=()=>{
    if(todo!==""){
      if(prevId===""){
      setTodos([{id: uuidv4(),todo,isCompleted: false},...todos])
      }
      else{
        setTodos([{id:prevId,todo,isCompleted:false}, ...todos])
        setPrevId("")
      }
    }
    console.log(todos)
    setTodo("")

  }
  const  handleEdit=(e,id)=>{
    const identifier=id;
    console.log(identifier)
    let val=todos.findIndex(i=>{
      return i.id===identifier;
    })
    let data=todos[val];
    let newTodos=todos.filter(i=> i.id!==identifier)
    setTodos([...newTodos])
    console.log(data)
    console.log(data.todo)
    setPrevId(data.id)
    setTodo(data.todo)
  }

  const handleDelete=(e,id)=>{
    console.log(id)
    const userConfirm=confirm("Are you sure want to DELETE");
    if(userConfirm){
      console.log("User selected DELETE")
      let index=todos.findIndex(item=>{
        return item.id===id
      })
      let data=todos[index]
      let newTodos=todos.filter(i=> i.id!==data.id);
      setTodos([...newTodos])
  }
  else{
    console.log("User cancelled DELETE")
    setTodos(todos)
  }
  }
  const handleCheckBox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  const handleDeleteAll=()=>{
  if(todos.length!==0){
    const userResponse=confirm("Are you sure want to DELETE ALL");
    if(userResponse){
      console.log("User selected Delete All")
      setTodos([])
    }
    else{
      console.log("User cancelled deletion")
    }
    
  }
  }

  return (
    <>
    <NavBar />
    <div className="w-full min-h-screen flex justify-center items-center">

    
      <div className="p-4 text-lg bg-slate-700
       h-full justify-center items-center min-w-80 rounded-lg ">
        <div className=" rounded-sm  w-full mb-2 p-4 h-30px">
          <h1 className="flex p-2 mb-2 bg-amber-700 text-white rounded-md ">Add Task</h1>
          <input value={todo} onChange={handleChange}  type="text" placeholder="Type Task Here" className="bg-amber-50 p-2 w-full mb-2 rounded-sm"></input>
          <div className="mb-2 items-center justify-center">
            <div>
              <button onClick={handleAdd} className="rounded-lg bg-amber-600 hover:bg-amber-500 cursor-pointer border-2 border-black text-white w-full p-1 mb-2">Add</button>
            </div>
            <div>
              <button onClick={handleDeleteAll} className="rounded-lg bg-red-600 hover:bg-red-500 cursor-pointer border-2 border-black text-white w-full p-1 mb-2">Delete All</button>
            </div>
            
          </div>
          
        </div>
        <div className="rounded-sm  h-full w-full p-2 mb-2 "> 
          <span className="flex mb-2  p-2 rounded-md bg-amber-600 text-white">Your Todos</span>
          {todos.length==0 && <div className=" h-full p-4 w-full min-w-80 bg-slate-400 rounded-lg text-center">No Todos to display</div>}
          {todos.map(item=>{
            return(
              <div key={item.id} className="my-4 max-w-100 min-w-80 flex p-2 w-1/2vw text-white bg-slate-500 wrap-break-word overflow-auto justify-between hover:bg-slate-600">
                <input name={item.id} onChange={handleCheckBox} type="checkbox" value={todo.isCompleted} className="m-2 h-4 w-4 " />
                <div class="rounded-sm max-w-100 p-4 min-w-0 justify-center flex-wrap wrap-break-word" className={item.isCompleted?"line-through decoration-solid":"font-medium"}>{item.todo}
                </div>
                <div className="flex mx-4">
                <button name={item.id} onClick={(e) => {handleEdit(e,item.id)}}
                className="flex justify-center items-center rounded-lg bg-blue-700 hover:bg-blue-600 cursor-pointer text-white p-1 w-12 h-10 m-2 ">
                  <img src={edit_icon} alt="Delete" className="m-3 bg-cover bg-center h-6 w-6"/>
                </button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} 
                className="flex justify-center items-center rounded-lg bg-red-700  hover:bg-red-500 cursor-pointer text-white p-1 h-10 m-2 ">
                  <img src={delete_icon} alt="Delete" className="m-3 bg-cover bg-center h-6 w-6"/>
                </button>
                </div>
              </div>
            )
          
          })}
        </div>
      </div>
    
  </div>
  </>
  )
}

export default App
