---
marp: true
---

# MiltRocket

- Command Control Application

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