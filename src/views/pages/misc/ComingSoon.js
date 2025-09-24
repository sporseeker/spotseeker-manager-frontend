// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"

// ** Styles
import "@styles/base/pages/page-misc.scss"
import themeConfig from "../../../configs/themeConfig"

const ComingSoon = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === "dark" ? "error-dark.svg" : "error.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default
  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <img src={themeConfig.app.appLogoImage} alt='logo' width={200}/>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Coming Soon 🕵🏻‍♀️</h2>
          <p className="mb-2">
            Our engineering team is working on this!
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            Back to home
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default ComingSoon
