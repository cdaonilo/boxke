class Song {
  final String code;
  final String artist;
  final String title;
  final String verse;
  final String videoUrl;
  final int tone;

  const Song({
    required this.code,
    required this.artist,
    required this.title,
    this.verse = '',
    required this.videoUrl,
    this.tone = 0,
  });

  Song copyWith({
    String? code,
    String? artist,
    String? title,
    String? verse,
    String? videoUrl,
    int? tone,
  }) {
    return Song(
      code: code ?? this.code,
      artist: artist ?? this.artist,
      title: title ?? this.title,
      verse: verse ?? this.verse,
      videoUrl: videoUrl ?? this.videoUrl,
      tone: tone ?? this.tone,
    );
  }
}