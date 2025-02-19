import 'dart:convert';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'package:shared_preferences.dart';
import '../models/song.dart';

class SongLibrary {
  static const String _mediaPath = '/media/karaoke';
  static final List<Song> _mockSongs = [
    Song(
      code: '12345',
      artist: 'Test Artist',
      title: 'Test Song',
      verse: 'This is a test song for the karaoke system...',
      filename: 'test.mp4',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ),
    // Add more mock songs here
  ];

  static Future<List<Song>> loadSongs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final useExternalStorage = prefs.getBool('useExternalStorage') ?? false;

      if (!useExternalStorage) {
        return _mockSongs;
      }

      final directory = await getExternalStorageDirectory();
      if (directory == null) return _mockSongs;

      final dbFile = File('${directory.path}/db.ini');
      if (!await dbFile.exists()) return _mockSongs;

      final lines = await dbFile.readAsLines();
      final songs = <Song>[];

      for (var line in lines) {
        final parts = line.split('|');
        if (parts.length >= 4) {
          songs.add(Song(
            code: parts[0].trim(),
            artist: parts[1].trim(),
            title: parts[2].trim(),
            filename: parts[3].trim(),
            verse: '',
            videoUrl: '$_mediaPath/${parts[3].trim()}',
          ));
        }
      }

      return songs.isEmpty ? _mockSongs : songs;
    } catch (e) {
      print('Error loading songs: $e');
      return _mockSongs;
    }
  }

  static Song? findSong(String code) {
    try {
      return _mockSongs.firstWhere((song) => song.code == code);
    } catch (e) {
      return null;
    }
  }

  static String getSongUrl(String filename) {
    return '$_mediaPath/$filename';
  }
}
