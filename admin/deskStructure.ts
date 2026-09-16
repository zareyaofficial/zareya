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
        .child(
          S.list()
            .title("Website Banner & Settings")
            .items([
              S.listItem()
                .title("Banner & Page Text")
                .child(
                  S.document().schemaType("siteSettings").documentId("siteSettings")
                ),
              S.divider(),
              S.listItem()
                .title("Best Seller Products")
                .child(
                  S.documentTypeList("product")
                    .title("Best Seller Products")
                    .filter('_type == "product" && badge == "Bestseller"')
                ),
              S.listItem()
                .title("New Arrival Products")
                .child(
                  S.documentTypeList("product")
                    .title("New Arrival Products")
                    .filter('_type == "product" && badge == "New"')
                ),
            ])
        ),
    ]);
