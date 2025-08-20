import { ExtractWSRequestFrom } from "@beatsync/shared";
import { sendBroadcast } from "../../utils/responses";
import { requireCanMutate } from "../middlewares";
import { HandlerFunction } from "../types";

export const handlePlay: HandlerFunction<
  ExtractWSRequestFrom["PLAY"]
> = async ({ ws, message, server }) => {
  const { room } = requireCanMutate(ws);

  // Use dynamic scheduling based on max client RTT
  const serverTimeToExecute = room.getScheduledExecutionTime();

  // Update playback state - now returns false if track doesn't exist
  const success = room.updatePlaybackSchedulePlay(message, serverTimeToExecute);
  
  if (!success) {
    // Track doesn't exist, don't broadcast the play command
    console.warn(`Play command rejected - track not in queue: ${message.audioSource}`);
    return;
  }

  sendBroadcast({
    server,
    roomId: ws.data.roomId,
    message: {
      type: "SCHEDULED_ACTION",
      scheduledAction: message,
      serverTimeToExecute: serverTimeToExecute,
      // Dynamic delay based on actual client RTTs
    },
  });
};
