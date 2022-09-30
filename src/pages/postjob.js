import { Authenticator} from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css'
import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { API, graphqlOperation, Storage } from "aws-amplify";
import {createJobpost} from '../graphql/mutations'
import config from "../aws-exports"
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import Dashboard from './dashboard'
import { queries } from '@testing-library/react';

const {
    aws_user_files_s3_bucket_region:region,
    aws_user_files_s3_bucket: bucket
} = config

export default function PostJob()
{
    const history = useNavigate()
    const [image, setImage] = useState(null)
    let [userEmail, setuserEmail] =  useState("")
    useEffect(
       function ()
       {
              Auth.currentAuthenticatedUser().then(user => {
                setuserEmail(user.attributes.email)
            })
       }, [])
    const [jobdetails, setJobDetails] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        contact: "",
        pro: "",
        image: ""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(jobdetails)
        try{
            if(!jobdetails.title || !jobdetails.description || !jobdetails.contact) return
            await API.graphql({
                query: queries.createJobpost,
                variables: {input: jobdetails},
                authMode: 'AWS_IAM'
            })
            setJobDetails({
                title: "",
                description: "",
                price: "",
                location: "",
                contact: "",
                pro: "",
                image: ""
            })
            history("/dashboard")
        }
        catch(err)
        {
            console.log('error adding job', err)
        }
    }
    const handleImageUpload = async (e)=>{
        e.preventDefault()
        const file = e.target.files[0]
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`

        try{
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });

            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            setJobDetails({ ...jobdetails, image: url });
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <>
        <Header 
            showDashboard={true}
            showLogin={userEmail ? false: true}
            showSignout={userEmail ? true: false}
            
        />
        <Authenticator>
        <div className='w-full flex items-center flex-col align-items'>
            <h2 className='font-semibold text-base m-2 text-2xl'>Post your job</h2>
             <form onSubmit={handleSubmit} className='flex flex-col container mx-auto items-center'>
        
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)} />
                    <input type="text"
                        name="location"
                        onChange={(e) =>{
                            setJobDetails({ ...jobdetails, location: e.target.value})
                        }}
                        placeholder='Enter your location'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded'/>
                    <input type="text"
                        name="pro"
                        onChange={(e) =>{
                            setJobDetails({ ...jobdetails, pro: e.target.value})
                        }}
                        placeholder='Plumber, Electrician etc..'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded'/>
                    
                    <input 
                        name="title"
                        onChange={(e) =>{
                            setJobDetails({ ...jobdetails, title: e.target.value})
                        }}
                        type="text" 
                        placeholder='Enter job title'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded'/>
                    <input 
                         name="description"
                         onChange={(e) =>{
                             setJobDetails({ ...jobdetails, description: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter job description'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded'/>
                    <input 
                         name="price"
                         onChange={(e) =>{
                             setJobDetails({ ...jobdetails, price: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter your budget'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded'/>
                     <input 
                         name="contact"
                         onChange={(e) =>{
                             setJobDetails({ ...jobdetails, contact: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter your contact details'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded'/>
                    <button className='rounded-lg text-white font-semibold py-2 px-4 mt-4 text-lg transition ease-in-out delay-150 bg-gray-700 hover:scale-110 hover:bg-gray-800 duration-300' type="submit">Submit</button>
                    
            </form>
        </div>
    </Authenticator>
    </>)
}
