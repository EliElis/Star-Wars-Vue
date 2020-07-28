<template>
    <footer class="footer" id="footer">
        <router-link to="/" class="footer__logo">
            <img alt="Star wars" src="../assets/img/logo-footer.png">
        </router-link>

        <nav class="footer__nav">
            <ul>
                <li>
                    <router-link class="js-anchor" :to="{path: '/', hash:'#hero'}">{{nav.hero}}</router-link>
                <li>
                    <router-link  class="js-anchor" :to="{path: '/', hash:'#list'}">{{nav.list}}</router-link>
                </li>
                <li>
                    <router-link  class="js-anchor" :to="{path: '/', hash:'#form'}">{{nav.form}}</router-link>
                </li>
                <li>
                    <router-link  class="js-anchor" :to="{path: '/', hash:'#footer'}">{{nav.footer}}</router-link>
                </li>
            </ul>
            <a @click="scrollToTop" class="btn footer__btn">{{to_top}}</a>
        </nav>

    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return{
                nav:{
                    hero: 'Hero',
                    list: 'List',
                    form: 'CTA Block',
                    footer: 'Footer'
                },
                to_top: 'MNE NAVERH'
            }
        },
        methods:{
            scrollToTop(){
                document.querySelector('#header').scrollIntoView({block: 'start', behavior:'smooth'})
            }
        }
    }
</script>