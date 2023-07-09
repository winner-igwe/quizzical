import React from "react"
import QuesItem from "./QuesItem"
export default function Questions ({quesData,check,setSubmit,submit}) {
    const [tot, setTot] = React.useState([])

    const items = quesData.map(item => {

        return (
            <QuesItem
                question = {item.question}
                correctAns = {item.correct_answer}
                incorrectAns = {item.incorrect_answers}
                check = {check}
                tot = {tot}
                setTot = {setTot}
                submit = {submit}
                id = {item.id}
                key={item.id}
                data={quesData}
            />
        )
    })

    function handleSubClick () {
        setSubmit(prev => !prev)
        if(submit) {
            setTot([])
        }
    }

    return (
        <div className="allques">
            {items}
            <div className="dyna">
                {submit && <h1 className="result">your score is {tot.length}/{quesData.length}</h1>}
                <button className="check" onClick={handleSubClick}>{submit ? 'PlayAgain' : "Check Answers"}</button>
            </div>
            
        </div>
    )
}