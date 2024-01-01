import { ElectricityUnit } from "../subsystems/electricity/basic/ElectricityUnit.mjs"

export abstract class Machine{

	protected abstract onGetStatus(): string
	protected abstract onPhaseIn(): void
	protected abstract onPhaseProcess(): void
	protected abstract onPhaseOut(): void

	protected wear: number = 0
	protected electricityUnit!: ElectricityUnit | null

	protected configuration: Record<string, string | number | boolean> = {}

	public constructor(public readonly serialNumber: string){
	}

	public configure(setting: string, value: string | number | boolean){
		this.configuration[setting] = value
	}

	public getConfig(setting: string){
		return this.configuration[setting]
	}

	public getElectricityUnit(): ElectricityUnit | null{
		return this.electricityUnit
	}

	public getReport(){
		return {
			...this.configuration,
			...this.onGetReport(),
			wear: this.wear
		}
	}

	protected onGetReport(){
		return {}
	}

	public phaseIn(){
		this.onPhaseIn()
	}

	public phaseProcess(){
		this.onPhaseProcess()
	}

	public phaseOut(){
		this.onPhaseOut()
	}

	public getStatus(){
		return `${this.serialNumber}: ` + this.onGetStatus()
	}
}
