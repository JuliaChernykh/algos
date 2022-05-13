// Implement a curry() function, which accepts a function and return a curried one.
// const join = (a, b, c) => {
//     return `${a}_${b}_${c}`
// }
// const curriedJoin = curry(join)
// curriedJoin(1, 2, 3) // '1_2_3'
// curriedJoin(1)(2, 3) // '1_2_3'
// curriedJoin(1, 2)(3) // '1_2_3'

function curry(fn: (a: number, b: number, c: number) => string) {
    return function curried(this: any, ...args: any) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(this: any, ...args2: any) {
            return curried.apply(this, args.concat(args2));
        }
    }
}

function curry2(fn: (a: number, b: number, c: number) => string) {
    return function curried(this: any, ...args: any) {
        const isValidArgs = args.length >= fn.length && !args.slice(0, fn.length).includes(curry2.placeholder);
        if (isValidArgs) {
            return fn.apply(this, args);
        }
        return function(this: any, ...args2: any) {
            const newArgs = args.map((arg: any) => arg === curry2.placeholder && args2.length ? args2.shift() : arg);
            return curried.apply(this, newArgs.concat(args2));
        }
    }
}

curry2.placeholder = Symbol();

describe("curry", () => {
    const join = (a: number, b: number, c: number) => {
        return `${a}_${b}_${c}`
    }
    const curriedJoin = curry(join);
    it("test1", () => {
        expect(curriedJoin(1, 2, 3)).toEqual('1_2_3');
    })
    it("test2", () => {
        // @ts-ignore
        expect(curriedJoin(1)(2, 3)).toEqual('1_2_3');
    })
    it("test3", () => {
        // @ts-ignore
        expect(curriedJoin(1, 2)(3)).toEqual('1_2_3');
    })
    it("test4", () => {
        // @ts-ignore
        expect(curriedJoin(1)(2)(3)).toEqual('1_2_3');
    })
})

describe("curry2", () => {
    const join = (a: number, b: number, c: number) => {
        return `${a}_${b}_${c}`
    }
    const curriedJoin = curry2(join);
    const _ = curry2.placeholder;
    it("test1", () => {
        expect(curriedJoin(1, 2, 3)).toEqual('1_2_3');
    })
    it("test2", () => {
        // @ts-ignore
        expect(curriedJoin(_, 2)(1, 3)).toEqual('1_2_3');
    })
    it("test3", () => {
        // @ts-ignore
        expect(curriedJoin(_, _, _)(1)(_, 3)(2)).toEqual('1_2_3');
    })
})