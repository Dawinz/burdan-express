import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../booking_state.dart';
import '../models.dart';
import '../theme.dart';
import '../utils.dart';
import 'payment_screen.dart';

class PassengersScreen extends StatefulWidget {
  const PassengersScreen({super.key});

  @override
  State<PassengersScreen> createState() => _PassengersScreenState();
}

class _PassengersScreenState extends State<PassengersScreen> {
  late List<Passenger> _rows;
  final _phoneCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  String? _error;

  @override
  void initState() {
    super.initState();
    final state = context.read<BookingState>();
    _rows = state.selectedSeats.map((seat) => Passenger(seat: seat)).toList();
    _phoneCtrl.text = state.contactPhone;
    _emailCtrl.text = state.contactEmail;
  }

  @override
  void dispose() {
    _phoneCtrl.dispose();
    _emailCtrl.dispose();
    super.dispose();
  }

  void _submit() {
    if (_rows.any((r) => r.name.trim().isEmpty)) {
      setState(() => _error = 'Please enter every passenger name.');
      return;
    }
    if (_phoneCtrl.text.trim().isEmpty) {
      setState(() => _error = 'A contact phone number is required.');
      return;
    }
    final state = context.read<BookingState>();
    state.contactPhone = _phoneCtrl.text.trim();
    state.contactEmail = _emailCtrl.text.trim();
    state.setPassengerDetails(_rows);
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => const PaymentScreen()));
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<BookingState>();
    return Scaffold(
      appBar: AppBar(title: const Text('Passenger details')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          if (_error != null) ...[
            Container(
              padding: const EdgeInsets.all(10),
              color: BurdanColors.lightRed,
              child: Text(_error!,
                  style: const TextStyle(color: BurdanColors.darkRed, fontSize: 13)),
            ),
            const SizedBox(height: 12),
          ],
          ..._rows.asMap().entries.map((e) => _passengerCard(e.key, e.value)),
          _contactCard(),
          const SizedBox(height: 16),
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
          ElevatedButton(onPressed: _submit, child: const Text('Continue to payment')),
        ],
      ),
    );
  }

  Widget _passengerCard(int i, Passenger p) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: BurdanColors.gray)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                color: BurdanColors.red,
                child: Text('Seat ${p.seat}',
                    style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
              ),
              const SizedBox(width: 8),
              Text('Passenger ${i + 1}',
                  style: const TextStyle(color: BurdanColors.darkGray, fontSize: 13)),
            ],
          ),
          const SizedBox(height: 12),
          TextField(
            decoration: const InputDecoration(labelText: 'Full name', hintText: 'e.g. Asha Juma'),
            onChanged: (v) => p.name = v,
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              const Text('Gender:', style: TextStyle(color: BurdanColors.darkGray)),
              const SizedBox(width: 12),
              _genderChip(p, 'M', 'Male'),
              const SizedBox(width: 8),
              _genderChip(p, 'F', 'Female'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _genderChip(Passenger p, String value, String label) {
    final selected = p.gender == value;
    return InkWell(
      onTap: () => setState(() => p.gender = value),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? BurdanColors.lightRed : Colors.white,
          border: Border.all(color: selected ? BurdanColors.red : BurdanColors.gray),
        ),
        child: Text(label,
            style: TextStyle(
                fontSize: 13,
                color: selected ? BurdanColors.red : BurdanColors.darkGray,
                fontWeight: FontWeight.w600)),
      ),
    );
  }

  Widget _contactCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: BurdanColors.gray)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Contact', style: heading(size: 15)),
          const SizedBox(height: 12),
          TextField(
            controller: _phoneCtrl,
            keyboardType: TextInputType.phone,
            decoration: const InputDecoration(
                labelText: 'Phone (M-Pesa / Airtel)', hintText: '07XX XXX XXX'),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _emailCtrl,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Email (optional)'),
          ),
        ],
      ),
    );
  }
}
