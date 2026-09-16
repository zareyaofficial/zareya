import { defineField, defineType } from "sanity";

export default defineType({
  name: "size",
  title: "Size",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Size",
      type: "string",
      description: "The size name shown when selecting sizes for a product.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "name", subtitle: "sortOrder" } },
});
