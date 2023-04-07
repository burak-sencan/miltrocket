---
marp: true
---

# MiltRocket

- Command Control Application
![Rockets](https://user-images.githubusercontent.com/74815003/230667899-d1798784-300b-421f-b36e-68db92171821.png)
![RocketControl](https://user-images.githubusercontent.com/74815003/230667901-2d6eef52-8aee-4f08-bf37-602a3e0e9e5a.png)

---

## Library

React, TailwindCSS, Axios, Socket io, Vite, Material Icons

---

## Pages

- "/" List all rockets
  Component: <Rockets/>
  Info: Fetch and list all rockets.

- "/control-rocket/:id" Deploy, Launch, Cancel Launch
  Component: <RocketControl/>
  Info: Fetch clicked rocket data, and control rocket's launch states, including:
  - Deploying the rocket
  - Launching the rocket
  - Cancelling the launch

- "/weather" Display current weather conditions
  Info: Will fetch and display the current weather conditions.

---
## Components
- <RocketCard /> Display rocket data
    - <Telemetry /> Display current data with socket.io

- <Layout /> Sparate screen to top content  
