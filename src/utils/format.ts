export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  
  export const formatCurrency = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(n);
  
//   export const calcAge = (dobISO: string) => {
//     const dob = new Date(dobISO);
//     const today = new Date();
//     let age = today.getFullYear() - dob.getFullYear();
//     const m = today.getMonth() - dob.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
//     return age;
//   };
  