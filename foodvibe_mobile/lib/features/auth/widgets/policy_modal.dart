import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import '../../../l10n/app_localizations.dart';
import '../../../providers/locale_provider.dart';
import '../application/auth_controller.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TermsCheckbox extends ConsumerStatefulWidget {
  final bool initialValue;
  final ValueChanged<bool> onChanged;

  const TermsCheckbox({
    super.key,
    this.initialValue = false,
    required this.onChanged,
  });

  @override
  ConsumerState<TermsCheckbox> createState() => _TermsCheckboxState();
}

class _TermsCheckboxState extends ConsumerState<TermsCheckbox> {
  late bool _agreed;
  late AppLocalizations loc;

  @override
  void initState() {
    super.initState();
    _agreed = widget.initialValue;
  }

   @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    loc = AppLocalizations.of(context)!; 
  }

   Future<void> _openDocuments(BuildContext context) async {
    final locale = ref.read(localeProvider);
    final version = AppConstants.policyVersion; 
    final policies = await ref
        .read(authControllerProvider.notifier)
        .getPolicy(language: locale.languageCode, version: version);

    String termsContent = policies.isNotEmpty ? policies[0]['content'] ?? "" : "";
    String privacyContent = policies.length > 1 ? policies[1]['content'] ?? "" : "";

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(loc.termsAndPolicyText),
        content: SingleChildScrollView(
          child: Text("$termsContent\n\n$privacyContent"),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(loc.close),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Checkbox(
          value: _agreed,
          onChanged: (v) {
            setState(() => _agreed = v!);
            widget.onChanged(_agreed);
          },
        ),
        Expanded(
          child: GestureDetector(
            onTap: () => _openDocuments(context),
            child: Text(
              loc.agreeToTerms,
              style: TextStyle(
                color: Colors.blueAccent,
                decoration: TextDecoration.underline,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
