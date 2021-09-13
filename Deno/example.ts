const listener = Deno.listen({ port: 8000 });
console.log("http://localhost:8000/");
for await (const conn of listener) {
  (async () => {
    const requests = Deno.serveHttp(conn);
    console.log("New Conn")
    for await (const { respondWith } of requests) {
      respondWith(new Response("Hello world"));
    }
  })();
}