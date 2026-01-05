const autocannon = require("autocannon");
const app = require("../../index");

function runBench({ url, connections = 50, duration = 10, pipelining = 1 }) {
  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url,
        connections,
        duration,
        pipelining,
        // headers: { Authorization: "Bearer ..." }, // si ocupas auth
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    autocannon.track(instance, { renderProgressBar: true });
  });
}

(async () => {
  // Levantar server SOLO para benchmark (puerto temporal)
  const server = app.listen(0, async () => {
    const { port } = server.address();
    const url = `http://localhost:${port}/`;

    console.log("\n=== Autocannon benchmark ===");
    console.log(`URL: ${url}`);

    try {
      const result = await runBench({
        url,
        connections: 50, // usuarios concurrentes
        duration: 10,    // segundos
        pipelining: 1
      });

      // Resultados clave
      console.log("\n--- Resultados ---");
      console.log("Req/s avg:", result.requests.average);
      console.log("Req/s p50:", result.requests.p50);
      console.log("Req/s p99:", result.requests.p99);

      console.log("Latency avg (ms):", result.latency.average);
      console.log("Latency p50 (ms):", result.latency.p50);
      console.log("Latency p90 (ms):", result.latency.p90);
      console.log("Latency p99 (ms):", result.latency.p99);

      console.log("Errors:", result.errors);
      console.log("Timeouts:", result.timeouts);
      console.log("Non2xx:", result.non2xx);

      process.exitCode = 0;
    } catch (e) {
      console.error("Benchmark error:", e);
      process.exitCode = 1;
    } finally {
      server.close();
    }
  });
})();
