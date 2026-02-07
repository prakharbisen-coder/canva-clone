// Authentication disabled - all routes are publicly accessible
export function middleware() {
  // No authentication required
  return;
}

export const config = {
  matcher: [],
};
