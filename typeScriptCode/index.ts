// 模式匹配做提取

const test = (a: string, b: string): string => {
  return  a + b
}


type ttt = Promise<number>

type GetPromise<P> = P extends Promise<infer Value> ? Value : never

type A  = {
  test1: typeof test
  test2: GetPromise<ttt>
}