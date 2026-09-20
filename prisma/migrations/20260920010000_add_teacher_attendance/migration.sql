CREATE TABLE "TeacherAttendance" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'HADIR',
    "selfieUrl" TEXT,
    "checkInAt" TIMESTAMP(3),

    CONSTRAINT "TeacherAttendance_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TeacherAttendance_teacherId_date_key" ON "TeacherAttendance"("teacherId", "date");
CREATE INDEX "TeacherAttendance_checkInAt_idx" ON "TeacherAttendance"("checkInAt");

ALTER TABLE "TeacherAttendance"
ADD CONSTRAINT "TeacherAttendance_teacherId_fkey"
FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
