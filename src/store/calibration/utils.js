
export function createDataPoints (samples) {
  let analytes = [], signals = [];

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

export function generalInfo (samples) {
  const concentrationLevels = samples.length;

  let replicates = 0, dataPoints = 0;
  for (let row = 0; row < samples.length; row++) {
    let nonNaNSignals = samples[row].reduce((count, value) => {
      if (value !== NaN) count++;
      return count;
    }) - 1;
    replicates = Math.max(replicates, nonNaNSignals);
    dataPoints += nonNaNSignals;
  }

  return [concentrationLevels, replicates, dataPoints];
}

export function truncateDecimals (x, digits) {
  let s = x.toString();

  let decimalIndex = s.indexOf('.');
  let substrLength = (decimalIndex == -1 ? s.length : 1 ) + decimalIndex + digits;

  let trimmed = s.substr(0, substrLength);
  let res = isNaN(trimmed) ? 0 : trimmed;

  return parseFloat(res);
}
