import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.string(),
    budget: v.optional(v.string()),
    phone: v.string(),
    details: v.optional(v.string()),
    emailSent: v.boolean(),
  }).index("by_email", ["email"]),
});
