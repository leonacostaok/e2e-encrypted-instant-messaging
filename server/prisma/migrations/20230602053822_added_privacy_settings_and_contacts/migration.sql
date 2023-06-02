-- CreateEnum
CREATE TYPE "ShareType" AS ENUM ('NONE', 'CONTACTS', 'EVERYONE');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emoji" TEXT;

-- CreateTable
CREATE TABLE "privacy_settings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "phoneSearch" BOOLEAN NOT NULL DEFAULT true,
    "aliasSearch" BOOLEAN NOT NULL DEFAULT true,
    "phoneShare" "ShareType" NOT NULL DEFAULT 'CONTACTS',
    "emojiShare" "ShareType" NOT NULL DEFAULT 'CONTACTS',
    "nameShare" "ShareType" NOT NULL DEFAULT 'CONTACTS',
    "imageShare" "ShareType" NOT NULL DEFAULT 'CONTACTS',
    "statusShare" "ShareType" NOT NULL DEFAULT 'CONTACTS',

    CONSTRAINT "privacy_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),
    "updateAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "privacy_settings_userId_key" ON "privacy_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_userId_key" ON "contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_contactId_key" ON "contacts"("contactId");

-- AddForeignKey
ALTER TABLE "privacy_settings" ADD CONSTRAINT "privacy_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
