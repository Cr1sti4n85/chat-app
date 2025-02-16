export interface Repository<T = unknown> {
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
}

export type Query = Record<string, unknown>;
