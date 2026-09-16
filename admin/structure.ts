import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Zaréya Admin")
    .items([
      S.listItem()
        .title("Products")
        .child(S.documentTypeList("product").title("Products")),
      S.divider(),
      S.listItem()
        .title("Website Banner & Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
