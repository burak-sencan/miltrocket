import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import CompressIcon from '@mui/icons-material/Compress'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import ReFetch from '../components/ReFetch'

const Weather = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `${import.meta.env.VITE_URL}/weather`,
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.request(options)
      setData(response.data)
      setIsLoading(false)
      setError(false)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const reFetch = () => {
    setIsLoading(true)
    fetchData()
  }

  useEffect(() => {
    fetchData()

    // Update weather
    const interval = setInterval(async () => {
      try {
        const response = await axios.request(options)
        setData(response.data)
      } catch (error) {}
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ReFetch reFetch={reFetch} />
      ) : (
        <div className="flex flex-col items-center p-4 justify-center gap-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Box
              text={'temperature'}
              val={data?.temperature}
              icon={<ThermostatIcon />}
            />
            <Box
              text={'humidity'}
              val={data?.humidity}
              icon={<WaterDropIcon />}
            />
            <Box
              text={'pressure'}
              val={data?.pressure}
              icon={<CompressIcon />}
            />
            <Box text={'time'} val={data?.time} icon={<AccessTimeIcon />} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className=" flex flex-col items-center justify-center gap-2  rounded-md bg-white p-4 text-slate-950">
              <p>Probability: {data?.precipitation?.probability.toFixed(4)}</p>
              <div className="flex gap-4">
                <p>{data?.precipitation?.rain === true ? 'Rain' : 'No rain'}</p>
                <p>{data?.precipitation?.snow === true ? 'Snow' : 'No snow'}</p>
                <p>
                  {data?.precipitation?.sleet === true ? 'Sleet' : 'No sleet'}
                </p>
                <p>{data?.precipitation?.hail === true ? 'Hail' : 'No hail'}</p>
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center gap-2  rounded-md bg-white p-4 text-slate-950">
              <p>Wind Direction {data?.wind?.direction}</p>
              <p>Angle: {data?.wind?.angle.toFixed(4)}</p>
              <p>Speed: {data?.wind?.speed.toFixed(4)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Info box
const Box = ({ text, val, icon }) => {
  return (
    <div className=" flex items-center justify-center gap-2 rounded-md bg-white p-4 text-slate-950">
      <>
        {icon}
        <p>{text}</p>
      </>

      {typeof val === 'number' ? (
        <p>{val.toFixed(4)}</p>
      ) : typeof val === 'string' ? (
        <p>{Date(val)}</p>
      ) : (
        'loading'
      )}
    </div>
  )
}

export default Weather
