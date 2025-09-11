import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/user/widgets/grid_widget.dart';
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
  int _selectedTab = 0; // 0=Posts, 1=Recipes



  @override
  Widget build(BuildContext context) {
    final profileState = ref.watch(userProfileControllerProvider);
      debugPrint('Current state: $profileState');
    if (profileState.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (profileState.error != null) {
      return Center(child: Text('Error: ${profileState.error}'));
    }

    final user = profileState.user;
    if (user == null) return const Center(child: Text('No user data'));

    final isCurrentUser = widget.publicId == null;

    final currentPosts = _selectedTab == 0
        ? user.posts ?? []
        : user.posts?.where((p) => p.recipe != null).toList() ?? [];

    return Scaffold(
      appBar: AppBar(title: Text(user.username)),
      body: RefreshIndicator(
        onRefresh: () async {
          await ref
              .read(userProfileControllerProvider.notifier)
              .loadUserProfile(Id: widget.publicId, isRefresh: true);
        },
        child: SingleChildScrollView(
          physics:
              const AlwaysScrollableScrollPhysics(),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 40,
                      backgroundImage: user.imagePath != null
                          ? NetworkImage(user.imagePath!)
                          : null,
                      child: user.imagePath == null
                          ? const Icon(Icons.person, size: 40)
                          : null,
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            user.fullName ?? user.username,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          if (user.headLine != null)
                            Text(
                              user.headLine!,
                              style: const TextStyle(color: Colors.grey),
                            ),
                          if (user.bio != null) Text(user.bio!),
                          if (isCurrentUser)
                            TextButton(
                              onPressed: () {
                                context.go(AppRoutes.editProfile);
                              },
                              child: const Text('Edit Profile'),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextButton(
                    onPressed: () => setState(() => _selectedTab = 0),
                    child: Text(
                      'Posts',
                      style: TextStyle(
                        fontWeight: _selectedTab == 0
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: () => setState(() => _selectedTab = 1),
                    child: Text(
                      'Recipes',
                      style: TextStyle(
                        fontWeight: _selectedTab == 1
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ],
              ),
              PostsGrid(
                posts: currentPosts,
                onPostTap: (index) {
                  showPostViewer(
                    context: context,
                    posts: currentPosts,
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
