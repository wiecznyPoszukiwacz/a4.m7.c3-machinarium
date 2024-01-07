
import { Machine } from "../../../components/Machine.mjs";
import { TemperatureExchange } from "./TemperatureExchain.mjs";

const LF = "\n"

export class TemperatureManager{

	protected exchanges: Map<string, TemperatureExchange> = new Map()

	public constructor(){
	}

	public getReport(){
		let report = 'currents:' + LF

		return report
	}

	public tick(){
		for(let [, exchange] of this.exchanges){
			exchange.tick()
		}
	}

	public addExchange(exchange: TemperatureExchange){
		if(this.exchanges.has(exchange.id)){
			throw new Error('TemperatureExchange already exits')
		}
		this.exchanges.set(exchange.id, exchange)
	}

	public addMachine(machine: Machine){

		const unit = machine.getTemperatureUnit()

		if(!unit){
			return
		}

		for(const [, temperaturePoint] of unit.getTemperaturePoints()){

			
			const exchanges = Array.isArray(temperaturePoint.exchangeId) ? temperaturePoint.exchangeId : [temperaturePoint.exchangeId]

			for(let exchangeId of exchanges){



				if(!this.exchanges.has(exchangeId)){
					throw new Error(`unknown exchange point ${exchangeId}`)
				}
				this.exchanges.get(exchangeId)?.addTemperaturePoint(temperaturePoint)
			}

		}
	}

}
