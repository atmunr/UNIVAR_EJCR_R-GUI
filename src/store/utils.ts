
export function createDataPoints (samples : Number[][]) {

  let analytes : Number[] = [], signals : Number[] = [];

  for (let row = 0; row < samples.length; row++) {
    for (let col = 1; col < samples[row].length; col++) {
      analytes.push(samples[row][0]);
      signals.push(samples[row][col]);
    }
  }

  return [analytes, signals];
}

export function generalInfo (samples: Number[][]) {
  const concentrationLevels = samples.length;

  let replicates = 0, dataPoints = 0;
  for (let row = 0; row < samples.length; row++) {
    replicates = Math.max(replicates, samples[row].length - 1);
    dataPoints += (samples[row].length - 1);
  }

  return [concentrationLevels, replicates, dataPoints];
}

export function truncateDecimals (x : Number, digits : Number) {
  let s = x.toString();

  let decimalIndex = s.indexOf('.');
  let substrLength = (decimalIndex == -1 ? s.length : 1 ) + decimalIndex + digits;

  let trimmed = s.substr(0, substrLength);
  let res = isNaN(trimmed) ? 0 : trimmed;

  return parseFloat(res);
}
