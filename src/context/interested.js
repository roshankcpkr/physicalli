import React, {useState, createContext} from "react"

const InterestContext = createContext()
const InterestProvider = ({children}) =>{
    const [interest, setInterest] = useState([])

    const addInterest = (job) =>{
        const {id, title, price, image } = job
        const jobItem = [...interest].find((job)=> job.id === id)
        if(jobItem){
            const jobItems = [...interest, {id, title, image, price}]
            setInterest(jobItems)
        }
    }
    const clearInterest = ()=>{
        setInterest([])
    }
    return (
        <InterestContext.Provider value={{interest, addInterest, clearInterest}}>
            {children}
        </InterestContext.Provider>
    )
}
export {InterestContext, InterestProvider}