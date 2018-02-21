import EasyFit from 'easy-fit';

class FitParser {
  constructor() {
    this.easyFit = new EasyFit({ mode: 'both', force: false });
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

  static convertLaps(laps) {
    return laps.map(lap => ({
      distance: lap.total_distance,
      time: lap.total_elapsed_time,
      avg_hr: lap.avg_heart_rate,
      avg_speed: lap.avg_speed
    }));
  }
}

export default FitParser;
