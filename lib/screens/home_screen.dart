import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/numeric_input.dart';
import '../widgets/info_bar.dart';
import '../widgets/video_player.dart';
import '../widgets/settings_menu.dart';
import '../widgets/animated_background.dart';
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
  Song? currentSong;
  bool isPlaying = false;
  bool showSettings = false;
  bool showScore = false;
  int credits = 0;
  String error = '';
  List<Song> queue = [];

  @override
  void initState() {
    super.initState();
    _setupKeyboardListener();
  }

  void _setupKeyboardListener() {
    RawKeyboard.instance.addListener((RawKeyEvent event) {
      if (event is RawKeyDownEvent) {
        if (event.logicalKey == LogicalKeyboardKey.keyF) {
          setState(() => showSettings = !showSettings);
        } else if (event.logicalKey == LogicalKeyboardKey.keyC) {
          setState(() => credits++);
        }
      }
    });
  }

  void _handleCodeSubmit(String code) {
    if (credits <= 0) {
      setState(() => error = 'No credits available');
      return;
    }

    final song = SongLibrary.findSong(code);
    if (song != null) {
      setState(() {
        credits--;
        if (currentSong != null && isPlaying) {
          queue.add(song);
        } else {
          currentSong = song;
          isPlaying = true;
          error = '';
        }
      });
    } else {
      setState(() => error = 'Song Not Found');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          if (!isPlaying) const AnimatedBackground(),
          
          if (!isPlaying && !showScore)
            Center(
              child: NumericInput(
                onSubmit: _handleCodeSubmit,
              ),
            ),

          if (isPlaying && currentSong != null)
            KaraokeVideoPlayer(
              videoUrl: currentSong!.videoUrl,
              onVideoEnd: () {
                setState(() {
                  isPlaying = false;
                  showScore = true;
                  if (queue.isNotEmpty) {
                    currentSong = queue.removeAt(0);
                    isPlaying = true;
                  } else {
                    currentSong = null;
                  }
                });
              },
            ),

          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: InfoBar(
              songCode: currentSong?.code ?? '',
              artistName: currentSong?.artist ?? '',
              songTitle: currentSong?.title ?? '',
              firstVerse: currentSong?.verse ?? '',
            ),
          ),

          if (showSettings)
            SettingsMenu(
              onClose: () => setState(() => showSettings = false),
            ),

          if (error.isNotEmpty)
            ErrorMessage(
              message: error,
              onClose: () => setState(() => error = ''),
            ),

          CreditsDisplay(credits: credits),

          if (queue.isNotEmpty)
            QueueDisplay(
              queue: queue,
              onRemove: (index) {
                setState(() => queue.removeAt(index));
              },
            ),
        ],
      ),
    );
  }
}
