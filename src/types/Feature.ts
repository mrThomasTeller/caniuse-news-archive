export default interface Feature {
  title: string;
  description: string;
  spec: string;
  status: string;
  links: { url: string; title: string }[];
  categories: string[];
  usage_perc_y: number;
  usage_perc_a: number;
  ucprefix: boolean;
  parent: string;
  keywords: string;
  shown: boolean;
}
