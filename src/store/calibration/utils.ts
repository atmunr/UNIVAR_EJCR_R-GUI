
export function createDataPoints (samples: number[][]) {
  let analytes: number[] = [], signals: number[] = [];

  for (let row = 0; row < samples.length; row++) {
    for (let col = 1; col < samples[row].length; col++) {
      if (isNaN(samples[row][col])) continue;
      else {
        analytes.push(samples[row][0]);
        signals.push(samples[row][col]);
      }
    }
  }

  return [analytes, signals];
}

export function generalInfo (samples: number[][]) {
  const concentrationLevels = samples.length;

  let replicates: number = 0, dataPoints: number = 0;
  for (let row = 0; row < samples.length; row++) {
    let nonNaNSignals: number = samples[row].reduce((acc, cur) => {
      return acc + (!isNaN(cur) ? 1 : 0);
    }, 0) - 1;
    replicates = Math.max(replicates, nonNaNSignals);
    dataPoints += nonNaNSignals;
  }

  return [concentrationLevels, replicates, dataPoints];
}

export function truncateDecimals (x: number, digits: number) {
  let s: string = x.toString();

  let decimalIndex: number = s.indexOf('.');
  let substrLength: number = (decimalIndex == -1 ? s.length : 1 ) + decimalIndex + digits;

  let trimmed: string = s.substr(0, substrLength);
  let res: string = isNaN(<number><any>trimmed) ? '0' : trimmed;

  return parseFloat(res);
}
