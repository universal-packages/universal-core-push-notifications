import { Logger } from '@universal-packages/logger'
import { populateTemplates } from '@universal-packages/template-populator'

import RedisTask from '../src/PushNotifications.universal-core-task'

jest.mock('@universal-packages/template-populator')

describe('PushNotificationsTask', (): void => {
  it('behaves as expected', async (): Promise<void> => {
    const logger = new Logger({ silence: true })

    let task = new RedisTask('init', [], {}, logger)
    await task.exec()
    expect(populateTemplates).toHaveBeenCalled()
  })
})
