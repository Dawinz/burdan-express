import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../api_client.dart';
import '../booking_state.dart';
import '../theme.dart';
import '../utils.dart';
import 'ticket_screen.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final _api = ApiClient();
  String _method = 'mpesa';
  String _status = 'idle';
  String? _error;

  final _methods = const [
    ['mpesa', 'M-Pesa', 'Vodacom mobile money'],
    ['airtel', 'Airtel Money', 'Airtel mobile money'],
    ['card', 'Card', 'Visa / Mastercard'],
  ];

  Future<void> _pay() async {
    final state = context.read<BookingState>();
    setState(() {
      _error = null;
      _status = 'booking';
    });
    try {
      final booking = await _api.createBooking(
        trip: state.selectedTrip!,
        seats: state.selectedSeats,
        passengers: state.passengerDetails,
        contact: {'phone': state.contactPhone, 'email': state.contactEmail},
      );
      setState(() => _status = 'paying');
      await Future.delayed(const Duration(milliseconds: 1200));
      final paid = await _api.payBooking(
        reference: booking.reference,
        method: _method,
      );
      state.setBooking(paid);
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const TicketScreen()));
    } catch (e) {
      setState(() {
        _error = e.toString();
        _status = 'error';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<BookingState>();
    final busy = _status == 'booking' || _status == 'paying';
    return Scaffold(
      appBar: AppBar(title: const Text('Payment')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration:
                BoxDecoration(color: Colors.white, border: Border.all(color: BurdanColors.gray)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Choose a payment method', style: heading(size: 15)),
                const SizedBox(height: 12),
                ..._methods.map((m) => _methodTile(m[0], m[1], m[2])),
              ],
            ),
          ),
          const SizedBox(height: 12),
          if (_error != null)
            Container(
              padding: const EdgeInsets.all(10),
              color: BurdanColors.lightRed,
              child:
                  Text(_error!, style: const TextStyle(color: BurdanColors.darkRed, fontSize: 13)),
            ),
          if (busy)
            Container(
              padding: const EdgeInsets.all(12),
              color: Colors.white,
              child: Row(
                children: [
                  const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(strokeWidth: 2, color: BurdanColors.red)),
                  const SizedBox(width: 10),
                  Text(_status == 'booking' ? 'Reserving your seats…' : 'Confirming payment…'),
                ],
              ),
            ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Total', style: TextStyle(color: BurdanColors.darkGray)),
                Text(formatMoney(state.total), style: heading(size: 18)),
              ],
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: busy ? null : _pay,
            child: Text(busy ? 'Processing…' : 'Pay ${formatMoney(state.total)}'),
          ),
          const SizedBox(height: 8),
          const Center(
            child: Text('Demo only — no real payment is charged.',
                style: TextStyle(fontSize: 11, color: BurdanColors.darkGray)),
          ),
        ],
      ),
    );
  }

  Widget _methodTile(String id, String label, String hint) {
    final selected = _method == id;
    return InkWell(
      onTap: () => setState(() => _method = id),
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: selected ? BurdanColors.lightRed.withValues(alpha: 0.4) : Colors.white,
          border: Border.all(color: selected ? BurdanColors.red : BurdanColors.gray),
        ),
        child: Row(
          children: [
            Icon(selected ? Icons.radio_button_checked : Icons.radio_button_off,
                color: selected ? BurdanColors.red : BurdanColors.darkGray, size: 20),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
                Text(hint, style: const TextStyle(fontSize: 12, color: BurdanColors.darkGray)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
