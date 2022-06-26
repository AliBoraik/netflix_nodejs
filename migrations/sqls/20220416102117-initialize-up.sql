/* Replace with your SQL commands */
-- Table: public.UserSubscriptions

-- DROP TABLE public."UserSubscriptions";

CREATE TABLE IF NOT EXISTS public."UserSubscriptions"
(
    "Id" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "SubscriptionId" integer NOT NULL,
    "StartDate" timestamp with time zone NOT NULL,
    "FinishDate" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_UserSubscriptions" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."UserSubscriptions"
    OWNER to postgres;

-- Table: public.Subscriptions

-- DROP TABLE public."Subscriptions";

CREATE TABLE IF NOT EXISTS public."Subscriptions"
(
    "Id" uuid NOT NULL,
    "Name" integer NOT NULL,
    "Cost" real NOT NULL,
    CONSTRAINT "PK_Subscriptions" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Subscriptions"
    OWNER to postgres;

-- Table: public.Serials

-- DROP TABLE public."Serials";

CREATE TABLE IF NOT EXISTS public."Serials"
(
    "Id" uuid NOT NULL,
    "Poster" text COLLATE pg_catalog."default",
    "Title" text COLLATE pg_catalog."default",
    "NumEpisodes" integer NOT NULL,
    "AgeRating" integer NOT NULL,
    "UserRating" real NOT NULL,
    "Description" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_Serials" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Serials"
    OWNER to postgres;

-- Table: public.Reviews

-- DROP TABLE public."Reviews";

CREATE TABLE IF NOT EXISTS public."Reviews"
(
    "Id" uuid NOT NULL,
    "UserName" text COLLATE pg_catalog."default",
    "ContentId" uuid NOT NULL,
    "Text" text COLLATE pg_catalog."default",
    "Rating" real NOT NULL,
    "PublishTime" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Reviews" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Reviews"
    OWNER to postgres;

-- Table: public.Ratings

-- DROP TABLE public."Ratings";

CREATE TABLE IF NOT EXISTS public."Ratings"
(
    "Id" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "ContentId" uuid NOT NULL,
    "UserRating" real NOT NULL,
    CONSTRAINT "PK_Ratings" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Ratings"
    OWNER to postgres;

-- Table: public.Genres

-- DROP TABLE public."Genres";

CREATE TABLE IF NOT EXISTS public."Genres"
(
    "Id" uuid NOT NULL,
    "GenreName" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_Genres" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Genres"
    OWNER to postgres;

-- Table: public.GenreVideos

-- DROP TABLE public."GenreVideos";

CREATE TABLE IF NOT EXISTS public."GenreVideos"
(
    "Id" uuid NOT NULL,
    "GenreName" text COLLATE pg_catalog."default",
    "ContentId" uuid NOT NULL,
    CONSTRAINT "PK_GenreVideos" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."GenreVideos"
    OWNER to postgres;

-- Table: public.Films

-- DROP TABLE public."Films";

CREATE TABLE IF NOT EXISTS public."Films"
(
    "Id" uuid NOT NULL,
    "Title" text COLLATE pg_catalog."default",
    "Poster" text COLLATE pg_catalog."default",
    "Duration" integer NOT NULL,
    "AgeRating" integer NOT NULL,
    "UserRating" real NOT NULL,
    "Description" text COLLATE pg_catalog."default",
    "VideoLink" text COLLATE pg_catalog."default",
    "Preview" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_Films" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Films"
    OWNER to postgres;

-- Table: public.Episodes

-- DROP TABLE public."Episodes";

CREATE TABLE IF NOT EXISTS public."Episodes"
(
    "Id" uuid NOT NULL,
    "Title" text COLLATE pg_catalog."default",
    "SerialId" uuid NOT NULL,
    "Duration" integer NOT NULL,
    "Number" integer NOT NULL,
    "VideoLink" text COLLATE pg_catalog."default",
    "PreviewVideo" bytea,
    CONSTRAINT "PK_Episodes" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."Episodes"
    OWNER to postgres;

-- Table: public.AspNetUsers

-- DROP TABLE public."AspNetUsers";

CREATE TABLE IF NOT EXISTS public."AspNetUsers"
(
    "Id" text COLLATE pg_catalog."default" NOT NULL,
    "Avatar" text COLLATE pg_catalog."default",
    "UserName" character varying(256) COLLATE pg_catalog."default",
    "NormalizedUserName" character varying(256) COLLATE pg_catalog."default",
    "Email" character varying(256) COLLATE pg_catalog."default",
    "NormalizedEmail" character varying(256) COLLATE pg_catalog."default",
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetUsers"
    OWNER to postgres;
-- Index: EmailIndex

-- DROP INDEX public."EmailIndex";

CREATE INDEX "EmailIndex"
    ON public."AspNetUsers" USING btree
        ("NormalizedEmail" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: UserNameIndex

-- DROP INDEX public."UserNameIndex";

CREATE UNIQUE INDEX "UserNameIndex"
    ON public."AspNetUsers" USING btree
        ("NormalizedUserName" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.AspNetUserTokens

-- DROP TABLE public."AspNetUserTokens";

CREATE TABLE IF NOT EXISTS public."AspNetUserTokens"
(
    "UserId" text COLLATE pg_catalog."default" NOT NULL,
    "LoginProvider" text COLLATE pg_catalog."default" NOT NULL,
    "Name" text COLLATE pg_catalog."default" NOT NULL,
    "Value" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId")
        REFERENCES public."AspNetUsers" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetUserTokens"
    OWNER to postgres;

-- Table: public.AspNetUserLogins

-- DROP TABLE public."AspNetUserLogins";

CREATE TABLE IF NOT EXISTS public."AspNetUserLogins"
(
    "LoginProvider" text COLLATE pg_catalog."default" NOT NULL,
    "ProviderKey" text COLLATE pg_catalog."default" NOT NULL,
    "ProviderDisplayName" text COLLATE pg_catalog."default",
    "UserId" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId")
        REFERENCES public."AspNetUsers" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetUserLogins"
    OWNER to postgres;
-- Index: IX_AspNetUserLogins_UserId

-- DROP INDEX public."IX_AspNetUserLogins_UserId";

CREATE INDEX "IX_AspNetUserLogins_UserId"
    ON public."AspNetUserLogins" USING btree
        ("UserId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.AspNetUserClaims

-- DROP TABLE public."AspNetUserClaims";

CREATE TABLE IF NOT EXISTS public."AspNetUserClaims"
(
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "UserId" text COLLATE pg_catalog."default" NOT NULL,
    "ClaimType" text COLLATE pg_catalog."default",
    "ClaimValue" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId")
        REFERENCES public."AspNetUsers" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetUserClaims"
    OWNER to postgres;
-- Index: IX_AspNetUserClaims_UserId

-- DROP INDEX public."IX_AspNetUserClaims_UserId";

CREATE INDEX "IX_AspNetUserClaims_UserId"
    ON public."AspNetUserClaims" USING btree
        ("UserId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.AspNetRoles

-- DROP TABLE public."AspNetRoles";

CREATE TABLE IF NOT EXISTS public."AspNetRoles"
(
    "Id" text COLLATE pg_catalog."default" NOT NULL,
    "Name" character varying(256) COLLATE pg_catalog."default",
    "NormalizedName" character varying(256) COLLATE pg_catalog."default",
    "ConcurrencyStamp" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetRoles"
    OWNER to postgres;
-- Index: RoleNameIndex

-- DROP INDEX public."RoleNameIndex";

CREATE UNIQUE INDEX "RoleNameIndex"
    ON public."AspNetRoles" USING btree
        ("NormalizedName" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.AspNetUserRoles

-- DROP TABLE public."AspNetUserRoles";

CREATE TABLE IF NOT EXISTS public."AspNetUserRoles"
(
    "UserId" text COLLATE pg_catalog."default" NOT NULL,
    "RoleId" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId")
        REFERENCES public."AspNetRoles" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId")
        REFERENCES public."AspNetUsers" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetUserRoles"
    OWNER to postgres;
-- Index: IX_AspNetUserRoles_RoleId

-- DROP INDEX public."IX_AspNetUserRoles_RoleId";

CREATE INDEX "IX_AspNetUserRoles_RoleId"
    ON public."AspNetUserRoles" USING btree
        ("RoleId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.AspNetRoleClaims

-- DROP TABLE public."AspNetRoleClaims";

CREATE TABLE IF NOT EXISTS public."AspNetRoleClaims"
(
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "RoleId" text COLLATE pg_catalog."default" NOT NULL,
    "ClaimType" text COLLATE pg_catalog."default",
    "ClaimValue" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId")
        REFERENCES public."AspNetRoles" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    TABLESPACE pg_default;

ALTER TABLE public."AspNetRoleClaims"
    OWNER to postgres;
-- Index: IX_AspNetRoleClaims_RoleId

-- DROP INDEX public."IX_AspNetRoleClaims_RoleId";

CREATE INDEX "IX_AspNetRoleClaims_RoleId"
    ON public."AspNetRoleClaims" USING btree
        ("RoleId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

