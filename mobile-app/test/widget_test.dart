import 'package:flutter_test/flutter_test.dart';

import 'package:burdan_booking/main.dart';

void main() {
  testWidgets('App boots to the search screen', (WidgetTester tester) async {
    await tester.pumpWidget(const BurdanApp());
    expect(find.text('Find your journey'), findsWidgets);
  });
}
