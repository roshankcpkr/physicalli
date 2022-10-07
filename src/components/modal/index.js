import React, {useState} from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {API , graphqlOperation, Storage} from 'aws-amplify'
import {updateJobpost} from '../../graphql/mutations'
import {v4 as uuidv4} from 'uuid'
import { Authenticator} from '@aws-amplify/ui-react'
import config from '../../aws-exports'

const {
    aws_user_files_s3_bucket_region:region,
    aws_user_files_s3_bucket: bucket
} = config


function Modal({ openModal, jobdetails, id}) {
    
    const jobValue = jobdetails.filter((el) =>{
        return el.id === id ? el : null
    })
    const [editJobDetails, setJobDetails] = useState(jobValue[0])
    const history = useNavigate();
    const [image, setImage] = useState(null);
    console.log("editjobdetails",editJobDetails)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await API.graphql({
              ...graphqlOperation(updateJobpost, { input: editJobDetails }),
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            window.location.reload(false)
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
            setJobDetails({ ...editJobDetails, image: url });
        }
        catch (err) {
            console.log(err);
        }
    }
  return (
<Authenticator>
    <div className="modalBackground">
      <div className="modalContainer overflow-auto ">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              openModal();
            }}
          >
            X
          </button>
        </div>
        <div className="title">
        <h2 className='font-semibold text-base m-2 text-3xl'>Edit your job</h2>
        </div>
        <div className="body w-full flex items-center flex-col align-items">
             <form onSubmit={handleSubmit} className='flex flex-col container mx-auto items-center scroll-smooth hover:scroll-auto max-w-screen-sm'>
        
                   {image ? <div className="flex items-center w-1/2 h-1/2  justify-center mb-4 mt-4">
                        <img src={image} alt="uploaded" className='rounded-lg'/>
                   </div> : <div className="flex items-center justify-center w-1/2 h-1/2 mb-4 mt-4">
                        <img src={editJobDetails.image} alt="uploaded" className=' rounded-lg'/>
                   </div>}
                 <input 
                    class="text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                    cursor-pointer focus:outline-none w-1/2 h-1/2 focus:border-blue-500 focus:bg-white"
                     type="file"
                     accept="image/*"
                     onChange={(e) => handleImageUpload(e)} />
                        <div className='w-3/4 flex items-center align-items'>
                            <input 
                                type="text"  
                                name="location"
                                placeholder='Enter your location'  
                                onChange={(e) =>{
                                    setJobDetails({ ...editJobDetails, location: e.target.value})
                                }}
                                value={editJobDetails.location}
                                className='mt-4 mb-2 border-2  py-2 px-4 rounded w-full'/>
                        </div>
                    <input type="text"
                        name="pro"
                        onChange={(e) =>{
                            setJobDetails({ ...editJobDetails, pro: e.target.value})
                        }}
                        placeholder='Plumber, Electrician etc..'  
                        value={editJobDetails.pro}
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded w-3/4'/>
                    
                    <input 
                        name="title"
                        onChange={(e) =>{
                            setJobDetails({ ...editJobDetails, title: e.target.value})
                        }}
                        type="text" 
                        value={editJobDetails.title}
                        placeholder='Enter job title'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded w-3/4'/>
                    <input 
                         name="description"
                         onChange={(e) =>{
                             setJobDetails({ ...editJobDetails, description: e.target.value})
                         }}
                        type="text" 
                        value={editJobDetails.description}
                        placeholder='Enter job description'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded w-3/4'/>
                    <input 
                         name="price"
                         onChange={(e) =>{
                             setJobDetails({ ...editJobDetails, price: e.target.value})
                         }}
                        type="text" 
                        value={editJobDetails.price}
                        placeholder='Enter your budget'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded w-3/4'/>
                     <input 
                         name="contact"
                         onChange={(e) =>{
                             setJobDetails({ ...editJobDetails, contact: e.target.value})
                         }}
                        type="text" 
                        value={editJobDetails.contact}
                        placeholder='Enter your contact details'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded w-3/4'/>
                    <button className='rounded-lg text-white font-semibold py-2 px-4 mt-4 text-lg transition ease-in-out delay-150 bg-gray-700 hover:scale-110 hover:bg-gray-800 duration-300' type="submit">Save</button>
                    
            </form>
        </div>
        <div className="footer">
          <button
            onClick={() => {
                openModal();
            }}
            className="hover:brightness-75 text-white font-bold py-2 px-4 rounded"
            >
            Cancel
          </button>
        </div>
      </div>
    </div>
</Authenticator>
  );
}

export default Modal;