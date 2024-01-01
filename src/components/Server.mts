import {WebSocketServer, WebSocket} from 'ws'
import { Operator } from './Operator.mjs'
import { Machinarium } from './Machinarium.mjs'


export class Server{

	private operators: Array<Operator> = []

	public constructor(machinarium: Machinarium){

		const wss = new WebSocketServer({
			port: 8090
		})
		console.log('ws server started ...')

		wss.on('connection', (ws)=>{
			this.operators.push(new Operator(ws, machinarium))
		})
	}
}

