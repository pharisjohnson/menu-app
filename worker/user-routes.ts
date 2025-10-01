import { Hono, Context, Next } from "hono";
import type { Env } from './core-utils';
import { ProductEntity, CategoryEntity, UserEntity, OrderEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { User, Order } from "@shared/types";
// This is a mock auth middleware. In a real app, use JWTs or a proper auth service.
const mockAuth = async (c: Context<{ Bindings: Env, Variables: { user: User } }>, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return bad(c, 'Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  // The "token" is just the user's email for this mock setup.
  const user = new UserEntity(c.env, token);
  if (!(await user.exists())) {
    return bad(c, 'Unauthorized: User not found');
  }
  c.set('user', await user.getState());
  await next();
};
export function userRoutes(app: Hono<{ Bindings: Env, Variables: { user: User } }>) {
  // PRODUCTS
  app.get('/api/products', async (c) => {
    await ProductEntity.ensureSeed(c.env);
    const page = await ProductEntity.list(c.env, null, 100);
    return ok(c, page.items);
  });
  // CATEGORIES
  app.get('/api/categories', async (c) => {
    await CategoryEntity.ensureSeed(c.env);
    const page = await CategoryEntity.list(c.env, null, 100);
    return ok(c, page.items);
  });
  // AUTH: SIGNUP
  app.post('/api/auth/signup', async (c) => {
    const { name, email, password } = await c.req.json();
    if (!name || !email || !password) return bad(c, 'Missing required fields');
    const user = new UserEntity(c.env, email);
    if (await user.exists()) return bad(c, 'User with this email already exists');
    await user.save({ id: email, name, password_HACK: password });
    const userData: User = { id: email, name };
    return ok(c, { user: userData, token: email }); // Using email as a mock token
  });
  // AUTH: LOGIN
  app.post('/api/auth/login', async (c) => {
    const { email, password } = await c.req.json();
    if (!email || !password) return bad(c, 'Missing email or password');
    const user = new UserEntity(c.env, email);
    if (!(await user.exists())) return notFound(c, 'User not found');
    const userData = await user.getState();
    if (userData.password_HACK !== password) return bad(c, 'Invalid credentials');
    const userResponse: User = { id: userData.id, name: userData.name };
    return ok(c, { user: userResponse, token: email }); // Using email as a mock token
  });
  // ORDERS: GET (for a specific user)
  app.get('/api/orders', mockAuth, async (c) => {
    const user = c.get('user');
    const allOrders = await OrderEntity.list(c.env, null, 1000); // Inefficient, but fine for mock
    const userOrders = allOrders.items.filter((order: Order) => order.userId === user.id);
    return ok(c, userOrders);
  });
  // ORDERS: POST (create a new order)
  app.post('/api/orders', mockAuth, async (c) => {
    const user = c.get('user');
    const { items, total } = await c.req.json();
    if (!items || !total) return bad(c, 'Missing order data');
    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: user.id,
      items,
      total,
      createdAt: new Date().toISOString(),
    };
    await OrderEntity.create(c.env, newOrder);
    return ok(c, newOrder);
  });
}