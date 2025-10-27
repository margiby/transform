import { ReactElement, lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { DiagramSkeleton } from "@/components/common";

// Lazy load des interaktiven Diagramms
const InteractiveDiagram = lazy(() => import("./InteractiveDiagram"));

// Globaler Zähler für eindeutige React Keys in FormattedMessage
let elementCounter = 0;

// Hauptkomponente der Startseite
const HomePage = (): ReactElement => {
  return (
    <section className="section">
      <div className="container">
        {/* Willkommenstitel */}
        <h1 className="title is-1 has-text-centered" tabIndex={0}>
          <FormattedMessage
            id="homePage_welcome"
            defaultMessage="Willkommen bei BET APP"
          />
        </h1>
        <div className="content">
          <div className="box">
            <div className="content is-medium">
              {/* Präsentationstext mit Rich-Text-Formatierung */}
              <FormattedMessage
                id="presentation_text"
                values={{
                  p: (chunks) => (
                    <p
                      key={`p-${++elementCounter}`}
                      className="is-size-6"
                      tabIndex={0}
                    >
                      {chunks}
                    </p>
                  ),
                  ul: (chunks) => (
                    <ul
                      key={`ul-${++elementCounter}`}
                      className="presentation-list"
                      tabIndex={0}
                    >
                      {chunks}
                    </ul>
                  ),
                  li: (chunks) => (
                    <li
                      key={`li-${++elementCounter}`}
                      className="is-size-6"
                      tabIndex={0}
                    >
                      {chunks}
                    </li>
                  ),
                  b: (chunks) => (
                    <b key={`b-${++elementCounter}`} tabIndex={0}>
                      {chunks}
                    </b>
                  ),
                  link: (chunks) => (
                    <a
                      key={`link-${++elementCounter}`}
                      href="https://doi.org/10.1016/j.heliyon.2024.e25434"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline" }}
                    >
                      {chunks}
                    </a>
                  ),
                }}
                defaultMessage="Platzhalter Text.."
              />
            </div>
          </div>
          {/* Interaktives Diagramm mit Lazy Loading und Skeleton */}
          <div className="mt-5">
            <Suspense fallback={<DiagramSkeleton />}>
              <InteractiveDiagram />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
