import { Logger } from '@universal-packages/logger'

import { PushNotificationsModule } from '../src'

describe('PushNotificationsModule', (): void => {
  it('behaves as expected', async (): Promise<void> => {
    const logger = new Logger({ silence: true })
    const module = new PushNotificationsModule({} as any, logger)

    await module.prepare()
    await module.release()
  })
})
