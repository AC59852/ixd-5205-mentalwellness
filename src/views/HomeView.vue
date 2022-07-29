<!-- Template is where any HTML, components, or dynamic content goes -->
<template>
  <main>
    <!-- double bracket represents dynamic data -->
    <h1>{{ msg }}</h1>
    <!-- <HelloWorld /> is exactly like a React component  -->
    <HelloWorld />
    <section class="fruits">
      <h2>Fruits</h2>
      <ul>
        <!-- v-for loops through the elements in our chosen data -->
        <li v-for="fruit in fruits" :key="fruit">
          <!-- 
            @click is the same as addEventListener("click", setFruitColour())
            passing $event as the arguement lets us access the event object. In this case, the event object is the button, and everything along with it
          -->
          <button @click="toggleFruitColour($event)">{{ fruit.name }}</button>
        </li>
      </ul>
      <div class="activeFruit">
        <!-- 
          v-if, v-else-if, and v-else are conditional rendering 
          v-if is used to render content based on a condition
          v-else-if is used to render content based on multiple conditions
          v-else is used to render content if none of the conditions are met
        -->
        <h3 v-if="activeFruit">You've Chosen: {{ activeFruit.name }}</h3>
        <h3 v-else>There is no active fruit yet, choose a fruit to set as active</h3>
      </div>
    </section>
  </main>
</template>
<script>
// We need to import the components we want to use
import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'HomeView',

    // We need to declare data that we want to use in the template
    data() {
      return {
        // We can declare data that is reactive
        msg: 'Choose your favourite fruit!',

        // fruits is an array of objects, each object has a name and colour property as well as an id
        fruits: [
          { id: 1, name: 'Apple', colour: 'red' },
          { id: 2, name: 'Banana', colour: 'yellow' },
          { id: 3, name: 'Orange', colour: 'orange' },
          { id: 4, name: 'Pear', colour: 'green' },
          { id: 5, name: 'Grape', colour: 'purple' },
        ],

        questions: [

          {id: 1, question: 'What brings you here today?', responses: [
            {id: 1, response: 'Reduce anxiety'},
            {id: 2, response: 'Relieve Stress'},
            {id: 3, response: 'I want to know more about your favourite colour'},
          ]
          },

          {id: 1, question: 'How often do you get anxiety attacks?', responses: [
            {id: 1, response: 'I want to know more about you'},
            {id: 2, response: 'I want to know more about your favourite fruit'},
            {id: 3, response: 'I want to know more about your favourite colour'},
          ]},
        ],
        

        // activeFruit is the fruit that is currently active. We set it to null by default
        activeFruit: null,
      }
    },

    // You may already be familiar with the lifecycle hooks from React. 
    // They are used to provide/use functionality during the different stages of the Vue lifecycle 


    // The created hook is called when the component is created.
    created() {
      // This is where we can do any data fetching or other setup
      // that needs to happen before the view is rendered
      alert("This was fired before the view is rendered");
    },

    // The mounted hook is called when the component is loaded.
    mounted() {
      // This is where we can do any other setup that needs to happen after the view is rendered
      // We can also run functions here
      this.logFruits();
    },

    // Methods are where we can do any logic that we want to use in the template
    // Primarily used for event handlers and functions
    methods: {
      
      toggleFruitColour(event) {
        // get the name of the fruit that was clicked
        const fruitName = event.target.innerText;

        // find the fruit in our fruits array
        const fruit = this.fruits.find(fruit => fruit.name === fruitName);

        // change the msg string in data to "You really like " + the name of the fruit that was clicked
        this.msg = `You really like ${fruit.name}s!`;

        // toggle the background colour of the clicked button between the fruit colour and white
        if(event.target.style.backgroundColor === fruit.colour) {
          event.target.style.backgroundColor = 'white';
        } else {
          event.target.style.backgroundColor = fruit.colour;
        }

        // set the active fruit to the fruit that was clicked
        this.activeFruit = fruit;
      },

      // A simple console.log using a function
      logFruits() {
        console.log(this.fruits);
      }
    },

    // We need to declare the components we want to use in the template
    components: {
      HelloWorld
    }
  }
</script>
<!-- We can also use CSS that is scoped to just this page/component -->
<style scoped>
.fruits ul {
  display: flex;
  justify-content: center;
  gap: 1rem;
  list-style: none;
}

.fruits li button {
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
}

.activeFruit {
  text-align: center;
  margin: 20px 0;
  color: white;
}
</style>
