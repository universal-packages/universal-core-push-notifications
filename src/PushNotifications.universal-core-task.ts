import { CoreTask } from '@universal-packages/core'
import { populateTemplates } from '@universal-packages/template-populator'
import path from 'path'

import { LOG_CONFIGURATION } from './LOG_CONFIGURATION'

export default class PushNotificationsTask extends CoreTask {
  public static readonly taskName = 'push-notifications-task'
  public static readonly description = 'Push notifications related tasks'

  public async exec(): Promise<void> {
    switch (this.directive) {
      case 'init':
        await populateTemplates(path.resolve(__dirname, 'template'), './src', { override: this.args.f })
        this.logger.log({ level: 'INFO', title: 'Push notifications template initialized' }, LOG_CONFIGURATION)
        break
      default:
        throw new Error(`Unrecognized directive ${this.directive}`)
    }
  }
}
