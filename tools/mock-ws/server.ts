/**
 * Mock LMT Socket.IO server.
 *
 * Reproduces the workflow documented in the provider PDF:
 *   verify_client(Partner)            → emit verified { message: 'ok' }
 *   client_ready(EventId)             → emit constructor { message: event }
 *                                       then stream update_event ticks
 *   get_event_details(EventId)        → emit event_details { message: event }
 *   get_events_list(SportId?)         → emit events_list   { message: [...] }
 *   get_event_h2h(EventId)            → emit event_h2h     { message: {...} }
 *
 * Start:   npm run mock     (defaults to port 4545)
 * Override: PORT=5000 npm run mock
 */
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const PORT = Number(process.env.PORT) || 4545;

const PLAYERS_HOME = ['C Silva', 'Tiago Silva', 'Borja', 'Andre André', 'Mendes'];
const PLAYERS_AWAY = ['Aderllan Santos', 'Joel', 'Costinha', 'Athila', 'Vincent'];

const ACTION_CYCLE: string[] = [
  'possession', 'possession', 'attack', 'possession', 'danger-attack',
  'shot-off-target', 'possession', 'corner', 'shot-on-target',
  'goal-kick', 'possession', 'throw', 'attack', 'shot-on-target',
  'possession', 'yellow-card', 'safe-free-kick', 'goal', 'possession',
  'attack', 'danger-attack', 'penalty-shoot', 'penalty-scored',
];

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)] as T;
}

function makeEvent(eventId: string) {
  const id = Number(eventId) || 123456;
  return {
    id,
    int_id: String(id),
    en: 'Guimaraes - Rio Ave',
    ste: Date.now() - 75 * 60 * 1000,
    es: 1,
    sn: 'Soccer',
    si: 1,
    cgn: 'Primeira Liga',
    cgi: 17,
    cn: 'Portugal',
    ci: 32,
    th: { id: 1, name: 'Guimaraes', logo: '' },
    ta: { id: 2, name: 'Rio Ave', logo: '' },
    esc: '1:0',
    etsc: ['1:0'],
    ecp: 2,
    eht: false,
    ests: {
      CORNER: { name: 'CORNER', home: 4, away: 2 },
      YELLOW_CARD: { name: 'YELLOW_CARD', home: 2, away: 3 },
      RED_CARD: { name: 'RED_CARD', home: 0, away: 0 },
      SHOT_ON_TARGET: { name: 'SHOT_ON_TARGET', home: 6, away: 3 },
      SHOT_OFF_TARGET: { name: 'SHOT_OFF_TARGET', home: 8, away: 5 },
      ATTACKS: { name: 'ATTACKS', home: 45, away: 30 },
      DANGER_ATTACKS: { name: 'DANGER_ATTACKS', home: 18, away: 12 },
      FREE_KICKS: { name: 'FREE_KICKS', home: 9, away: 12 },
      POSSESSION: { name: 'POSSESSION', home: '62', away: '38' },
      FAULTS: { name: 'FAULTS', home: 10, away: 14 },
    },
  };
}

function ballForAction(action: string, team: 'home' | 'away'): [number, number] {
  if (action === 'corner') {
    return [team === 'away' ? 0.98 : 0.02, Math.random() > 0.5 ? 0.02 : 0.98];
  }
  if (action === 'goal-kick') {
    return [team === 'away' ? 0.95 : 0.05, 0.4 + Math.random() * 0.2];
  }
  if (action === 'throw') {
    return [0.2 + Math.random() * 0.6, Math.random() > 0.5 ? 0.0 : 1.0];
  }
  const baseX = team === 'home' ? 0.1 + Math.random() * 0.6 : 0.3 + Math.random() * 0.6;
  return [baseX, 0.2 + Math.random() * 0.6];
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  let seconds = 60 * 45 + Math.floor(Math.random() * 60 * 30);
  let tick: NodeJS.Timeout | null = null;
  let cursor = 0;

  console.log(`[mock] ${socket.id} connected`);

  socket.on('verify_client', (data) => {
    console.log(`[mock] verify_client { Partner: ${data?.Partner} }`);
    socket.emit('verified', { message: 'ok' });
  });

  socket.on('client_ready', (data) => {
    const eventId: string = data?.EventId ?? '123456';
    console.log(`[mock] client_ready EventId=${eventId}`);
    const event = makeEvent(eventId);
    socket.emit('constructor', { message: event });

    if (tick) clearInterval(tick);
    tick = setInterval(() => {
      seconds += 5;
      const action = ACTION_CYCLE[cursor % ACTION_CYCLE.length] as string;
      cursor += 1;
      const team: 'home' | 'away' = Math.random() > 0.5 ? 'home' : 'away';
      const player = pick(team === 'home' ? PLAYERS_HOME : PLAYERS_AWAY);
      const ball = ballForAction(action, team);

      socket.emit('update_event', {
        message: {
          Action: action,
          Team: team,
          Player: player,
          BallPosition: ball,
          Seconds: seconds,
          ServerTime: Date.now(),
          MatchScore: event.esc ?? '0:0',
          ExtEventId: event.int_id,
        },
      });
    }, 2000);
  });

  socket.on('get_event_details', (data) => {
    socket.emit('event_details', {
      message: makeEvent(data?.EventId ?? '123456'),
    });
  });

  socket.on('get_events_list', () => {
    socket.emit('events_list', {
      message: [makeEvent('123456'), makeEvent('234567')],
    });
  });

  socket.on('get_event_h2h', () => {
    socket.emit('event_h2h', {
      message: { wins: { home: 5, draw: 2, away: 3 } },
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`[mock] ${socket.id} disconnected: ${reason}`);
    if (tick) clearInterval(tick);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[mock] LMT mock Socket.IO server listening on http://localhost:${PORT}`);
});
