/**
 * mockjs 是一个对象，能够拦截请求模仿发送请求的操作,
 * 需要将它导入入口js文件自动执行
 */
import Mock from "mockjs"
import ShopDatas from "./data.json"

// 这里为什么要加 /api  因为在axios 创建时配置对象内写入了一个baseURL = "/api"
// 而mockjs 只会寻找符合对应的地址的url  ->  loclhost//8000/test  而在配置对象能又添加了baseURL
// 并且 还配置了devServer 代理，所以mock没办法拦截到当前请求,所以要添加/api

//Mock.mock("请求的地址",响应的数据)
// Mock.mock("/api/test", 123)

Mock.mock("/api/shopdatas", { code: 0, data: ShopDatas })
