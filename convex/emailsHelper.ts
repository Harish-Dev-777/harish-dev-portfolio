import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const updateEmailStatus = internalMutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, { emailSent: true });
  },
});
