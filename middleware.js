// Drazen AI crawler x-ray — https://drazen.ai
// Counts visits from AI crawlers (GPTBot, ClaudeBot, PerplexityBot...) so you
// can see which AI engines actually read your site. Human visitors are never
// touched or tracked: no cookies, no analytics, nothing stored about people.
// Fail-silent by design: if Drazen is unreachable, your site doesn't notice.
const AI_BOTS = [["gptbot","GPTBot"],["oai-searchbot","OAI-SearchBot"],["chatgpt-user","ChatGPT-User"],["claudebot","ClaudeBot"],["claude-web","Claude-Web"],["anthropic-ai","Anthropic"],["perplexitybot","PerplexityBot"],["perplexity-user","Perplexity-User"],["google-extended","Google-Extended"],["amazonbot","Amazonbot"],["ccbot","CCBot"],["bytespider","Bytespider"],["meta-externalagent","Meta-ExternalAgent"],["mistralai","MistralAI"]];

export default function middleware(request, event) {
  try {
    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    const hit = AI_BOTS.find(([m]) => ua.includes(m));
    if (hit) {
      const ping = fetch("https://app.drazen.ai/api/xray", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ k: "a7648bec-376c-4e3f-9b80-672a7e0d0fd6.501b31baca0af9", b: hit[1], p: new URL(request.url).pathname }),
      }).catch(() => {});
      if (event && event.waitUntil) event.waitUntil(ping);
    }
  } catch (e) {}
}

export const config = { matcher: ["/((?!_next/|api/|.*\\..*).*)"] };
