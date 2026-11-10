import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for category migration...");

  const col = mongoose.connection.collection("categories");
  const docs = await col.find({}).toArray();
  console.log(`Found ${docs.length} category documents.`);

  for (const d of docs) {
    const title = d.title || d.name || "Unnamed Category";
    const name = d.name || d.title || "Unnamed Category";
    const image = d.image || d.coverImage || "";
    const status = d.status || (d.isPublished !== false ? "published" : "draft");
    const parentType = d.parentType || d.parentCategory || "Streetwear";

    await col.updateOne(
      { _id: d._id },
      {
        $set: {
          title,
          name,
          image,
          coverImage: d.coverImage || image,
          status,
          parentType,
          parentCategory: d.parentCategory || parentType,
        },
      }
    );
  }

  console.log("Migration complete!");
  const updated = await col.find({}).limit(3).toArray();
  console.log("Sample updated documents:", updated.map(u => ({ id: u._id, title: u.title, name: u.name, status: u.status, slug: u.slug })));

  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});

