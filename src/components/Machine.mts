export abstract class Machine{

	protected abstract onGetStatus(): string
	protected abstract onPhaseIn(): void
	protected abstract onPhaseProcess(): void
	protected abstract onPhaseOut(): void

	public constructor(public readonly serialNumber: string){
	}

	public phaseIn(){
		this.onPhaseIn()
	}

	public phaseProcess(){
		this.onPhaseProcess()
	}

	public phaseOut(){
		this.onPhaseOut()
	}

	public getStatus(){
		return `${this.serialNumber}: ` + this.onGetStatus()
	}
}
