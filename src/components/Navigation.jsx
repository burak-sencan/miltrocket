import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="flex justify-center gap-4 p-4">
      <Link className="rounded-sm bg-white px-4 py-2 text-slate-900" to="/">
        Rockets
      </Link>
      <Link
        className="rounded-sm bg-white px-4 py-2 text-slate-900"
        to="/weather"
      >
        Weather
      </Link>
    </nav>
  )
}
export default Navigation
