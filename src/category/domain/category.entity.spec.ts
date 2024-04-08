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
    it("should return invalid name property", () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ],
      });

      expect(() => Category.create({ name: "" })).containsErrorMessages({
        name: [
          "name should not be empty",
        ],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ],
      });

      expect(() => Category.create({ name: "a".repeat(256) })).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters"
        ],
      });
    });

    it("should return invalid description property", () => {
      expect(() => Category.create({ name: "Movie", description: 5 as any })).containsErrorMessages({
        description: [
          "description must be a string",
        ],
      });

      expect(() => Category.create({ name: "Movie", description: "a".repeat(256) })).containsErrorMessages({
        description: [
          "description must be shorter than or equal to 255 characters"
        ],
      });
    });


    it("should return invalid isActive property", () => {
      expect(() => Category.create({ name: "Movie", description: 'lorem ipsum', isActive: "true" as any })).containsErrorMessages({
        isActive: [
          "isActive must be a boolean value",
        ],
      });
    });

    it("should return invalid name change", () => {
      const category = Category.create({ name: "Movie" });
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ],
      });

      expect(() => category.changeName("")).containsErrorMessages({
        name: [
          "name should not be empty",
        ],
      });

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ],
      });

      expect(() => category.changeName("a".repeat(256))).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters"
        ],
      });
    });

    it("should return invalid description change", () => {
      const category = Category.create({ name: "Movie", description: "Movie desc" });
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: [
          "description must be a string",
        ],
      });

      expect(() => category.changeDescription("a".repeat(256))).containsErrorMessages({
        description: [
          "description must be shorter than or equal to 255 characters"
        ],
      });
    });

    it("should return invalid createdAt property", () => {
      expect(() => new Category({ name: "Movie", createdAt: "2021-01-01" as any })).containsErrorMessages({
        createdAt: [
          "createdAt must be a Date instance",
        ],
      });
    });
  });
});