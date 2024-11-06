import countries from "world-countries";

const formativeCountries = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formativeCountries;

  const getByValue = (value: string) => {
    return formativeCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
