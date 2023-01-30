interface menuArrType {
  name: string // 菜单名
  path: string // 需要渲染的路由
  key?: string //
  url?: string // 路由容器内渲染的子应用地址
  children?: menuArrType[]
}
interface menuListType {
  activeMenu: string
  menuArr: menuArrType[]
}
export { menuListType, menuArrType }
