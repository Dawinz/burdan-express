import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../api_client.dart';
import '../booking_state.dart';
import '../models.dart';
import '../theme.dart';
import '../utils.dart';
import '../widgets/brand.dart';
import 'results_screen.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _api = ApiClient();
  List<City> _cities = [];
  String? _origin = 'dar-es-salaam';
  String? _destination = 'masasi';
  DateTime _date = DateTime.now();
  int _passengers = 1;
  String? _error;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _date = DateTime.parse('${todayYmd()}T00:00:00');
    _loadCities();
  }

  Future<void> _loadCities() async {
    try {
      final cities = await _api.getCities();
      setState(() {
        _cities = cities;
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Could not load cities from the API.';
        _loading = false;
      });
    }
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _date,
      firstDate: DateTime.now().subtract(const Duration(days: 1)),
      lastDate: DateTime.now().add(const Duration(days: 120)),
      builder: (context, child) => Theme(
        data: Theme.of(context).copyWith(
          colorScheme: const ColorScheme.light(primary: BurdanColors.red),
        ),
        child: child!,
      ),
    );
    if (picked != null) setState(() => _date = picked);
  }

  void _search() {
    if (_origin == _destination) {
      setState(() => _error = 'Origin and destination must be different.');
      return;
    }
    final state = context.read<BookingState>();
    final ymd =
        '${_date.year.toString().padLeft(4, '0')}-${_date.month.toString().padLeft(2, '0')}-${_date.day.toString().padLeft(2, '0')}';
    state.setSearch(
      origin: _origin!,
      destination: _destination!,
      date: ymd,
      passengers: _passengers,
    );
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ResultsScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const BrandTitle(),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
            decoration: BoxDecoration(border: Border.all(color: Colors.white24)),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                CircleAvatar(radius: 3, backgroundColor: Color(0xFF34D399)),
                SizedBox(width: 6),
                Text('Live API', style: TextStyle(fontSize: 11, color: Colors.white70)),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              color: BurdanColors.black,
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 40),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'DAR · LINDI · MASASI',
                    style: TextStyle(
                      color: BurdanColors.orange,
                      fontSize: 12,
                      letterSpacing: 2.5,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text('Book your seat\nin a few taps',
                      style: heading(size: 30, weight: FontWeight.w800, color: Colors.white)),
                  const SizedBox(height: 10),
                  const Text(
                    'A professional, API-driven booking experience — search live trips, pick your seat, pay and get a digital ticket.',
                    style: TextStyle(color: Colors.white60, height: 1.4),
                  ),
                ],
              ),
            ),
            Transform.translate(
              offset: const Offset(0, -24),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: SectionCard(
                  padding: const EdgeInsets.all(20),
                  child: _loading
                      ? const SizedBox(
                          height: 200, child: Center(child: CircularProgressIndicator()))
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Find your journey', style: heading(size: 17)),
                            const SizedBox(height: 16),
                            if (_error != null) ...[
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(10),
                                color: BurdanColors.lightRed,
                                child: Text(_error!,
                                    style: const TextStyle(color: BurdanColors.darkRed, fontSize: 13)),
                              ),
                              const SizedBox(height: 12),
                            ],
                            _label('FROM'),
                            _cityDropdown(_origin, (v) => setState(() => _origin = v)),
                            const SizedBox(height: 12),
                            _label('TO'),
                            _cityDropdown(_destination, (v) => setState(() => _destination = v)),
                            const SizedBox(height: 12),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      _label('TRAVEL DATE'),
                                      InkWell(
                                        onTap: _pickDate,
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 12, vertical: 14),
                                          decoration:
                                              BoxDecoration(border: Border.all(color: BurdanColors.gray)),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.calendar_today,
                                                  size: 15, color: BurdanColors.darkGray),
                                              const SizedBox(width: 8),
                                              Text(formatDate(
                                                  '${_date.year}-${_date.month.toString().padLeft(2, '0')}-${_date.day.toString().padLeft(2, '0')}')),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      _label('PASSENGERS'),
                                      DropdownButtonFormField<int>(
                                        value: _passengers,
                                        items: [1, 2, 3, 4, 5]
                                            .map((n) => DropdownMenuItem(
                                                value: n, child: Text('$n')))
                                            .toList(),
                                        onChanged: (v) => setState(() => _passengers = v ?? 1),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 20),
                            SizedBox(
                              width: double.infinity,
                              child: ElevatedButton(
                                onPressed: _search,
                                child: const Text('Search trips'),
                              ),
                            ),
                          ],
                        ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _label(String text) => Padding(
        padding: const EdgeInsets.only(bottom: 6),
        child: Text(text,
            style: const TextStyle(
                fontSize: 11,
                letterSpacing: 1,
                fontWeight: FontWeight.w600,
                color: BurdanColors.darkGray)),
      );

  Widget _cityDropdown(String? value, ValueChanged<String?> onChanged) {
    return DropdownButtonFormField<String>(
      value: value,
      isExpanded: true,
      items: _cities
          .map((c) => DropdownMenuItem(value: c.id, child: Text(c.name)))
          .toList(),
      onChanged: onChanged,
    );
  }
}
