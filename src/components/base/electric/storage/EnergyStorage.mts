import { ElectricityInlet, ElectricityOutlet } from "../../../../subsystems/electricity/basic/ElectricityPoint.mjs";
import { ElectricityUnit } from "../../../../subsystems/electricity/basic/ElectricityUnit.mjs";
import { Machine } from "../../../Machine.mjs";
import { Registry } from "../../Registry.mjs";

export class EnergyStorage extends Machine{

	protected storedEnergy: Registry
	protected capacity: number = 200

	protected inlet: ElectricityInlet
	protected outlet: ElectricityOutlet

	public constructor(serialNumber: string){
		super(serialNumber)
		this.storedEnergy = new Registry(this.capacity)

		this.electricityUnit = new ElectricityUnit()
		this.inlet = new ElectricityInlet(this.serialNumber + '.main', 'main')
		this.inlet.mode = 'passive'

		this.outlet = new ElectricityOutlet(this.serialNumber + '.mainOutlet', 'main')
		this.outlet.mode = 'passive'
		this.outlet.onProvide((amount) => {

			this.storedEnergy.provide(amount)

		})

		this.electricityUnit.addElectricitPoint(this.inlet)
		this.electricityUnit.addElectricitPoint(this.outlet)
	}

	protected override onGetReport(){
		return {
			charge: this.storedEnergy.value,
			capacity: this.storedEnergy.capacity,
			level: this.storedEnergy.level
		}

	}

	protected onPhaseIn(): void {
		const providedElectricity = this.inlet.requireElectricity(this.storedEnergy.missing)
		this.storedEnergy.accept(providedElectricity)
	}

	protected onGetStatus(): string {
		return `${this.storedEnergy.value}J/${this.storedEnergy.capacity}J - ${this.storedEnergy.level}%`
	}

	protected onPhaseProcess(): void {
	}
	protected onPhaseOut(): void {
		this.outlet.acceptElectricity(this.storedEnergy.value)
	}
}
