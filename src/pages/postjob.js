import { Authenticator} from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css'
import React, {useRef, useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { API, graphqlOperation, Storage } from "aws-amplify";
import {createJobpost } from '../graphql/mutations'
import config from "../aws-exports"
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from "../constants/routes";

const {
    aws_user_files_s3_bucket_region:region,
    aws_user_files_s3_bucket: bucket
} = config

const apiKey = process.env.REACT_APP_GMAP_API
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

const extractAddress = (place) => {

  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    }
  }

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach(component => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }

  });

  return address;
}

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
        image: "",
    })
    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
  
  
    // init gmap script
    const initMapScript = () => {
      // if script already loaded
      if(window.google) {
        return Promise.resolve();
      }
      const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
      return loadAsyncScript(src);
    }
  
    // do something on address change
    const onChangeAddress = (autocomplete) => {
      const place = autocomplete.getPlace();
      setAddress(extractAddress(place));
    }
  
    // init autocomplete
    const initAutocomplete = () => {
      if (!searchInput.current) return;
  
      const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
      autocomplete.setFields(["address_component", "geometry"]);
      autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
  
    }
  
  
    const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
      const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
      searchInput.current.value = "Getting your location...";
      fetch(url)
          .then(response => response.json())
          .then(location => {
            const place = location.results[0];
            const _address = extractAddress(place);
            setAddress(_address);
            searchInput.current.value = _address.plain();
          })
    }
  
  
    const findMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          reverseGeocode(position.coords)
        })
      }
    }
    useEffect(() => {
      initMapScript().then(() => initAutocomplete())
    }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            if(!jobdetails.title || !jobdetails.description || !jobdetails.contact || !jobdetails.location) return
            await API.graphql(API.graphql(graphqlOperation(createJobpost, {
                input: jobdetails
            })))
            
            setJobDetails({
                title: "",
                description: "",
                price: "",
                location: "",
                contact: "",
                pro: "",
                image: "",
            })
            history(ROUTES.FIND_JOB)
        }
        catch(err)
        {
            console.log('error adding job', err)
            history(ROUTES.FIND_JOB)
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
            <h2 className='font-semibold text-base m-2 text-3xl'>Post your job</h2>
             <form onSubmit={handleSubmit} className='flex flex-col container mx-auto items-center max-w-screen-sm'>
        
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)} />
                        <div className='w-3/4 flex items-center align-items'>
                            <input 
                                ref={searchInput} 
                                type="text"  
                                name="location"
                                placeholder='Enter your location'  
                                onChange={(e) =>{
                                    setJobDetails({ ...jobdetails, location: e.target.value})
                                }}
                                className='mt-4 mb-2 border-2  py-2 px-4 rounded w-full'/>
                            <button onClick={findMyLocation} className="rounded-2xl ml-2 p-1 border">
                                {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>}
                            </button>
                        </div>
                        <div className="border p-4 rounded-2xl w-3/4">
                            <p className='font-semibold mb-2'>City: <span className='font-normal'>{address.city}</span></p>
                            <p className='font-semibold mb-2'>State: <span className='font-normal'>{address.state}</span></p>
                            <p className='font-semibold mb-2'>Zip: <span className='font-normal'>{address.zip}</span></p>
                            <p className='font-semibold'>Country: <span className='font-normal'>{address.country}</span></p>
                        </div>
                    <input type="text"
                        name="pro"
                        onChange={(e) =>{
                            setJobDetails({ ...jobdetails, pro: e.target.value})
                        }}
                        placeholder='Plumber, Electrician etc..'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded w-3/4'/>
                    
                    <input 
                        name="title"
                        onChange={(e) =>{
                            setJobDetails({ ...jobdetails, title: e.target.value})
                        }}
                        type="text" 
                        placeholder='Enter job title'  
                        className='mt-4 mb-2 border-2  py-2 px-4 rounded w-3/4'/>
                    <input 
                         name="description"
                         onChange={(e) =>{
                             setJobDetails({ ...jobdetails, description: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter job description'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded w-3/4'/>
                    <input 
                         name="price"
                         onChange={(e) =>{
                             setJobDetails({ ...jobdetails, price: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter your budget'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded w-3/4'/>
                     <input 
                         name="contact"
                         onChange={(e) =>{
                             setJobDetails({ ...jobdetails, contact: e.target.value})
                         }}
                        type="text" 
                        placeholder='Enter your contact details'  
                        className='mt-4 mb-2 border-2 py-2 px-4 rounded w-3/4'/>
                    <button className='rounded-lg text-white font-semibold py-2 px-4 mt-4 text-lg transition ease-in-out delay-150 bg-gray-700 hover:scale-110 hover:bg-gray-800 duration-300' type="submit">Submit</button>
                    
            </form>
        </div>
    </Authenticator>
    </>)
}
