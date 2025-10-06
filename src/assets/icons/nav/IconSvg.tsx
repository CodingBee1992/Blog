export const ImgArrow = ({ styles, dataMain, dataElement }: { styles: { [key: string]: string }, dataMain?: number, dataElement?: number }) => {
    return (
        <svg data-main={dataMain} data-element={dataElement} className={styles.arrow} width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.25L2.75 3L4.5 4.75L8 1.25" stroke="currentColor" strokeLinecap="round" />
        </svg>
    )
}