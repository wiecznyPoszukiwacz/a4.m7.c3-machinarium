
import { Machine } from "../components/Machine.mjs";
import { ElectricityInlet, ElectricityOutlet } from "../subsystems/electricity/basic/ElectricityPoint.mjs";
import { ElectricityUnit } from "../subsystems/electricity/basic/ElectricityUnit.mjs";

export class Heater extends Machine{

	protected inlet: ElectricityInlet
	public constructor(public readonly serialNumber: string){
		super(serialNumber)

		this.electricityUnit = new ElectricityUnit()
		this.inlet = new ElectricityInlet(this.serialNumber + '.main', 'main')

		this.electricityUnit.addElectricitPoint(this.inlet)

		this.configuration = {
			power: 10
		}

	}

	protected recentlyConsumedEnergy

	protected onGetStatus(): string {
		return 'heating'
	}
	protected onGetReport(){

		return {
			'rce': this.recentlyConsumedEnergy

		}
	}
	protected onPhaseIn(): void {
		let e = this.inlet.requireElectricity(parseInt(this.configuration.power))
		this.recentlyConsumedEnergy = e
	}
	protected onPhaseProcess(): void {
	}
	protected onPhaseOut(): void {
	}


}
