import PropTypes from "prop-types";

import Button from "component/common/Button";
import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";

import GoBackButton from "./GoBackButton";
import MoreButton from "./MoreButton";
import SearchButton from "./SearchButton";

/**
 * @param {{form: string, $isAbled: boolean, children: React.ReactNode }} param
 */
export default function TopNavButton({ form, $isAbled, children, ...props }) {
  return (
    <Button
      type="submit"
      form={form}
      state={
        $isAbled
          ? BUTTON_STATE.SMALL.ABLED
          : BUTTON_STATE.SMALL.DISABLED
      }
      size={BUTTON_SIZE.SMALL}
      {...props}
    >{children}</Button>
  )
}

TopNavButton.propTypes = {
  form: PropTypes.string.isRequired,
  $isAbled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export { GoBackButton, MoreButton, SearchButton }