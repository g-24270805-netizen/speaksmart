import { z } from 'zod';
export const Status = z.enum(['addressed','partially_addressed','not_addressed','irrelevant','misinterpreted']);
export const Score = z.number().int().min(0).max(5);
const Criterion = z.object({score:Score,bandDescriptor:z.string(),justification:z.string(),evidence:z.array(z.string())});
export const MarkingSchema = z.object({
 submission:z.object({studentName:z.string(),part:z.enum(['part1','part2','part3']),genre:z.enum(['email','guided_writing','story','review','report']),wordCount:z.number().int().nonnegative(),expectedWordRange:z.string(),wordRangeComment:z.string()}),
 taskFulfilment:z.array(z.object({id:z.string(),requirement:z.string(),status:Status,evidence:z.string(),explanation:z.string(),confidence:z.number().min(0).max(1)})),
 scores:z.object({content:Criterion,communicativeAchievement:Criterion,organisation:Criterion,language:Criterion,total:z.number().int().min(0).max(20)}),
 languageAnalysis:z.object({strengths:z.array(z.string()),grammarIssues:z.array(z.object({original:z.string(),suggestedCorrection:z.string(),explanation:z.string(),severity:z.enum(['minor','moderate','serious'])})),vocabularyComments:z.array(z.string()),sentenceStructureComments:z.array(z.string())}),
 feedback:z.object({studentFriendlyFeedback:z.string(),twoStrengths:z.tuple([z.string(),z.string()]),twoPriorities:z.tuple([z.string(),z.string()]),improvedExample:z.string()}),
 moderation:z.object({confidence:z.number().min(0).max(1),requiresTeacherReview:z.boolean(),reviewReasons:z.array(z.string())})
}).refine(v=>v.scores.total===v.scores.content.score+v.scores.communicativeAchievement.score+v.scores.organisation.score+v.scores.language.score,{message:'Total must equal criterion scores'});
export type Marking = z.infer<typeof MarkingSchema>;
export function validateAllContentPoints(marking:Marking, expected:{id:string;requirement:string}[]){const ids=new Set(marking.taskFulfilment.map(p=>p.id)); return expected.every(p=>ids.has(p.id));}
export function detectMissingCompulsorySentence(essay:string, sentence?:string){ if(!sentence) return false; const normal=(s:string)=>s.toLowerCase().replace(/[“”"'.,!?]/g,'').replace(/\s+/g,' ').trim(); return !normal(essay).includes(normal(sentence)); }
