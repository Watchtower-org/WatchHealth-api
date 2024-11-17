import {
  finalizeEvent,
  generateSecretKey,
  getEventHash,
  getPublicKey,
  Relay,
} from 'nostr-tools';
import { Bot } from '../bots.interface';
import { Injectable } from '@nestjs/common';
const WebSocket = require('ws');
global.WebSocket = WebSocket;

@Injectable()
export class NostrProvider implements Bot {
  private readonly privateKey: Uint8Array;
  private readonly publicKey: string;
  private readonly relayUrls: string[];

  constructor() {
    // Load keys from environment variables or generate new ones
    this.privateKey = process.env.NOSTR_PRIV
    ? new Uint8Array(JSON.parse(process.env.NOSTR_PRIV))
    : generateSecretKey();
    this.publicKey =  process.env.NOSTR_PUB || getPublicKey(this.privateKey);

    // Nostr relay URLs
    this.relayUrls = [
      'wss://relay.damus.io',
      'wss://nostr.fmt.wiz.biz',
      'wss://frysian.nostrich.casa',
    ];

    console.log(`Nostr Bot Public Key: ${this.publicKey}`);

    this.setProfile('WatchHealth', 'A bot for Nostr');
  }

  async setProfile(username: string, description: string): Promise<void> {
    const profileEvent: any = {
      kind: 0, // Metadata event
      pubkey: this.publicKey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: JSON.stringify({
        name: username,
        about: description,
        picture: '', // Optional: URL to a profile picture
      }),
    };

    profileEvent.id = getEventHash(profileEvent);
    const signedProfileEvent = await finalizeEvent(profileEvent, this.privateKey);

    for (const url of this.relayUrls) {
      try {
        console.log(`Setting profile on relay at ${url}`);
        const relay = await Relay.connect(url);
        relay.publish(signedProfileEvent);
        console.log(`Profile set with username: ${username}, description: ${description}`);
      } catch (error) {
        console.error(`Failed to set profile on relay ${url}`, error);
      }
    }
  }


  async sendPost(text: string): Promise<void> {
    console.log(this.publicKey, this.privateKey);
    const replyEvent: any = {
      kind: 1,
      pubkey: this.publicKey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: text,
    };

    replyEvent.id = getEventHash(replyEvent);
    const signedEvent = await finalizeEvent(replyEvent, this.privateKey);
    console.log(this.publicKey, this.privateKey, signedEvent);
    for (const url of this.relayUrls) {
      try {
        const relay = await Relay.connect(url);

        relay.publish(signedEvent);
      } catch (error) {
        console.error(`Failed to send reply to relay ${url}`, error);
      }
    }
  }
}


