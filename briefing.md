# HuPa Physical AI Daily

*Rolling intelligence digest. Newest day on top. Maintained by Claude on Ashish's behalf. Signal only — no hype, no re-announcements, every claim linked.*

---

## Thursday, May 21, 2026

### TL;DR

- Singapore stood up its first physical-AI testbed in Punggol and Nvidia announced a Singapore research hub the same day. Grab, DHL, Certis and Quikbot are first pilots. SEA just became a real venue for embodied data deals. [CNBC](https://www.cnbc.com/2026/05/20/nvidia-to-launch-singapore-research-hub-as-city-state-boosts-ai-plans.html)
- Figure pushed past 119 consecutive hours and 149,000 packages on the Helix-02 24/7 livestream. The narrative shifted from "cool demo" to "uptime on a real workcell". [Brett Adcock](https://x.com/adcock_brett), [TechRepublic](https://www.techrepublic.com/article/news-figure-robot-demo-tests-24-7-humanoid-fleet-work/)
- Scale Labs published its dense-video-captioning playbook (May 19). The big result is that hand-cropped past/present/future collages beat raw video for VLM annotation, and 82% of failures are wrong-object/destination, not wrong-action. Phase 2 calls for bbox overlays. This is the spec conversation we should be having with them. [Scale Labs](https://labs.scale.com/blog/path-to-large-scale-dense-video-captioning)
- Keymakr launched an egocentric + robotics data service on May 19. Thats now a second well-resourced annotation incumbent moving directly into our category, after Build AIs Egocentric-1M dump in April. [Keymakr release](https://www.einpresswire.com/article/913615082/keymakr-launches-egocentric-and-robotics-training-data-solutions-for-physical-ai-systems)

### Data collection

- **Keymakr ships egocentric + robotics training-data suite (May 19).** A full annotation incumbent now selling head-mounted-data services for physical AI. Atleast the second one (after Build AI) to move from generic labeling into our exact wedge in 2026. We should expect their first big customer to be a humanoid lab inside Q3. [release](https://www.einpresswire.com/article/913615082/keymakr-launches-egocentric-and-robotics-training-data-solutions-for-physical-ai-systems)
- **AGIBOT + Hyperscale Data Michigan facility.** 100K sq ft US hub for teleoperation, VLA data, embodied AI training. Singapore-incorporated AGIBOT is now a US data-collection landlord, not just a robot OEM. The associated robot purchase is up to 143 units for $13.4M. [PRNewswire](https://www.prnewswire.com/news-releases/roboai-subsidiary-secures-initial-order-for-embodied-ai-robot-data-collection-302685960.html), [TipRanks](https://www.tipranks.com/news/company-announcements/hyperscale-data-expands-embodied-ai-with-robotics-deal)
- **Build AI Egocentric-1M context (re-verified).** 1M hours, 14,228 SEA factory workers, 10.8B frames, on their own glasses. The narrative we have been pricing in is now confirmed at scale. The Figure spec gap is still our wedge. [LinkedIn — Thom Wolf](https://www.linkedin.com/posts/thom-wolf_the-build-ai-team-is-releasing-today-on-hugging-activity-7393763730859384832-M9xA)

### Data annotation & validation

- **Scale Labs — "The Path to Large Scale Dense Video Captioning" (May 19).** Substantial. Scale runs 1,000+ hours of new manipulation data through their platform daily and has now published the production-annotation playbook. Headline results: (1) hand-cropped past/present/future collages beat raw video by 32pp on rubric-acceptable rate, video-as-input actually hurts on Flash-class models, (2) 82% of failure mass is wrong-object-or-destination grounding, only 37% is wrong-verb, (3) best config (Gemini 3.1 Pro + collage + Stack rule + mini-CoT) tops out at 63.7%, with theoretical ceiling ~85% only if visual grounding is fixed via bbox overlays. Phase 2 priorities they listed: bbox overlays from a reliable detector, negative-framed sub-goal context, and middle-clip trimming for directional verbs. The capture-side implication for us is direct: high-res hand-region focus matters more than wider FOV, and our rig spec discussion with Scale should start from this post. [Scale Labs](https://labs.scale.com/blog/path-to-large-scale-dense-video-captioning), [Jade Choghari announcement](https://x.com/jadechoghari/status/2056813589101715748)
- **Annotation incumbents drifting toward egocentric.** Scale AI is bleeding flagship clients after the Meta deal (OpenAI, Google reportedly moved off). Surge AI, Mercor, and now Keymakr are filling the white space. The implication for us: validation contracts for egocentric data are increasingly winnable as a standalone product, not just a bolt-on to capture. [Lemon.io comparison](https://lemon.io/blog/rlhf-platforms/)

### Embedded AI systems

- **NVIDIA GR00T N1.7 in early commercial access, GR00T N2 previewed.** N2 reportedly succeeds on new tasks in new environments more than 2x as often as leading VLA models. Cosmos 3 is the first unified world foundation model from NVIDIA. The Hugging Face + LeRobot integration matters more than the model bump. Open-source robotics stack is now joining the NVIDIA gravity well. [NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-releases-new-physical-ai-models-as-global-partners-unveil-next-generation-robots), [The Robot Report](https://www.therobotreport.com/nvidia-releases-new-physical-ai-models-plus-autonomous-vehicle-tools/)
- **Boston Dynamics, Franka, NEURA, Humanoid, LG, Caterpillar** all shipping new SKUs on the GR00T + Cosmos stack. ABB, FANUC, YASKAWA, KUKA are pulling Omniverse + Isaac into their virtual commissioning. The industrial-arm bloc is migrating onto NVIDIA's simulation rails. [NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-releases-new-physical-ai-models-as-global-partners-unveil-next-generation-robots)

### Robotics & humanoids

- **Figure crosses 119 hours / 149,000 packages on Helix-02.** Day 6 of the autonomous 24/7 livestream. Camera-pixels-only sorting, no teleop, no pre-programmed motions. The "is this real?" backlash is starting (TechRadar floated doubts) but the uptime number is the headline. If it holds, this is the first credible humanoid uptime SLA datapoint. [Brett Adcock](https://x.com/adcock_brett), [TechRepublic](https://www.techrepublic.com/article/news-figure-robot-demo-tests-24-7-humanoid-fleet-work/), [TechRadar — skeptical](https://www.techradar.com/ai-platforms-assistants/figure-ai-streamed-humanoid-robots-sorting-packages-for-8-hours-straight-and-not-everyone-is-convinced-it-was-fully-real)
- **Boston Dynamics Atlas — 50 kg whole-body lifting, RL pipeline published May 18.** Blog + 2 videos. The interesting part is the training method: compressing millions of sim hours into weeks, with explicit force feedback and proprioception, not vision-only. Hyundai still targeting 30,000 Atlas units/yr by 2028. [BD blog](https://bostondynamics.com/blog/training-a-humanoid-robot-for-hard-work/), [Humanoids Daily](https://www.humanoidsdaily.com/news/bear-hugging-a-fridge-inside-boston-dynamics-push-for-whole-body-physical-ai), [Robotics & Automation News](https://roboticsandautomationnews.com/2026/05/20/boston-dynamics-trains-atlas-humanoid-robot-to-pick-up-and-place-washing-machine/101759/)
- **JAL + GMO + Unitree G1 humanoids at Haneda.** Two-year trial, baggage loading and cabin cleaning, $15.4K per unit. Real airline buying real humanoids for non-trivial tasks at hardware-store prices. Read this as Unitree taking the volume tier the way Figure / Apptronik wont touch. [CNBC](https://www.cnbc.com/2026/05/01/japan-airlines-humanoid-robots-haneda-labor-shortage.html), [JAL press](https://press.jal.co.jp/en/release/202604/009502.html)

### India & SEA spotlight

- **Singapore stands up its first physical-AI testbed.** Punggol is the venue. Grab, DHL, Certis, Quikbot first to deploy. Nvidia announced a Singapore research hub the same day. The government will also collaborate with Slamtec, Unitree and Quikbot under a Center for Intelligent Robotics. SEA suddenly has both compute and a state-blessed data-collection ground. We should be on a flight before someone else writes the egocentric SOW for this testbed. [CNBC](https://www.cnbc.com/2026/05/20/nvidia-to-launch-singapore-research-hub-as-city-state-boosts-ai-plans.html), [Fortune — Grab](https://fortune.com/2026/05/20/grab-delivery-robots-cto-suthen-paradatheth-singapore-labor-shortage/)
- **IHUB Robotics building its own VLA "Viveka decision core" from India.** Vision-language-action from scratch is a heavy claim for an Indian seed-stage team. Worth a meeting if only to scope whether they would want our egocentric capture as upstream data. [Electronics For You](https://www.electronicsforu.com/news/an-indian-startup-is-building-humanoid-robot-brain-from-scratch)
- **General Autonomy (IIT Kanpur founders) raises ₹32 Cr seed at ₹280 Cr valuation.** Elevation Capital + India Quotient. Adds to the ~$45M H1 2026 Indian robotics seed pool. The signal is institutional Indian VCs are now willing to pay deeptech multiples for humanoid plays. [Inc42](https://inc42.com/buzz/exclusive-robotics-startup-general-autonomy-raises-%E2%82%B932-cr-at-%E2%82%B9280-cr-valuation/)

### Twitter / X signal

- **@chris_j_paxton** — pinned a RoboPapers ep with Elvis Navah (mimicrobotics) arguing video-based action models are far more data-efficient than static-image pipelines for dexterous tasks. This is exactly the thesis our rig is built around. [post](https://x.com/chris_j_paxton)
- **@adcock_brett** — reposted Ole Lehmann calling Figure's 24/7 demo "the moment that signaled the transition into the humanoid age". A founder picking the framing of his own demo is normal. The interesting bit is which framing investors echoed back. [post](https://x.com/adcock_brett)
- **@DrJimFan** — promoting his Sequoia AI Ascent talk "Robotics: Endgame". Roadmap is Physical Turing Test, Physical API (fleet config via API/CLI), Physical Auto Research (robots improving robots). Not new (May 8) but the framing is now the dominant deck for series-A pitches in this space. Worth knowing. [post](https://x.com/DrJimFan)

### Research papers worth a look

- **ALAM: Algebraically Consistent Latent Action Model for VLAs** (arXiv 2605.10819, May 11). Raises MetaWorld MT50 success from 47.9% to 85.0% and LIBERO from 94.1% to 98.1%. The trick is enforcing algebraic consistency on the latent action structure. Useful primer on where the VLA modeling frontier is moving. [arXiv](https://arxiv.org/abs/2605.10819)
- **AoE: Always-on Egocentric Human Video Collection for Embodied AI** (arXiv 2602.23893). Direct positioning paper on the always-on capture thesis our hardware deploys. Read for the failure modes section. [arXiv](https://arxiv.org/abs/2602.23893)
- **Process note: this is also available as a sortable papers DB.** Filterable by type and category. [papers.html](papers.html)

### Money & moves

- **Robotera (China) — $200M+ round (May 8, led by SF Group).** Began thousand-unit deliveries in Q2 2026, claims 300%+ growth. The China humanoid volume play is locking in capital. [The AI Insider](https://theaiinsider.tech/2026/05/08/chinas-humanoid-robot-maker-robotera-raises-over-usd-200m-in-new-funding-round/)
- **WIRobotics — KRW 95B (~$68M) Series B (May 14).** JB Investment lead. Korean humanoid platform "ALLEX". [PRNewswire](https://www.prnewswire.com/news-releases/wirobotics-secures-approximately-krw-100-billion-usd-68-million-series-b-funding-302772164.html)
- **Apptronik — $520M Series A extension closes (~$935M total round).** John Deere came in as a new strategic, alongside existing B Capital, Google, Mercedes-Benz, Peak6, AT&T Ventures. John Deere is the interesting name. Manufacturing + agri humanoid use cases on the table. [Crunchbase News](https://news.crunchbase.com/venture/ai-humanoid-robot-funding-apptronik/)
- **Skild AI — $1.4B Series C at $14B valuation (SoftBank-led, NVIDIA + HSG + Bezos in).** Tripled valuation in 7 months. Acquired Zebra Technologies' robotics automation business on Apr 15. [Crunchbase News](https://news.crunchbase.com/venture/robotics-startup-skild-ai-triples-valuation/)
- **NEURA Robotics — closing ~€1B / $1.2B round, Tether-backed, at ~€4B valuation.** Real order book (~$1B), real customers (Kawasaki, Omron). Capital is finding the EU player with revenue. [Bloomberg](https://www.bloomberg.com/news/articles/2026-03-04/neura-robotics-raising-1-billion-in-round-backed-by-tether)

---
