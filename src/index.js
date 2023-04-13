import { readFileSync } from 'fs';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const dataParsed1 = JSON.parse(data1);
  const dataParsed2 = JSON.parse(data2);
  const sortedKeys = Object.keys({ ...dataParsed1, ...dataParsed2 }).sort();

  const filteredData = sortedKeys.reduce((acc, key) => {
    if (dataParsed1[key] === dataParsed2[key]) {
      acc[`  ${key}`] = dataParsed1[key];
      return acc;
    }
    if (Object.hasOwn(dataParsed1, key) && !Object.hasOwn(dataParsed2, key)) {
      acc[`- ${key}`] = dataParsed1[key];
      return acc;
    }
    if (Object.hasOwn(dataParsed2, key) && !Object.hasOwn(dataParsed1, key)) {
      acc[`+ ${key}`] = dataParsed2[key];
      return acc;
    }
    acc[`- ${key}`] = dataParsed1[key];
    acc[`+ ${key}`] = dataParsed2[key];
    return acc;
  }, {});

  return JSON.stringify(filteredData);
};

export default genDiff;

//   if (dataParsed1[key] === dataParsed2[key]) {
//     acc.push(`  ${key}: ${dataParsed1[key]}`);
//     return acc;
//   }
//   if (dataParsed1.hasOwnProperty(key) && !dataParsed2.hasOwnProperty(key)) {
//     acc.push(`- ${key}: ${dataParsed1[key]}`);
//     return acc;
//   }
//   if (dataParsed2.hasOwnProperty(key) && !dataParsed1.hasOwnProperty(key)) {
//     acc.push(`+ ${key}: ${dataParsed2[key]}`);
//     return acc;
//   }
//   acc.push(`- ${key}: ${dataParsed1[key]}`);
//   acc.push(`+ ${key}: ${dataParsed2[key]}`);
//   return acc;
// }, {});
// return filteredData;
