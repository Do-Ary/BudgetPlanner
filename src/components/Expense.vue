<script setup>
    import {formattedAmount, formattedDate} from '../helpers/index.js'
    //iconos
    import IconSavings from '../assets/img/icono_ahorro.svg'
    import IconHome from '../assets/img/icono_casa.svg'
    import IconFood from '../assets/img/icono_comida.svg'
    import IconExpenses from '../assets/img/icono_gastos.svg'
    import IconEntertaiment from '../assets/img/icono_ocio.svg'
    import IconHealth from '../assets/img/icono_salud.svg'
    import IconSuscriptions from '../assets/img/icono_suscripciones.svg'
    
    //dicionaron de objetos
    const iconsMap = {
        savings : IconSavings,
        food : IconFood,
        home : IconHome,
        expenses : IconExpenses,
        entertaiment : IconEntertaiment,
        health : IconHealth,
        suscriptions : IconSuscriptions
    }
    
    const props = defineProps({
        expense: {
            type:Object,
            required: true
        }
    })
</script>

<template>
    <div class="expense shade">
        <div class="content">
            <img 
                :src="iconsMap[expense.category]"
                alt="Icon expense"
                class="icon"
            ></img>
            <div class="details">
                <p class="category">{{ expense.category }}</p>
                <p class="name">{{ expense.name }}</p>
                
                <p class="create-date">
                    Date 
                    <span>{{ formattedDate(expense.createdAt)}}</span>
                </p>
            </div>
        </div>
        <p class="amount">{{ formattedAmount(expense.amount) }}</p>
    </div>
    
</template>

<style scoped>
    .expense{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }   
    .content{
        display: flex;
        align-items: center;
        gap: 2rem;

    }
    .icon{
        width: 5rem;

    } 
    .details p {
        margin: 0 0 1rem 0;
    }
    .category{
        color: var(--gray);
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight:  900;
    }
    .name{
        color: var(--gray-dark);
        font-size: 2.4rem;
        font-weight: 700;
        cursor: pointer;

    }
    .create-date{
        color: var(--gray-dark);
        font-size: 1.6rem;
        font-weight: 900;
    }
    .create-date span{
        font-weight: 400;
    }
    .amount {
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
    }
</style>
