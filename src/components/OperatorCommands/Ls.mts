import { Machinarium } from "../Machinarium.mjs"
import { Operator } from "../Operator.mjs"

export abstract class Command{
	public constructor(protected operator: Operator, protected ws: WebSocket, protected machinarium: Machinarium){
	}
	public abstract execute(params:string):unknown

	public getMachine(id: string){

		id = id.toLowerCase()

		const machines = [...this.machinarium.machines.keys()].filter(key => key.toLowerCase().startsWith(id)) 

		if(machines.length === 1){
			return this.machinarium.machines.get(machines[0])
		}else if(machines.length === 0){
			throw new Error(`no machine with id starting with ${id}`)
		}else{
			throw new Error(`more than 1 machine with id starting with ${id}: ${machines.join(', ')}`)
		}

	}
}

export class ls extends Command{
	public execute(_params: string){

		const ans: Array<string> = []
		ans.push('--------- machines ----------')
		for(const [serial, machine] of this.machinarium.machines){
			ans.push(machine.getStatus())
		}
		return ans
	}
}

export class elman extends Command{
	public execute(_params: string){
		
		const ans: Array<string> = []
		ans.push('--------- electricity report ----------')
		ans.push(this.machinarium.electricityManager.getReport())
		return ans
	}
}

export class auth extends Command{
	public execute(params: string){
		this.operator.setAuthenticated(true)
		return ''
	}
}

export class set extends Command{
	public execute(params: string){



		const ans: Array<string> = []

		ans.push(params)

		const [machineId, configKey, value] = params.split(' ')

		try{
			const machine = this.getMachine(machineId)
			ans.push(`setting ${configKey} to ${value}`)
			machine?.configure(configKey, value)

		}catch(e: any){
			ans.push(e.message)
		}

		return ans

	}
}

export class get extends Command{
	public execute(params: string){
		const ans: Array<string> = []

		const [machineId, configKey] = params.split(' ')

		try{
			const machine = this.getMachine(machineId)
			ans.push( machine?.getConfig(configKey).toString() ?? '-')

		}catch(e: any){
			ans.push(e.message)
		}

		return ans

	}
}

export class inspect extends Command{
	public execute(params: string){
		const ans: Array<string> = []

		const [machineId] = params.split(' ')

		try{
			const machine = this.getMachine(machineId)
			const report = machine?.getReport()
			for(const k in report){
				ans.push(`${k}: ${report[k].toString()}`)
			}


		}catch(e: any){
			ans.push(e.message)
		}

		return ans

	}
}
