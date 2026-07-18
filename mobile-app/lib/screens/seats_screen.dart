import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../api_client.dart';
import '../booking_state.dart';
import '../models.dart';
import '../theme.dart';
import '../utils.dart';
import 'passengers_screen.dart';

class SeatsScreen extends StatefulWidget {
  const SeatsScreen({super.key});

  @override
  State<SeatsScreen> createState() => _SeatsScreenState();
}

class _SeatsScreenState extends State<SeatsScreen> {
  final _api = ApiClient();
  SeatMap? _map;
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final trip = context.read<BookingState>().selectedTrip!;
    try {
      final map = await _api.getSeats(trip.id);
      setState(() {
        _map = map;
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<BookingState>();
    final maxSeats = state.passengers;
    final rowsMap = <int, List<Seat>>{};
    if (_map != null) {
      for (final s in _map!.seats) {
        rowsMap.putIfAbsent(s.row, () => []).add(s);
      }
    }
    final rows = rowsMap.keys.toList()..sort();

    return Scaffold(
      appBar: AppBar(title: const Text('Choose seats')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : Column(
                  children: [
                    Container(
                      color: Colors.white,
                      padding: const EdgeInsets.all(12),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _legend(Colors.white, 'Available', border: true),
                          const SizedBox(width: 16),
                          _legend(BurdanColors.red, 'Selected'),
                          const SizedBox(width: 16),
                          _legend(BurdanColors.gray, 'Taken'),
                        ],
                      ),
                    ),
                    Expanded(
                      child: SingleChildScrollView(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(border: Border.all(color: BurdanColors.gray)),
                              child: const Text('Front / Driver',
                                  style: TextStyle(fontSize: 11, color: BurdanColors.darkGray)),
                            ),
                            const SizedBox(height: 16),
                            ...rows.map((r) => Padding(
                                  padding: const EdgeInsets.only(bottom: 10),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: rowsMap[r]!.map((seat) {
                                      return Padding(
                                        padding: EdgeInsets.only(right: seat.aisleAfter ? 24 : 8),
                                        child: _seatTile(seat, state),
                                      );
                                    }).toList(),
                                  ),
                                )),
                          ],
                        ),
                      ),
                    ),
                    _summaryBar(state, maxSeats),
                  ],
                ),
    );
  }

  Widget _seatTile(Seat seat, BookingState state) {
    final selected = state.selectedSeats.contains(seat.label);
    Color bg;
    Color fg;
    Color border;
    if (seat.occupied) {
      bg = BurdanColors.gray;
      fg = Colors.black26;
      border = BurdanColors.gray;
    } else if (selected) {
      bg = BurdanColors.red;
      fg = Colors.white;
      border = BurdanColors.red;
    } else {
      bg = Colors.white;
      fg = BurdanColors.darkGray;
      border = BurdanColors.gray;
    }
    return InkWell(
      onTap: seat.occupied ? null : () => state.toggleSeat(seat.label),
      child: Container(
        width: 40,
        height: 40,
        alignment: Alignment.center,
        decoration: BoxDecoration(color: bg, border: Border.all(color: border)),
        child: Text(seat.label,
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: fg)),
      ),
    );
  }

  Widget _legend(Color color, String label, {bool border = false}) {
    return Row(
      children: [
        Container(
          width: 16,
          height: 16,
          decoration: BoxDecoration(
            color: color,
            border: border ? Border.all(color: BurdanColors.gray) : null,
          ),
        ),
        const SizedBox(width: 6),
        Text(label, style: const TextStyle(fontSize: 12, color: BurdanColors.darkGray)),
      ],
    );
  }

  Widget _summaryBar(BookingState state, int maxSeats) {
    final remaining = maxSeats - state.selectedSeats.length;
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    state.selectedSeats.isEmpty
                        ? 'No seats selected'
                        : 'Seats: ${state.selectedSeats.join(', ')}',
                    style: const TextStyle(fontSize: 12, color: BurdanColors.darkGray),
                  ),
                  Text(formatMoney(state.total), style: heading(size: 18)),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: remaining == 0
                  ? () => Navigator.of(context)
                      .push(MaterialPageRoute(builder: (_) => const PassengersScreen()))
                  : null,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                disabledBackgroundColor: BurdanColors.gray,
              ),
              child: Text(remaining == 0 ? 'Continue' : 'Select $remaining more'),
            ),
          ],
        ),
      ),
    );
  }
}
