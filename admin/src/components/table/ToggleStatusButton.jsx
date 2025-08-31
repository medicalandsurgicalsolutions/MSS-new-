import ShowHideButton from './ShowHideButton'
import { Badge } from "@windmill/react-ui";

const ToggleStatusButton = ({id, status, canToggleStatus, currencyStatusName}) => {
  return (
    <>
        {canToggleStatus ? (
            <ShowHideButton id={id} status={status} currencyStatusName={currencyStatusName}/>
        ) : (
            status == "show" ? (
                <Badge type="success">Active</Badge>
            ) : (
                <Badge type="warning">InActive</Badge>
            )
        )}
    </>
  )
}

export default ToggleStatusButton