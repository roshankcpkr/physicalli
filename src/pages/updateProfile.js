import { Authenticator} from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css'
import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { API, graphqlOperation, Storage } from "aws-amplify";
import {updateUser} from '../graphql/mutations'
import config from "../aws-exports"
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';

const {
    aws_user_files_s3_bucket_region:region,
    aws_user_files_s3_bucket: bucket
} = config


export default function UpdateProfile()
{
    let [userEmail, setuserEmail] =  useState("")
    useEffect(
       function ()
       {
              Auth.currentAuthenticatedUser().then(user => {
                setuserEmail(user.attributes.email)
            })
       }, [])
    const history = useNavigate()
    const [profilepic, setImage] = useState(null)
    const [profileDetails, setProfileDetails] = useState({
        firstname: "",
        lastname: "",
        email: "userEmail",
        description: "",
        skill: [],
        profilepic: "",
        location:" ",
    })
    console.log(userEmail)
    console.log(profileDetails)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await API.graphql(graphqlOperation(updateUser, {
                input: profileDetails
            }))
            setProfileDetails({
                firstname: "",
                lastname: "",
                email: userEmail,
                description: "",
                skill: [],
                profilepic: "",
                location:" ",
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
            setProfileDetails({ ...profileDetails, profilepic: url });
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <>
        <Header 
            showLogin={false}
            showSignout = {true}
            showDashboard={true}
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
                        name="firstname"
                        onChange={(e) =>{
                            setProfileDetails({ ...profileDetails, firstname: e.target.value})
                        }}
                        placeholder='First Name'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded'/>
                    <input type="text"
                        name="lastname"
                        onChange={(e) =>{
                            setProfileDetails({ ...profileDetails, lastname: e.target.value})
                        }}
                        placeholder='Lastname'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded'/>
                    
                    <input 
                        name="title"
                        onChange={(e) =>{
                            setProfileDetails({ ...profileDetails, email: e.target.value})
                        }}
                        type="email"
                        value={userEmail} 
                        placeholder='email'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded'/>
                    <input 
                         name="description"
                         onChange={(e) =>{
                             setProfileDetails({ ...profileDetails, description: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter about yourself'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded'/>
                     <input 
                         name="skills"
                         onChange={(e) =>{
                             setProfileDetails({ ...profileDetails, skill: [e.target.value]})
                         }}
                        type="text" 
                        placeholder='Enter your profession'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded'/>
                     <input 
                         name="location"
                         onChange={(e) =>{
                             setProfileDetails({ ...profileDetails, location: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter your location'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded'/>
                    <button className='rounded-lg text-white font-semibold py-2 px-4 mt-4 text-lg transition ease-in-out delay-150 bg-gray-700 hover:scale-110 hover:bg-gray-800 duration-300' type="submit">Submit</button>
                    
            </form>
        </div>
    </Authenticator>
    </>)
}
