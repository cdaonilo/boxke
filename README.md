# MXQ Karaoke

Um aplicativo de karaokê profissional desenvolvido especificamente para o MXQ 4K Pro, permitindo que os usuários insiram códigos de músicas e reproduzam vídeos de karaokê de um dispositivo de armazenamento externo.

## Características

- Interface profissional de karaokê
- Suporte a armazenamento externo USB
- Sistema de créditos
- Fila de músicas
- Menu de configurações (tecla F)
- Exibição de pontuação
- Controles de vídeo completos
- Animações e efeitos visuais
- Otimizado para TV Box MXQ 4K Pro

## Requisitos

- Flutter SDK
- Android SDK
- MXQ 4K Pro ou dispositivo Android compatível
- Armazenamento externo para arquivos de karaokê

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/mxq-karaoke.git
```

2. Instale as dependências:
```bash
flutter pub get
```

3. Execute o aplicativo:
```bash
flutter run
```

## Build

Para gerar o APK de release:
```bash
flutter build apk --release
```

O APK será gerado em: `build/app/outputs/flutter-apk/app-release.apk`

## Estrutura do Projeto

```
lib/
  ├── main.dart
  ├── models/
  │   └── song.dart
  ├── screens/
  │   └── home_screen.dart
  ├── services/
  │   └── song_library.dart
  └── widgets/
      ├── animated_background.dart
      ├── credits_display.dart
      ├── error_message.dart
      ├── info_bar.dart
      ├── numeric_input.dart
      ├── queue_display.dart
      ├── score_display.dart
      ├── settings_menu.dart
      └── video_player.dart
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
