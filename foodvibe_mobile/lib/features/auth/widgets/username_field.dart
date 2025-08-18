import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../application/auth_controller.dart';
import '../../../utils/validators.dart';

enum UsernameStatus { initial, loading, available, taken, invalid }

class UsernameField extends ConsumerStatefulWidget {
  final TextEditingController controller;
  final void Function(String username, bool isAvailable) onStatusChanged;

  const UsernameField({
    super.key,
    required this.controller,
    required this.onStatusChanged,
  });

  @override
  ConsumerState<UsernameField> createState() => _UsernameFieldState();
}

class _UsernameFieldState extends ConsumerState<UsernameField> {
  Timer? _debounce;
  UsernameStatus _status = UsernameStatus.initial;

  void _onChanged(String value) {
    if (value.isEmpty) {
      setState(() => _status = UsernameStatus.initial);
      widget.onStatusChanged(value, false);
      return;
    }

    if (!Validators.validateUsername(value)) {
      setState(() => _status = UsernameStatus.invalid);
      widget.onStatusChanged(value, false);
      return;
    }

    if (_debounce?.isActive ?? false) _debounce!.cancel();

    setState(() => _status = UsernameStatus.loading);

    _debounce = Timer(const Duration(milliseconds: 500), () async {
      final available = await ref
          .read(authControllerProvider.notifier)
          .checkUsernameAvailability(value.trim());
      setState(() {
        _status =
            available ? UsernameStatus.available : UsernameStatus.taken;
      });
      widget.onStatusChanged(value, available);
    });
  }

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(() => _onChanged(widget.controller.text));
  }

  @override
  void dispose() {
    widget.controller.removeListener(() => _onChanged(widget.controller.text));
    _debounce?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    String? errorText;
    switch (_status) {
      case UsernameStatus.invalid:
        errorText = 'Invalid format';
        break;
      case UsernameStatus.taken:
        errorText = 'Username already taken';
        break;
      default:
        errorText = null;
    }

    Widget statusWidget;
    switch (_status) {
      case UsernameStatus.loading:
        statusWidget = const Text('Checking...', style: TextStyle(color: Colors.grey));
        break;
      case UsernameStatus.available:
        statusWidget = const Text('✅ Available', style: TextStyle(color: Colors.green));
        break;
      case UsernameStatus.taken:
        statusWidget = const Text('❌ Taken', style: TextStyle(color: Colors.red));
        break;
      case UsernameStatus.invalid:
        statusWidget = const Text('⚠️ Invalid format', style: TextStyle(color: Colors.orange));
        break;
      default:
        statusWidget = const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextFormField(
          controller: widget.controller,
          decoration: InputDecoration(labelText: 'Username *', errorText: errorText),
          validator: (value) =>
              value == null || value.trim().isEmpty ? 'Username required' : null,
        ),
        const SizedBox(height: 4),
        statusWidget,
      ],
    );
  }
}
