import 'package:flutter/material.dart';
import 'package:splashscreen/splashscreen.dart';

import 'package:visitor_tracker/utils/onboarding.dart';

class SplashScreenPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SplashScreen(
      seconds: 4,
      navigateAfterSeconds: OnBoardingPage(),
      backgroundColor: Colors.black,
      title: Text(
        'Info Tracker',
        style: TextStyle(
          color: Colors.white,
          fontSize: 30,
        ),
      ),
      image: Image.asset("assets/images/bfz.jpg"),
      loadingText: Text(
        "Initializing",
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
        ),
      ),
      photoSize: 100.0,
      loaderColor: Colors.white,
    );
  }
}
