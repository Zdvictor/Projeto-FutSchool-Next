/*
  Warnings:

  - You are about to drop the column `paymentIntent` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_intent]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payment_intent]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_intent` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_paymentIntent_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "emailSent" BOOLEAN NOT NULL DEFAULT false;

-- RenameColumn
ALTER TABLE "Order" RENAME COLUMN "paymentIntent" TO "payment_intent";

-- CreateTable
CREATE TABLE "NotificationEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationEmail_email_key" ON "NotificationEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_payment_intent_key" ON "Order"("payment_intent");

-- CreateIndex
CREATE UNIQUE INDEX "unique_payment_intent" ON "Order"("payment_intent");
