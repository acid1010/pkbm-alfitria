import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("pkbm12345", 10);
  const superuserPassword = process.env.SEED_SUPERUSER_PASSWORD ?? "pkbm12345";
  const superuserPasswordHash = await bcrypt.hash(superuserPassword, 10);

  await prisma.document.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.news.deleteMany();
  await prisma.pPDB.deleteMany();
  await prisma.student.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Admin PKBM",
      email: "admin@pkbm.id",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      name: "Super Admin PKBM",
      email: "superadmin@pkbm.id",
      password: superuserPasswordHash,
      role: "ADMIN",
    },
  });

  const guruUsers = await Promise.all(
    Array.from({ length: 3 }).map((_, idx) =>
      prisma.user.create({
        data: {
          name: `Guru ${idx + 1}`,
          email: `guru${idx + 1}@pkbm.id`,
          password: passwordHash,
          role: "GURU",
        },
      }),
    ),
  );

  const teachers = await Promise.all(
    guruUsers.map((user, idx) =>
      prisma.teacher.create({
        data: {
          userId: user.id,
          nip: `19890${idx + 1}001`,
          subjects: ["Matematika", "Bahasa Indonesia", "IPA"].slice(idx, idx + 1),
          phone: `0812300000${idx}`,
        },
      }),
    ),
  );

  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: "Paket A-1",
        grade: 7,
        year: "2025/2026",
        teacherId: teachers[0].id,
      },
    }),
    prisma.class.create({
      data: {
        name: "Paket B-1",
        grade: 9,
        year: "2025/2026",
        teacherId: teachers[1].id,
      },
    }),
    prisma.class.create({
      data: {
        name: "Paket C-1",
        grade: 12,
        year: "2025/2026",
        teacherId: teachers[2].id,
      },
    }),
  ]);

  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: "Matematika", code: "MAT101", teacherId: teachers[0].id } }),
    prisma.subject.create({ data: { name: "Bahasa Indonesia", code: "BIN101", teacherId: teachers[1].id } }),
    prisma.subject.create({ data: { name: "IPA", code: "IPA101", teacherId: teachers[2].id } }),
  ]);

  const siswaUsers = await Promise.all(
    Array.from({ length: 10 }).map((_, idx) =>
      prisma.user.create({
        data: {
          name: `Siswa ${idx + 1}`,
          email: `siswa${idx + 1}@pkbm.id`,
          password: passwordHash,
          role: "SISWA",
        },
      }),
    ),
  );

  const students = await Promise.all(
    siswaUsers.map((user, idx) => {
      const targetClass = classes[idx % classes.length];
      return prisma.student.create({
        data: {
          userId: user.id,
          nis: `20260${String(idx + 1).padStart(3, "0")}`,
          classId: targetClass.id,
          birthdate: new Date(2008, idx % 12, (idx % 28) + 1),
          address: `Alamat Siswa ${idx + 1}`,
          phone: `081220000${String(idx + 1).padStart(2, "0")}`,
        },
      });
    }),
  );

  await Promise.all(
    students.flatMap((student, idx) => {
      const subject = subjects[idx % subjects.length];
      const classInfo = classes[idx % classes.length];
      return [
        prisma.grade.create({
          data: {
            studentId: student.id,
            subjectId: subject.id,
            semester: 1,
            score: 75 + (idx % 20),
            type: "UH",
          },
        }),
        prisma.attendance.create({
          data: {
            studentId: student.id,
            classId: classInfo.id,
            date: new Date(),
            status: idx % 4 === 0 ? "IZIN" : "HADIR",
          },
        }),
      ];
    }),
  );

  await Promise.all(
    Array.from({ length: 6 }).map((_, idx) =>
      prisma.pPDB.create({
        data: {
          name: `Pendaftar ${idx + 1}`,
          birthdate: new Date(2010, idx % 12, (idx % 28) + 1),
          address: `Jl. Pendaftaran ${idx + 1}`,
          phone: `082110000${String(idx + 1).padStart(2, "0")}`,
          documents: ["ktp.pdf", "ijazah.pdf"],
          status: idx < 2 ? "APPROVED" : "PENDING",
          registrationNumber: `PPDB-2026-${String(idx + 1).padStart(4, "0")}`,
        },
      }),
    ),
  );

  await prisma.news.createMany({
    data: [
      {
        title: "Jadwal Ujian Semester Genap",
        slug: "jadwal-ujian-semester-genap",
        content: "Pelaksanaan ujian semester genap dimulai pekan depan.",
        authorId: admin.id,
      },
      {
        title: "Pembukaan PPDB Tahun Ajaran 2026",
        slug: "pembukaan-ppdb-2026",
        content: "Pendaftaran peserta didik baru telah resmi dibuka.",
        authorId: admin.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
