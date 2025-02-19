import 'package:flutter/material.dart';

class InfoBar extends StatelessWidget {
  final String songCode;
  final String artistName;
  final String songTitle;
  final String firstVerse;
  final int? tone;

  const InfoBar({
    super.key,
    required this.songCode,
    required this.artistName,
    required this.songTitle,
    required this.firstVerse,
    this.tone,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      color: Colors.black,
      child: Row(
        children: [
          // Song Code
          Container(
            width: 192,
            decoration: BoxDecoration(
              border: Border(
                right: BorderSide(color: Colors.grey[800]!),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'CÓDIGO',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                Text(
                  songCode.isEmpty ? '00000' : songCode,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),

          // Artist Name
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                border: Border(
                  right: BorderSide(color: Colors.grey[800]!),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'CANTOR:',
                    style: TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                  Text(
                    artistName,
                    style: const TextStyle(fontSize: 20),
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ),

          // Song Title
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'MUSICA:',
                    style: TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                  Text(
                    songTitle,
                    style: const TextStyle(fontSize: 20),
                    overflow: TextOverflow.ellipsis,
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
