import { z } from "zod";

export const PolicySchema = z.object({
  type: z.enum(["TermsOfService", "PrivacyPolicy"]),
  content: z.string().min(30).max(5000), 
  language: z.string().min(2).max(5),   
  version: z.string().min(1).max(20),
});

export const CreatePoliciesSchema = z.array(PolicySchema)
  .min(2, "At least 2 policies required (terms + privacy)")
  .refine(
    (policies) => {
      const versions = new Set(policies.map((p) => p.version));
      return versions.size === 1;
    },
    { message: "All policies must have the same version" }
  )
  .refine(
    (policies) => {
      const set = new Set(policies.map((p) => `${p.type}-${p.language}`));
      return set.size === policies.length;
    },
    { message: "Duplicate policy (same type & language) is not allowed" }
  );

  export const GetPolicyQuerySchema = z.object({
    language: z.string().min(2).max(5),   
    version: z.string().min(1).max(20),
  });