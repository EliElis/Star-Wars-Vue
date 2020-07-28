<template>
    <div class="contact" id="form">
        <div class="contact__decorative">Your focus determines your reality.</div>
        <div class="contact__inner">
            <div class="contact__left">
                <form class="contact__form" action="">
                    <input type="email" placeholder="Email">
                    <input type="email" placeholder="Email">
                    <button type="submit">
                        <span>GET YOUR 20% OFF COUPON</span>
                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z"/>
                        </svg>
                    </button>
                </form>
            </div>

            <div class="contact__img">
                <img :src="`${publicPath}img/${imgUrl}`">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Form',
        props: ['imgUrl'],
        data () {
            return {
                publicPath: process.env.BASE_URL
            }
        }
    }

</script>

<style lang="scss">
    @import "@/assets/scss/form.scss";
</style>