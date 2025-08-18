import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../application/auth_controller.dart';
import '../../../utils/validators.dart';
import '../../../l10n/app_localizations.dart';


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
    final loc = AppLocalizations.of(context)!;
    
    String? errorText;
switch (_status) {
  case UsernameStatus.invalid:
    errorText = loc.invalidUsername; // "Invalid username"
    break;
  case UsernameStatus.taken:
    errorText = loc.takenUsername; // "Username is already taken"
    break;
  default:
    errorText = null;
}
   Widget statusWidget;
switch (_status) {
  case UsernameStatus.loading:
    statusWidget = Text(loc.checkingUsername,
        style: const TextStyle(color: Colors.grey));
    break;
  case UsernameStatus.available:
    statusWidget = Text(loc.usernameAvailable,
        style: const TextStyle(color: Colors.green));
    break;
  case UsernameStatus.taken:
    statusWidget = Text(loc.takenUsername,
        style: const TextStyle(color: Colors.red));
    break;
  case UsernameStatus.invalid:
    statusWidget = Text(loc.invalidUsername,
        style: const TextStyle(color: Colors.orange));
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
          onChanged: _onChanged,
        ),
        const SizedBox(height: 4),
        statusWidget,
      ],
    );
  }
}
