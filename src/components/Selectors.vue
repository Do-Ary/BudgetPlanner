<script  setup>
    defineProps(['selector'])
    defineEmits(['update:selector'])
</script>

<template>
    <div class="selectors shade container">
        <form>
            <div class="field">
                <label for="selector">
                    Filter expenses
                </label>
                <select 
                        id="selector"
                        :value="selector"
                        @input="$emit('update:selector',$event.target.value)"
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
        </form>

    </div>
</template>

<style scoped>
    .selectors {
        margin-top: 10rem;

    }
    .selectors field {
        display: flex;
        align-items: center;
        gap: 2rem;   
    }
    .selectors label {
        font-size: 3rem;
        font-weight: 900;
        color: var(--gray-dark);
    }
    .selectors select {
        flex:1;
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        background-color: var(--gray-light);
        text-align: center;
    }
</style>
