import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';

class ProfileHeader extends StatelessWidget {
  final dynamic user;
  final bool isCurrentUser;

  const ProfileHeader({
    super.key,
    required this.user,
    required this.isCurrentUser,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          CircleAvatar(
            radius: 40,
            backgroundImage:
                user.imagePath != null ? NetworkImage(user.imagePath!) : null,
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
                    onPressed: () => context.go(AppRoutes.editProfile),
                    child: Text(loc.editProfile),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
