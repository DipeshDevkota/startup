import { defineType, defineField } from "sanity";
import { UserIcon } from "lucide-react";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      title: "ID", // Adding a title for better usability in the studio
      type: "number",
    }),
    defineField({
      name: "name",
      title: "Name", // Adding a title for clarity
      type: "string",
    }),
    defineField({
      name: "username",
      title: "Username", // Adding a title for clarity
      type: "string",
    }),
    defineField({
      name:"email",
      type:"string",
    }),
    defineField({
      name:"image",
      type:"url",
    }),

    defineField({
      name:"bio",
      type:"text",
    }),

  ],
  preview: {
    select: {
      title: "name", // The name field will be displayed as the title in previews
    },
  },
});
