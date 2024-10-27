import React from 'react'
import { useState , useEffect} from 'react';
import Header from './components/Header';
import NoteC from './components/NoteC';
import Input from './components/Input';
import ReadNote from './components/ReadNote';
import Popup from './components/Popup';


function App() {

  const [ input , setInput] = useState(false);
  const [inputMethod, setInputMethod] = useState(null)
  const [ read , setRead] = useState({display : false, id: null});
  const [allnote, setallNote] = useState(null)
  const [error , setError] = useState(false);
  const [activity, setActivity] = useState(1);

  useEffect(() => {

    fetch("http://localhost:4000/api/note/")
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data);
        setallNote(data);
      })


  }, [activity])

  function handeleditnote(id){
    setInputMethod({m: "Edit",id: id});
    setInput(true);
  }

  function handeldelete(id){
    fetch(`http://localhost:4000/api/note/delete/${id}`,{
      method: "DELETE"
    })
    .then(res =>{
      return res.json()
    })
    .then(data => {
      respons(data);
    })
  }

  function handelCloseinput(){
    setInput(()=> !input);
    setActivity(() => activity+1)
  }

  function handelCloseRead(){
    setRead({
      display: false,
      id : null
    })
  }


  function handelRead(id){
    setRead({
      display: true,
      id : id
    })
  }

  function handelAddNew(){
    setInputMethod({m: "Add",id: null});
    setInput(true);
  }

  function respons(data){
    setError(data);
    setTimeout(()=>{
      setError(false);
    },3500)
    setActivity(() => activity+1)
  }

  return (
    <div className="App">

      {/* popup  */}
    {error && <Popup prop = {error} />}
      

      {/* Input box */}
      {input && <Input 
      methode = {inputMethod}
      handelCloseinput = {handelCloseinput}
      respons = {respons}
      />}


      {/* Read box */}
      {read.display && <ReadNote readD = {read} handelCloseRead = {handelCloseRead}/>}


       {/* Header */}
      <Header 
      handelAddNew = {handelAddNew}
      />


      {/* NoteCards */}
      {allnote === null ? <h3> Loding ...</h3> :
      allnote.map(item => (
        <NoteC 
        Ndata = {item}  
        key={item._id} 
        handeleditnote={handeleditnote} 
        handeldelete={handeldelete} 
        handelRead = {handelRead}
        respons = {respons}
        />))}
      
    </div>
  );
}

export default App;
