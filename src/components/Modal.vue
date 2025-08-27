<script setup>
    import closeModal from '../assets/img/cerrar.svg'

    const emit = defineEmits(['close-modal'])
    const props = defineProps ({
        modal:{
            type: Object,
            required: true
        }
    })
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
            >
                <legend>
                    Add expense
                </legend>
                <!-- add name expense-->
                <div class="field">
                    <label for="name"> Expense name </label>
                    <input
                        type="text"
                        id ="name"
                        placeholder="Add name expense"
                    />
                </div>
                <!-- amount-->
                <div class="field">
                    <label for="amount"> Amount </label>
                    <input
                        type="number"
                        id ="amount"
                        placeholder="Add amount expense, ex. 300"
                    />
                </div>
                 <!-- category of expenses  -->
                <div class="field">
                    <label for="category"> Category </label>
                    <select 
                        id="category"
                    >
                       
                        <option value=""> --Select</option>
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
