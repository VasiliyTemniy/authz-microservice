import { config } from '../config';
import { getTimestamp } from './date';

const { IS_TEST, DEBUG } = config;

type TLoggable =
  string |
  number |
  boolean |
  object |
  null |
  undefined |
  TLoggable[] |
  { [key: string]: TLoggable };

export interface ILogger {
  info(...args: TLoggable[]): void;
  warn(...args: TLoggable[]): void;
  error(...args: TLoggable[]): void;
  debug(...args: TLoggable[]): void;
}

export class CLogger implements ILogger {
  constructor(protected scope: string) {
    this.scope = scope ?? 'global';
  }
  
  info(operation: string, ...args: TLoggable[]) {
    if ( IS_TEST ) return;
    this.print('INFO ', operation, ...args);
  }
  
  warn(operation: string, ...args: TLoggable[]) {
    if ( IS_TEST ) return;
    this.print('WARN ', operation, ...args);
  }
  
  error(operation: string, ...args: TLoggable[]) {
    if ( IS_TEST ) return;
    this.print('ERROR', operation, ...args);
  }
  
  debug(operation: string, ...args: TLoggable[]) {
    if ( !DEBUG.COMMON ) return;
    this.print('DEBUG', operation, ...args);
  }
  
  protected print(level: 'INFO ' | 'WARN ' | 'ERROR' | 'DEBUG', operation: string, ...args: TLoggable[]) {
    const text = JSON.stringify([...args], null, '  ');
    console.log(level, getTimestamp(), this.scope, operation);
    if (text.length > 8) {
      console.log(text);
    } else {
      console.log('[\n  ', ...args, '\n]');
    }
  }
}

export class CLoggerColored extends CLogger {
  private colors = {
    background: {
      'INFO ': '\x1b[44m',
      'WARN ': '\x1b[43m',
      'ERROR': '\x1b[41m',
      'DEBUG': '\x1b[100m',
    },
    foreground: {
      'INFO ': '\x1b[34m',
      'WARN ': '\x1b[33m',
      'ERROR': '\x1b[31m',
      'DEBUG': '\x1b[90m',
    },
    noColor: '\x1b[0m'
  }

  constructor(scope: string) {
    super(scope);
  }

  protected print(level: 'INFO ' | 'WARN ' | 'ERROR' | 'DEBUG', operation: string, ...args: TLoggable[]) {
    const text = JSON.stringify([...args], null, '  ');
    console.log(this.colors.background[level], level, this.colors.noColor, this.colors.foreground[level], getTimestamp(), super.scope, operation, this.colors.noColor);
    if (text.length > 8) {
      console.log(text);
    } else {
      console.log('[\n  ', ...args, '\n]');
    }
  }
}