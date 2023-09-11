import { promisifyExec } from './utils'

import { GetWifiPassword } from '../src/types/wifi'
const setUTF8Encoding = 'chcp 65001'

const getWifiNameList = async () => {
  try {
    const command = setUTF8Encoding + '|' + 'netsh wlan show profiles'
    const { stdout } = await promisifyExec(command, { encoding: 'utf-8' })
    return stdout
  } catch (error) {
    console.log(error)
    throw error
  }
}

const parseWifiNameList = (stdout: string) => {
  const res = stdout
    .split('\n') // 将字符串按行分割为数组
    .map((line) => line.trim()) // 去除每行的首尾空格
    .filter((line) => line.startsWith('All User Profile')) // 仅保留以 "All User Profile" 开头的行
    .map((line) => line.split(':')[1].trim()) // 提取冒号后面的部分，并去除首尾空格
  return res
}

const getWifiDetail = async (name: string) => {
  try {
    const command = setUTF8Encoding + '|' + `netsh wlan show profile name=${name} key=clear`
    const { stdout } = await promisifyExec(command, { encoding: 'utf-8' })
    return stdout
  } catch (error) {
    console.log(error)
    throw error
  }
}

interface WifiDetail {
  profile?: {
    [key: string]: string
  }
  connectivity?: { [key: string]: string }
  security?: { [key: string]: string }
  cost?: { [key: string]: string }
}

const parseWifiDetail = (stdout: string) => {
  const wifiDetail: WifiDetail = {}

  const lines = stdout.trim().split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line === 'Profile information') {
      wifiDetail.profile = {}
    } else if (line === 'Connectivity settings') {
      wifiDetail.connectivity = {}
    } else if (line === 'Security settings') {
      wifiDetail.security = {}
    } else if (line === 'Cost settings') {
      wifiDetail.cost = {}
    } else {
      const [key, value] = line.split(':').map((item) => item.trim())

      if (wifiDetail.cost) {
        wifiDetail.cost[key] = value
      } else if (wifiDetail.security) {
        wifiDetail.security[key] = value
      } else if (wifiDetail.connectivity) {
        wifiDetail.connectivity[key] = value
      } else if (wifiDetail.profile) {
        wifiDetail.profile[key] = value
      }
    }
  }
  return wifiDetail
}

export const getWifiPasswordList: GetWifiPassword = async () => {
  try {
    const rawName = await getWifiNameList()
    const parsedWifiNameList = parseWifiNameList(rawName)

    const taskList = parsedWifiNameList.map((name) => getWifiDetail(name))
    const rawDetail = await Promise.all(taskList)
    const parsedWifiDetailList = rawDetail.map((detail) => parseWifiDetail(detail))

    const wifiPasswordList = parsedWifiNameList.map((name, index) => {
      const relatedDetail = parsedWifiDetailList[index]
      return {
        name,
        password: relatedDetail.security ? relatedDetail.security['Key Content'] : undefined
      }
    })
    return wifiPasswordList
  } catch (error) {
    console.log(error)
  }
}
