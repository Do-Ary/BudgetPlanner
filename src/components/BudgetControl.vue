<script setup>
    import { computed } from 'vue';
    import CircleProgress from 'vue3-circle-progress'
    import "vue3-circle-progress/dist/circle-progress.css"
    import { formattedAmount } from '../helpers' 

    defineEmits(['reset-app'])
    const props = defineProps({
        budget: {
            type: Number,
            required: true
        },
        available: {
            type: Number,
            required: true
        },
        spent:{
            type: Number,
            required: true
        }
    })
    //porcentaje para la rueda
    const percentage = computed(()=>{
        return parseInt (((props.budget- props.available)/props.budget)*100)
    })
</script>

<template>
    <div class="two-columns">
        <div class="contain-graphic">
            <p class="percentage">{{ percentage }}%</p>
            <CircleProgress
                :percent="percentage"
                :size="250"
                :border-width="25"
                :border-bg-width="25"
                fill-color="#3b82f6"
                empty-color="#e1e1e1"
            />
        </div>
        <div class="contain-budget">
            <button 
                class="reset-app"
                type="button"
                @click="$emit('reset-app')"
            >
                Reset App
            </button>
            <p>
                <span>
                    Budget:
                </span>
                {{formattedAmount(budget)  }}
            </p>
            <p>
                <span>
                    Available:  
                </span>
                {{ formattedAmount(available) }}
            </p>
            <p>
                <span>
                    Spent:
                </span>
                {{formattedAmount(spent)  }}
            </p>
        </div>
    </div>
</template>

<style scoped>

    .reset-app{
        background-color: #cc045e;
        border: none;
        padding: 1rem;
        width: 100%;
        color: var(--white);
        font-weight: 900;
        text-transform: uppercase;
        border-radius: 1rem;
        transition-property: background-color;
        transition-duration: 300ms;

    }
    .reset-app:hover {
        cursor: pointer;
        background-color: #910544;
    }
    .two-columns {
        display: flex;
        flex-direction: column;
    }
    .two-columns > :first-child {
        margin-bottom: 2.5rem ;
    }
    @media( min-width:768px ) {
        .two-columns {
            flex-direction: row;
            gap: 4rem;
            align-items: center;
        }
        .two-columns > :first-child {
            margin-bottom: 0 ;
        }
    }
    .contain-graphic {
        position: relative;
    }
    .percentage {
        position: absolute;
        margin: auto;
        top: calc(50% - 1.5rem);
        left:0%;
        right: 0%;
        text-align: center;
        z-index: 100;
        font-size: 3rem;
        font-weight: 900;
        color: var(--gray-dark);
    }
    .contain-budget {
        width: 100%;
    }
    .contain-budget p {
        font-size:2.4rem ;
        text-align: left;
        color: var(--gray-dark);
    }

    @media (min-width: 768px) {
        .contain-budget p {
        text-align: left;
        }
    }
    .contain-budget span {
        font-weight: 900;
        color: var(--blue);
    }
    
</style>
