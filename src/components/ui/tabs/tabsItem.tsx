import clsx from "clsx"
import { type TabsItem } from "./tabs"
import styles from './tabs.module.scss'


type TabsItemProps = {
    tab: TabsItem,
    classNameTabItem?: string,
    onTabClick: (tab: TabsItem) => void,
    filter?: string | null
}
export const Tab = (props: TabsItemProps) => {
    const { classNameTabItem, onTabClick, tab, filter } = props
    return (
        <div
            //  style={{ transform: `translateX(${offsetX}px)` }}
            className={clsx(classNameTabItem, {
                [styles.active]: filter === tab.value,
            })}
            onClick={() => onTabClick(tab)}
            key={tab.content}
        >
            {tab.content}
        </div>
    )
}