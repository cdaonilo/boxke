class Song {
  final String code;
  final String artist;
  final String title;
  final String verse;
  final String videoUrl;
  final String filename;

  const Song({
    required this.code,
    required this.artist,
    required this.title,
    required this.verse,
    required this.videoUrl,
    required this.filename,
  });

  factory Song.fromJson(Map<String, dynamic> json) {
    return Song(
      code: json['code'] as String,
      artist: json['artist'] as String,
      title: json['title'] as String,
      verse: json['verse'] as String,
      videoUrl: json['videoUrl'] as String,
      filename: json['filename'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
    'code': code,
    'artist': artist,
    'title': title,
    'verse': verse,
    'videoUrl': videoUrl,
    'filename': filename,
  };
}
