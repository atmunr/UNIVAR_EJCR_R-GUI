
export function getReplicateSets (state) {

  let replicateSets : Number[][] = [];

  for (let row = 0; row < state.samples.length; row++) {
    replicateSets.push([]);
    for (let col = 1; col < state.samples[row].length; col++) {
      replicateSets[row].push(state.samples[row][col]);
    }
  }

  return replicateSets;
}
