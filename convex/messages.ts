import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.string(),
    budget: v.optional(v.string()),
    phone: v.string(),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Store the message in the database
    const messageId = await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      company: args.company,
      service: args.service,
      budget: args.budget,
      phone: args.phone,
      details: args.details,
      emailSent: false,
    });

    // Schedule an email notification
    await ctx.scheduler.runAfter(0, internal.emails.sendNotification, {
      messageId,
      name: args.name,
      email: args.email,
      company: args.company,
      service: args.service,
      budget: args.budget,
      phone: args.phone,
      details: args.details,
    });

    return messageId;
  },
});
