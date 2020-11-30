import { filter,equals, not, compose, prop, replace, toUpper } from 'ramda';

const capitalize = replace(/^./, toUpper)

const identifier = 2

const filteredData = filter(
  compose(not, equals(identifier), prop('id')),
  [{ id: 1 }, { id: 2 }]
);

console.log(filteredData);
