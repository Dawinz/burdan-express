import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../booking_state.dart';
import '../theme.dart';
import '../utils.dart';
import 'search_screen.dart';

class TicketScreen extends StatelessWidget {
  const TicketScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<BookingState>();
    final booking = state.booking;
    if (booking == null) {
      return const Scaffold(body: Center(child: Text('No booking')));
    }
    final trip = booking.trip;

    return Scaffold(
      appBar: AppBar(title: const Text('Your ticket'), automaticallyImplyLeading: false),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: Column(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: const BoxDecoration(
                      color: Color(0xFF22C55E), shape: BoxShape.circle),
                  child: const Icon(Icons.check, color: Colors.white, size: 30),
                ),
                const SizedBox(height: 12),
                Text('Booking confirmed', style: heading(size: 22, weight: FontWeight.w800)),
                const SizedBox(height: 4),
                const Text('Show the QR code when boarding.',
                    style: TextStyle(color: BurdanColors.darkGray)),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Container(
            decoration:
                BoxDecoration(color: Colors.white, border: Border.all(color: BurdanColors.gray)),
            child: Column(
              children: [
                Container(
                  color: BurdanColors.black,
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('BURDAN EXPRESS', style: heading(size: 15, color: Colors.white)),
                          const Text('E-TICKET',
                              style: TextStyle(
                                  color: BurdanColors.orange,
                                  fontSize: 10,
                                  letterSpacing: 2)),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          const Text('REFERENCE',
                              style: TextStyle(color: Colors.white54, fontSize: 10)),
                          Text(booking.reference, style: heading(size: 16, color: Colors.white)),
                        ],
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(trip.departureTime, style: heading(size: 22)),
                              Text(trip.originName,
                                  style: const TextStyle(
                                      fontSize: 12, color: BurdanColors.darkGray)),
                            ],
                          ),
                          const Icon(Icons.arrow_forward, color: BurdanColors.gray),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(trip.arrivalTime, style: heading(size: 22)),
                              Text(trip.destinationName,
                                  style: const TextStyle(
                                      fontSize: 12, color: BurdanColors.darkGray)),
                            ],
                          ),
                        ],
                      ),
                      const Divider(height: 24, color: BurdanColors.gray),
                      Center(
                        child: Column(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration:
                                  BoxDecoration(border: Border.all(color: BurdanColors.gray)),
                              child: QrImageView(
                                data: booking.qr ?? booking.reference,
                                size: 130,
                              ),
                            ),
                            const SizedBox(height: 6),
                            const Text('Scan at boarding gate',
                                style: TextStyle(fontSize: 10, color: BurdanColors.darkGray)),
                          ],
                        ),
                      ),
                      const Divider(height: 24, color: BurdanColors.gray),
                      _info('Date', formatDate(trip.date)),
                      _info('Bus', '${trip.bus.model} · ${trip.bus.plate}'),
                      _info('Seats', booking.seats.join(', ')),
                      _info('Boarding', booking.gate ?? '—'),
                      _info('Amount paid', formatMoney(booking.amount, booking.currency)),
                      _info('Payment', (booking.paymentMethod ?? '').toUpperCase()),
                      const Divider(height: 24, color: BurdanColors.gray),
                      ...booking.passengers.map((p) => Padding(
                            padding: const EdgeInsets.only(bottom: 4),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(p.name),
                                Text('Seat ${p.seat}',
                                    style: const TextStyle(color: BurdanColors.darkGray)),
                              ],
                            ),
                          )),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              context.read<BookingState>().reset();
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (_) => const SearchScreen()),
                (route) => false,
              );
            },
            child: const Text('Book another trip'),
          ),
        ],
      ),
    );
  }

  Widget _info(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: BurdanColors.darkGray, fontSize: 13)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
        ],
      ),
    );
  }
}
