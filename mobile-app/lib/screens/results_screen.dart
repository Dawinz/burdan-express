import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../api_client.dart';
import '../booking_state.dart';
import '../models.dart';
import '../theme.dart';
import '../utils.dart';
import 'seats_screen.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key});

  @override
  State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  final _api = ApiClient();
  List<Trip> _trips = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final s = context.read<BookingState>();
    try {
      final trips = await _api.searchTrips(
        origin: s.origin,
        destination: s.destination,
        date: s.date,
        passengers: s.passengers,
      );
      setState(() {
        _trips = trips;
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _loading = false;
      });
    }
  }

  void _choose(Trip trip) {
    context.read<BookingState>().selectTrip(trip);
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => const SeatsScreen()));
  }

  @override
  Widget build(BuildContext context) {
    final s = context.watch<BookingState>();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Available trips'),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      color: Colors.white,
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _trips.isNotEmpty
                                ? '${_trips.first.originName} → ${_trips.first.destinationName}'
                                : 'Trips',
                            style: heading(size: 17),
                          ),
                          const SizedBox(height: 2),
                          Text('${formatDate(s.date)} · ${s.passengers} passenger(s)',
                              style: const TextStyle(color: BurdanColors.darkGray, fontSize: 13)),
                        ],
                      ),
                    ),
                    Expanded(
                      child: _trips.isEmpty
                          ? const Center(child: Text('No trips available.'))
                          : ListView.separated(
                              padding: const EdgeInsets.all(16),
                              itemCount: _trips.length,
                              separatorBuilder: (_, __) => const SizedBox(height: 12),
                              itemBuilder: (_, i) => _tripCard(_trips[i]),
                            ),
                    ),
                  ],
                ),
    );
  }

  Widget _tripCard(Trip trip) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: BurdanColors.gray)),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(trip.bus.name, style: heading(size: 15)),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                color: BurdanColors.lightRed,
                child: const Text('Live API',
                    style: TextStyle(
                        color: BurdanColors.red, fontSize: 11, fontWeight: FontWeight.w600)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(trip.departureTime, style: heading(size: 20)),
                  Text(trip.originName,
                      style: const TextStyle(fontSize: 11, color: BurdanColors.darkGray)),
                ],
              ),
              Expanded(
                child: Column(
                  children: [
                    Text(trip.fareName ?? trip.bus.model,
                        style: const TextStyle(fontSize: 11, color: BurdanColors.darkGray)),
                    const Divider(color: BurdanColors.gray, height: 12),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('${trip.arrivalTime}${trip.arrivesNextDay ? ' +1' : ''}',
                      style: heading(size: 20)),
                  Text(trip.destinationName,
                      style: const TextStyle(fontSize: 11, color: BurdanColors.darkGray)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: trip.amenities
                .take(3)
                .map((a) => Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                      decoration: BoxDecoration(border: Border.all(color: BurdanColors.gray)),
                      child: Text(a,
                          style: const TextStyle(fontSize: 11, color: BurdanColors.darkGray)),
                    ))
                .toList(),
          ),
          const Divider(color: BurdanColors.gray, height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(formatMoney(trip.price, trip.currency), style: heading(size: 18)),
                  Text('${trip.seatsAvailable} seats left',
                      style: const TextStyle(
                          fontSize: 11, color: Color(0xFF059669), fontWeight: FontWeight.w600)),
                ],
              ),
              ElevatedButton(
                onPressed: () => _choose(trip),
                style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12)),
                child: const Text('Select seats'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
