import { useEffect } from 'react'

const ReFetch = ({ reFetch }) => {
  useEffect(() => {
    setTimeout(() => {
      reFetch()
    }, 1000)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <p className="bg-slate-900 p-2 text-white">
        Something went wrong! Refetching...
      </p>
    </div>
  )
}
export default ReFetch
