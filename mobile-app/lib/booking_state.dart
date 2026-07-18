import 'package:flutter/foundation.dart';

import 'models.dart';

class BookingState extends ChangeNotifier {
  // Search
  String origin = 'dar-es-salaam';
  String destination = 'masasi';
  String date = '';
  int passengers = 1;

  // Selection
  Trip? selectedTrip;
  final List<String> selectedSeats = [];
  List<Passenger> passengerDetails = [];
  String contactPhone = '';
  String contactEmail = '';

  Booking? booking;

  void setSearch({
    required String origin,
    required String destination,
    required String date,
    required int passengers,
  }) {
    this.origin = origin;
    this.destination = destination;
    this.date = date;
    this.passengers = passengers;
    notifyListeners();
  }

  void selectTrip(Trip trip) {
    selectedTrip = trip;
    selectedSeats.clear();
    notifyListeners();
  }

  void toggleSeat(String label) {
    if (selectedSeats.contains(label)) {
      selectedSeats.remove(label);
    } else {
      if (selectedSeats.length >= passengers) {
        selectedSeats.removeAt(0);
      }
      selectedSeats.add(label);
    }
    notifyListeners();
  }

  int get total => (selectedTrip?.price ?? 0) * selectedSeats.length;

  void setPassengerDetails(List<Passenger> details) {
    passengerDetails = details;
    notifyListeners();
  }

  void setBooking(Booking b) {
    booking = b;
    notifyListeners();
  }

  void reset() {
    selectedTrip = null;
    selectedSeats.clear();
    passengerDetails = [];
    contactPhone = '';
    contactEmail = '';
    booking = null;
    notifyListeners();
  }
}
