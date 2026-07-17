import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
export async function POST(req:Request){const fd=await req.formData(); const file=fd.get('file') as File|null; if(!file)return NextResponse.json({error:'No file'}, {status:400}); const buf=Buffer.from(await file.arrayBuffer()); let text=''; if(file.name.endsWith('.docx')) text=(await mammoth.extractRawText({buffer:buf})).value; else if(file.name.endsWith('.pdf')) text=(await pdf(buf)).text; else text=buf.toString('utf8'); return NextResponse.json({text,requiresVerification:true});}
