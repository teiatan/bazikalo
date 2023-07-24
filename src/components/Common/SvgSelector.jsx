import { Icon } from "@iconify/react";

export const SvgSelector = ({ nameSvg, width, height, style }) => {
  let chooseSvh;
  switch (nameSvg) {
    case "lighThemeIcon":
      chooseSvh = "material-symbols:light-mode-outline";
      break;
    case "darkThemeIcon":
      chooseSvh = "material-symbols:nights-stay-outline";
      break;
    case "deleteIcon":
      chooseSvh = "mingcute:delete-line";
      break;
    case "blockIcon":
      chooseSvh = "ic:baseline-block";
      break;
    case "logoutIcon":
      chooseSvh = "majesticons:logout-line";
      break;
    case "turnOffNotificationsIcon":
      chooseSvh = "iconamoon:notification-off-light";
      break;
    case "searchIcon":
      chooseSvh = "material-symbols:search";
      break;
    case "emptyСheckboxIcon":
      chooseSvh = "material-symbols:check-box-outline-blank";
      break;
    case "fullCheckboxIcon":
      chooseSvh = "material-symbols:check-box-outline";
      break;
    case "privateInfoIcon":
      chooseSvh = "mdi:eye-lock-outline";
      break;
    case "openInfoIcon":
      chooseSvh = "mdi:eye-outline";
      break;
    case "eyeOffIcon":
      chooseSvh = "tabler:eye-off";
      break;
    case "paperClipIcon":
      chooseSvh = "heroicons:paper-clip-20-solid";
      break;
    case "smileIcon":
      chooseSvh = "solar:smile-square-linear";
      break;
    case "bulletListIcon":
      chooseSvh = "fluent:text-bullet-list-square-32-regular";
      break;
    case "plusIcon":
      chooseSvh = "ic:round-add";
      break;
    case "closeIcon":
      chooseSvh = "ic:round-close";
      break;
    case "fullRadioButtonIcon":
      chooseSvh = "ph:radio-button-fill";
      break;
    case "emptyRadioButtonIcon":
      chooseSvh = "ph:radio-button-light";
      break;

    default:
      console.log("Invalid icon");
  }

  return (
    <Icon
          icon={chooseSvh}
          width={width}
          height={height}
          className={style}
    />
  );
};
