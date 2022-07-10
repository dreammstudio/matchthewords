import React from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react'
function Game({functions:{words,setWords,isStarted,setIsStarted,setWin,setCounter,counter}}) {
  const [message,setMessage] = React.useState('');
  const [alreadySelected,setAlreadySelected] = React.useState([]);
  const [parent] = useAutoAnimate()
  const [selected,setSelected] = React.useState([
    {word:'',index:-1},
    {word:'',index:-1},
  ]);
  React.useEffect(() => {
    let newWords = words.concat(words);
    newWords = newWords.sort(() => Math.random() - 0.5);
    setWords(newWords);
    if(selected[1].word.length < 1) {
      setMessage('Select second box!')
    }
    if(selected[0].word.length < 1) {
      setMessage('Select first box!')
    }    
  },[])
  React.useEffect(() => {
    if(isStarted === false) return;
    setTimeout(() => {
      setCounter(counter + 1)
    }
    ,1000)

  },[counter])
  
  React.useEffect(() => {
    function validate (word,word2) {
      return word.word === word2.word
    }
    if(selected[0].word.length > 0 && selected[1].word.length > 0) {
      if(alreadySelected.length >= words.length) {
        setMessage('All words are selected!')
        setWin(true)
      } 
      if(validate(selected[0],selected[1])) {
        setMessage("CORRECT!")
        setAlreadySelected([...alreadySelected,...selected])
        setSelected([
          {word:'',index:-1},
          {word:'',index:-1},
        ])
        if(alreadySelected.length + 2 >= words.length) {
          setMessage('All words are selected!')
          setWin(true)
        } 
      }else {
        setMessage("WRONG!")
        setTimeout(() => {
        setSelected([
          {word:'',index:-1},
          {word:'',index:-1},
        ])
        setMessage('Select first box!')
      },1000)
      }
    }
  },[selected])
  return (
    <div className='w-full md:w-[50%] lg:w-[75%] mx-auto my-4'>
      <h1 className='text-3xl font-bold text-center'>Game Started!</h1>
      <h2 className='text-2xl font-thin text-center text-red-600 mb-8'>{message}</h2>
      <h1 className="text-4xl font-bold absolute top-2 left-2">{counter}</h1>
      <button 
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-2'
      onClick={
        () => {
          setIsStarted(false)
          setWin(false)
          setCounter(0)
          setMessage('')
          setAlreadySelected([])
          setSelected([
            {word:'',index:-1},
            {word:'',index:-1},
          ])
        }
      }>
        End Game
      </button>

      <div className='flex flex-wrap gap-2 justify-center' ref={parent}>

      {
        words.map((word,index) => {
          return <div key={index} 
          className={`${alreadySelected.find(e => e.word == word) ||selected[0].index == index || selected[1].index == index ? 'bg-gray-200 text-black rounded-lg px-4 py-2 inline-block w-[75px] h-[75px] cursor-not-allowed' : ' bg-[url("/images/box.jpg")] bg-cover cursor-pointer rounded-lg w-[75px] h-[75px]'}`}
          onClick={(event) => {
            if(alreadySelected.find(e => e.word == word)) return;
            if(selected[0].word.length < 1) {
              event.target.style.transition = 'all .5s ease-in-out'
              event.target.style.transform = "rotateY(90deg)"
              setSelected([{word,index},selected[1]])
              setTimeout(() => {
              event.target.style.transform = "rotateY(0deg)"
              },500)
            }else if(selected[1].word.length < 1) {
              event.target.style.transition = 'all .5s ease-in-out'
              event.target.style.transform = "rotateY(90deg)"
              setSelected([selected[0],{word,index}])
              setTimeout(() => {
                event.target.style.transform = "rotateY(0deg)"
                },500)

            }else {
              setMessage("You can't select more than two boxes!")
            }
          }}>
            {
             alreadySelected.find(e => e.word == word) || selected[0].index == index || selected[1].index == index ? word : ''
            }
          </div>
        })
      }
      </div>
    </div>
  )
}

export default Game