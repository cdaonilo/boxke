import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/animated_background.dart';
import '../widgets/numeric_input.dart';
import '../widgets/info_bar.dart';
import '../widgets/video_player.dart';
import '../widgets/settings_menu.dart';
import '../widgets/score_display.dart';
import '../widgets/queue_display.dart';
import '../widgets/error_message.dart';
import '../widgets/credits_display.dart';
import '../models/song.dart';
import '../services/song_library.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final SongLibrary _songLibrary = SongLibrary();
  Song? _currentSong;
  bool _isPlaying = false;
  bool _showSettings = false;
  int _credits = 10;
  String _error = '';

  @override
  void initState() {
    super.initState();
    _setupKeyboardListeners();
  }

  void _setupKeyboardListeners() {
    RawKeyboard.instance.addListener((RawKeyEvent event) {
      if (event is RawKeyDownEvent) {
        if (event.logicalKey == LogicalKeyboardKey.keyF) {
          setState(() => _showSettings = !_showSettings);
        } else if (event.logicalKey == LogicalKeyboardKey.keyC) {
          setState(() => _credits++);
        }
      }
    });
  }

  void _handleCodeSubmit(String code) {
    if (_credits <= 0) {
      setState(() => _error = 'No credits available');
      return;
    }

    final song = _songLibrary.findSong(code);
    if (song != null) {
      setState(() {
        _currentSong = song;
        _isPlaying = true;
        _credits--;
        _error = '';
      });
    } else {
      setState(() => _error = 'Song not found');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          if (!_isPlaying) AnimatedBackground(),
          
          if (!_isPlaying)
            Center(
              child: NumericInput(
                onSubmit: _handleCodeSubmit,
              ),
            ),
            
          if (_isPlaying && _currentSong != null)
            KaraokeVideoPlayer(
              videoUrl: _currentSong!.videoUrl,
              onEnd: () {
                setState(() {
                  _isPlaying = false;
                  _currentSong = null;
                });
              },
            ),
            
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: InfoBar(
              songCode: _currentSong?.code ?? '',
              artistName: _currentSong?.artist ?? '',
              songTitle: _currentSong?.title ?? '',
            ),
          ),
          
          if (_showSettings)
            SettingsMenu(
              onClose: () => setState(() => _showSettings = false),
            ),
            
          Positioned(
            top: 16,
            right: 16,
            child: CreditsDisplay(credits: _credits),
          ),
          
          if (_error.isNotEmpty)
            ErrorMessage(
              message: _error,
              onClose: () => setState(() => _error = ''),
            ),
        ],
      ),
    );
  }
}