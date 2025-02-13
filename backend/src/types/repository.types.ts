export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
}
