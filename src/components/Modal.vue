<script setup>
    import {ref} from 'vue'
    import closeModal from '../assets/img/cerrar.svg'
    import Alert from './Alert.vue'

    const error = ref('')

    const emit = defineEmits(['close-modal','save-expense','update:name','update:amount','update:category'])
    const props = defineProps ({
        modal:{
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        amount: {
            type: [String,Number],
            required: true
        },
        category: {
            type: String,
            required: true
        }
    })
    const addExpense = () =>{
        //Validar que no haya campos vacios
        const {name, amount, category} = props
        if([name,amount,category].includes('')){
            error.value= 'All fields are required'
            
            setTimeout(()=>{
                error.value=''
            },3000);
            return
        }
        //Validar cantidad
        if(amount <=0){
            error.value='Invalid Amount '
            setTimeout(()=>{
                error.value=''
            },3000);
            return
        }
        emit('save-expense')
    }
</script>

<template>
    <div class="modal" >

        <div class="close-modal">
            <img
                :src="closeModal" 
                @click="$event=> $emit('close-modal')"
            />
        </div>

        <div 
            class = "container container-form" 
            :class="[modal.encourage ? 'encourage':'close']"
        >
            <form
                class="new-expense"
                @submit.prevent="addExpense"
            >
                <legend>
                    Add expense
                </legend>
                <Alert v-if="error">{{ error }}</Alert>
                <!-- add name expense-->
                <div class="field">
                    <label for="name"> Expense name </label>
                    <input
                        type="text"
                        id ="name"
                        placeholder="Add name expense"
                        :value="name"
                        @input="$emit('update:name',$event.target.value)"

                    />
                </div>
                <!-- amount-->
                <div class="field">
                    <label for="amount"> Amount </label>
                    <input
                        type="number"
                        id ="amount"
                        placeholder="Add amount expense, ex. 300"
                        :value="amount"
                        @input="$emit('update:amount',+$event.target.value)"
                    />
                </div>
                 <!-- category of expenses  -->
                <div class="field">
                    <label for="category"> Category </label>
                    <select 
                        id="category"
                        :value="category"
                        @input="$emit('update:category',$event.target.value)"
                    >
                       
                        <option value=""> --Select option--</option>
                        <option value="savings">Savings</option>
                        <option value="food"> Food</option>
                        <option value="home">Home</option>
                        <option value="expenses"> Other expenses</option>
                        <option value="entertainment">Entertainment </option>
                        <option value="health"> Health</option>
                        <option value="subscriptions">Subscriptions</option>

                    </select>
                </div>
                <input
                    type="submit"
                    value="Add expense"
                >
                </input>
            </form>

        </div>
    </div>    
</template>

<style scoped>
    .modal{
        position: absolute;
        background-color: rgb(0 0 0 /0.9);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .close-modal {
        position: absolute;
        top: 3rem;
        right: 3rem;
        
    }
    .close-modal img {
        width: 3rem;
        cursor: pointer;
    }

    /* form style */
    .container-form {
        transition-property : all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }

    .container-form.encourage {
        opacity: 1;
    }
    .container-form.close {
        opacity: 0;
    }
    .new-expense{
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }
    .new-expense legend {
        text-align: center;
        color: var(--white);
        font-size: 5rem;
        font-weight: 700;
    }
    .field{
        display: grid;
        gap: 2rem;
    }
    .new-expense input,
    .new-expense select
     {
        background-color: var(--gray-light);
        border-radius: 1rem;
        padding:1rem;
        border:none;
        font-size: 2.2rem;
    }
    .new-expense label {
        color: var(--white);
        font-size: 3rem;
    }
    .new-expense input[type="submit"] {
        background-color: var(--blue);
        color: var(--white);
        font-weight: 700;
        cursor: pointer;
        
    }
</style>
