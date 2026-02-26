import { reorder } from '../arrUtils';

describe('reorder', () => {
  it('moves an item from one index to another', () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(reorder(arr, 1, 3)).toEqual(['a', 'c', 'd', 'b']);
    expect(reorder(arr, 0, 2)).toEqual(['b', 'c', 'a', 'd']);
    expect(reorder(arr, 3, 0)).toEqual(['d', 'a', 'b', 'c']);
  });

  it('returns the same array if from and to are the same', () => {
    const arr = [1, 2, 3];
    expect(reorder(arr, 1, 1)).toEqual([1, 2, 3]);
  });

  it('works with empty array', () => {
    expect(reorder([], 0, 0)).toEqual([]);
  });

  it('works with array of objects', () => {
    const arr = [{id: 1}, {id: 2}, {id: 3}];
    expect(reorder(arr, 2, 0)).toEqual([{id: 3}, {id: 1}, {id: 2}]);
  });
});
