import CoreInitializer from '@universal-packages/core/CoreInitializer'

export default class PushNotificationsInitializer extends CoreInitializer {
  public static readonly initializerName = 'push-notifications'
  public static readonly description: string = 'Push Notifications initializer'

  public readonly templatesLocation: string = `${__dirname}/templates`
}
