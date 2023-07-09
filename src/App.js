import './App.css';
import Questions from './components/Questions';
import blob1 from './blob 5 (1).png'
import blob2 from './blob 5.png'
import React, {useEffect, useState} from 'react';
import {nanoid} from 'nanoid'

function App() {
  const [quesData, setQuesData] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [submit, setSubmit] = React.useState(false)
  useEffect ( () => {
    if(!submit) {
      fetch(`https://opentdb.com/api.php?amount=5`)
      .then(res => res.json())
      .then(data => setQuesData(data.results.map(item => {
        return {...item, isClicked: false,id: nanoid()}
      })))
    }
    
  },[submit])

  function check (id) {
    setQuesData(prevData => prevData.map(item => {
      return item.id === id ? {...item, isClicked: !item.isClicked} : item
    }))
  }

  return (
    <div className="App">
      {isReady ? 
        <Questions 
          quesData = {quesData}
          check = {check}
          setSubmit = {setSubmit}
          submit = {submit}
        />
        :
        <div className='openning-page'>
          <h1 className='head'>Quizzical</h1>
          <p className='desc'>Boost your Knowledge</p>
          <button className='open-button' onClick={() => setIsReady(true)}>Start quiz</button>
        </div>
    }
      
      <img src={blob1} className='img-bl' alt='curve'></img>
      <img src={blob2} className='img-tr' alt='curve'></img>
    </div>
  );
}

export default App;
