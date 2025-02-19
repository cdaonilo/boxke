import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:wakelock/wakelock.dart';

class KaraokeVideoPlayer extends StatefulWidget {
  final String videoUrl;
  final VoidCallback onVideoEnd;
  final int? tone;

  const KaraokeVideoPlayer({
    super.key,
    required this.videoUrl,
    required this.onVideoEnd,
    this.tone,
  });

  @override
  State<KaraokeVideoPlayer> createState() => _KaraokeVideoPlayerState();
}

class _KaraokeVideoPlayerState extends State<KaraokeVideoPlayer> {
  late VideoPlayerController _controller;
  bool _isPlaying = true;
  bool _showControls = false;
  double _volume = 1.0;

  @override
  void initState() {
    super.initState();
    Wakelock.enable();
    _initializeVideo();
  }

  Future<void> _initializeVideo() async {
    _controller = VideoPlayerController.network(widget.videoUrl);
    await _controller.initialize();
    _controller.play();
    _controller.setVolume(_volume);
    _controller.addListener(_checkVideoEnd);
    setState(() {});
  }

  void _checkVideoEnd() {
    if (_controller.value.position >= _controller.value.duration) {
      widget.onVideoEnd();
    }
  }

  @override
  void dispose() {
    Wakelock.disable();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_controller.value.isInitialized) {
      return const Center(child: CircularProgressIndicator());
    }

    return GestureDetector(
      onTap: () => setState(() => _showControls = !_showControls),
      child: Stack(
        children: [
          Center(
            child: AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              child: VideoPlayer(_controller),
            ),
          ),
          if (_showControls)
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    colors: [
                      Colors.black.withOpacity(0.7),
                      Colors.transparent,
                    ],
                  ),
                ),
                child: Row(
                  children: [
                    IconButton(
                      icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow),
                      onPressed: () {
                        setState(() {
                          _isPlaying = !_isPlaying;
                          _isPlaying ? _controller.play() : _controller.pause();
                        });
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.skip_next),
                      onPressed: widget.onVideoEnd,
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: VideoProgressIndicator(
                        _controller,
                        allowScrubbing: true,
                        padding: EdgeInsets.zero,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Row(
                      children: [
                        IconButton(
                          icon: Icon(_volume == 0 ? Icons.volume_off : Icons.volume_up),
                          onPressed: () {
                            setState(() {
                              _volume = _volume == 0 ? 1.0 : 0.0;
                              _controller.setVolume(_volume);
                            });
                          },
                        ),
                        SizedBox(
                          width: 100,
                          child: Slider(
                            value: _volume,
                            onChanged: (value) {
                              setState(() {
                                _volume = value;
                                _controller.setVolume(_volume);
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
