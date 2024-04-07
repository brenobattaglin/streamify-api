import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity";

describe("category unit tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  afterEach(() => {
    validateSpy.mockClear();
  });

  describe("when constructor is called", () => {
    it("should return new category without description", () => {
      let category = new Category({
        name: "Movie",
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);

    });

    it("should return new category with description", () => {
      const createdAt = new Date();
      const category = new Category({
        name: "Movie",
        description: "Movie desc",
        isActive: false,
        createdAt,
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie desc");
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBe(createdAt);

    });
  });
  describe("when category is created", () => {
    test("should create a category without", () => {
      const category = Category.create({
        name: "Movie",
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create category with description", () => {
      const createdAt = new Date();
      const category = Category.create({
        name: "Movie",
        description: "Movie desc",
        isActive: false,
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie desc");
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);

    });
  });

  describe("when changes are applied", () => {
    it("should change name", () => {
      const category = Category.create({
        name: "Movie",
      });
      category.changeName("Music");
      expect(category.name).toBe("Music");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    it("should change description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie desc",
      });
      category.changeDescription("Music desc");
      expect(category.description).toBe("Music desc");
      expect(validateSpy).toHaveBeenCalledTimes(2);

    });

    it("should activate category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: false,
      });
      category.activate();
      expect(category.isActive).toBe(true);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should deactivate category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: true,
      });
      category.deactivate();
      expect(category.isActive).toBe(false);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("when id is set", () => {
    const arrange = [
      { categoryId: null },
      { categoryId: undefined },
      { categoryId: Uuid.create() },
    ];

    test.each(arrange)("id = %j", ({ categoryId }) => {
      const category = new Category({
        categoryId: categoryId as any,
        name: "Movie",
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
    });
  });
});

describe("category validation tests", () => {
  describe("when create command is called", () => {
    test("should throw error for null name", () => {
      expect(() =>
        Category.create({ name: null })
      ).toThrow(
        new EntityValidationError({ name: "name is required" })
      );
    });
  });
});