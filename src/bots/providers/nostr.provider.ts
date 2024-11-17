

export class NostrProvider {
  private readonly privateKey: string;
  private readonly publicKey: string;
  private readonly relayUrls: string[];

  constructor(){
    this.privateKey = process.env.NOSTR_PRIVATE_KEY;
    this.publicKey = process.env.NOSTR_PUBLIC_KEY;
    this.relayUrls = process.env.NOSTR_RELAY_URLS.split(',');
  }
}