var vueElements = document.getElementsByClassName('vue-controls-incrementer');

for (var i = 0; i < vueElements.length; i++) {
  new Vue({
    delimiters: ['${', '}'],

    el: vueElements[i],

    data: {
      entity_id: vueElements[i].attributes.entityId.value,
      bundle: vueElements[i].attributes.bundle.value,
      field_name: vueElements[i].attributes.fieldName.value,
      field_value: vueElements[i].attributes.fieldValue.value,
      token: '',
    },

    methods: {
      getValue: function() {
        // Get REST auth token
        this.$http.get('/rest/session/token').then(response => {
          this.$set(this, 'token', response.body);
        }, response => {
          console.log(response);
        });
        this.$http.get('/node/' + this.entity_id + "?_format=json").then(response => {
          this.$set(this, 'field_value', response.data[this.field_name][0].value);
        }, response => {
          console.log(response);
        });
      },

      setValue: function() {
        this.$http({url: '/node/' + this.entity_id  + '?_format=json', method: 'PATCH', body: '{"type": "' + this.bundle + '", "' + this.field_name + '":[{"value":' + this.field_value + '}]}', headers: {
          "Content-Type": 'application/json',
          "X-CSRF-Token": this.token,
        }}).then(response => {
        }, response => {
          console.log(response);
        });
      },

      increaseValue: function() {
        this.field_value += 1;
        this.setValue();
      },

      decreaseValue: function() {
        this.field_value -= 1;
        this.setValue();
      },
    },

    mounted: function() {
      this.getValue();
    },
  });
}
