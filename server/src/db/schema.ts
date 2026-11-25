import { pgTable, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const itemStatusEnum = pgEnum("item_status", ["draft", "listed", "sold"]);

export const items = pgTable("items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  brand: text("brand"),
  category: text("category"),
  size: text("size"),
  condition: text("condition"),
  status: itemStatusEnum("status").default("draft").notNull(),
  buyPrice: integer("buy_price"),
  listPrice: integer("list_price"),
  soldPrice: integer("sold_price"),
  listedAt: timestamp("listed_at", { withTimezone: true }),
  soldAt: timestamp("sold_at", { withTimezone: true }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
});