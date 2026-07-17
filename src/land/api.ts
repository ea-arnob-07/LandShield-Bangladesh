export class ApiError extends Error {
  readonly status:number;
  constructor(message:string,status:number){super(message);this.name='ApiError';this.status=status;}
}
export async function api<T>(path:string, options:RequestInit={},timeoutMs=15000):Promise<T>{
  const controller=new AbortController(),abort=()=>controller.abort();
  if(options.signal?.aborted)controller.abort();
  options.signal?.addEventListener('abort',abort,{once:true});
  const timer=setTimeout(abort,timeoutMs);
  const headers=new Headers(options.headers);
  if(options.body&&!(options.body instanceof FormData)&&!headers.has('content-type'))headers.set('content-type','application/json');
  try{
    const response=await fetch(`/api${path}`,{credentials:'same-origin',...options,signal:controller.signal,headers});
    if(response.status===401&&typeof window!=='undefined')window.dispatchEvent(new Event('ns-session-expired'));
    let json;
    try{json=await response.json();}catch(e){if(e instanceof Error&&e.name==='AbortError')throw e;throw new ApiError('সেবার উত্তর পড়া যাচ্ছে না। আবার চেষ্টা করুন।',response.status);}
    if(!response.ok){
      throw new ApiError(json.error||'সেবাটি পাওয়া যাচ্ছে না।',response.status);
    }
    return json;
  }catch(e){
    if(e instanceof Error&&e.name==='AbortError'&&!options.signal?.aborted)throw new ApiError('সেবাটি সাড়া দিতে সময় নিচ্ছে। আবার চেষ্টা করুন।',408);
    throw e;
  }finally{clearTimeout(timer);options.signal?.removeEventListener('abort',abort);}
}
export const post=<T>(path:string,data:unknown,timeoutMs=15000)=>api<T>(path,{method:'POST',body:JSON.stringify(data)},timeoutMs);
