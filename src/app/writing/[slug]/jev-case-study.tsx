const repo = 'https://github.com/esinocchi/jev-tool-router/blob/main';

function Figure({ name, alt, caption }: { name: 'routing-benchmark' | 'agent-benchmark'; alt: string; caption: string }) {
  return (
    <figure>
      <picture>
        <source media="(max-width: 640px)" srcSet={`/writing/jev-tool-router/${name}-mobile.svg`} />
        <img src={`/writing/jev-tool-router/${name}.svg`} alt={alt} className="w-full h-auto rounded-sm border border-border" />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function JevCaseStudy() {
  return (
    <>
      <p>I received API access to Jev and wanted to play around with it. Jev is a specialist model from TypeSafe AI, so I gave it a common agent job: choosing which tool to use, like a calendar, file search, or browser. I built <a href={`${repo}/README.md`}>Jev Tool Router</a> to ask two questions. In an ideal world, could Jev handle tool routing inside an LLM&apos;s workflow? And with today&apos;s APIs, would putting Jev in front of an agent help?</p>
      <aside aria-labelledby="summary-heading" className="article-summary mb-10 mt-8 border-b border-border pb-8">
        <h2 id="summary-heading" className="section-label">TL;DR</h2>
        <p>Ideal-world routing looked promising; the practical Jev prefilter made a small agent test slower.</p>
      </aside>

      <h2>Test 1: The ideal setup — Jev makes the routing decision</h2>
      <p>I gave Jev and an <code>openai/gpt-5.6-luna</code> model through OpenRouter the same 86 <a href={`${repo}/experiments/routing_cases.json`}>hand-written requests</a>. Each picked a tool category, then a specific tool. <strong>The test stopped there:</strong> no agent used the tool afterward.</p>
      <p>Ideally, an LLM provider would let Jev handle this choice so the main model would not repeat it. <strong>I could not wire Jev into Luna that way.</strong> Public APIs let an app run Jev separately, choose which tools to send, or <a href="https://openrouter.ai/docs/guides/features/tool-calling">force a tool</a>, but not replace Luna&apos;s internal automatic selection. Even <a href="https://developers.openai.com/api/docs/guides/tools-tool-search">client-executed tool search</a> leaves the model deciding when to search and what to call. Test 1 measures routing alone, not a complete agent.</p>
      <Figure name="routing-benchmark" alt="Routing-only comparison: Jev had suitable tool fit in 64 of 68 cases versus Luna's 65 of 68; Jev's mean latency and estimated cost were lower." caption="Standalone routing on 86 hand-authored requests. No agent call followed." />
      <p>In the <a href={`${repo}/experiments/published/routing-2026-09-20.json`}>published run</a>, Jev chose a suitable category and tool in <strong>64 of 68</strong> scored cases; Luna did so in <strong>65 of 68</strong>. Average routing time was <strong>508 ms</strong> for Jev versus <strong>2,579 ms</strong> for Luna. Estimated total cost was <strong>$0.00365</strong> versus <strong>$0.02920</strong>.</p>
      <p>Both found an acceptable tool on all 55 requests labeled ready to route. But Jev asked for clarification on 24 and fell back on one, leaving <strong>30 of 55</strong> ready-to-use routes versus Luna&apos;s <strong>35 of 55</strong>. Finding a tool and deciding to proceed are different judgments.</p>
      <p>So Jev did this <strong>standalone routing job</strong> about five times faster and for roughly one-eighth the estimated cost, with similar tool fit. That says nothing yet about a full agent&apos;s speed.</p>

      <h2>Test 2: The practical setup — Jev filters tools before Luna</h2>
      <p>For the version an app can build today, I let Jev narrow the tool list before Luna saw it. In a <a href={`${repo}/experiments/README.md#agent-task-benchmark`}>paired mock-agent test</a>, one Luna agent saw all 16 tools. The other saw Jev&apos;s filtered list, then chose a tool itself. Both got the same ten synthetic tasks and pretend tool results; neither called a real service.</p>
      <Figure name="agent-benchmark" alt="Agent comparison: both arms completed 10 of 10 tasks; adding Jev filtering raised mean latency from 2.575 to 3.071 seconds and slightly lowered estimated cost." caption="Paired mock-agent test on ten synthetic tasks with inert tool results." />
      <p>Both completed <strong>10 of 10</strong> tasks. With Jev in front, average time rose from <strong>2.575 to 3.071 seconds</strong>, while estimated cost fell from <strong>$0.002979 to $0.002786</strong>. The two-tool task worked only when Jev fell back to the full list. With 16 tools, the extra Jev call <strong>did not make the agent faster</strong>. See the <a href={`${repo}/experiments/published/agent-bench-2026-09-20.json`}>run report</a>.</p>

      <h2>What I take from this</h2>
      <p>Test 1 makes me curious about specialist routing <strong>inside, or closer to, a provider&apos;s tool-selection path</strong>. Test 2 shows the cost of doing it externally: Luna still chose a tool after Jev filtered the list. The public APIs I used cannot replace Luna&apos;s internal choice. OpenAI offers <a href="https://developers.openai.com/api/docs/guides/tools-tool-search">native tool search</a>, but its docs do not say whether a Jev-like specialist is involved. Provider adoption remains a hypothesis.</p>
      <p>These were one-off, synthetic runs with four tools per category and no real tool execution. Costs are configured estimates, not bills. Jev&apos;s and Luna&apos;s confidence scores are not directly comparable. Ten tasks cannot establish accuracy parity, and neither run establishes statistical significance. Next I would try a larger catalog, realistic held-out tasks, a multi-tool shortlist, and native tool search as a baseline.</p>
      <p>The <a href={`${repo}/experiments/README.md`}>experiment guide</a> has the datasets, reports, settings, and commands. The current harness cannot exactly replay the dated routing report. Published reports omit complete requests and model answers; the datasets contain the synthetic requests and labels.</p>
    </>
  );
}
