import React, { useEffect, useState,createContext } from "react";
import { API } from "aws-amplify";
import {listJobposts} from "../graphql/queries"

const JobContext = createContext()

const JobProvider = ({children}) =>{
    const [jobs, setJobs] = useState([])

    useEffect(()=>{
        fetchJobs()
    }, [])

    const fetchJobs = async () =>{
        try{
            const data = await API.graphql({
                query: listJobposts
            })
            const jobsDet = data.data.listJobposts.items
           console.log("i am running")
            setJobs(jobsDet)
        }
        catch(err)
        {
            setJobs(err.data.listJobposts.items)
        }
    }

    return (
        <JobContext.Provider value={{jobs}}>
            {children}
        </JobContext.Provider>
    )
}

export {JobContext, JobProvider}