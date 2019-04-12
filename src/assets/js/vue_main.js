
var vm_members = new Vue({
  el: '#members',
  data () {
    return {
      members: null
    }
  },
  mounted () {
    var vm = this;
    axios
      .get('/data/members.json')
      .then(response => { 
        vm.members = response.data;

        Vue.nextTick(function() {     
          $('.members_carousel').owlCarousel({
            items: 6,
            margin: 30,
            autoplay: true,
            loop: true,
            dots: true,       
                responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1,
                },
                768: {
                    items: 3,
                },
                900: {
                    items: 6,
                }

            }
          });
        }.bind(vm));
      })
      .catch((err)=>{
        if(err) console.log(err);
       });
  }
})

var vm_pilots = new Vue({
  el: '#pilots',
  data () {
    return {
      pilots: null
    }
  },
  mounted () {
    var vm = this;
    axios
      .get('/data/pilots.json')
      .then(response => { 
        vm.pilots = response.data;

        Vue.nextTick(function() {     
          $('.pilots_carousel').owlCarousel({
            items: 6,
            margin: 30,
            autoplay: true,
            loop: true,
            dots: true,       
                responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1,
                },
                768: {
                    items: 3,
                },
                900: {
                    items: 6,
                }

            }
          });
        }.bind(vm));
      })
      .catch((err)=>{
        if(err) console.log(err);
       });
  }
})

