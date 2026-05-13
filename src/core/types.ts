/**
 * Core types for the LMT.
 *
 * Models mirror the WebSocket payloads defined in the provider doc
 * (Socket.IO 4.5.4 — Real Time Websocket Data API 1.2.0).
 */

// ── Sport identifiers (from doc §Sports available) ────────────────────────
export const Sports = {
  Soccer: 1,
  IceHockey: 2,
  Basketball: 3,
  Tennis: 4,
  Baseball: 5,
  Volleyball: 6,
  Rugby: 7,
  Handball: 8,
  TableTennis: 10,
  AmericanFootball: 13,
  Cricket: 66,
} as const;

export type SportId = (typeof Sports)[keyof typeof Sports];

// ── Event status (from EVENT_MODEL.es) ────────────────────────────────────
export const EventStatus = {
  NotStarted: 0,
  Live: 1,
  Ended: 2,
  Closed: 3,
  Delayed: 4,
  Interrupted: 5,
  Postponed: 6,
  Abandoned: 7,
  Starting: 8,
  LiveLowCoverage: 9,
} as const;

export type EventStatusValue = (typeof EventStatus)[keyof typeof EventStatus];

// ── Team + stats ──────────────────────────────────────────────────────────
export interface TeamDetails {
  id: number;
  name: string;
  logo?: string;
}

export interface ShortStat {
  name: string;
  home: string | number;
  away: string | number;
}

// ── EVENT_MODEL ───────────────────────────────────────────────────────────
export interface EventModel {
  id: number;
  int_id?: string;
  en: string;
  ste?: number;
  es: EventStatusValue;
  sn?: string;
  si: SportId | number;
  cgn?: string;
  cgi?: number;
  cn?: string;
  ci?: number;
  th: TeamDetails;
  ta: TeamDetails;
  esc?: string;
  etsc?: string[];
  ecp?: number;
  eht?: boolean;
  ests?: Record<string, ShortStat>;
}

// ── ACTION_MODEL ──────────────────────────────────────────────────────────
export type BallPosition = [number, number] | [string, string] | [];

export interface ActionModel {
  Action: string;
  Team: 'home' | 'away' | string;
  Player?: string;
  BallPosition?: BallPosition;
  Score?: string[];
  Period?: string | number;
  TimeMiddle?: string | number;
  TimeUpdate?: string | number;
  SetScore?: string;
  Timeline?: unknown[];
  ServerTime?: string | number;
  TeamColors?: unknown[];
  ExtEventId?: string;
  Seconds?: number;
  MatchScore?: string;
  Details?: EventModel;
}

// ── Theme / config ────────────────────────────────────────────────────────
export interface ThemeConfig {
  brandName?: string;
  primaryColor?: string;
  accentColor?: string;
  bgColor?: string;
  homeColor?: string;
  awayColor?: string;
  logoUrl?: string;
  mode?: 'light' | 'dark';
  font?: string;
}

export interface LMTConfig {
  container: string | HTMLElement;
  partner: string;
  endpoint?: string;
  theme?: ThemeConfig;
  locale?: string;
  /** Optional injection point for tests / mock environments. */
  socketFactory?: SocketFactory;
}

/**
 * Default WebSocket endpoint as documented in the provider PDF
 * (Real Time Websocket Data, Communications details).
 */
export const DEFAULT_ENDPOINT = 'https://websocket.endpoint/';

// ── Connection state ──────────────────────────────────────────────────────
export type ConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'verifying'
  | 'verified'
  | 'ready'
  | 'disconnected'
  | 'error';

// ── Public events emitted to consumers via lmt.on(...) ────────────────────
export interface LMTPublicEvents {
  ready: { eventId: string | string[] };
  'event:loaded': EventModel;
  'event:updated': EventModel;
  action: ActionModel;
  connection: { state: ConnectionState; reason?: string };
  error: { message: string; cause?: unknown };
}

// ── Socket abstraction so tests can inject a fake ─────────────────────────
export interface SocketLike {
  on(event: string, listener: (...args: unknown[]) => void): unknown;
  off(event: string, listener?: (...args: unknown[]) => void): unknown;
  emit(event: string, ...args: unknown[]): unknown;
  disconnect(): unknown;
  connected?: boolean;
}

export type SocketFactory = (endpoint: string) => SocketLike;
