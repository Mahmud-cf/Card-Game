import { useEffect, useState } from 'react'
import './App.css'
import bat from './assets/bat.png'
import ball from './assets/ball.png'
import glabs from './assets/glabs.png'
import halmate from './assets/halmate.png'
import stump from './assets/stump.png'
import pad from './assets/pad.png'
import cover from './assets/cover.png'
import Card from './Components/Card'


const cartImage = [
  { 'src': bat,'matched': false },
  { 'src': ball, 'matched': false },
  { 'src': glabs, 'matched': false },
  { 'src': halmate, 'matched': false },
  { 'src': stump, 'matched': false },
  { 'src': pad, 'matched': false }, 
]

function App() {
  const [card, setCard] = useState([])
  const [count, setCount] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)
  
  const shuffleCard = () => {
    const shuffleImage = [...cartImage, ...cartImage]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCard(shuffleImage)
    setCount(0)
  }

  const handleClick = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(() => {
    
    if(choiceOne && choiceTwo){
      setDisable(true)
      if(choiceOne.src === choiceTwo.src){
        setCard(prevCard => {
          return prevCard.map(cards => {
            if (cards.src === choiceOne.src){
              return{...cards, matched:true}
            }else{
              return cards
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCard()
  }, [])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setCount(preveCount => preveCount + 1)
    setDisable(false)
  }

  console.log(card)

  return (

    <div>
      <div className='page-wrapper' >
        <div className="wrapper">
          <div className="title-part">
            <h1>Card Game</h1>
            <button onClick={shuffleCard} >New Game</button>
            <div>
              <h5>Count : {count}</h5>
            </div>
          </div>
          <div className="game-part">
            {card.map((card) => (
              <Card  
                key={card.id} 
                card={card} 
                handleClick={handleClick}
                flipped={card === choiceOne || card === choiceTwo ||card.matched}
                disable ={disable}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
