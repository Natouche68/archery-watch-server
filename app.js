import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	socket.on('controller-connected', (stopwatchId) => {
		socket.join('controllers');
		console.log('controller-connected =>', stopwatchId);
	});

	socket.on('start-stopwatch', (stopwatchId, twoWaves, time) => {
		console.log('start-stopwatch =>', stopwatchId, twoWaves, time);
		io.to('controllers').emit('stopwatch-started', stopwatchId);
	});

	socket.on('stop-stopwatch', (stopwatchId) => {
		console.log('stop-stopwatch =>', stopwatchId);
		const waveTwoRunning = false; // PLACEHOLDER
		io.to('controllers').emit('stopwatch-stopped', stopwatchId, waveTwoRunning);
	});
});

io.listen('8080');
