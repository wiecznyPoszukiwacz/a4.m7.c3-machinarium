
export abstract class ElectricityPoint{

	public mode: 'active' | 'passive' = 'active'

	public constructor(public readonly id: string, public readonly currentId: string){

	}

}

export class ElectricityOutlet extends ElectricityPoint{

	protected generatedElectricity: number = 0

	protected onProvideCallback: (electricityProvided: number) => void = ()=>{}

	public onProvide(fn: (electricityProvided: number) => void){
		this.onProvideCallback = fn
	}
	
	
	// machine calls this method to register electric generated electicity
	public acceptElectricity(ge: number){
		this.generatedElectricity = ge
	}

	// method called by current to get electricity
	public provideElectricity(requiredElectricity: number = 0){

		if(this.mode === 'active'){
			// whole generated energy is provided in active mode
			const electricity = this.generatedElectricity
			this.generatedElectricity = 0
			this.onProvideCallback(electricity)
			return electricity
		}else{
			// in passive mode only required electricity is provided (capped to generatedElectricity)

			const electricity = Math.min(this.generatedElectricity, requiredElectricity)
			this.generatedElectricity -= electricity
			this.onProvideCallback(electricity)
			return electricity
			
		}
	}



}

export class ElectricityInlet extends ElectricityPoint{


	protected providedElectricity: number = 0
	protected requiredElectricity: number = 0

	public requireElectricity(ge: number){

		// electricity needed in next tick
		this.requiredElectricity = ge

		// electricity provided in previous tick 
		const providedElectricity = this.providedElectricity

		// reset provided 
		this.providedElectricity = 0
		return providedElectricity
	}

	public getRequiredElectricity(): number{
		return this.requiredElectricity
	}
	
	public acceptElectricity(ge: number){
		const acceptedElectricity = Math.min(ge, this.requiredElectricity)

		this.providedElectricity += acceptedElectricity
		this.requiredElectricity -= acceptedElectricity

		return acceptedElectricity
	}

}
