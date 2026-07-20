class City {
  final String id;
  final String name;
  final String region;

  City({required this.id, required this.name, required this.region});

  factory City.fromJson(Map<String, dynamic> j) =>
      City(id: j['id'], name: j['name'], region: j['region'] ?? '');
}

class BusInfo {
  final String id;
  final String name;
  final String model;
  final String plate;
  final double rating;

  BusInfo({
    required this.id,
    required this.name,
    required this.model,
    required this.plate,
    required this.rating,
  });

  factory BusInfo.fromJson(Map<String, dynamic> j) => BusInfo(
        id: j['id']?.toString() ?? '',
        name: j['name'] ?? '',
        model: j['model'] ?? '',
        plate: j['plate'] ?? '',
        rating: (j['rating'] as num?)?.toDouble() ?? 4.8,
      );
}

class Trip {
  final String id;
  final String safariId;
  final String fareQuoteId;
  final String serviceClassId;
  final String origin;
  final String originName;
  final String destination;
  final String destinationName;
  final String date;
  final String departureTime;
  final String arrivalTime;
  final bool arrivesNextDay;
  final double? durationHours;
  final int price;
  final String currency;
  final BusInfo bus;
  final List<String> amenities;
  final int totalSeats;
  final int seatsAvailable;
  final List<Seat> seats;
  final List<Map<String, dynamic>> pickupPoints;
  final List<Map<String, dynamic>> dropoffPoints;
  final String? fareName;

  Trip({
    required this.id,
    required this.safariId,
    required this.fareQuoteId,
    required this.serviceClassId,
    required this.origin,
    required this.originName,
    required this.destination,
    required this.destinationName,
    required this.date,
    required this.departureTime,
    required this.arrivalTime,
    required this.arrivesNextDay,
    required this.durationHours,
    required this.price,
    required this.currency,
    required this.bus,
    required this.amenities,
    required this.totalSeats,
    required this.seatsAvailable,
    required this.seats,
    required this.pickupPoints,
    required this.dropoffPoints,
    this.fareName,
  });

  factory Trip.fromJson(Map<String, dynamic> j) {
    final rawSeats = (j['seats'] as List?) ?? [];
    return Trip(
      id: j['id'],
      safariId: j['safariId'] ?? '',
      fareQuoteId: j['fareQuoteId'] ?? '',
      serviceClassId: j['serviceClassId'] ?? '',
      origin: j['origin']?.toString() ?? '',
      originName: j['originName'] ?? '',
      destination: j['destination']?.toString() ?? '',
      destinationName: j['destinationName'] ?? '',
      date: j['date'] ?? '',
      departureTime: j['departureTime'] ?? '',
      arrivalTime: j['arrivalTime'] ?? '',
      arrivesNextDay: j['arrivesNextDay'] ?? false,
      durationHours: (j['durationHours'] as num?)?.toDouble(),
      price: (j['price'] as num?)?.toInt() ?? 0,
      currency: j['currency'] ?? 'TZS',
      bus: BusInfo.fromJson(j['bus'] ?? {}),
      amenities: List<String>.from(j['amenities'] ?? []),
      totalSeats: (j['totalSeats'] as num?)?.toInt() ?? rawSeats.length,
      seatsAvailable: (j['seatsAvailable'] as num?)?.toInt() ?? 0,
      seats: rawSeats.map((s) => Seat.fromJson(s is Map<String, dynamic> ? s : {})).toList(),
      pickupPoints: List<Map<String, dynamic>>.from(
          (j['pickupPoints'] as List?)?.map((e) => Map<String, dynamic>.from(e)) ?? []),
      dropoffPoints: List<Map<String, dynamic>>.from(
          (j['dropoffPoints'] as List?)?.map((e) => Map<String, dynamic>.from(e)) ?? []),
      fareName: j['fareName'],
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'safariId': safariId,
        'fareQuoteId': fareQuoteId,
        'serviceClassId': serviceClassId,
        'origin': origin,
        'originName': originName,
        'destination': destination,
        'destinationName': destinationName,
        'date': date,
        'departureTime': departureTime,
        'arrivalTime': arrivalTime,
        'arrivesNextDay': arrivesNextDay,
        'durationHours': durationHours,
        'price': price,
        'currency': currency,
        'bus': {
          'id': bus.id,
          'name': bus.name,
          'model': bus.model,
          'plate': bus.plate,
          'rating': bus.rating,
        },
        'amenities': amenities,
        'totalSeats': totalSeats,
        'seatsAvailable': seatsAvailable,
        'seats': seats
            .map((s) => {
                  'label': s.label,
                  'rowIndex': s.row,
                  'columnIndex': s.columnIndex,
                  'available': !s.occupied,
                })
            .toList(),
        'pickupPoints': pickupPoints,
        'dropoffPoints': dropoffPoints,
        'fareName': fareName,
      };
}

class Seat {
  final String label;
  final int row;
  final int columnIndex;
  final bool aisleAfter;
  final bool occupied;

  Seat({
    required this.label,
    required this.row,
    required this.columnIndex,
    required this.aisleAfter,
    required this.occupied,
  });

  factory Seat.fromJson(Map<String, dynamic> j) {
    final columnIndex = (j['columnIndex'] as num?)?.toInt() ?? 0;
    return Seat(
      label: j['label']?.toString() ?? '',
      row: (j['rowIndex'] as num?)?.toInt() ?? (j['row'] as num?)?.toInt() ?? 0,
      columnIndex: columnIndex,
      aisleAfter: j['aisleAfter'] == true || columnIndex == 1 || columnIndex == 3,
      occupied: j['available'] == false || j['occupied'] == true,
    );
  }
}

class Passenger {
  String name;
  String phone;
  String gender;
  String seat;

  Passenger({this.name = '', this.phone = '', this.gender = 'M', this.seat = ''});

  Map<String, dynamic> toJson() => {
        'name': name,
        'phone': phone,
        'gender': gender,
        'seat': seat,
      };
}

class Booking {
  final String reference;
  final String? tripId;
  final String status;
  final Trip? trip;
  final List<String> seats;
  final List<Passenger> passengers;
  final int amount;
  final String currency;
  final String? paymentMethod;
  final String? transactionId;
  final String? qr;
  final String? gate;

  Booking({
    required this.reference,
    this.tripId,
    required this.status,
    this.trip,
    required this.seats,
    required this.passengers,
    required this.amount,
    required this.currency,
    this.paymentMethod,
    this.transactionId,
    this.qr,
    this.gate,
  });

  factory Booking.fromJson(Map<String, dynamic> j) {
    final payment = j['payment'] as Map<String, dynamic>?;
    final ticket = j['ticket'] as Map<String, dynamic>?;
    return Booking(
      reference: j['reference']?.toString() ?? '',
      tripId: j['tripId']?.toString(),
      status: j['status'] ?? 'reserved',
      trip: j['trip'] != null ? Trip.fromJson(j['trip']) : null,
      seats: List<String>.from(j['seats'] ?? []),
      passengers: ((j['passengers'] as List?) ?? [])
          .map((p) => Passenger(
                name: p['name'] ?? '',
                phone: p['phone'] ?? '',
                gender: p['gender'] ?? 'M',
                seat: p['seat'] ?? '',
              ))
          .toList(),
      amount: (j['amount'] as num?)?.toInt() ?? 0,
      currency: j['currency'] ?? 'TZS',
      paymentMethod: payment?['method'],
      transactionId: payment?['transactionId'],
      qr: ticket?['qr'],
      gate: ticket?['gate'],
    );
  }
}
