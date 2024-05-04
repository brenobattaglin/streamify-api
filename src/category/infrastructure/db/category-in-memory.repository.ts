import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { InMemoryRepository } from '../../../shared/infrastructure/db/in-memory/in-memory.repository';
import { Category } from '../../domain/category.entity';

export class CategoryInMemoryRepository extends InMemoryRepository<
  Category,
  Uuid
> {
  getEntityId(): new (...args: any[]) => Category {
    return this.getEntityId();
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
