/*
  Warnings:

  - You are about to drop the `message_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "message_status" DROP CONSTRAINT "message_status_messageId_fkey";

-- DropForeignKey
ALTER TABLE "message_status" DROP CONSTRAINT "message_status_recipientId_channelId_fkey";

-- DropTable
DROP TABLE "message_status";

-- CreateTable
CREATE TABLE "read_receipt" (
    "messageId" CHAR(21) NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "readAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "read_receipt_pkey" PRIMARY KEY ("recipientId","channelId","messageId")
);

-- AddForeignKey
ALTER TABLE "read_receipt" ADD CONSTRAINT "read_receipt_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "read_receipt" ADD CONSTRAINT "read_receipt_recipientId_channelId_fkey" FOREIGN KEY ("recipientId", "channelId") REFERENCES "users_to_channels"("recipientId", "channelId") ON DELETE CASCADE ON UPDATE CASCADE;
