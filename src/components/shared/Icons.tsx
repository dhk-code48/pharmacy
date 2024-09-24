import {
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconArrowLeft,
  IconArrowLeftRhombus,
  IconArrowRight,
  IconBell,
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
  IconBuildingHospital,
  IconCancel,
  IconCash,
  IconCheck,
  IconChecks,
  IconChevronLeft,
  IconCircleCheck,
  IconCircleX,
  IconDeviceDesktopDown,
  IconDeviceIpadDown,
  IconDeviceLaptop,
  IconDeviceMobileDollar,
  IconEye,
  IconFile,
  IconFileCheck,
  IconFileFilled,
  IconHome,
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconLoader,
  IconLogout,
  IconMail,
  IconMapPin,
  IconMapPinFilled,
  IconMenu2,
  IconMessage2,
  IconMoon,
  IconPackage,
  IconPhone,
  IconPhotoUp,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconSettingsFilled,
  IconShoppingCart,
  IconShoppingCartFilled,
  IconStar,
  IconSun,
  IconTrashXFilled,
  IconTruckDelivery,
  IconUpload,
  IconUser,
  IconUsers,
  IconX,
  TablerIcon,
} from "@tabler/icons-react";
import React from "react";

export type IconType = TablerIcon;

export const Icons = {
  add: IconPlus,
  check: IconCheck,
  eye: IconEye,
  bell: IconBell,
  spinner: IconLoader,
  message: IconMessage2,
  cancel: IconCancel,
  pcInstall: IconDeviceDesktopDown,
  money: IconCash,
  verified: (props: React.HTMLAttributes<SVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="verified" {...props}>
      <g clip-path="url(#a)">
        <path
          fill="#4DC4FF"
          d="M13.3546 1.46995C12.6544 0.614752 11.3466 0.614755 10.6465 1.46995L9.65463 2.6814C9.58665 2.76443 9.47325 2.79482 9.37286 2.7569L7.90817 2.20367C6.87422 1.81314 5.74163 2.46703 5.56286 3.55774L5.30963 5.10281C5.29227 5.20871 5.20926 5.29172 5.10335 5.30908L3.55829 5.56231C2.46759 5.74108 1.81368 6.87366 2.20422 7.90762L2.75745 9.37231C2.79537 9.4727 2.76498 9.5861 2.68195 9.65408L1.4705 10.6459C0.615302 11.3461 0.615304 12.6539 1.4705 13.3541L2.68195 14.3459C2.76498 14.4139 2.79537 14.5273 2.75745 14.6277L2.20422 16.0924C1.81369 17.1263 2.46758 18.2589 3.55829 18.4377L5.10335 18.6909C5.20926 18.7083 5.29227 18.7913 5.30963 18.8972L5.56286 20.4422C5.74163 21.5329 6.87421 22.1868 7.90817 21.7963L9.37286 21.2431C9.47325 21.2052 9.58665 21.2355 9.65463 21.3186L10.6465 22.53C11.3466 23.3852 12.6544 23.3852 13.3546 22.53L14.3464 21.3186C14.4144 21.2355 14.5278 21.2052 14.6282 21.2431L16.0929 21.7963C17.1269 22.1868 18.2595 21.5329 18.4382 20.4422L18.6915 18.8972C18.7088 18.7913 18.7918 18.7083 18.8977 18.6909L20.4428 18.4377C21.5335 18.2589 22.1874 17.1263 21.7969 16.0924L21.2436 14.6277C21.2057 14.5273 21.2361 14.4139 21.3191 14.3459L22.5306 13.3541C23.3858 12.6539 23.3858 11.3461 22.5306 10.6459L21.3191 9.65408C21.2361 9.5861 21.2057 9.4727 21.2436 9.37231L21.7969 7.90762C22.1874 6.87366 21.5335 5.74108 20.4428 5.56231L18.8977 5.30908C18.7918 5.29172 18.7088 5.20871 18.6915 5.10281L18.4382 3.55774C18.2595 2.46704 17.1269 1.81313 16.0929 2.20367L14.6282 2.7569C14.5278 2.79482 14.4144 2.76443 14.3464 2.6814L13.3546 1.46995Z"
        ></path>
        <path
          fill="#ECEFF1"
          fill-rule="evenodd"
          d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.8897 16.171 10.6989 16.25 10.5 16.25C10.3011 16.25 10.1103 16.171 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z"
          clip-rule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <rect width="24" height="24" fill="#fff"></rect>
        </clipPath>
      </defs>
    </svg>
  ),
  nepalFlag: () => (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-np" viewBox="0 0 640 480">
      <defs>
        <clipPath id="np-a">
          <path fill-opacity=".7" d="M0-16h512v512H0z" />
        </clipPath>
      </defs>
      <g clip-path="url(#np-a)" transform="translate(0 15)scale(.9375)">
        <g fill-rule="evenodd">
          <path fill="#ce0000" stroke="#000063" stroke-width="13.8" d="M6.5 489.5h378.8L137.4 238.1l257.3.3L6.6-9.5v499z" />
          <path
            fill="#fff"
            d="m180.7 355.8-27 9 21.2 19.8-28.5-1.8 11.7 26.2-25.5-12.3.5 28.6-18.8-20.9-10.7 26.6-9.2-26.3-20.3 20.6 1.8-27.7L49 409l12.6-25-29.3.6 21.5-18.3-27.3-10.5 27-9L32.2 327l28.4 1.8L49 302.6l25.6 12.3-.5-28.6 18.8 20.9 10.7-26.6 9.1 26.3 20.4-20.6-1.9 27.7 27-11.4-12.7 25 29.4-.6-21.5 18.3zm-32.4-184.7-11.3 8.4 5.6 4.6a93.8 93.8 0 0 0 30.7-36c1.8 21.3-17.7 69-68.7 69.5a70.6 70.6 0 0 1-71.5-70.3c10 18.2 16.2 27 32 36.5l4.7-4.4-10.6-8.9 13.7-3.6-7.4-12.4 14.4 1-1.8-14.4 12.6 7.4 4-13.5 9 10.8 8.5-10.3 4.6 14 11.8-8.2-1.5 14.3 14.2-1.7-6.7 13.2z"
          />
        </g>
      </g>
    </svg>
  ),
  users: IconUsers,
  ipadInstall: IconDeviceIpadDown,
  mobileInstall: IconDeviceMobileDollar,
  alertTriangle: IconAlertTriangle,
  alertTriangleFilled: IconAlertTriangleFilled,
  checkCircle: IconCircleCheck,
  package: IconPackage,
  invoiceFilled: IconFileCheck,
  truck: IconTruckDelivery,
  checks: IconChecks,
  xCircle: IconCircleX,
  returnRequested: IconArrowLeftRhombus,
  refresh: IconRefresh,
  google: IconBrandGoogleFilled,
  arrowRight: IconArrowRight,
  arrowLeft: IconArrowLeft,
  facebook: IconBrandFacebookFilled,
  menu: IconMenu2,
  chevronLeft: IconChevronLeft,
  home: IconHome,
  uploadImage: IconPhotoUp,
  user: IconUser,
  logout: IconLogout,
  pharmacy: IconBuildingHospital,
  upload: IconUpload,
  delete: IconTrashXFilled,
  prescriptionFilled: IconFileFilled,
  prescription: IconFile,
  star: IconStar,
  search: IconSearch,
  sun: IconSun,
  moon: IconMoon,
  laptop: IconDeviceLaptop,
  close: IconX,
  mail: IconMail,
  phone: IconPhone,

  leftCollapse: IconLayoutSidebarLeftCollapse,
  rightCollapse: IconLayoutSidebarRightCollapse,

  dashboard: IconLayoutDashboard,
  dashboardFilled: IconLayoutDashboardFilled,

  cartFilled: IconShoppingCartFilled,
  cart: IconShoppingCart,

  addressFilled: IconMapPinFilled,
  address: IconMapPin,

  settingsFilled: IconSettingsFilled,
  settings: IconSettings,
};
