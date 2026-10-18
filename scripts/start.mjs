// One command to run everything locally: the atlas (port 3016), the AI bridge (port 3017),
// and the browser once the atlas answers. Ctrl+C stops both.
// Usage: npm start
import {spawn} from 'node:child_process';
const npm=process.platform==='win32'?'npm.cmd':'npm';
const children=['dev','bridge'].map(script=>{
 const child=spawn(npm,['run','--silent',script],{stdio:['ignore','pipe','pipe']});
 const tag=script==='dev'?'[atlas] ':'[puente] ';
 for(const stream of [child.stdout,child.stderr])stream.on('data',d=>process.stdout.write(String(d).split('\n').filter(Boolean).map(l=>tag+l).join('\n')+'\n'));
 return child;
});
const stop=()=>{for(const child of children)child.kill();process.exit(0);};
process.on('SIGINT',stop);process.on('SIGTERM',stop);
// The atlas is essential; the bridge may already be running elsewhere (port in use), so its exit only warns.
children[0].on('exit',code=>{console.log(`The atlas stopped (code ${code}).`);stop();});
children[1].on('exit',code=>{if(code)console.log('[puente] Not started here (it may already be running on port 3017). The atlas keeps running.');});
const url='http://localhost:3016';
for(let i=0;i<60;i++){
 try{if((await fetch(url)).ok)break;}catch{/* Not ready yet. */}
 await new Promise(r=>setTimeout(r,500));
}
const opener=process.platform==='darwin'?'open':process.platform==='win32'?'explorer':'xdg-open';
spawn(opener,[url],{stdio:'ignore',detached:true}).unref();
console.log(`\nHuman Atlas: ${url}  ·  Ctrl+C para pararlo todo\n`);
