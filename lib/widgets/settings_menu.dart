import 'package:flutter/material.dart';
import 'package:shared_preferences.dart';

class SettingsMenu extends StatefulWidget {
  final VoidCallback onClose;

  const SettingsMenu({super.key, required this.onClose});

  @override
  State<SettingsMenu> createState() => _SettingsMenuState();
}

class _SettingsMenuState extends State<SettingsMenu> {
  bool _useExternalStorage = false;
  bool _showNotes = true;
  bool _autoplay = true;
  bool _highQuality = true;
  double _volume = 80;
  int _credits = 10;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _useExternalStorage = prefs.getBool('useExternalStorage') ?? false;
      _showNotes = prefs.getBool('showNotes') ?? true;
      _autoplay = prefs.getBool('autoplay') ?? true;
      _highQuality = prefs.getBool('highQuality') ?? true;
      _volume = prefs.getDouble('volume') ?? 80;
      _credits = prefs.getInt('credits') ?? 10;
    });
  }

  Future<void> _saveSettings() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('useExternalStorage', _useExternalStorage);
    await prefs.setBool('showNotes', _showNotes);
    await prefs.setBool('autoplay', _autoplay);
    await prefs.setBool('highQuality', _highQuality);
    await prefs.setDouble('volume', _volume);
    await prefs.setInt('credits', _credits);
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.grey[900],
      child: Container(
        width: 400,
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Settings',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: widget.onClose,
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSettingsSection(),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingsSection() {
    return Column(
      children: [
        _buildSwitchSetting(
          'Use External Storage',
          _useExternalStorage,
          (value) {
            setState(() => _useExternalStorage = value);
            _saveSettings();
          },
          'Enable to read karaoke files from external USB drive',
        ),
        const SizedBox(height: 16),
        _buildSwitchSetting(
          'Show Score Notes',
          _showNotes,
          (value) {
            setState(() => _showNotes = value);
            _saveSettings();
          },
          'Show musical notes during score display',
        ),
        const SizedBox(height: 16),
        _buildSwitchSetting(
          'Autoplay Next Song',
          _autoplay,
          (value) {
            setState(() => _autoplay = value);
            _saveSettings();
          },
        ),
        const SizedBox(height: 16),
        _buildSwitchSetting(
          'High Quality Video',
          _highQuality,
          (value) {
            setState(() => _highQuality = value);
            _saveSettings();
          },
        ),
      ],
    );
  }

  Widget _buildSwitchSetting(
    String title,
    bool value,
    Function(bool) onChanged, [
    String? subtitle,
  ]) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title),
            Switch(
              value: value,
              onChanged: onChanged,
              activeColor: Colors.blue,
            ),
          ],
        ),
        if (subtitle != null)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              subtitle,
              style: TextStyle(fontSize: 12, color: Colors.grey[400]),
            ),
          ),
      ],
    );
  }
}
