import React, {useContext} from "react"
import {useParams,useNavigate} from "react-router-dom"
import { JobContext, JobProvider} from "../context/jobs.js"
import { InterestContext } from "../context/interested"

const JobDetails = () =>{
    const Details = ()=>{
        const {id} = useParams()
        const history = useNavigate()
        const {jobs} = useContext(JobContext)
        const {addInterest} = useContext(InterestContext)
        const job = jobs.find((job) =>{
            return job.id === id
        })
        const {image: url, title, description, price, location} = job;
        return(
            <section>
                <div>
                    <img src={url} alt={title}/>
    
                </div>
                <div>
                    
                    <h2>{title}</h2>
                    <p>{location}</p>
                    <p>{description}</p>
                    <p>{price}</p>
                    <button onClick={()=>{
                        addInterest({...job, id})
                        history("/interest")
                    }}>
                        Interested
                    </button>
                </div>
            </section>
        )
    }
    return(
        <JobProvider>
            <Details />
        </JobProvider>
    )

}
export default JobDetails