import { loadMicroApp, registerMicroApps } from 'qiankun'

// 配置qiankun 使用必须先启动子应用
export function registerMicro() {
  registerMicroApps(
    [
      {
        name: 'sub-react',
        entry: 'http://localhost:7788/',
        container: '#sub-react',
        activeRule: '/material/addform'
      }
    ],
    {
      beforeLoad: (app) => {
        console.log('before load app.name====>>>>>', app.name)
        return Promise.resolve()
      },
      beforeMount: [
        (app) => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
          return Promise.resolve()
        }
      ],
      afterMount: [
        (app) => {
          console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
          return Promise.resolve()
        }
      ],
      afterUnmount: [
        (app) => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
          return Promise.resolve()
        }
      ]
    }
  )
  // start()
}

// 加载微应用
export function loadMicro() {
  return loadMicroApp({
    name: 'sub-react',
    entry: '//192.168.3.36:7788/',
    container: '#sub-react'
  })
}
