import { TemperaturePoint } from "./TemperaturePoint.mjs"

const LF = "\n"

export type TemperatureExchangeOptions = {
	insulation?: number
}
export class TemperatureExchange{

	protected insulation = 0

	protected temperaturePoints: Array<TemperaturePoint> = []

	public constructor(public readonly id: string, options: TemperatureExchangeOptions){
		this.insulation = options.insulation ?? 0
	}

	public tick(){
		this.distributeEnergy()
	}

	protected distributeEnergy(): void{
		if(this.temperaturePoints.length === 0){
			return 
		}


		for(let point of this.temperaturePoints){
			//console.log(`${point.id} T=${point.temperature}`)
		}

		const avgTemperature = this.temperaturePoints.map(point => point.temperature).reduce((acc, temperature) => acc + temperature, 0) / this.temperaturePoints.length
		//console.log(`avg T=${avgTemperature}`)

		let gainedEnergy: number = 0
		for(let point of this.temperaturePoints.filter(p => p.temperature > avgTemperature)){

			const tDif = point.temperature - avgTemperature

			//console.log(`${point.id} / ${point.temperature}C / diff ${tDif}C`)

			let energyProvided = point.provideEnergy(tDif * (1 - this.insulation))
			//console.log(`      provided ${energyProvided}`)
			gainedEnergy += energyProvided
		}

		if(gainedEnergy === 0){
			return 
		}

		let differencesSum = this.temperaturePoints.filter(p => p.temperature < avgTemperature)
			.map(p => avgTemperature - p.temperature).reduce((acc, tmp) => acc + tmp, 0)

		if(differencesSum === 0){
			return 
		}



		for(let point of this.temperaturePoints.filter(p => p.temperature < avgTemperature)){

			const energy = gainedEnergy * ((avgTemperature - point.temperature) / differencesSum )
			point.acceptEnergy(energy)
		}


	}

	public getReport(){
		let report = 'points:' + LF

		// for(let [, point] of this.electricityPoints){
		// 	report += chalk.hex('#1a97de')(point instanceof ElectricityOutlet ? '󱄇 ':' ') + ` ${point.id}${LF}`
		//
		// }
		return report
	}

	public addTemperaturePoint(temperaturePoint: TemperaturePoint){

		this.temperaturePoints.push(temperaturePoint)
	}

}
