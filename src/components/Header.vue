<template>
    <header class="header" id="header">
        <router-link to="/" class="header__logo">
            <img alt="Star wars" src="../assets/img/logo.png">
        </router-link>
        
        <div class="header__icon" :class="opened? 'opened' : ''" @click="toggleNav()">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <nav class="header__nav"  :class="opened? 'opened' : ''">
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
            <a data-href="#form" class="btn header__btn js-anchor">{{sign_up}}</a>
        </nav>


    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return{
                opened: false,
                nav:{
                    hero: 'Hero',
                    list: 'List',
                    form: 'CTA Block',
                    footer: 'Footer'
                },
                sign_up: 'Fake Sign Up'
            }
        },
        methods:{
            toggleNav(){
                let body = document.querySelector('body');
                body.classList.toggle('nav-opened');
                this.opened = !this.opened;
            },

            closeNav(){
                let body = document.querySelector('body');
                body.classList.remove('nav-opened');
                this.opened = false;
            }
        },
        mounted(){
         let links = [].slice.call(document.querySelectorAll('.js-anchor'));
         links.forEach((el) => {
             el.addEventListener('click', ()=> {
                 this.closeNav()
             })
         })
        }
    }
</script>