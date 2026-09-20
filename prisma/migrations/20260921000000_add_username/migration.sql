ALTER TABLE "User" ADD COLUMN "username" TEXT;

UPDATE "User" AS u
SET "username" = s."nis"
FROM "Student" AS s
WHERE s."userId" = u."id";

UPDATE "User" AS u
SET "username" = t."nip"
FROM "Teacher" AS t
WHERE t."userId" = u."id";

UPDATE "User"
SET "username" = split_part("email", '@', 1)
WHERE "username" IS NULL;

ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
