export interface IElectronAPI {
  getWifiNameList: () => Promise<string>
  getWifiDetail: (name: string) => Promise<string>
  closeWindow: () => void
  fullscreenWindow: () => void
  minimizeWindow: () => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
