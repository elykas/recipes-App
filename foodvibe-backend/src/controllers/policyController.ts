import { Request, Response, NextFunction } from "express";
import errorResponse from "../utils/errors/errors";
import { createPolicyService, getPolicyAndTermsService } from "../services/policyService";
import { get } from "http";

export const createPolicies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const policies = req.body.policies;
    if (!Array.isArray(policies) || policies.length === 0) {
      throw errorResponse("Invalid policies data", 400);
    }

    await createPolicyService(policies);
    res
      .status(201)
      .json({ message: "Policies created successfully", success: true });
  } catch (error) {
    next(error);
  }
};


export const getPolicyAndTerms = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
        const { language, version } = req.query;
        const policies = await getPolicyAndTermsService(
            language as string,
            version as string
        );
        res.status(200).json({ data: policies, message: "Policies fetched successfully", success: true });

    } catch (error) {
        next(error);
    }
}