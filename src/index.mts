import {Machinarium} from './components/Machinarium.mjs'
import { Machine } from './components/Machine.mjs'
import { EnergyStorage } from './components/base/electric/storage/EnergyStorage.mjs'

const machinarium = new Machinarium()

//const fan = new Machine('S8655')
const accumulator = new EnergyStorage('AC878')

//machinarium.addMachine(fan)
machinarium.addMachine(accumulator)

machinarium.run()

