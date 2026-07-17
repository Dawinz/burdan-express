export const allLocations = [
  { value: 'dar-es-salaam', label: 'DAR ES SALAAM' },
  { value: 'lindi', label: 'LINDI' },
  { value: 'masasi', label: 'MASASI' },
  { value: 'kilwa', label: 'KILWA' },
  { value: 'nangurukuru', label: 'NANGURUKURU' },
  { value: 'nachingwea', label: 'NACHINGWEA' },
  { value: 'ruangwa', label: 'RUANGWA' },
  { value: 'mtwara', label: 'MTWARA' },
  { value: 'newala', label: 'NEWALA' },
  { value: 'tandahimba', label: 'TANDAHIMBA' }
];

export const routeDefinitions = [
  { from: 'DAR ES SALAAM', to: 'LINDI', price: 'TSh 35,000', durationKey: 'sixHours', fromValue: 'dar-es-salaam', toValue: 'lindi' },
  { from: 'DAR ES SALAAM', to: 'MASASI', price: 'TSh 45,000', durationKey: 'eightHours', fromValue: 'dar-es-salaam', toValue: 'masasi' },
  { from: 'DAR ES SALAAM', to: 'KILWA', price: 'TSh 25,000', durationKey: 'fiveHours', fromValue: 'dar-es-salaam', toValue: 'kilwa' },
  { from: 'DAR ES SALAAM', to: 'MTWARA', price: 'TSh 50,000', durationKey: 'nineHours', fromValue: 'dar-es-salaam', toValue: 'mtwara' },
  { from: 'DAR ES SALAAM', to: 'NANGURUKURU', price: 'TSh 30,000', durationKey: 'fiveHours', fromValue: 'dar-es-salaam', toValue: 'nangurukuru' },
  { from: 'DAR ES SALAAM', to: 'NACHINGWEA', price: 'TSh 40,000', durationKey: 'sevenHours', fromValue: 'dar-es-salaam', toValue: 'nachingwea' },
  { from: 'LINDI', to: 'DAR ES SALAAM', price: 'TSh 35,000', durationKey: 'sixHours', fromValue: 'lindi', toValue: 'dar-es-salaam' },
  { from: 'LINDI', to: 'MASASI', price: 'TSh 15,000', durationKey: 'threeHours', fromValue: 'lindi', toValue: 'masasi' },
  { from: 'LINDI', to: 'MTWARA', price: 'TSh 20,000', durationKey: 'threeHours', fromValue: 'lindi', toValue: 'mtwara' },
  { from: 'MASASI', to: 'DAR ES SALAAM', price: 'TSh 45,000', durationKey: 'eightHours', fromValue: 'masasi', toValue: 'dar-es-salaam' },
  { from: 'MASASI', to: 'LINDI', price: 'TSh 15,000', durationKey: 'threeHours', fromValue: 'masasi', toValue: 'lindi' },
  { from: 'MASASI', to: 'MTWARA', price: 'TSh 10,000', durationKey: 'threeHours', fromValue: 'masasi', toValue: 'mtwara' },
  { from: 'MTWARA', to: 'DAR ES SALAAM', price: 'TSh 50,000', durationKey: 'nineHours', fromValue: 'mtwara', toValue: 'dar-es-salaam' },
  { from: 'MTWARA', to: 'LINDI', price: 'TSh 20,000', durationKey: 'threeHours', fromValue: 'mtwara', toValue: 'lindi' },
  { from: 'KILWA', to: 'DAR ES SALAAM', price: 'TSh 25,000', durationKey: 'fiveHours', fromValue: 'kilwa', toValue: 'dar-es-salaam' },
  { from: 'NACHINGWEA', to: 'DAR ES SALAAM', price: 'TSh 40,000', durationKey: 'sevenHours', fromValue: 'nachingwea', toValue: 'dar-es-salaam' }
];
