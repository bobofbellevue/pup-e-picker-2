import { z } from "zod";

const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export const TabValues = {
  NONE: "NONE",
  FAVORITE: "FAVORITE",
  UNFAVORITE: "UNFAVORITE",
  CREATE_DOG: "CREATE_DOG",
} as const;

export type TAB = (typeof TabValues)[keyof typeof TabValues];
