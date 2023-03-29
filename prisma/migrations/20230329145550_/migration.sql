-- CreateEnum
CREATE TYPE "ParcelStatus" AS ENUM ('ACCEPTED', 'COLLECTED', 'SHIPPED', 'IN_TRANSIT', 'ARRIVED', 'OUT', 'PICKUP', 'DELIVERED', 'PICKED_UP', 'UNSUCCESSFUL');

-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('DELIVERY', 'PICK_UP');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'STAFF');

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "province" TEXT,
    "zipCode" TEXT,
    "contactNumber" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcel" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "sender" JSONB NOT NULL,
    "recipient" JSONB NOT NULL,
    "info" JSONB[],
    "deliveryType" "DeliveryType" NOT NULL,
    "branchID" TEXT NOT NULL,

    CONSTRAINT "Parcel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParcelTracker" (
    "id" TEXT NOT NULL,
    "status" "ParcelStatus" NOT NULL,
    "parcelID" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParcelTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "branchID" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_id_key" ON "Branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchCode_key" ON "Branch"("branchCode");

-- CreateIndex
CREATE UNIQUE INDEX "Parcel_id_key" ON "Parcel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ParcelTracker_id_key" ON "ParcelTracker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ParcelTracker_parcelID_key" ON "ParcelTracker"("parcelID");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_branchID_fkey" FOREIGN KEY ("branchID") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcelTracker" ADD CONSTRAINT "ParcelTracker_parcelID_fkey" FOREIGN KEY ("parcelID") REFERENCES "Parcel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchID_fkey" FOREIGN KEY ("branchID") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
