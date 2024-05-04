import { Entity } from '../entity';
import { ValueObject } from '../value-object';

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;

  update(entity: E): Promise<void>;
  delete(entity: EntityId): Promise<void>;

  findOne(entityId: ValueObject): Promise<E | null>;
  findAll(): Promise<E[] | null>;

  getEntity(): new (...args: any[]) => E;
}
