import chalk from "chalk";
import { ElectricityInlet, ElectricityOutlet, ElectricityPoint } from "./ElectricityPoint.mjs";

const LF = "\n"
export class Current{

	protected electricityOutlets: Array<ElectricityOutlet> = []
	protected electricityInlets: Array<ElectricityInlet> = []

	public constructor(public readonly id: string){
	}

	public tick(){
		this.distributePower()
	}

	protected distributePower(): void{


		let collectedActivePower = 0
		
		// distribute active power
		// collect whole active energy
		for(let outlet of this.electricityOutlets.filter(o => o.mode === 'active')){
			const power = outlet.provideElectricity()
			collectedActivePower += power
		}
		// provide to active inlets
		for(let inlet of this.electricityInlets.filter(i => i.mode === 'active')){
			const power = inlet.acceptElectricity(collectedActivePower)
			collectedActivePower -= power
		}


		if(collectedActivePower > 0){
			// distribute to passive inlets
			for(let inlet of this.electricityInlets.filter(i => i.mode === 'passive')){

				const power = inlet.acceptElectricity(collectedActivePower)

				collectedActivePower -= power
			}
		}

		// provide electricty to active inlets from passive outlets
		for(let inlet of this.electricityInlets.filter(i => i.mode === 'active')){
			for(let outlet of this.electricityOutlets.filter(o => o.mode === 'passive')){

				const power = outlet.provideElectricity(inlet.getRequiredElectricity())
				inlet.acceptElectricity(power)
			}

		}



	}

	public getReport(){
		let report = 'points:' + LF

		// for(let [, point] of this.electricityPoints){
		// 	report += chalk.hex('#1a97de')(point instanceof ElectricityOutlet ? '󱄇 ':' ') + ` ${point.id}${LF}`
		//
		// }
		return report
	}

	public addElectricityPoint(electricityPoint: ElectricityPoint){

		if(electricityPoint instanceof ElectricityOutlet){
			this.electricityOutlets.push(electricityPoint)


		}else if(electricityPoint instanceof ElectricityInlet){
			this.electricityInlets.push(electricityPoint)
		}else{
			throw new Error('invalid type')
		}


	}

}
