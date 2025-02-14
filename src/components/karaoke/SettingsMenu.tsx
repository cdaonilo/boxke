import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Coins, Volume2, Settings2 } from "lucide-react";

interface SettingsMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
  showNotes?: boolean;
  onShowNotesChange?: (show: boolean) => void;
}

const SettingsMenu = ({
  isOpen = true,
  onClose = () => {},
  showNotes = true,
  onShowNotesChange = () => {},
}: SettingsMenuProps) => {
  const [credits, setCredits] = useState(10);
  const [volume, setVolume] = useState(80);
  const [autoplay, setAutoplay] = useState(true);
  const [highQuality, setHighQuality] = useState(true);
  const [useCustomBackground, setUseCustomBackground] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <Settings2 className="inline-block mr-2" />
            Karaoke Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="credits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
            <TabsTrigger
              value="credits"
              className="data-[state=active]:bg-zinc-700"
            >
              <Coins className="mr-2" />
              Credit System
            </TabsTrigger>
            <TabsTrigger
              value="playback"
              className="data-[state=active]:bg-zinc-700"
            >
              <Volume2 className="mr-2" />
              Playback Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credits">
            <Card className="border-zinc-700 bg-zinc-800">
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="current-credits">Current Credits</Label>
                  <Input
                    id="current-credits"
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Credit Settings</Label>
                  <div className="flex items-center justify-between">
                    <span>Auto-deduct credits</span>
                    <Switch checked={true} onCheckedChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Credits per song</span>
                    <Input
                      type="number"
                      value="1"
                      className="w-24 bg-zinc-700 border-zinc-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playback">
            <Card className="border-zinc-700 bg-zinc-800">
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <Label>Volume</Label>
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Autoplay next song</span>
                    <Switch checked={autoplay} onCheckedChange={setAutoplay} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>High quality video</span>
                    <Switch
                      checked={highQuality}
                      onCheckedChange={setHighQuality}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Show Score Notes</span>
                    <Switch
                      checked={showNotes}
                      onCheckedChange={onShowNotesChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Use Custom Background</span>
                    <Switch
                      checked={useCustomBackground}
                      onCheckedChange={(checked) => {
                        setUseCustomBackground(checked);
                        localStorage.setItem(
                          "useCustomBackground",
                          checked.toString(),
                        );
                      }}
                    />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full bg-zinc-700 hover:bg-zinc-600"
                  onClick={() => {}}
                >
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;
