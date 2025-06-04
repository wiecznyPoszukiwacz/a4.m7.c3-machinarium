
import { centyRound } from "../Utils.mjs";
import { Machine } from "../components/Machine.mjs";
import { ElectricityInlet, ElectricityOutlet } from "../subsystems/electricity/basic/ElectricityPoint.mjs";
import { ElectricityUnit } from "../subsystems/electricity/basic/ElectricityUnit.mjs";
import { TemperatureExchange } from "../subsystems/temperature/basic/TemperatureExchain.mjs";
import { TemperaturePoint } from "../subsystems/temperature/basic/TemperaturePoint.mjs";
import { TemperatureUnit } from "../subsystems/temperature/basic/TemperatureUnit.mjs";

export class Heater extends Machine{

	protected inlet: ElectricityInlet
	protected radiator: TemperaturePoint
	public constructor(public readonly serialNumber: string){
		super(serialNumber)

		this.electricityUnit = new ElectricityUnit()
		this.inlet = new ElectricityInlet(this.serialNumber + '.main', 'main')

		this.electricityUnit.addElectricitPoint(this.inlet)

		this.radiator = new TemperaturePoint(this.serialNumber + '.radiator', 'habitat')
		this.temperatureUnit = new TemperatureUnit()
		this.temperatureUnit.addTemperaturePoint(this.radiator)

		this.configuration = {
			power: 10
		}

	}

	protected recentlyConsumedEnergy: number = 0

	protected onGetStatus(): string {
		return 'heating'
	}
	protected onGetReport(){

		return {
			'rce': this.recentlyConsumedEnergy,
			radiatorTemperature: centyRound(this.radiator.temperature)

		}
	}
	protected onPhaseIn(): void {

		if(this.radiator.temperature < 20){
			this.configuration.power += 0.1
		}else{
			this.configuration.power -= 0.1
		}

		this.configuration.power = (20 - this.radiator.temperature) * 25

		if(this.configuration.power < 0){
			this.configuration.power = 0
		}

		if(this.configuration.power > 150){
			this.configuration.power = 150
		}

		let e = this.inlet.requireElectricity(parseInt(this.configuration.power))
		this.recentlyConsumedEnergy = e
		this.radiator.acceptEnergy(e)
	}
	protected onPhaseProcess(): void {
	}
	protected onPhaseOut(): void {
	}


}
