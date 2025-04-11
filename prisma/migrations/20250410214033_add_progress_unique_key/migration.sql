/*
  Warnings:

  - A unique constraint covering the columns `[student_id,workshop_id]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Progress_student_id_idx";

-- DropIndex
DROP INDEX "Progress_workshop_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Progress_student_id_workshop_id_key" ON "Progress"("student_id", "workshop_id");
