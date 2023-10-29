import { CoreModule } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'
import { PushNotifications, PushNotificationsOptions } from '@universal-packages/push-notifications'

export default class PishNotificationsModule extends CoreModule<PushNotificationsOptions> {
  public static readonly moduleName = 'push-notifications-module'
  public static readonly description = 'Push notifications core module wrapper'

  public subject: PushNotifications

  public async prepare(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['PN'] = 'PURPLE'

    this.subject = new PushNotifications(this.config)

    this.subject.on('warning', (message: string): void => {
      this.logger.publish('WARNING', message, null, 'PN')
    })

    this.subject.on('error', (message: string): void => {
      this.logger.publish('ERROR', message, null, 'PN')
    })

    this.subject.prepare()
  }

  public async release(): Promise<void> {
    this.subject.release()
  }
}
