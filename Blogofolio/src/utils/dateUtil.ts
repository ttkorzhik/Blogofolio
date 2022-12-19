export function modifyDate(date: string | number) {

    const newDate = new Date(date)
    const formatter = new Intl.DateTimeFormat('eng', {
        month: 'long'
    });
    const month = formatter.format(newDate);
    return `${month} ${newDate.getDate()}, ${newDate.getFullYear()}`
}
