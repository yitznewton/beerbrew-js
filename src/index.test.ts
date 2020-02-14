import Qty from 'js-quantities';

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualQty: (expected: Qty) => CustomMatcherResult;
    }
  }
}

expect.extend({
  toEqualQty(actual: Qty, expected: Qty) {
    if (actual.eq(expected)) {
      return {
        message: () => `${actual.toString()} should not equal ${expected.toString()}`,
        pass: true
      }
    } else {
      return {
        message: () => `${actual.toString()} should equal ${expected.toString()}`,
        pass: false
      }
    }
  }
});

const GRAIN_DISPLACEMENT = Qty('0.32 quarts').div(Qty('1 pound'));

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
    ),
  mashVolume:
    (
      args: {
        grainMass: Qty,
        initialMashThickness: MashThickness
      }
    ): Qty => (
      args.grainMass.mul(GRAIN_DISPLACEMENT).add(Mash.strikeWaterVolume(args))
    )
};

class MashThickness {
  constructor(readonly volume: Qty, readonly mass: Qty) {}
}

describe('mash', () => {
  test('strike water volume', () => {
    const grainMass = Qty('10 lbs');
    const initialMashThickness = new MashThickness(Qty('1.25 quarts'), Qty('1 lb'));

    const actual = Mash.strikeWaterVolume({grainMass, initialMashThickness});
    const expected = Qty('12.5 quarts');
    expect(actual).toEqualQty(expected);
  });

  test('mash volume', () => {
    const grainMass = Qty('10 lbs');
    const initialMashThickness = new MashThickness(Qty('1.25 quarts'), Qty('1 lb'));

    const actual = Mash.mashVolume({grainMass, initialMashThickness});
    const expected = Qty('15.7 quarts');
    expect(actual).toEqualQty(expected);
  });
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
