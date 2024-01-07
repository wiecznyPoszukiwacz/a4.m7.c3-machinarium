import { Machine } from "../components/Machine.mjs";
import { ElectricityOutlet } from "../subsystems/electricity/basic/ElectricityPoint.mjs";
import { ElectricityUnit } from "../subsystems/electricity/basic/ElectricityUnit.mjs";

export class SolarPanel extends Machine{

	protected outlet!: ElectricityOutlet;
	protected recentlyGeneratedElectricity: number = 0

	public constructor(public readonly serialNumber: string){
		super(serialNumber)

		this.outlet = new ElectricityOutlet(this.serialNumber + '.solarEnergy', 'main')

		this.electricityUnit = new ElectricityUnit()
		this.electricityUnit.addElectricitPoint(this.outlet)

	}

	protected onGetStatus(): string {
		return 'generating power'
	}
	protected onPhaseIn(): void {
	}
	protected onPhaseProcess(): void {
	}

	protected onGetReport(){

		return {
			'rgn': this.recentlyGeneratedElectricity
		}

	}
	protected onPhaseOut(): void {

		let moc = 60
		
		let starAngle = (new Date().getTime()/1000) * 6
		let generated = Math.max(Math.ceil(moc * Math.sin(starAngle * Math.PI / 180)), 0)

		this.recentlyGeneratedElectricity = generated
		this.outlet.acceptElectricity(generated)
	}

}
