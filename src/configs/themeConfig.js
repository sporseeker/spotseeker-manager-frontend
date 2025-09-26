// You can customize the template with the help of this file
import logo from "@src/assets/images/logo/logo-light.png"
import logoDark from "@src/assets/images/logo/logo-dark.png"
import logoIcon from "@src/assets/images/logo/logo-icon.png"

//Template config options
const themeConfig = {
  app: {
    appName: "SpotSeeker Organizer Dashboard",
    appLogoImage: logo,
    appLogoImageDark: logoDark,
    appLogoIcon: logoIcon
  },
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    type: "horizontal", // vertical, horizontal
    contentWidth: "full", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "sticky", // static , sticky , floating, hidden
      backgroundColor: "primary" // BS color options [primary, success, etc]
    },
    footer: {
      type: "static" // static, sticky, hidden
    },
    customizer: false,
    scrollTop: false, // Enable scroll to top button
    toastPosition: "top-right" // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  }
}

export default themeConfig