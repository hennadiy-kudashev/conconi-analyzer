import EasyFit from 'easy-fit';

class FitParser {
  constructor() {
    this.easyFit = new EasyFit({
      mode: 'both',
      force: false,
      lengthUnit: 'm',
      speedUnit: 'km/h'
    });
  }

  parse(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = error => reject(error);
      reader.onload = event => {
        const buffer = event.target.result;
        try {
          this.easyFit.parse(buffer, (error, data) => {
            if (error) {
              reject(error);
            }
            if (data) {
              console.log(data);
              resolve(FitParser.convertLaps(data.laps));
            }
          });
        } catch (e) {}
      };
      reader.readAsArrayBuffer(file);
    });
  }

  static average(array) {
    const items = array.filter(item => !!item);
    return Math.round(items.reduce((p, c) => p + c, 0) / items.length);
  }

  static speed(distanceInMeter, timeInSec) {
    return distanceInMeter / 1000 / (timeInSec / 3600);
  }

  static pace(distanceInMeter, timeInSec) {
    const rate = timeInSec / 60 / (distanceInMeter / 1000);
    const min = Math.floor(rate);
    const sec = Math.round(60 * (rate % 1));
    return `${min}:${('0' + sec).slice(-2)}`;
  }

  static round(number) {
    return Math.round(100 * number) / 100;
  }

  static convertLaps(laps) {
    return laps.map(lap => ({
      distance: this.round(lap.total_distance),
      time: this.round(lap.total_elapsed_time),
      avg_hr:
        lap.avg_heart_rate ||
        this.average(lap.records.map(record => record.heart_rate)),
      avg_speed: this.round(
        lap.avg_speed || this.speed(lap.total_distance, lap.total_elapsed_time)
      ),
      avg_pace:
        lap.avg_pace || this.pace(lap.total_distance, lap.total_elapsed_time)
    }));
  }
}

export default FitParser;
