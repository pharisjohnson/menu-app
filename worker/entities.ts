import { IndexedEntity, Entity } from "./core-utils";
import type { Product, Category, User, Order } from "@shared/types";
import { PRODUCTS, CATEGORIES } from "@shared/mock-data";
// PRODUCT ENTITY
export class ProductEntity extends IndexedEntity<Product> {
  static readonly entityName = "product";
  static readonly indexName = "products";
  static readonly initialState: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    tags: [],
  };
  static seedData = PRODUCTS;
}
// CATEGORY ENTITY
export class CategoryEntity extends IndexedEntity<Category> {
  static readonly entityName = "category";
  static readonly indexName = "categories";
  static readonly initialState: Category = {
    id: "",
    name: "",
    slug: "",
  };
  static seedData = CATEGORIES;
}
// USER ENTITY
// Using a simple Entity as we'll fetch users by their ID (email) directly.
export class UserEntity extends Entity<{ id: string; name: string; password_HACK: string }> {
  static readonly entityName = "user";
  static readonly initialState = { id: "", name: "", password_HACK: "" };
}
// ORDER ENTITY
// Using IndexedEntity to allow listing all orders for a user.
export class OrderEntity extends IndexedEntity<Order> {
  static readonly entityName = "order";
  static readonly indexName = "orders";
  static readonly initialState: Order = {
    id: "",
    userId: "",
    items: [],
    total: 0,
    createdAt: "",
  };
}