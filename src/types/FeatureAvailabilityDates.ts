import StatFeature from './StatFeature';

export default interface FeatureAvailabilityDates {
  dates: { date: string; percent: number }[];
  feature: StatFeature;
}
