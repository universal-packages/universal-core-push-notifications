import { populateTemplates } from '@universal-packages/template-populator'

import PushNotificationsTask from '../src/PushNotifications.universal-core-task'

jest.mock('@universal-packages/template-populator')
jest.mock('firebase-admin')
jest.mock('jsonwebtoken')

describe(PushNotificationsTask, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    await jestCore.execTask('push-notifications-task', {
      directive: 'init',

      args: { f: true },
      coreConfigOverride: {
        config: { location: './tests/__fixtures__/config' },
        modules: { location: './tests/__fixtures__' },
        tasks: { location: './tests/__fixtures__' },
        logger: { silence: true }
      }
    })

    expect(populateTemplates).toHaveBeenCalledWith(expect.stringMatching(/universal-core-push-notifications\/src\/template/), './src', { override: true })
  })

  it('throws an error if directive is not recognized', async (): Promise<void> => {
    await expect(
      jestCore.execTask('push-notifications-task', {
        directive: 'nop',

        args: { f: true },
        coreConfigOverride: {
          config: { location: './tests/__fixtures__/config' },
          modules: { location: './tests/__fixtures__' },
          tasks: { location: './tests/__fixtures__' },
          logger: { silence: true }
        }
      })
    ).rejects.toThrow('Unrecognized directive nop')
  })
})
