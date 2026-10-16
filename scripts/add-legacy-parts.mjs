// Add meshes that BodyParts3D 4.0 omits (lungs, liver, facial, masticatory and abdominal-wall muscles, ...)
// from BodyParts3D 3.0 (BodyParts3D_3.0_obj_99.zip). The list, display systems and concept membership
// (from the 3.0 composite_parts.txt table) live in scripts/legacy-parts.json.
// Usage: node scripts/add-legacy-parts.mjs DIRECTORY_WITH_THE_LISTED_OBJ_FILES
// Run after optimize-anatomy.mjs and compress-models.mjs. The meshes go into their own chunk so the
// CC BY-SA 2.1 Japan geometry stays separate from the CC BY 4.0 chunks (see public/ATTRIBUTION.md).
import fs from 'node:fs';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {MeshoptSimplifier} from 'meshoptimizer';
await MeshoptSimplifier.ready;
const source=process.argv[2];if(!source)throw new Error('Pass the directory containing the BodyParts3D 3.0 OBJ files.');
const spec=JSON.parse(fs.readFileSync(new URL('legacy-parts.json',import.meta.url),'utf8'));
const dir=new URL('../public/models/',import.meta.url),manifestUrl=new URL('atlas.json',dir),atlas=JSON.parse(fs.readFileSync(manifestUrl,'utf8'));
if(atlas.parts.some(p=>p.id.startsWith('BP3-')))throw new Error('BodyParts3D 3.0 meshes are already in the atlas.');
const segments=[];let bytes=0,triangles=0;
const append=a=>{const padding=(4-bytes%4)%4;if(padding){segments.push(Buffer.alloc(padding));bytes+=padding;}const offset=bytes,b=Buffer.from(a.buffer,a.byteOffset,a.byteLength);segments.push(b);bytes+=b.length;return offset;};
const chunk=atlas.chunks.length,url=`/models/body-${chunk}.bin`,concepts=new Map(atlas.concepts.map(c=>[c.id,c]));
for(const part of spec){
 // Same conversion as convert-anatomy.py: millimeters/Z-up to meters/Y-up on the stage.
 const v=[],n=[],idx=[];
 for(const line of fs.readFileSync(path.join(source,part.file),'utf8').split('\n')){
  const f=line.trim().split(/\s+/);
  if(f[0]==='v'){const [x,y,z]=f.slice(1,4).map(Number);v.push(x*.001,z*.001+.0781112,-y*.001-.1);}
  else if(f[0]==='vn'){const [x,y,z]=f.slice(1,4).map(Number);n.push(Math.round(x*32767),Math.round(z*32767),Math.round(-y*32767));}
  else if(f[0]==='f'){const face=f.slice(1).map(s=>parseInt(s,10)-1);for(let j=1;j<face.length-1;j++)idx.push(face[0],face[j],face[j+1]);}
 }
 if(v.length!==n.length||!v.length)throw new Error(`${part.file}: expected one normal per vertex.`);
 // Same simplification bound as optimize-anatomy.mjs, unless it collapses thin parts (such as lung fissure edges) and shrinks the mesh by over 1 mm.
 const pos=new Float32Array(v),normal=new Int16Array(n),sourceIndices=new Uint32Array(idx);
 const target=Math.max(96,Math.floor(sourceIndices.length*.22/3)*3);
 const [simplified]=MeshoptSimplifier.simplify(sourceIndices,pos,3,Math.min(sourceIndices.length,target),.002);
 const [remap,compact]=MeshoptSimplifier.compactMesh(simplified);
 let positions=new Float32Array(compact*3),normals=new Int16Array(compact*3),indices=simplified,count=compact;
 for(let old=0;old<remap.length;old++){const k=remap[old];if(k===0xffffffff)continue;positions.set(pos.subarray(old*3,old*3+3),k*3);normals.set(normal.subarray(old*3,old*3+3),k*3);}
 const box=values=>{const b=[[Infinity,Infinity,Infinity],[-Infinity,-Infinity,-Infinity]];for(let i=0;i<values.length;i++){const a=i%3;b[0][a]=Math.min(b[0][a],values[i]);b[1][a]=Math.max(b[1][a],values[i]);}return b;};
 const full=box(pos);let bounds=box(positions);
 if(bounds.flat().some((value,i)=>Math.abs(value-full.flat()[i])>.001)){positions=pos;normals=normal;indices=sourceIndices;count=v.length/3;bounds=full;}
 const id=`BP3-${part.conceptId}`;
 atlas.parts.push({id,name:part.name,conceptId:part.conceptId,system:part.system,chunk,positions:append(positions),normals:append(normals),indices:append(indices),vertexCount:count,indexCount:indices.length,bounds,source:'BodyParts3D 3.0'});
 triangles+=indices.length/3;
 // Own and organ-level concepts list the new mesh first so the detail panel reports its system.
 for(const c of part.concepts){
  let concept=concepts.get(c.id);
  if(!concept){if(!c.create)continue;concept={id:c.id,name:c.name,elements:[]};concepts.set(c.id,concept);atlas.concepts.push(concept);}
  if(c.first)concept.elements.unshift(id);else concept.elements.push(id);
 }
}
const blob=Buffer.concat(segments),gz=gzipSync(blob,{level:9});
fs.writeFileSync(new URL(url.split('/').pop(),dir),blob);fs.writeFileSync(new URL(`${url.split('/').pop()}.gz`,dir),gz);
atlas.chunks.push({url,bytes:blob.length,gzip:`${url}.gz`,gzipBytes:gz.length,source:'BodyParts3D 3.0',license:'CC BY-SA 2.1 JP'});
atlas.triangles+=triangles;
fs.writeFileSync(manifestUrl,JSON.stringify(atlas));
console.log(JSON.stringify({added:spec.length,concepts:atlas.concepts.length,triangles,bytes:blob.length,gzipBytes:gz.length,chunk:url}));
