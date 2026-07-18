/// Base URL of the shared Burdan mock booking API.
///
/// Override at build/run time with:
///   flutter run --dart-define=API_BASE=http://localhost:4000
const String apiBase = String.fromEnvironment(
  'API_BASE',
  defaultValue: 'https://mock-api-jet-theta.vercel.app',
);
