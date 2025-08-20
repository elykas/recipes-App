import { PolicyType} from "@prisma/client";
export interface IPolicy {
    content: string;
    createdAt: Date;
    language: string;
    version: string;
    type: PolicyType,
    }