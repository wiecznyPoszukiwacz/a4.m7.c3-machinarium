import { info } from "console"

export class Registry{

	protected val: number

	public constructor(protected cap: number, initValue = 0){

		if(cap < 1){
			throw new Error('capacity can not be lower than 1')
		}

		this.val = initValue
	}

	get value(){
		return this.val
	}

	get capacity(){
		return this.cap
	}

	get level(){
		return Math.floor((this.val / this.cap) * 100)
	}

	public accept(value: number): number{

		const availableCapacity = this.cap - this.val
		const acceptedValue = Math.min(availableCapacity, value)
		this.val += acceptedValue

		return acceptedValue
	}

	public provide(value: number = this.cap): number{
		
		const canProvide = Math.min(this.val, value)
		this.val -= canProvide
		return canProvide

	}

}
