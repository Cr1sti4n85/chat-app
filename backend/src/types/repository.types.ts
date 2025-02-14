export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
}

export type Query = Record<string, unknown>;
