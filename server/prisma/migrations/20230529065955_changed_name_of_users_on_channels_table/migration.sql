/*
  Warnings:

  - You are about to drop the `UsersOnChannels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnChannels" DROP CONSTRAINT "UsersOnChannels_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnChannels" DROP CONSTRAINT "UsersOnChannels_channelId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnChannels" DROP CONSTRAINT "UsersOnChannels_recipientId_fkey";

-- DropTable
DROP TABLE "UsersOnChannels";

-- CreateTable
CREATE TABLE "usersOnChannels" (
    "recipientId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "assignedById" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "usersOnChannels_pkey" PRIMARY KEY ("recipientId","channelId")
);

-- AddForeignKey
ALTER TABLE "usersOnChannels" ADD CONSTRAINT "usersOnChannels_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnChannels" ADD CONSTRAINT "usersOnChannels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnChannels" ADD CONSTRAINT "usersOnChannels_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
