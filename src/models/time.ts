export type TimeRaw = number;

export class Time {
  private static currentTime: TimeRaw = 0;

  static IncrementTime(): TimeRaw {
    Time.currentTime++;
    return Time.currentTime;
  }

  private time: TimeRaw;

  constructor(time?: TimeRaw) {
    if (typeof time === 'number') {
      this.time = time;
    } else {
      this.time = Time.currentTime;
    }
  }

  toString(): string {
    const year = Math.floor(this.time / 365);
    const day = (this.time % 365) + 1;

    return `Year: ${year}, Day: ${day}`;
  }
}
