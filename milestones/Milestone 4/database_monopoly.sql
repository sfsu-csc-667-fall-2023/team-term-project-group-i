CREATE TYPE "property_types" AS ENUM (
  'brown',
  'light_blue',
  'pink',
  'orange',
  'red',
  'yellow',
  'green',
  'dark_blue',
  'stations',
  'utilities'
);

CREATE TYPE "property_name" AS ENUM (
  'Mediterranean_Avenue',
  'Baltic_Avenue',
  'Oriental_Avenue',
  'Vermont_Avenue',
  'Conneticut_Avenue',
  'St_Charles_Place',
  'States_Avenue',
  'Virginia_Avenue',
  'St_James_Place',
  'Tennessee_Avenue',
  'New_York_Avenue',
  'Kentucky_Avenue',
  'Indiana_Avenue',
  'Illinois_Avenue',
  'Atlantic_Avenue',
  'Ventnor_Avenue',
  'Marvin_Gardens',
  'Pacific_Avenue',
  'North_Carolina_Avenue',
  'Pennsylvania_Avenue',
  'Park_Place',
  'Boardwalk',
  'Wisconsin_Avenue',
  'Nevada_Avenue',
  'Missouri_Avenue',
  'Rhode_Island_Avenue',
  'Oregon_Avenue',
  'Arkansas_Avenue',
  'California_Avenue',
  'Texas_Avenue'
);

CREATE TYPE "railroad_names" AS ENUM (
  'Kings_Cross_Station',
  'Marylebone_Station',
  'Fenchurch_Street_Station',
  'Liverpool_Street_Station'
);

CREATE TYPE "utility_names" AS ENUM (
  'Electic_Company',
  'Water_Works',
  'Gas_Company',
  'Communications_Company'
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "username" varchar(255) UNIQUE,
  "password" varchar(255),
  "salt" varchar(255),
  "email" varchar(255),
  "profile_image" varchar(255),
  "created_at" timestamp,
  "updated_at" timestamp,
  "owned_property_amount" int,
  "owned_properties" int
);

CREATE TABLE "games" (
  "id" int PRIMARY KEY,
  "players_allowed" int,
  "password" varchar(255),
  "active" bool,
  "created_at" timestamp,
  "updated_at" timestamp,
  "started_at" timestamp
);

CREATE TABLE "game_states" (
  "game_id" int,
  "turn_player_id" int,
  "turn_number" int
);

CREATE TABLE "game_users" (
  "user_id" int,
  "game_id" int,
  "seat" int
);

CREATE TABLE "dice" (
  "id" int,
  "sides" int,
  "amount" int
);

CREATE TABLE "chance_cards" (
  "id" int,
  "collect_money" bool,
  "money_amount" int,
  "is_jail" bool,
  "jail_free" bool,
  "if_move" bool,
  "move_spaces" int,
  "if_repair" bool,
  "if_tax" bool,
  "tax_amount" int,
  "if_chairman" bool,
  "description" varchar
);

CREATE TABLE "community_cards" (
  "id" int,
  "collect_money" bool,
  "money_amount" int,
  "is_jail" bool,
  "jail_free" bool,
  "if_fees" bool,
  "fees_amount" int,
  "description" varchar
);

CREATE TABLE "property_cards" (
  "id" int,
  "owned" bool,
  "property_names" enum,
  "railroad_names" enum,
  "utility_names" enum,
  "morgage_value" int,
  "house_cost" int,
  "rent_amount" int,
  "property_types" enum
);

CREATE TABLE "property_upgrade_prices" (
  "id" int,
  "base_price" int,
  "one_house" int,
  "two_houses" int,
  "three_houses" int,
  "four_houses" int,
  "hotel" int
);

CREATE TABLE "game_cards" (
  "card_id" int,
  "game_id" int,
  "user_id" int,
  "chance_cards" int,
  "community_cards" int,
  "property_cards" int
);

CREATE TABLE "chat_messages" (
  "user_id" int,
  "game_id" int,
  "content" varchar,
  "created_at" timestamp
);

ALTER TABLE "games" ADD FOREIGN KEY ("id") REFERENCES "game_states" ("game_id");

ALTER TABLE "dice" ADD FOREIGN KEY ("id") REFERENCES "game_states" ("turn_number");

ALTER TABLE "games" ADD FOREIGN KEY ("id") REFERENCES "game_users" ("game_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "game_users" ("user_id");

ALTER TABLE "property_upgrade_prices" ADD FOREIGN KEY ("id") REFERENCES "property_cards" ("house_cost");

ALTER TABLE "games" ADD FOREIGN KEY ("id") REFERENCES "game_cards" ("game_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "game_cards" ("user_id");

ALTER TABLE "chance_cards" ADD FOREIGN KEY ("id") REFERENCES "game_cards" ("chance_cards");

ALTER TABLE "community_cards" ADD FOREIGN KEY ("id") REFERENCES "game_cards" ("community_cards");

ALTER TABLE "property_cards" ADD FOREIGN KEY ("id") REFERENCES "game_cards" ("property_cards");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "chat_messages" ("user_id");

ALTER TABLE "games" ADD FOREIGN KEY ("id") REFERENCES "chat_messages" ("game_id");
