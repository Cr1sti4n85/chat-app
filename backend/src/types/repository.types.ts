export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
}

export type Query = Record<string, unknown>;
