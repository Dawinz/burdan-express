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
        id: j['id'],
        name: j['name'],
        model: j['model'],
        plate: j['plate'],
        rating: (j['rating'] as num).toDouble(),
      );
}

class Trip {
  final String id;
  final String origin;
  final String originName;
  final String destination;
  final String destinationName;
  final String date;
  final String departureTime;
  final String arrivalTime;
  final bool arrivesNextDay;
  final double durationHours;
  final int price;
  final String currency;
  final BusInfo bus;
  final List<String> amenities;
  final int totalSeats;
  final int seatsAvailable;

  Trip({
    required this.id,
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
  });

  factory Trip.fromJson(Map<String, dynamic> j) => Trip(
        id: j['id'],
        origin: j['origin'],
        originName: j['originName'],
        destination: j['destination'],
        destinationName: j['destinationName'],
        date: j['date'],
        departureTime: j['departureTime'],
        arrivalTime: j['arrivalTime'],
        arrivesNextDay: j['arrivesNextDay'] ?? false,
        durationHours: (j['durationHours'] as num).toDouble(),
        price: (j['price'] as num).toInt(),
        currency: j['currency'] ?? 'TZS',
        bus: BusInfo.fromJson(j['bus']),
        amenities: List<String>.from(j['amenities'] ?? []),
        totalSeats: (j['totalSeats'] as num).toInt(),
        seatsAvailable: (j['seatsAvailable'] as num).toInt(),
      );

  Map<String, dynamic> toJson() => {
        'id': id,
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
      };
}

class Seat {
  final String label;
  final int row;
  final String col;
  final bool aisleAfter;
  final bool occupied;

  Seat({
    required this.label,
    required this.row,
    required this.col,
    required this.aisleAfter,
    required this.occupied,
  });

  factory Seat.fromJson(Map<String, dynamic> j) => Seat(
        label: j['label'],
        row: (j['row'] as num).toInt(),
        col: j['col'],
        aisleAfter: j['aisleAfter'] ?? false,
        occupied: j['occupied'] ?? false,
      );
}

class SeatMap {
  final String tripId;
  final int rows;
  final int price;
  final String currency;
  final List<Seat> seats;

  SeatMap({
    required this.tripId,
    required this.rows,
    required this.price,
    required this.currency,
    required this.seats,
  });

  factory SeatMap.fromJson(Map<String, dynamic> j) => SeatMap(
        tripId: j['tripId'],
        rows: (j['rows'] as num).toInt(),
        price: (j['price'] as num).toInt(),
        currency: j['currency'] ?? 'TZS',
        seats: (j['seats'] as List).map((s) => Seat.fromJson(s)).toList(),
      );
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
  final String status;
  final Trip trip;
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
    required this.status,
    required this.trip,
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
      reference: j['reference'],
      status: j['status'],
      trip: Trip.fromJson(j['trip']),
      seats: List<String>.from(j['seats'] ?? []),
      passengers: ((j['passengers'] as List?) ?? [])
          .map((p) => Passenger(
                name: p['name'] ?? '',
                phone: p['phone'] ?? '',
                gender: p['gender'] ?? 'M',
                seat: p['seat'] ?? '',
              ))
          .toList(),
      amount: (j['amount'] as num).toInt(),
      currency: j['currency'] ?? 'TZS',
      paymentMethod: payment?['method'],
      transactionId: payment?['transactionId'],
      qr: ticket?['qr'],
      gate: ticket?['gate'],
    );
  }
}
