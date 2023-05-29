/*
  Warnings:

  - You are about to drop the `usersOnChannels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usersOnChannels" DROP CONSTRAINT "usersOnChannels_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "usersOnChannels" DROP CONSTRAINT "usersOnChannels_channelId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnChannels" DROP CONSTRAINT "usersOnChannels_recipientId_fkey";

-- DropTable
DROP TABLE "usersOnChannels";

-- CreateTable
CREATE TABLE "users_to_channels" (
    "recipientId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "assignedById" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "users_to_channels_pkey" PRIMARY KEY ("recipientId","channelId")
);

-- CreateTable
CREATE TABLE "message_status" (
    "messageId" CHAR(21) NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "message_status_pkey" PRIMARY KEY ("recipientId","channelId","messageId")
);

-- AddForeignKey
ALTER TABLE "users_to_channels" ADD CONSTRAINT "users_to_channels_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_to_channels" ADD CONSTRAINT "users_to_channels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_to_channels" ADD CONSTRAINT "users_to_channels_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_recipientId_channelId_fkey" FOREIGN KEY ("recipientId", "channelId") REFERENCES "users_to_channels"("recipientId", "channelId") ON DELETE CASCADE ON UPDATE CASCADE;
