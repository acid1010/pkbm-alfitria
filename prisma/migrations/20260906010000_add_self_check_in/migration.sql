ALTER TABLE "Attendance"
ADD COLUMN "selfieUrl" TEXT,
ADD COLUMN "checkInAt" TIMESTAMP(3);

CREATE INDEX "Attendance_checkInAt_idx" ON "Attendance"("checkInAt");
