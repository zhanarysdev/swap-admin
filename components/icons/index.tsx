"use client";
import { CSSProperties } from "react";
import { Ads } from "./ads";
import { Arrow } from "./arrow";
import { Bag } from "./bag";
import { Bell } from "./Bell";
import { Category } from "./category";
import { Charts } from "./charts";
import { Close } from "./close";
import { Directories } from "./directories";
import { DropArrow } from "./drop-arrow";
import { Edit } from "./edit";
import { Filter } from "./filter";
import { Image } from "./image";
import { Info } from "./info";
import { Logo } from "./logo";
import { Search } from "./search";
import { Sorting } from "./sorting";
import { Trash } from "./trash";
import { Users } from "./users";
import { GoTo } from "./go-to";
import { Login } from "./login";
import { TrashSmall } from "./trash-small";
import { Save } from "./save";
import { Caret } from "./caret";
import { Plus } from "./plus";
import { Pencil } from "./pencil";
import { Upload } from "./upload";
import { Calendar } from "./calendar";
import { Archive } from "./archive";
import { Eye } from "./eye";
import { Sa } from "./sa";
import { Drag } from "./drag";
import { Faq } from "./faq";
import { Tv } from "./tv";
const icons = {
  Ads,
  Arrow,
  Archive,
  Bag,
  Bell,
  Category,
  Close,
  Charts,
  DropArrow,
  Directories,
  Eye,
  Edit,
  Filter,
  Users,
  Logo,
  Image,
  Info,
  Sorting,
  Search,
  Trash,
  GoTo,
  Login,
  TrashSmall,
  Save,
  Caret,
  Plus,
  Pencil,
  Upload,
  Calendar,
  Sa,
  Drag,
  Faq,
  Tv,
};
export function Icon({
  className,
  name,
  onClick,
  style,
}: {
  className?: string;
  name: keyof typeof icons;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const Component = icons[name];
  return (
    <div style={style} className={className} onClick={onClick}>
      <Component />
    </div>
  );
}
