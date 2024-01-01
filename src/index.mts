import {Machinarium} from './components/Machinarium.mjs'
import { EnergyStorage } from './components/base/electric/storage/EnergyStorage.mjs'
import { Server } from './components/Server.mjs'
import { WeatherObserver } from './components/base/sensors/WeatherObserver.mjs'
import { ElectricityManager } from './subsystems/electricity/basic/ElectricityManager.mjs'
import { SolarPanel } from './machines/SolarPanel.mjs'
import { Heater } from './machines/Hater.mjs'


const machinarium = new Machinarium()

new Server(machinarium)

const electricityManager = new ElectricityManager()

machinarium.setElectricityManager(electricityManager)

//const fan = new Machine('S8655')
const accumulator = new EnergyStorage('AC878')
const weatherStation = new WeatherObserver('W0')

const solar = new SolarPanel('S1')
const heater = new Heater('H1')

//machinarium.addMachine(fan)
machinarium.addMachine(solar)
machinarium.addMachine(accumulator)
machinarium.addMachine(weatherStation)
machinarium.addMachine(heater)


machinarium.run()

