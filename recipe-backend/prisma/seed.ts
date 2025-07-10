import prisma from "../src/config/database";
import { categoriesData } from "./data/categoriesData";



//$ npx ts-node prisma/seed.ts
async function main() {
console.log("🌱 Seeding categories...");
  await prisma.category.createMany({
    data: categoriesData,
    skipDuplicates: true,
  });
  console.log("✅ Categories seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding categories:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });