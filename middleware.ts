import { auth } from "@/auth"
import { NextResponse } from 'next/server'

// at any point, if the user is not authenticated and tries to access pages other than the root, redirect them to the root.
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (req.auth && req.nextUrl.pathname === "/"){
    const newUrl = new URL("/home", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}