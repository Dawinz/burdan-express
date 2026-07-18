import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'booking_state.dart';
import 'theme.dart';
import 'screens/search_screen.dart';

void main() {
  runApp(const BurdanApp());
}

class BurdanApp extends StatelessWidget {
  const BurdanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => BookingState(),
      child: MaterialApp(
        title: 'Burdan Express',
        debugShowCheckedModeBanner: false,
        theme: buildBurdanTheme(),
        home: const SearchScreen(),
      ),
    );
  }
}
