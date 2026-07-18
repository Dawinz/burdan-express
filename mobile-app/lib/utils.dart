import 'package:intl/intl.dart';

final _money = NumberFormat.decimalPattern('en_US');

String formatMoney(num amount, [String currency = 'TZS']) {
  return '$currency ${_money.format(amount)}';
}

String formatDuration(double hours) {
  final h = hours.floor();
  final m = ((hours - h) * 60).round();
  return m > 0 ? '${h}h ${m}m' : '${h}h';
}

String formatDate(String ymd) {
  if (ymd.isEmpty) return '';
  try {
    final d = DateTime.parse(ymd);
    return DateFormat('EEE, d MMM yyyy').format(d);
  } catch (_) {
    return ymd;
  }
}

String todayYmd() {
  final now = DateTime.now().toUtc().add(const Duration(hours: 3)); // EAT
  return DateFormat('yyyy-MM-dd').format(now);
}
