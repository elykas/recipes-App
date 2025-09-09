import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/core/utils/image_picker.dart';
import 'package:foodvibe_mobile/features/user/application/user_controller.dart';
import 'package:go_router/go_router.dart';

import '../data/user_model.dart';

class EditProfileScreen extends ConsumerStatefulWidget {
  final AppUser user;

  const EditProfileScreen({super.key, required this.user});

  @override
  ConsumerState<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends ConsumerState<EditProfileScreen> {
  late TextEditingController fullNameController;
  late TextEditingController bioController;
  late TextEditingController headLineController;
  File? pickedImage;

  @override
  void initState() {
    super.initState();
    fullNameController = TextEditingController(text: widget.user.fullName);
    bioController = TextEditingController(text: widget.user.bio);
    headLineController = TextEditingController(text: widget.user.headLine);
  }

  @override
  void dispose() {
    fullNameController.dispose();
    bioController.dispose();
    headLineController.dispose();
    super.dispose();
  }

  Future<void> pickImage({required bool fromCamera}) async {
    final imageFile = await ImagePickerHelper.pickImage(fromCamera: fromCamera);
    if (imageFile != null) {
      setState(() {
        pickedImage = imageFile;
      });
      // Update image via notifier
      await ref.read(userProfileControllerProvider.notifier).updateImage(imageFile);
    }
  }

  Future<void> deleteImage() async {
    await ref.read(userProfileControllerProvider.notifier).deleteImage();
    setState(() {
      pickedImage = null;
    });
  }

  Future<void> saveProfile() async {
    final updatedUser = widget.user.copyWith(
      fullName: fullNameController.text.isEmpty ? null : fullNameController.text,
      bio: bioController.text.isEmpty ? null : bioController.text,
      headLine: headLineController.text.isEmpty ? null : headLineController.text,
    );

    await ref.read(userProfileControllerProvider.notifier).updateProfile(updatedUser);

    if (context.mounted) context.pop();
  }

  @override
  Widget build(BuildContext context) {
    final currentUser = ref.watch(userProfileControllerProvider).user;
    final hasImage = pickedImage != null || currentUser?.imagePath != null;

    return Scaffold(
      appBar: AppBar(title: const Text('Edit Profile')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Stack(
                alignment: Alignment.bottomRight,
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: pickedImage != null
                        ? FileImage(pickedImage!)
                        : (currentUser?.imagePath != null
                            ? NetworkImage(currentUser!.imagePath!)
                            : null) as ImageProvider?,
                    child: pickedImage == null && currentUser?.imagePath == null
                        ? const Icon(Icons.person, size: 50)
                        : null,
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.add_a_photo),
                        onPressed: () => pickImage(fromCamera: false),
                        tooltip: 'Pick from gallery',
                      ),
                      IconButton(
                        icon: const Icon(Icons.camera_alt),
                        onPressed: () => pickImage(fromCamera: true),
                        tooltip: 'Take a photo',
                      ),
                      if (hasImage)
                        IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: deleteImage,
                          tooltip: 'Delete image',
                        ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TextField(
                controller: fullNameController,
                decoration: const InputDecoration(labelText: 'Full Name'),
              ),
              TextField(
                controller: headLineController,
                decoration: const InputDecoration(labelText: 'Headline'),
              ),
              TextField(
                controller: bioController,
                decoration: const InputDecoration(labelText: 'Bio'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: saveProfile, child: const Text('Save')),
            ],
          ),
        ),
      ),
    );
  }
}
