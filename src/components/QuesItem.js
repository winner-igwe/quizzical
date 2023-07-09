import React from "react"
import {decode} from "html-entities"
import {nanoid} from "nanoid"

export default function QuesItem ({question,submit,correctAns,incorrectAns,id,check,data,setTot,tot}) {
    const [optionArray, setOptionArray] = React.useState([])
    const [currId, setCurrId] = React.useState('')

    React.useEffect(() => {
        const answersArray = [...incorrectAns];
        function generateRand() {
          return Math.floor(Math.random() * 4);
        }
        answersArray.splice(generateRand(), 0, correctAns);
        setOptionArray(answersArray.map(val => {
            return {value: val, id: id, pClicked: false,pScore:0, isCorrect:false}
        }));
    },[correctAns,id,incorrectAns]);


    function handleClick (answer) {
        setOptionArray(prevItem => prevItem.map(item => {
            return item === answer ? {...item, pClicked: !item.pClicked}: {...item, pClicked: false}
        }))
        check(answer.id)

        const matchingItem = data.find(item => item.id === optionArray[0].id)
        setOptionArray(prevArray => 
            prevArray.map((option) => 
                option.value === matchingItem.correct_answer ? {...option,isCorrect: true} : option
            )
        )
    }


    function sec () {
        const val =optionArray.filter(item => item.pClicked && item.isCorrect )
        // setCorrect(val.id)
        if(val.length > 0) {
            if(tot.length > 0) {
                setTot(prev => {
                    const match = prev.find(item => item.id === val[0].id)
                    if(match) {
                        return [...prev.filter(item => item!==match),{id:val[0].id,ans:val[0].value}]
                    }else {
                        return [...prev,{id:val[0].id,ans:val[0].value}]
                    }
                })
            }else {
                setTot([{id: val[0].id,ans: val[0].value}])

            }
        }
        else{
            if(tot.length > 0) {
                setTot(prev => {
                    const same = prev.find(item => item.id === currId)
                    if(same) {
                        return prev.filter(item => item !== same)
                    }else {
                        return prev
                    }
                })
            }
            else {
                return setTot([])
            }
        }

    }

    React.useEffect(() => {
        sec()
    },[optionArray])

    //ltRed: "#F7D9DB", ltGreen: "#94D7A2"
    const everyAns = optionArray.map((answer) => {
        function retrnColor() {
            if(submit && answer.isCorrect) {
                return "#94D7A2"
            }else if(submit && answer.pClicked && !answer.isCorrect) {
                return "#F7D9DB"
            }else if(answer.pClicked) {
                return "#D6DBF5"
            }else if(!answer.pClicked) {
                return "#F5F7FB"
            }
        }
        
        const styles = {
            backgroundColor:  retrnColor()
        }
        return (
            <span 
                className="option" 
                key={nanoid()}
                id = {id}
                style={styles}
                onClick={(e) => {
                    handleClick (answer)
                    setCurrId(e.target.id)
                    // sec()
                }}
            >{decode(answer.value)}
            </span>
        )
    })

    return (
        <div className="ques-item">
                <h3 className="question">{decode(question)}</h3>
                <div className="button-span">
                    {everyAns}
                </div>
            </div>
    )
}