function quickSort(arr: number[], left: number, right: number) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);

        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
}

function partition(arr: number[], left: number, right: number) {
    const pivot = arr[right];
    let i = left - 1; // current position of pivot

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++; // moving pivot position
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[right]] = [arr[right], arr[i+1]];
    return i + 1;
}

describe("quickSort", () => {
    it("test1", () => {
        const arr = [10, 7, 8, 9, 1, 5];
        quickSort(arr, 0, arr.length - 1)
        expect(arr).toEqual([1, 5, 7, 8, 9, 10]);
    })
    it("test2", () => {
        const arr = [0, 2, -4, 5, 1];
        quickSort(arr, 0, arr.length - 1)
        expect(arr).toEqual([-4, 0, 1, 2, 5]);
    })
    it("test3", () => {
        const arr = [0, 1, 2, 3];
        quickSort(arr, 0, arr.length - 1)
        expect(arr).toEqual([0, 1, 2, 3]);
    })
})