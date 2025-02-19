import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

class ScoreDisplay extends StatefulWidget {
  final int score;
  final int accuracy;
  final VoidCallback onClose;
  final bool showNotes;

  const ScoreDisplay({
    super.key,
    required this.score,
    required this.accuracy,
    required this.onClose,
    this.showNotes = true,
  });

  @override
  State<ScoreDisplay> createState() => _ScoreDisplayState();
}

class _ScoreDisplayState extends State<ScoreDisplay> {
  final _player = AudioPlayer();
  bool _audioPlayed = false;

  @override
  void initState() {
    super.initState();
    _playScoreSound();
    _autoClose();
  }

  Future<void> _playScoreSound() async {
    if (!widget.showNotes || _audioPlayed) return;

    try {
      String audioUrl;
      if (widget.accuracy >= 90) {
        audioUrl = 'https://storage.googleapis.com/tempo-public-assets/note90-100.mp3';
      } else if (widget.accuracy >= 60) {
        audioUrl = 'https://storage.googleapis.com/tempo-public-assets/note60-80.mp3';
      } else {
        audioUrl = 'https://storage.googleapis.com/tempo-public-assets/note40-50.mp3';
      }

      await _player.setUrl(audioUrl);
      await _player.play();
      _audioPlayed = true;
    } catch (e) {
      print('Error playing score sound: $e');
    }
  }

  void _autoClose() {
    Future.delayed(const Duration(seconds: 5), widget.onClose);
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }

  Widget _getScoreIcon() {
    if (widget.accuracy >= 90) {
      return const Icon(
        Icons.celebration,
        size: 64,
        color: Colors.amber,
      );
    } else if (widget.accuracy >= 60) {
      return const Icon(
        Icons.star,
        size: 64,
        color: Colors.blue,
      );
    } else {
      return const Icon(
        Icons.sentiment_dissatisfied,
        size: 64,
        color: Colors.red,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black87,
      child: Center(
        child: Container(
          width: 400,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.grey[900],
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey[800]!),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (widget.showNotes) _getScoreIcon(),
              const SizedBox(height: 24),
              const Text(
                'Score',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              Text(
                widget.score.toString(),
                style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              Text(
                'Accuracy: ${widget.accuracy}%',
                style: const TextStyle(fontSize: 24),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: widget.onClose,
                child: const Text('Continue'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
