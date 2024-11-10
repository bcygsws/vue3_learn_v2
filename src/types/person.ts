/*
 * @Description:
 * @Author: bcygsws@163.com
 * @Date: 2023-01-20 13:52:50
 * @LastEditTime: 2023-05-05 20:27:36
 * @FilePath: \vue_shop_serverd:\Web-project\vue3_learn\src\types\person.ts
 */
// 任意名字的可选属性[propName:string]:string
// 或者固定名字的 可选属性;如：gender?:string
// gender?: string;
export default interface IObj {
  name: string;
  age?: number;
  // [propName: string]: string;
  gender?: string;
  wife: {
    name: string;
    age: number;
    cars: string[];
  };
}
