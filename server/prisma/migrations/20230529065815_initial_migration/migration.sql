-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "publicKey" TEXT NOT NULL,
    "alias" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),
    "updateAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel" (
    "id" SERIAL NOT NULL,
    "publicKey" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT,
    "bio" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),
    "updateAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnChannels" (
    "recipientId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "assignedById" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "UsersOnChannels_pkey" PRIMARY KEY ("recipientId","channelId")
);

-- CreateTable
CREATE TABLE "message" (
    "id" CHAR(21) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "encryptedMessage" TEXT NOT NULL,
    "sentTime" TIMESTAMP(3) NOT NULL,
    "signature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),
    "updateAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_publicKey_key" ON "user"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "user_alias_key" ON "user"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "channel_publicKey_key" ON "channel"("publicKey");

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnChannels" ADD CONSTRAINT "UsersOnChannels_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
