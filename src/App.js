import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [wDetails, setwDetails] = useState()
let [city , setCity] = useState('')
let [isLoading, setIsLoadig] = useState(false)
let getData =(event)=>{

  event.preventDefault()

  if(city.trim() === ''){
    alert("Please enter a city name")
    return;
  }

  setIsLoadig(true)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f70d5c03bf2e9cff6b1e172ed0c2dc0d&units=metric`)
.then((res)=>res.json())
.then((finalRes)=>{
  if(finalRes.cod=="404"){
  setwDetails(undefined)
}
else{
setwDetails(finalRes)
}
setIsLoadig(false)
})

  event.preventDefault()
  // console.log(city);
  setCity('')
}

  return (
    <div className='w-full h-full  '>
      
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-emerald-50'>Weather App</h1>

        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='Enter City Name' />
          <button className='bg-[#434364] pt-2 pb-2 pr-2 pl-2 text-white' >Submit</button>
        </form>


        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
          
<img src='https://i.gifer.com/origin/d3/d3f472b06590a25cb4372ff289d81711_w200.gif' width={200} className= {`absolute left-[30%] ${isLoading ? '': 'hidden'}`} /> 
          
          {wDetails!== undefined
          ?
          <>
          <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>
          {wDetails.sys.country}
            </span></h3>
          <h2 className='font-bold text-[40px]'>
            {wDetails.main.temp}
            </h2>
          
            <img src= {`http://openweathermap.org/img/wn/${wDetails.weather[0].icon}.png`} alt='Weather Icon' style={{ height: '80px', width: '80px' }} />

          <p>{wDetails.weather[0].description}</p>
          </>
          :
          "No Data Found"

          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
