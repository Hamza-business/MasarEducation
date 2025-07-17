import { TbInfoSquareRounded } from "react-icons/tb";
import { MdPriceCheck } from "react-icons/md";

type Props = {
  currentTab: 'agent' | 'user' | 'image';
  onChange: (tab: 'agent' | 'user' | 'image') => void;
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
      ><TbInfoSquareRounded className="text-lg"/> Package Info
      </button>
      <button
        className={`ml-4 px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1  ${
          currentTab === 'user'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('user')}
      ><MdPriceCheck className="text-lg"/> Price Ranges
      </button>
      <button
        className={`ml-4 px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1  ${
          currentTab === 'image'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('image')}
      ><MdPriceCheck className="text-lg"/> xPrice Ranges
      </button>
    </div>
  );
}
