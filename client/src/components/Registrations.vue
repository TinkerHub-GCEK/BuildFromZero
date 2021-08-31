<template>
  <div class="wrap">
    <div class="popup">
      <h2>Registrations</h2>
      <div class="fix">
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Branch</th>
            <th>Year</th>
          </tr>
          <tr v-for="(reg, index) in result" :key="index">
            <th>{{ reg.name }}</th>
            <th>{{ reg.email }}</th>
            <th>{{ reg.phone }}</th>
            <th>{{ reg.branch }}</th>
            <th>{{ reg.year }}</th>
          </tr>
        </table>
      </div>
      <button @click="toggleRegistrations">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registrations",

  data() {
    return {
      result: [],
    };
  },

  props: {
    toggleRegistrations: Function,
    fetchData: Function,
    event: String,
  },

  created() {
    this.fetchData(
      "registrations",
      {
        email: this.$store.state.email,
        pass: this.$store.state.key,
        event: this.event,
      },
      (json) => {
        json = JSON.parse(JSON.stringify(json));
        if (json.status == "true") {
          this.result = json.result;
        } else {
          window.alert("Server Error!");
        }
      }
    );
  },
};
</script>

<style scoped>
.wrap {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.5em);
  z-index: 3;
}

.popup {
  width: auto;
  max-width: 90vw;
  height: auto;
  max-height: 90vh;
  padding: 2em;
  text-align: center;
  background-color: rgba(20, 20, 40, 0.75);
  backdrop-filter: blur(0.5em);
  border-radius: 0.625em;
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
}

label {
  text-align: left;
}

.fix {
  height: auto;
  max-height: calc(90vh - 12em);
  width: auto;
  max-width: calc(90vw - 4em);
  overflow: auto;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.625em;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
