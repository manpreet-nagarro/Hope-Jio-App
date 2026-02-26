export type UrlModalFormValues = {
  id: number | null;
  sourceWireframe: {
    wireframeId?: string;
    wireframeName?: string;
    slug?: string;
    platform?: string;
    store?: string;
  } | null;
  wireframeName: string;
  wireframeId: string | null;
  slug: string;
  platform: string;
  store: string;
  userCohorts: string[];
  isScheduled: boolean;
  scheduleStart: Date | string | null;
  scheduleEnd: Date | string | null;
};