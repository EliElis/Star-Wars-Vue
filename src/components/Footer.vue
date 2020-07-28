<template>
    <footer class="footer" id="footer">
        <router-link to="/" class="footer__logo">
            <img alt="Star wars" src="../assets/img/logo-footer.png">
        </router-link>

        <nav class="footer__nav">
            <ul>
                <li>
                    <a class="js-anchor" href="#hero">{{nav.hero}}</a></li>
                <li>
                    <a class="js-anchor" href="#list">{{nav.list}}</a>
                </li>
                <li>
                    <a class="js-anchor" href="#form">{{nav.form}}</a>
                </li>
                <li>
                    <a class="js-anchor" href="#footer">{{nav.footer}}</a>
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