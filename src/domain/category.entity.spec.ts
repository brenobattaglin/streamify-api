import { Category } from "./category.entity";

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

    it("should return new category without description", () => {
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
});
