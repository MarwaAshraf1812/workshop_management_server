/*
  Warnings:

  - You are about to drop the `workshop_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workshop_users" DROP CONSTRAINT "workshop_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "workshop_users" DROP CONSTRAINT "workshop_users_workshop_id_fkey";

-- DropTable
DROP TABLE "workshop_users";

-- CreateTable
CREATE TABLE "workshopUsers" (
    "workshop_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "workshopUsers_workshop_id_user_id_key" ON "workshopUsers"("workshop_id", "user_id");

-- AddForeignKey
ALTER TABLE "workshopUsers" ADD CONSTRAINT "workshopUsers_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshopUsers" ADD CONSTRAINT "workshopUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
