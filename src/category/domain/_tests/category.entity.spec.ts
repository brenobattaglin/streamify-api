import { Category } from "../category.entity";

describe("category unit tests", () => {
  describe("when constructor is called", () => {
    it("should return new category without description", () => {
      let category = new Category({
        name: "Movie",
      });
      expect(category.categoryId).toBeUndefined();
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
      expect(category.categoryId).toBeUndefined();
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
      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    it("should create category with description", () => {
      const createdAt = new Date();
      const category = Category.create({
        name: "Movie",
        description: "Movie desc",
        isActive: false,
      });
      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie desc");
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe("when changes are applied", () => {
    it("should change name", () => {
      const category = Category.create({
        name: "Movie",
      });
      category.changeName("Music");
      expect(category.name).toBe("Music");
    });

    it("should change description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie desc",
      });
      category.changeDescription("Music desc");
      expect(category.description).toBe("Music desc");
    });

    it("should activate category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: false,
      });
      category.activate();
      expect(category.isActive).toBe(true);
    });

    it("should deactivate category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: true,
      });
      category.deactivate();
      expect(category.isActive).toBe(false);
    });
  });
});
