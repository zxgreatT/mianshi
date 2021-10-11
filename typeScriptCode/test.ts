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
