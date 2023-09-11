export interface WifiPassword {
  name: string
  password?: string
}

export interface GetWifiPassword {
  (): Promise<WifiPassword[] | undefined>
}
