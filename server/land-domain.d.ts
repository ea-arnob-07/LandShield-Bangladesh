import type { ApplicationInput,DeedFields,RoutingResult } from '../src/land/types';
export class DomainError extends Error { status:number; constructor(message:string,status?:number) }
export const RULE_VERSION:string;
export function normalizeDigits(text:string):string;
export function emptyDeedFields():DeedFields;
export function extractDeedFields(text:string):DeedFields;
export function routeApplication(input:Partial<ApplicationInput>):RoutingResult;
