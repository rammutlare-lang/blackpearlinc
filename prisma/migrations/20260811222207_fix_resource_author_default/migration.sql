-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "fileUrl" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Black Pearl Inc. Team',
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Resource" ("author", "body", "category", "downloadCount", "fileUrl", "id", "isPremium", "publishedAt", "slug", "summary", "title") SELECT "author", "body", "category", "downloadCount", "fileUrl", "id", "isPremium", "publishedAt", "slug", "summary", "title" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE UNIQUE INDEX "Resource_slug_key" ON "Resource"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
