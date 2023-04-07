import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const Telemetry = ({ host, port }) => {
  const [telemetryData, setTelemetryData] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // const socket = io(`http://${host}:${port}`, {
    const socket = io(`http://localhost:${port}`, {
      // transports: ['websocket'],
      reconnection: 100,
    })

    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onFetchData(data) {
      console.log(data)
      const packetStartByte = data.readUInt8(0)
      const telemetrySystemID = data.toString('ascii', 1, 11)
      const packetNumber = data.readUInt8(11)
      const packetSize = data.readUInt8(12)
      const altitude = data.readFloatBE(13)
      const speed = data.readFloatBE(17)
      const acceleration = data.readFloatBE(21)
      const thrust = data.readFloatBE(25)
      const temperature = data.readFloatBE(29)
      const crc16 = data.readUInt16BE(33)
      const delimiter = data.readUInt8(35)

      setTelemetryData({
        altitude,
        speed,
        acceleration,
        thrust,
        temperature,
      })
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('data', onFetchData)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('data', onFetchData)
    }
  }, [])

  return (
    <div className="grid grid-cols-2 gap-2 rounded-md  bg-white p-2">
      <div>
        <p>Connetion: </p>
        {isConnected === false ? (
          <p className="text-red-500">Offline</p>
        ) : (
          <p className="text-lime-500">Online</p>
        )}
      </div>
      <p>Speed: {telemetryData?.speed} </p>
      <p>Altitude: {telemetryData?.altitude} </p>
      <p>Acceleration: {telemetryData?.acceleration} </p>
      <p>Thrust: {telemetryData?.thrust} </p>
      <p>Temperature: {telemetryData?.temperature} </p>
    </div>
  )
}
export default Telemetry
