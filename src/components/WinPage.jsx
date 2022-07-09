import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

function WinPage({words,counter}) {
    const { width, height } = useWindowSize()
  return (
    <div>
        <h1 className='text-4xl font-bold text-center mt-16 uppercase'>Congratulations!</h1>
        <h2 className='text-3xl font-thin text-center'>YOU WIN!</h2>
        <Confetti
      width={width}
      height={height}
    />
    <div className='bg-gray-800 rounded-lg w-[95%] md:w-[50%] mx-auto mt-16 p-4 flex flex-col justify-start items-start'>
        <h1 className='text-4xl font-bold '>Game Information:</h1>
        <h3 className='text-2xl font-thin '>You have finished game in <span className='text-yellow-400'>{counter || 0}</span> seconds</h3>
        <h3 className='text-2xl font-thin'>You have selected <span className='text-yellow-400'>{words.length/2}</span> words</h3>

    </div>
        <a href='/' className='text-white text-2xl font-bold text-center my-4 block mx-auto bg-blue-500 px-4 py-2 rounded-lg md:w-[50%] hover:bg-blue-700'>Play Again</a>

    </div>
  )
}

export default WinPage