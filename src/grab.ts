import * as fs from 'fs';
import { simpleGit } from 'simple-git';
import Feature from './types/Feature';
import StatItem from './types/Stat';
import * as jsonc from 'jsonc-parser';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function main(): Promise<void> {
  fs.writeFileSync('./stats.txt', '');

  let git = simpleGit('./');

  if (!fs.existsSync('./caniuse')) {
    await git.clone('https://github.com/Fyrd/caniuse');
  }

  git = simpleGit('./caniuse');
  await git.checkout('main');
  await git.pull();

  const logData = await git.log();
  let i = 0;

  for (const logItem of logData.all) {
    await git.checkout(logItem.hash);

    const statItem: StatItem = {
      date: logItem.date,
      features: {},
    };

    if (fs.existsSync('./caniuse/features-json')) {
      const features = fs.readdirSync('./caniuse/features-json');

      for (const feature of features) {
        const featureData: Feature = jsonc.parse(
          fs.readFileSync(`./caniuse/features-json/${feature}`, 'utf-8')
          // const featureData: Feature = JSON.parse(
          //   fs.readFileSync(`./caniuse/features-json/${feature}`, 'utf-8')
        );

        statItem.features[feature.split('.')[0]] = {
          title: featureData.title,
          parent: featureData.parent,
          description: featureData.description,
          status: featureData.status,
          availability: featureData.usage_perc_y + featureData.usage_perc_a,
        };
      }

      fs.appendFileSync('./stats.txt', JSON.stringify(statItem) + '\n');
    }

    i += 1;
    console.log(`${i} / ${logData.all.length}`);
  }
}

void main();
