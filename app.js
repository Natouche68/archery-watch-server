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
		io.to('stopwatches').emit('controller-connected', stopwatchId);
	});

	socket.on('start-stopwatch', (stopwatchId, twoWaves, time) => {
		io.to('stopwatches').emit('start-stopwatch', stopwatchId, twoWaves, time);
	});

	socket.on('stop-stopwatch', (stopwatchId) => {
		io.to('stopwatches').emit('stop-stopwatch', stopwatchId);
	});

	socket.on('stopwatch-connected', () => {
		socket.join('stopwatches');
	});

	socket.on('stopwatch-started', (stopwatchId) => {
		io.to('controllers').emit('stopwatch-started', stopwatchId);
	});

	socket.on('stopwatch-stopped', (stopwatchId, waveTwoRunning) => {
		io.to('controllers').emit('stopwatch-stopped', stopwatchId, waveTwoRunning);
	});
});

io.listen('8080');

console.log('🚀 Server is running !');
