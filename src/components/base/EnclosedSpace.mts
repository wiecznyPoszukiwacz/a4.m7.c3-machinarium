
import { Machine } from "../Machine.mjs";
import { TemperaturePoint, TemperaturePointOptions } from "../../subsystems/temperature/basic/TemperaturePoint.mjs";
import { TemperatureUnit } from "../../subsystems/temperature/basic/TemperatureUnit.mjs";
import { centyRound } from "../../Utils.mjs";

export type EnvironmentOptions = {
	temperatureController?: () => number
	temperatureExchange: Array<string> | string

}

export class Environment extends Machine{

	protected env: TemperaturePoint

	public constructor(public readonly serialNumber: string, options: EnvironmentOptions){
		super(serialNumber)

		const tpOptions: TemperaturePointOptions = {}

		if(options.temperatureController){
			tpOptions.temperatureController = options.temperatureController
		}


		this.env = new TemperaturePoint(this.serialNumber + '.env', options.temperatureExchange, tpOptions)
		this.temperatureUnit = new TemperatureUnit()
		this.temperatureUnit.addTemperaturePoint(this.env)
	}


	protected onGetStatus(): string {
		return 'environmenting ;)'
	}
	protected onGetReport(){

		return {
			spaceTemperature: centyRound(this.env.temperature)

		}
	}
	protected onPhaseIn(): void {
	}
	protected onPhaseProcess(): void {
	}
	protected onPhaseOut(): void {
	}
}
