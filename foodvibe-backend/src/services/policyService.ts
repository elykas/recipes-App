import { pgCreatePolicy, pgGetPolicyAndTerms } from "../DAL/policyDal";
import { IPolicy } from "../dto/policyDto";
import  errorResponse  from "../utils/errors/errors";

export const createPolicyService = async (policies: IPolicy[]): Promise<void> => {
  await pgCreatePolicy(policies);
}

export const getPolicyAndTermsService = async (language: string, version: string) => {
    const policies = await pgGetPolicyAndTerms(language, version);
    if (!policies || policies.length === 0) {
        throw errorResponse("Policies not found for the specified language and version.", 404);
    }
    const policiesDto = policies.map(policy => ({
        content: policy.content,
        version: policy.version
    }));
    return policiesDto;
}