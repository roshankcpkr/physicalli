import { Auth } from 'aws-amplify';
import React, {useState, useEffect, useRef} from 'react'

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
export default function SearchBar(props)
{
    const {jobs} = props
    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    const [tempData, setTempData] = useState(null);
    console.log("searchbar", tempData)
    const onLocationChange = (value) => {
        const newData = jobs.filter(
          (job) =>
           job.location.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        setTempData(newData);
      };
      const onTitleChange = (value) => {
        const newData = jobs.filter(
          (job) =>
            job.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            job.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        setTempData(newData);
      };
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

    return (
        <section >
        <div className="m-auto mt-4 max-w-md">
            <form className='flex items-center w-full bg-white p-2 rounded'>
                <div className="flex items-center w-2/4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1/5 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input placeholder="Job title, work" className='p-4 border-r outline-0	w-4/5' onChange={(e) => onTitleChange(e.target.value)}/>
                </div>
                <div className='flex items-center ml-2 w-2/4'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={findMyLocation} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1/5 cursor-pointer h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <input placeholder="Location"  type="text" ref={searchInput} name="location" className='p-4 outline-0 w-4/5' onChange={(e) => onLocationChange(e.target.value)}/>
                </div>
            </form>
        </div>

        {tempData === null ? jobs.map(({image, id, title, description, contact, location}) =>(
      <div key={id} className="max-w-sm rounded-xl shadow-xl bg-white mx-auto m-4 mb-8">
              <div>
                <img src={image} alt={title} className="w-full"/>
              </div>
              <div className='p-4'>
              <p className='text-center font-bold text-2xl'>Title: {title}</p>
              <p className='text-lg font-semibold text-center m-2'>Description: {description}</p>
              <p className='text-lg font-semibold text-center m-2'>Contact: {contact}</p>
              <p className='text-lg font-semibold text-center m-2'>Address: {location}</p>
              </div>
                
              
            </div>
      )) : 
      tempData.map(({image, id, title, description, contact, location}) =>(
        <div key={id} className="max-w-sm rounded-xl shadow-xl bg-white mx-auto m-4 mb-8">
                <div>
                  <img src={image} alt={title} className="w-full"/>
                </div>
                <div className='p-4'>
                <p className='text-center font-bold text-2xl'>Title: {title}</p>
                <p className='text-lg font-semibold text-center m-2'>Description: {description}</p>
                <p className='text-lg font-semibold text-center m-2'>Contact: {contact}</p>
                <p className='text-lg font-semibold text-center m-2'>Address: {location}</p>
                </div>
                  
                
              </div>
        ))
      }
        </section>
    )
}