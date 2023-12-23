import { Machine } from "./Machine.mjs"

export class Machinarium{

	private interval = 2000
	private ticks = 0

	private machines: Map<string, Machine> = new Map()

	public constructor(){
	}

	public addMachine(machine: Machine){

		this.machines.set(machine.serialNumber, machine)

	}

	public run(){
		setInterval(() => {
			console.log('---', this.ticks)

			this.tick()

			this.ticks ++
		}, this.interval)
	}

	private tick(){

		for(let [serial, machine] of this.machines){
			machine.phaseIn()

		}

		for(let [serial, machine] of this.machines){
			machine.phaseProcess()

		}
		for(let [serial, machine] of this.machines){
			machine.phaseOut()

			console.log(machine.getStatus())
		}
	}
}

