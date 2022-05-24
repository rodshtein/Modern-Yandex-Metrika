import {optionsNormalize} from '../helpers';

test('send one metrika id. Return normalize object', () => {
  expect(optionsNormalize([1])).toEqual({
    counters: {
      1: {
        id: 1
      }
    }
  });
});

test('send two metrika id. Return normalize object', () => {
  expect(optionsNormalize([1, 2])).toEqual({
    counters: {
      1: {id: 1},
      2: {id: 2}
    }
  });
});

test('send two metrika id, one of this with additional options. Return normalize object', () => {
  expect(
    optionsNormalize([
      1,
      {
        name: 'dev',
        id: 2,
        webvisor: true
      }
    ])
  ).toEqual({
    counters: {
      1: {id: 1},
      dev: {id: 2, webvisor: true}
    }
  });
});

test('send init options, two metrika id, one of this with additional options. Return normalize object', () => {
  expect(
    optionsNormalize([
      {
        dev: true,
        delay: 3000,
        counters: [
          1,
          {
            name: 'dev',
            id: 2,
            webvisor: true
          }
        ]
      }
    ])
  ).toEqual({
    dev: true,
    delay: 3000,
    counters: {
      1: {id: 1},
      dev: {id: 2, webvisor: true}
    }
  });
});
