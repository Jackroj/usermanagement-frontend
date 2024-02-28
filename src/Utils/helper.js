export function formatDate(date) {
    let defaultDate = new Date(date);
    let year = defaultDate.getFullYear();
    let month = String(defaultDate.getMonth() + 1).padStart(2, '0');
    let day = String(defaultDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }