export type NEWS_MULTIMEDIA_ITEM = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};

export type RESULT = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: Array<string>;
  org_facet: Array<string>;
  per_facet: Array<string>;
  geo_facet: Array<string>;
  multimedia: Array<NEWS_MULTIMEDIA_ITEM>;
  short_url: string;
};

export type NEWS_RESPONSE = {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: Array<RESULT>;
};
