import { promisifyExec } from './utils'

const setUTF8Encoding = 'chcp 65001'

export const getWifiDetail = async (name) => {
  console.log('🚀 ~ file: wifi.ts:6 ~ getWifiDetail ~ name:', name)
  const command = setUTF8Encoding + '|' + `netsh wlan show profile name=${name} key=clear`
  const { stdout } = await promisifyExec(command, { encoding: 'utf-8' })
  console.log('🚀 ~ file: wifi.ts:8 ~ getWifiDetail ~ command:', command)
  console.log('🚀 ~ file: wifi.ts:8 ~ getWifiDetail ~ stdout:', stdout)
  return stdout
}

export const getWifiNameList = async () => {
  const command = setUTF8Encoding + '|' + 'netsh wlan show profiles'
  const { stdout } = await promisifyExec(command, { encoding: 'utf-8' })
  return stdout
}
