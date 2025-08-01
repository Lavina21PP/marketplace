-- CreateTable
CREATE TABLE "public"."Users1" (
    "u_id" SERIAL NOT NULL,
    "u_name" TEXT NOT NULL,
    "u_email" TEXT NOT NULL,

    CONSTRAINT "Users1_pkey" PRIMARY KEY ("u_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users1_u_email_key" ON "public"."Users1"("u_email");
