import { useState, useEffect } from "react"

function SvgEdit () {
  return (
    <svg className="ml-3 hover:fill-slate-800 transition-all duration-200" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#686868"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>   
  )
}

function SvgTrash ({trash}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" onClick={trash} className="ml-3 hover:fill-slate-800 transition-all duration-200" height="24px" viewBox="0 -960 960 960" width="24px" fill="#686868"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
  )
}

function SvgCheckConstant () {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
  )
}

function SvgCheck ({toCheck, ev}) {
  const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>);
  const UncheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>);

  return (
    <div onClick={() => {
      ev();
    }}>
      {toCheck ? <CheckIcon /> : <UncheckIcon />}
    </div>
  )
};


function App() {

  const [taskName, newTaskName] = useState("");
  const [tasks, newTasks] = useState([])

  function trash(id) {
    newTasks(prev => {
      const newList = prev.map((item) => item.name === id ? {...item, removed: true} : item)
      localStorage.setItem("todos", JSON.stringify(newList));
      return newList;
    });
    
  }

  function checked (id) {
    newTasks(prev => {
      const newList = prev.map((item) => item.name === id ? {...item, done: true} : item);
      localStorage.setItem("todos", JSON.stringify(newList));
      return newList;
    });    
  }

  function add() {
    newTasks(prev => {
      const newList = [{name: taskName, done: false, removed: false}, ...prev];
      localStorage.setItem("todos", JSON.stringify(newList));
      return newList;
    })
  }

  useEffect(() => {
    newTasks(JSON.parse(localStorage.getItem("todos")));
  }, [])

  return (
    <div id="parent" className="bg-slate-100 flex h-[100vh]">
      <div className="border flex flex-1 flex-col  justify-center items-center p-10">
      <div className="flex flex-row stretch">
        <input type="input" id="inpt-task" className="border outline-none rounded-xl py-2 px-5 bg-slate-200 font-roboto" value = {taskName} onChange={(e) => {newTaskName(e.target.value); e.value = ''}} />
        <button className="py-2 px-5 border ml-5 rounded-xl border-slate-900 bg-slate-500 text-white text-xl hover:bg-slate-700 hover:drop-shadow-2xl transition-all duration-200 font-press-start" onClick={() => {
          newTaskName('');
          add();
        }}>Add</button>
      </div>    
      <ul className="list-none w-[550px] flex flex-col py-5">
      {
        tasks.filter(item => item.removed === false).map((item, index) => {
          return (
            <li className="border px-5 py-2 text-sm bg-slate-100 rounded-xl my-2 font-[500] text-[#3e3e44] font-press-start flex flex-row" key={index}><SvgCheck ev={() => checked(item.name)} toCheck={item.done}/><span className="flex-1 flex-grow m-auto ml-5">{item.name}</span><SvgTrash trash={() => trash(item.name)}/><SvgEdit /></li>
          )
        })
      }
      </ul>
      </div>


      <div className="task_done flex-1 p-5">
        <p className="font-press-start text-[#3e3e44]">Achievements: </p>
        {
          tasks.filter(item => item.done === true).map((item, index) => {
            return (
              <li className="border px-5 py-2 text-sm bg-slate-100 rounded-xl my-2 font-[500] text-[#3e3e44] font-press-start flex flex-row" key={index}><SvgCheckConstant /><span className="flex-1 flex-grow m-auto ml-5">{item.name}</span><SvgTrash trash={() => trash(item.name)}/></li>
            )
          })
        }
        <button 
        className="font-press-start text-[0.7em] text-white  bg-red-600 px-3 py-2 rounded-xl self-end hover:bg-red-500"
        onClick={() => newTasks(prev => {
          const newList = prev.filter(item => item.done === false);
          localStorage.setItem("todos", JSON.stringify(newList));
          return newList;
        })}>Clear Achievements</button>
      </div>
    </div>
  )
}

export default App
