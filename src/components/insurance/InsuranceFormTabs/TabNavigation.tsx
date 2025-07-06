import { TbInfoSquareRounded } from "react-icons/tb";
import { MdPriceCheck } from "react-icons/md";

type Props = {
  currentTab: 'info' | 'prices';
  onChange: (tab: 'info' | 'prices') => void;
};

export default function TabNavigation({ currentTab, onChange }: Props) {
  return (
    <div className="flex border-b mb-3">
      <button
        className={`px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1 ${
          currentTab === 'info'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('info')}
      ><TbInfoSquareRounded className="text-lg"/> Package Info
      </button>
      <button
        className={`ml-4 px-4 py-2 text-sm font-medium transition-all flex justify-between items-center gap-1  ${
          currentTab === 'prices'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onChange('prices')}
      ><MdPriceCheck className="text-lg"/> Price Ranges
      </button>
    </div>
  );
}
