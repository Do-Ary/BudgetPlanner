export const formattedAmount = amount =>{
    return Number(amount).toLocaleString('es-US',{
        style: 'currency',
        currency:'USD'
    })
}