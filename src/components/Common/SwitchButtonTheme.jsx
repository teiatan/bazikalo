import { useTheme } from "../../hooks/contextHooks";
import { SvgSelector } from "./SvgSelector";

export const SwitchButtonTheme = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div>
        
      <label
        className="relative inline-block w-[84px] h-10 rounded-[20px] 
       bg-gradient-to-r from-dkSecondaryBgC from-0% to-ltSecondaryGradient to-100% dark:bg-gradient-to-[44deg] dark:from-dkGeneralBgC dark:from-0% dark:to-dkSecondaryGradient dark:to-100%"
      >
        
        <input
          className="opacity-0 w-0 h-0 "
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
        />

               <span
            className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 
        flex items-center justify-center w-[42px] h-10 rounded-[21px] border-r-[1px]
        border-r-dkButtonBgC dark:left-[50%] dark:border-r-0 dark:border-l-[1px] border-l-secondaryGradient dark:shadow-[-2px_0px_5px_-3px__rgba(231,253,93,1)] "
          >
            <SvgSelector
              nameSvg={!darkMode ? "lighThemeIcon": "darkThemeIcon"}
              width={24}
              height={24}
              style="text-PrimaryIconC"
            />
              </span>
            
      </label>
    </div>
  );
};

