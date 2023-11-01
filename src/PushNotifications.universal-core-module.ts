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

    this.subject.on('warning', (event: any): void => {
      const { message } = event

      this.logger.publish('WARNING', message, null, 'PN')
    })

    this.subject.on('error', (event: any): void => {
      const { error, payload } = event
      const { capability, notification, token } = payload

      this.logger.publish('ERROR', `Error pushing notification [${capability}]`, null, 'PN', { error, metadata: { notification, token } })
    })

    this.subject.on('push', (event: any): void => {
      const { capability, notification, token } = event.payload

      this.logger.publish('INFO', `Notification pushed [${capability}]`, null, 'PN', { metadata: { notification, token } })
    })

    this.subject.prepare()
  }

  public async release(): Promise<void> {
    this.subject.release()
  }
}
