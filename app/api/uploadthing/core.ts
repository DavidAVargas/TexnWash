import { auth, currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { isAdmin } from "@/lib/is-admin";

const f = createUploadthing();

export const ourFileRouter = {
  jobPhoto: f({
    "image/jpeg": { maxFileSize: "8MB", maxFileCount: 8 },
    "image/png": { maxFileSize: "8MB", maxFileCount: 8 },
    "image/webp": { maxFileSize: "8MB", maxFileCount: 8 },
  })
    .middleware(async () => {
      const { userId } = await auth();
      const user = userId ? await currentUser() : null;
      const email = user?.emailAddresses?.[0]?.emailAddress;

      if (!userId || !isAdmin(email)) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl ?? file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
