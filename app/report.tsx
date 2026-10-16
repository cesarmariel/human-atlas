import {useEffect,useMemo,useState} from 'react';
import {FileText,Loader2,Trash2,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {AnatomySex,Atlas,Concept} from './anatomy';
import {localName,type Lang,type NameTable,type Strings} from './i18n';

/** The local bridge started with `npm run bridge` (bridge/server.mjs). */
const BRIDGE='http://127.0.0.1:3017';
const STORAGE_KEY='human-atlas-reports';
const MAX_BYTES=60*1024*1024;

export interface Finding {structure:string;label?:string;atlas_name:string;side:'left'|'right'|'both'|'none';severity:'normal'|'mild'|'moderate'|'severe'|'unclear';finding:string;quote:string;source:'report'|'image'}
export interface ReportResult {summary:string;findings:Finding[];glossary:{term:string;meaning:string}[];questions:string[];limitations:string}
interface SavedReport {id:string;date:string;sex:AnatomySex;provider:string;files:string[];result:ReportResult}
interface Provider {id:string;label:string;accepts:string[];available:boolean}

function loadSaved():SavedReport[]{try{const raw=localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw) as SavedReport[]:[];}catch{return [];}}
function storeSaved(list:SavedReport[]){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(list));}catch{/* Not persisted; the analysis stays visible until the page reloads. */}}

const STOP=new Set(['of','the','part','and','muscle','set']);
const tokens=(s:string)=>s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w&&!STOP.has(w));
/** Finds the atlas concept for a finding: the model's exact atlas name first, then the closest name by shared words. */
export function locate(atlas:Atlas,finding:Finding):{concept:Concept;exact:boolean}|undefined{
 const byName=new Map<string,Concept>();
 for(const p of atlas.parts)byName.set(p.name.toLowerCase(),{id:p.conceptId,name:p.name,elements:[p.id]});
 for(const c of atlas.concepts)byName.set(c.name.toLowerCase(),c);
 const sided=finding.side==='left'||finding.side==='right'?`${finding.side} ${finding.structure}`:finding.structure;
 for(const name of [finding.atlas_name,sided,finding.structure]){const c=name&&byName.get(name.toLowerCase());if(c)return {concept:c,exact:name===finding.atlas_name};}
 const want=new Set(tokens(sided));if(!want.size)return undefined;
 let best:Concept|undefined,score=0;
 for(const [name,c] of byName){const have=tokens(name);const shared=have.filter(w=>want.has(w)).length;if(!shared)continue;const s=shared/new Set([...have,...want]).size;if(s>score||(s===score&&best&&c.elements.length<best.elements.length)){score=s;best=c;}}
 return best&&score>=.5?{concept:best,exact:false}:undefined;
}

function readFile(file:File){return new Promise<{name:string;type:string;data:string}>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve({name:file.name,type:file.type||(file.name.endsWith('.txt')?'text/plain':'application/octet-stream'),data:String(reader.result).split(',')[1]??''});reader.onerror=()=>reject(reader.error);reader.readAsDataURL(file);});}

