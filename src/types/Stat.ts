import StatFeature from './StatFeature';

export default interface StatItem {
  date: string;
  features: { [name: string]: StatFeature };
}
