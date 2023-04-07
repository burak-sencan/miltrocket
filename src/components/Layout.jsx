import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div className="flex h-screen flex-col  justify-between bg-gradient-to-b from-slate-700 to-gray-800  text-white">
      <div className="overflow-auto p-2">
        <Outlet />
      </div>

      <div className="self-center w-full">
        <Navigation />
      </div>
    </div>
  )
}
export default Layout
