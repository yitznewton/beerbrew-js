import {Greeter} from "./index";

test('greeting by name', () => {
  expect(Greeter('Krusty')).toBe('Hello Krusty!');
});
