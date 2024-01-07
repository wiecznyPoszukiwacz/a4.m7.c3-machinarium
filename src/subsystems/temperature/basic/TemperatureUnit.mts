import { TemperaturePoint } from "./TemperaturePoint.mjs";

export class TemperatureUnit{

	protected temperaturePoints: Map<string, TemperaturePoint> = new Map()

	public addTemperaturePoint(temperaturePoint: TemperaturePoint){
		if(this.temperaturePoints.has(temperaturePoint.id)){
			throw new Error('tp already exists')
		}
		this.temperaturePoints.set(temperaturePoint.id, temperaturePoint)
	}

	public getTemperaturePoints(){
		return this.temperaturePoints
	}
}
