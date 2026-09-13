export interface SessionUser {
  id:string;
  displayName:string;
  email:string|null;
  localPreview:boolean;
  isAdmin:boolean;
  provider?:'password'|'demo'|'platform';
  isDemo?:boolean;
  phone?:string;
  district?:string;
  address?:string;
  createdAt?:string;
}
export interface Session {
  authenticated:boolean;
  user:SessionUser|null;
  aiAvailable?:boolean;
}

function relativeReturnPath(value:string):string {
  if(!value.startsWith('/')||value.startsWith('//'))return '/';
  try {
    const url=new URL(value,'https://app.local');
    if(url.origin!=='https://app.local'||['/signin-with-platform','/signout-with-platform','/callback'].includes(url.pathname))return '/';
    return `${url.pathname}${url.search}${url.hash}`;
  }catch{return '/';}
}

// Dispatch owns these routes. Use a normal top-level anchor, never fetch.
export const signInPath=(returnTo='/#/account')=>`/signin-with-platform?return_to=${encodeURIComponent(relativeReturnPath(returnTo))}`;
export const signOutPath=()=>'/signout-with-platform?return_to=%2F';
