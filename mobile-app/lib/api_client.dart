import 'dart:convert';
import 'package:http/http.dart' as http;

import 'config.dart';
import 'models.dart';

class ApiException implements Exception {
  final String message;
  ApiException(this.message);
  @override
  String toString() => message;
}

class ApiClient {
  final String base;
  ApiClient({this.base = apiBase});

  Map<String, dynamic> _decode(http.Response res) {
    final body = res.body.isNotEmpty ? jsonDecode(res.body) : {};
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return body as Map<String, dynamic>;
    }
    final map = body is Map ? body : <String, dynamic>{};
    throw ApiException(map['error']?.toString() ??
        map['detail']?.toString() ??
        'Request failed (${res.statusCode})');
  }

  Future<List<City>> getCities() async {
    final res = await http.get(Uri.parse('$base/api/cities'));
    final data = _decode(res);
    return (data['cities'] as List).map((c) => City.fromJson(c)).toList();
  }

  Future<List<Trip>> searchTrips({
    required String origin,
    required String destination,
    required String date,
    required int passengers,
  }) async {
    final uri = Uri.parse('$base/api/trips').replace(queryParameters: {
      'origin': origin,
      'destination': destination,
      'date': date,
      'passengers': '$passengers',
    });
    final res = await http.get(uri);
    final data = _decode(res);
    return (data['trips'] as List).map((t) => Trip.fromJson(t)).toList();
  }

  Future<Booking> createBooking({
    required Trip trip,
    required List<String> seats,
    required List<Passenger> passengers,
    required Map<String, String> contact,
  }) async {
    final res = await http.post(
      Uri.parse('$base/api/bookings'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'trip': trip.toJson(),
        'seats': seats,
        'passengers': passengers.map((p) => p.toJson()).toList(),
        'contact': contact,
      }),
    );
    final data = _decode(res);
    return Booking.fromJson(data['booking']);
  }

  Future<Booking> payBooking({
    required String tripId,
    required String method,
    String? phoneOverride,
  }) async {
    final res = await http.post(
      Uri.parse('$base/api/bookings/$tripId/pay'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'method': method,
        if (phoneOverride != null) 'phoneOverride': phoneOverride,
      }),
    );
    final data = _decode(res);
    return Booking.fromJson(data['booking']);
  }
}
