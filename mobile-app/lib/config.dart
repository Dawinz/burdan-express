/// SafariPlus-backed booking API (proxied).
/// Override: flutter run --dart-define=API_BASE=http://localhost:4000
const String apiBase = String.fromEnvironment(
  'API_BASE',
  defaultValue: 'https://mock-api-jet-theta.vercel.app',
);

const String operatorId = '2203260042';
