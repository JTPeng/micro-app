<template>
  <el-container class="main-container">
    <el-aside class="sidebar" :class="{ isCollapse: isCollapse }">
      <el-scrollbar>
        <LeftSidebar
          :activeIndex="activeIndex"
          :leftMenuList="leftMenuList"
          :isCollapse="isCollapse"
          @menuOpened="menuOpened"
          @activeMenu="activeMenu"
        ></LeftSidebar>
      </el-scrollbar>
    </el-aside>
    <el-container class="content">
      <el-header>
        <div class="content-collapse">
          <el-icon @click="toggleSidebar">
            <expand v-if="isCollapse" />
            <fold v-else />
          </el-icon>
        </div>
        <TabsMenu
          :tabMenuLists="tabMenuLists"
          @tabToggleMenu="tabToggleMenu"
          @removeTabMenu="removeTabMenu"
        ></TabsMenu>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      <el-main>
        <el-card>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros'
import { useRouter } from 'vue-router'
import TabsMenu from 'layout/tabsMenu.vue'
import LeftSidebar from 'layout/leftSidebar.vue'
import { menuListType, menuArrType } from './types/index'
import { getSessionStorage, setSessionStorage } from './utils/storage'
import { Setting, Expand, Fold } from '@element-plus/icons-vue'
import microApp from '@micro-zoe/micro-app'

const router = useRouter()
let activeIndex = $ref<string>('/')
let isCollapse = $ref<boolean>(false)
const leftMenuList = $ref<menuArrType[]>([
  {
    name: '??????',
    path: '/'
  },
  {
    name: '????????????',
    key: 'studentManager',
    path: '',
    children: [
      {
        name: '????????????',
        path: '/studentList',
        url: ''
      },
      {
        name: '????????????',
        path: '/otherList',
        url: ''
      },
      {
        name: '????????????',
        path: '/time',
        url: ''
      }
    ]
  },
  {
    name: '????????????',
    key: 'financeManager',
    path: '',
    children: [
      {
        name: '????????????',
        path: '/dataExport',
        url: ''
      },
      {
        name: '????????????',
        path: '/approve',
        url: ''
      },
      {
        name: '????????????',
        path: '/returnMoney',
        url: ''
      }
    ]
  }
])
console.info('leftMenuList', leftMenuList)
let tabMenuLists = $ref<menuListType>({
  activeMenu: '/',
  menuArr: [
    {
      path: '/',
      name: '??????'
    }
  ]
})
// ??????????????????????????????????????????????????????

window.addEventListener('popstate', () => getActiveIndex())
// ??????????????? ??????????????????
const flatMenuList: menuArrType[] = []
function changeMenuList(arr: menuArrType[], key = '') {
  const list: menuArrType[] = arr
  list.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      changeMenuList(menu.children, menu.key)
    }
    !menu.children && flatMenuList.push({ ...menu, key })
  })
  console.info('flatMenuList', flatMenuList)
}
changeMenuList(leftMenuList)
// ???????????????tab????????????
function getStorageMenuList() {
  const res: string = getSessionStorage('menuList') || ''
  console.info('getStorageMenuList', res)
  res && (tabMenuLists = JSON.parse(res))
  getActiveIndex()
}

// ??????url????????????????????????
function getActiveIndex() {
  // location.pathname??????????????????/main-angular11/app-vue2/page2???????????????`/app-vue2/page2`
  const pathArr = location.pathname.match(/\/app-.+/)
  activeIndex = pathArr ? pathArr[0].replace(/\/$/, '') : '/'

  let hash = ''
  if (location.hash) {
    hash = location.hash.split('?')[0]
  }
  // ?????? child-vite ??? child-react17 ???????????????????????????hash??????
  if ((activeIndex === '/app-vite' || activeIndex === '/app-react17') && hash.includes('page2')) {
    activeIndex += hash.replace(/^#/, '')
  }

  // ???????????????????????????/app-vue2/ ????????? /app-vue2
  if (activeIndex !== '/') {
    activeIndex = activeIndex.replace(/\/$/, '')
  }

  return activeIndex
}

getStorageMenuList()

// ?????????????????????????????????????????????
function activeMenu(path: string) {
  console.info('activeMenu', path)
  const { menuArr } = tabMenuLists
  const target = menuArr.find((item) => item.path === path)
  // ???????????????
  if (!target) {
    const currentMenu: any = flatMenuList.find((item) => item.path === path)
    const list: menuArrType[] = [...tabMenuLists.menuArr, currentMenu]
    modifyMenuList(path, list)
  } else {
    // tab????????????
    modifyMenuList(path, [])
  }
  // ????????????
  router.push(path)
  microApp.setData('vue2', { path: '/other' })
}

/**
 * ????????????
 * @param key ???????????????index
 * @param keyPath ???????????????index??????
 */
const menuOpened = (key: string) => {
  const target = leftMenuList.find((item) => item.key === key)
  let name: string = key
  if (target) {
    const { children } = target
    name = (children as Array<menuArrType>)[0].path
  }
  activeMenu(name)
  console.log('menuOpened', name)
}

const modifyMenuList = (path: string, list: menuArrType[]) => {
  tabMenuLists.activeMenu = path
  activeIndex = path
  list.length > 0 && (tabMenuLists.menuArr = [...list])
  storageTabList()
}

const storageTabList = () => {
  setSessionStorage('menuList', JSON.stringify(tabMenuLists))
}

const toggleSidebar = () => {
  isCollapse = !isCollapse
}

/**
 * tab????????????
 * @param path route??????
 */
const tabToggleMenu = (path: string) => {
  modifyMenuList(path, [])
  router.push(path)
}

const removeTabMenu = (path: string) => {
  let routerPath = ''
  const menuArr = tabMenuLists.menuArr
  const list = menuArr.filter((item, index) => {
    if (item.path === path) {
      const targetIndex = index !== menuArr.length - 1 ? index + 1 : index - 1
      routerPath = menuArr[targetIndex].path
    }
    return item.path !== path
  })
  console.info('removeTabMenu', path, routerPath)
  modifyMenuList(routerPath, list)
  router.push(routerPath)
}
</script>

<style lang="postcss" scoped>
.main-container {
  display: flex;
  & .sidebar {
    width: 200px;
    &.isCollapse {
      width: 60px;
    }
  }
  & .content {
    & .el-header {
      display: flex;
      align-items: center;
      height: auto;
      padding: 10px 20px 0px;
      & .content-collapse {
        vertical-align: middle;
        & > .el-icon {
          font-size: 24px;
        }
      }
    }
    & .el-main {
      background: #eee;
      & > .el-card {
        height: calc(100vh - 104px);
        & >>> .el-card__body {
          padding: 0;
          height: 100%;
        }
      }
    }
  }
}
</style>
