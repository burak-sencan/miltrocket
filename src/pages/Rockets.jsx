import { useEffect, useState } from 'react'
import axios from 'axios'
import RocketCard from '../components/RocketCard'
import ReFetch from '../components/ReFetch'
import Loading from '../components/Loading'

const Rockets = () => {
  const [data, setData] = useState([])
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

    // Update Rockets
    const interval = setInterval(async () => {
      try {
        const response = await axios.request(options)
        setData(response.data)
      } catch (error) {}
    }, 10000)

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
        <div className="grid grid-cols-1 gap-8  p-2 lg:grid-cols-2">
          {data.map((rocket) => (
            <RocketCard rocket={rocket} key={rocket.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default Rockets
