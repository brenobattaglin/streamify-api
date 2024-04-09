import { Entity } from "../entity";
import { ValueObject } from "../value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity: E): Promise<void>;
    bulkInsert(entities: E[]): Promise<void>;

    update(entity: E): Promise<void>;
    delete(entity: E): Promise<void>;

    findOne(entityId: ValueObject): Promise<E>;
    findAll(): Promise<E[]>;

    getEntityId(): new (...args: any[]) => E;
}