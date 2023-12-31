import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(
    <li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onchangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>
    )
  }
  return   <nav>
  <ol>
    {lis}
  </ol>
</nav>
}
function Arctile(props){
  return     <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}
function Header(props){
  console.log('props',props.title)
  return  <header>
  <h1><a href='/' onClick={(event)=>{
    event.preventDefault();
    props.onchangeMode();
  }}>{props.title}</a></h1>
</header>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onClick(title,body);
    }}>
      <p><input type="text" name='title' placeholder='title'></input></p>
      <p><textarea name='body' placeholder='body'></textarea> </p>
      <p><input type="submit" value="Create"></input></p>
   </form>
  </article>
}
function App() {
  // const _mode = useState("WELCOME");
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode,setMode] = useState("WELCOME");
  const [id,setId] = useState(null);
  const [nextId,setNextId] =useState(4);
  
  const [topics,setTopics] = useState{[
    {id:1, title:'html', body:'html is .....'},
    {id:2, title:'css', body:'css is .....'},
    {id:3, title:'js', body:'js is .....'}
  ]}
  let content = null;
  if(mode === 'WELCOME'){
    content = <Arctile title="Weclome" body="Hello, WEB!!"></Arctile>
  }else if(mode ==="READ"){
    let title,body =null
    for(let i=0; i<topics.length;i++){
      if(topics[i].id===id){
          title = topics[i].title;
          body=topics[i].body;
      }
    }
    content=  <Arctile title={title} body={body}></Arctile>
  }else if(mode === 'CREATE'){
      content = <Create onCreate={(_title,_body)=>{
        const newTopic = {id:nextId,title:_title, body:_body}
        
      }}></Create>
    }

  return (
    <div>
      <Header title="WEB" onchangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onchangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}   
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode("CREATE");
      }}>Create</a>
   </div>
  );
}

export default App;
