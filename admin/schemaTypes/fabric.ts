import { defineField, defineType } from "sanity";

export default defineType({
  name: "fabric",
  title: "Fabric",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Fabric Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "name", subtitle: "description" } },
});
