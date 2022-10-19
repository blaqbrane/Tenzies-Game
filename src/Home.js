import { useEffect, useState } from "react";
import Tenzies from "./Tenzies";
import { nanoid } from "nanoid";
import Header from "./Header";
import Confetti from "react-confetti";

const Home = () => {
    const[numbers, setNumbers] = useState(randomDice())
    const[tenzies, setTenzies] = useState(false)
    const[lost, setLost] = useState(false)
    const handleClick=(id)=> {
            setNumbers(prevnum => {
                return prevnum.map((num) => {
                    return num.id === id ? {...num, isheld:!num.isheld} : num 
                })
            }) 
    }
    function generateNew () {
        return{
            value:Math.ceil(Math.random() * 6), isheld:false, id: nanoid()
        }
    }
    function randomDice () {
        const newTenzies = []
        for(let a = 0; a < 10; a++){
            newTenzies.push(generateNew())
        }
        return newTenzies
    }

    const handleNewDice =()=>{
        if(!tenzies && !lost){
            setNumbers(oldDice => {
                return oldDice.map((Dice) => {
                    return Dice.isheld ? Dice : generateNew()
                })
            })
        }else{
            setNumbers(randomDice)
            setTenzies(false)
            setLost(false)
        } 
    }
    useEffect(()=>{
        setTimeout(()=> {
            const allheld = numbers.every(num => num.isheld)
            const first_value = numbers[0].value
            const all_same_value = numbers.every(num => num.value === first_value)
            if(allheld && all_same_value){
                setTenzies(true) 
            }else if (allheld ){
                setLost(true)}
        })  
    },[numbers])
    return ( 
        <main>
            <Header/>
            <div className="header">
                <p>Roll untill all dice are the same. Click each dice to freeze it at it's current value between rolls</p>
            </div>
            {tenzies && <Confetti/>}
            <div className="tenzies-container">
                {numbers.map((number) => {
                    return <Tenzies
                    key={number.id}
                    value={number.value}
                    isheld={number.isheld}
                    handleClick={()=>handleClick(number.id)}
                    />
                })} 
            </div>
            {tenzies && <h3 className="final"> You won</h3>}
            {lost && <h3 className="final--lost"> You lost</h3>}
            <button onClick={handleNewDice} className="btn">{lost ? "Reset" : "Roll"}</button>
        </main>
     );
}
 
export default Home;
