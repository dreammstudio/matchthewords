import { useEffect, useState } from "react"
import Game from "./components/Game"
import GameStart from "./components/GameStart"
import WinPage from "./components/WinPage"
function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [words, setWords] = useState([])
  const [counter, setCounter] = useState(0)
  const [win, setWin] = useState(false)
  return (
   <div>
    {!isStarted && <GameStart functions={{isStarted,setIsStarted,words,setWords}}/>}
    {isStarted && !win && <Game functions={{words,setIsStarted,setWords,setWin,setCounter,counter}}/>}
    {win && <WinPage words={words} counter={counter}/>}
   </div>
  )
}

export default App
