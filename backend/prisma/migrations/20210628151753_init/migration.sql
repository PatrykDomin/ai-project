/*
  Warnings:

  - You are about to drop the column `reactions` on the `PetPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PetPost" DROP COLUMN "reactions",
ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "petPostId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetPost" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD FOREIGN KEY ("petPostId") REFERENCES "PetPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
