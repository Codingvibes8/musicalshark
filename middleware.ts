import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {


    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    await supabase.auth.getSession();
    return res;

}

// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL,
// process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);