<template>
  <div id="app">
      <Header></Header>
      <main>
          <router-view/>
      </main>
      <Footer></Footer>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  export default {
    components: {
      Header,
        Footer
    },
      mounted(){
          this.scrollToAnchor('.js-anchor');
          this.mobileDetect();
      },
      methods:{
        scrollToHash(hash){
            if(document.querySelector(hash)){
                document.querySelector(hash).scrollIntoView({block: 'start', behavior:'smooth'})
            }
            history.pushState("", document.title, window.location.pathname
                + window.location.search);
        },
          scrollToAnchor(el) {
              const anchors = [].slice.call(document.querySelectorAll(el));
              anchors.forEach((el) => {
                  el.addEventListener('click', () => {
                      let hash = window.location.hash;
                      this.scrollToHash(hash)
                  })
              });
          },
          mounted(){
              let hash = window.location.hash;
              if(hash.length > 0) this.scrollToHash(hash);
          },
          mobileDetect(){
              if(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)){
                  document.querySelector('#app').classList.add('touch');
                  return true;
              } else{
                  document.querySelector('#app').classList.add('desktop');
              }
          },
      }
  }
</script>