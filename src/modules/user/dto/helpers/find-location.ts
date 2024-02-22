var cityTimezones = require('city-timezones');

export default (city: string): any[] => {
  const cityLookup = cityTimezones.findFromCityStateProvince(city);

  return cityLookup;
};
