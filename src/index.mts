import {Machinarium} from './components/Machinarium.mjs'
import { EnergyStorage } from './components/base/electric/storage/EnergyStorage.mjs'
import { Server } from './components/Server.mjs'


const machinarium = new Machinarium()
const server = new Server(machinarium)

//const fan = new Machine('S8655')
const accumulator = new EnergyStorage('AC878')

//machinarium.addMachine(fan)
machinarium.addMachine(accumulator)

machinarium.run()

