<template>
    <section class="intro" id="hero">
        <div class="intro__inner">
            <div class="intro__img">
                <img :alt="titleHome" src="../assets/img/intro-bg.png">
            </div>
            <h1 v-text="titleHome"></h1>
        </div>

    </section>
</template>

<script>
    export default {
        name: 'Intro',
        props: ['titleHome'],
    }
</script>
