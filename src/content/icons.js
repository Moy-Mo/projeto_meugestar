import { createElement } from "react";
import {
  Activity,
  BookOpen,
  Brain,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  FlaskConical,
  Globe,
  HandHeart,
  HeartPulse,
  History,
  Hospital,
  MapPin,
  MessagesSquare,
  NotebookPen,
  Pill,
  Route,
  Salad,
  ScanLine,
  ShieldCheck,
  ShieldPlus,
  Siren,
  Sprout,
  Stethoscope,
  Syringe,
  TestTubes,
  Baby,
} from "lucide-react";

// O conteúdo referencia ícones pelo nome (texto) para poder ser guardado no banco
// e editado pelo painel admin no futuro.
const icons = {
  activity: Activity,
  baby: Baby,
  "book-open": BookOpen,
  brain: Brain,
  "calendar-clock": CalendarClock,
  "calendar-days": CalendarDays,
  "clipboard-list": ClipboardList,
  "flask-conical": FlaskConical,
  globe: Globe,
  "hand-heart": HandHeart,
  "heart-pulse": HeartPulse,
  history: History,
  hospital: Hospital,
  "map-pin": MapPin,
  "messages-square": MessagesSquare,
  "notebook-pen": NotebookPen,
  pill: Pill,
  route: Route,
  salad: Salad,
  "scan-line": ScanLine,
  "shield-check": ShieldCheck,
  "shield-plus": ShieldPlus,
  siren: Siren,
  sprout: Sprout,
  stethoscope: Stethoscope,
  syringe: Syringe,
  "test-tubes": TestTubes,
};

export function getIcon(name) {
  return icons[name];
}

/** Desenha o ícone pelo nome; não desenha nada se o nome não existir. */
export function ContentIcon({ name, ...props }) {
  const icon = icons[name];
  return icon ? createElement(icon, props) : null;
}
