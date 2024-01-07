import { ElectricityManager } from "../subsystems/electricity/basic/ElectricityManager.mjs"
import { TemperatureManager } from "../subsystems/temperature/basic/TemperatureManager.mjs"
import { Machine } from "./Machine.mjs"

export class Machinarium{

	private interval = 1000
	private ticks = 0

	public machines: Map<string, Machine> = new Map()
	protected tickListeners: Array<CallableFunction> = []

	public electricityManager!: ElectricityManager
	public temperatureManager!: TemperatureManager

	public constructor(){
	}

	public setElectricityManager(electricityManager: ElectricityManager){
		this.electricityManager = electricityManager
	}

	public setTemperatureManager(temperatureManager: TemperatureManager){
		this.temperatureManager = temperatureManager

	}

	public onTick(fn: CallableFunction){
		this.tickListeners.push(fn)
	}

	public addMachine(machine: Machine){

		this.machines.set(machine.serialNumber, machine)
		this.electricityManager.addMachine(machine)
		this.temperatureManager.addMachine(machine)

	}

	public run(){
		setInterval(() => {

			console.time('tick')
			this.tick()
			console.timeEnd('tick')

			this.ticks ++
		}, this.interval)
	}

	private tick(){

		let tickData = {}
		this.electricityManager.tick()
		this.temperatureManager.tick()

		for(let [_serial, machine] of this.machines){
			machine.phaseIn()
		}

		for(let [_serial, machine] of this.machines){
			machine.phaseProcess()

		}
		for(let [serial, machine] of this.machines){
			machine.phaseOut()

			tickData[serial] = machine.getReport()
		}
		this.tickListeners.forEach((fn) =>{
			fn(tickData)
		})
	}
}

