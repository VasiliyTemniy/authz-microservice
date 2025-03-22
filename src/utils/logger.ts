import { LogLevel } from '../enums';
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
  unknown |
  TLoggable[] |
  { [key: string]: TLoggable };

type TLogLevel = 'FATAL' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE';
type TLogLevelOrSilent = TLogLevel | 'SILENT';

export interface ILogger {
  level: TLogLevelOrSilent;
  fatal(...args: TLoggable[]): void;
  error(...args: TLoggable[]): void;
  warn(...args: TLoggable[]): void;
  info(...args: TLoggable[]): void;
  debug(...args: TLoggable[]): void;
  trace(...args: TLoggable[]): void;
  child(): ILogger;
}

export class CLogger implements ILogger {
  public scope: string;
  public level: TLogLevelOrSilent;
  private numLevel: LogLevel;

  constructor({
    scope,
    level
  } : {
    scope?: string,
    level?: TLogLevelOrSilent
  }) {
    this.scope = scope ?? 'global';
    this.level = level ?? 'INFO';
    this.numLevel = LogLevel[this.level];
  }

  fatal(operation: string, ...args: TLoggable[]) {
    if ( this.numLevel < LogLevel.FATAL ) return;
    this.print('FATAL', operation, ...args);
  }
  
  error(operation: string, ...args: TLoggable[]) {
    if ( IS_TEST || this.numLevel < LogLevel.ERROR ) return;
    this.print('ERROR', operation, ...args);
  }

  warn(operation: string, ...args: TLoggable[]) {
    if ( IS_TEST || this.numLevel < LogLevel.WARN ) return;
    this.print('WARN', operation, ...args);
  }
  
  info(operation: string, ...args: TLoggable[]) {
    if ( IS_TEST || this.numLevel < LogLevel.INFO ) return;
    this.print('INFO', operation, ...args);
  }
  
  debug(operation: string, ...args: TLoggable[]) {
    if ( !DEBUG.COMMON || this.numLevel < LogLevel.DEBUG ) return;
    this.print('DEBUG', operation, ...args);
  }

  trace(operation: string, ...args: TLoggable[]) {
    if ( !DEBUG.COMMON || !DEBUG.TRACE || this.numLevel < LogLevel.TRACE ) return;
    this.print('TRACE', operation, ...args);
  }
  
  protected print(level: Uppercase<TLogLevel>, operation: string, ...args: TLoggable[]) {
    console.log(level, getTimestamp(), this.scope + '.' + operation, '[\n  ', ...args, '\n]');
  }

  child() {
    return new CLogger({
      scope: this.scope,
      level: this.level
    });
  }
}

export class CLoggerColored extends CLogger {
  private colors = {
    background: {
      'FATAL': '\x1b[41m',
      'ERROR': '\x1b[41m',
      'WARN': '\x1b[43m',
      'INFO': '\x1b[44m',
      'DEBUG': '\x1b[100m',
      'TRACE': '\x1b[100m',
    },
    foreground: {
      'FATAL': '\x1b[31m',
      'ERROR': '\x1b[31m',
      'WARN': '\x1b[33m',
      'INFO': '\x1b[34m',
      'DEBUG': '\x1b[90m',
      'TRACE': '\x1b[90m',
    },
    noColor: '\x1b[0m'
  };

  constructor({
    scope,
    level
  } : {
    scope?: string,
    level?: TLogLevelOrSilent
  }) {
    super({ scope, level });
  }

  protected print(level: Uppercase<TLogLevel>, operation: string, ...args: TLoggable[]) {
    console.log(
      this.colors.background[level],
      level,
      this.colors.noColor,
      this.colors.foreground[level],
      getTimestamp(),
      this.scope + '.' + operation,
      this.colors.noColor,
      '[\n  ',
      ...args,
      '\n]'
    );
  }

  child() {
    return new CLoggerColored({
      scope: this.scope,
      level: this.level
    });
  }
}