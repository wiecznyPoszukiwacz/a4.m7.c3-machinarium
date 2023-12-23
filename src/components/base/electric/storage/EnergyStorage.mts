import { Machine } from "../../../Machine.mjs";
import { Registry } from "../../Registry.mjs";

export class EnergyStorage extends Machine{

	protected storedEnergy: Registry
	protected capacity: number = 10

	public constructor(serialNumber: string){
		super(serialNumber)
		this.storedEnergy = new Registry(this.capacity)
	}

	public accept(energy: number): number{
		return this.storedEnergy.accept(energy)
	}

	protected onPhaseIn(): void {
		this.accept(1)
	}

	protected onGetStatus(): string {
		return `${this.storedEnergy.value}J/${this.storedEnergy.capacity}J - ${this.storedEnergy.level}%`
	}

	protected onPhaseProcess(): void {
	}
	protected onPhaseOut(): void {
	}
}
