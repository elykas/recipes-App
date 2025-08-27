import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';


class BaseScreen extends StatelessWidget {
  final Widget child;
  final int currentIndex;

  const BaseScreen({required this.child, required this.currentIndex, super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FoodVibe App'),
        backgroundColor: Colors.orange,
      ),
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        selectedItemColor: Colors.orange,
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          switch (index) {
            case 0:
              context.go(AppRoutes.feed);
              break;
            case 1:
              context.go(AppRoutes.recipes);
              break;
            case 2:
              context.go(AppRoutes.createPost);
              break;
            case 3:
              context.go(AppRoutes.profile);
              break;
            case 4:
              context.go(AppRoutes.search);
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Feed'),
          BottomNavigationBarItem(icon: Icon(Icons.restaurant_menu), label: 'Recipes'),
          BottomNavigationBarItem(icon: Icon(Icons.add_box), label: 'Create'),
          BottomNavigationBarItem(icon: Icon(Icons.group), label: 'Profile'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
        ],
      ),
    );
  }
}
