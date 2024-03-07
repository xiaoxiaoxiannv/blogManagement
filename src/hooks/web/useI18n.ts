export function useI18n() {
  return {
    t: (key: string) => key
  }
}

// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key