import { launched, not_launched } from '../assets'
import { Link } from 'react-router-dom'
import Telemetry from './Telemetry'

const RocketCard = ({ rocket, showLink = true }) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-slate-900 p-4  text-sm lg:flex-row ">
      <div className="flex w-1/3  flex-col items-center justify-center gap-2">
        <div className="h-48 w-32">
          {rocket?.status === 'waiting' ||
          rocket?.status === 'deployed' ||
          rocket?.status === 'cancelled' ||
          rocket?.status === 'failed' ? (
            <img src={not_launched} />
          ) : (
            <img src={launched} />
          )}
        </div>
        <p>Status: {rocket?.status} </p>
        {showLink && (
          <Link
            className="rounded-md  bg-white px-4 py-2  text-slate-900"
            to={`/control_rocket/${rocket?.id}`}
          >
            Rocket Control
          </Link>
        )}
      </div>

      <div className="flex w-2/3 flex-col gap-4  text-slate-950">
        <div className="grid grid-cols-2 gap-2 rounded-md  bg-white p-2">
          <p>Model: {rocket?.model}</p>
          <p>Mass: {rocket?.mass}</p>
          <p>Weight: {rocket?.payload?.weight}</p>
          <p>Payload: {rocket?.payload?.description}</p>
        </div>
        <Telemetry
          host={rocket?.telemetry?.host}
          port={rocket?.telemetry?.port}
        />
        <div className="grid grid-cols-2 gap-2 rounded-md  bg-white p-2">
          <div>
            <p>Deployed: </p>
            {rocket?.timestamps?.deployed
              ? new Date(rocket?.timestamps?.deployed).toLocaleString()
              : ''}
          </div>
          <div>
            <p>Launched: </p>
            {rocket?.timestamps?.launched
              ? new Date(rocket?.timestamps?.launched).toLocaleString()
              : ''}
          </div>
          <div>
            <p>Cancelled: </p>
            {rocket?.timestamps?.cancelled
              ? new Date(rocket?.timestamps?.cancelled).toLocaleString()
              : ''}
          </div>
          <div>
            <p>Failed: </p>
            {rocket?.timestamps?.failed
              ? new Date(rocket?.timestamps?.failed).toLocaleString()
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
export default RocketCard
