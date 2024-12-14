import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required!"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title", // Generate slug from the title field
      },
      validation: (Rule) => Rule.required().error("Slug is required!"),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required().error("Author reference is required!"),
    }),
    defineField({
      name: "views",
      type: "number",
      validation: (Rule) =>
        Rule.min(0).integer().error("Views must be a non-negative whole number!"),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) =>
        Rule.max(500).error("Description should not exceed 500 characters!"),
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1).max(20).required().error("Please enter a category!"),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required().error("Image URL is required!"),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],

});
