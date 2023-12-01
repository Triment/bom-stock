-- CreateTable
CREATE TABLE "PackageType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PackageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "packageTypeID" TEXT NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_packageTypeID_fkey" FOREIGN KEY ("packageTypeID") REFERENCES "PackageType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
