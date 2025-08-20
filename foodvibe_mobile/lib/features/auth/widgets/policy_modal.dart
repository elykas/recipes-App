import 'package:flutter/material.dart';
import '../../../l10n/app_localizations.dart';

class TermsCheckbox extends StatefulWidget {
  final bool initialValue;
  final ValueChanged<bool> onChanged;

  const TermsCheckbox({
    super.key,
    this.initialValue = false,
    required this.onChanged,
  });

  @override
  State<TermsCheckbox> createState() => _TermsCheckboxState();
}

class _TermsCheckboxState extends State<TermsCheckbox> {
  late bool _agreed;

  @override
  void initState() {
    super.initState();
    _agreed = widget.initialValue;
  }

  void _openDocuments(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final content = "${loc.termsOfService}\n\n${loc.privacyPolicy}";

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("${loc.termsOfService} & ${loc.privacyPolicy}"),
        content: SingleChildScrollView(child: Text(content)),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text("${loc.close}"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

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
              style: const TextStyle(
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
