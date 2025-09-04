export const formattedAmount = amount =>{
    return Number(amount).toLocaleString('es-US',{
        style: 'currency',
        currency:'USD'
    })
}

export const generateId =()=>{
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return random + fecha
}