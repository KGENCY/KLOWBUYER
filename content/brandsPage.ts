/** Copy for /brands. The brands themselves come from content/brands.ts. */
import type { LocalizedText } from "@/types/content";

const L = (en: string): LocalizedText => ({ en });

export const brandsPage = {
  seo: {
    title: L("Korean Beauty Brands for Wholesale | Popular K-Beauty & New Brands – KLOW"),
    description: L("Browse popular K-beauty brands and under-the-radar Korean labels available wholesale. Sample partner brands from 1 unit, ship from Korea."),
  },
  hero: {
    label: L("Brands"),
    title: L("Korean brands, ready to sample."),
    subtitle: L("From bestsellers to brands nobody else carries."),
    facts: { brands: L("Brands"), onlyOnKlow: L("Only on KLOW"), sampleFrom: L("Sample from"), sampleValue: L("1 unit · partner brands") },
  },
  tabs: { all: L("All"), popular: L("Popular K-beauty"), new: L("Discover new brands") },
  filters: {
    category: L("Category"),
    ingredient: L("Key ingredient"),
    search: L("Search brands"),
    clear: L("Clear filters"),
    open: L("Filters"),
    show: L("Show {n} brands"),
    showOne: L("Show 1 brand"),
  },
  discover: {
    title: L("Only on KLOW"),
    body: L("Korean brands you won’t find on other wholesale sites — with exclusive territories still open."),
  },
  card: { sampleFrom: L("Sample from"), view: L("View brand →"), wholesale: L("Wholesale prices →"), products: L("{n} products") },
  gridSignup: L("Sign in to see bulk pricing for every brand."),
  empty: {
    title: L("No brands match."),
    request: L("Request a brand →"),
    formTitle: L("Tell us what you’re looking for"),
    formLede: L("We’ll source it or suggest a match."),
  },
  bottom: { text: L("Looking for a specific brand? We’ll source it."), request: L("Request a brand"), ask: L("Ask our team") },
};

/** Category chips in this order when present in the data; anything else follows. */
export const CATEGORY_ORDER = ["Skincare", "Sun Care", "Makeup", "Cleansing", "Body"];
