/*
  Warnings:

  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "lastLogin" DATETIME,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_users" ("email", "firstName", "id", "lastLogin", "lastName", "password", "tokenVersion") SELECT "email", "firstName", "id", "lastLogin", "lastName", "password", "tokenVersion" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
