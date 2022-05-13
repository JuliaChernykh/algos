// Given an unsorted array of integers which might have duplicates, return the top k integers in non-ascending order.

// topN([1,10,8,9,10,2,3,4,8,8,6], 4)
// [10, 10, 9, 8]

// complexity O(k*n)
// function topN(arr: number[], n: number): number[] {
//     let stack: number[] = [];
//     let stackTmp: number[] = [];
//
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > stack[stack.length - 1] || stack.length < n) {
//             while (stack.length > 0 && arr[i] > stack[stack.length - 1]) {
//                 // @ts-ignore
//                 stackTmp.push(stack.pop());
//             }
//             stack.push(arr[i]);
//             while (stackTmp.length > 0 && stack.length < n) {
//                 // @ts-ignore
//                 stack.push(stackTmp.pop());
//             }
//         }
//     }
//
//     return stack;
// }

// complexity O(nlogn), worst case O(n^2)
function topN(arr: number[], k: number) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = partition(arr, left, right);

        if (mid == k) {
            return arr.slice(0, k);
        }
        else if (k < mid) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }

    return arr.slice(0, k);
}

function partition(arr: number[], left: number, right: number) {
    const pivot = arr[right];
    let i = left - 1; // current position of pivot

    for (let j = left; j < right; j++) {
        if (arr[j] >= pivot) {
            i++; // moving pivot position
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[right]] = [arr[right], arr[i+1]];
    return i + 1;
}

describe("topN", () => {
    it("empty array", () => {
        expect(topN([], 0)).toEqual([]);
    })
    it("empty array with wrong N value", () => {
        expect(topN([], 2)).toEqual([]);
    })
    it("array of ascending numbers", () => {
        expect(topN([1, 2, 3, 4, 5, 6], 4)).toEqual([6, 5, 4, 3]);
    })
    it("array of descending numbers", () => {
        expect(topN([6, 5, 4, 3, 2, 1, 0], 4)).toEqual([6, 5, 4, 3]);
    })
    it("array of not sorted numbers", () => {
        expect(topN([10, 8, 25, 25, 14, 0, 39], 5)).toEqual([39, 25, 25, 14, 10]);
    })
    it("array of equal numbers", () => {
        expect(topN([2, 2, 2, 2, 2], 2)).toEqual([2, 2]);
    })
    it("N more than array length", () => {
        expect(topN([1, 2, 4], 4)).toEqual([4, 2, 1]);
    })
})