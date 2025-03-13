/*
  Warnings:

  - The values [СOMMON] on the enum `Importance` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Importance_new" AS ENUM ('COMMON', 'IMPORTANT', 'CRITICAL');
ALTER TABLE "events" ALTER COLUMN "importance" TYPE "Importance_new" USING ("importance"::text::"Importance_new");
ALTER TYPE "Importance" RENAME TO "Importance_old";
ALTER TYPE "Importance_new" RENAME TO "Importance";
DROP TYPE "Importance_old";
COMMIT;
