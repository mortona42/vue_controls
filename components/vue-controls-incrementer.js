var vueElements = document.getElementsByClassName('vue-controls-incrementer');

for (var i = 0; i < vueElements.length; i++) {
  new Vue({
    delimiters: ['${', '}'],

    el: vueElements[i],

    data: {
      score: vueElements[i].attributes.score.value,
      nid: vueElements[i].attributes.nid.value,
      token: '',
    },

    methods: {
      getScore: function() {
        // Get REST auth token
        this.$http.get('/rest/session/token').then(response => {
          this.$set(this, 'token', response.body);
        }, response => {
          console.log(response);
        });
        this.$http.get('/node/' + this.nid + "?_format=json").then(response => {
          this.$set(this, 'score', response.data.field_score[0].value);
        }, response => {
          console.log(response);
        });
      },

      setScore: function(value) {
        this.$http({url: '/node/' + this.nid  + '?_format=json', method: 'PATCH', body: '{"type": "score", "field_score":[{"value":' + value + '}]}', headers: {
          "Content-Type": 'application/json',
          "X-CSRF-Token": this.token,
        }}).then(response => {
          console.log(this.score);
        }, function() {
          alert('fail');
        });
      },

      increaseScore: function() {
        this.score += 1;
        this.setScore(this.score);
      },

      decreaseScore: function() {
        this.score -= 1;
        this.setScore(this.score);
      },
    },

    mounted: function() {
      this.getScore();
    },
  });
}
