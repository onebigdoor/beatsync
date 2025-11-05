import { z } from "zod";
import { globalManager } from "../managers";
import { corsHeaders, errorResponse, jsonResponse } from "../utils/responses";

const SetPersistentSchema = z.object({
  roomId: z.string(),
  persistent: z.boolean(),
});

export async function handleSetPersistent(req: Request): Promise<Response> {
  try {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return errorResponse("Method not allowed", 405);
    }

    // Parse and validate request body
    const body = await req.json();
    const parseResult = SetPersistentSchema.safeParse(body);

    if (!parseResult.success) {
      return errorResponse(
        `Invalid request data: ${parseResult.error.message}`,
        400
      );
    }

    const { roomId, persistent } = parseResult.data;

    // Get or create the room
    const room = globalManager.getOrCreateRoom(roomId);

    // Set persistent flag
    room.setPersistent(persistent);

    return jsonResponse({
      success: true,
      roomId,
      persistent,
      message: `Room ${roomId} ${
        persistent ? "marked as persistent" : "marked as non-persistent"
      }`,
    });
  } catch (error) {
    console.error("Error setting room persistence:", error);
    return errorResponse("Failed to set room persistence", 500);
  }
}
