import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import '../application/user_controller.dart';

class UserProfileScreen extends ConsumerStatefulWidget {
  final String? publicId; // אם null => משתמש נוכחי

  const UserProfileScreen({super.key, this.publicId});

  @override
  ConsumerState<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends ConsumerState<UserProfileScreen> {
  int _selectedTab = 0; // 0=Posts, 1=Recipes

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
    if (user == null) return const Center(child: Text('No user data'));

    final isCurrentUser = widget.publicId == null;

    return Scaffold(
      appBar: AppBar(title: Text(user.username)),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // --- HEADER ---
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
                        Text(user.fullName ?? user.username,
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 18)),
                        if (user.headLine != null)
                          Text(user.headLine!,
                              style: const TextStyle(color: Colors.grey)),
                        if (user.bio != null) Text(user.bio!),
                        if (isCurrentUser)
                          TextButton(
                            onPressed: () {
                              // navigate to update profile screen / bottom sheet
                            },
                            child: const Text('Edit Profile'),
                          )
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
                  child: Text('Posts',
                      style: TextStyle(
                          fontWeight: _selectedTab == 0
                              ? FontWeight.bold
                              : FontWeight.normal)),
                ),
                TextButton(
                  onPressed: () => setState(() => _selectedTab = 1),
                  child: Text('Recipes',
                      style: TextStyle(
                          fontWeight: _selectedTab == 1
                              ? FontWeight.bold
                              : FontWeight.normal)),
                ),
              ],
            ),
            // --- CONTENT ---
            if (_selectedTab == 0)
              _buildPostsGrid(user.posts ?? [])
            else
              _buildRecipesGrid(user.posts?.where((p) => p.recipe != null).toList() ?? []),
          ],
        ),
      ),
    );
  }

  Widget _buildPostsGrid(List<FeedPost> posts) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: posts.length,
      gridDelegate:
          const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
      itemBuilder: (context, index) {
        final post = posts[index];
        return Image.network(post.imageUrl ?? '',
            fit: BoxFit.cover, errorBuilder: (_, __, ___) => const Icon(Icons.error));
      },
    );
  }

  Widget _buildRecipesGrid(List<FeedPost> recipes) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: recipes.length,
      gridDelegate:
          const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
      itemBuilder: (context, index) {
        final post = recipes[index];
        return Image.network(post.imageUrl ?? '',
            fit: BoxFit.cover, errorBuilder: (_, __, ___) => const Icon(Icons.error));
      },
    );
  }
}
