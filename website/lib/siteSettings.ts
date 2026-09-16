import { sanityClient } from "./sanity";

export type SiteSettings = {
  heroImage?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryLabel?: string;
  heroPrimaryLink?: string;
  heroSecondaryLabel?: string;
  heroSecondaryLink?: string;
  storyImage?: string;
  storyTag?: string;
  storyTitle?: string;
  storyParagraph1?: string;
  storyParagraph2?: string;
  ctaTitle?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]{
    "heroImage": heroImage.asset->url,
    heroEyebrow, heroTitle, heroSubtitle,
    heroPrimaryLabel, heroPrimaryLink,
    heroSecondaryLabel, heroSecondaryLink,
    "storyImage": storyImage.asset->url,
    storyTag, storyTitle, storyParagraph1, storyParagraph2,
    ctaTitle, ctaButtonLabel, ctaButtonLink
  }`);
}
