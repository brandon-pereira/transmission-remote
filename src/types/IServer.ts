export enum IServerHealth {
  HEALTHY = 'HEALTHY',
  UNHEALTHY = 'UNHEALTHY',
}

export interface IServerConfiguration {
  id: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export interface IServer extends IServerConfiguration {
  isDefault: boolean;
  isActive: boolean;
}