interface Props {atlas:Atlas;sex:AnatomySex;lang:Lang;t:Strings;names:NameTable|null;onClose:()=>void;onInspect:(concept:Concept)=>void;onShowAll:(ids:string[])=>void}
export default function ReportPanel({atlas,sex,lang,t,names,onClose,onInspect,onShowAll}:Props){
 const [providers,setProviders]=useState<Provider[]|null>(null),[bridgeDown,setBridgeDown]=useState(false),[provider,setProvider]=useState(''),[files,setFiles]=useState<File[]>([]),[notes,setNotes]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState<SavedReport[]>(loadSaved),[current,setCurrent]=useState<string|null>(()=>loadSaved()[0]?.id??null);
 const checkBridge=()=>{setBridgeDown(false);fetch(`${BRIDGE}/providers`).then(r=>r.json() as Promise<{providers:Provider[]}>).then(d=>{setProviders(d.providers);setProvider(p=>p||d.providers.find(x=>x.available)?.id||'');}).catch(()=>setBridgeDown(true));};
 useEffect(checkBridge,[]);
 const report=saved.find(r=>r.id===current);
 const located=useMemo(()=>report&&report.sex===sex?report.result.findings.map(f=>({finding:f,match:locate(atlas,f)})):[],[report,atlas,sex]);
 const allIds=[...new Set(located.flatMap(l=>l.match?.concept.elements??[]))];
 const chosen=providers?.find(p=>p.id===provider);
 const analyze=async()=>{
  setError('');
  if(!chosen||!files.length)return;
  if(files.reduce((n,f)=>n+f.size,0)>MAX_BYTES){setError(t.reportTooLarge);return;}
  setBusy(true);
  try{
   const payload=await Promise.all(files.map(readFile));
   const structures=[...new Set([...atlas.parts.map(p=>p.name),...atlas.concepts.map(c=>c.name)])];
   const res=await fetch(`${BRIDGE}/analyze`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({provider:chosen.id,lang,sex,notes,files:payload,structures})});
   const data=await res.json() as {result?:ReportResult;error?:string};
   if(!res.ok||!data.result)throw new Error(data.error||`HTTP ${res.status}`);
   const entry:SavedReport={id:String(Date.now()),date:new Date().toISOString(),sex,provider:chosen.label,files:files.map(f=>f.name),result:data.result};
   const next=[entry,...saved];setSaved(next);storeSaved(next);setCurrent(entry.id);setFiles([]);
  }catch(e){setError(e instanceof Error?e.message:String(e));}
  finally{setBusy(false);}
 };
 const remove=(id:string)=>{const next=saved.filter(r=>r.id!==id);setSaved(next);storeSaved(next);if(current===id)setCurrent(next[0]?.id??null);};
 const label=(c:Concept)=>localName(c.name,lang,names);
 return <section className="search-panel report-panel glass" aria-label={t.reportTitle}>
  <div className="panel-heading"><span>{t.reportTitle}</span><Button variant="ghost" className="icon-button" onClick={onClose} aria-label={t.reportClose}><X size={18}/></Button></div>
  <div className="report-scroll">
   <p className="report-note">{t.reportDisclaimer}</p>
   {bridgeDown?<div className="report-bridge"><p>{t.reportBridgeDown}</p><code>npm run bridge</code><Button variant="ghost" onClick={checkBridge}>{t.reportRetry}</Button></div>:
   providers&&<div className="report-form">
    <label>{t.reportProvider}<select value={provider} onChange={e=>setProvider(e.target.value)}>{providers.map(p=><option key={p.id} value={p.id} disabled={!p.available}>{p.label}{p.available?'':` · ${t.reportUnavailable}`}</option>)}</select></label>
    {!providers.some(p=>p.available)&&<p className="report-note">{t.reportNoProvider}</p>}
    <label>{t.reportFiles}<input type="file" multiple accept={[chosen?.accepts.includes('pdf')&&'application/pdf',chosen?.accepts.includes('image')&&'image/*','.txt,text/plain'].filter(Boolean).join(',')} onChange={e=>setFiles([...(e.target.files??[])])}/></label>
    <label>{t.reportNotes}<textarea rows={2} value={notes} maxLength={4000} placeholder={t.reportNotesPlaceholder} onChange={e=>setNotes(e.target.value)}/></label>
    <p className="report-note">{t.reportPrivacy}</p>
    <Button className="primary-action" disabled={busy||!chosen?.available||!files.length} onClick={analyze}>{busy?<Loader2 size={16} className="spin"/>:<FileText size={16}/>}{busy?t.reportAnalyzing:t.reportAnalyze}</Button>
    {error&&<p className="report-error" role="alert">{error}</p>}
   </div>}
   {saved.length>0&&<div className="report-history"><h3>{t.reportSaved}</h3>{saved.map(r=><div key={r.id} className={`report-item ${r.id===current?'active':''}`}><Button variant="ghost" onClick={()=>setCurrent(r.id)}>{new Date(r.date).toLocaleDateString(lang==='es'?'es-ES':'en-US')} · {r.files.join(', ')}</Button><Button variant="ghost" className="icon-button" aria-label={t.reportDelete} onClick={()=>remove(r.id)}><Trash2 size={14}/></Button></div>)}</div>}
   {report&&<div className="report-result">
    {report.sex!==sex&&<p className="report-note">{report.sex==='female'?t.reportOtherFemale:t.reportOtherMale}</p>}
    <h3>{t.reportSummary}</h3><p>{report.result.summary}</p>
    {located.length>0&&<><div className="report-findings-head"><h3>{t.reportFindings}</h3>{allIds.length>0&&<Button variant="ghost" onClick={()=>onShowAll(allIds)}>{t.reportShowAll}</Button>}</div>
    <ul className="report-findings">{located.map(({finding,match},i)=><li key={i} className={`severity-${finding.severity}`}>
     <div className="finding-head"><strong>{match?.exact?label(match.concept):finding.label||finding.structure}</strong><span className="severity">{t.severity[finding.severity]}</span></div>
     <p>{finding.finding}</p>{finding.quote&&<q>{finding.quote}</q>}
     {match?<>{!match.exact&&<span className="report-note">{t.reportApprox(label(match.concept))}</span>}<Button variant="ghost" onClick={()=>onInspect(match.concept)}>{t.reportLocate}</Button></>:<span className="report-note">{t.reportNotInAtlas}</span>}
    </li>)}</ul></>}
    {report.result.glossary.length>0&&<><h3>{t.reportGlossary}</h3><dl>{report.result.glossary.map((g,i)=><div key={i}><dt>{g.term}</dt><dd>{g.meaning}</dd></div>)}</dl></>}
    {report.result.questions.length>0&&<><h3>{t.reportQuestions}</h3><ul>{report.result.questions.map((q,i)=><li key={i}>{q}</li>)}</ul></>}
    {report.result.limitations&&<p className="report-note">{report.result.limitations}</p>}
    <p className="report-note">{t.reportBy(report.provider)}</p>
   </div>}
  </div>
 </section>;
}
