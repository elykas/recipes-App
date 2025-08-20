import { IPolicy } from "../dto/policyDto";
import prisma from "../config/database";
import { PolicyType} from "@prisma/client";

export const pgCreatePolicy = async (policies: IPolicy[]): Promise<void> => {
  await prisma.policy.createMany({
    data: policies.map((policy) => ({
      type: policy.type,
      version: policy.version,
      language: policy.language,
      content: policy.content,
    })),
    skipDuplicates: true, 
  });
};

export const pgGetPolicyAndTerms = async (
  language: string,
  version: string
): Promise<IPolicy[] | null> => {
  const policies = await prisma.policy.findMany({
    where: {
      version,
      language,
      type: {
        in: [PolicyType.TermsOfService, PolicyType.PrivacyPolicy],
      },
    },
    orderBy: {
      type: "asc", 
    },
  });

  return policies.length > 0 ? policies : null;
};