CREATE TYPE "public"."item_status" AS ENUM('draft', 'listed', 'sold');--> statement-breakpoint
CREATE TABLE "items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"brand" text,
	"category" text,
	"size" text,
	"condition" text,
	"status" "item_status" DEFAULT 'draft' NOT NULL,
	"buy_price" integer,
	"list_price" integer,
	"sold_price" integer,
	"listed_at" timestamp with time zone,
	"sold_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;