export default {
  data: (() => {
    return {
      count: 1
    };
  })(),
  methods: {
    test() {
      this.count = 10;
    }

  }
};