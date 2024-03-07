
function importAllSvgIcons() {
  try {
    const request: __WebpackModuleApi.RequireContext = require.context(
      '../../assets/svg',
      false,
      /\.svg$/
    )
    request.keys().forEach((key) => request(key))
  } catch (err) {
    console.error(err)
  }
}
export async function preLoader() {
  importAllSvgIcons()
}
