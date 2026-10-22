import { useEffect, useLayoutEffect } from "react";
import type { VisionPersona } from "./portfolioData";
import { buildInMemoryLivingGreenHeroDocument } from "./shaders/sylva-living-world/SylvaLivingWorldScene";

interface UseSylvaHeroBridgeOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  heroCopy: VisionPersona["heroCopy"];
  variant: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenShowreel: () => void;
  onOpenFieldNote: (noteId: string) => void;
  onOpenEthos: () => void;
  onToggleVisionStudio: () => void;
}

export function useSylvaHeroBridge({
  containerRef,
  heroCopy,
  variant,
  onNavigateSection,
  onOpenShowreel,
  onOpenFieldNote,
  onOpenEthos,
  onToggleVisionStudio,
}: UseSylvaHeroBridgeOptions) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const iframe = container.querySelector<HTMLIFrameElement>("iframe");
    if (iframe && !iframe.getAttribute("srcdoc")) {
      iframe.setAttribute("srcdoc", buildInMemoryLivingGreenHeroDocument());
    }
  }, [containerRef, variant]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanupFrameListeners: (() => void) | undefined;
    const timers: number[] = [];

    const postCopyToActiveFrame = () => {
      const iframe = container.querySelector<HTMLIFrameElement>("iframe");
      if (!iframe) return;
      try {
        iframe.contentWindow?.postMessage(
          { type: "sylva-portfolio-copy", heroCopy, isCanonicalCopy: false },
          "*",
        );
      } catch {
        // ignore
      }
    };

    const onWindowMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type === "sylva-hero-ready") {
        postCopyToActiveFrame();
      } else if (data.type === "sylva-hero-wheel" && typeof data.deltaY === "number") {
        window.scrollBy({
          top: data.deltaY,
          left: data.deltaX || 0,
          behavior: "auto",
        });
      } else if (data.type === "sylva-hero-action") {
        if (data.action === "toggle-studio") {
          onToggleVisionStudio();
        } else if (data.action === "navigate" && typeof data.target === "string") {
          onNavigateSection(data.target);
        } else if (data.action === "open-showreel") {
          onOpenShowreel();
        } else if (data.action === "open-ethos") {
          onOpenEthos();
        } else if (data.action === "open-field-note") {
          onOpenFieldNote(data.noteId || "field-note-07");
        }
      }
    };
    window.addEventListener("message", onWindowMessage);

    const applyCopyToDoc = (doc: Document) => {
      const headlineLines = doc.querySelectorAll<HTMLElement>(".headline span i");
      if (headlineLines[0]) headlineLines[0].textContent = heroCopy.headlineLine1;
      if (headlineLines[1]) headlineLines[1].textContent = heroCopy.headlineLine2;

      const lede = doc.querySelector<HTMLElement>(".lede");
      if (lede) lede.textContent = heroCopy.lede;

      const exploreLbl = doc.querySelector<HTMLElement>(".liquid-button--explore .lbl");
      if (exploreLbl) exploreLbl.textContent = heroCopy.exploreLabel;

      const statADt = doc.querySelector<HTMLElement>(".stat--a dt");
      const statADd = doc.querySelector<HTMLElement>(".stat--a dd");
      if (statADt) statADt.textContent = heroCopy.statALabel;
      if (statADd) statADd.textContent = heroCopy.statAValue;

      const statBDt = doc.querySelector<HTMLElement>(".stat--b dt");
      const statBDd = doc.querySelector<HTMLElement>(".stat--b dd");
      if (statBDt) statBDt.textContent = heroCopy.statBLabel;
      if (statBDd) statBDd.textContent = heroCopy.statBValue;

      const card1Label = doc.querySelector<HTMLElement>(".card--about .label");
      const card1Title = doc.querySelector<HTMLElement>(".card--about h2");
      if (card1Label) card1Label.textContent = heroCopy.card1Label;
      if (card1Title) card1Title.textContent = heroCopy.card1Title;

      const card2Label = doc.querySelector<HTMLElement>(".card--stove .label");
      const card2Title = doc.querySelector<HTMLElement>(".card--stove h2");
      if (card2Label) card2Label.textContent = heroCopy.card2Label;
      if (card2Title) card2Title.textContent = heroCopy.card2Title;

      const ghost = doc.querySelector<HTMLElement>(".ghost");
      if (ghost) ghost.textContent = heroCopy.ghostWord;

      const dockItems = doc.querySelectorAll<HTMLElement>(".dock .dock-item");
      dockItems.forEach((item, idx) => {
        if (idx >= 1 && idx <= 4) {
          const textSpan = item.querySelector<HTMLElement>("span:not(.glyph)");
          if (textSpan && heroCopy.dockItems[idx - 1]) {
            textSpan.textContent = heroCopy.dockItems[idx - 1];
          }
        }
      });
    };

    const bindFrame = (iframe: HTMLIFrameElement) => {
      if (!iframe.getAttribute("srcdoc")) {
        iframe.srcdoc = buildInMemoryLivingGreenHeroDocument();
      }
      const attachToContent = () => {
        cleanupFrameListeners?.();
        postCopyToActiveFrame();

        let doc: Document | null = null;
        let win: Window | null = null;
        try {
          doc = iframe.contentDocument;
          win = iframe.contentWindow;
        } catch {
          return;
        }
        if (!doc || !win || !doc.body) return;

        applyCopyToDoc(doc);
        doc.body.setAttribute("data-portfolio-customized", "true");

        const onWheel = (event: WheelEvent) => {
          if (Math.abs(event.deltaY) > 0) {
            window.scrollBy({
              top: event.deltaY,
              left: event.deltaX,
              behavior: "auto",
            });
          }
        };
        win.addEventListener("wheel", onWheel, { passive: true });

        const dockItems = Array.from(doc.querySelectorAll<HTMLAnchorElement>(".dock .dock-item"));
        const dockTargets = ["top", "works", "habitats", "journal", "contact"];
        const onDockClicks: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];

        dockItems.forEach((item, index) => {
          const fn = (e: MouseEvent) => {
            e.preventDefault();
            dockItems.forEach((d, i) => {
              if (i > 0) d.classList.toggle("is-active", i === index);
            });
            if (index === 0) {
              onToggleVisionStudio();
            } else {
              const target = dockTargets[index] || "works";
              onNavigateSection(target);
            }
          };
          item.addEventListener("click", fn);
          onDockClicks.push({ el: item, fn });
        });

        const exploreBtn = doc.querySelector<HTMLElement>(".liquid-button--explore");
        const onExploreClick = (e: MouseEvent) => {
          e.preventDefault();
          onNavigateSection("works");
        };
        exploreBtn?.addEventListener("click", onExploreClick);

        const playBtn = doc.querySelector<HTMLElement>(".liquid-button--play");
        const onPlayClick = (e: MouseEvent) => {
          e.preventDefault();
          onOpenShowreel();
        };
        playBtn?.addEventListener("click", onPlayClick);

        const aboutKnob = doc.querySelector<HTMLElement>(".knob--about");
        const aboutCard = doc.querySelector<HTMLElement>(".card--about");
        const onAboutClick = (e: MouseEvent) => {
          e.preventDefault();
          onOpenEthos();
        };
        aboutKnob?.addEventListener("click", onAboutClick);
        aboutCard?.addEventListener("click", onAboutClick);
        if (aboutCard) aboutCard.style.cursor = "pointer";

        const stoveKnob = doc.querySelector<HTMLElement>(".card--stove .knob");
        const stoveCard = doc.querySelector<HTMLElement>(".card--stove");
        const onStoveClick = (e: MouseEvent) => {
          e.preventDefault();
          onOpenFieldNote("field-note-07");
        };
        stoveKnob?.addEventListener("click", onStoveClick);
        stoveCard?.addEventListener("click", onStoveClick);
        if (stoveCard) stoveCard.style.cursor = "pointer";

        const scrollCue = doc.querySelector<HTMLElement>(".scroll");
        const onScrollCueClick = (e: MouseEvent) => {
          e.preventDefault();
          onNavigateSection("works");
        };
        scrollCue?.addEventListener("click", onScrollCueClick);

        cleanupFrameListeners = () => {
          win?.removeEventListener("wheel", onWheel);
          onDockClicks.forEach(({ el, fn }) => el.removeEventListener("click", fn));
          exploreBtn?.removeEventListener("click", onExploreClick);
          playBtn?.removeEventListener("click", onPlayClick);
          aboutKnob?.removeEventListener("click", onAboutClick);
          aboutCard?.removeEventListener("click", onAboutClick);
          stoveKnob?.removeEventListener("click", onStoveClick);
          stoveCard?.removeEventListener("click", onStoveClick);
          scrollCue?.removeEventListener("click", onScrollCueClick);
        };
      };

      iframe.addEventListener("load", attachToContent);
      attachToContent();
      [60, 220, 520, 1000].forEach((delay) => {
        timers.push(window.setTimeout(postCopyToActiveFrame, delay));
      });

      return () => {
        iframe.removeEventListener("load", attachToContent);
        cleanupFrameListeners?.();
      };
    };

    let currentIframe = container.querySelector<HTMLIFrameElement>("iframe");
    let unbindCurrent = currentIframe ? bindFrame(currentIframe) : undefined;

    const observer = new MutationObserver(() => {
      const nextIframe = container.querySelector<HTMLIFrameElement>("iframe");
      if (nextIframe && !nextIframe.getAttribute("srcdoc")) {
        nextIframe.setAttribute("srcdoc", buildInMemoryLivingGreenHeroDocument());
      }
      if (nextIframe && nextIframe !== currentIframe) {
        currentIframe = nextIframe;
        unbindCurrent?.();
        unbindCurrent = bindFrame(nextIframe);
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "srcdoc"],
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("message", onWindowMessage);
      observer.disconnect();
      unbindCurrent?.();
      cleanupFrameListeners?.();
    };
  }, [
    containerRef,
    heroCopy,
    variant,
    onNavigateSection,
    onOpenShowreel,
    onOpenFieldNote,
    onOpenEthos,
    onToggleVisionStudio,
  ]);
}
