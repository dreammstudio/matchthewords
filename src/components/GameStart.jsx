import React from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react'
function GameStart({functions:{isStarted,setIsStarted,words,setWords}}) {
  const [error, setError] = React.useState('')
  const [show, setShow] = React.useState(true)
  const [parent] = useAutoAnimate()
  return (
    <div className='p-4 flex flex-col items-center justify-center gap-2'>
        <h1 className='text-4xl font-bold text-center'>{"Let's start Game!"}</h1>
        <h2 className='text-2xl font-thin text-center'>Write your word in input and press enter!</h2>
        
        <div className='w-full md:w-[75%] lg:w-[50%]'>
        <input className={`bg-gray-700 rounded px-3 py-2 border ${error.length > 0 ? 'border-red-600' : 'border-gray-600'} w-full`}
        placeholder='apple banana etc.'
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            if(event.target.value.length == 0) return setError('Write something!')
            if(words.includes(event.target.value.trim())) return setError('This word is already in list!')
            setWords([...words,event.target.value])
            setError('')
            event.target.value = ''
          }
        }}
        />
        <p className='text-sm text-red-500 font-thin mt-2'>{error}</p>
        </div>

        <div className='w-full md:w-[75%] lg:w-[50%] flex flex-col gap-2 items-start justify-start'>
        <button className='mr-auto' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} words ({words.length})</button>
        <div className='flex gap-2 flex-wrap' ref={parent}>
        {
          show && words.map((word,index) => {
            return <div key={index} 
            className='text-base text-gray-50 bg-gray-600 p-2 min-w-[100px] rounded font-thin inline-flex justify-between items-center'>
              {word}
              <button
              className="text-red-600 font-bold ml-auto"
              onClick={() => {
                setWords(words.filter((w,i) => i !== index))
              }}>
                X
              </button>
            </div>
          }
          )
        }
        </div>
        </div>

        <button className='bg-blue-500 w-full md:w-[75%] lg:w-[50%] my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={() => {
          if(words.length == 0) return setError('Write something!')
          setIsStarted(true)
        }
        }>
        Start
        </button>

    </div>
  )
}
export default GameStart