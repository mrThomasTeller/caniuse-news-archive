import * as fs from 'fs';
import es from 'event-stream';
import StatItem from './types/Stat';
import FeatureAvailabilityDates from './types/FeatureAvailabilityDates';
import config from './config.json' assert { type: 'json' };
import StatFeature from './types/StatFeature';

const map: { [featureName: string]: FeatureAvailabilityDates | undefined } = {};

fs.createReadStream('./stats.txt')
  .pipe(es.split())
  .pipe(
    es.mapSync((line: string) => {
      if (!line.trim()) return;

      const statItem: StatItem = JSON.parse(line);
      for (const [name, feature] of Object.entries(statItem.features)) {
        let data = map[name] ?? (map[name] = { dates: [], feature });

        data.dates.push({ date: statItem.date, percent: feature.availability });
      }
    })
  )
  .on('end', () => {
    const news: { date: string; name: string; feature: StatFeature }[] = [];

    for (const [name, feature] of Object.entries(map)) {
      if (feature) {
        feature.dates.reverse();
        const dateItem = feature.dates.find(({ percent }) => percent >= config.minPercent);
        if (dateItem) {
          news.push({
            date: dateItem.date,
            feature: feature.feature,
            name,
          });
        }
      }
    }

    news.sort((a, b) => a.date.localeCompare(b.date));

    const newsText = news.map(
      ({ date, feature, name }) =>
        `${new Date(date).toLocaleDateString('ru-RU')}: ${
          feature.title
        } (https://caniuse.com/${name})`
    );

    fs.writeFileSync('./history.md', `# News\n${newsText.join('\n')}`);
    // fs.writeFileSync('./availability-dates.json', JSON.stringify(map, undefined, 2));
  });
