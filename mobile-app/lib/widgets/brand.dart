import 'package:flutter/material.dart';

import '../theme.dart';

class BrandTitle extends StatelessWidget {
  final String subtitle;
  const BrandTitle({super.key, this.subtitle = 'API Booking Demo'});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 34,
          height: 34,
          color: BurdanColors.red,
          alignment: Alignment.center,
          child: Text('BE', style: heading(size: 13, color: Colors.white)),
        ),
        const SizedBox(width: 10),
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('BURDAN EXPRESS', style: heading(size: 15, color: Colors.white)),
            Text(
              subtitle.toUpperCase(),
              style: const TextStyle(
                fontSize: 9,
                letterSpacing: 2,
                color: BurdanColors.orange,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class SectionCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  const SectionCard({super.key, required this.child, this.padding = const EdgeInsets.all(16)});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: padding,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: BurdanColors.gray),
      ),
      child: child,
    );
  }
}
