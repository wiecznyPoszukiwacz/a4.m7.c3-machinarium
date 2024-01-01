import { ElectricityPoint } from "./ElectricityPoint.mjs";

export class ElectricityUnit{

	protected electricityPoints: Map<string, ElectricityPoint> = new Map()

	public addElectricitPoint(electricityPoint: ElectricityPoint){
		if(this.electricityPoints.has(electricityPoint.id)){
			throw new Error('ep already exists')
		}
		this.electricityPoints.set(electricityPoint.id, electricityPoint)
	}

	public getElectricityPoints(){
		return this.electricityPoints
	}
}
