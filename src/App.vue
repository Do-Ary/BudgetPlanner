<script setup>
  import {reactive, ref} from 'vue'
  import Budget from './components/Budget.vue';
  import BudgetControl from './components/BudgetControl.vue';
  import Modal from './components/Modal.vue';
  //icono de nuevo gasto
  import newExpenseIcon from './assets/img/nuevo-gasto.svg'

  
  //para adicionar gasto
  const modal = reactive({
    show : false ,
    encourage: false 
  })
  
  //estate de presupuesto y disponible
  const budget = ref(0)
  const available = ref(0)
 // para definir el valor del presupuesto

  const defineBudget = (amount) => {
    budget.value= amount
    available.value= amount
  }

  //para mostrar la ventana modal de adicionar gasto
  const showModal = ()=>{
    modal.show = true; 
    setTimeout(()=>{
      modal.encourage = true;
    },300)
     

  }
  const closeModal = ()=>{
    modal.encourage = false; 
    setTimeout(()=>{
      modal.show = false; 
    },300)
  }
</script>

<template>
  <div>
    <header>
      <h1>Budget Planner</h1>
      <div class="container-header container shade">
        <Budget
          v-if ="budget===0"
          @define-budget="defineBudget"
        />

        <BudgetControl 
          v-else
          :budget="budget"
          :available="available"
        />
        
      </div>
      
    </header>

    <main v-if="budget>0">
      <div class="create-expense">
        <img
          :src="newExpenseIcon"
          alt="new expense icon"
          @click="showModal"
        />
      </div>
      <Modal 
        v-if="modal.show"
        @close-modal="closeModal"
        :modal="modal"
      />

    </main>

  </div>
</template>

<style>
  :root {
    --blue: #3b82f6;
    --white: #fff;
    --gray-light: #f5f5f5;
    --gray: #94a3b8;
    --gray-dark: #64748b;
    --black: #000;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after{
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gray-light);
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  header {
    background-color: var(--blue);
  }
  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--white);
    text-align: center;
  }
  .container {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .container-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .shade{
    box-shadow: 14px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--white); 
    border-radius: 1.2rem;
    padding: 5rem;
  }
  .create-expense {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }
  .create-expense img {
    width: 5rem;
    cursor: pointer; 
  }
  
</style>
