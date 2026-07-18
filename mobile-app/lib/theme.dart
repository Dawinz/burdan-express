import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BurdanColors {
  static const red = Color(0xFFB91C1C);
  static const darkRed = Color(0xFF7F1D1D);
  static const lightRed = Color(0xFFFEE2E2);
  static const orange = Color(0xFFEA580C);
  static const black = Color(0xFF0F1729);
  static const gray = Color(0xFFE8EAED);
  static const darkGray = Color(0xFF374151);
  static const cream = Color(0xFFF8FAFC);
}

ThemeData buildBurdanTheme() {
  final base = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: BurdanColors.red,
      primary: BurdanColors.red,
      surface: Colors.white,
    ),
    scaffoldBackgroundColor: BurdanColors.cream,
  );

  final bodyFont = GoogleFonts.sourceSans3TextTheme(base.textTheme);

  return base.copyWith(
    textTheme: bodyFont,
    appBarTheme: const AppBarTheme(
      backgroundColor: BurdanColors.black,
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: false,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      isDense: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.zero,
        borderSide: const BorderSide(color: BurdanColors.gray),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.zero,
        borderSide: const BorderSide(color: BurdanColors.gray),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.zero,
        borderSide: const BorderSide(color: BurdanColors.red, width: 1.5),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: BurdanColors.red,
        foregroundColor: Colors.white,
        elevation: 0,
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
        padding: const EdgeInsets.symmetric(vertical: 16),
        textStyle: GoogleFonts.archivo(fontWeight: FontWeight.w700, fontSize: 15),
      ),
    ),
  );
}

TextStyle heading({double size = 18, FontWeight weight = FontWeight.w700, Color? color}) {
  return GoogleFonts.archivo(fontSize: size, fontWeight: weight, color: color ?? BurdanColors.black);
}
