import Qty from 'js-quantities';

const Mash = {
  strikeWaterVolume:
    (
      {
       grainMass,
       initialMashThickness
      }: {
        grainMass: Qty,
        initialMashThickness: MashThickness
      }
    ): Qty => (
      grainMass.mul(initialMashThickness.volume.div(initialMashThickness.mass))
    )
};

class MashThickness {
  constructor(readonly volume: Qty, readonly mass: Qty) {}
}

test('strike water volume', () => {
  const grainMass = Qty('10 lbs');
  const initialMashThickness = new MashThickness(Qty('1.25 quarts'), Qty('1 lb'));
  expect(Mash.strikeWaterVolume({grainMass, initialMashThickness}).eq(Qty('12.5 quarts'))).toEqual(true);
});

describe('strike water temperature', () => {
  xit('', () => {
    // const capacity = quantity('8 gal');
    // const material = {specificHeat: 9};
    // const grain = {specificHeat: 9};
    // const grainMass = quantity('5 kg');
    // const initialGrainTemp = quantity('60 tempF');
    // const initialVesselTemp = quantity('55 tempF');
    // const targetRestTemp = quantity('150 tempF');
    // const vessel = new Vessel({capacity, material});
    // const initialMashThickness = new MashThickness(quantity('1.25 quarts'), quantity('1 lb'));
    // const mash = new Mash({initialMashThickness, vessel, targetRestTemp, grain, grainMass, initialGrainTemp, initialVesselTemp});
    // expect(mash.strikeWaterTemp()).toBe(quantity('32 tempC'));
  });
});
