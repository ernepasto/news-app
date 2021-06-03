<template>
    <div id="App">
        <transition-group name="fade">
            <Nav :key="1"></Nav>
            <router-view :key="2" />
        </transition-group>
    </div>
</template>

<script>
import Nav from './components/Nav.vue';

export default {
    components: {
        Nav 
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    margin: 0;
    padding: 0;
    background: #fff;
    color: #222;
    font-family: 'Inter', sans-serif;
    font-size: 1em;
    font-weight: 400;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-in-out;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>