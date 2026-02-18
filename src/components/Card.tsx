import { createSignal, Show } from "solid-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Question {
  text: string;
  yes?: number;
  no?: number;
  terminal: boolean;
}

const questions: Question[] = [
  // 0
  { text: "Enthält das Produkt Fleisch?", yes: 1, no: 4, terminal: false },

  // Fleisch
  // 1
  {
    text: "Stammt das Fleisch von einem Tier, das traditionell als koscher gilt (z.B. Rind, Schaf, Ziege, Huhn, Pute)?",
    yes: 2,
    no: 16,
    terminal: false,
  },

  // 2
  {
    text: "Enthält das Produkt zusätzlich Milch oder Milchbestandteile?",
    yes: 16,
    no: 3,
    terminal: false,
  },

  // 3
  {
    text: "Enthält das Produkt weitere tierische Bestandteile wie Blut oder Insekten?",
    yes: 16,
    no: 15,
    terminal: false,
  },

  // Milch
  // 4
  { text: "Enthält das Produkt Milch?", yes: 5, no: 8, terminal: false },

  // 5
  {
    text: "Stammt die Milch von einem Tier, das traditionell als koscher gilt (z.B. Kuh, Schaf, Ziege)?",
    yes: 8,
    no: 16,
    terminal: false,
  },

  // 6
  {
    text: "Enthält das Produkt zusätzlich Fleisch oder Fleischbestandteile?",
    yes: 16,
    no: 7,
    terminal: false,
  },

  // 7
  {
    text: "Enthält das Produkt weitere tierische Bestandteile wie Blut oder Insekten?",
    yes: 16,
    no: 15,
    terminal: false,
  },

  // Fisch
  // 8
  { text: "Enthält das Produkt Fisch?", yes: 9, no: 12, terminal: false },

  // 9
  {
    text: "Hat der Fisch Flossen und Schuppen (z.B. Lachs, Thunfisch, Kabeljau)?",
    yes: 15,
    no: 16,
    terminal: false,
  },

  // 10 unused
  {
    text: "Enthält das Produkt zusätzlich Fleisch oder Milch?",
    yes: 16,
    no: 11,
    terminal: false,
  },

  // 11
  {
    text: "Enthält das Produkt Insekten oder andere nicht-koschere Tiere?",
    yes: 16,
    no: 15,
    terminal: false,
  },

  // Pflanzen / Neutral
  // 12
  {
    text: "Enthält das Produkt Früchte, Gemüse, Getreide oder Hülsenfrüchte?",
    yes: 13,
    no: 14,
    terminal: false,
  },

  // 13
  {
    text: "Enthält das Produkt Insekten oder tierische Bestandteile?",
    yes: 16,
    no: 15,
    terminal: false,
  },

  // 14
  {
    text: "Enthält das Produkt Zusatzstoffe tierischen Ursprungs (z.B. Gelatine)?",
    yes: 16,
    no: 15,
    terminal: false,
  },

  // Terminale Ergebnisse
  // 15
  { text: "Es ist Koscher!", terminal: true },

  // 16
  { text: "Es ist nicht Koscher.", terminal: true },
];

export default function Card() {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isKosher, setKosher] = createSignal<boolean | undefined>(undefined);

  const nextQuestion = (yes: boolean) => {
    const current = questions[currentIndex()];
    if (!current.terminal) {
      //@ts-expect-error
      setCurrentIndex(yes ? current.yes : current.no);

      if (questions[currentIndex()].terminal) {
        setKosher(!questions[currentIndex()].text.includes("nicht"));
      }
    }
  };

  const reset = () => {
	setCurrentIndex(0);
	setKosher(undefined);
  };

  return (
    <div
      class="d-flex justify-content-center align-items-center min-vh-100 bg-light dark:bg-dark"
      style="transition: all 0.2s ease;"
    >
      <div
        class="card border-0 shadow-lg p-5"
        style={{
          "max-width": "500px",
          width: "80%",
          "background-color":
            isKosher() !== undefined
              ? isKosher() === true
                ? "#157347"
                : "#b02a37"
              : "white",
        }}
      >
        <div class="card-body text-center">
          <h5 class="card-title mb-4 text-dark dark:text-light;" style={isKosher() !== undefined ? "color: white !important;" : "" }>
            {questions[currentIndex()].text}
          </h5>

          <div class="d-flex gap-3 justify-content-center">
            <Show when={!questions[currentIndex()].terminal}>
              <button
                class="btn btn-success btn-lg rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "60px", height: "60px" }}
                onClick={() => nextQuestion(true)}
              >
                <i class="bi bi-check-lg" style={{ "font-size": "24px" }}></i>
              </button>
            </Show>
            <Show when={!questions[currentIndex()].terminal}>
              <button
                class="btn btn-danger btn-lg rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "60px", height: "60px" }}
                onClick={() => nextQuestion(false)}
              >
                <i class="bi bi-x-lg" style={{ "font-size": "24px" }}></i>
              </button>
            </Show>
			<Show when={questions[currentIndex()].terminal}>
              <button
                class="btn btn-light btn-lg rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "60px", height: "60px" }}
                onClick={reset}
              >
                <i class="bi bi-arrow-counterclockwise" style={{ "font-size": "48px" }}></i>
              </button>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
