import { centyRound } from "../../../Utils.mjs";
import { Machine } from "../../Machine.mjs";

export class WeatherObserver extends Machine{
	protected onGetStatus(): string {
		return 'ok'
	}
	protected onPhaseIn(): void {
	}
	protected onPhaseProcess(): void {
	}
	protected onPhaseOut(): void {
	}

	protected onGetReport(){

		let starAngle =  (new Date().getSeconds()) * 6

		let rad = starAngle * 3.14 / 180

		let temp = 5 

		if(starAngle < 180){
			temp += Math.sin(rad) * 10
		}else{
			temp += Math.sin(rad) * 180
		}

		temp = centyRound(temp)


		return {
			starAngle,
			temperature: temp
		}

	}

}
