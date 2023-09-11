import type { GetWifiPassword } from './wifi'

export interface IElectronAPI {
  getWifiPasswordList: GetWifiPassword
  closeWindow: () => void
  fullscreenWindow: () => void
  minimizeWindow: () => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
