// Given an array of integers, move zeros to the end while keeping the order of the rest.
// You should make the in-place change.

// const list = [1, 0, 0, 2, 3]
// moveZeros(list)
// console.log(list) // [1, 2, 3, 0, 0]

function moveZeroes(list: number[]) {
    let count = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i] !== 0) {
            list[count++] = list[i];
        }
    }

    for (let i = count; i < list.length; i++) {
        list[i] = 0;
    }

    return list;
}

// shorter solution
function moveZeroes_2(list: number[]) {
    let count = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i] !== 0) {
            [list[count++], list[i]] = [list[i], list[count]];
        }
    }

    return list;
}

describe("moveZeroes", () => {
    it("empty array", () => {
        expect(moveZeroes([])).toEqual([]);
    })
    it("array of zeroes", () => {
        expect(moveZeroes([0, 0, 0])).toEqual([0, 0, 0]);
    })
    it("test1", () => {
        expect(moveZeroes([0, 0, 1, 2])).toEqual([1, 2, 0, 0]);
    })
    it("test2", () => {
        expect(moveZeroes([1, 2, 0, 0])).toEqual([1, 2, 0, 0]);
    })
    it("test3", () => {
        expect(moveZeroes([1, 0, 0, 2, 3])).toEqual([1, 2, 3, 0, 0]);
    })
    it("test4", () => {
        expect(moveZeroes([1, 0, 2, 3, 0, 4, 0])).toEqual([1, 2, 3, 4, 0, 0, 0]);
    })
})