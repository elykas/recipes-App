import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/presentation/login_page.dart';
import 'package:foodvibe_mobile/features/user/presentation/profile_header_widget.dart';
import 'package:foodvibe_mobile/features/user/widgets/grid_widget.dart';
import 'package:foodvibe_mobile/features/user/widgets/hamburger_menu_widget.dart';
import 'package:foodvibe_mobile/features/user/widgets/post_viewer.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';

import '../application/user_controller.dart';

class UserProfileScreen extends ConsumerStatefulWidget {
  final String? publicId;

  const UserProfileScreen({super.key, this.publicId});

  @override
  ConsumerState<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends ConsumerState<UserProfileScreen> {

  @override
  Widget build(BuildContext context) {
    final profileState = ref.watch(userProfileControllerProvider);
    
    if (profileState.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (profileState.error != null) {
      return Center(child: Text('Error: ${profileState.error}'));
    }

    final user = profileState.user;

    if (user == null) {
      context.go(AppRoutes.login);
    }

    final isCurrentUser = widget.publicId == null;

    return Scaffold(
      appBar: AppBar(
        title: Text(user?.username ?? ''),
        actions: [if (isCurrentUser) HamburgerMenu(user: user)],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await ref
              .read(userProfileControllerProvider.notifier)
              .loadUserProfile(Id: widget.publicId, isRefresh: true);
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            children: [
              ProfileHeader(user: user, isCurrentUser: isCurrentUser),
             
              PostsGrid(
                onPostTap: (index, ) {
                  showPostViewer(
                    context: context,
                    posts: user.posts ?? [],
                    initialIndex: index,
                    onLoadMore: () async {
                      await ref
                          .read(userProfileControllerProvider.notifier)
                          .loadUserProfile(Id: widget.publicId);
                      setState(() {});
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
