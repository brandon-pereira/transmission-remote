export enum IServerHealth {
  HEALTHY = 'HEALTHY',
  UNHEALTHY = 'UNHEALTHY',
}

export interface IServerConfiguration {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

export interface IServer extends IServerConfiguration {
  health: IServerHealth;
  isDefault: boolean;
  isActive: boolean;
}
