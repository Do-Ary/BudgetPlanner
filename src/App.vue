<script setup>
  import {reactive, ref, watch,computed,onMounted} from 'vue'
  import Budget from './components/Budget.vue';
  import BudgetControl from './components/BudgetControl.vue';
  import Modal from './components/Modal.vue';
  import Selectors from './components/Selectors.vue';
  import Expense from './components/Expense.vue'
  import {generateId} from './helpers'
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
  const spent = ref(0)
  const selector = ref('')

  // para definir gasto
  const expense = reactive ({
    name:'',
    amount:'',
    category:'',
    id: null,
    createdAt: Date.now()
    
  })
  const expenses = ref([])

 //para actualizar los valores de disponible y gastado 
  watch(expenses, ()=>{
    const totalSpent = expenses.value.reduce((total,expense) => expense.amount + total, 0)
    spent.value=totalSpent
    const totalAvailable = budget.value - totalSpent
    available.value = totalAvailable
    
    //para poner en localstorage la info de los gastos
    localStorage.setItem('expenses',JSON.stringify(expenses.value))

  },{ 
    deep:true
  })
// reinicnar state de gasto
  watch(modal, ()=>{
    if(!modal.show){
      //reiniciar objeto
      renewStateExpense();
    }
  },{
    deep:true
  })
  // guardar presupuesto en localstorage      
  watch(budget, ()=>{
    localStorage.setItem('budget', budget.value)
  })
  // guardar en localstorage
  onMounted(()=>{
    const budgetStorage = localStorage.getItem('budget')
    if(budgetStorage){
      budget.value = Number(budgetStorage)
      available.value = Number(budgetStorage)
    }

    //poner los gastos en caso de tenerlos
    const expensesStorage = localStorage.getItem('expenses')
    if(expensesStorage){
      expenses.value=JSON.parse(expensesStorage)
    }

  })

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
  //guardar gasto
  const saveExpense =()=>{
    if(expense.id){
      //editando
      const {id} = expense
      const i = expenses.value.findIndex((expense =>expense.id === id))
      expenses.value[i] = {...expense}
    }else{
      expenses.value.push({
        ...expense,
        id: generateId(),
      })
    }
    
  closeModal()
  renewStateExpense()
  }
  //reiniciar state de gasto
  const renewStateExpense = ()=>{
    //reiniciar objeto
    Object.assign(expense,{
      name:'',
      amount:'',
      category:'',
      id: null,
      createdAt: Date.now()
    })
  }
  //seleccionar gasto
  const selectExpense = id => {
    const expenseEdit = expenses.value.filter(expense => expense.id === id)[0]
    Object.assign(expense,expenseEdit);
    showModal()
  } 
  //borrar gasto
  const deleteExpense =() =>{
    if(confirm('Delete?')){
    expenses.value = expenses.value.filter(expenseState => expenseState.id !== expense.id)
    closeModal()
    }
  } 
  //filtrar gastos por categoria
  const selectedExpenses = computed(()=>{
    if(selector.value){
      return expenses.value.filter( expense => expense.category === selector.value)
    }
    return expenses.value
  })
  //resetear aplicacion
  const resetApp = () =>{
    if(confirm('Are you sure you want to reset the budget and expenses?')) {
      expenses.value = []
      budget.value= 0
    }
    
  }
</script>

<template>
  <div 
    :class="{'modal-open' : modal.show}"
  >
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
          :spent="spent"
          @reset-app="resetApp"
        />
        
      </div>
      
    </header>

    <main v-if="budget>0">
      <Selectors
        v-model:selector="selector"
      />
      <div class="list-expenses container">
        <h2>{{selectedExpenses.length >0 ? 'Expenses':'There are no expenses'  }}</h2>
        
        <Expense
          v-for="expense in selectedExpenses"
          :key="expense.id"
          :expense="expense"
          @select-expense="selectExpense"
        />
      </div>
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
        @save-expense='saveExpense'
        @delete-expense="deleteExpense"
        :modal="modal"
        :available="available"
        :id="expense.id"
        v-model:name="expense.name"
        v-model:amount="expense.amount"
        v-model:category="expense.category"

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
  .modal-open{
    overflow: hidden;
    height: 100vh;
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
  .list-expenses {
    margin-top: 10rem;

  }
  .list-expenses h2 {
    font-weight: 900;
    color: var(--gray-dark);
  }

</style>
