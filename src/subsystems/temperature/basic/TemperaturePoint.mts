export type TemperaturePointOptions = {
	temperatureController?: () => number
}

export class TemperaturePoint{

	protected energy: number = 0
	protected volume: number = 1
	protected heatCapacity: number = 20

	protected onProvideCallback: (energyProvided: number) => void = ()=>{}

	protected temperatureController!: (() => number) | null

	public constructor(public readonly id: string, public readonly exchangeId: Array<string> | string, options: TemperaturePointOptions | null = null){

		if(options){

			if(options.temperatureController){
				this.temperatureController = options.temperatureController

			}

		}
	}

	public get temperature(): number{

		if(this.temperatureController){
			const temperature = this.temperatureController()
			this.energy = (temperature + 273.15) * this.volume * this.heatCapacity
			return temperature
		}

		return (this.energy / (this.volume * this.heatCapacity)) - 273.15
	}


	public onProvide(fn: (electricityProvided: number) => void){
		this.onProvideCallback = fn
	}
	
	
	// machine calls this method to register generated or gained thermal energy
	public acceptEnergy(energy: number){
		this.energy += energy
	}

	// method called by exchange to get energy
	public provideEnergy(temperature: number = 0){

		const energy = Math.min(this.energy, temperature * this.heatCapacity * this.volume)

		this.energy -= energy
		this.onProvideCallback(energy)
		return energy
	}



}
