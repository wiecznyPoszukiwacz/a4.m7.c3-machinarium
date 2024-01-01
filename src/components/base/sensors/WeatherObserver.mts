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

		return {
			starAngle: (new Date().getTime()/1000) * 6
		}

	}

}
