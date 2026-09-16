import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal Title", type: "string", initialValue: "Zaréya Website" }),
    defineField({ name: "heroImage", title: "Homepage Banner Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroEyebrow", title: "Banner Eyebrow", type: "string", initialValue: "PAKISTANI COUTURE & KURTIS" }),
    defineField({ name: "heroTitle", title: "Banner Heading", type: "string", initialValue: "The art of Pakistani elegance, made to be worn." }),
    defineField({ name: "heroSubtitle", title: "Banner Description", type: "text", rows: 3 }),
    defineField({ name: "heroPrimaryLabel", title: "Primary Button Label", type: "string", initialValue: "Shop the Collection" }),
    defineField({ name: "heroPrimaryLink", title: "Primary Button Link", type: "string", initialValue: "/shop" }),
    defineField({ name: "heroSecondaryLabel", title: "Secondary Button Label", type: "string", initialValue: "View Best Sellers" }),
    defineField({ name: "heroSecondaryLink", title: "Secondary Button Link", type: "string", initialValue: "/#bestsellers" }),
    defineField({
      name: "storyImage",
      title: "Our Story — Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyTag",
      title: "Our Story — Small Label",
      type: "string",
      initialValue: "OUR STORY",
    }),
    defineField({
      name: "storyTitle",
      title: "Our Story — Heading",
      type: "string",
      initialValue: "Tradition meets timeless elegance.",
    }),
    defineField({
      name: "storyParagraph1",
      title: "Our Story — Paragraph 1",
      type: "text",
      rows: 4,
      initialValue:
        "Zaréya was born from a simple belief — that Pakistani craftsmanship deserves a home outside the wedding season and the gallery shelf. Every piece we carry is chosen for its handwork, its fabric, and the way it moves.",
    }),
    defineField({
      name: "storyParagraph2",
      title: "Our Story — Paragraph 2",
      type: "text",
      rows: 4,
      initialValue:
        "From heavy chikankari cottons to fine embellished nets, our edit spans everyday pret to occasion couture — sourced from Pakistan's ateliers, styled for wardrobes in India and the UAE.",
    }),
    defineField({ name: "ctaTitle", title: "Bottom Banner Heading", type: "text", rows: 2, initialValue: "Found something you love? Add it to your cart and check out in one message on WhatsApp — no forms, no waiting." }),
    defineField({ name: "ctaButtonLabel", title: "Bottom Banner Button", type: "string", initialValue: "Start Shopping" }),
    defineField({ name: "ctaButtonLink", title: "Bottom Banner Link", type: "string", initialValue: "/shop" }),
  ],
  preview: { select: { title: "title", media: "heroImage" } },
});
