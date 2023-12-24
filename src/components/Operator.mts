import { WebSocket} from 'ws'
import { Machinarium } from './Machinarium.mjs'
import chalk from 'chalk'

export class Operator{
	protected authenticated: boolean = false

	public constructor(ws: WebSocket, protected machinarium: Machinarium){

		ws.on('error', (e: string)=>{
			console.log(e)
		})

		ws.on('message', (message)=>{
			const input = message.toString()
			//console.log(input)


			if(!this.authenticated){
				if(input === 'alfa'){
					this.authenticated = true
					ws.send(chalk.green('access granted'))
				}else{
					ws.send(chalk.red('access denied'))
				}
				return
			}

			if(input === 'ls'){
				ws.send('--------- machines ----------')
				for(const [serial, machine] of this.machinarium.machines){
					ws.send(machine.getStatus())
				}

			}
		})

		ws.send('hello')
	}
}
