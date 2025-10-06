import type { MenuElement, Size } from "../../../../types/types"
import type { MenuTypes } from "../dataNavigation/dataNavigation"

interface DesktopProps {
    size:Size,
    dataMenu:MenuTypes[],
    menuElement:MenuElement,
}

const DesktopNav = ({size,dataMenu,menuElement}: DesktopProps) => {




  return (
    <div>
        {size.width > 900 ? dataMenu.map((item:MenuTypes,index:number) =>{
            return menuElement(item,index,index)
        }): null}
    </div>
  )
}

export default DesktopNav