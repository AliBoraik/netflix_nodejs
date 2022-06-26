/* Replace with your SQL commands */
/*  Subscriptions  */
drop table IF EXISTS public."Subscriptions";
CREATE TABLE IF NOT EXISTS public."Subscriptions"
(
    "Id" serial NOT NULL,
    "Name" varchar NOT NULL,
    "Cost" real NOT NULL,
    CONSTRAINT "PK_Subscriptions" PRIMARY KEY ("Id")
    )

    TABLESPACE pg_default;

ALTER TABLE public."Subscriptions"
    OWNER to postgres;

insert into "Subscriptions" ("Name","Cost")
values ('F',8.99) , ('S',13.99) , ('SS',17.99);
/*  User Subscriptions  */
ALTER TABLE "UserSubscriptions"
ALTER COLUMN "UserId" TYPE text;

