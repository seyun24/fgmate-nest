import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import * as path from 'path';
@Injectable()
export class FcmService {
  private readonly fcm: admin.messaging.Messaging;

  constructor() {
    // Initialize Firebase Admin SDK
    const serviceAccount = require(path.join(__dirname, 'common/fcm/fgmate-push-firebase-adminsdk-u95ji-0a862e0fd1.json'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    this.fcm = admin.messaging();
  }

  async sendPushNotification(deviceToken: string, title: string, body: string): Promise<string> {
    const message: admin.messaging.Message = {
      notification: {
        title,
        body,
      },
      token: deviceToken,
    };

    try {
      const response = await this.fcm.send(message);
      return response;
    } catch (error) {
      throw new Error('Failed to send push notification.');
    }
  }
}