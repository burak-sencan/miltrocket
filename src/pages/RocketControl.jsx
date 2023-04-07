import { useEffect, useState } from 'react'
import Weather from './Weather'
import { launched, not_launched } from '../assets'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ReFetch from '../components/ReFetch'
import RocketCard from '../components/RocketCard'

const RocketControl = () => {
  const { id } = useParams()
  const [rocket, setRocket] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `${import.meta.env.VITE_URL}/rockets`,
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.request(options)
      const tempRocket = response.data.filter((rckt) => rckt.id === id)
      setRocket(tempRocket[0])
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
  }, [])

  const handleRocket = async (mode, method) => {
    const endpoint = `/rocket/${rocket.id}/status/${mode}`

    const options = {
      method: method,
      url: `${import.meta.env.VITE_URL}/${endpoint}`,
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    }
    setIsLoading(true)
    try {
      const response = await axios.request(options)

      setData(response.data)
      fetchData() // update rocket
      setIsLoading(false)
      setError(false)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ReFetch reFetch={reFetch} />
      ) : (
        <main className="p-4">
          <h1>Rocket Control</h1>

          <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row ">
            {/* Rocket Info */}
            <div className="flex gap-2 rounded-lg bg-slate-900  text-sm lg:w-1/3">
              <RocketCard rocket={rocket} showLink={false} />
            </div>

            {/* Control Button */}
            <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-900 p-4 text-sm lg:w-1/3 ">
              <button
                className="w-2/3 rounded-md  bg-white px-4 py-2 text-slate-900 shadow hover:bg-slate-50"
                onClick={() => {
                  handleRocket('deployed', 'PUT')
                }}
              >
                Deploy
              </button>
              <button
                className="w-2/3 rounded-md  bg-white px-4 py-2 text-slate-900 shadow hover:bg-slate-50"
                onClick={() => {
                  handleRocket('launched', 'PUT')
                }}
              >
                Launch
              </button>
              <button
                className="w-2/3 rounded-md  bg-white px-4 py-2 text-slate-900 shadow hover:bg-slate-50"
                onClick={() => {
                  handleRocket('launched', 'DELETE')
                }}
              >
                Cancel Launch
              </button>
            </div>
            {/* Weather Info */}
            <div className="flex flex-col  gap-2 rounded-lg bg-slate-900  text-sm lg:w-1/3 ">
              <Weather />
            </div>
          </div>
        </main>
      )}
    </>
  )
}
export default RocketControl
