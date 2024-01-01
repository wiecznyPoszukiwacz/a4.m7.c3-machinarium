import chalk from "chalk";
import { Machine } from "../../../components/Machine.mjs";
import { Current } from "./Current.mjs";

const LF = "\n"

export class ElectricityManager{

	protected currents: Map<string, Current> = new Map()

	public constructor(){
		this.currents.set('main', new Current('main'))
	}

	public getReport(){
		let report = 'currents:' + LF

		for(let [, current] of this.currents){
			report += chalk.hex('#1a97de')(``) + ` ${current.id}${LF}` + current.getReport()
		}
		return report
	}

	public tick(){
		for(let [, current] of this.currents){
			current.tick()
		}
	}

	public addMachine(machine: Machine){

		const unit = machine.getElectricityUnit()

		if(!unit){
			return
		}

		for(const [, electricityPoint] of unit.getElectricityPoints()){

			const currentId = electricityPoint.currentId
			if(!this.currents.has(currentId)){
				this.currents.set(currentId, new Current(currentId))

			}
			this.currents.get(currentId)?.addElectricityPoint(electricityPoint)

		}
	}

}
