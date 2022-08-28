const a = new Map([[1,2]])
console.log(a)
const b = {
    a: 1,
    b: 2
}
Object.getOwnPropertyNames(b)


enum Sex {
    Man,
    Woman,
    UnKnow,
}
interface Person {
    name: string;
    sex: Sex;
    age: number;
}

type MarketPerson = Person & { phone: string };
type Lucifer = LeetCode;
type LeetCode<T = {}> = {
    name: T;
};

const abc: LeetCode<string> = {name: 'q'};
// console.log(a)
// const a: Lucifer<string>;
export {};
console.log(123123123123123)

const castArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
console.log(castArray(1))
castArray(1); // [1]
castArray([1, 2, 3]); // [1, 2, 3]
console.log(123123)
console.log('merges')
