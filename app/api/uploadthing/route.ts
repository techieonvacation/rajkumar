import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createRouteHandler } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  /**
   * Image uploader — used for blog cover images, gallery items,
   * profile/team photos, etc.
   */
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      // TODO: add admin session check when auth is wired up
      // e.g. const session = await auth(); if (!session) throw new UploadThingError("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("[uploadthing] image uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  /**
   * Document uploader — for resumes, case study PDFs, whitepapers, etc.
   */
  documentUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
    "application/msword": {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("[uploadthing] document uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
