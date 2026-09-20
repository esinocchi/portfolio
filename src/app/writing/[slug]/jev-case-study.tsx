const repo = 'https://github.com/esinocchi/jev-tool-router/blob/main';

function Figure({ name, alt, caption }: { name: 'routing-benchmark-100' | 'agent-benchmark-100'; alt: string; caption: string }) {
  return (
    <figure>
      <picture>
        <source media="(max-width: 640px)" srcSet={`/writing/jev-tool-router/${name}-mobile.svg`} />
        <img src={`/writing/jev-tool-router/${name}.svg`} alt={alt} className="h-auto w-full rounded-sm border border-border" />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function JevCaseStudy() {
  return (
    <>
      <p>An agent often has a long menu of tools to choose from before it can answer a request. I wondered whether Jev, a smaller model focused on that choice, could make it quickly and cheaply. Then I had a more practical question: if Jev trims the menu before Luna sees it, does the person waiting for an answer actually benefit? I built <a href={`${repo}/README.md`}>Jev Tool Router</a> to test both ideas.</p>
      <p>I gave both tests the <a href={`${repo}/experiments/shared_cases.json`}>same 100 made-up requests</a>. They included 47 reading tasks, 21 cases needing approval, 13 ambiguous requests, ten questions needing no tool, and nine requests the 16 available tools could not handle. I repeated each test three times and gave Jev up to three seconds to choose a tool. The numbers below are <strong>medians</strong> (the middle result of three runs); ranges show the lowest and highest run. All six <a href={`${repo}/experiments/published/`}>reports</a> have complete cost data. <strong>Costs are estimates based on configured token prices, not invoices.</strong></p>
      <aside aria-labelledby="summary-heading" className="article-summary mb-10 mt-8 border-b border-border pb-8">
        <h2 id="summary-heading" className="section-label">TL;DR</h2>
        <p>Jev was quick and inexpensive when its only job was choosing a tool. When I put it in front of an agent, estimated API cost fell by about 26% at the medians, but people would have waited longer for reading tasks.</p>
      </aside>

      <h2>Test 1: Jev makes the routing decision</h2>
      <p>First, I stopped the experiment at the moment of choice. Jev and Luna (<code>openai/gpt-5.6-luna</code>) each picked a type of tool and a specific tool for every request. Neither went on to do the task. I scored <strong>tool fit</strong> on the 81 requests with an acceptable tool: was the choice suitable? That score <strong>does not say whether the full task succeeded</strong>. Some requests with a suitable tool still needed a clarifying question before anyone should proceed.</p>
      <Figure name="routing-benchmark-100" alt="Three-run routing medians: Jev tool fit 76 of 81 versus Luna 77 of 81; mean routing latency 419 versus 2,459 milliseconds; estimated cost per 100 prompts $0.00486 versus $0.03673." caption="Standalone routing on the shared 100 prompts. Values are medians of three runs." />
      <p>The choices were close: Jev picked a suitable tool for a median <strong>76 of 81</strong> scored requests (range 76–76), while Luna did so for <strong>77 of 81</strong> (76–77). The time and price were less close. Jev took a median average of <strong>419 ms</strong> per request (405–426 ms), versus <strong>2,459 ms</strong> for Luna (2,383–2,539 ms). Estimated cost for 100 requests was <strong>$0.00486</strong> (range $0.00484–$0.00486) versus <strong>$0.03673</strong> ($0.03658–$0.03685).</p>
      <p>Across the <a href={`${repo}/experiments/published/routing-shared-100-3000ms-run1-2026-09-20.json`}>three</a> <a href={`${repo}/experiments/published/routing-shared-100-3000ms-run2-2026-09-20.json`}>routing</a> <a href={`${repo}/experiments/published/routing-shared-100-3000ms-run3-2026-09-20.json`}>runs</a>, Jev was faster and cheaper every time. It tied Luna on tool fit once and trailed by one case twice. There was another wrinkle: Jev gave 41 correct routes that were ready to use (range 41–41), versus Luna&apos;s 46 (45–46). Picking a plausible tool is only one part of knowing when to act.</p>

      <h2>Test 2: Jev filters tools before Luna</h2>
      <p>The first test made Jev look promising, but an agent still has to use the tool and answer the request. So I tried the setup an app could use: in one version, Luna saw all 16 pretend tools. In the other, Jev chose one first and Luna saw that choice. If Jev could not choose, Luna got the full list. Both versions received the same requests and pretend tool responses; no real service was called.</p>
      <Figure name="agent-benchmark-100" alt="Three-run agent medians: read-task success 37 of 47 with Jev filtering versus 35 of 47 with all tools; mean read-task latency 3.737 versus 3.011 seconds; estimated total cost per 100 prompts $0.02096 versus $0.02847." caption="Jev filtering before Luna versus offering Luna all tools, using the same 100 prompts in three paired runs." />
      <p>On the 47 reading tasks, the Jev version succeeded on a median <strong>37</strong> (range 36–37), versus <strong>35</strong> with the full tool list (35–38). That sounds encouraging until you look at all three runs: Luna with all tools did better in one of them, 38 to 37. I would not call this a reliable improvement in reading-task success. Across all 100 requests, the median number of successful outcomes was 62 (60–63) with Jev and 55 (54–56) with all tools.</p>
      <p>The clearest tradeoff was time versus cost. Reading tasks took an average of <strong>3.737 seconds</strong> per run at the median with Jev (range 3.565–4.001), versus <strong>3.011 seconds</strong> without it (2.842–3.204). Jev was slower in all three runs. This average includes attempts that failed, too. Across all 100 requests, average time was 2.488 seconds (2.381–2.629) with Jev and 2.340 seconds (2.191–2.481) with all tools.</p>
      <p>In exchange, estimated total cost per 100 requests fell to <strong>$0.02096</strong> with Jev (range $0.02081–$0.02114), from <strong>$0.02847</strong> with all tools ($0.02841–$0.02934). That is about <strong>26% less at the medians</strong>, and Jev cost less in each of the <a href={`${repo}/experiments/published/agent-bench-shared-100-3000ms-run1-2026-09-20.json`}>three</a> <a href={`${repo}/experiments/published/agent-bench-shared-100-3000ms-run2-2026-09-20.json`}>agent</a> <a href={`${repo}/experiments/published/agent-bench-shared-100-3000ms-run3-2026-09-20.json`}>runs</a>.</p>
      <p>The 100-request average also mixes very different situations. Jev asked for clarification on 12 of 13 ambiguous requests in every run, compared with 6–7 with all tools. But both versions struggled when approval was needed (2–4 of 21 successes with Jev; 2–3 with all tools) or a request was unsupported (0–1 of 9 and 0 of 9). Those scores come from simple checks of what happened, not a judge weighing the quality of every answer.</p>

      <h2>What I take from this</h2>
      <p>The result changed as I moved closer to a real agent. Jev was fast and cheap at choosing a tool on its own. Once Luna still had to finish the job, the extra step saved an estimated <strong>26% in API cost at the medians</strong> but made reading tasks slower. For this setup, that is a <strong>cost tradeoff</strong>, not a faster experience. The uneven success results and low scores on approval and unsupported requests also keep me from making a broad reliability claim.</p>
      <p>There are limits to what this small experiment can tell me. I wrote the requests for the test rather than holding out new ones; the catalog had four tools per category; tools returned pretend results; and success checks looked for literal facts in answers. Three runs show how much the results moved from run to run, but cannot establish statistical significance or predict production performance. I also did not compare a provider&apos;s built-in tool search or use real integrations. Next I would try unseen requests, more tools, realistic results, and a built-in tool-search baseline.</p>
      <p>The <a href={`${repo}/experiments/README.md`}>experiment guide</a> defines the metrics and rerun commands. Earlier <a href={`${repo}/experiments/published/routing-shared-100-2026-09-20.json`}>1.5-second routing</a> and <a href={`${repo}/experiments/published/agent-bench-shared-100-run1-2026-09-20.json`}>agent</a> <a href={`${repo}/experiments/published/agent-bench-shared-100-run2-2026-09-20.json`}>reports</a> remain historical. Those agent runs had incomplete Jev cost data, so their Jev costs were lower bounds. Older <a href={`${repo}/experiments/published/routing-2026-09-20.json`}>86-case routing</a> and <a href={`${repo}/experiments/published/agent-bench-2026-09-20.json`}>ten-task agent</a> reports used different datasets. None are mixed into the results above.</p>
    </>
  );
}
