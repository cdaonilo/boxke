import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../models/song.dart';

class SongLibrary {
  static final SongLibrary _instance = SongLibrary._internal();
  factory SongLibrary() => _instance;
  
  SongLibrary._internal();

  final Map<String, Song> _songs = {};
  bool _initialized = false;
  String _mediaPath = '/storage/emulated/0/Download/karaoke';

  Future<void> initialize() async {
    if (_initialized) return;

    try {
      final directory = await getExternalStorageDirectory();
      if (directory != null) {
        final dbFile = File('${directory.path}/db.ini');
        if (await dbFile.exists()) {
          final lines = await dbFile.readAsLines();
          for (var line in lines) {
            final parts = line.split('|');
            if (parts.length >= 4) {
              final song = Song(
                code: parts[0].trim(),
                artist: parts[1].trim(),
                title: parts[2].trim(),
                videoUrl: '${_mediaPath}/${parts[3].trim()}',
              );
              _songs[song.code] = song;
            }
          }
        }
      }
    } catch (e) {
      print('Error loading song database: $e');
      // Carregar algumas músicas de exemplo para teste
      _loadMockSongs();
    }

    _initialized = true;
  }

  void _loadMockSongs() {
    final mockSongs = [
      Song(
        code: '12345',
        artist: 'Test Artist',
        title: 'Test Song',
        videoUrl: 'https://example.com/test.mp4',
      ),
      // Adicione mais músicas de exemplo conforme necessário
    ];

    for (var song in mockSongs) {
      _songs[song.code] = song;
    }
  }

  Song? findSong(String code) {
    return _songs[code];
  }

  List<Song> searchSongs(String query) {
    query = query.toLowerCase();
    return _songs.values.where((song) {
      return song.title.toLowerCase().contains(query) ||
             song.artist.toLowerCase().contains(query) ||
             song.code.toLowerCase().contains(query);
    }).toList();
  }
}