export default class Hero {
  constructor(attrs) {
    this.stats = {
      str: attrs.str,
      dex: attrs.dex,
      intel: attrs.intel,
      luck: attrs.luck
    };
    this.name = attrs.name;
  }
}
