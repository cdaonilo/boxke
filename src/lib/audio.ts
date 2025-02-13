export class AudioProcessor {
  private context: AudioContext;
  private source: MediaElementAudioSourceNode | null = null;
  private pitchNode: any = null;
  private gainNode: GainNode | null = null;
  private connectedElement: HTMLMediaElement | null = null;

  constructor() {
    this.context = new AudioContext();
  }

  connectToVideo(videoElement: HTMLVideoElement) {
    // If already connected to this element, just return
    if (this.connectedElement === videoElement) {
      return;
    }

    // Disconnect existing nodes
    this.disconnect();

    try {
      // Create new audio source from video
      this.source = this.context.createMediaElementSource(videoElement);
      this.gainNode = this.context.createGain();
      this.connectedElement = videoElement;

      // Create pitch shifter node
      this.pitchNode = this.context.createScriptProcessor(4096, 1, 1);

      // Connect nodes
      this.source.connect(this.pitchNode);
      this.pitchNode.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
    } catch (error) {
      console.error("Error connecting audio processor:", error);
      this.disconnect();
    }
  }

  setPitch(semitones: number) {
    if (!this.pitchNode) return;

    const pitch = Math.pow(2, semitones / 12);
    let phase = 0;

    this.pitchNode.onaudioprocess = (e: AudioProcessingEvent) => {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);

      for (let i = 0; i < input.length; i++) {
        // Simple pitch shifting using phase vocoder technique
        const index = Math.floor(phase);
        if (index < input.length) {
          output[i] = input[index];
        }
        phase += pitch;
      }

      if (phase >= input.length) {
        phase -= input.length;
      }
    };
  }

  disconnect() {
    if (this.source) {
      try {
        this.source.disconnect();
      } catch (error) {
        console.error("Error disconnecting source:", error);
      }
      this.source = null;
    }
    if (this.pitchNode) {
      try {
        this.pitchNode.disconnect();
      } catch (error) {
        console.error("Error disconnecting pitch node:", error);
      }
      this.pitchNode = null;
    }
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch (error) {
        console.error("Error disconnecting gain node:", error);
      }
      this.gainNode = null;
    }
    this.connectedElement = null;
  }
}

export const audioProcessor = new AudioProcessor();
