import admin from 'firebase-admin'
import jwt from 'jsonwebtoken'

import { PushNotificationsModule } from '../src'

jest.mock('firebase-admin')
jest.mock('jsonwebtoken')

coreJest.runBare({
  coreConfigOverride: {
    config: { location: './tests/__fixtures__/config' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
})

describe(PushNotificationsModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    expect(global.pushNotificationsSubject).not.toBeUndefined()
    expect(global.pushNotificationsSubject.options).toEqual({
      firebase: {
        credentialLocation: './tests/__fixtures__/credentials/credentials.json',
        credential: {
          type: 'service_account',
          projectId: 'universal',
          privateKeyId: 'some_private_key',
          privateKey: '-----BEGIN PRIVATE KEY-----\n' + 'random\n' + 'stuff\n' + 'nonetheless\n' + 'random\n' + 'stuff\n' + 'nonetheless\n' + '-----END PRIVATE KEY-----\n',
          clientEmail: 'firebase-adminsdk-mvgse@universal.iam.gserviceaccount.com',
          clientId: '123321',
          authUri: 'https://accounts.google.com/o/oauth2/auth',
          tokenUri: 'https://oauth2.googleapis.com/token',
          authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
          clientX509CertUrl: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mvgse%universal.iam.gserviceaccount.com',
          universeDomain: 'googleapis.com'
        }
      },
      dryRun: true,
      apns: {
        p8CertificateLocation: './tests/__fixtures__/credentials/apns.p8',
        teamId: 'my-team-id',
        keyId: 'p8-key-id',
        apnsTopic: 'com.company.app',
        p8Certificate: '-----BEGIN PRIVATE KEY-----\n' + 'random\n' + 'stuff\n' + 'nonetheless\n' + '-----END PRIVATE KEY-----\n'
      }
    })

    expect(admin.initializeApp).toHaveBeenCalledTimes(1)
    expect(jwt.sign).toHaveBeenCalledTimes(1)
  })
})
