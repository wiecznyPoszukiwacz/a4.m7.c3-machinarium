import { WebSocket} from 'ws'
import { Machinarium } from './Machinarium.mjs'
import * as Commands from './OperatorCommands/Ls.mjs'
import chalk from 'chalk'

type Packet = {
	type: 'userCommand'
	data: string
}

export class Operator{

	public isAuthenticated: boolean = false

	protected commands: Map<string, Commands.Command>

	public constructor(protected ws: WebSocket, protected machinarium: Machinarium){

		this.commands = new Map()

		for(const commandClass in Commands){
			this.commands.set(commandClass, new Commands[commandClass](this, this.ws, this.machinarium))
		}

		ws.on('error', (e: string)=>{
			console.log(e)
		})

		ws.on('message', (message)=>{
			this.handleIncomingData(message.toString())
		})

		machinarium.onTick((data: any)=>{
			this.onTick(data)
		})

		this.sendToTerminal('a4.m7.c3 machinarium server')
		this.setPrompt(chalk.red(' '))
		this.setAuthenticated(true)
	}

	public onTick(data: any){
		this.sendToOpcon('report', data)
	}

	public setAuthenticated(isAuthenticated: boolean){
		this.isAuthenticated = isAuthenticated
		if(this.isAuthenticated){
			this.sendToTerminal('authenticated')
			this.setPrompt(chalk.green('󰌆 '))
				
		}else{
			this.sendToTerminal('unauthenticated')
			this.setPrompt(chalk.red(' '))
		}
	}

	protected handleIncomingData(data: string){
		const packet: Packet = JSON.parse(data)

		if(packet.type === 'userCommand'){

			const [cmd, ...params] = packet.data.split(' ')
			console.log(cmd, params)

			if(!this.isAuthenticated && cmd !== 'auth'){
				this.sendToTerminal('access denied')
				return
			}

			if(this.commands.has(cmd)){
				const ans = this.commands.get(cmd)?.execute(params.join(' '))
				this.sendToTerminal(ans)
			}else{
				this.sendToTerminal([`unknown command: ${cmd}`])
			}
		}else{
			console.log(packet)
		}
	}

	protected sendToOpcon(type: string, data: any){
		this.ws.send(JSON.stringify({ type, data }))
	}

	public setPrompt(prompt: string){
		this.sendToOpcon('config', {prompt})
	}

	protected sendToTerminal(text: any){
		this.sendToOpcon('terminalOutput', text)
	}
}
