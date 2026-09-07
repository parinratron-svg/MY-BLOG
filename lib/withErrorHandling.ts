type Handler<TContext> = (req: Request, ctx: TContext) => Promise<Response>;
export function withErrorHandling<TContext>(handler: Handler<TContext>): Handler<TContext> {
 return async (req, ctx) => {
 try {
 return await handler(req, ctx);
 }  catch (err) {
 console.error('API Error:', err);
 const error = err as { message?: string; status?: number };
 const status = error.status ?? 500;
 return Response.json({ error: error.message ?? 'เกิดข้อผิดพลาด' }, { status });
 }
 }
}
 
