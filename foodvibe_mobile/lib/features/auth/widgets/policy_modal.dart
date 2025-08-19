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

  void _openDocument(BuildContext context, String type) {
    final loc = AppLocalizations.of(context)!;

    String content = "";
    if (type == 'terms') content = loc.termsOfService;
    if (type == 'privacy') content = loc.privacyPolicy;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(type == 'terms' ? "Terms of Service" : "Privacy Policy"),
        content: SingleChildScrollView(child: Text(content)),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text("Close"),
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
          child: Wrap(
            children: [
              Text("I agree to "),
              GestureDetector(
                onTap: () => _openDocument(context, 'terms'),
                child: Text(
                  "Terms of Service",
                  style: const TextStyle(
                    color: Colors.blueAccent,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
              Text(" and "),
              GestureDetector(
                onTap: () => _openDocument(context, 'privacy'),
                child: Text(
                  "Privacy Policy",
                  style: const TextStyle(
                    color: Colors.blueAccent,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
