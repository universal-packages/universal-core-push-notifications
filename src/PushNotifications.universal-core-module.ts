import { CoreModule } from '@universal-packages/core'
import { PushNotifications, PushNotificationsOptions } from '@universal-packages/push-notifications'

import { LOG_CONFIGURATION } from './LOG_CONFIGURATION'

export default class PishNotificationsModule extends CoreModule<PushNotificationsOptions> {
  public static readonly moduleName = 'push-notifications'
  public static readonly description = 'Push notifications core module wrapper'

  public subject: PushNotifications

  public async prepare(): Promise<void> {
    this.subject = new PushNotifications(this.config)

    this.subject.on('warning', (event: any): void => {
      const { message } = event

      this.logger.log({ level: 'WARNING', message, category: 'PUSH-NOTIFICATIONS' }, LOG_CONFIGURATION)
    })

    this.subject.on('error', (event: any): void => {
      const { error, payload } = event
      const { capability, notification, token } = payload

      this.logger.log(
        {
          level: 'ERROR',
          title: `Error pushing notification [${capability}]`,
          category: 'PUSH-NOTIFICATIONS',
          error,
          metadata: { notification, token }
        },
        LOG_CONFIGURATION
      )
    })

    this.subject.on('push', (event: any): void => {
      const { capability, notification, token } = event.payload

      this.logger.log(
        {
          level: 'INFO',
          title: `Notification pushed [${capability}]`,
          category: 'PUSH-NOTIFICATIONS',
          metadata: { notification, token }
        },
        LOG_CONFIGURATION
      )
    })

    this.subject.prepare()
  }

  public async release(): Promise<void> {
    this.subject.release()
  }
}
