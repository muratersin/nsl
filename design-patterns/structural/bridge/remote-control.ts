interface Device {
  isEnabled(): boolean;

  enabled(): void;

  disabled(): void;

  getVolume(): number;

  setVolume(vol: number): void;

  getChannel(): number;

  setChannel(channel: number): void;

  printStatus(): void;
}

interface Remote {
  power(): void;

  volumeDown(): void;

  volumeUp(): void;

  channelDown(): void;

  channelUp(): void;
}


class Radio implements Device {
  private _on = false;
  private _volume = 30;
  private _channel = 1;

  isEnabled(): boolean {
      return this._on;
  }

  enabled(): void {
      this._on = true
  }

  disabled(): void {
      this._on = false
  }

  getVolume(): number {
      return this._volume
  }

  setVolume(vol: number): void {
      if (vol > 100) {
        this._volume = 100
      } else if (vol < 0) {
        this._volume = 0
      } else {
        this._volume = vol
      }
  }

  getChannel(): number {
      return this._channel
  }

  setChannel(channel: number): void {
      this._channel = channel
  }

  printStatus(): void {
    console.log(`
    ------------------------------------
    | I'm radio.
    | I'm ${this._on ? "enabled" : "disabled"}
    | Current volume is ${this._volume}%
    | Current channel is ${this._channel}
    ------------------------------------
    `);
  }
}

class Tv implements Device {
  private _on = false;
  private _volume = 30;
  private _channel = 1;

  isEnabled(): boolean {
      return this._on;
  }

  enabled(): void {
      this._on = true
  }

  disabled(): void {
      this._on = false
  }

  getVolume(): number {
      return this._volume
  }

  setVolume(vol: number): void {
      if (vol > 100) {
        this._volume = 100
      } else if (vol < 0) {
        this._volume = 0
      } else {
        this._volume = vol
      }
  }

  getChannel(): number {
      return this._channel
  }

  setChannel(channel: number): void {
      this._channel = channel
  }

  printStatus(): void {
    console.log(`
    ------------------------------------
    | I'm tv.
    | I'm ${this._on ? "enabled" : "disabled"}
    | Current volume is ${this._volume}%
    | Current channel is ${this._channel}
    ------------------------------------
    `);
  }
}

class BasicRemote implements Remote {
  protected device: Device;

  constructor(device: Device) {
    this.device = device
  }

  power() {
    console.log('Remote: power toggle')
    if (this.device.isEnabled()) {
      this.device.disabled()
    } else {
      this.device.enabled()
    }
  }

  volumeDown(): void {
    console.log('Remote: volume down');
    this.device.setVolume(this.device.getVolume() - 10)
  }

  volumeUp(): void {
    console.log('Remote: volume up');
    this.device.setVolume(this.device.getVolume() + 10)
  }

  channelDown(): void {
    console.log('Remote: channel down');
    this.device.setVolume(this.device.getChannel() - 1)
  }

  channelUp(): void {
    console.log('Remote: channel up');
    this.device.setVolume(this.device.getChannel() + 1)
  }
}

class AdvancedRemote extends BasicRemote {
  constructor(device: Device) {
    super(device)
  }

  mute() {
    console.log('Remote: mute')
    this.device.setVolume(0)
  }
}

function mainRemoteControl() {
  testDevice(new Tv());
  testDevice(new Radio());
}

function testDevice(device: Device) {
  console.log('Tests with basic remote.');

  const basicRemote = new BasicRemote(device)
  basicRemote.power()
  device.printStatus()

  console.log('Tests with advance remote.');

  const advanceRemote = new AdvancedRemote(device)
  advanceRemote.power()
  advanceRemote.mute()
  device.printStatus()

}