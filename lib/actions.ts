"use server";

import { authOptions } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { getServerSession } from "next-auth";
import slugify from "slugify";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await getServerSession(authOptions);
  console.log("Session is",session)
  if (!session) {
    return {
      error: "Not signed in",
      status: "ERROR",
    };
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?._id, // Ensure you're accessing the user ID correctly
      },
      pitch,
    };

    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });

    return {
      ...result,
      error: "",
      status: "SUCCESS",
    };
  } catch (error) {
    console.error("Error creating pitch:", error);

    // Convert error to string for safe JSON response
    return {
      error: JSON.stringify(error),  // Ensure the error is serialized
      status: "ERROR",
    };
  }
};