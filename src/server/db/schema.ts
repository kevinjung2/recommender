// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations, InferSelectModel } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  smallint,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["default", "admin"]);

export const createTable = pgTableCreator((name) => `recommender_${name}`);

export const primaryCategories = createTable(
  "primaryCategories",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    primaryNameIndex: uniqueIndex("primary_name_idx").on(table.name),
  }),
);

export const secondaryCategories = createTable(
  "secondaryCategories",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    secondaryNameIndex: uniqueIndex("secondary_name_idx").on(table.name),
  }),
);

export const users = createTable(
  "users",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    role: rolesEnum("roles").default("default"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const recommendations = createTable(
  "recommendations",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    primaryCategoryId: integer("primary_category_id").references(
      () => primaryCategories.id,
    ),
    secondaryCategoryId: integer("secondary_category_id").references(
      () => secondaryCategories.id,
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
	userId: integer("user_id").references(
		() => users.id
	)
  },
  (table) => ({
    recommendationsIndex: index("recommendations_idx").on(table.name),
  }),
);

export const reviews = createTable(
  "reviews",
  {
    id: smallint("id").primaryKey().generatedByDefaultAsIdentity(),
    rating: integer("rating").notNull(),
    comment: varchar("comment", { length: 256 }).notNull(),
    userId: integer("user_id").references(() => users.id),
    recommendationId: integer("recommendation_id").references(
      () => recommendations.id,
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    ratingIndex: index("rating_idx").on(table.rating),
  }),
);

export const recommendationRelations = relations(recommendations, ({ one }) => ({
	primaryCategory: one(primaryCategories, {
		fields: [recommendations.primaryCategoryId],
		references: [primaryCategories.id]
	}),
	secondaryCategory: one(secondaryCategories, {
		fields: [recommendations.secondaryCategoryId],
		references: [secondaryCategories.id]
	}),
	user: one(users, {
		fields: [recommendations.userId],
		references: [users.id]
	})
}));

export const primaryCategoryRelations = relations(primaryCategories, ({ many }) => ({
	recommendations: many(primaryCategories),
}));

export const secondaryCategoryRelations = relations(secondaryCategories, ({ many }) => ({
	recommendations: many(secondaryCategories),
}));

export const userRecommendationRelations = relations(users, ({many}) => ({
	recommendations: many(users)
}));

export type Recommendations = InferSelectModel<typeof recommendations>
