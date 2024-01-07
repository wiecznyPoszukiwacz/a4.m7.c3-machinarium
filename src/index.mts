import {Machinarium} from './components/Machinarium.mjs'
import { EnergyStorage } from './components/base/electric/storage/EnergyStorage.mjs'
import { Server } from './components/Server.mjs'
import { WeatherObserver } from './components/base/sensors/WeatherObserver.mjs'
import { ElectricityManager } from './subsystems/electricity/basic/ElectricityManager.mjs'
import { SolarPanel } from './machines/SolarPanel.mjs'
import { Heater } from './machines/Hater.mjs'
import { TemperatureManager } from './subsystems/temperature/basic/TemperatureManager.mjs'
import { Environment } from './components/base/EnclosedSpace.mjs'
import { TemperatureExchange } from './subsystems/temperature/basic/TemperatureExchain.mjs'


const machinarium = new Machinarium()

new Server(machinarium)

const electricityManager = new ElectricityManager()

const temperatureManager = new TemperatureManager()

machinarium.setElectricityManager(electricityManager)
machinarium.setTemperatureManager(temperatureManager)

const atmHbtExchange = new TemperatureExchange('atmHbt', {
	insulation: 0.99
})
const habitatExchange = new TemperatureExchange('habitat', {
	insulation: 0.1
})

temperatureManager.addExchange(atmHbtExchange)
temperatureManager.addExchange(habitatExchange)

//const fan = new Machine('S8655')
const accumulator = new EnergyStorage('AC878')
const weatherStation = new WeatherObserver('W0')

const habitat = new Environment('HBT', {
	temperatureExchange: ['habitat', 'atmHbt']
})
const atmosphere = new Environment('ATM', {
	temperatureController: () => {
		let t = weatherStation.getReport().temperature
		return t
	},
	temperatureExchange: 'atmHbt'
})

const solar = new SolarPanel('S1')
const heater = new Heater('H1')

//machinarium.addMachine(fan)
machinarium.addMachine(atmosphere)
machinarium.addMachine(habitat)
machinarium.addMachine(solar)
machinarium.addMachine(accumulator)
machinarium.addMachine(weatherStation)
machinarium.addMachine(heater)


machinarium.run()

