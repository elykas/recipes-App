import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/post/application/post_controller.dart';
import 'package:foodvibe_mobile/features/post/data/post_model.dart';
import 'package:foodvibe_mobile/features/post/widgets/post_autoComplete.dart';
import 'package:foodvibe_mobile/features/post/widgets/post_content_field.dart';
import 'package:foodvibe_mobile/features/post/widgets/post_image_picker.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';

class CreatePostScreen extends ConsumerStatefulWidget {
  const CreatePostScreen({super.key});

  @override
  ConsumerState<CreatePostScreen> createState() => _CreatePostPageState();
}

class _CreatePostPageState extends ConsumerState<CreatePostScreen> {
  String? imagePath;
  final contentController = TextEditingController();
  final recipeIdController = TextEditingController();
  final tagsController = TextEditingController();
  String? _error;
  bool _isLoading = false;

  Future<void> _submitPost() async {
    if (imagePath == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Please select an image")));
      return;
    }

    final content = contentController.text.trim().isEmpty
        ? null
        : contentController.text.trim();
    final recipeId = recipeIdController.text.trim().isEmpty
        ? null
        : recipeIdController.text.trim();

    final newPost = Post(
      imageUrl: imagePath!,
      content: content,
      recipeId: recipeId,
    );

    setState(() {
      _isLoading = true;
    });
    try {
      await ref.read(postControllerProvider.notifier).createPost(newPost);
      if (mounted) {
        context.go(AppRoutes.transiction);
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(loc.createPostLabel)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            PostImagePicker(
              onImagePicked: (path) => setState(() => imagePath = path),
            ),
            const SizedBox(height: 16),
            PostContentField(controller: contentController),
            const SizedBox(height: 16),
            PostAutoCompleteField(controller: tagsController),
            const SizedBox(height: 32),
            ElevatedButton(onPressed: _submitPost, child: Text(loc.submitPost)),
          ],
        ),
      ),
    );
  }
}
