const math = require("../../utils/math");

class Planet {
  constructor(position) {
    this.position = position;
    this.planetTypes = [
      {
        code: 'a',
        name: 'desert'
      },
      {
        code: 'b',
        name: 'dry'
      },
      {
        code: 'c',
        name: 'normal'
      },
      {
        code: 'd',
        name: 'jungle'
      },
      {
        code: 'e',
        name: 'oceanic'
      },
      {
        code: 'f',
        name: 'ice'
      },
      {
        code: 'g',
        name: 'gas'
      },
      {
        code: 'c',
        name: 'normal'
      },
    ];
  }

  generatePlanetType(arraystart, arrayend) {
    const index = math.getRndInteger(arraystart, arrayend);

    return this.planetTypes[index];
  }

  generatePlanetImage() {
    let number = math.getRndInteger(1, 5); // 1 - 5
    return '0' + number;
  }

  generatePlanet() {
    switch(this.position) {
      case 1:
      case 2:
      case 3:
        return {
          planetType: this.generatePlanetType(0, 1),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      case 4:
      case 5:
        return {
          planetType: this.generatePlanetType(1, 2),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      case 6:
      case 7:
        return {
          planetType: this.generatePlanetType(2, 3),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      case 8:
      case 9:
        return {
          planetType: this.generatePlanetType(3, 4),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      case 10:
      case 11:
        return {
          planetType: this.generatePlanetType(4, 5),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      case 12:
      case 13:
        return {
          planetType: this.generatePlanetType(5, 6),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      case 14:
      case 15:
        return {
          planetType: this.generatePlanetType(6, 7),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
      default:
        return {
          planetType: this.generatePlanetType(0, 7),
          usedSlots: 0,
          slots: 50,
          imageSystem: this.generatePlanetImage()
        };
    }
  }
}

module.exports = Planet;