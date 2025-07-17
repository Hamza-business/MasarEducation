import { TbInfoSquareRounded, TbUserShield } from "react-icons/tb";
import { MdPriceCheck } from "react-icons/md";
import { LuImageUp } from "react-icons/lu";

type Props = {
  currentTab: 'agent' | 'user' | 'image' | 'preview';
  onChange: (tab: 'agent' | 'user' | 'image' | 'preview') => void;
};

export default function TabNavigation({ currentTab, onChange }: Props) {
  return (
    <div className="flex border-b mb-3">
      <button
        className={`px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1 ${
          currentTab === 'agent'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('agent')}
      ><TbInfoSquareRounded className="text-lg"/> Agent Info
      </button>
      <button
        className={`ml-4 px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1  ${
          currentTab === 'user'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('user')}
      ><TbUserShield className="text-lg"/> Owner Info
      </button>
      <button
        className={`ml-4 px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1  ${
          currentTab === 'image'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('image')}
      ><LuImageUp className="text-lg"/> Agent Logo
      </button>
      <button
        className={`ml-4 px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1  ${
          currentTab === 'preview'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('preview')}
      ><LuImageUp className="text-lg"/> Preview
      </button>
    </div>
  );
}
