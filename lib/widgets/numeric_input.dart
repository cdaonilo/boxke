import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class NumericInput extends StatefulWidget {
  final Function(String) onSubmit;
  final int maxLength;

  const NumericInput({
    super.key,
    required this.onSubmit,
    this.maxLength = 5,
  });

  @override
  State<NumericInput> createState() => _NumericInputState();
}

class _NumericInputState extends State<NumericInput> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleSubmit() {
    if (_controller.text.isNotEmpty) {
      widget.onSubmit(_controller.text);
      _controller.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 60,
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey[800]!),
      ),
      child: TextField(
        controller: _controller,
        textAlign: TextAlign.center,
        style: const TextStyle(fontSize: 24),
        keyboardType: TextInputType.number,
        maxLength: widget.maxLength,
        decoration: const InputDecoration(
          counterText: '',
          border: InputBorder.none,
          hintText: '00000',
          hintStyle: TextStyle(color: Colors.grey),
        ),
        inputFormatters: [
          FilteringTextInputFormatter.digitsOnly,
        ],
        onSubmitted: (_) => _handleSubmit(),
      ),
    );
  }
}
