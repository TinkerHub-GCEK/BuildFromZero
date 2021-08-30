import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:visitor_tracker/screens/homescreen.dart';

class Auth extends StatefulWidget {
  @override
  _AuthState createState() => _AuthState();
}

class _AuthState extends State<Auth> {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder(
        stream: _auth.authStateChanges(),
        builder: (ctx, AsyncSnapshot<User> snapshot) {
          if (snapshot.hasData) {
            User user = snapshot.data;
            if (user != null) {
              return HomeScreen();
            } else {
              return HomeScreen();
            }
          }
          return HomeScreen();
        },
      ),
    );
  }
}
