// 模式匹配做提取

const test = (a: string, b: string): string => {
  return a + b
}


type ttt = Promise<number>

type GetPromise<P> = P extends Promise<infer Value> ? Value : never


type PushArr<Arr extends unknown[], Ele> = [...Arr, Ele];

type PushResult = PushArr<[1, 2, 3], '1'>

type A = {
  test1: typeof test
  test2: GetPromise<ttt>
  test3: PushResult
}

enum IHttpMethods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

const methods = ["get", "post", "delete", "put"];

interface IHttpFn {
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

type IHttp = Record<IHttpMethods, IHttpFn>;

const httpMethods: IHttp = methods.reduce((map: any, method: string) => {
  map[method] = (url: string, options: AxiosRequestConfig = {}) => {
    const { data, ...config } = options;
    return (axios as any)[method](url, data, config)
    .then((res: AxiosResponse) => {
      if (res.data.errCode) {
        //todo somethins
      } else {
        //todo somethins
      }
    });
  }
  return map
}, {})
console.log(3123)
